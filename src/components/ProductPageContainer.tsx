"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Customizer, { POUCH_COLORS, PROCESS_TYPES } from "./Customizer";
import PricingCalculator, { PRICE_TIERS } from "./PricingCalculator";

export default function ProductPageContainer() {
  const t = useTranslations("Index");

  // 状态提升定义
  const [selectedColor, setSelectedColor] = useState(POUCH_COLORS[2]); // 默认鼠尾草绿
  const [selectedProcess, setSelectedProcess] = useState(PROCESS_TYPES[0]); // 默认烫金
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState<number>(40);
  const [logoY, setLogoY] = useState<number>(60);

  const [quantity, setQuantity] = useState<number>(500);
  const [customQuantity, setCustomQuantity] = useState<string>("500");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalData, setModalData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // 根据当前数量匹配或计算单价
  const getUnitPrice = (qty: number) => {
    if (qty < 100) return 0;
    const matchedTier = [...PRICE_TIERS]
      .reverse()
      .find((tier) => qty >= tier.qty);
    return matchedTier ? matchedTier.unitPrice : PRICE_TIERS[0].unitPrice;
  };

  // 根据当前数量匹配生产工期
  const getProductionDays = (qty: number) => {
    const matchedTier = [...PRICE_TIERS]
      .reverse()
      .find((tier) => qty >= tier.qty);
    return matchedTier ? matchedTier.days : "3-5";
  };

  const unitPrice = getUnitPrice(quantity);
  const totalPrice = quantity * unitPrice;
  const productionDays = getProductionDays(quantity);

  // 统一结账请求发送
  const handleCheckoutSubmit = async (isSample: boolean) => {
    setIsSubmitting(true);
    try {
      const payload = {
        isSamplePack: isSample,
        pouchColor: { id: selectedColor.id, name: selectedColor.nameKey },
        processType: { id: selectedProcess.id, name: selectedProcess.nameKey },
        logoSize,
        logoY,
        logoSrc,
        quantity: isSample ? 1 : quantity,
        unitPrice: isSample ? 0.00 : unitPrice,
        totalPrice: isSample ? 0.00 : totalPrice
      };

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setModalData(data);
        setShowModal(true);
      } else {
        alert(t("alertSubmitFailed") + ": " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert(t("networkErrorRetry"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="product-layout-wrapper">
        <div className="product-grid-left">
          <Customizer
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedProcess={selectedProcess}
            setSelectedProcess={setSelectedProcess}
            logoSrc={logoSrc}
            setLogoSrc={setLogoSrc}
            logoSize={logoSize}
            setLogoSize={setLogoSize}
            logoY={logoY}
            setLogoY={setLogoY}
          />
        </div>
        <div className="product-grid-right">
          <PricingCalculator
            quantity={quantity}
            setQuantity={setQuantity}
            customQuantity={customQuantity}
            setCustomQuantity={setCustomQuantity}
            unitPrice={unitPrice}
            totalPrice={totalPrice}
            productionDays={productionDays}
            onCheckout={() => handleCheckoutSubmit(false)}
            onOrderSample={() => handleCheckoutSubmit(true)}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {/* 极简化精美订单报文确认 Modal 弹窗 */}
      {showModal && modalData && (
        <div className="modal-overlay">
          <div className="modal-card">
            {/* Modal 头部 */}
            <div className="modal-header">
              <div className="header-title-row">
                <span className="success-badge">✓ Parameters Packed</span>
                <h3>{t("paramsLockedTitle")}</h3>
              </div>
              <p className="header-desc">
                {modalData.message}
              </p>
            </div>

            {/* Modal 内容 */}
            <div className="modal-body">
              {/* 订单账单摘要 */}
              <div className="summary-section">
                <h4 className="body-section-title">📊 {t("receiptSummaryTitle")}</h4>
                <div className="summary-card">
                  <div className="summary-row">
                    <span className="summary-item-name">{modalData.summary.itemName}</span>
                    <span className="summary-item-qty">x{modalData.summary.qty}</span>
                  </div>
                  <hr className="summary-divider" />
                  <div className="summary-details">
                    <div className="detail-row">
                      <span>{t("unitPriceLabel")}:</span>
                      <span>${modalData.summary.price.toFixed(2)}</span>
                    </div>
                    <div className="detail-row">
                      <span>{t("expressAirShippingLabel")}:</span>
                      <span>{modalData.summary.shipping === 0 ? "免邮 (Free)" : `$${modalData.summary.shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="detail-row grand-total-row">
                      <span>{t("grandTotalLabel")}:</span>
                      <span className="gold-text">${modalData.summary.grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stripe Metadata 报文透传展示 */}
              <div className="metadata-section">
                <div className="metadata-title-row">
                  <h4 className="body-section-title">🔒 Stripe Payload (Metadata)</h4>
                  <span className="secure-badge">AES-256 Encrypted in Real Checkout</span>
                </div>
                <p className="metadata-desc">
                  {t("stripePayloadDesc")}
                </p>
                <div className="json-code-block">
                  <pre>
                    {JSON.stringify(modalData.stripeMetadata, null, 2)}
                  </pre>
                </div>
              </div>
            </div>

            {/* Modal 页脚 */}
            <div className="modal-footer">
              <button className="btn-close-modal" onClick={() => setShowModal(false)}>
                {t("returnToEditDesign")}
              </button>
              <button 
                className="btn-pay-modal" 
                onClick={() => {
                  alert(t("simulationAlertTip"));
                  setShowModal(false);
                }}
              >
                {t("simulatePaymentBtn")} ➔
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .product-layout-wrapper {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 2.5rem;
          width: 100%;
          align-items: start;
        }

        @media (max-width: 968px) {
          .product-layout-wrapper {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        /* 模态框样式 */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(43, 38, 31, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1.5rem;
          animation: fadeIn 0.25s ease-out;
        }

        .modal-card {
          background: #ffffff;
          border: 1px solid #f2ede4;
          border-radius: 1.5rem;
          max-width: 620px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 50px rgba(43, 38, 31, 0.15);
          display: flex;
          flex-direction: column;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-header {
          padding: 1.75rem 2rem 1rem 2rem;
          border-bottom: 1px solid #f2ede4;
        }

        .header-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .success-badge {
          background: #e8f5e9;
          color: #2e7d32;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .modal-header h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          color: #2b261f;
          margin: 0;
        }

        .header-desc {
          font-size: 0.85rem;
          color: #7a6e60;
          line-height: 1.5;
        }

        .modal-body {
          padding: 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          overflow-y: auto;
        }

        .body-section-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: #2b261f;
          margin-bottom: 0.75rem;
        }

        .summary-card {
          background: #faf8f5;
          border: 1px solid #f2ede4;
          border-radius: 0.75rem;
          padding: 1.25rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .summary-item-name {
          font-weight: 600;
          font-size: 0.9rem;
          color: #2b261f;
        }

        .summary-item-qty {
          font-size: 0.85rem;
          color: #b48a50;
          font-weight: 700;
        }

        .summary-divider {
          border: 0;
          border-top: 1px solid #f2ede4;
          margin: 0.75rem 0;
        }

        .summary-details {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #7a6e60;
        }

        .grand-total-row {
          font-size: 0.95rem;
          font-weight: 700;
          color: #2b261f;
          margin-top: 0.25rem;
        }

        .gold-text {
          color: #b48a50;
          font-size: 1.15rem;
        }

        .metadata-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .secure-badge {
          font-size: 0.65rem;
          color: #8e877e;
          background: #f5f2eb;
          padding: 0.15rem 0.4rem;
          border-radius: 4px;
        }

        .metadata-desc {
          font-size: 0.8rem;
          color: #7a6e60;
          line-height: 1.5;
          margin-bottom: 0.75rem;
        }

        .inline-code {
          font-family: monospace;
          background: #faf2e6;
          color: #a07840;
          padding: 0.1rem 0.25rem;
          border-radius: 3px;
          font-size: 0.75rem;
        }

        .json-code-block {
          background: #2b261f;
          color: #a8ffb2;
          padding: 1.25rem;
          border-radius: 0.75rem;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.8rem;
          line-height: 1.5;
          overflow-x: auto;
          border: 1px solid #3c362d;
          box-shadow: inset 0 3px 10px rgba(0,0,0,0.2);
        }

        .json-code-block pre {
          margin: 0;
          white-space: pre-wrap;
          word-break: break-all;
        }

        .modal-footer {
          padding: 1.25rem 2rem 1.75rem 2rem;
          border-top: 1px solid #f2ede4;
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        .btn-close-modal {
          background: transparent;
          color: #7a6e60;
          border: 1px solid #f2ede4;
          border-radius: 0.5rem;
          padding: 0.75rem 1.25rem;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-close-modal:hover {
          background: #faf8f5;
          color: #2b261f;
        }

        .btn-pay-modal {
          background: #b48a50;
          color: #ffffff;
          border: none;
          border-radius: 0.5rem;
          padding: 0.75rem 1.5rem;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-pay-modal:hover {
          background: #9d743e;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  );
}

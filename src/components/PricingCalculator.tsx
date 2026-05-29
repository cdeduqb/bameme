"use client";

import React from "react";
import { useTranslations } from "next-intl";

// 定价区间梯度
export const PRICE_TIERS = [
  { qty: 1000, unitPrice: 1.74, days: "5-7" },
  { qty: 2000, unitPrice: 1.65, days: "6-8" },
  { qty: 5000, unitPrice: 1.51, days: "8-12" },
  { qty: 10000, unitPrice: 1.38, days: "10-14" },
  { qty: 20000, unitPrice: 1.25, days: "12-16" },
  { qty: 50000, unitPrice: 1.10, days: "15-20" },
];

interface PricingCalculatorProps {
  quantity: number;
  setQuantity: (qty: number) => void;
  customQuantity: string;
  setCustomQuantity: (val: string) => void;
  unitPrice: number;
  totalPrice: number;
  productionDays: string;
  onCheckout: () => void;
  onOrderSample: () => void;
  isSubmitting: boolean;
}

export default function PricingCalculator({
  quantity,
  setQuantity,
  customQuantity,
  setCustomQuantity,
  unitPrice,
  totalPrice,
  productionDays,
  onCheckout,
  onOrderSample,
  isSubmitting
}: PricingCalculatorProps) {

  const t = useTranslations("Index");

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setQuantity(val);
    setCustomQuantity(val.toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value.replace(/[^0-9]/g, "");
    setCustomQuantity(valStr);
    
    if (valStr !== "") {
      const val = Number(valStr);
      setQuantity(val);
    }
  };

  const handleInputBlur = () => {
    let val = Number(customQuantity);
    if (isNaN(val) || val < 1000) {
      val = 1000; // 最低起订量拦截
    } else if (val > 50000) {
      val = 50000; // 最大限制
    }
    setQuantity(val);
    setCustomQuantity(val.toString());
  };

  const handlePresetClick = (qty: number) => {
    setQuantity(qty);
    setCustomQuantity(qty.toString());
  };

  return (
    <div className="calculator-wrapper">
      <h3 className="calc-title">{t("calcTitle")}</h3>

      {/* 预设数量按钮快捷切换 */}
      <div className="preset-grid">
        {PRICE_TIERS.map((tier) => (
          <button
            key={tier.qty}
            className={`preset-btn ${quantity === tier.qty ? "active" : ""}`}
            onClick={() => handlePresetClick(tier.qty)}
            disabled={isSubmitting}
          >
            <span className="preset-qty">{tier.qty} {t("unitPcs")}</span>
            <span className="preset-price">${tier.unitPrice}/{t("unitPcs")}</span>
          </button>
        ))}
      </div>

      {/* 自定义数量输入与滑动条 */}
      <div className="input-group">
        <div className="slider-container">
          <input
            type="range"
            min="1000"
            max="50000"
            step="500"
            value={quantity > 50000 ? 50000 : quantity < 1000 ? 1000 : quantity}
            onChange={handleSliderChange}
            className="quantity-slider"
            disabled={isSubmitting}
          />
        </div>

        <div className="numeric-input-wrapper">
          <label className="input-label">{t("calcInputLabel")}</label>
          <div className="input-with-unit">
            <input
              type="text"
              value={customQuantity}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="qty-text-input"
              disabled={isSubmitting}
            />
            <span className="input-unit">{t("unitPcs")}</span>
          </div>
        </div>
      </div>

      {/* 计价结果面板 */}
      <div className="price-result-panel">
        <div className="result-row">
          <span className="result-label">{t("unitPriceLabel")} (Unit Price)</span>
          <span className="result-value accent-color">
            {quantity < 1000 ? t("moqInsufficient") : `$${unitPrice.toFixed(2)}`}
          </span>
        </div>
        <div className="result-row">
          <span className="result-label">{t("subtotalLabel")} (Subtotal)</span>
          <span className="result-value total-price">
            {quantity < 1000 ? "-" : `$${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          </span>
        </div>

        <hr className="divider" />

        {/* 预计工期与物流 */}
        <div className="meta-info-grid">
          <div className="meta-item">
            <span className="meta-icon">🛠️</span>
            <div className="meta-texts">
              <span className="meta-title">{t("productionTimeLabel")}</span>
              <span className="meta-val">{quantity < 1000 ? "-" : t("productionDaysValue", {days: productionDays})}</span>
            </div>
          </div>
          <div className="meta-item">
            <span className="meta-icon">✈️</span>
            <div className="meta-texts">
              <span className="meta-title">{t("shippingTimeLabel")}</span>
              <span className="meta-val">{t("shippingTimeValue")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 结账按钮 */}
      <div className="action-buttons-stack">
        <button 
          className="btn-primary-checkout" 
          onClick={onCheckout}
          disabled={isSubmitting || quantity < 1000}
          style={{ opacity: isSubmitting || quantity < 1000 ? 0.6 : 1 }}
        >
          {isSubmitting ? t("calcCheckingParams") : t("calcCheckoutBtn")}
        </button>

        {/* 样品包入口 */}
        <div className="sample-pack-promo">
          <p className="promo-text">{t("calcPromoText")}</p>
          <button 
            className="btn-secondary-sample" 
            onClick={onOrderSample}
            disabled={isSubmitting}
          >
            {isSubmitting ? t("inquirySubmitting") : t("calcSamplePromoBtn")}
          </button>
        </div>
      </div>

      <style jsx>{`
        .calculator-wrapper {
          background: #ffffff;
          padding: 2rem;
          border-radius: 1.5rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          border: 1px solid #f0eae1;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .calc-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: #2b261f;
        }

        .preset-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
        }

        @media (max-width: 480px) {
          .preset-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .preset-btn {
          background: #faf8f5;
          border: 1px solid #f2ede4;
          border-radius: 0.75rem;
          padding: 0.75rem 0.5rem;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          transition: all 0.2s;
        }

        .preset-btn:hover:not(:disabled) {
          background: #f4efeb;
          border-color: #dcd3c7;
        }

        .preset-btn.active {
          background: #faf2e6;
          border-color: #b48a50;
          box-shadow: 0 4px 12px rgba(180, 138, 80, 0.08);
        }

        .preset-qty {
          font-size: 0.85rem;
          font-weight: 600;
          color: #2b261f;
        }

        .preset-price {
          font-size: 0.75rem;
          color: #8e877e;
        }

        .preset-btn.active .preset-qty {
          color: #a07840;
        }
        .preset-btn.active .preset-price {
          color: #b48a50;
          font-weight: 500;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .slider-container {
          width: 100%;
        }

        .quantity-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #f2ede4;
          outline: none;
        }

        .quantity-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #b48a50;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          transition: transform 0.1s;
        }

        .quantity-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .numeric-input-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        @media (max-width: 480px) {
          .numeric-input-wrapper {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }

        .input-label {
          font-size: 0.85rem;
          font-weight: 500;
          color: #5c5346;
        }

        .input-with-unit {
          position: relative;
          display: flex;
          align-items: center;
        }

        .qty-text-input {
          background: #faf8f5;
          border: 1px solid #f2ede4;
          border-radius: 0.5rem;
          padding: 0.5rem 2.2rem 0.5rem 0.75rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: #2b261f;
          width: 120px;
          text-align: right;
          outline: none;
          transition: border 0.2s;
        }

        .qty-text-input:focus {
          border-color: #b48a50;
        }

        .input-unit {
          position: absolute;
          right: 0.75rem;
          font-size: 0.85rem;
          color: #8e877e;
          pointer-events: none;
        }

        .price-result-panel {
          background: #faf8f5;
          border: 1px solid #f2ede4;
          border-radius: 1rem;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .result-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .result-label {
          font-size: 0.85rem;
          color: #5c5346;
        }

        .result-value {
          font-size: 1rem;
          font-weight: 600;
          color: #2b261f;
        }

        .result-value.accent-color {
          color: #b48a50;
          font-size: 1.1rem;
        }

        .result-value.total-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2b261f;
        }

        .divider {
          border: 0;
          border-top: 1px solid #f2ede4;
          margin: 0.25rem 0;
        }

        .meta-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 0.25rem;
        }

        .meta-item {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .meta-icon {
          font-size: 1.2rem;
        }

        .meta-texts {
          display: flex;
          flex-direction: column;
        }

        .meta-title {
          font-size: 0.7rem;
          color: #8e877e;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .meta-val {
          font-size: 0.8rem;
          font-weight: 600;
          color: #5c5346;
        }

        .action-buttons-stack {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .btn-primary-checkout {
          background: #2b261f;
          color: #ffffff;
          border: none;
          border-radius: 0.75rem;
          padding: 1.1rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          text-align: center;
        }

        .btn-primary-checkout:hover:not(:disabled) {
          background: #463e33;
        }

        .btn-primary-checkout:active:not(:disabled) {
          transform: scale(0.98);
        }

        .sample-pack-promo {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
          text-align: center;
          padding: 1rem;
          border: 1px dashed #dcd3c7;
          border-radius: 0.75rem;
          background: #faf8f5;
        }

        .promo-text {
          font-size: 0.8rem;
          color: #5c5346;
        }

        .btn-secondary-sample {
          background: transparent;
          color: #a07840;
          border: none;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s;
          text-decoration: underline;
        }

        .btn-secondary-sample:hover:not(:disabled) {
          color: #b48a50;
        }
      `}</style>
    </div>
  );
}

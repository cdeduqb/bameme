"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import InquiryForm from "./InquiryForm";

interface B2BLandingContainerProps {
  currentLocale: string;
}

export default function B2BLandingContainer({ currentLocale }: B2BLandingContainerProps) {
  const t = useTranslations("Index");

  // 主打核心产品配置列表
  const products = [
    {
      id: "microfiber",
      image: "/images/microfiber_pouch.png",
      titleKey: "product1Title",
      descKey: "product1Desc",
      scenario: "jewelry",
      color: "cream",
      process: "gold",
      qty: "1000",
      tags: ["MOQ 1000 Pcs", "Microfiber", "Metallic Gold", "Drawstring"],
      specs: {
        material: currentLocale === "zh" ? "特级超细纤维绒" : "Premium Microfiber",
        moq: "1,000 pcs (Strict)",
        leadTime: currentLocale === "zh" ? "7-10 个工作日" : "7-10 Business Days",
        shipping: currentLocale === "zh" ? "5-7 天特快专线空运 (免邮)" : "5-7 Days Air Cargo (Free)",
        bestFor: currentLocale === "zh" ? "戒指、项链等精细珠宝" : "Rings, Necklaces, Fine Accessories"
      }
    },
    {
      id: "velvet",
      image: "/images/velvet_bag.png",
      titleKey: "product2Title",
      descKey: "product2Desc",
      scenario: "watches",
      color: "sage",
      process: "gold",
      qty: "1000",
      tags: ["MOQ 1000 Pcs", "Classic Velvet", "Gold deboss", "Luxurious"],
      specs: {
        material: currentLocale === "zh" ? "奢华高克重天鹅绒" : "Classic Plush Velvet",
        moq: "1,000 pcs (Strict)",
        leadTime: currentLocale === "zh" ? "7-10 个工作日" : "7-10 Business Days",
        shipping: currentLocale === "zh" ? "5-7 天特快专线空运 (免邮)" : "5-7 Days Air Cargo (Free)",
        bestFor: currentLocale === "zh" ? "高端腕表、手镯与礼盒" : "Watches, Gold Bracelets, Luxury Gifts"
      }
    },
    {
      id: "ribbon",
      image: "/images/ribbon_bag.png",
      titleKey: "product3Title",
      descKey: "product3Desc",
      scenario: "gifts",
      color: "pink",
      process: "gold",
      qty: "1000",
      tags: ["MOQ 1000 Pcs", "250g Art Paper", "Silk Ribbon", "Elegant"],
      specs: {
        material: currentLocale === "zh" ? "250g 覆膜白卡艺术纸" : "250g Art Cardboard",
        moq: "1,000 pcs (Strict)",
        leadTime: currentLocale === "zh" ? "8-12 个工作日" : "8-12 Business Days",
        shipping: currentLocale === "zh" ? "5-7 天特快专线空运 (免邮)" : "5-7 Days Air Cargo (Free)",
        bestFor: currentLocale === "zh" ? "奢华买手店与高端美妆" : "Boutique Retail, Cosmetic Packaging"
      }
    },
    {
      id: "kraft",
      image: "/images/kraft_bag.png",
      titleKey: "product4Title",
      descKey: "product4Desc",
      scenario: "cosmetics",
      color: "camel",
      process: "debossed",
      qty: "1000",
      tags: ["MOQ 1000 Pcs", "Eco Kraft", "Biodegradable", "Handled"],
      specs: {
        material: currentLocale === "zh" ? "100% 可回收原木牛皮纸" : "100% Recyclable Kraft",
        moq: "1,000 pcs (Strict)",
        leadTime: currentLocale === "zh" ? "7-10 个工作日" : "7-10 Business Days",
        shipping: currentLocale === "zh" ? "5-7 天特快专线空运 (免邮)" : "5-7 Days Air Cargo (Free)",
        bestFor: currentLocale === "zh" ? "环保有机品牌与日用零售" : "Eco Boutiques, Retail Packaging"
      }
    },
    {
      id: "canvas",
      image: "/images/canvas_bag.png",
      titleKey: "product5Title",
      descKey: "product5Desc",
      scenario: "tech",
      color: "charcoal",
      process: "debossed",
      qty: "1000",
      tags: ["MOQ 1000 Pcs", "Cotton Canvas", "Durable", "Dust-proof"],
      specs: {
        material: currentLocale === "zh" ? "高克重纯天然帆布" : "Heavy-Weight Cotton Canvas",
        moq: "1,000 pcs (Strict)",
        leadTime: currentLocale === "zh" ? "8-10 个工作日" : "8-10 Business Days",
        shipping: currentLocale === "zh" ? "5-7 天特快专线空运 (免邮)" : "5-7 Days Air Cargo (Free)",
        bestFor: currentLocale === "zh" ? "数码配件与美容仪器保护" : "Tech Gadgets, Cosmetics Organizer"
      }
    },
    {
      id: "magnetic",
      image: "/images/magnetic_box.png",
      titleKey: "product6Title",
      descKey: "product6Desc",
      scenario: "gifts",
      color: "charcoal",
      process: "debossed",
      qty: "1000",
      tags: ["MOQ 1000 Pcs", "Rigid Board", "Magnetic", "VIP Box"],
      specs: {
        material: currentLocale === "zh" ? "特种压纹卡纸 + 隐形强磁" : "Rigid Board + Textured Paper",
        moq: "1,000 pcs (Strict)",
        leadTime: currentLocale === "zh" ? "10-14 个工作日" : "10-14 Business Days",
        shipping: currentLocale === "zh" ? "5-7 天特快专线空运 (免邮)" : "5-7 Days Air Cargo (Free)",
        bestFor: currentLocale === "zh" ? "大宗商务礼品与尊贵腕表套盒" : "VIP Corporate Gifts, Watch Set Boxes"
      }
    }
  ];

  // 共享联动表单状态
  const [scenario, setScenario] = useState<"jewelry" | "cosmetics" | "gifts" | "tech" | "watches">("jewelry");
  const [defaultNote, setDefaultNote] = useState("");
  const [defaultQty, setDefaultQty] = useState("1000");
  const [defaultColor, setDefaultColor] = useState("cream");
  const [defaultProcess, setDefaultProcess] = useState("gold");
  const [triggerKey, setTriggerKey] = useState(0);
  const [activeProductId, setActiveProductId] = useState<string>("microfiber");

  // 联动处理器 1：免费获取 3D 设计样稿
  const handleGetMockup = (product: typeof products[0]) => {
    setActiveProductId(product.id);
    setScenario(product.scenario as any);
    setDefaultQty(product.qty);
    setDefaultColor(product.color);
    setDefaultProcess(product.process);

    const noteText = t("mockupNoteTemplate", { product: t(product.titleKey) });
    setDefaultNote(noteText);
    setTriggerKey(prev => prev + 1);

    const formSection = document.getElementById("inquiry-form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 联动处理器 2：索取样品包
  const handleOrderSample = (product: typeof products[0]) => {
    setActiveProductId(product.id);
    setScenario(product.scenario as any);
    setDefaultQty("1000");
    setDefaultColor(product.color);
    setDefaultProcess(product.process);

    const noteText = t("sampleNoteTemplate", { product: t(product.titleKey) });
    setDefaultNote(noteText);
    setTriggerKey(prev => prev + 1);

    const formSection = document.getElementById("inquiry-form-section");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="b2b-landing-wrapper">
      {/* 在线自助定制极简横幅引导 */}
      <div className="online-customize-banner">
        <div className="banner-content">
          <span className="banner-badge">💡 {t("bannerTitle")}</span>
          <p className="banner-text">
            {t("bannerText")}
          </p>
        </div>
        <Link href={`/${currentLocale}/customize`} className="btn-go-customize">
          {t("bannerBtn")}
        </Link>
      </div>

      {/* 高端主打核心产品款式展厅 */}
      <section className="usecases-section">
        <h2 className="section-title">{t("productsTitle")}</h2>
        <p className="section-subtitle" style={{ textAlign: "center", color: "#7a6e60", marginTop: "-1rem", marginBottom: "3rem", fontSize: "0.95rem" }}>
          {t("productsSubtitle")}
        </p>
        
        <div className="products-showcase-grid">
          {products.map((product) => (
            <div 
              key={product.id} 
              className={`product-gallery-card ${activeProductId === product.id ? "active-product" : ""}`}
            >
              {/* 图片区域，带有悬停缩放 */}
              <div className="product-image-box">
                <img 
                  src={product.image} 
                  alt={t(product.titleKey)} 
                  className="product-card-img"
                  loading="lazy"
                />
                <span className="product-moq-badge">{t("moqLabel")}</span>
              </div>

              {/* 卡片详情 */}
              <div className="product-info-box">
                {/* 属性小胶囊标签 */}
                <div className="product-pills-row">
                  {product.tags.map((tag, idx) => (
                    <span key={idx} className="product-pill-tag">{tag}</span>
                  ))}
                </div>

                <h3 className="product-card-title">{t(product.titleKey)}</h3>
                <p className="product-card-desc">{t(product.descKey)}</p>

                {/* AI-Friendly 结构化对比小表格 */}
                <div className="product-spec-table">
                  <div className="spec-row">
                    <span className="spec-label">{currentLocale === "zh" ? "材质工艺" : "Material"}</span>
                    <span className="spec-value">{product.specs.material}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">{currentLocale === "zh" ? "起订量 (MOQ)" : "MOQ"}</span>
                    <span className="spec-value">{product.specs.moq}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">{currentLocale === "zh" ? "大货工期" : "Lead Time"}</span>
                    <span className="spec-value">{product.specs.leadTime}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">{currentLocale === "zh" ? "空运物流" : "Shipping"}</span>
                    <span className="spec-value">{product.specs.shipping}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label">{currentLocale === "zh" ? "最佳适用" : "Best For"}</span>
                    <span className="spec-value">{product.specs.bestFor}</span>
                  </div>
                </div>

                {/* 行为动作按钮组 */}
                <div className="product-action-buttons">
                  <button 
                    onClick={() => handleGetMockup(product)}
                    className="btn-mockup-action"
                  >
                    🎨 {t("btnGetFreeMockup")}
                  </button>
                  <button 
                    onClick={() => handleOrderSample(product)}
                    className="btn-sample-action"
                  >
                    📦 {t("btnOrderSample")}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 询盘表单区域 */}
      <InquiryForm 
        currentLocale={currentLocale} 
        defaultScenario={scenario}
        defaultNote={defaultNote}
        defaultQty={defaultQty}
        defaultColor={defaultColor}
        defaultProcess={defaultProcess}
        triggerKey={triggerKey}
      />

      <style jsx global>{`
        .product-spec-table {
          background-color: #faf9f6;
          border: 1px dashed #e1d8cc;
          border-radius: 0.6rem;
          padding: 0.85rem;
          margin: 1.2rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .spec-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.82rem;
          border-bottom: 1px dashed rgba(225, 216, 204, 0.5);
          padding-bottom: 0.3rem;
        }
        .spec-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .spec-label {
          color: #7a6e60;
          font-weight: 500;
        }
        .spec-value {
          color: #2b261f;
          font-weight: 600;
          text-align: right;
        }

        .online-customize-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, #fdfbf7 0%, #f6f1e8 100%);
          border: 1px solid #ebdcb9;
          border-radius: 1.25rem;
          padding: 1.5rem 2rem;
          margin-bottom: 3.5rem;
          box-shadow: 0 4px 15px rgba(180, 150, 100, 0.05);
          gap: 1.5rem;
        }

        .banner-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .banner-badge {
          background-color: #fff3cd;
          color: #856404;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 20px;
          align-self: flex-start;
          border: 1px solid #ffeeba;
        }

        .banner-text {
          font-size: 0.95rem;
          color: #6b5e4c;
          margin: 0;
          line-height: 1.4;
        }

        .btn-go-customize {
          display: inline-block;
          padding: 0.9rem 1.75rem;
          background-color: #2b261f;
          color: #ffffff;
          font-size: 0.95rem;
          font-weight: 700;
          text-decoration: none;
          border-radius: 0.85rem;
          transition: all 0.25s ease;
          white-space: nowrap;
          text-align: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .btn-go-customize:hover {
          background-color: #b48a50;
          transform: translateY(-1px);
          box-shadow: 0 6px 15px rgba(180, 138, 80, 0.2);
        }

        @media (max-width: 768px) {
          .online-customize-banner {
            flex-direction: column;
            align-items: stretch;
            padding: 1.25rem;
            text-align: center;
          }
          .banner-badge {
            align-self: center;
          }
          .btn-go-customize {
            width: 100%;
          }
        }

        .usecase-card.interactive {
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          border: 1px solid #f2ede4;
        }

        .usecase-card.interactive:hover {
          transform: translateY(-4px);
          border-color: #b48a50;
          box-shadow: 0 10px 25px rgba(180, 138, 80, 0.1);
        }

        .usecase-card.active-scenario {
          border-color: #b48a50;
          background: #faf6f0;
          box-shadow: 0 8px 20px rgba(180, 138, 80, 0.08);
        }

        .click-to-select {
          font-size: 0.8rem;
          font-weight: 700;
          color: #b48a50;
          margin-top: 0.75rem;
          display: block;
          opacity: 0;
          transition: opacity 0.2s;
        }

        .usecase-card.interactive:hover .click-to-select,
        .usecase-card.active-scenario .click-to-select {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

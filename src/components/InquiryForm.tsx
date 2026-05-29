"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";

interface InquiryFormProps {
  currentLocale: string;
  defaultScenario?: "jewelry" | "cosmetics" | "gifts" | "tech" | "watches";
  defaultNote?: string;
  defaultQty?: string;
  defaultColor?: string;
  defaultProcess?: string;
  triggerKey?: number;
}

export default function InquiryForm({ 
  currentLocale, 
  defaultScenario = "jewelry",
  defaultNote = "",
  defaultQty = "500",
  defaultColor = "cream",
  defaultProcess = "gold",
  triggerKey = 0
}: InquiryFormProps) {
  const t = useTranslations("Index");

  const getTrustText = (key: string, defaultEn: string, defaultZh: string) => {
    if (t.has(key)) {
      return t(key);
    }
    
    // 针对表单底部的三大保障承诺卡片提供内置的 11 国高精细多语言词典
    const dicts: Record<string, Record<string, string>> = {
      trustGuaranteeTitle: {
        zh: "100% 质量保障与免费重做保证",
        en: "100% Quality & Remake Guarantee",
        de: "100 % Qualität & kostenlose Nachproduktion",
        es: "Garantía de calidad del 100% y reproducción gratuita",
        fr: "Garantie qualité 100% & refabrication gratuite",
        it: "Garanzia di qualità al 100% e rifacimento gratuito",
        pt: "Garantia de qualidade 100% e refabricação gratuita",
        ru: "100% гарантия качества и бесплатный повторный заказ",
        ja: "100%品質保証＆無料再製作保証",
        ko: "100% 품질 보증 및 무료 재제작 보증",
        ar: "ضمان الجودة 100٪ وإعادة التصنيع مجانًا"
      },
      trustGuaranteeDesc: {
        zh: "如果大货在送达时存在任何制造缺陷或印刷偏差，我们承诺无条件免费重新制作，免除您的后顾之忧。",
        en: "If your custom pouches arrive with any manufacturing defect or imprint error, we will remake them for free.",
        de: "Falls Ihre Beutel Produktionsfehler oder Fehldrucke aufweisen, fertigen wir sie kostenlos neu an.",
        es: "Si sus bolsas personalizadas llegan con algún defecto de fabricación o error de impresión, las volveremos a hacer gratis.",
        fr: "Si vos pochettes personnalisées arrivent avec un défaut de fabrication ou une erreur d'impression, nous les refabriquons gratuitement.",
        it: "Se i vostri sacchetti personalizzati arrivano con difetti di fabbricazione o errori di stampa, li rifaremo gratuitamente.",
        pt: "Se os seus sacos personalizados chegarem com qualquer defeito de fabrico ou erro de impressão, iremos refabricá-los gratuitamente.",
        ru: "Если ваши фирменные мешочки придут с производственным браком или ошибкой печати, мы изготовим их заново бесплатно.",
        ja: "お届けしたオリジナル巾着袋に製造上の欠陥や印刷ミスがあった場合、無料で再製作いたします。",
        ko: "주문 제작된 파우치에 제조 결함이나 인쇄 오류가 있을 경우, 무상으로 다시 제작해 드립니다.",
        ar: "إذا وصلت حقائبك المخصصة بأي عيب تصنيعي أو خطأ في الطباعة، فسنعيد تصنيعها مجانًا."
      },
      trustRevisionsTitle: {
        zh: "数字样稿无限次免费修改",
        en: "Free Unlimited Design Revisions",
        de: "Unbegrenzte kostenlose Designänderungen",
        es: "Revisiones de diseño ilimitadas y gratuitas",
        fr: "Modifications de conception gratuites et illimitées",
        it: "Revisioni del design gratuite e illimitate",
        pt: "Revisões de design ilimitadas e gratuitas",
        ru: "Бесплатные неограниченные изменения дизайна",
        ja: "デザイン修正の回数無制限（無料）",
        ko: "무제한 디자인 수정 무료",
        ar: "تعديلات غير محدودة للتصميم مجانًا"
      },
      trustRevisionsDesc: {
        zh: "我们的设计团队承诺 2 小时内出具高保真 3D 设计图，并提供无限次修改，确认满意后才排单生产。",
        en: "Get your high-fidelity 3D mockup in 2 hours and request unlimited edits until you are 100% satisfied.",
        de: "Erhalten Sie Ihre hochauflösende 3D-Vorschau in 2 Stunden und fordern Sie Änderungen an, bis Sie vollkommen zufrieden sind.",
        es: "Obtenga su maqueta 3D de alta fidelidad en 2 horas y solicite ediciones ilimitadas hasta que esté 100% satisfecho.",
        fr: "Obtenez votre maquette 3D haute fidélité en 2 heures et demandez des modifications illimitées jusqu'à satisfaction totale.",
        it: "Ricevi il tuo mockup 3D ad alta fedeltà in 2 ore e richiedi modifiche illimitate fino a quando non sarai soddisfatto al 100%.",
        pt: "Obtenha o seu mockup 3D de alta fidelidade in 2 horas e solicite edições ilimitadas até estar 100% satisfeito.",
        ru: "Получите высокоточный 3D-макет за 2 часа и вносите изменения без ограничений до полного утверждения.",
        ja: "2時間以内に高精度な3Dデザイン案をご送付。ご満足いただけるまで何度でも無料で修正可能です。",
        ko: "2시간 이내에 고해상도 3D 시안을 제공하며, 100% 만족하실 때까지 횟수 제한 없이 수정해 드립니다.",
        ar: "احصل على نموذج ثلاثي الأبعاد عالي الدقة في ساعتين واطلب تعديلات غير محدودة حتى تكون راضيًا بنسبة 100٪."
      },
      trustShippingTitle: {
        zh: "全球特快专线空运送货上门",
        en: "Worldwide Express Air Cargo",
        de: "Weltweiter Express-Luftversand",
        es: "Envío aéreo exprés a todo el mundo",
        fr: "Transport aérien express mondial",
        it: "Spedizione aerea espressa in tutto il mondo",
        pt: "Envio aéreo expresso internacional",
        ru: "Международная экспресс-доставка самолетом",
        ja: "世界主要都市への特快空运（送料無料）",
        ko: "전 세계 특송 항공 배송",
        ar: "شحن جوي سريع لجميع أنحاء العالم"
      },
      trustShippingDesc: {
        zh: "大货生产完成后直接通过 DHL/FedEx 等特快专线空运，5-7天全球免邮送货上门。",
        en: "Mass orders are dispatched via express air cargo delivering directly to your door in 5-7 days globally with free shipping.",
        de: "Großbestellungen werden per Express-Luftfracht versandt und in 5-7 Tagen weltweit versandkostenfrei direkt an Ihre Haustür geliefert.",
        es: "Los pedidos al por mayor se envían a través de carga aérea urgente, con entrega directa en su puerta en 5-7 días en todo el mundo con envío gratuito.",
        fr: "Les commandes en gros sont expédiées par fret aérien express, livrées directement chez vous en 5 à 7 jours dans le monde entier, avec livraison gratuite.",
        it: "Gli ordini all'ingrosso vengono spediti tramite trasporto aereo espresso, consegnati direttamente a casa vostra in 5-7 giorni in tutto il mondo con spedizione gratuita.",
        pt: "As encomendas em massa são enviadas por frete aéreo expresso, com entrega direta na sua porta em 5-7 dias em todo o mundo com envio gratuito.",
        ru: "Оптовые заказы отправляются экспресс-авиапочтой и доставляются прямо к вашей двери за 5-7 дней в любую точку мира с бесплатной доставкой.",
        ja: "量産完了後、DHLやFedEx等の国際特快航空便で発送。世界中どこへでも5〜7日でお手元まで無料でお届けします。",
        ko: "대량 주문 시 DHL/FedEx 등 특송 항공편으로 발송되어 전 세계 어디서나 5~7일 이내에 무료로 배송됩니다.",
        ar: "يتم إرسال الطلبات الكبيرة عبر الشحن الجوي السريع لتصل مباشرة إلى باب منزلك خلال 5-7 أيام حول العالم مع شحن مجاني."
      }
    };

    if (dicts[key] && dicts[key][currentLocale]) {
      return dicts[key][currentLocale];
    }
    return currentLocale === "zh" ? defaultZh : defaultEn;
  };

  // 表单状态
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [quantity, setQuantity] = useState(defaultQty);
  const [scenario, setScenario] = useState<string>(defaultScenario);
  const [color, setColor] = useState(defaultColor);
  const [process, setProcess] = useState(defaultProcess);
  const [note, setNote] = useState(defaultNote);

  // 当外部联动状态或 triggerKey 改变时，同步更新内部表单字段值
  useEffect(() => {
    setScenario(defaultScenario);
    setQuantity(defaultQty);
    setColor(defaultColor);
    setProcess(defaultProcess);
    setNote(defaultNote);
  }, [triggerKey, defaultScenario, defaultNote, defaultQty, defaultColor, defaultProcess]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理 Logo 上传
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 处理提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert(t("alertEmailRequired"));
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        email,
        company,
        quantity,
        scenario,
        color,
        process,
        note,
        logoName: logoFile ? logoFile.name : "None",
        logoDataUrl: logoPreview || null,
        submittedAt: new Date().toISOString()
      };

      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed");
      }

      console.log("Inquiry Submitted Successfully:", data);
      if (data.warning) {
        alert(data.warning);
      }
      setIsSuccess(true);
    } catch (err: any) {
      console.error(err);
      alert(err.message || t("alertSubmitFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setCompany("");
    setQuantity("500");
    setScenario("jewelry");
    setColor("cream");
    setProcess("gold");
    setNote("");
    setLogoFile(null);
    setLogoPreview(null);
    setIsSuccess(false);
  };

  return (
    <div className="inquiry-form-container" id="inquiry-form-section">
      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="inquiry-form-card">
          <div className="form-header">
            <h3>{t("inquirySectionTitle")}</h3>
            <p>{t("inquirySectionSubtitle")}</p>
          </div>

          <div className="form-grid">
            {/* 邮箱和公司名称 */}
            <div className="form-group full-width">
              <label className="form-label required">{t("inquiryEmailLabel")}</label>
              <input
                type="email"
                required
                className="form-input"
                placeholder={t("inquiryEmailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">{t("inquiryCompanyLabel")}</label>
              <input
                type="text"
                className="form-input"
                placeholder={t("inquiryCompanyPlaceholder")}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>

            {/* 定制数量与行业场景 */}
            <div className="form-group">
              <label className="form-label">{t("inquiryQtyLabel")}</label>
              <select
                className="form-select"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              >
                <option value="100">100 pcs</option>
                <option value="300">300 pcs</option>
                <option value="500">500 pcs</option>
                <option value="1000">1,000 pcs</option>
                <option value="2000">2,000 pcs</option>
                <option value="5000">5,000+ pcs</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">{t("inquiryScenarioLabel")}</label>
              <select
                className="form-select"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
              >
                <option value="jewelry">{t("useCaseJewelry")}</option>
                <option value="cosmetics">{t("useCaseCosmetics")}</option>
                <option value="gifts">{t("useCaseGifts")}</option>
                <option value="tech">{t("useCaseTech")}</option>
                <option value="watches">{t("useCaseWatches")}</option>
              </select>
            </div>

            {/* 期望颜色与工艺 */}
            <div className="form-group">
              <label className="form-label">{t("inquiryColorLabel")}</label>
              <select
                className="form-select"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              >
                <option value="cream">{t("colorCream")}</option>
                <option value="pink">{t("colorPink")}</option>
                <option value="sage">{t("colorSage")}</option>
                <option value="charcoal">{t("colorCharcoal")}</option>
                <option value="camel">{t("colorCamel")}</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">{t("inquiryProcessLabel")}</label>
              <select
                className="form-select"
                value={process}
                onChange={(e) => setProcess(e.target.value)}
              >
                <option value="gold">{t("processGold")}</option>
                <option value="silver">{t("processSilver")}</option>
                <option value="debossed">{t("processDebossed")}</option>
              </select>
            </div>

            {/* Logo 上传区域 */}
            <div className="form-group full-width">
              <label className="form-label">{t("inquiryLogoLabel")}</label>
              <div 
                className="upload-dropzone"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*,.ai,.pdf,.svg,.eps"
                  onChange={handleLogoChange}
                />
                
                {logoPreview ? (
                  <div className="logo-uploaded-preview">
                    <img src={logoPreview} alt="Logo preview" />
                    <div className="file-info">
                      <span className="file-name">{logoFile?.name}</span>
                      <span className="upload-tip">{t("uploadReplaceTip")}</span>
                    </div>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <span className="upload-icon">📤</span>
                    <p className="upload-main-text">{t("uploadPlaceholderMain")}</p>
                    <p className="upload-sub-text">{t("inquiryLogoDesc")}</p>
                  </div>
                )}
              </div>
            </div>

            {/* 留言定制说明 */}
            <div className="form-group full-width">
              <label className="form-label">{t("inquiryNoteLabel")}</label>
              <textarea
                className="form-textarea"
                rows={3}
                placeholder={t("inquiryNotePlaceholder")}
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="btn-submit-inquiry"
          >
            {isSubmitting ? (
              <span className="spinner-wrapper">
                <span className="dot-loader"></span> {t("inquirySubmitting")}
              </span>
            ) : t("inquirySubmitBtn")}
          </button>

          {/* 信任背书与质量保障卡片组 */}
          <div className="trust-indicators-container">
            <div className="trust-indicator-card">
              <div className="trust-indicator-icon">🛡️</div>
              <div className="trust-indicator-content">
                <h4 className="trust-indicator-title">
                  {getTrustText(
                    "trustGuaranteeTitle",
                    "100% Quality & Remake Guarantee",
                    "100% 质量保障与免费重做保证"
                  )}
                </h4>
                <p className="trust-indicator-desc">
                  {getTrustText(
                    "trustGuaranteeDesc",
                    "If your custom pouches arrive with any manufacturing defect or imprint error, we will remake them for free.",
                    "如果大货在送达时存在任何制造缺陷或印刷偏差，我们承诺无条件免费重新制作，免除您的后顾之忧。"
                  )}
                </p>
              </div>
            </div>

            <div className="trust-indicator-card">
              <div className="trust-indicator-icon">🎨</div>
              <div className="trust-indicator-content">
                <h4 className="trust-indicator-title">
                  {getTrustText(
                    "trustRevisionsTitle",
                    "Free Unlimited Design Revisions",
                    "数字样稿无限次免费修改"
                  )}
                </h4>
                <p className="trust-indicator-desc">
                  {getTrustText(
                    "trustRevisionsDesc",
                    "Get your high-fidelity 3D mockup in 2 hours and request unlimited edits until you are 100% satisfied.",
                    "我们的设计团队承诺 2 小时内出具高保真 3D 设计图，并提供无限次修改，确认满意后才排单生产。"
                  )}
                </p>
              </div>
            </div>

            <div className="trust-indicator-card">
              <div className="trust-indicator-icon">✈️</div>
              <div className="trust-indicator-content">
                <h4 className="trust-indicator-title">
                  {getTrustText(
                    "trustShippingTitle",
                    "Worldwide Express Air Cargo",
                    "全球特快专线空运送货上门"
                  )}
                </h4>
                <p className="trust-indicator-desc">
                  {getTrustText(
                    "trustShippingDesc",
                    "Mass orders are dispatched via express air cargo delivering directly to your door in 5-7 days globally with free shipping.",
                    "大货生产完成后直接通过 DHL/FedEx 等特快专线空运，5-7天全球免邮送货上门。"
                  )}
                </p>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className="inquiry-success-card">
          <div className="success-icon-badge">✨</div>
          <h3>{t("inquirySuccessTitle")}</h3>
          <p className="success-desc">
            {t("inquirySuccessDesc")}
            <strong className="email-highlight">{email}</strong>
          </p>
          <div className="success-details-summary">
            <div className="summary-line"><span>{t("successLabelScenario")}:</span> <strong>{t(`useCase${scenario.charAt(0).toUpperCase() + scenario.slice(1)}`)}</strong></div>
            <div className="summary-line"><span>{t("successLabelQty")}:</span> <strong>{quantity} {t("unitPcs")}</strong></div>
            {logoFile && <div className="summary-line"><span>{t("successLabelLogo")}:</span> <strong>📎 {logoFile.name}</strong></div>}
          </div>
          
          <div className="inquiry-online-tip-box">
            <p>
              {t("inquirySuccessTip")}{" "}
              <a href={`/${currentLocale}/customize`} className="online-tool-link">
                【在线 3D 自助定制工具】➔
              </a>
            </p>
          </div>

          <button onClick={handleReset} className="btn-success-reset">
            {t("inquirySuccessBtn")}
          </button>
        </div>
      )}

      <style jsx global>{`
        .inquiry-form-container {
          max-width: 720px;
          margin: 2rem auto;
          width: 100%;
        }

        .inquiry-form-card {
          background: #ffffff;
          border: 1px solid #f2ede4;
          border-radius: 1.5rem;
          padding: 2.5rem;
          box-shadow: 0 15px 45px rgba(43, 38, 31, 0.04);
          transition: all 0.3s ease;
        }

        .form-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-header h3 {
          font-size: 1.65rem;
          font-family: 'Outfit', sans-serif;
          color: #2b261f;
          font-weight: 700;
          margin-bottom: 0.75rem;
          letter-spacing: -0.02em;
        }

        .form-header p {
          color: #7a6e60;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group.full-width {
          grid-column: span 2;
        }

        @media (max-width: 600px) {
          .form-group {
            grid-column: span 2 !important;
          }
          .inquiry-form-card {
            padding: 1.5rem;
          }
        }

        .form-label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #4a4238;
          display: flex;
          align-items: center;
        }

        .form-label.required::after {
          content: " *";
          color: #d32f2f;
          margin-left: 0.25rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          padding: 0.8rem 1rem;
          border: 1px solid #e1d8cc;
          border-radius: 0.75rem;
          background-color: #faf9f6;
          color: #2b261f;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          outline: none;
          font-family: inherit;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: #b48a50;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(180, 138, 80, 0.1);
        }

        .upload-dropzone {
          border: 2px dashed #d1c4b2;
          border-radius: 1rem;
          background-color: #fbfaf8;
          padding: 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .upload-dropzone:hover {
          border-color: #b48a50;
          background-color: #faf6f0;
        }

        .upload-icon {
          font-size: 2rem;
          display: block;
          margin-bottom: 0.75rem;
        }

        .upload-main-text {
          font-size: 0.95rem;
          font-weight: 600;
          color: #2b261f;
          margin-bottom: 0.25rem;
        }

        .upload-sub-text {
          font-size: 0.8rem;
          color: #8c7e6e;
        }

        .logo-uploaded-preview {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          text-align: left;
        }

        .logo-uploaded-preview img {
          width: 60px;
          height: 60px;
          object-fit: contain;
          border-radius: 0.5rem;
          border: 1px solid #e1d8cc;
          background: #fff;
          padding: 4px;
        }

        .file-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .file-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #2b261f;
          word-break: break-all;
        }

        .upload-tip {
          font-size: 0.8rem;
          color: #b48a50;
          text-decoration: underline;
        }

        .btn-submit-inquiry {
          width: 100%;
          padding: 1.1rem;
          background: linear-gradient(135deg, #2b261f 0%, #15120e 100%);
          color: #ffffff;
          border: none;
          border-radius: 1rem;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(21, 18, 14, 0.15);
        }

        .btn-submit-inquiry:hover {
          background: linear-gradient(135deg, #b48a50 0%, #96703c 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(180, 138, 80, 0.25);
        }

        /* 提交成功卡片 */
        .inquiry-success-card {
          background: #ffffff;
          border: 1px solid #e2f0d9;
          border-radius: 1.5rem;
          padding: 3rem 2.5rem;
          text-align: center;
          box-shadow: 0 15px 45px rgba(76, 175, 80, 0.05);
          animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .success-icon-badge {
          width: 64px;
          height: 64px;
          background: #e8f5e9;
          color: #4caf50;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin: 0 auto 1.5rem auto;
        }

        .inquiry-success-card h3 {
          font-size: 1.75rem;
          color: #2e7d32;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .success-desc {
          font-size: 1rem;
          color: #555;
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 580px;
          margin-left: auto;
          margin-right: auto;
        }

        .email-highlight {
          color: #2b261f;
          text-decoration: underline;
        }

        .success-details-summary {
          background-color: #faf9f6;
          border: 1px solid #f2ede4;
          border-radius: 1rem;
          padding: 1.25rem 2rem;
          max-width: 400px;
          margin: 0 auto 2rem auto;
          text-align: left;
        }

        .summary-line {
          display: flex;
          justify-content: space-between;
          padding: 0.4rem 0;
          font-size: 0.95rem;
          color: #7a6e60;
          border-bottom: 1px solid #f2ede4;
        }

        .summary-line:last-child {
          border-bottom: none;
        }

        .summary-line strong {
          color: #2b261f;
        }

        .inquiry-online-tip-box {
          background-color: #fff9f0;
          border: 1px dashed #ffe0b2;
          border-radius: 1rem;
          padding: 1rem;
          margin-bottom: 2rem;
          font-size: 0.9rem;
          color: #e65100;
          line-height: 1.5;
        }

        .online-tool-link {
          font-weight: bold;
          color: #e65100;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .online-tool-link:hover {
          color: #b53d00;
        }

        .btn-success-reset {
          padding: 0.9rem 2.5rem;
          background-color: #f2ede4;
          color: #6b5e4c;
          border: none;
          border-radius: 0.75rem;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-success-reset:hover {
          background-color: #e1d8cc;
          color: #2b261f;
        }

        /* 旋转加载动画 */
        .dot-loader {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 0.8s linear infinite;
          margin-right: 0.5rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes scaleUp {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .trust-indicators-container {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #f2ede4;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .trust-indicator-card {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          text-align: left;
        }

        .trust-indicator-icon {
          font-size: 1.3rem;
          background-color: #faf6f0;
          padding: 0.4rem;
          border-radius: 0.5rem;
          border: 1px solid #ebdcb9;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          line-height: 1;
        }

        .trust-indicator-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .trust-indicator-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #2b261f;
          margin: 0;
        }

        .trust-indicator-desc {
          font-size: 0.85rem;
          color: #7a6e60;
          margin: 0;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}

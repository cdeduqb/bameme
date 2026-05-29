import { getTranslations, setRequestLocale } from "next-intl/server";
import B2BLandingContainer from "@/components/B2BLandingContainer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Metadata } from "next";
import { routing, Link } from "@/i18n/routing";
import "./page.css";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Index" });
  const baseUrl = "https://www.bameme.com";

  const languageAlternates: Record<string, string> = {};
  routing.locales.forEach((loc) => {
    languageAlternates[loc] = `${baseUrl}/${loc}`;
  });

  return {
    title: t.has("metaTitle") ? t("metaTitle") : t("title"),
    description: t.has("metaDescription") ? t("metaDescription") : t("subtitle"),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: languageAlternates,
    },
    openGraph: {
      title: t.has("metaTitle") ? t("metaTitle") : t("title"),
      description: t.has("metaDescription") ? t("metaDescription") : t("subtitle"),
      url: `${baseUrl}/${locale}`,
      siteName: "BAMEME Packaging",
      images: [
        {
          url: `${baseUrl}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: "BAMEME Packaging Premium Jewelry Pouches",
        },
      ],
      locale: locale,
      type: "website",
    },
  };
}

export default async function IndexPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Index");

  const getLocaleText = (key: string, defaultEn: string, defaultZh: string) => {
    if (t.has(key)) {
      return t(key);
    }
    return locale === "zh" ? defaultZh : defaultEn;
  };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": t.has("metaTitle") ? t("metaTitle") : t("title"),
      "image": "https://www.bameme.com/images/product-main.jpg",
      "description": t.has("metaDescription") ? t("metaDescription") : t("subtitle"),
      "brand": {
        "@type": "Brand",
        "name": "BAMEME Packaging"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "0.10",
        "highPrice": "2.00",
        "offerCount": "1000",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "0.50",
          "priceCurrency": "USD",
          "referenceQuantity": {
            "@type": "QuantitativeValue",
            "value": "1000",
            "unitCode": "C62"
          }
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BAMEME Packaging",
      "url": "https://www.bameme.com",
      "logo": "https://www.bameme.com/images/logo.png",
      "description": "Factory-direct B2B manufacturer specializing in high-end customized jewelry pouches, microfiber drawstring bags, and luxury velvet packaging with low MOQ.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "contact@bameme.com",
        "url": "https://www.bameme.com#inquiry-form-section"
      },
      "knowsAbout": [
        "Custom jewelry pouch manufacturing",
        "Wholesale microfiber bags",
        "Velvet drawstring bags bulk production",
        "Sustainable luxury packaging"
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": t.has("faq1Question") ? t("faq1Question") : "What is the Minimum Order Quantity (MOQ)?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t.has("faq1Answer") ? t("faq1Answer") : "Our high-end microfiber and velvet drawstring bags start with a very low MOQ of 1000 units. It is highly friendly to Etsy creators, Shopify sellers, and boutique jewelry brands."
          }
        },
        {
          "@type": "Question",
          "name": t.has("faq2Question") ? t("faq2Question") : "Can I request a physical sample pack for free?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t.has("faq2Answer") ? t("faq2Answer") : "Yes. We offer a $0 physical sample pack containing multiple pouch sizes and print technique swatches (foil printing, debossing). You only need to pay $9.99 for global express courier postage to inspect texture and print quality first-hand."
          }
        },
        {
          "@type": "Question",
          "name": t.has("faq3Question") ? t("faq3Question") : "How long will production and shipping take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t.has("faq3Answer") ? t("faq3Answer") : "Once you confirm the 3D design proof, the production takes 7-10 business days. Finished goods are dispatched via express air cargo (DHL/FedEx) delivering directly to your door in 5-7 days globally with free shipping."
          }
        },
        {
          "@type": "Question",
          "name": t.has("faq4Question") ? t("faq4Question") : "How does the online 3D customizer work? Is it automated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t.has("faq4Answer") ? t("faq4Answer") : "Yes, it is fully automated. The logo coordinates, process, and sizing details you lock on our canvas generate structural metadata that binds directly to Stripe checkout. Once paid, the order pushes to our factory workflow instantly with zero manual errors."
          }
        },
        {
          "@type": "Question",
          "name": t.has("faq5Question") ? t("faq5Question") : "What is the scratch-protection difference between velvet and microfiber jewelry pouches?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t.has("faq5Answer") ? t("faq5Answer") : "Microfiber fabric offers an ultra-smooth, silk-like feel and features natural micro-dust cleaning and polishing properties, making it optimal for silver jewelry, pearls, and high-shine metals. Classic plush velvet is thicker and provides superior shock absorption, making it better for gold bangles, luxury smartwatches, and premium corporate gifts."
          }
        },
        {
          "@type": "Question",
          "name": t.has("faq6Question") ? t("faq6Question") : "Can I get a free 3D digital mockup if I don't have a finished vector logo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": t.has("faq6Answer") ? t("faq6Answer") : "Absolutely. Our professional packaging designers operate 24/7. Even if you only upload a standard JPG image, hand-drawn sketch, or simply type your brand name, our design team will reconstruct it and deliver a high-fidelity 3D mockup within 2 hours for free."
          }
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": locale === "zh" ? "定制超细纤维拉绳珠宝袋" : "Custom Microfiber Drawstring Jewelry Pouches",
      "image": "https://www.bameme.com/images/microfiber_pouch.png",
      "description": locale === "zh" ? "手感细腻柔润的特级超细纤维首饰收纳袋，自带微距抛光感。适合高级首饰、珠宝配件防刮擦定制。" : "Premium ultra-soft microfiber drawstring bags designed for luxury jewelry packaging, offering dust-cleaning scratch protection and bespoke textures.",
      "brand": {
        "@type": "Brand",
        "name": "BAMEME Packaging"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "0.15",
        "highPrice": "0.85",
        "offerCount": "1000",
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "value": "1000",
          "unitCode": "C62"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": locale === "zh" ? "定制奢华天鹅绒首饰袋" : "Custom Luxury Velvet Jewelry Pouches",
      "image": "https://www.bameme.com/images/velvet_bag.png",
      "description": locale === "zh" ? "精选密织奢华天鹅绒，质感华贵端庄。适合黄金手镯、奢华腕表与高定礼包定制。" : "Classic high-density plush velvet bags offering thick shock absorption and luxurious texture. Optimal for gold bracelets, luxury watches, and VIP gift packaging.",
      "brand": {
        "@type": "Brand",
        "name": "BAMEME Packaging"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "0.20",
        "highPrice": "0.95",
        "offerCount": "1000",
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "value": "1000",
          "unitCode": "C62"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": locale === "zh" ? "定制丝带手提艺术纸袋" : "Custom Silk Ribbon Art Paper Bags",
      "image": "https://www.bameme.com/images/ribbon_bag.png",
      "description": locale === "zh" ? "250g 加厚覆膜白卡纸，配以细腻光滑的真丝缎带手提。高端买手店及奢华美妆包装的首选。" : "Elegant 250g art cardboard boutique gift bags finished with soft silk ribbon handles. Perfect for luxury retail shops, cosmetic boutique wrapping, and gifts.",
      "brand": {
        "@type": "Brand",
        "name": "BAMEME Packaging"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "0.30",
        "highPrice": "1.20",
        "offerCount": "1000",
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "value": "1000",
          "unitCode": "C62"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": locale === "zh" ? "定制极简环保牛皮纸袋" : "Custom Eco-Friendly Kraft Paper Bags",
      "image": "https://www.bameme.com/images/kraft_bag.png",
      "description": locale === "zh" ? "100% 可回收原木牛皮纸，低碳降解环保纸手挽。倡导可持续理念的高端买手店与日常零售。" : "100% biodegradable and recyclable kraft paper bags with sturdy paper handles. Best for sustainable organic brands and eco-friendly boutiques packaging.",
      "brand": {
        "@type": "Brand",
        "name": "BAMEME Packaging"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "0.10",
        "highPrice": "0.50",
        "offerCount": "1000",
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "value": "1000",
          "unitCode": "C62"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": locale === "zh" ? "定制纯棉帆布防尘收纳袋" : "Custom Cotton Canvas Dust Bags",
      "image": "https://www.bameme.com/images/canvas_bag.png",
      "description": locale === "zh" ? "高克重纯天然耐磨纯棉帆布，自带抽绳束口，最适合数码配件与美容仪器保护防尘包装。" : "Heavy-weight organic cotton canvas drawstring pouches built for durability and dust-proof protection. Suitable for premium tech gadgets and cosmetic organizer packing.",
      "brand": {
        "@type": "Brand",
        "name": "BAMEME Packaging"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "0.25",
        "highPrice": "0.90",
        "offerCount": "1000",
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "value": "1000",
          "unitCode": "C62"
        }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": locale === "zh" ? "定制奢华压纹卡纸精品盒" : "Custom Rigid Magnetic VIP Gift Boxes",
      "image": "https://www.bameme.com/images/magnetic_box.png",
      "description": locale === "zh" ? "特种压纹卡纸包覆加厚硬纸板板，内嵌隐形磁吸。大宗商务礼品与尊贵腕表首饰套盒的首选。" : "VIP rigid paperboard magnetic closing packaging boxes wrapped in custom textured embossed paper. Ultimate choice for corporate set packages and luxury watch collection box.",
      "brand": {
        "@type": "Brand",
        "name": "BAMEME Packaging"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "0.50",
        "highPrice": "2.00",
        "offerCount": "1000",
        "eligibleQuantity": {
          "@type": "QuantitativeValue",
          "value": "1000",
          "unitCode": "C62"
        }
      }
    }
  ];

  return (
    <div className="app-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 顶部导航 */}
      <header className="site-header">
        <div className="header-inner">
          <div className="brand-logo">
            <span className="brand-name">BAMEME</span>
            <span className="brand-badge">PACKAGING</span>
          </div>
          
          {/* 顶部导航链接 */}
          <div className="header-right-nav" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <a href="#inquiry-form-section" className="nav-inquiry-link" style={{ fontSize: "0.95rem", color: "#555", textDecoration: "none", fontWeight: 600 }}>
              {t("navGetQuote")}
            </a>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </header>

      {/* Hero 区域 */}
      <section className="hero-section">
        <h1 className="hero-title">{t("title")}</h1>
        <p className="hero-subtitle">{t("subtitle")}</p>
        <div className="hero-badges">
          <span className="hero-badge">{t("badgeMoq")}</span>
          <span className="hero-badge">{t("badgeShipping")}</span>
          <span className="hero-badge">{t("badgeMockup")}</span>
        </div>
        
        {/* B2B 核心引导动作组 */}
        <div className="hero-actions">
          <a href="#inquiry-form-section" className="btn-hero-primary">
            {t("btnHeroPrimary")}
          </a>
          <a href="#inquiry-form-section" className="btn-hero-secondary">
            {t("btnHeroSecondary")}
          </a>
        </div>
      </section>

      {/* 核心功能区：B2B 主体交互落地页 */}
      <main className="main-content-wrapper">
        <B2BLandingContainer currentLocale={locale} />
      </main>

      {/* 定制流程 4 步法 */}
      <section className="workflow-section">
        <h2 className="section-title">{t("howItWorksTitle")}</h2>
        <div className="workflow-grid">
          <div className="workflow-card">
            <div className="step-number">01</div>
            <h3 className="step-title">{t("step1Title")}</h3>
            <p className="step-desc">{t("step1Desc")}</p>
          </div>
          <div className="workflow-card">
            <div className="step-number">02</div>
            <h3 className="step-title">{t("step2Title")}</h3>
            <p className="step-desc">{t("step2Desc")}</p>
          </div>
          <div className="workflow-card">
            <div className="step-number">03</div>
            <h3 className="step-title">{t("step3Title")}</h3>
            <p className="step-desc">{t("step3Desc")}</p>
          </div>
          <div className="workflow-card">
            <div className="step-number">04</div>
            <h3 className="step-title">{t("step4Title")}</h3>
            <p className="step-desc">{t("step4Desc")}</p>
          </div>
        </div>
      </section>

      {/* 产品卖点特点 */}
      <section className="features-section">
        <h2 className="section-title">{t("featuresTitle")}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3 className="feature-title">{t("feature1Title")}</h3>
            <p className="feature-desc">{t("feature1Desc")}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">{t("feature2Title")}</h3>
            <p className="feature-desc">{t("feature2Desc")}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✈️</div>
            <h3 className="feature-title">{t("feature3Title")}</h3>
            <p className="feature-desc">{t("feature3Desc")}</p>
          </div>
        </div>
      </section>

      {/* 真实客户评价/证言 Testimonials */}
      <section className="testimonials-section" style={{ padding: "5rem 2rem", background: "#ffffff", borderTop: "1px solid #ebdcb9" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "1rem" }}>
            {getLocaleText("testimonialsSectionTitle", "Trusted by 10,000+ Jewelry Brands & Creators Worldwide", "全球 10,000+ 珠宝品牌与创作者的信任之选")}
          </h2>
          <p style={{ textAlign: "center", color: "#7a6e60", marginBottom: "3.5rem", fontSize: "0.95rem" }}>
            ⭐ Rated 4.9/5 stars based on 1,200+ verified B2B orders.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            
            <div className="testimonial-card" style={{ background: "#fdfbf7", padding: "2rem", borderRadius: "1.25rem", border: "1px solid #ebdcb9", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 6px 18px rgba(180,150,100,0.03)" }}>
              <div style={{ fontSize: "1.25rem", color: "#b48a50", marginBottom: "1rem" }}>★★★★★</div>
              <p style={{ fontSize: "0.95rem", color: "#4a4238", lineHeight: 1.6, fontStyle: "italic", margin: "0 0 1.5rem 0" }}>
                "{getLocaleText(
                  "testimonial1Text",
                  "The low MOQ of 1000 units is a lifesaver for my small artisan jewelry shop. The microfiber bags feel extremely premium, and the gold foil stamp is flawless. Highly recommend!",
                  "起订量 1000 个对我这种刚起步的手工作坊非常友好！超细纤维束口袋手感非常奢华，烫金效果完美，客户收到都赞不绝口。会长期回购！"
                )}"
              </p>
              <div>
                <strong style={{ display: "block", color: "#2b261f", fontSize: "0.95rem" }}>
                  {getLocaleText("testimonial1Name", "Sophia R.", "Sophia R.")}
                </strong>
                <span style={{ fontSize: "0.8rem", color: "#8c7e6e" }}>
                  {getLocaleText("testimonial1Role", "Etsy Shop Owner (UK)", "Etsy 精品首饰店主 (英国)")}
                </span>
              </div>
            </div>

            <div className="testimonial-card" style={{ background: "#fdfbf7", padding: "2rem", borderRadius: "1.25rem", border: "1px solid #ebdcb9", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 6px 18px rgba(180,150,100,0.03)" }}>
              <div style={{ fontSize: "1.25rem", color: "#b48a50", marginBottom: "1rem" }}>★★★★★</div>
              <p style={{ fontSize: "0.95rem", color: "#4a4238", lineHeight: 1.6, fontStyle: "italic", margin: "0 0 1.5rem 0" }}>
                "{getLocaleText(
                  "testimonial2Text",
                  "The physical sample pack is incredibly helpful. The logo positions matched perfectly with the final mass production. Delivery to New York via air cargo took only 5 days!",
                  "物理材质样品包非常值。3D 在线定制工具确定的 LOGO 尺寸在出大货时极其精准。大货空运只花了 5 天就送到纽约了，非常赞的效率！"
                )}"
              </p>
              <div>
                <strong style={{ display: "block", color: "#2b261f", fontSize: "0.95rem" }}>
                  {getLocaleText("testimonial2Name", "Marcus K.", "Marcus K.")}
                </strong>
                <span style={{ fontSize: "0.8rem", color: "#8c7e6e" }}>
                  {getLocaleText("testimonial2Role", "Founder, Fine Jewelry Brand (USA)", "高级珠宝品牌创始人 (美国)")}
                </span>
              </div>
            </div>

            <div className="testimonial-card" style={{ background: "#fdfbf7", padding: "2rem", borderRadius: "1.25rem", border: "1px solid #ebdcb9", display: "flex", flexDirection: "column", justifyContent: "space-between", boxShadow: "0 6px 18px rgba(180,150,100,0.03)" }}>
              <div style={{ fontSize: "1.25rem", color: "#b48a50", marginBottom: "1rem" }}>★★★★★</div>
              <p style={{ fontSize: "0.95rem", color: "#4a4238", lineHeight: 1.6, fontStyle: "italic", margin: "0 0 1.5rem 0" }}>
                "{getLocaleText(
                  "testimonial3Text",
                  "Excellent velvet fabric quality, extremely soft and thick. It provides crucial scratch and shock protection for our premium perfume glass packaging. Outstanding service!",
                  "袋子选用的天鹅绒质感极佳，柔软厚实且极其细腻，这对于我们精致的玻璃香水瓶包装提供了完美的防刮蹭与避震缓冲保护。合作体验非常专业！"
                )}"
              </p>
              <div>
                <strong style={{ display: "block", color: "#2b261f", fontSize: "0.95rem" }}>
                  {getLocaleText("testimonial3Name", "Aria V.", "Aria V.")}
                </strong>
                <span style={{ fontSize: "0.8rem", color: "#8c7e6e" }}>
                  {getLocaleText("testimonial3Role", "Design Director, Perfume Label (France)", "设计总监, 跨国时尚香水 (法国)")}
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 常见问题解答 FAQ */}
      <section className="faq-section" style={{ padding: "4.5rem 2rem", background: "#fbfaf7", borderTop: "1px solid #ebdcb9" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "3rem" }}>
            {getLocaleText("faqSectionTitle", "Frequently Asked Questions (B2B FAQ)", "常见问题解答 (B2B FAQ)")}
          </h2>

          {/* AI & Buyer Quick Reference Grid */}
          <div className="ai-quick-reference-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
            marginBottom: "3.5rem"
          }}>
            <div className="ai-ref-card" style={{
              background: "#ffffff",
              border: "1px solid #eebdcb9",
              borderColor: "#ebdcb9",
              borderRadius: "1.25rem",
              padding: "1.75rem 1.5rem",
              boxShadow: "0 6px 18px rgba(180,150,100,0.02)",
              textAlign: "center",
              transition: "transform 0.25s ease"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🎯</div>
              <strong style={{ display: "block", color: "#2b261f", fontSize: "1rem", marginBottom: "0.4rem" }}>
                {locale === "zh" ? "起订量 (MOQ)" : "Minimum Order (MOQ)"}
              </strong>
              <span style={{ color: "#b48a50", fontWeight: 800, fontSize: "1.25rem" }}>1,000 Pcs</span>
            </div>

            <div className="ai-ref-card" style={{
              background: "#ffffff",
              border: "1px solid #ebdcb9",
              borderRadius: "1.25rem",
              padding: "1.75rem 1.5rem",
              boxShadow: "0 6px 18px rgba(180,150,100,0.02)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>⚡</div>
              <strong style={{ display: "block", color: "#2b261f", fontSize: "1rem", marginBottom: "0.4rem" }}>
                {locale === "zh" ? "免费 3D 样稿" : "Free 3D Mockup"}
              </strong>
              <span style={{ color: "#b48a50", fontWeight: 800, fontSize: "1.25rem" }}>
                {locale === "zh" ? "2 小时极速出样" : "Within 2 Hours"}
              </span>
            </div>

            <div className="ai-ref-card" style={{
              background: "#ffffff",
              border: "1px solid #ebdcb9",
              borderRadius: "1.25rem",
              padding: "1.75rem 1.5rem",
              boxShadow: "0 6px 18px rgba(180,150,100,0.02)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🎁</div>
              <strong style={{ display: "block", color: "#2b261f", fontSize: "1rem", marginBottom: "0.4rem" }}>
                {locale === "zh" ? "实物材质样品" : "Physical Samples"}
              </strong>
              <span style={{ color: "#b48a50", fontWeight: 800, fontSize: "1.25rem" }}>
                {locale === "zh" ? "$0 领用 ($9.99 邮资)" : "$0 Free ($9.99 Post)"}
              </span>
            </div>

            <div className="ai-ref-card" style={{
              background: "#ffffff",
              border: "1px solid #ebdcb9",
              borderRadius: "1.25rem",
              padding: "1.75rem 1.5rem",
              boxShadow: "0 6px 18px rgba(180,150,100,0.02)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🏭</div>
              <strong style={{ display: "block", color: "#2b261f", fontSize: "1rem", marginBottom: "0.4rem" }}>
                {locale === "zh" ? "大货生产周期" : "Production Lead Time"}
              </strong>
              <span style={{ color: "#b48a50", fontWeight: 800, fontSize: "1.25rem" }}>7 - 10 Days</span>
            </div>

            <div className="ai-ref-card" style={{
              background: "#ffffff",
              border: "1px solid #ebdcb9",
              borderRadius: "1.25rem",
              padding: "1.75rem 1.5rem",
              boxShadow: "0 6px 18px rgba(180,150,100,0.02)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>✈️</div>
              <strong style={{ display: "block", color: "#2b261f", fontSize: "1rem", marginBottom: "0.4rem" }}>
                {locale === "zh" ? "专线空运时效" : "Express Air Cargo"}
              </strong>
              <span style={{ color: "#b48a50", fontWeight: 800, fontSize: "1.25rem" }}>
                {locale === "zh" ? "5 - 7 天 (全球免邮)" : "5 - 7 Days (Free)"}
              </span>
            </div>

            <div className="ai-ref-card" style={{
              background: "#ffffff",
              border: "1px solid #ebdcb9",
              borderRadius: "1.25rem",
              padding: "1.75rem 1.5rem",
              boxShadow: "0 6px 18px rgba(180,150,100,0.02)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>💳</div>
              <strong style={{ display: "block", color: "#2b261f", fontSize: "1rem", marginBottom: "0.4rem" }}>
                {locale === "zh" ? "安全支付系统" : "Secure Checkout"}
              </strong>
              <span style={{ color: "#b48a50", fontWeight: 800, fontSize: "1.25rem" }}>Stripe 3D-Secure</span>
            </div>
          </div>

          <div className="faq-list" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "800px", margin: "0 auto" }}>
            <div className="faq-item" style={{ background: "#ffffff", padding: "1.75rem", borderRadius: "1.25rem", border: "1px solid #f2ede4", boxShadow: "0 4px 12px rgba(43,38,31,0.02)" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2b261f", margin: "0 0 0.6rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>❓</span> {getLocaleText("faq1Question", "What is the Minimum Order Quantity (MOQ)?", "定制的最小起订量 (MOQ) 是多少？")}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#7a6e60", margin: 0, lineHeight: 1.6 }}>
                {getLocaleText(
                  "faq1Answer",
                  "Our high-end microfiber and velvet drawstring bags start with a very low MOQ of 1000 units. It is highly friendly to Etsy creators, Shopify sellers, and boutique jewelry brands.",
                  "我们的高端超细纤维和天鹅绒束口袋定制起订量仅为 1000 个。这对 Shopify 卖家、Etsy 手艺人及初创珠宝品牌极为友好，有助于降低前期仓储与资金压力。"
                )}
              </p>
            </div>
            
            <div className="faq-item" style={{ background: "#ffffff", padding: "1.75rem", borderRadius: "1.25rem", border: "1px solid #f2ede4", boxShadow: "0 4px 12px rgba(43,38,31,0.02)" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2b261f", margin: "0 0 0.6rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>❓</span> {getLocaleText("faq2Question", "Can I request a physical sample pack for free?", "我可以免费索取物理样品包吗？")}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#7a6e60", margin: 0, lineHeight: 1.6 }}>
                {getLocaleText(
                  "faq2Answer",
                  "Yes. We offer a $0 physical sample pack containing multiple pouch sizes and print technique swatches (foil printing, debossing). You only need to pay $9.99 for global express courier postage to inspect texture and print quality first-hand.",
                  "可以。我们提供价值 $0 的物理材质样品包（内含多种尺寸与烫金、热压工艺实物），您仅需支付 $9.99 的全球特快专线邮资即可收到，方便您亲手检验布料质感和印刷品质。"
                )}
              </p>
            </div>

            <div className="faq-item" style={{ background: "#ffffff", padding: "1.75rem", borderRadius: "1.25rem", border: "1px solid #f2ede4", boxShadow: "0 4px 12px rgba(43,38,31,0.02)" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2b261f", margin: "0 0 0.6rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>❓</span> {getLocaleText("faq3Question", "How long will production and shipping take?", "从下单到最终送达需要多久？")}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#7a6e60", margin: 0, lineHeight: 1.6 }}>
                {getLocaleText(
                  "faq3Answer",
                  "Once you confirm the 3D design proof, the production takes 7-10 business days. Finished goods are dispatched via express air cargo (DHL/FedEx) delivering directly to your door in 5-7 days globally with free shipping.",
                  "确认 3D 设计稿后，大货的生产周期一般为 7-10 个工作日。出厂后直接通过特快专线空运，5-7 天送货上门，全球免邮且免除海运积压风险。"
                )}
              </p>
            </div>

            <div className="faq-item" style={{ background: "#ffffff", padding: "1.75rem", borderRadius: "1.25rem", border: "1px solid #f2ede4", boxShadow: "0 4px 12px rgba(43,38,31,0.02)" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2b261f", margin: "0 0 0.6rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>❓</span> {getLocaleText("faq4Question", "How does the online 3D customizer work? Is it automated?", "在线 3D 定制系统是如何工作的？安全吗？")}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#7a6e60", margin: 0, lineHeight: 1.6 }}>
                {getLocaleText(
                  "faq4Answer",
                  "Yes, it is fully automated. The logo coordinates, process, and sizing details you lock on our canvas generate structural metadata that binds directly to Stripe checkout. Once paid, the order pushes to our factory workflow instantly with zero manual errors.",
                  "非常安全。您在智能画布上拖拽并实时渲染的 Logo 坐标和选定工艺，会被自动打包成 JSON-LD 结构并透传至付款接口。订单支付后直接下发车间，免去传统打样确认的沟通成本，实现 100% 零误差生产。"
                )}
              </p>
            </div>

            <div className="faq-item" style={{ background: "#ffffff", padding: "1.75rem", borderRadius: "1.25rem", border: "1px solid #f2ede4", boxShadow: "0 4px 12px rgba(43,38,31,0.02)" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2b261f", margin: "0 0 0.6rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>❓</span> {getLocaleText("faq5Question", "What is the scratch-protection difference between velvet and microfiber jewelry pouches?", "超细纤维绒与天鹅绒首饰袋在防刮保护上有什么区别？我该选哪种？")}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#7a6e60", margin: 0, lineHeight: 1.6 }}>
                {getLocaleText(
                  "faq5Answer",
                  "Microfiber fabric offers an ultra-smooth, silk-like feel and features natural micro-dust cleaning and polishing properties, making it optimal for silver jewelry, pearls, and high-shine metals. Classic plush velvet is thicker and provides superior shock absorption, making it better for gold bangles, luxury smartwatches, and premium corporate gifts.",
                  "超细纤维绒触感极为细腻丝滑，天然具备微距除尘与首饰抛光属性，最适合高端银饰、珍珠及带有镜面金属的防细微划痕保护；而密织天鹅绒厚实饱满，避震与跌落缓冲力更佳，更适合黄金手镯、高端智能手表及 VIP 奢华礼品定制。"
                )}
              </p>
            </div>

            <div className="faq-item" style={{ background: "#ffffff", padding: "1.75rem", borderRadius: "1.25rem", border: "1px solid #f2ede4", boxShadow: "0 4px 12px rgba(43,38,31,0.02)" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#2b261f", margin: "0 0 0.6rem 0", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>❓</span> {getLocaleText("faq6Question", "Can I get a free 3D digital mockup if I don't have a finished vector logo?", "如果我没有设计好的矢量 LOGO 图稿，还能获取免费的 3D 样稿吗？")}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "#7a6e60", margin: 0, lineHeight: 1.6 }}>
                {getLocaleText(
                  "faq6Answer",
                  "Absolutely. Our professional packaging designers operate 24/7. Even if you only upload a standard JPG image, hand-drawn sketch, or simply type your brand name, our design team will reconstruct it and deliver a high-fidelity 3D mockup within 2 hours for free.",
                  "完全可以。我们拥有一支 24 小时在线的专业包装美学设计师团队。您仅需上传您现有的普通 JPG 图片、手绘草图甚至仅仅是打字输入品牌名称构想，我们的设计师都会在 2 小时内为您免费重构并制作高保真 3D 渲染设计样稿。"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="site-footer">
        <div className="footer-inner">
          {/* 安全支付与物流合作伙伴 */}
          <div className="trust-partners-bar" style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "left" }}>
            <h4 style={{ color: "#ebdcb9", fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {getLocaleText("trustPartnersTitle", "Secure Payments & Global Express Logistics Partners", "安全支付与国际物流保障")}
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1rem 2.5rem", color: "#a89b87", fontSize: "0.85rem", fontWeight: 500 }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>🔒 Stripe 3D-Secure</span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>💳 Visa / Mastercard</span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>📦 DHL Express</span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>📦 FedEx International</span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>📦 UPS Saver</span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>🧶 Premium Velvet</span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>🌲 FSC Certified Paper</span>
            </div>
          </div>

          {/* 热门行业导流目录 */}
          <div className="industries-serve-directory" style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "left" }}>
            <h4 style={{ color: "#ebdcb9", fontSize: "0.95rem", fontWeight: 700, marginBottom: "1.25rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {getLocaleText("industriesSectionTitle", "Popular Industries We Serve", "我们服务的热门行业 (Industries We Serve)")}
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem 2rem", fontSize: "0.85rem" }}>
              <Link href="/industries/jewelry" className="industry-link">• {getLocaleText("industryJewelry", "Jewelry & Accessories Packaging", "珠宝饰品")}</Link>
              <Link href="/industries/cosmetics" className="industry-link">• {getLocaleText("industryCosmetics", "Luxury Cosmetics & Perfume Bags", "美妆香水")}</Link>
              <Link href="/industries/gifts" className="industry-link">• {getLocaleText("industryGifts", "Corporate Gifts & VIP Giveaways", "商务礼品")}</Link>
              <Link href="/industries/tech" className="industry-link">• {getLocaleText("industryTech", "Premium Tech Gadgets & Earbud Pouches", "数码配件")}</Link>
              <Link href="/industries/watches" className="industry-link">• {getLocaleText("industryWatches", "Watch & Eyewear Scratch Protection", "腕表眼镜")}</Link>
            </div>
          </div>

          <p>© {new Date().getFullYear()} BAMEME B2B Packaging. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">B2B Wholesale Terms</a>
            <a href="#">Shipping & Refund Policy</a>
            <a href="#">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

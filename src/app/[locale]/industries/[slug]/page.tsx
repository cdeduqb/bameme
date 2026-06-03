import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import InquiryForm from "@/components/InquiryForm";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import "../../page.css";
import "./page.css";

interface IndustryPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

import { INDUSTRIES } from "./industriesData";


export async function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];
  routing.locales.forEach((locale) => {
    Object.keys(INDUSTRIES).forEach((slug) => {
      paths.push({ locale, slug });
    });
  });
  return paths;
}

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const industry = INDUSTRIES[slug];
  if (!industry) return notFound();

  // 根据当前语种获取对应的翻译文案，如果无对应语种则降级使用 en
  const trans = industry.locales[locale] || industry.locales.en;
  const baseUrl = "https://www.bameme.com";

  const languageAlternates: Record<string, string> = {
    "x-default": `${baseUrl}/en/industries/${slug}`,
  };
  routing.locales.forEach((loc) => {
    languageAlternates[loc] = `${baseUrl}/${loc}/industries/${slug}`;
  });

  return {
    title: trans.metaTitle,
    description: trans.metaDesc,
    alternates: {
      canonical: `${baseUrl}/${locale}/industries/${slug}`,
      languages: languageAlternates,
    },
    openGraph: {
      title: trans.metaTitle,
      description: trans.metaDesc,
      url: `${baseUrl}/${locale}/industries/${slug}`,
      siteName: "BAMEME Packaging",
      images: [
        {
          url: `${baseUrl}${industry.image}`,
          width: 800,
          height: 800,
          alt: trans.title,
        },
      ],
      locale: locale,
      type: "website",
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Index");
  const industry = INDUSTRIES[slug];
  if (!industry) return notFound();

  const trans = industry.locales[locale] || industry.locales.en;

  // 面包屑及常规文本的本地化（若 Index.json 里有对应 key 就翻译，没有就降级）
  const getIndexText = (key: string, defaultEn: string, defaultZh: string) => {
    if (t.has(key)) {
      const val = t(key);
      if (key === "backToHome" && val.startsWith("←")) {
        return val.replace(/^←\s*/, "");
      }
      return val;
    }
    
    // 针对面包屑导航与常规文本的内置 11 国多语言词典，以实现开箱即用的高奢本地化
    const dicts: Record<string, Record<string, string>> = {
      homeBreadcrumb: {
        zh: "首页",
        en: "Home",
        de: "Startseite",
        es: "Inicio",
        fr: "Accueil",
        it: "Home",
        ja: "ホーム",
        ko: "홈",
        pt: "Início",
        ru: "Главная",
        ar: "الرئيسية"
      },
      industriesBreadcrumb: {
        zh: "热门行业",
        en: "Industries",
        de: "Branchen",
        es: "Industrias",
        fr: "Secteurs",
        it: "Settori",
        ja: "対象行业",
        ko: "인기 산업",
        pt: "Indústrias",
        ru: "Отрасли",
        ar: "القطاعات"
      },
      backToHome: {
        zh: "返回主页",
        en: "Back to Home",
        de: "Zurück zur Startseite",
        es: "Volver al inicio",
        fr: "Retour à l'accueil",
        it: "Torna alla Home",
        ja: "B2B 問い合わせホームページに戻る",
        ko: "홈페이지로 돌아가기",
        pt: "Voltar ao início",
        ru: "Вернуться на главную",
        ar: "العودة إلى الرئيسية"
      },
      getIndustryQuote: {
        zh: "获取专属方案与报价 ➔",
        en: "Get Industry Setup & Quote ➔",
        de: "Konzept & Angebot anfordern ➔",
        es: "Obtenga su diseño y cotización ➔",
        fr: "Obtenir un concept & devis ➔",
        it: "Richiedi progetto e preventivo ➔",
        ja: "業界向け提案・見積もりを取得 ➔",
        ko: "전용 솔루션 및 견적 받기 ➔",
        pt: "Obter proposta e cotação ➔",
        ru: "Получить индивидуальное предложение ➔",
        ar: "احصل على العرض والتصميم ➔"
      }
    };

    if (dicts[key] && dicts[key][locale]) {
      return dicts[key][locale];
    }
    return locale === "zh" ? defaultZh : defaultEn;
  };

  // 生成 FAQ 联动面包屑
  const homeText = getIndexText("homeBreadcrumb", "Home", "首页");
  const industriesText = getIndexText("industriesBreadcrumb", "Industries", "热门行业");
  const currentIndustryText = getIndexText(`industry${slug.charAt(0).toUpperCase() + slug.slice(1)}`, trans.title, trans.title);

  // 针对该行业表单生成的 Note 预设模板
  const formNoteTemplate = locale === "zh" 
    ? `您好！我想索取 ${currentIndustryText} 行业的定制免费 3D 设计图和样品包报价。`
    : `Hi! We want to request custom 3D mockups and a sample pack quote for ${slug} bags packaging.`;

  // 生成结构化数据 (JSON-LD) 供 Google 及 AI 搜索引擎爬取
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": trans.title,
      "image": `https://www.bameme.com${industry.image}`,
      "description": trans.metaDesc,
      "brand": {
        "@type": "Brand",
        "name": "BAMEME Packaging"
      },
      "category": currentIndustryText,
      "sku": `BAMEME-IND-${slug.toUpperCase()}`,
      "mpn": `BAMEME-IND-${slug.toUpperCase()}`,
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Marcus K."
        },
        "reviewBody": locale === "zh" ? "物理材质样品包非常值。3D 在线定制工具确定的 LOGO 尺寸在出大货时极其精准。大货空运只花了 5 天就送到纽约了，非常赞的效率！" : "The physical sample pack is incredibly helpful. The logo positions matched perfectly with the final mass production. Delivery to New York via air cargo took only 5 days!"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "1200"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "0.10",
        "highPrice": "2.00",
        "offerCount": "1000",
        "url": `https://www.bameme.com/${locale}/industries/${slug}`,
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock",
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
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": homeText,
          "item": `https://www.bameme.com/${locale}`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": currentIndustryText,
          "item": `https://www.bameme.com/${locale}/industries/${slug}`
        }
      ]
    }
  ];

  return (
    <div className="app-container industry-page-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 顶部导航 */}
      <header className="site-header">
        <div className="header-inner">
          <div className="brand-logo">
            <Link href="/" className="brand-link" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
              <span className="brand-name">BAMEME</span>
              <span className="brand-badge">PACKAGING</span>
            </Link>
          </div>
          
          <div className="header-right-nav" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Link href="/" className="nav-inquiry-link" style={{ fontSize: "0.95rem", color: "#555", textDecoration: "none", fontWeight: 600 }}>
              ← {getIndexText("backToHome", "Back to Home", "返回主页")}
            </Link>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </header>

      {/* 面包屑导航 Breadcrumbs */}
      <nav className="breadcrumb-nav">
        <div className="breadcrumb-inner">
          <div className="breadcrumb-item">
            <Link href="/" className="breadcrumb-link">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>{homeText}</span>
            </Link>
          </div>
          <span className="breadcrumb-separator">/</span>
          <div className="breadcrumb-item">
            <span className="breadcrumb-text-muted">{industriesText}</span>
          </div>
          <span className="breadcrumb-separator">/</span>
          <div className="breadcrumb-item">
            <span className="breadcrumb-text-active">{currentIndustryText}</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="industry-hero-section" style={{ padding: "4rem 2rem", background: "radial-gradient(circle at 10% 20%, rgb(43, 38, 31) 0%, rgb(20, 18, 16) 90.2%)", color: "#ffffff", borderBottom: "3px solid #b48a50" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "3rem", alignItems: "center" }}>
          
          <div className="hero-text-content">
            <span style={{ background: "rgba(180, 138, 80, 0.2)", color: "#ebdcb9", border: "1px solid rgba(180, 138, 80, 0.4)", padding: "0.4rem 1rem", borderRadius: "2rem", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", display: "inline-block", marginBottom: "1.5rem" }}>
              {industry.icon} {currentIndustryText} Specialist
            </span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.2, color: "#fdfbf7", margin: "0 0 1.5rem 0" }}>
              {trans.title}
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#ebdcb9", lineHeight: 1.5, margin: "0 0 2rem 0", fontWeight: 300 }}>
              {trans.subtitle}
            </p>
            <p style={{ fontSize: "0.95rem", color: "#bdaea0", lineHeight: 1.7, margin: "0 0 2rem 0" }}>
              {trans.intro}
            </p>
            <a href="#inquiry-form-section" className="cta-button-gold" style={{ display: "inline-block", background: "linear-gradient(135deg, #c5a059 0%, #b48a50 100%)", color: "#ffffff", padding: "1rem 2.2rem", borderRadius: "2rem", fontWeight: 600, textDecoration: "none", fontSize: "1rem", boxShadow: "0 4px 15px rgba(180,138,80,0.35)", transition: "transform 0.2s" }}>
              {getIndexText("getIndustryQuote", "Get Industry Setup & Quote ➔", "获取专属方案与报价 ➔")}
            </a>
          </div>

          <div className="hero-image-wrapper" style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", borderRadius: "1.5rem", overflow: "hidden", border: "1px solid #4a3e30", boxShadow: "0 20px 40px rgba(0,0,0,0.5)", background: "#1a1614", padding: "2rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img 
                src={industry.image} 
                alt={trans.title}
                style={{ width: "100%", maxHeight: "350px", objectFit: "contain", filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.45))" }}
              />
            </div>
          </div>

        </div>
      </section>

      {/* Advantage & Features Section */}
      <section className="industry-advantages" style={{ padding: "5rem 2rem", background: "#fdfbf7" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", textAlign: "center", marginBottom: "3.5rem", color: "#2b261f" }}>
            {trans.advantageTitle}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {trans.advantages.map((adv, idx) => (
              <div key={idx} className="adv-card" style={{ background: "#ffffff", padding: "2rem", borderRadius: "1rem", border: "1px solid #ebdcb9", display: "flex", flexDirection: "column", gap: "1rem", boxShadow: "0 4px 12px rgba(180,150,100,0.02)" }}>
                <div style={{ width: "2.5rem", height: "2.5rem", background: "#f5edd6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#b48a50", fontWeight: 700, fontSize: "1.1rem" }}>
                  0{idx + 1}
                </div>
                <p style={{ fontSize: "0.95rem", color: "#4a4238", lineHeight: 1.6, margin: 0 }}>
                  {adv}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Component Integration */}
      <section id="inquiry-form-section" className="industry-inquiry-section" style={{ padding: "5rem 2rem", background: "#f6f4f0", borderTop: "1px solid #ebdcb9" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", color: "#2b261f", margin: "0 0 1rem 0" }}>
              {getIndexText("industryInquiryTitle", "Request Custom 3D Design & Pricing", "索取专属 3D 设计图与大货报价")}
            </h2>
            <p style={{ color: "#7a6e60", fontSize: "0.95rem" }}>
              {getIndexText("industryInquiryDesc", "Tell us your dimensions, logo, and quantity. Free sample kits included with every quote.", "提交您的尺寸与LOGO需求。每次报价均免费提供物理材质样品包寄送。")}
            </p>
          </div>
          <div style={{ background: "#ffffff", borderRadius: "1.5rem", padding: "1rem", border: "1px solid #ebdcb9", boxShadow: "0 10px 30px rgba(180,150,100,0.05)" }}>
            <InquiryForm 
              currentLocale={locale}
              defaultScenario={industry.scenario}
              defaultQty={industry.defaultQty}
              defaultColor={industry.defaultColor}
              defaultProcess={industry.defaultProcess}
              defaultNote={formNoteTemplate}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer" style={{ background: "#1e1b18", color: "#bdaea0", padding: "3rem 2rem", fontSize: "0.85rem", borderTop: "1px solid #332d28" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "2rem", alignItems: "center" }}>
          <div>
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} BAMEME B2B Packaging. All rights reserved.</p>
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link href="/" style={{ color: "#bdaea0", textDecoration: "none" }}>{getIndexText("backToHome", "Back to Home", "返回主页")}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

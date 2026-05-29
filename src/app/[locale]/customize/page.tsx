import { getTranslations, setRequestLocale } from "next-intl/server";
import ProductPageContainer from "@/components/ProductPageContainer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "next/link";
import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import "../page.css"; // 引入共享的主体样式

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Index" });
  const baseUrl = "https://www.bameme.com";

  const languageAlternates: Record<string, string> = {
    "x-default": `${baseUrl}/en/customize`,
  };
  routing.locales.forEach((loc) => {
    languageAlternates[loc] = `${baseUrl}/${loc}/customize`;
  });

  const title = `${t("customizerSystemTitle")} | BAMEME Packaging`;
  const description = t("customizerSystemSubtitle");

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/customize`,
      languages: languageAlternates,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/customize`,
      siteName: "BAMEME Packaging",
      images: [
        {
          url: `${baseUrl}/images/product-main.jpg`,
          width: 800,
          height: 800,
          alt: t("customizerSystemTitle"),
        },
      ],
      locale: locale,
      type: "website",
    },
  };
}

export default async function CustomizePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Index");

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": t.has("customizerSystemTitle") ? `${t("customizerSystemTitle")} Guide` : "How to Customize Jewelry Pouches Online",
      "description": t.has("customizerSystemSubtitle") ? t("customizerSystemSubtitle") : "Learn how to customize your brand logo on premium microfiber and velvet bags using our real-time 3D builder.",
      "step": [
        {
          "@type": "HowToStep",
          "name": t.has("step1Title") ? t("step1Title") : "Upload Brand LOGO",
          "text": t.has("step1Desc") ? t("step1Desc") : "Upload your design file. The smart canvas automatically filters out white backgrounds.",
          "url": "https://www.bameme.com/customize"
        },
        {
          "@type": "HowToStep",
          "name": t.has("step2Title") ? t("step2Title") : "Real-time Customize Preview",
          "text": t.has("step2Desc") ? t("step2Desc") : "Adjust size, drag to position, and toggle gold foil, silver foil, or debossing effects.",
          "url": "https://www.bameme.com/customize"
        },
        {
          "@type": "HowToStep",
          "name": t.has("step3Title") ? t("step3Title") : "Order Sample",
          "text": t.has("step3Desc") ? t("step3Desc") : "Order a physical sample pack to inspect texture and print quality first-hand.",
          "url": "https://www.bameme.com/customize"
        },
        {
          "@type": "HowToStep",
          "name": t.has("step4Title") ? t("step4Title") : "Mass Production Dispatch",
          "text": t.has("step4Desc") ? t("step4Desc") : "Confirm proof, start factory production, and receive your packaging via air cargo.",
          "url": "https://www.bameme.com/customize"
        }
      ]
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
          <Link href={`/${locale}`} className="brand-logo" style={{ textDecoration: "none" }}>
            <span className="brand-name">BAMEME</span>
            <span className="brand-badge">PACKAGING</span>
          </Link>
          
          {/* 顶部右侧：返回首页和语言切换器 */}
          <div className="header-right-nav" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <Link href={`/${locale}`} className="nav-back-home">
              {t("backToHome")}
            </Link>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </header>

      {/* 独立定制设计头部简介 */}
      <section className="hero-section" style={{ padding: "3rem 1.5rem 1.5rem 1.5rem", background: "none", borderBottom: "none" }}>
        <h1 className="hero-title" style={{ fontSize: "2.25rem", marginBottom: "0.5rem" }}>
          {t("customizerSystemTitle")}
        </h1>
        <p className="hero-subtitle" style={{ maxWidth: "700px", margin: "0 auto", color: "#6b5e4c" }}>
          {t("customizerSystemSubtitle")}
        </p>
      </section>

      {/* 核心定制器工作流面板 */}
      <main className="main-content-wrapper" style={{ marginTop: "1rem" }}>
        <ProductPageContainer />
      </main>

      {/* 独立定制页特有说明区 */}
      <section className="workflow-section" style={{ borderTop: "1px solid #f2ede4", marginTop: "4rem", paddingTop: "4rem" }}>
        <h2 className="section-title">{t("customizerNotesTitle")}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3 className="feature-title">{t("note1Title")}</h3>
            <p className="feature-desc" style={{ fontSize: "0.85rem", color: "#7a6e60" }}>
              {t("note1Desc")}
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3 className="feature-title">{t("note2Title")}</h3>
            <p className="feature-desc" style={{ fontSize: "0.85rem", color: "#7a6e60" }}>
              {t("note2Desc")}
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📞</div>
            <h3 className="feature-title">{t("note3Title")}</h3>
            <p className="feature-desc" style={{ fontSize: "0.85rem", color: "#7a6e60" }}>
              {t("note3Desc")}
            </p>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="site-footer">
        <div className="footer-inner">
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

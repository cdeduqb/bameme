export interface IndustryTranslation {
  metaTitle: string;
  metaDesc: string;
  title: string;
  subtitle: string;
  intro: string;
  advantageTitle: string;
  advantages: string[];
}

export interface IndustryData {
  image: string;
  scenario: "jewelry" | "cosmetics" | "gifts" | "tech" | "watches";
  icon: string;
  defaultQty: string;
  defaultColor: string;
  defaultProcess: string;
  locales: Record<string, IndustryTranslation>;
}

export const INDUSTRIES: Record<string, IndustryData> = {
  jewelry: {
    image: "/images/microfiber_pouch.png",
    scenario: "jewelry",
    icon: "💎",
    defaultQty: "1000",
    defaultColor: "cream",
    defaultProcess: "gold",
    locales: {
      en: {
        metaTitle: "Wholesale Custom Jewelry Pouches & Jewelry Packaging Manufacturer | BAMEME",
        metaDesc: "Get premium wholesale custom jewelry pouches & bags directly from factory. 1000 units Low MOQ. Premium microfiber drawstring bags with gold foil logos.",
        title: "Luxury Jewelry Pouches & Packaging Wholesale",
        subtitle: "Direct Factory Source · High-density Anti-scratch Microfiber · Low MOQ 1,000 Pcs",
        intro: "For high-end jewelry brands, Etsy creators, and boutique stores, packaging is an extension of your craft. Our microfiber and velvet jewelry pouches are meticulously crafted to provide a luxurious touch while protecting delicate gold, silver, and gemstones from oxidation and micro-scratches.",
        advantageTitle: "Why Elite Jewelry Brands Trust BAMEME",
        advantages: [
          "Ultra-soft polishing microfiber fabric compliant with safety regulations.",
          "High-fidelity metallic foil hot stamping for flawless brand logo representation.",
          "Complimentary 2-hour 3D design proof with unlimited revisions.",
          "Fast 7-10 days production and free express air shipping door-to-door."
        ]
      },
      zh: {
        metaTitle: "高端珠宝首饰袋定制批发厂家 | BAMEME包装",
        metaDesc: "源头工厂批发定制高档珠宝首饰袋、拉绳袋及超细纤维首饰束口袋。1000个超低起订量，支持金属烫金，5-7天全球特快空运送货上门。",
        title: "高端珠宝首饰袋与包装定制批发",
        subtitle: "源头工厂直供 · 高密防刮防氧化超细纤维 · 1000个超低起订量",
        intro: "对于高级首饰品牌、Etsy 创作者和精品珠宝店来说，包装是品牌艺术的一部分。我们的超细纤维和天鹅绒珠宝袋手感极其奢华，能有效防尘防氧化，避免精细的金银及宝石在运输中产生细微划痕。",
        advantageTitle: "为什么顶尖珠宝品牌选择 BAMEME",
        advantages: [
          "极其柔软的抛光超细纤维材质，保护金银及精细宝石光泽。",
          "高保真金属烫金/热压工艺，确保 LOGO 精准无误差呈现。",
          "免费提供 2 小时 3D 在线效果图设计，并提供无限次修改。",
          "大货生产仅需 7-10 天，全球 DHL/FedEx 特快空运免邮送货上门。"
        ]
      },
      de: {
        metaTitle: "Luxus Schmucksäckchen & Schmuckverpackung Großhandel | BAMEME",
        metaDesc: "Premium Schmucksäckchen und Beutel direkt ab Werk. Niedrige Mindestbestellmenge von 1000 Stück. Mikrofaser-Zugschnurbeutel mit Goldfolien-Logo.",
        title: "Luxus Schmucksäckchen & Verpackung Großhandel",
        subtitle: "Direkt vom Hersteller · Kratzfreie Mikrofaser · 1000 Stück Mindestbestellmenge",
        intro: "Für High-End-Schmuckmarken, Etsy-Kreative und Boutiquen ist die Verpackung eine Erweiterung Ihres Handwerks. Unsere Schmucksäckchen aus Mikrofaser und Samt sind sorgfältig verarbeitet, um eine luxuriöse Haptik zu bieten und empfindliches Gold, Silber und Edelsteine vor Oxidation und Kratzern zu schützen.",
        advantageTitle: "Warum Elite-Schmuckmarken BAMEME vertrauen",
        advantages: [
          "Besonders weiche Polier-Mikrofaser zum Schutz von Gold und feinen Edelsteinen.",
          "Präzise Heißfolienprägung für die makellose Darstellung Ihres Markenlogos.",
          "Kostenloser 3D-Designentwurf innerhalb von 2 Stunden mit unbegrenzten Änderungen.",
          "Schnelle Produktion in 7-10 Tagen und kostenloser Express-Luftversand frei Haus."
        ]
      },
      es: {
        metaTitle: "Bolsas de Joyería Personalizadas & Empaque al por Mayor | BAMEME",
        metaDesc: "Compre bolsas de joyería personalizadas premium directamente de fábrica. Cantidad mínima baja de 1000 unidades. Bolsas de microfibra con logotipos en pan de oro.",
        title: "Bolsas de Joyería de Lujo & Empaque al por Mayor",
        subtitle: "Directo de Fábrica · Microfibra Antiarañazos · MOQ Bajo de 1.000 Unidades",
        intro: "Para marcas de joyería de alta gama, creadores de Etsy y tiendas boutique, el empaque es una extensión de su arte. Nuestras bolsas de joyería de microfibra y terciopelo están meticulosamente diseñadas para ofrecer un toque lujoso y proteger el oro, plata y gemas delicadas de la oxidación y microarañazos.",
        advantageTitle: "Por qué las Marcas de Joyería de Élite Confían en BAMEME",
        advantages: [
          "Tejido de microfibra de pulido ultra suave que protege el brillo del oro y gemas.",
          "Estampación metálica en caliente de alta fidelidad para representar logos sin errores.",
          "Prueba de diseño 3D gratis en 2 horas con modificaciones ilimitadas.",
          "Producción rápida de 7-10 días y envío aéreo exprés gratuito puerta a puerta."
        ]
      },
      fr: {
        metaTitle: "Pochettes à Bijoux de Luxe & Emballage en Gros | BAMEME",
        metaDesc: "Achetez des pochettes à bijoux personnalisées haut de gamme directement de l'usine. Faible quantité minimale de 1000 pièces. Sachets en microfibre avec logo doré.",
        title: "Pochettes à Bijoux de Luxe & Emballage en Gros",
        subtitle: "Direct Usine · Microfibre Anti-rayures · Faible Quantité Minimum de 1 000 Pièces",
        intro: "Pour les marques de joaillerie haut de gamme, les créateurs Etsy et les boutiques, l'emballage es le prolongement de votre art. Nos pochettes à bijoux en microfibre et en velours sont méticuleusement conçues pour offrir un toucher luxueux tout en protégeant l'or, l'argent et les pierres précieuses délicates de l'oxydation et des micro-rayures.",
        advantageTitle: "Pourquoi les Marques de Joaillerie d'Élite Font Confiance à BAMEME",
        advantages: [
          "Tissu microfibre de polissage ultra-doux préservant la brillance de l'or et des pierres.",
          "Marquage à chaud métallique de haute fidélité pour une pose parfaite du logo.",
          "Maquette de conception 3D gratuite en 2 heures avec révisions illimitées.",
          "Production rapide en 7-10 jours et livraison express par avion offerte à domicile."
        ]
      },
      it: {
        metaTitle: "Sacchetti per Gioielli Personalizzati & Packaging all'Ingrosso | BAMEME",
        metaDesc: "Sacchetti per gioielli di alta qualità direttamente dal produttore. MOQ basso di 1000 pezzi. Bustine in microfibra con stampa logo in foglia oro.",
        title: "Sacchetti per Gioielli di Lusso & Packaging all'Ingrosso",
        subtitle: "Produttore Diretto · Microfibra Antigraffio · Basso MOQ di 1.000 Pezzi",
        intro: "Per i marchi di gioielli di alta gamma, i creatori di Etsy e le boutique, il packaging è un'estensione dell'arte. I nostri sacchetti per gioielli in microfibra e velluto sono realizzati meticolosamente per offrire un tocco lussuoso proteggendo al contempo oro, argento e gemme delicate dall'ossidazione e dai micrograffi.",
        advantageTitle: "Perché i Marchi di Gioielli d'Élite Sceglgono BAMEME",
        advantages: [
          "Tessuto in microfibra per lucidatura ultra morbido per proteggere oro e gemme preziose.",
          "Stampa a caldo in foglia metallica ad alta fedeltà per loghi aziendali perfetti.",
          "Bozza di progettazione 3D gratuita entro 2 ore con modifiche illimitate.",
          "Produzione rapida in 7-10 giorni e spedizione aerea espressa gratuita a domicilio."
        ]
      },
      pt: {
        metaTitle: "Saquinhos de Jóias Personalizados & Embalagens por Atacado | BAMEME",
        metaDesc: "Compre saquinhos de jóias personalizados premium diretamente de fábrica. MOQ baixo de 1000 unidades. Saquinhos de microfibra com logotipos em folha de ouro.",
        title: "Saquinhos de Jóias de Luxo & Embalagens por Atacado",
        subtitle: "Direto da Fábrica · Microfibra Anti-riscos · MOQ Baixo de 1.000 Peças",
        intro: "Para marcas de jóias de alta costura, criadores do Etsy e boutiques, a embalagem é a extensão da sua arte. Nossos saquinhos de microfibra e veludo para jóias são fabricados meticulosamente para proporcionar um toque luxuoso, protegendo ouro, prata e pedras preciosas contra oxidação e riscos.",
        advantageTitle: "Por que as Marcas de Jóias de Elite Confiam na BAMEME",
        advantages: [
          "Tecido de microfibra ultra macio para polimento, ideal para proteger ouro e gemas.",
          "Estampagem metálica a quente de alta fidelidade para logotipos perfeitos.",
          "Design 3D digital gratuito em 2 horas com revisões ilimitadas.",
          "Produção rápida em 7-10 dias e frete aéreo expresso gratuito porta a porta."
        ]
      },
      ru: {
        metaTitle: "Ювелирные Мешочки Оптом & Производство Упаковки для Украшений | BAMEME",
        metaDesc: "Ювелирные мешочки и сумочки напрямую от производителя. Низкий MOQ 1000 шт. Бархатные и микрофибровые мешочки на затяжках с золотым тиснением логотипа.",
        title: "Роскошные Ювелирные Мешочки и Упаковка Оптом",
        subtitle: "Прямые поставки с фабрики · Микрофибра против царапин · Низкий MOQ 1000 шт",
        intro: "Для элитных ювелирных брендов, мастеров Etsy и бутиков упаковка является продолжением искусства. Наши мешочки из микрофибры и бархата созданы для придания роскошного вида и надежной защиты золота, серебра и драгоценных камней от окисления и микроцарапин.",
        advantageTitle: "Почему элитные ювелирные бренды выбирают BAMEME",
        advantages: [
          "Сверхмягкая полировочная микрофибра для бережной защиты ювелирных изделий.",
          "Высокоточное тиснение фольгой для идеального переноса логотипа бренда.",
          "Бесплатный 3D-макет дизайна за 2 часа с неограниченным количеством правок.",
          "Быстрое производство за 7-10 дней и бесплатная курьерская авиадоставка до двери."
        ]
      },
      ja: {
        metaTitle: "高級ジュエリーポーチ・アクセサリー袋オーダーメイド卸売 | BAMEME",
        metaDesc: "工場直売のプレミアムカスタムジュエリーポーチ・アクセサリー袋。低最小注文数量1000枚。ゴールド箔押しロゴ付きの極細繊維巾着袋。",
        title: "高級ジュエリーポーチ＆パッケージカスタム卸売",
        subtitle: "工場直営ルート ・ 傷防止極細繊維 ・ 1000枚低最小注文数量",
        intro: "ハイエンドのジュエリーブランド、Etsyクリエイター、ブティックショップにとって、パッケージは作品の一部です。当社の極細繊維とベルベットのジュエリーポーチは、金、銀、宝石などのデリケートな素材を酸化や傷から守りながら、高級感あふれる質感を提供します。",
        advantageTitle: "なぜ一流ジュエリーブランドがBAMEMEを選ぶのか",
        advantages: [
          "金銀やデリケートな宝石の光沢を守る、極めて柔らかい極細繊維磨き布素材。",
          "ブランドロゴを完璧に表現する、高精度な金属箔押し（ホットスタンプ）加工。",
          "無料の2時間3Dオンラインデザイン校正、修正回数無制限。",
          "製造期間わずか7〜10日、世界中への高速航空エクスプレス無料配送。"
        ]
      },
      ko: {
        metaTitle: "고급 주얼리 파우치 및 보석 주머니 맞춤 제작 도매 | BAMEME",
        metaDesc: "공장 직판 고급 맞춤형 주얼리 파우치 및 주머니. 1000개 소량 MOQ. 골드 박 로고 인쇄 마이크로파이버 복주머니.",
        title: "고급 주얼리 파우치 & 패키지 맞춤 제작 도매",
        subtitle: "공장 직공급 · 흠집 방지 극세사 마이크로파이버 · 1000개 초저 MOQ",
        intro: "고급 주얼리 브랜드, Etsy 크리에이터, 편집숍에게 패키징은 브랜드 예술의 연장선입니다. 우리의 극세사 및 벨벳 주얼리 주머니는 소중한 금, 은, 보석을 산화와 미세한 스크래치로부터 보호함과 동시에 극도로 부드럽고 럭셔리한 촉감을 선사합니다.",
        advantageTitle: "왜 일류 주얼리 브랜드가 BAMEME를 선택하는가",
        advantages: [
          "보석과 금속의 광택을 보호하는 극도로 부드러운 극세사 클리너 원단 사용.",
          "정밀한 금속 금박/열압착 공정으로 로고를 완벽하고 결함 없이 표현.",
          "무료 2시간 이내 3D 온라인 시안 디자인 제공 및 무제한 수정 지원.",
          "대량 생산 7-10일 소요, 전 세계 DHL/FedEx 특송 항공 무료 배송."
        ]
      },
      ar: {
        metaTitle: "أكياس مجوهرات مخصصة بالجملة ومصنع تغليف مجوهرات | BAMEME",
        metaDesc: "احصل على أكياس وعلب مجوهرات مخصصة وعالية الجودة مباشرة من المصنع. حد أدنى للطلب 1000 قطعة. أكياس مايكروفايبر برباط مع شعارات ذهبية حرارية.",
        title: "أكياس مجوهرات فاخرة وتغليف بالجملة",
        subtitle: "من المصنع مباشرة · مايكروفايبر مقاوم للخدش · حد أدنى منخفض 1000 قطعة",
        intro: "بالنسبة لماركات المجوهرات الراقية ومبدعي Etsy والمحلات التجارية، فإن التغليف هو امتداد لفنك. صُنعت أكياس المجوهرات المصنوعة من الألياف الدقيقة والقطيفة بدقة لتوفير لمسة فاخرة مع حماية الذهب والفضة والأحجار الكريمة الرقيقة من الأكسدة والخدوش الدقيقة.",
        advantageTitle: "لماذا تثق ماركات المجوهرات النخبة في BAMEME",
        advantages: [
          "نسيج مايكروفايبر ناعم للغاية للتلميع وحماية بريق الذهب والأحجار الكريمة.",
          "طباعة حرارية ورقائق معدنية عالية الدقة لتمثيل شعار العلامة التجارية بشكل مثالي.",
          "تصميم مجسم ثلاثي الأبعاد مجاني في غضون ساعتين مع تعديلات غير محدودة.",
          "إنتاج سريع في غضون 7-10 أيام وشحن جوي سريع مجاني من الباب إلى الباب."
        ]
      }
    }
  },
  cosmetics: {
    image: "/images/velvet_bag.png",
    scenario: "cosmetics",
    icon: "💄",
    defaultQty: "1000",
    defaultColor: "sage",
    defaultProcess: "gold",
    locales: {
      en: {
        metaTitle: "Luxury Cosmetics & Perfume Drawstring Bags Bulk | BAMEME",
        metaDesc: "Wholesale custom luxury velvet drawstring bags for cosmetics, perfume bottles, and beauty packaging. Low MOQ 1,000 units. Soft texture and premium protection.",
        title: "Luxury Cosmetics & Perfume Packaging Bags",
        subtitle: "Premium Velvet Drawstring Pouches · Thick Silk Texture · Low MOQ 1,000 Pcs",
        intro: "Elevate your beauty, cosmetics, and luxury perfume packaging. Our thick-pile premium velvet and satin drawstring pouches provide critical protection for glass perfume bottles and premium beauty containers while exuding high-end elegance on the shelf.",
        advantageTitle: "B2B Beauty Packaging Advantages",
        advantages: [
          "High-density velvet fabric offering a luxurious feel and silky touch.",
          "Rich, thick fabric density providing exceptional drop and scratch buffer.",
          "Tailor-made dimensions to perfectly fit perfume glass bottles.",
          "Stripe integrated fast order pipeline with error-free automated manufacturing."
        ]
      },
      zh: {
        metaTitle: "奢华美妆化妆品与香水拉绳袋定制批发 | BAMEME包装",
        metaDesc: "高端化妆品、香水瓶、美容仪器拉绳束口袋定制生产。选用高克重密实型天鹅绒材质，质感奢华触感丝滑，1000个超低起订量，全球特快送达。",
        title: "高档化妆品与香水包袋定制批发",
        subtitle: "高奢密实天鹅绒束口袋 · 奢华丝滑质感保护升级 · 1000个低起订量",
        intro: "提升您的美妆、化妆品和奢华香水品牌价值。我们精心研发的厚绒天鹅绒拉绳袋能为高价值玻璃香水瓶和化妆品包装提供卓越的防震与防划缓冲，同时散发出无与伦比的优雅感。",
        advantageTitle: "美妆护肤品牌的核心包袋保障",
        advantages: [
          "精选高密度细腻天鹅绒材质，触感奢华丝滑，完美保护香水瓶与化妆品。",
          "丰满厚实的绒毛密度，为精细的玻璃香水瓶提供防摔防刮保护。",
          "支持按香水瓶和化妆盒尺寸进行微米级量身定制。",
          "Stripe 支付无缝对接智能下单流程，车间直接根据 3D 数据生产。"
        ]
      },
      de: {
        metaTitle: "Luxus Kosmetik- & Parfumbeutel Großhandel | BAMEME",
        metaDesc: "Spezielle Samtbeutel für Kosmetik und Parfümflaschen. Niedriger MOQ von 1000 Stück. Erstklassiger Schutz und edler Griff.",
        title: "Luxus Kosmetik- & Parfumverpackungsbeutel",
        subtitle: "Premium Samtbeutel · Seidige Textur & Eleganz · 1000 Stück Mindestmenge",
        intro: "Erhöhen Sie den Wert Ihrer Schönheits-, Kosmetik- und Luxusparfummarke. Unsere dichten Premium-Samtzugbeutel bieten optimalen Schutz für empfindliche Glasflakons und Kosmetikbehälter.",
        advantageTitle: "Vorteile für B2B Kosmetikverpackungen",
        advantages: [
          "Hochdichtes Samtgewebe für eine luxuriöse Haptik und seidige Weichheit.",
          "Dichte Faserstruktur für perfekten Schutz vor Stürzen und Kratzern.",
          "Maßgeschneiderte Abmessungen für Parfümflaschen und Tiegel.",
          "Stripe-integrierter Bestellprozess für fehlerfreie automatisierte Fertigung."
        ]
      },
      es: {
        metaTitle: "Bolsas de Terciopelo para Cosméticos y Perfumes | BAMEME",
        metaDesc: "Venta al por mayor de bolsas de terciopelo de lujo para cosméticos y frascos de perfume. MOQ de 1000 unidades. Textura suave y protección premium.",
        title: "Bolsas de Empaque para Cosméticos y Perfumes",
        subtitle: "Terciopelo Premium · Textura Sedosa y Elegante · MOQ Bajo de 1.000 Piezas",
        intro: "Eleve la presentación de sus cosméticos y perfumes de lujo. Nuestras bolsas de terciopelo y satén de alta densidad protegen los envases de vidrio mientras aportan elegancia en el punto de venta.",
        advantageTitle: "Ventajas de Empaque para Marcas de Belleza",
        advantages: [
          "Tejido de terciopelo de alta densidad que ofrece un tacto sedoso y lujoso.",
          "Grosor del terciopelo excepcional que actúa como amortiguador de golpes.",
          "Dimensiones personalizadas para adaptarse a cualquier frasco de perfume.",
          "Proceso digital integrado con Stripe para una fabricación automatizada sin errores."
        ]
      },
      fr: {
        metaTitle: "Pochettes en Velours pour Cosmétiques et Parfums | BAMEME",
        metaDesc: "Grossiste de pochettes de luxe en velours pour cosmétiques et flacons de parfum. Faible quantité minimale de 1000 pièces. Douceur et protection premium.",
        title: "Sachets d'Emballage pour Cosmétiques et Parfums",
        subtitle: "Velours Premium · Texture Soyeuse & Élégante · 1 000 Pièces Minimum",
        intro: "Sublimez vos produits de beauté et flacons de parfum. Nos pochettes cordonal en velours épais protègent les contenants en verre et apportent une touche de luxe ultime.",
        advantageTitle: "Avantages de l'Emballage Beauté B2B",
        advantages: [
          "Tissu en velours haute densité offrant un toucher soyeux et luxueux.",
          "Haute densité de poils offrant une protection anti-choc et anti-rayure de premier ordre.",
          "Dimensions adaptées sur mesure pour les flacons et étuis de parfum.",
          "Commande rapide via Stripe pour un lancement direct en atelier de production."
        ]
      },
      it: {
        metaTitle: "Sacchetti in Velluto per Cosmetici e Profumi | BAMEME",
        metaDesc: "Sacchetti con cordoncino in velluto per cosmetici e profumi all'ingrosso. Basso MOQ di 1000 unità. Morbida consistenza e protezione premium.",
        title: "Sacchetti di Lusso per Cosmetici e Profumi",
        subtitle: "Velluto Pregiato · Trama Setosa & Elegante · MOQ di 1.000 Pezzi",
        intro: "Valorizza la tua linea cosmetica e i profumi di lusso. I nostri sacchetti in morbido velluto proteggono i flaconi in vetro e donano eleganza ed esclusività.",
        advantageTitle: "Vanti del Packaging Cosmetico B2B",
        advantages: [
          "Tessuto in velluto ad alta densità che offre una sensazione setosa e lussuosa.",
          "Spessore del velluto ottimizzato per attutire urti e prevenire graffi sui flaconi.",
          "Misure personalizzabili per alloggiare flaconi di profumo e confezioni regalo.",
          "Integrazione Stripe per un flusso d'ordine rapido ed esecuzione automatizzata."
        ]
      },
      pt: {
        metaTitle: "Saquinhos de Veludo para Cosméticos e Perfumes | BAMEME",
        metaDesc: "Atacado de saquinhos de veludo personalizados para cosméticos e frascos de perfume. Textura macia e proteção premium. MOQ de 1000 unidades.",
        title: "Saquinhos de Luxo para Cosméticos e Perfumes",
        subtitle: "Veludo Premium · Textura Sedosa & Elegante · Baixo MOQ de 1.000 Peças",
        intro: "Destaque sua marca de cosméticos e perfumes. Nossos saquinhos de veludo premium oferecem proteção macia e refinada para frascos de vidro e estojos de maquiagem.",
        advantageTitle: "Garantia de Qualidade para Cosméticos B2B",
        advantages: [
          "Tecido de veludo de alta densidade que oferece um toque macio e luxuoso.",
          "Alta densidade que fornece excelente amortecimento contra quedas e arranhões.",
          "Dimensões feitas sob medida para frascos de perfume e paletas de maquiagem.",
          "Processo de compra automatizado integrado ao Stripe para máxima agilidade."
        ]
      },
      ru: {
        metaTitle: "Бархатные Мешочки для Косметики и Парфюмерии Оптом | BAMEME",
        metaDesc: "Оптовое производство бархатных мешочков на затяжках для косметики и парфюмерных флаконов. Мягкая текстура и надежная защита. Минимальный заказ 1000 шт.",
        title: "Мешочки для Косметики и Флаконов Парфюмерии",
        subtitle: "Бархат Премиум-класса · Шелковистая текстура · MOQ 1000 шт",
        intro: "Повысьте ценность вашей косметики и парфюмерии класса люкс. Наши плотные бархатные мешочки на затяжках защищают стеклянные флаконы от сколов и царапин.",
        advantageTitle: "Преимущества B2B Упаковки для Косметики",
        advantages: [
          "Высокоплотный бархат, обеспечивающий роскошные тактильные ощущения.",
          "Высокая плотность ворса для надежной амортизации стеклянных флаконов.",
          "Индивидуальный пошив под размеры флаконов духов и пудрениц.",
          "Интеграция с платежной системой Stripe для быстрого и безошибочного заказа."
        ]
      },
      ja: {
        metaTitle: "高級コスメ・香水用ベルベット巾着袋卸売 | BAMEME",
        metaDesc: "化粧品、香水瓶、美容機器用の高級ベルベット巾着袋カスタム制造。贅沢な質感と優れた保護性能、低最小注文数量1000枚、グローバル特快配送。",
        title: "高級コスメ＆香水パッケージバッグカスタム卸売",
        subtitle: "高密度ベルベット巾着袋 ・ 贅沢なシルクの質感 ・ 1000枚低最小注文数量",
        intro: "美容、コスメ、高級香水ブランドの価値を高めます。当社の肉厚ベルベット巾着袋は、ガラス製香水瓶や化粧品容器を衝撃や傷から保護しながら、高級感漂う魅力を演出します。",
        advantageTitle: "美容ブランド向けパッケージのコアメリット",
        advantages: [
          "手触りが贅沢でシルクのように滑らかな高密度ベルベット生地。",
          "肉厚で高密度な起毛により、繊細なガラス瓶の破損や擦り傷をしっかりと保護。",
          "香水瓶や化粧箱のサイズに合わせた、ミリ単位でのオーダーメイド対応。",
          "Stripe決済とシームレスに連携した注文フロー、3Dデータに基づく直接生産。"
        ]
      },
      ko: {
        metaTitle: "화장품 및 향수 벨벳 복주머니 도매 제작 | BAMEME",
        metaDesc: "고급 화장품, 향수병, 뷰티 용품용 벨벳 드로우스트링 파우치 맞춤 제작. 고급스러운 감촉과 뛰어난 보호력의 벨벳. 소량 1000개 제작.",
        title: "고급 화장품 & 향수 패키징 파우치 도매",
        subtitle: "고밀도 고급 벨벳 주머니 · 실크처럼 부드러운 감촉 · 1000개 소량 주문",
        intro: "당신의 뷰티, 화장품 및 프리미엄 향수 브랜드 가치를 높여보세요. 당사가 정성껏 제작한 두툼한 두께의 벨벳 주머니는 유리 향수병과 고급 용기에 뛰어난 방진 및 완충 효과를 제공합니다.",
        advantageTitle: "뷰티 브랜드를 위한 핵심 패키징 솔루션",
        advantages: [
          "고밀도 프리미엄 벨벳 원단으로 손에 닿는 감촉이 고급스럽고 부드럽습니다.",
          "풍성한 극세사 밀도로 유리 용기가 깨지거나 긁히지 않도록 탁월한 완충력 제공.",
          "향수병 크기나 콤팩트 크기에 맞춰 나노 단위의 맞춤 크기 설계 지원.",
          "Stripe 결제 시스템과 공장 생산 라인이 연동되어 오차 없는 신속한 공정 진행."
        ]
      },
      ar: {
        metaTitle: "أكياس مخملية لمستحضرات التجميل والعطور بالجملة | BAMEME",
        metaDesc: "تصنيع أكياس مخملية فاخرة لمستحضرات التجميل وزجاجات العطور. ملمس ناعم وحماية فائقة للمنتجات. الحد الأدنى للطلب 1000 قطعة.",
        title: "أكياس تعبئة وتغليف مستحضرات التجميل والعطور",
        subtitle: "مخمل فاخر برباط · ملمس حريري ناعم · حد أدنى 1000 قطعة",
        intro: "ارتقِ بعلامتك التجارية لمستحضرات التجميل وعطور النخبة. توفر أكياسنا المخملية السميكة ذات الرباط حماية فائقة لزجاجات العطور القابلة للكسر مع لمسة نهائية فاخرة.",
        advantageTitle: "مزايا تغليف مستحضرات التجميل B2B",
        advantages: [
          "نسيج مخملي عالي الكثافة يمنح ملمساً حريرياً فاخراً وناعماً.",
          "كثافة نسيجية عالية توفر حماية فائقة ضد السقوط والخدوش للعطور.",
          "أبعاد وتصاميم مخصصة لتناسب أحجام زجاجات العطور وعلب التجميل.",
          "عملية دفع سريعة ومتكاملة لضمان بدء التصنيع والإنتاج المباشر بدون أخطاء."
        ]
      }
    }
  },
    gifts: {
    image: "/images/ribbon_bag.png",
    scenario: "gifts",
    icon: "🎁",
    defaultQty: "1000",
    defaultColor: "pink",
    defaultProcess: "gold",
    locales: {
      en: {
        metaTitle: "Corporate Custom Gift Bags Wholesale & VIP Giveaway Pouches | BAMEME",
        metaDesc: "Elevate corporate gift-giving and VIP events. Customized luxury art paper bags and premium ribbon pouches with brand logos. 1000 Pcs low MOQ.",
        title: "Corporate Gift Bags & VIP Giveaway Pouches",
        subtitle: "Elegant Silk Ribbons · Heavyweight Custom Art Paper · Low MOQ 1,000 Pcs",
        intro: "Make a lasting impression on your corporate clients, premium guests, and event VIPs. Our customized gift bags featuring elegant silk ribbons and heavy-weight art paper are the ultimate vehicle for luxury brand representation at annual conferences and high-end galas.",
        advantageTitle: "Corporate Brand Representation",
        advantages: [
          "Premium 250g art paper with matte/gloss lamination for exceptional strength.",
          "Soft, shiny double-sided silk ribbon handles for premium touch.",
          "Precision debossed/embossed logos representing high-level corporate identity.",
          "Bulk discounts starting at 1,000 units with global tax-included shipping."
        ]
      },
      zh: {
        metaTitle: "商务礼品袋与 VIP 活动赠品袋定制批发 | BAMEME包装",
        metaDesc: "定制高档企业年会手提袋、VIP 贵宾礼品袋及抽绳丝带袋。支持加厚铜版纸与高档丝绸织带，1000个起订，全球物流专线免邮送达。",
        title: "高档商务礼品袋与 VIP 活动赠品袋定制",
        subtitle: "优雅丝滑绸带 · 250g 加厚艺术铜版纸 · 1000个超低起订量",
        intro: "为您的企业大客户、高净值嘉宾和活动 VIP 留下深刻的第一印象。我们的定制商务礼品袋配有优雅的丝带手提和加厚工艺艺术纸，是企业年会、奢华晚宴及发布会的绝佳形象载体。",
        advantageTitle: "高规格商务送礼包装优势",
        advantages: [
          "采用 250g 级加厚艺术铜版纸配哑膜工艺，挺括坚固，质感极佳。",
          "配有双面高光泽丝带提手，握感柔软舒适，提升档次。",
          "精准凹凸热压或高精度丝网印刷企业 LOGO，彰显尊贵身份。",
          "1,000 个起批优惠，提供含税全球空运特快门到门配送。"
        ]
      },
      de: {
        metaTitle: "Individuelle Geschenktüten für Unternehmen | BAMEME",
        metaDesc: "Hochwertige Geschenktaschen aus Papier und Satinbeutel für Firmenveranstaltungen und VIP-Gäste. 1000 Stück Mindestbestellung. Werksdirektbezug.",
        title: "Geschenktüten für Firmen & VIP-Giveaway-Beutel",
        subtitle: "Elegante Seidenbänder · Hochwertiges Kunstpapier · 1000 Stück Mindestmenge",
        intro: "Hinterlassen Sie einen bleibenden Eindruck bei Ihren Firmenkunden und VIPs. Unsere maßgeschneiderten Taschen mit edlen Seidenbändern stehen für perfekten Markenauftritt.",
        advantageTitle: "Vorteile der Markenpräsentation für Firmen",
        advantages: [
          "Premium 250g Bilderdruckpapier mit Schutzlaminierung für Stabilität.",
          "Weiche, glänzende Griffe aus doppelseitigem Satinband für eine feine Haptik.",
          "Präzise Prägung Ihres Firmenlogos zur Unterstreichung Ihrer Identität.",
          "Mengenrabatte ab 1.000 Stück mit weltweitem, verzolltem Transport."
        ]
      },
      es: {
        metaTitle: "Bolsas de Regalo Corporativas y VIP al por Mayor | BAMEME",
        metaDesc: "Bolsas de regalo personalizadas con logotipo para eventos de empresa y obsequios VIP. Papel de alta calidad de 250g y lazos de seda. MOQ de 1000 unidades.",
        title: "Bolsas de Regalo Corporativas & Detalles VIP",
        subtitle: "Lazos de Seda Elegantes · Papel de Arte de 250g · MOQ Bajo de 1.000 Piezas",
        intro: "Cree un impacto duradero en sus clientes VIP. Nuestras bolsas de regalo combinan papel artístico pesado con elegantes lazos de seda, ideales para congresos y cenas de gala.",
        advantageTitle: "Presentación Corporativa Premium",
        advantages: [
          "Papel de arte de 250g con laminado mate para mayor durabilidad y soporte.",
          "Asas de cinta de raso de doble cara, suaves al tacto y brillantes.",
          "Grabado de alta precisión en relieve para mostrar la excelencia corporativa.",
          "Precios por volumen desde 1000 unidades con aranceles y transporte incluidos."
        ]
      },
      fr: {
        metaTitle: "Sacs Cadeaux d'Entreprise Personnalisés & VIP | BAMEME",
        metaDesc: "Production en gros de sacs cadeaux de luxe pour entreprises et invités VIP. Sacs en papier épais et rubans en soie satinée. Quantité minimale 1000 pcs.",
        title: "Sacs Cadeaux Corporatifs & Pochettes VIP",
        subtitle: "Rubans Satinés Élégants · Papier Artistique Épait · 1 000 Pièces Minimum",
        intro: "Faites bonne impression auprès de vos partenaires et clients VIP. Nos sacs personnalisés avec papier laminé de haute qualité et poignées en ruban valorisent votre événement corporatif.",
        advantageTitle: "Valorisation de l'Image de Marque",
        advantages: [
          "Papier d'art de 250g avec finition mate pour une résistance maximale.",
          "Ruban satiné double face doux et brillant pour un toucher exceptionnel.",
          "Impression ou gaufrage de haute précision pour un rendu professionnel du logo.",
          "Remises de volume dès 1 000 unités avec livraison tout inclus."
        ]
      },
      it: {
        metaTitle: "Sacchetti Regalo Aziendali e Omaggi VIP all'Ingrosso | BAMEME",
        metaDesc: "Shopper in carta personalizzate e sacchetti regalo in nastro satinato per fiere ed eventi aziendali. MOQ di 1000 unità. Spedizione internazionale inclusa.",
        title: "Sacca Regalo Aziendale & Bustine per VIP",
        subtitle: "Nastri in Raso Eleganti · Carta Patinata Spessa · MOQ di 1.000 Pezzi",
        intro: "Lascia un segno memorabile ai tuoi clienti business e agli ospiti degli eventi speciali. Le nostre borse regalo sono curate nei minimi dettagli per esaltare l'identità del brand.",
        advantageTitle: "Rappresentanza del Brand Aziendale",
        advantages: [
          "Carta patinata da 250g accoppiata a plastificazione opaca per un aspetto solido.",
          "Manici in nastro di raso lucido double face per una presa morbida ed elegante.",
          "Loghi stampati o incisi con dettagli nitidi per riflettere l'autorità aziendale.",
          "Prezzi all'ingrosso a partire da 1.000 unità con trasporto globale incluso."
        ]
      },
      pt: {
        metaTitle: "Sacolas de Presente Corporativas e Brindes VIP | BAMEME",
        metaDesc: "Fabricante de sacolas de presente personalizadas e saquinhos de fita de cetim para eventos de empresas e feiras. MOQ de 1000 unidades.",
        title: "Sacolas de Presente Corporativas & Brindes VIP",
        subtitle: "Fitas de Cetim Elegantes · Papel Couchê Encorpado · Baixo MOQ de 1.000 Peças",
        intro: "Cause uma excelente impressão aos seus clientes corporativos e VIPs. Nossas sacolas personalizadas combinam papel de alta gramatura com acabamento refinado de fitas.",
        advantageTitle: "Destaque e Fortalecimento de Marca",
        advantages: [
          "Papel couchê premium de 250g com laminação fosca, proporcionando alta rigidez.",
          "Alças de fita de cetim macia e com brilho intenso em ambos os lados.",
          "Impressão de alta precisão ou relevo seco para a logomarca da empresa.",
          "Condições especiais a partir de 1.000 unidades com entrega rápida."
        ]
      },
      ru: {
        metaTitle: "Корпоративные Подарочные Пакеты и Мешочки VIP Оптом | BAMEME",
        metaDesc: "Подарочные пакеты из плотной бумаги и брендированные мешочки с лентами для корпоративных клиентов. Минимальный заказ 1000 шт.",
        title: "Корпоративные Пакеты & Подарочные VIP Мешочки",
        subtitle: "Шелковые Атласные Ленты · Плотная Мелованная Бумага · MOQ 1000 шт",
        intro: "Создайте безупречное впечатление у корпоративных партнеров и VIP-гостей. Наши изысканные пакеты с шелковыми ручками-лентами идеально подходят для конференций.",
        advantageTitle: "Корпоративный Стиль и Статус",
        advantages: [
          "Мелованная бумага 250 г/м² с матовой ламинацией для идеальной формы пакета.",
          "Ручки из двусторонней атласной ленты для мягкости и премиального блеска.",
          "Точное тиснение или печать логотипа для лучшей узнаваемости компании.",
          "Оптовые скидки при заказе от 1000 шт с доставкой без скрытых платежей."
        ]
      },
      ja: {
        metaTitle: "ビジネスギフトバッグ・VIPイベント記念品袋オーダーメイド卸売 | BAMEME",
        metaDesc: "企業記念品バッグ、VIPギフトバッグ、リボン付き巾着袋のカスタム製造。250gのアート紙とシルクリボンを使用。1000個からご注文可能。",
        title: "高級ビジネスギフトバッグ＆VIP記念品バッグカスタム",
        subtitle: "優雅なシルクリボン ・ 250g特厚アート紙 ・ 1000個超低起量",
        intro: "企業の取引先、VIPゲスト、イベントの参加者へ心に残る第一印象を。優雅なシルクリボンハンドルと特厚アート紙を組み合わせたカスタムギフトバッグは、周年式典や高級パーティーでの企業イメージ向上に最適です。",
        advantageTitle: "格式高いビジネスギフトのコアメリット",
        advantages: [
          "250gの特厚アート紙にマットラミネート加工を施し、強度と高級感を両立。",
          "光沢が美しい両面シルクリボンハンドルを採用、滑らかで心地よい持ち心地を実現。",
          "高精度のエンボス加工やエンボスホットスタンプでロゴを美しく配置。",
          "1,000個からのボリューム割引、国際特快のドアツードア配送（関税・送料込）。"
        ]
      },
      ko: {
        metaTitle: "기업 사은품 쇼핑백 및 VIP 기프트 파우치 도매 제작 | BAMEME",
        metaDesc: "기업 행사용 고급 쇼핑백, VIP 귀빈용 기프트 파우치 맞춤 제작. 250g 고급 스노우지 및 실크 리본 끈 적용. 1000개 소량 도매.",
        title: "고급 비즈니스 기프트 쇼핑백 & VIP 기념품 파우치",
        subtitle: "부드러운 실크 리본 · 250g 고급 수입 스노우지 · 1000개 저최소 수량",
        intro: "바이어, VIP 고객 및 행사 참관객에게 잊지 못할 특별한 첫인상을 남겨주세요. 당사의 쇼핑백은 최고급 두께의 수입 스노우지와 실크 리본 끈을 사용해 격이 다른 품격을 연출합니다.",
        advantageTitle: "프리미엄 비즈니스 기프트의 확실한 가치",
        advantages: [
          "250g 최고 사양 스노우지 재질에 무광 코팅을 가미해 처짐 없는 견고한 핏 선사.",
          "더블 페이스 고광택 실크 공단 리본 손잡이를 매칭해 쥐었을 때 기분 좋은 촉감 제공.",
          "정교한 형압(엠보싱) 또는 박 인쇄 기법으로 기업 아이덴티티를 격조 높게 세팅.",
          "1,000개 이상 대량 주문 시 단가 할인 적용, 배송관련 세금 포함 전 세계 직배송."
        ]
      },
      ar: {
        metaTitle: "أكياس هدايا الشركات المخصصة وأكياس هدايا VIP بالجملة | BAMEME",
        metaDesc: "قم بترقية هدايا شركتك وفعاليات VIP. أكياس ورقية فاخرة وحقائب شريطية مخصصة بشعار الشركة. حد أدنى منخفض 1000 قطعة.",
        title: "حقائب هدايا الشركات وحقائب هدايا VIP",
        subtitle: "شرائط حريرية أنيقة · ورق فني فاخر 250 جرام · حد أدنى 1000 قطعة",
        intro: "اترك انطباعاً يرسخ طويلاً لدى عملاء شركتك وضيوف VIP. أكياس الهدايا المخصصة لدينا مجهزة بشرائط حريرية ناعمة وورق مقوى فاخر.",
        advantageTitle: "تمثيل العلامة التجارية الراقية للشركات",
        advantages: [
          "ورق فني فاخر بوزن 250 جرام مع تغليف حراري غير لامع لمتانة قصوى.",
          "مقابض شريطية حريرية لامعة على الوجهين توفر ملمساً فاخراً وناعماً.",
          "نقش دقيق أو طباعة شعار بدقة لتمثيل الهوية المؤسسية الرفيعة.",
          "خصومات للجملة تبدأ من 1000 قطعة مع شحن عالمي متكامل وشامل الرسوم."
        ]
      }
    }
  },
  tech: {
    image: "/images/canvas_bag.png",
    scenario: "tech",
    icon: "🔌",
    defaultQty: "1000",
    defaultColor: "charcoal",
    defaultProcess: "debossed",
    locales: {
      en: {
        metaTitle: "Bulk Custom Tech Accessory Pouches & Earbud Bags | BAMEME",
        metaDesc: "Wholesale durable microfiber and cotton canvas drawstring pouches for tech gadgets, chargers, and premium earbuds. 1000 Pcs low MOQ.",
        title: "Durable Tech Gadget & Accessory Pouches",
        subtitle: "Durable Organic Cotton Canvas · Scratch & Dust Proof · Low MOQ 1,000 Pcs",
        intro: "Protect high-value gadgets, wireless earbuds, charger adapters, and cables with branding that lasts. Our premium heavyweight cotton canvas and charcoal microfiber pouches are designed for longevity and everyday protection.",
        advantageTitle: "Engineered for Modern Tech Brands",
        advantages: [
          "Heavyweight eco-friendly canvas fabric with dual-rope heavy drawstrings.",
          "Dust-proof, lint-free weave structure preventing charger port blockage.",
          "Premium eco-friendly soy ink screen printing or debossed brand marks.",
          "Direct B2B supply with full certificates for environmental compliance."
        ]
      },
      zh: {
        metaTitle: "数码配件袋与耳机充电线收纳拉绳袋批发 | BAMEME包装",
        metaDesc: "工厂直供加厚帆布数码收纳袋、蓝牙耳机保护袋、充电头拉绳袋定制。主打耐磨防尘，1000个起订，快速排单生产与全球空运送达。",
        title: "耐磨数码配件与蓝牙耳机保护袋批发",
        subtitle: "重磅有机纯棉帆布 · 耐磨防尘防摔 · 1000个超低起订量",
        intro: "为高价值数码配件、无线蓝牙耳机、快速充电插头和数据线提供最贴心的伴随式保护。我们精选的重磅有机棉帆布和炭灰色高密度束口袋耐用抗撕裂，是电子品牌长效宣传的黄金媒介。",
        advantageTitle: "为现代科技与数码品牌量身打造",
        advantages: [
          "精选耐磨重磅环保帆布，搭配双股加粗拉绳，耐用性极强。",
          "防尘无毛刺编织结构，防止细小碎屑进入充电器插口。",
          "使用环保大豆油墨丝网印刷或深压凹 LOGO，科技感十足。",
          "源头工厂一站式批发，提供完整的环保与合规检测证书。"
        ]
      },
      de: {
        metaTitle: "Zubehörbeutel für Elektronik & Ladekabel | BAMEME",
        metaDesc: "Robuste Beutel aus Mikrofaser und Baumwolle für Ladegeräte, Gadgets und In-Ear-Kopfhörer. Mindestmenge 1000 Stück. Direkt vom Hersteller.",
        title: "Robuste Beutel für Tech-Gadgets & Zubehör",
        subtitle: "Stabile Bio-Baumwolle · Staub- & Kratzschutz · 1000 Stück Mindestmenge",
        intro: "Schützen Sie hochwertige Gadgets, Ladegeräte und Kabel stilvoll. Unsere Taschen aus schwerem Baumwollcanvas und Mikrofaser sind extrem langlebig und alltagstauglich.",
        advantageTitle: "Entwickelt für moderne Technologiemarken",
        advantages: [
          "Schwerer, umweltfreundlicher Canvas mit dicker Doppel-Kordelzug-Kordel.",
          "Staubfreie Materialstruktur zum Schutz vor Faserresten in Ladeanschlüssen.",
          "Hochwertiger Druck mit umweltfreundlicher Tinte oder tiefgeprägtem Logo.",
          "Direkte B2B-Lieferung mit allen gängigen Umweltzertifikaten."
        ]
      },
      es: {
        metaTitle: "Fundas para Accesorios Tecnológicos al por Mayor | BAMEME",
        metaDesc: "Bolsas de algodón y microfibra para gadgets, cargadores y auriculares. MOQ bajo de 1000 unidades. Alta durabilidad y protección contra el polvo.",
        title: "Fundas para Gadgets y Accesorios Tecnológicos",
        subtitle: "Lona de Algodón Orgánico · Resistente al Polvo · MOQ Bajo de 1.000 Piezas",
        intro: "Resguarde sus dispositivos tecnológicos con empaques duraderos. Nuestras bolsas de lona pesada y microfibra ofrecen máxima resistencia en el transporte diario.",
        advantageTitle: "Diseñado para Marcas de Tecnología Moderna",
        advantages: [
          "Tejido de lona gruesa ecológica con cordones de doble tracción de gran resistencia.",
          "Tejido libre de pelusas que evita la acumulación de suciedad en puertos de carga.",
          "Impresión serigráfica con tintas ecológicas de soja o logotipos grabados en seco.",
          "Suministro B2B directo que cumple con todas las certificaciones ambientales."
        ]
      },
      fr: {
        metaTitle: "Pochettes pour Accessoires High-Tech en Gros | BAMEME",
        metaDesc: "Grossiste de sachets en toile de coton et microfibre pour câbles, chargeurs et écouteurs Bluetooth. Faible quantité minimale de 1000 pièces.",
        title: "Pochettes Robustes pour Gadgets & Accessoires Tech",
        subtitle: "Toile de Coton Bio Durable · Protection Poussière · 1 000 Pièces Minimum",
        intro: "Protégez vos accessoires technologiques, écouteurs sans fil et chargeurs. Nos pochettes en toile de coton lourd et microfibre sont conçues pour durer au quotidien.",
        advantageTitle: "Conçu pour les Marques High-Tech Modernes",
        advantages: [
          "Tissu en toile de coton épais écologique avec double cordon de serrage ultra résistant.",
          "Structure tissée anti-peluche évitant l'obstruction des ports de charge de vos appareils.",
          "Sérigraphie à base d'encre de soja écologique ou logo profondément débossé.",
          "Chaîne d'approvisionnement B2B directe avec certificats d'éco-responsabilité."
        ]
      },
      it: {
        metaTitle: "Sacchetti per Accessori Tecnologici all'Ingrosso | BAMEME",
        metaDesc: "Custodie in cotone e microfibra per gadget elettronici, caricatori e auricolari. Ideali per brand tech. MOQ di 1000 unità.",
        title: "Custodie Resistenti per Gadget & Accessori Tech",
        subtitle: "Cotone Canvas Biologico · Antipolvere e Antigraffio · MOQ di 1.000 Pezzi",
        intro: "Proteggi i tuoi caricabatterie, cavi e auricolari wireless con packaging durevoli. I nostri sacchetti in robusto cotone canvas sono perfetti per la vita di tutti i giorni.",
        advantageTitle: "Progettati per i Brand Tecnologici Moderni",
        advantages: [
          "Tessuto canvas pesante ecologico con resistenti cordini di chiusura a doppio nodo.",
          "Trama antipolvere priva di lanugine per preservare le porte di ricarica dei dispositivi.",
          "Stampe realizzate con inchiostro ecologico di soia o loghi pressati a caldo.",
          "Fornitura diretta per distributori B2B con certificazioni di conformità europee."
        ]
      },
      pt: {
        metaTitle: "Saquinhos para Acessórios Tecnológicos e Cabos | BAMEME",
        metaDesc: "Atacado de saquinhos de algodão e lona para gadgets, carregadores e fones de ouvido. MOQ de 1000 unidades. Alta resistência.",
        title: "Saquinhos Resistentes para Gadgets & Acessórios",
        subtitle: "Lona de Algodón Orgânico · Anti-poeira e Riscos · Baixo MOQ de 1.000 Peças",
        intro: "Proteja fones de ouvido sem fio, carregadores e cabos. Nossos saquinhos de lona de algodão robusto e microfibra oferecem grande durabilidade e estilo.",
        advantageTitle: "Desenvolvido para Marcas de Tecnologia",
        advantages: [
          "Tecido de lona ecológica espessa com cordão duplo de fechamento altamente reforçado.",
          "Trama firme e sem fiapos que impede acúmulos na entrada do carregador.",
          "Serigrafia com tinta de soja ecológica ou logomarca gravada em relevo seco.",
          "Fornecimento B2B direto com todas as certificações ambientais necessárias."
        ]
      },
      ru: {
        metaTitle: "Чехлы для Наушников и Кабелей Зарядок Оптом | BAMEME",
        metaDesc: "Оптовые чехлы и мешочки из брезента и хлопка для зарядных устройств, наушников и аксессуаров. Низкий MOQ 1000 шт. Экологичное производство.",
        title: "Прочные Чехлы для Гаджетов и Техноаксессуаров",
        subtitle: "Натуральный Хлопковый Брезент · Защита от Пыли · MOQ 1000 шт",
        intro: "Обеспечьте надежную защиту для Bluetooth-наушников, адаптеров и кабелей. Наши чехлы из плотного хлопка рассчитаны на ежедневное долгое использование.",
        advantageTitle: "Создано для Современных Технобрендов",
        advantages: [
          "Плотный экологичный хлопковый брезент с толстыми двойными затяжками.",
          "Безворсовое плетение нитей, исключающее забивание пыли в зарядные порты.",
          "Печать соевыми чернилами или стильное брутальное тиснение логотипа.",
          "Поставки напрямую с фабрики B2B с полным комплектом экологических сертификатов."
        ]
      },
      ja: {
        metaTitle: "耐摩耗デジタルガジェット＆アクセサリー保護袋カスタム卸売 | BAMEME包装",
        metaDesc: "工場直売のキャンバス製デジタルアクセサリー収納袋、ワイヤレスイヤホン保護袋、充電器用巾着袋カスタム製造。防塵・耐摩耗。1000個からご注文可能。",
        title: "耐摩耗デジタルガジェット＆アクセサリー保護袋カスタム卸売",
        subtitle: "特厚有機純綿キャンバス ・ 耐摩耗・防塵・防衝撃 ・ 1000個超低起量",
        intro: "高価値なデジタルアクセサリー、ワイヤレスイヤホン、急速充電器、データケーブルに最も安心な保護を。当社の厳選された特厚有機綿キャンバスおよび炭灰色高密度巾着袋は耐久性に優れ、ブランドの長期的プロモーションに最適です。",
        advantageTitle: "現代のテクノロジー＆デジタルブランド向け設計",
        advantages: [
          "耐摩耗性に優れたエコ特厚キャンバス生地を採用、ダブル仕様の太紐で耐久性抜群。",
          "防塵・糸くず防止の特殊織構造で、充電ポートへの微細な繊維混入を防止。",
          "環境に優しい大豆インクを使用したシルクスクリーン印刷または深い型押しロゴ加工。",
          "工場直送のB2B一括供給、各種環境認証および適合証明書を完備。"
        ]
      },
      ko: {
        metaTitle: "디지털 기기 액세서리 파우치 및 충전기 주머니 도매 | BAMEME",
        metaDesc: "공장 직공급 캔버스 디지털 파우치, 블루투스 이어폰 보관백, 케이블 드로우스트링 백 제작. 방진 및 마모방지. 1000개 도매.",
        title: "내마모 디지털 디바이스 & IT 액세서리 파우치 도매",
        subtitle: "친환경 오가닉 순면 캔버스 · 마모 및 방진 설계 · 1000개 최저 수량",
        intro: "고가의 IT 액세서리, 무선 이어폰, 급속 충전 어댑터 및 충전 케이블에 최적의 파우치를 매칭해 보세요. 탄탄한 조직감의 오가닉 캔버스 주머니가 일상 생활 속 스크래치로부터 보호해 드립니다.",
        advantageTitle: "IT 트렌드를 선도하는 테크 브랜드를 위하여",
        advantages: [
          "엄선된 친환경 헤비 캔버스 원단에 이중 굵은 스트링을 더해 매우 우수한 내구성.",
          "미세 잔사가 묻어나지 않는 고밀도 직조 방식으로 포트 내부 먼지 유입 예방.",
          "무독성 소이 잉크(대豆) 인쇄 공법 또는 세련된 형압 압착 로고 세팅.",
          "중간 유통 없는 B2B 직송 라인 가동, 환경 규제 적합 시험 성적서 보유."
        ]
      },
      ar: {
        metaTitle: "حقائب مخصصة لملحقات التكنولوجيا وسماعات الأذن بالجملة | BAMEME",
        metaDesc: "أكياس متينة من القطن والمايكروفايبر للأجهزة والشواحن وسماعات الأذن. حد أدنى منخفض 1000 قطعة. حماية ممتازة وضد الأتربة.",
        title: "حقائب متينة للأجهزة والملحقات التكنولوجية",
        subtitle: "قماش قطني عضوي متين · مقاوم للغبار والخدش · حد أدنى 1000 قطعة",
        intro: "احمِ أجهزتك التكنولوجية وشواحنك وكابلاتك بحقائب متينة. حقائبنا المصنوعة من القماش القطني السميك مصممة لتدوم طويلاً وتوفر حماية يومية.",
        advantageTitle: "مصمم لعلامات التكنولوجيا الحديثة",
        advantages: [
          "نسيج قماشي بيئي سميك مع حبال سحب مزدوجة شديدة التحمل ومتينة.",
          "هيكل نسجي مقاوم للغبار يمنع انسداد منافذ الشحن في الأجهزة الإلكترونية.",
          "طباعة بشاشات حريرية وأحبار فول الصويا البيئية أو شعارات غائرة بدقة.",
          "توريد B2B مباشر مع شهادات كاملة للامتثال البيئي والسلامة العامة."
        ]
      }
    }
  },
  watches: {
    image: "/images/magnetic_box.png",
    scenario: "watches",
    icon: "⌚",
    defaultQty: "1000",
    defaultColor: "charcoal",
    defaultProcess: "debossed",
    locales: {
      en: {
        metaTitle: "Wholesale Watch Protection Bags & Luxury Eyewear Pouches | BAMEME",
        metaDesc: "Wholesale premium protective drawstring pouches for luxury watches and high-end eyewear. Ultra-thick jewelry microfiber and magnetic VIP boxes. MOQ 1000.",
        title: "Luxury Watch & Eyewear Protective Bags",
        subtitle: "Ultra-thick Scratch Protection · Structured Rigid Magnetic Boxes · Low MOQ 1,000 Pcs",
        intro: "High-end timepieces and designer eyewear require unmatched scratch resistance. Our luxury watch pouches and rigid magnetic VIP boxes offer dual protection, featuring soft microfiber liners that prevent any lens or metallic bezel abrasion during distribution.",
        advantageTitle: "Luxury Quality Standards for Horology & Optics",
        advantages: [
          "Double-thick microfiber interior to prevent hairline scratches on watch crystals.",
          "Precision magnetic closure boxes wrapped in soft-touch specialty paper.",
          "Hot stamping and deep embossing available for high-tier aesthetic branding.",
          "Direct shipping to global boutiques with 100% money-back remake guarantee."
        ]
      },
      zh: {
        metaTitle: "高档手表收纳袋与眼镜保护拉绳袋定制批发 | BAMEME包装",
        metaDesc: "高档手表袋、奢华眼镜束口袋及磁吸VIP包装盒源头厂家定制。采用超厚超细纤维绒防划伤设计，1000个起订，全球特快免邮送达。",
        title: "高端腕表与眼镜保护袋定制批发",
        subtitle: "超厚绒防发丝划痕 · 奢华磁吸天地盖硬盒 · 1000个低起订量",
        intro: "高价值的精密腕表和设计师品牌眼镜需要无懈可击的防划保护。我们的高端腕表拉绳袋和硬纸板磁吸 VIP 盒提供双重防护，内衬超细纤维绒能完美阻隔手表表盘和眼镜片遭受任何微小磨损。",
        advantageTitle: "专注精密腕表与高级光学包装标准",
        advantages: [
          "双倍加厚超细纤维内衬，有效杜绝表圈和镜片发丝划痕的产生。",
          "精密磁吸闭合天地盒，外覆手感细腻的特种艺术纸，尊贵大气。",
          "支持金属烫金与深层热压工艺，营造顶级奢侈品品牌的专享视觉感。",
          "直供全球高端精品店与专柜，提供 100% 品质制造重做保障。"
        ]
      },
      de: {
        metaTitle: "Schutzbeutel für Uhren & Brillen im Großhandel | BAMEME",
        metaDesc: "Hochwertige Schutzbeutel für Luxusuhren und Designerbrillen. Dicke Mikrofaser-Innenfutter und magnetische VIP-Boxen. 1000 Stück Mindestbestellmenge.",
        title: "Luxus-Schutzbeutel für Uhren & Brillen",
        subtitle: "Dicker Kratzschutz · Stabile Magnetboxen · 1000 Stück Mindestmenge",
        intro: "Exklusive Zeitmesser und Brillen erfordern maximalen Schutz vor Kratzern. Unsere Uhrenbeutel und Magnetboxen bieten ein weiches Mikrofaserfutter gegen feinste Oberflächenbeschädigungen.",
        advantageTitle: "Luxus-Standards für Uhrmacherei & Optik",
        advantages: [
          "Doppelt dickes Mikrofaserfutter zur Vermeidung von Haarrissen auf Gläsern.",
          "Präzise schließende Magnetboxen, bezogen mit feinstem Strukturpapier.",
          "Heißsiegelung und tiefe Logoprägung für eine edle Markenidentität.",
          "Direktlieferung an weltweite Boutiquen mit 100% Geld-Zurück-Zufriedenheitsgarantie."
        ]
      },
      es: {
        metaTitle: "Fundas para Relojes y Gafas de Sol al por Mayor | BAMEME",
        metaDesc: "Fundas protectoras para relojes y gafas de sol. Microfibra ultra gruesa antiarañazos y cajas magnéticas VIP rígidas. MOQ de 1000 unidades.",
        title: "Fundas Protectoras de Relojes y Gafas de Sol",
        subtitle: "Microfibra Ultra Gruesa · Cajas Magnéticas Rígidas · MOQ Bajo de 1.000 Piezas",
        intro: "Los relojes y gafas de sol de diseño necesitan la máxima protección. Nuestras fundas acolchadas y cajas rígidas con forros suaves previenen arañazos en lentes y metales.",
        advantageTitle: "Calidad de Lujo para Relojería y Óptica",
        advantages: [
          "Forro de microfibra de doble espesor que previene microrrayaduras en biseles.",
          "Cajas magnéticas rígidas forradas en papel especial texturizado.",
          "Estampación brillante en caliente y relieves profundos para marcas de lujo.",
          "Entrega directa a boutiques internacionales con garantía total de fabricación."
        ]
      },
      fr: {
        metaTitle: "Pochettes pour Montres & Lunettes de Luxe en Gros | BAMEME",
        metaDesc: "Grossiste de pochettes de protection pour montres de luxe и lunettes de soleil. Microfibre épaisse anti-rayures et coffrets magnétiques. MOQ 1000.",
        title: "Pochettes Montres & Lunettes de Soleil de Luxe",
        subtitle: "Protection Anti-rayure Épaisse · Boîtes Magnétiques Rigides · 1 000 Pcs Min.",
        intro: "Les montres de prestige et lunettes de créateurs exigent une résistance absolue aux micro-abrasions. Nos pochettes de luxe offrent une doublure en microfibre très douce.",
        advantageTitle: "Normes de Qualité Luxe pour l'Horlogerie",
        advantages: [
          "Intérieur en microfibre double épaisseur évitant les rayures sur le verre.",
          "Boîtes rigides à fermeture magnétique recouvertes de papier d'art texturé.",
          "Dorure à chaud et gaufrage profond de haute qualité pour l'image de marque.",
          "Expédition directe aux boutiques du monde entier avec garantie de conformité."
        ]
      },
      it: {
        metaTitle: "Custodie Protettive per Orologi e Occhiali all'Ingrosso | BAMEME",
        metaDesc: "Sacchetti di protezione per orologi e occhiali da sole di lusso. Microfibra ultra spessa e scatole rigide magnetiche. MOQ di 1000 pezzi.",
        title: "Sacchetti di Protezione per Orologi & Occhiali",
        subtitle: "Microfibra Doppia Protezione · Scatole Rigide Magnetiche · MOQ di 1.000 Pezzi",
        intro: "Orologi e occhiali di design richiedono la migliore protezione. I nostri sacchetti e le scatole rigide magnetiche offrono fodere interne in microfibra per evitare graffi.",
        advantageTitle: "Standard di Lusso per Orologeria e Ottica",
        advantages: [
          "Interno in microfibra a doppio spessore per proteggere i vetri degli orologi.",
          "Chiusure magnetiche di precisione rivestite in carta speciale soft-touch.",
          "Rifiniture in stampa a caldo e loghi in rilievo per boutique di fascia alta.",
          "Spedizione aerea alle boutique internazionali con garanzia di riproduzione gratuita."
        ]
      },
      pt: {
        metaTitle: "Saquinhos Protetores para Relógios e Óculos de Sol | BAMEME",
        metaDesc: "Saquinhos de veludo e microfibra para relógios de luxo e óculos de sol. Cajas rígidas magnéticas VIP. MOQ de 1000 unidades.",
        title: "Saquinhos de Proteção para Relógios & Óculos",
        subtitle: "Proteção Interna Anti-riscos · Caixas Magnéticas Rígidas · Baixo MOQ de 1.000 Peças",
        intro: "Relógios sofisticados e óculos de design exigem máxima proteção. Nossos saquinhos protetores e caixas magnéticas rígidas possuem forro de microfibra macio.",
        advantageTitle: "Padrão de Luxo para Joalheria e Óptica",
        advantages: [
          "Forro de microfibra de dupla espessura, impedindo riscos de manuseio.",
          "Caixas com fechamento magnético revestidas em papel especial de alta gramatura.",
          "Estampagem metálica a quente e relevo para marcas de luxo.",
          "Envio expresso direto a joalherias e óticas com garantia total de qualidade."
        ]
      },
      ru: {
        metaTitle: "Чехлы для Часов и Футляры для Очков Оптом | BAMEME",
        metaDesc: "Оптовое производство мешочков для часов и премиум футляров для очков. Сверхплотная защитная микрофибра и магнитные коробки. MOQ 1000.",
        title: "Чехлы для Часов и Футляры для Солнцезащитных Очков",
        subtitle: "Усиленная Защита от Царапин · Магнитные Коробки · MOQ 1000 шт",
        intro: "Премиальные часы и очки требуют надежной защиты. Наши бархатные мешочки и прочные магнитные коробки предохраняют стекла от мельчайших царапин.",
        advantageTitle: "Элитные Стандарты Качества в Часовой Оптике",
        advantages: [
          "Двойная толщина внутренней микрофибры для защиты полированных поверхностей.",
          "Магнитные закрывающиеся коробки из премиального дизайнерского картона.",
          "Тиснение фольгой или глубокий конгрев для безупречного внешнего вида.",
          "Прямые B2B поставки в салоны по всему миру с гарантией переделки брака."
        ]
      },
      ja: {
        metaTitle: "高級腕時計＆アイウェア保護パッケージバッグカスタム卸売 | BAMEME包装",
        metaDesc: "高級腕時計用保護袋、高級アイウェア用巾着袋、磁気開閉式VIPパッケージ箱カスタム製造。極厚磨き繊維採用。1000個からご注文可能。",
        title: "高級腕時計＆アイウェア保護パッケージバッグカスタム卸売",
        subtitle: "極厚繊維ヘアライン傷防止 ・ 特種磁気天地蓋硬箱 ・ 1000個低起量",
        intro: "高級腕時計やデザイナーズアイウェアには、万全の傷防止保護が不可欠です。当社の高級腕時計用巾着袋と硬質マグネットVIPボックスはダブル保護を提供し、輸送中の文字盤やレンズの摩耗を完全に防ぎます。",
        advantageTitle: "高級腕時計＆高級光学パッケージ基準へのこだわり",
        advantages: [
          "2倍厚の極細繊維インナーを採用し、ベゼルやレンズのヘアライン傷を防止。",
          "手触りの良い特種アート紙で覆われた、精密な磁気閉鎖式天地蓋ボックス。",
          "ホットスタンプや深層型押し加工に対応し、最高級ブランドの存在感を創出。",
          "世界のブティックや専売店へ直接空運、100%品質保証および再製作を保証。"
        ]
      },
      ko: {
        metaTitle: "명품 시계 파우치 및 선글라스 안경 주머니 도매 | BAMEME",
        metaDesc: "고급 시계 주머니, 안경 보관 주머니 및 자석 VIP 하드 케이스 패키지 맞춤 도매. 극세사 스크래치 방지 내피 적용. MOQ 1000개.",
        title: "고급 워치 & 명품 안경 보호 파우치 도매 제작",
        subtitle: "이중 극세사 스크래치 완벽 차단 · 고급 마그네틱 하드 박스 · 1000개 저최소 수량",
        intro: "명품 시계와 디자이너 안경은 미세한 흠집조차 허용되지 않는 철저한 방지책이 필요합니다. 당사의 보호 파우치와 마그네틱 하드 박스는 워치 베젤과 렌즈 표면을 기스 없이 완벽하게 지켜줍니다.",
        advantageTitle: "정밀 워치 및 고급 아이웨어의 패키지 스탠다드",
        advantages: [
          "두 배 도톰한 마이크로클리너 내피 원단을 매칭해 유광 베젤 미세 흠집 완전 방지.",
          "감각적인 수입 특수 지류를 외장재로 채택한 정밀 마그네틱 여닫이 하드 단상자.",
          "고급스러운 느낌을 한층 극대화하는 메탈 골드 박 및 딥 프레싱 로고 공법.",
          "전 세계 하이엔드 숍 직배송 라인 제공, 품질 미달 시 100% 재생산 보장."
        ]
      },
      ar: {
        metaTitle: "أكياس حماية الساعات الفاخرة وعلب النظارات بالجملة | BAMEME",
        metaDesc: "أكياس حماية مخصصة للساعات الفاخرة والنظارات الشمسية الراقية. علب مغناطيسية VIP مبطنة بمايكروفايبر سميك. حد أدنى 1000 قطعة.",
        title: "حقائب حماية الساعات الفاخرة والنظارات الشمسية",
        subtitle: "حماية ممتازة من الخدوش · صناديق مغناطيسية صلبة · حد أدنى 1000 قطعة",
        intro: "تتطلب الساعات الفاخرة ونظارات المصممين مقاومة ممتازة للخدوش. توفر حقائب الساعات والصناديق المغناطيسية الصلبة لدينا حماية ثنائية بفضل بطاناتها الناعمة.",
        advantageTitle: "معايير جودة فاخرة لآلات ضبط الوقت والبصريات",
        advantages: [
          "بطانة داخلية من الألياف الدقيقة مضاعفة السماكة لمنع الخدوش في الساعات.",
          "علب إغلاق مغناطيسي دقيقة مغطاة بورق خاص ناعم الملمس وفاخر للغاية.",
          "طباعة حرارية ونقش بارز متاح لتمثيل العلامة التجارية الراقية.",
          "شحن مباشر إلى المحلات التجارية العالمية مع ضمان إعادة التصنيع الكامل بنسبة 100%."
        ]
      }
    }
  }
};

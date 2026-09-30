import { CompanyInfo, NavItem, ProcessStep, ProjectItem, ServiceItem } from '@/types/content';

export const companyData: CompanyInfo = {
  name: 'Marketing Melon Agency',
  tagline: 'Squeeze the best, beat the rest.',
  positioning: 'A digital marketing agency combining creative strategy with data-informed campaigns.',
  emails: {
    primary: 'info@marketingmelon.online',
    secondary: 'marketingmelon1@gmail.com',
  },
  phones: {
    cairo: {
      display: '+20 115 011 7387',
      raw: '+201150117387',
      whatsappUrl: 'https://wa.me/201150117387?text=Hello%20Marketing%20Melon%20Agency%2C%20I%20would%20like%20to%20inquire%20about%20a%20project.',
      note: 'Verified Cairo office contact',
    },
    saudi: {
      display: '+966 57 412 8113',
      raw: '+966574128113',
      whatsappUrl: 'https://wa.me/966574128113?text=Hello%20Marketing%20Melon%20Agency%2C%20I%20would%20like%20to%20inquire%20about%20a%20project.',
      note: 'Source: Behance public listing (LinkedIn includes a typographical extra zero; flagged for owner review).',
    },
  },
  socialLinks: {
    facebook: 'https://www.facebook.com/marketingmelonagency/',
    linkedin: 'https://www.linkedin.com/company/marketing-melon/',
    instagram: 'https://www.instagram.com/marketingmelonagency/',
    behance: 'https://www.behance.net/marketingmelon',
  },
};

export const siteContent = {
  en: {
    nav: [
      { key: 'home', label: 'Home', href: '/en' },
      { key: 'services', label: 'Services', href: '/en/services' },
      { key: 'work', label: 'Work', href: '/en/work' },
      { key: 'about', label: 'About', href: '/en/about' },
      { key: 'contact', label: 'Contact', href: '/en/contact' },
    ] as NavItem[],
    cta: {
      talk: "Let's Talk",
      explore: 'Explore Our Work',
      getProposal: 'Request a Project Brief',
      viewProject: 'View Case Study',
      allServices: 'View All Services',
      allWork: 'Browse All Work',
      sendMessage: 'Send Inquiry',
      directChat: 'Chat on WhatsApp',
      emailUs: 'Send Email Directly',
    },
    hero: {
      badge: 'Creative Strategy & Performance Marketing',
      tagline: 'Squeeze the best, beat the rest.',
      subtitle:
        'Marketing Melon is a digital marketing agency combining bold creative strategy with data-informed campaigns. From high-impact video production and drone cinematography to paid media, social storytelling, and custom web development.',
      ctaPrimary: "Let's Talk",
      ctaSecondary: 'Explore Our Work',
      stats: [
        { label: 'Creative & Tech Pillars', value: '5 Core' },
        { label: 'Regional Focus', value: 'EG & KSA' },
        { label: 'Production Coverage', value: 'Ground & Drone' },
      ],
    },
    statement: {
      heading: 'Fresh perspective. Rigorous execution.',
      body: 'We don’t believe in generic campaigns or superficial noise. Marketing Melon approaches every brand as a unique ecosystem — building tailored narrative angles, razor-sharp digital media distribution, and immersive multimedia content that command attention across Egypt, Saudi Arabia, and beyond.',
    },
    servicesSection: {
      eyebrow: 'Our Capabilities',
      title: 'Full-Spectrum Digital Services',
      subtitle:
        'A comprehensive agency offering verified across strategy, performance, media creation, and digital engineering.',
    },
    services: [
      {
        id: 'strategy-marketing',
        title: 'Strategy & Digital Marketing',
        shortDescription:
          'Data-informed market positioning, campaign architecture, and growth planning tailored to regional markets.',
        fullDescription:
          'We craft actionable digital marketing blueprints that connect brand goals with target audiences. Our strategic framework bridges market research, competitor landscape analysis, channel prioritization, and measurable KPIs.',
        iconName: 'Compass',
        highlightTag: 'Foundation',
        scope: [
          'Brand Positioning & Messaging Strategy',
          'Multi-Channel Marketing Architecture',
          'Customer Journey Mapping',
          'Market Research & Competitor Insights',
        ],
        deliverables: {
          items: [
            'Comprehensive Digital Marketing Strategy Deck',
            'Channel Action Plan & KPI Matrix',
            'Audience Persona & Journey Frameworks',
            'Quarterly Growth Roadmap',
          ],
          isProposed: true,
        },
      },
      {
        id: 'social-media',
        title: 'Social Media & Content Creation',
        shortDescription:
          'End-to-end platform management, creative editorial calendars, and scroll-stopping storytelling.',
        fullDescription:
          'We turn brand social presence into active community engagement. Our team plans, writes, designs, and orchestrates creative content across Instagram, Facebook, LinkedIn, TikTok, and X with cohesive visual language.',
        iconName: 'Share2',
        highlightTag: 'Engagement',
        scope: [
          'Social Media Management & Publishing',
          'Creative Copywriting & Visual Art Direction',
          'Community Engagement & Moderation',
          'Short-Form Video & Reel Production',
        ],
        deliverables: {
          items: [
            'Monthly Content Calendars with Visual Assets',
            'Story, Reel & Carousel Formats',
            'Platform Tone-of-Voice Guidelines',
            'Monthly Engagement & Growth Analytics',
          ],
          isProposed: true,
        },
      },
      {
        id: 'paid-ads',
        title: 'Paid Advertising & Media Buying',
        shortDescription:
          'Precision-targeted campaigns across Meta, Google Ads, TikTok, and programmatic networks.',
        fullDescription:
          'Maximizing ad spend efficiency through scientific audience segmentation, continuous creative A/B testing, pixel tracking, and conversion rate optimization across search, social, and display channels.',
        iconName: 'TrendingUp',
        highlightTag: 'Performance',
        scope: [
          'Meta Ads (Facebook & Instagram)',
          'Google Ads (Search, Display, Performance Max, YouTube)',
          'TikTok & Snapchat Ads Campaigns',
          'Retargeting & Audience Funnel Optimization',
        ],
        deliverables: {
          items: [
            'Campaign Structure Setup & Pixel Auditing',
            'Custom Ad Creatives & Copy Variations',
            'Weekly Budget Optimization & Bid Management',
            'Transparent Performance Dashboards',
          ],
          isProposed: true,
        },
      },
      {
        id: 'production-motion',
        title: 'Production, Motion & Visual Arts',
        shortDescription:
          'Ground and drone cinematography, commercial photography, 2D/3D motion graphics, VFX, and CGI.',
        fullDescription:
          'High-end commercial production capabilities combining certified ground and aerial drone filming with state-of-the-art motion design, 3D visualization, CGI, and professional post-production editing.',
        iconName: 'Video',
        highlightTag: 'High-Impact',
        scope: [
          'Ground Commercial Filming & Photography',
          'Aerial Drone Cinematography',
          'Motion Graphics & Video Editing',
          'CGI, VFX & 3D Spatial Design',
        ],
        deliverables: {
          items: [
            'Cinematic Brand Commercials & Social Cuts',
            'High-Resolution Product & Architecture Photography',
            '2D/3D Animated Explainers & Brand Assets',
            'Color-Graded & Mastered Video Deliverables',
          ],
          isProposed: true,
        },
      },
      {
        id: 'web-development',
        title: 'Websites & Application Development',
        shortDescription:
          'Modern responsive websites, landing pages, e-commerce stores, and custom mobile applications.',
        fullDescription:
          'Engineering digital touchpoints that convert visitors into loyal clients. We create fast, accessible, bilingual web and mobile experiences with modern tech stacks and intuitive user interfaces.',
        iconName: 'Layout',
        highlightTag: 'Technology',
        scope: [
          'Corporate Websites & Brand Portals',
          'High-Converting Landing Pages & Funnels',
          'E-Commerce Storefronts',
          'Mobile Application Design & Development',
        ],
        deliverables: {
          items: [
            'Responsive Bilingual Web Experience (EN/AR)',
            'Conversion-Optimized UI/UX Design System',
            'Technical SEO & Core Web Vitals Optimization',
            'CMS & API Integration Setup',
          ],
          isProposed: true,
        },
      },
    ] as ServiceItem[],
    process: {
      eyebrow: 'Working Methodology',
      title: 'How We Collaborate',
      subtitle:
        'A structured 5-stage framework to transform strategic intent into measurable business momentum.',
      notice: 'Proposed working framework (subject to agency owner review).',
      steps: [
        {
          stepNumber: '01',
          title: 'Discover',
          description:
            'We immerse ourselves in your market, brand identity, audience behavior, and historical performance to identify untapped leverage points.',
          deliverable: 'Discovery brief & alignment document',
        },
        {
          stepNumber: '02',
          title: 'Plan',
          description:
            'We architect the comprehensive roadmap: creative concepts, distribution channels, budget allocations, and conversion funnels.',
          deliverable: 'Campaign & execution blueprint',
        },
        {
          stepNumber: '03',
          title: 'Create',
          description:
            'Our creative, production, and technical teams build the assets: video, motion graphics, advertising copy, and interactive digital interfaces.',
          deliverable: 'Ready-to-launch creative library',
        },
        {
          stepNumber: '04',
          title: 'Launch',
          description:
            'Precision deployment across all scheduled channels with active real-time tracking, bid monitoring, and quality assurance.',
          deliverable: 'Live campaign & asset distribution',
        },
        {
          stepNumber: '05',
          title: 'Improve',
          description:
            'Data analysis, audience sentiment review, A/B creative iterations, and scale strategies to continuously amplify return on investment.',
          deliverable: 'Iterative performance reports & scaling plan',
        },
      ] as ProcessStep[],
    },
    workSection: {
      eyebrow: 'Selected Work',
      title: 'Verified Client Showcases',
      subtitle:
        'Authentic projects backed by company records and public agency portfolios. No fabricated metrics or placeholder claims.',
      filterAll: 'All Disciplines',
      viewCaseStudy: 'Explore Project',
    },
    projects: [
      {
        slug: 'al-eairy-residence',
        title: 'Al Eairy Residence',
        client: 'Al Eairy Residence',
        category: 'Hospitality & Real Estate Marketing',
        categoryKey: 'production',
        year: 'Recent verified project',
        summary:
          'Comprehensive creative direction, visual media production, and digital presentation for residential & hospitality accommodation.',
        fullStory:
          'Al Eairy Residence is an established accommodation and residential hospitality brand. Marketing Melon was engaged to elevate the brand’s digital visual presence, producing high-quality imagery, promotional storytelling, and multi-channel marketing content that showcases property interiors, living spaces, and guest experiences.',
        verifiedScope: [
          'Brand Visual Direction & Photography',
          'Ground & Interior Video Production',
          'Social Media Asset Creation',
          'Digital Marketing & Placement',
        ],
        isVerifiedProject: true,
        sourceNote: 'Verified client relationship documented on official LinkedIn updates.',
        heroColor: 'from-amber-700 via-rose-900 to-emerald-950',
        tags: ['Hospitality', 'Video Production', 'Creative Direction', 'Social Media'],
        galleryItems: [
          {
            title: 'Property Atmosphere & Visual Storytelling',
            caption: 'Showcasing welcoming spaces, interior comfort, and brand hospitality.',
            aspectRatio: '16/9',
          },
          {
            title: 'Multi-Channel Social Campaign',
            caption: 'Optimized creative assets formatted for digital discovery and traveler engagement.',
            aspectRatio: '4/3',
          },
          {
            title: 'Digital Promotional Rollout',
            caption: 'Cohesive branding across digital touchpoints and video formats.',
            aspectRatio: '16/9',
          },
        ],
      },
    ] as ProjectItem[],
    about: {
      eyebrow: 'Who We Are',
      title: 'Creative Strategy Powered by Data-Informed Action',
      intro:
        'Marketing Melon Agency is an energetic digital marketing firm operating across Egypt and Saudi Arabia. We combine bold creative storytelling with disciplined performance marketing to help ambitious brands cut through market noise.',
      taglineMeaning:
        'Our philosophy is embodied in our motto: "Squeeze the best, beat the rest." We extract the highest potential from every brand’s authentic strengths, crafting targeted digital media, captivating video production, and high-performance campaigns.',
      pillarsTitle: 'Our Operating Principles',
      pillars: [
        {
          title: 'Truth in Marketing',
          desc: 'We focus on clear value propositions, verified creative execution, and honest client communication without inflated claims.',
        },
        {
          title: 'End-to-End Media Capability',
          desc: 'From ground and drone camera shoots to CGI, 3D motion, and custom web builds, we own the technical and creative pipeline.',
        },
        {
          title: 'Regional Cultural Fluency',
          desc: 'Deep understanding of audience dynamics, vernacular nuance, and consumer behavior across Egypt and the GCC.',
        },
      ],
      regionalPresence: {
        title: 'Regional Presence & Direct Contacts',
        cairo: {
          country: 'Egypt',
          city: 'Cairo',
          phone: '+20 115 011 7387',
          phoneRaw: '+201150117387',
          status: 'Verified Cairo contact channel',
        },
        saudi: {
          country: 'Saudi Arabia',
          city: 'Kingdom of Saudi Arabia',
          phone: '+966 57 412 8113',
          phoneRaw: '+966574128113',
          status: 'Source: Behance portfolio (Flagged for owner confirmation)',
        },
      },
    },
    contactPage: {
      eyebrow: 'Start a Conversation',
      title: 'Let’s Build Something Exceptional',
      subtitle:
        'Tell us about your brand, campaign goals, or technical needs. We respond promptly with structured insights.',
      form: {
        nameLabel: 'Your Name *',
        namePlaceholder: 'e.g. Sarah Jenkins',
        emailLabel: 'Work Email *',
        emailPlaceholder: 'sarah@company.com',
        phoneLabel: 'Phone Number (Optional)',
        phonePlaceholder: '+20 ... or +966 ...',
        companyLabel: 'Company / Brand Name',
        companyPlaceholder: 'e.g. Acme Studio',
        servicesLabel: 'Services You Need *',
        budgetLabel: 'Estimated Project Budget (USD / SAR / EGP equivalent)',
        budgetOptions: [
          'Under $3,000 / Starter Scope',
          '$3,000 - $7,500 / Mid-tier Growth',
          '$7,500 - $15,000 / Scale & Production',
          '$15,000+ / Full Comprehensive Retainer',
          'Not sure yet / Let’s discuss scope',
        ],
        messageLabel: 'Project Overview & Objectives *',
        messagePlaceholder:
          'Tell us about your brand, current challenges, target audience, timeline, and what success looks like...',
        submitButton: 'Submit Project Inquiry',
        submitting: 'Processing Inquiry...',
        successTitle: 'Inquiry Received!',
        successMessage:
          'Thank you for reaching out to Marketing Melon Agency. Our team will review your project brief and get back to you within 24 hours.',
        errorTitle: 'Inquiry Dispatch Note',
        errorMessage:
          'Direct email dispatch is currently awaiting active SMTP credentials. Please message us directly via WhatsApp or Email below for immediate assistance.',
      },
      directChannels: {
        title: 'Direct Communications',
        description:
          'Prefer a direct conversation? Connect with our Cairo or Saudi lines via WhatsApp or reach us by email.',
      },
    },
    footer: {
      tagline: 'Squeeze the best, beat the rest.',
      description:
        'A digital marketing agency combining creative strategy with data-informed campaigns across Egypt and Saudi Arabia.',
      quickLinks: 'Navigation',
      servicesTitle: 'Services',
      contactTitle: 'Reach Us',
      rights: 'All rights reserved.',
      disclaimer:
        'Official website for Marketing Melon Agency. Information verified against public agency records.',
    },
  },
  ar: {
    nav: [
      { key: 'home', label: 'الرئيسية', href: '/ar' },
      { key: 'services', label: 'خدماتنا', href: '/ar/services' },
      { key: 'work', label: 'أعمالنا', href: '/ar/work' },
      { key: 'about', label: 'من نحن', href: '/ar/about' },
      { key: 'contact', label: 'تواصل معنا', href: '/ar/contact' },
    ] as NavItem[],
    cta: {
      talk: 'دعنا نتحدث',
      explore: 'استكشف أعمالنا',
      getProposal: 'اطلب خطة عمل لمشروعك',
      viewProject: 'عرض تفاصيل المشروع',
      allServices: 'استعرض جميع الخدمات',
      allWork: 'تصفح كل الأعمال',
      sendMessage: 'إرسال الاستفسار',
      directChat: 'محادثة عبر واتساب',
      emailUs: 'مراسلة عبر البريد الإلكتروني',
    },
    hero: {
      badge: 'استراتيجية إبداعية وتسويق مبني على البيانات',
      tagline: 'اعصر الأفضل، وتفوّق على البقية.',
      subtitle:
        'ماركتنج ميلون هي وكالة تسويق رقمي تدمج بين الاستراتيجية الإبداعية الجريئة والحملات المدعومة بالبيانات. من الإنتاج المرئي الفاخر وتصوير الدرون الجوي إلى الإعلانات الممولة، إدارة المحتوى، وتطوير الويب.',
      ctaPrimary: 'دعنا نتحدث',
      ctaSecondary: 'استكشف أعمالنا',
      stats: [
        { label: 'ركائز إبداعية وتقنية', value: '٥ ركائز' },
        { label: 'النطاق الإقليمي', value: 'مصر والسعودية' },
        { label: 'تغطية الإنتاج المرئي', value: 'أرضي وجوي (درون)' },
      ],
    },
    statement: {
      heading: 'رؤية متجددة. تنفيذ احترافي متقن.',
      body: 'نحن لا نؤمن بالحملات النمطية أو الضجيج العابر. نتعامل مع كل علامة تجارية كمنظومة مستقلة — نبني زوايا سردية مبتكرة، وتوزيعاً إعلانياً دقيقاً، ومحتوى بصرياً فائق الجودة يترك بصمة واضحة في السوقين المصري والسعودي وما حولهما.',
    },
    servicesSection: {
      eyebrow: 'قدراتنا وخدماتنا',
      title: 'حلول تسويقية ورقمية متكاملة',
      subtitle:
        'منظومة خدمات موثقة تغطي الاستراتيجية، الأداء الإعلاني، الإنتاج المرئي، وتطوير الحلول الرقمية.',
    },
    services: [
      {
        id: 'strategy-marketing',
        title: 'استراتيجية التسويق والنمو الرقمي',
        shortDescription:
          'تحديد التموضع التنافسي للعلامة التجارية، وبناء خطط الحملات الموجهة بالبيانات وفق احتياجات الأسواق الإقليمية.',
        fullDescription:
          'نصمم مخططات تسويق رقمي قابلة للتنفيذ الفعلي تربط أهداف العلامة التجارية بالجمهور المستهدف بدقة، معتمدة على أبحاث السوق وتحليل المنافسين وتحديد مؤشرات الأداء الأساسية (KPIs).',
        iconName: 'Compass',
        highlightTag: 'الأساس الاستراتيجي',
        scope: [
          'استراتيجية تموضع العلامة والرسائل الإعلانية',
          'هيكلة خطط التسويق عبر القنوات المتعددة',
          'رسم خرائط رحلة العميل واستهداف الجمهور',
          'أبحاث السوق وتحليل المنافسين',
        ],
        deliverables: {
          items: [
            'وثيقة استراتيجية التسويق الرقمي الشاملة',
            'خطة قنوات النشر ومصفوفة مؤشرات الأداء',
            'نماذج شخصيات الجمهور المستهدف',
            'خطة عمل ربع سنوية لتحقيق النمو',
          ],
          isProposed: true,
        },
      },
      {
        id: 'social-media',
        title: 'إدارة منصات التواصل وصناعة المحتوى',
        shortDescription:
          'إدارة متكاملة للحسابات، وجداول محتوى إبداعية، ورواية بصرية تخطف انتباه الجمهور وتنمي التفاعل.',
        fullDescription:
          'نحول صفحات علامتك التجارية على شبكات التواصل إلى مجتمع نشط ومتفاعل. نخطط، نكتب، نصمم، وننشر المحتوى الإبداعي عبر إنستغرام، فيسبوك، لينكد إن، وتيك توك بهوية بصرية متسقة.',
        iconName: 'Share2',
        highlightTag: 'بناء التفاعل',
        scope: [
          'إدارة شاملة لحسابات التواصل وجدولة المنشورات',
          'كتابة إعلانية إبداعية وتوجيه فني للهوية',
          'إدارة التفاعل والرد على استفسارات المتابعين',
          'إنتاج مقاطع الفيديو القصيرة والريلز (Reels)',
        ],
        deliverables: {
          items: [
            'تقويم شهري للمحتوى مع التصاميم الجاهزة',
            'تصاميم تفاعلية ومنشورات كاروسيل ومقاطع ريلز',
            'دليل نبرة الصوت والكتابة للعلامة التجارية',
            'تقارير تحليلية شهرية لمعدلات النمو والتفاعل',
          ],
          isProposed: true,
        },
      },
      {
        id: 'paid-ads',
        title: 'الإعلانات الممولة وشراء الوسائط',
        shortDescription:
          'حملات إعلانية مدفوعة وعالية الدقة عبر Meta، إعلانات Google، وتيك توك لتحقيق أعلى عائد استثماري.',
        fullDescription:
          'تعظيم كفاءة الميزانيات الإعلانية من خلال الاستهداف الذكي، الاختبارات الإبداعية المستمرة (A/B Testing)، تتبع التحويلات، وتحسين معدلات الشراء والتسجيل.',
        iconName: 'TrendingUp',
        highlightTag: 'الأداء والنتائج',
        scope: [
          'إعلانات Meta (فيسبوك وإنستغرام)',
          'إعلانات Google (البحث، الشبكة الإعلانية، Performance Max، يوتيوب)',
          'حملات إعلانات تيك توك وسناب شات',
          'إعادة الاستهداف وتحسين مسار التحويل (Conversion Funnel)',
        ],
        deliverables: {
          items: [
            'إعداد هيكل الحملات وتركيب أدوات التتبع (Pixel)',
            'تصميم نسخ إعلانية متعددة واختبارها',
            'تحسين الميزانيات وعروض الأسعار أسبوعياً',
            'لوحة تحكم شفافة لنتائج الحملات ومؤشرات العائد',
          ],
          isProposed: true,
        },
      },
      {
        id: 'production-motion',
        title: 'الإنتاج المرئي، الموشن جرافيكس والفنون البصرية',
        shortDescription:
          'تصوير سينمائي أرضي وجوي بالدرون، تصوير فوتوغرافي، موشن جرافيكس ثنائي وثلاثي الأبعاد، CGI وVFX.',
        fullDescription:
          'إمكانيات إنتاجية تجارية متقدمة تجمع بين التصوير الأرضي والتصوير الجوي المعتمد بالطائرات المسيرة (Drone)، مع تصميم الرسوم المتحركة ثلاثية الأبعاد، الخدع البصرية، والمونتاج الاحترافي.',
        iconName: 'Video',
        highlightTag: 'إنتاج استثنائي',
        scope: [
          'تصوير سينمائي تجاري وتصوير فوتوغرافي احترافي',
          'تصوير جوي بالدرون للمنشآت والفعاليات',
          'موشن جرافيكس ومونتاج وتلوين سينمائي',
          'تصميم ثلاثي الأبعاد (3D)، CGI وVFX',
        ],
        deliverables: {
          items: [
            'إعلانات مرئية سينمائية ومقاطع مخصصة للسوشيال ميديا',
            'صور فوتوغرافية عالية الدقة للمنتجات والمشاريع المعمارية',
            'فيديوهات موشن جرافيكس توضيحية ومؤثرات بصرية',
            'تسليم النسخ النهائية بعد التلوين والمكساج الصوتي',
          ],
          isProposed: true,
        },
      },
      {
        id: 'web-development',
        title: 'تطوير المواقع والمتاجر والتطبيقات',
        shortDescription:
          'مواقع إلكترونية سريعة ومتجاوبة، صفحات هبوط عالية التحويل، متاجر إلكترونية، وتطبيقات هاتف مخصصة.',
        fullDescription:
          'نبني الواجهات الرقمية التي تحول الزوار إلى عملاء دائمين. نقدم تجارب مستخدم ثنائية اللغة (عربي/إنجليزي) تجمع بين سرعة الأداء وسهولة الاستخدام وأحدث المعايير التقنية.',
        iconName: 'Layout',
        highlightTag: 'حلول تقنية',
        scope: [
          'مواقع تعريفية وبوابات رقمية للشركات',
          'صفحات هبوط عالية التحويل للحملات الإعلانية',
          'متاجر إلكترونية متكاملة',
          'تصميم وتطوير تطبيقات الهواتف الذكية',
        ],
        deliverables: {
          items: [
            'موقع متجاوب ثنائي اللغة يدعم RTL بالكامل',
            'نظام تصميم حديث لواجهات وتجربة المستخدم (UI/UX)',
            'تهيئة محركات البحث (SEO) وتحسين سرعة التحميل',
            'ربط لوحات التحكم وأنظمة إدارة المحتوى والـ APIs',
          ],
          isProposed: true,
        },
      },
    ] as ServiceItem[],
    process: {
      eyebrow: 'منهجية العمل',
      title: 'كيف ندير مشاريعنا مع الشركاء',
      subtitle:
        'إطار عمل من ٥ مراحل متكاملة لتحويل الرؤى الاستراتيجية إلى نجاح تجاري ملموس ومستدام.',
      notice: 'إطار عمل مقترح لخطوات العمل (خاضع لمراجعة مالك الوكالة).',
      steps: [
        {
          stepNumber: '٠١',
          title: 'الاستكشاف والتحليل',
          description:
            'نتعمق في دراسة طبيعة علامتك التجارية، وسلوك الجمهور، والمنافسين، لتحديد أهم فرص النمو المتاحة.',
          deliverable: 'ملف الاستكشاف ومواءمة الأهداف',
        },
        {
          stepNumber: '٠٢',
          title: 'التخطيط الاستراتيجي',
          description:
            'نرسم خارطة الطريق المتكاملة: الأفكار الإبداعية، القنوات المستهدفة، توزيع الميزانيات، ومسار التحويل.',
          deliverable: 'مخطط الحملة وخطة التنفيذ',
        },
        {
          stepNumber: '٠٣',
          title: 'الإنتاج والإبداع',
          description:
            'تبدأ فرق الإبداع والإنتاج والبرمجة في تنفيذ الأصول: الفيديوهات، التصاميم، النصوص الإعلانية، والمواقع.',
          deliverable: 'حزمة الأصول الإبداعية الجاهزة',
        },
        {
          stepNumber: '٠٤',
          title: 'الإطلاق والنشر',
          description:
            'إطلاق الحملات وتوزيع المحتوى عبر القنوات المحددة مع متابعة لحظية لضمان أعلى جودة وأفضل أداء.',
          deliverable: 'انطلاق الحملة ونشر الأصول',
        },
        {
          stepNumber: '٠٥',
          title: 'التحسين والتطوير',
          description:
            'تحليل البيانات، قياس تفاعل الجمهور، اختبار النسخ الإعلانية، وتطوير الخطط لتعظيم العائد الاستثماري باستمرار.',
          deliverable: 'تقارير الأداء وخطة التوسع المستمر',
        },
      ] as ProcessStep[],
    },
    workSection: {
      eyebrow: 'أبرز أعمالنا',
      title: 'مشاريع حقيقية موثقة',
      subtitle:
        'مشاريع فعلية مبنية على السجلات والمحافظ الرسمية للوكالة، دون اختلاق أرقام أو ادعاءات غير مدعومة.',
      filterAll: 'جميع التخصصات',
      viewCaseStudy: 'عرض تفاصيل المشروع',
    },
    projects: [
      {
        slug: 'al-eairy-residence',
        title: 'ريزيدنس العيري',
        client: 'Al Eairy Residence',
        category: 'تسويق الضيافة والوحدات السكنية',
        categoryKey: 'production',
        year: 'مشروع حديث موثق',
        summary:
          'توجيه فني إبداعي، إنتاج المحتوى المرئي، والتسويق الرقمي لمنشأة ضيافة وإقامة سكنية.',
        fullStory:
          'ريزيدنس العيري هي علامة ضيافة وسكنية معروفة. تم التعاون مع ماركتنج ميلون لتعزيز الحضور البصري الرقمي للعلامة، وإنتاج لقطات تصويرية ومحتوى ترويجي يبرز جمالية الغرف والمرافق والخدمات المقدمة للنزلاء عبر مختلف المنصات الرقمية.',
        verifiedScope: [
          'التوجيه البصري الفني والتصوير الفوتوغرافي',
          'تصوير مرئي داخلي وإنتاج الفيديو الإعلاني',
          'صناعة وتجهيز أصول النشر لمنصات التواصل',
          'التسويق الرقمي وتوزيع المحتوى',
        ],
        isVerifiedProject: true,
        sourceNote: 'مشروع حقيقي موثق ومذكور رسمياً في تحديثات الوكالة على لينكد إن.',
        heroColor: 'from-amber-700 via-rose-900 to-emerald-950',
        tags: ['قطاع الضيافة', 'إنتاج مرئي', 'توجيه إبداعي', 'سوشيال ميديا'],
        galleryItems: [
          {
            title: 'إبراز أجواء الراحة والضيافة',
            caption: 'تسليط الضوء على تفاصيل الغرف والمرافق وتجربة الإقامة.',
            aspectRatio: '16/9',
          },
          {
            title: 'حملة محتوى رقمي متكاملة',
            caption: 'أصول إعلانية وبصرية مصممة لجذب المسافرين والنزلاء.',
            aspectRatio: '4/3',
          },
          {
            title: 'حضور بصري موحد للعلامة',
            caption: 'هوية متناسقة عبر جميع القنوات الرقمية ومقاطع الفيديو.',
            aspectRatio: '16/9',
          },
        ],
      },
    ] as ProjectItem[],
    about: {
      eyebrow: 'من نحن',
      title: 'استراتيجية إبداعية مدفوعة بالبيانات والتنفيذ الدقيق',
      intro:
        'وكالة ماركتنج ميلون (Marketing Melon Agency) هي وكالة تسويق رقمي نابضة بالحيوية تنشط في مصر والمملكة العربية السعودية. نمزج بين السرد الإبداعي الجريء والتسويق الرقمي المنضبط لمساعدة العلامات التجارية على التميز والتفوق في أسواقها.',
      taglineMeaning:
        'فلسفتنا تتجسد في شعارنا: "اعصر الأفضل، وتفوّق على البقية". نسعى لاستخلاص أقصى طاقات العلامة التجارية ونقاط قوتها الحقيقية، وصياغتها في محتوى مرئي آسر، وإنتاج سينمائي عالي الجودة، وحملات ممولة تحقق أثراً حقيقياً.',
      pillarsTitle: 'مبادئنا في العمل',
      pillars: [
        {
          title: 'الصدق والشفافية التسويقية',
          desc: 'نركز على القيمة الحقيقية والتنفيذ المتقن والتواصل الواضح دون إطلاق وعود زائفة أو أرقام غير قابلة للإثبات.',
        },
        {
          title: 'قدرات إنتاجية شاملة',
          desc: 'من التصوير الأرضي والجوي بالدرون إلى الموشن جرافيكس ثلاثي الأبعاد وتطوير الويب، نملك دورة العمل بالكامل.',
        },
        {
          title: 'فهم عميق لثقافة المنطقة',
          desc: 'إدراك حقيقي لاهتمامات وسلوكيات المستهلكين وخصوصية الأسواق في مصر ودول مجلس التعاون الخليجي.',
        },
      ],
      regionalPresence: {
        title: 'التواجد الإقليمي وقنوات التواصل المباشرة',
        cairo: {
          country: 'مصر',
          city: 'القاهرة',
          phone: '+20 115 011 7387',
          phoneRaw: '+201150117387',
          status: 'قناة تواصل موثقة لمكتب القاهرة',
        },
        saudi: {
          country: 'المملكة العربية السعودية',
          city: 'المملكة العربية السعودية',
          phone: '+966 57 412 8113',
          phoneRaw: '+966574128113',
          status: 'المصدر: ملف بيهانس العام (تم وضع تنبيه لمراجعة المالك بخصوص رقم لينكد إن)',
        },
      },
    },
    contactPage: {
      eyebrow: 'ابدأ محادثتك معنا',
      title: 'دعنا نبني عملاً استثنائياً معاً',
      subtitle:
        'أخبرنا عن علامتك التجارية، أهداف حملتك القادمة، أو احتياجاتك الإنتاجية والتقنية. سنرد عليك بدراسة وتصور واضح.',
      form: {
        nameLabel: 'الاسم الكريم *',
        namePlaceholder: 'مثال: أحمد عبد الله',
        emailLabel: 'البريد الإلكتروني للعمل *',
        emailPlaceholder: 'ahmed@company.com',
        phoneLabel: 'رقم الهاتف / الواتساب (اختياري)',
        phonePlaceholder: '+20 ... أو +966 ...',
        companyLabel: 'اسم الشركة أو العلامة التجارية',
        companyPlaceholder: 'مثال: شركة الرؤية للتطوير',
        servicesLabel: 'الخدمات المطلوبة *',
        budgetLabel: 'الميزانية التقديرية للمشروع (بالدولار / الريال / الجنيه)',
        budgetOptions: [
          'أقل من ٣,٠٠٠ دولار / نطاق تأسيسي',
          '٣,٠٠٠ - ٧,٥٠٠ دولار / نمو وتطوير متوسط',
          '٧,٥٠٠ - ١٥,٠٠٠ دولار / توسع وإنتاج مرئي شامل',
          '+١٥,٠٠٠ دولار / عقد إدارة وتسويق متكامل',
          'غير محدد حالياً / نود مناقشة النطاق',
        ],
        messageLabel: 'نبذة عن المشروع والأهداف *',
        messagePlaceholder:
          'شاركنا نبذة عن مشروعك، التحديات الحالية، الجمهور المستهدف، والنتائج التي تطمح لتحقيقها...',
        submitButton: 'إرسال تفاصيل المشروع',
        submitting: 'جارٍ إرسال البيانات...',
        successTitle: 'تم استلام استفسارك بنجاح!',
        successMessage:
          'شكراً لتواصلك مع وكالة ماركتنج ميلون. سيقوم فريقنا بمراجعة تفاصيل مشروعك والتواصل معك خلال ٢٤ ساعة.',
        errorTitle: 'حالة إرسال النموذج',
        errorMessage:
          'الإرسال المباشر عبر البريد بانتظار تفعيل بيانات SMTP من قبل الإدارة. يرجى التواصل معنا مباشرة عبر واتساب أو البريد الموضح أدناه للحصول على استجابة فورية.',
      },
      directChannels: {
        title: 'قنوات التواصل المباشر',
        description:
          'هل تفضل التحدث مباشرة؟ يمكنك التواصل معنا عبر واتساب لمكتبي القاهرة والمملكة أو عبر البريد الإلكتروني الرسمي.',
      },
    },
    footer: {
      tagline: 'اعصر الأفضل، وتفوّق على البقية.',
      description:
        'وكالة تسويق رقمي تجمع بين الاستراتيجية الإبداعية والحملات المدعومة بالبيانات في مصر والمملكة العربية السعودية.',
      quickLinks: 'روابط سريعة',
      servicesTitle: 'الخدمات',
      contactTitle: 'تواصل معنا',
      rights: 'جميع الحقوق محفوظة.',
      disclaimer:
        'الموقع الرسمي لوكالة ماركتنج ميلون. جميع المعلومات موثقة وفق السجلات العامة للوكالة.',
    },
  },
};

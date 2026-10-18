import { getServices } from './capabilities';
import { CompanyInfo, NavItem, ProcessStep, ProjectItem } from '@/types/content';

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
      display: '01150117387',
      raw: '+201150117387',
      address: 'Hadayek al-Ahram, Giza',
      addressAr: 'حدائق الأهرام، الجيزة، مصر',
      whatsappUrl: 'https://wa.me/201150117387?text=Hello%20Marketing%20Melon%20Agency%2C%20I%20would%20like%20to%20inquire%20about%20a%20project.',
      note: 'Egypt Office: Hadayek al-Ahram, Giza',
    },
    saudi: {
      display: '+966547851570',
      raw: '+966547851570',
      secondaryDisplay: '+966 50 925 1351',
      secondaryRaw: '+966509251351',
      address: 'Riyadh, Saudi Arabia',
      addressAr: 'الرياض، المملكة العربية السعودية',
      whatsappUrl: 'https://wa.me/966547851570?text=Hello%20Marketing%20Melon%20Agency%2C%20I%20would%20like%20to%20inquire%20about%20a%20project.',
      secondaryWhatsappUrl: 'https://wa.me/966509251351?text=Hello%20Marketing%20Melon%20Agency%2C%20I%20would%20like%20to%20inquire%20about%20a%20project.',
      note: 'Saudi Arabia Office: Riyadh, Saudi Arabia',
    },
  },
  socialLinks: {
    facebook: 'https://www.facebook.com/marketingmelonagency/',
    linkedin: 'https://www.linkedin.com/company/marketing-melon/',
    instagram: 'https://www.instagram.com/marketingmelonagency/',
    behance: 'https://www.behance.net/marketingmelon',
    tiktok: 'https://www.tiktok.com/@marketingmelonagency',
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
      tagline: 'FROM SPARK TO SQUEEZE',
      subtitle:
        'A full-service creative and digital marketing agency. Fresh ideas. Thoughtful design. Work that moves your brand forward.',
      ctaPrimary: "Let's Talk",
      ctaSecondary: 'Explore Our Work',
      stats: [
        { label: 'Creative Disciplines', value: '9' },
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
    services: getServices('en'),
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
      title: 'Good work. Real brands.',
      subtitle:
        'Films, identities, campaigns, and the people behind them. Explore what we create with our clients.',
      filterAll: 'All Disciplines',
      viewCaseStudy: 'Explore Project',
    },
    projects: [
      {
        slug: 'printing-devices-campaign',
        title: 'Printing & Office Hardware E-Commerce',
        client: 'Regional Tech & Hardware Enterprise',
        category: 'Performance Marketing & Google Ads',
        categoryKey: 'ads',
        year: 'Verified InDesign 2027 Record',
        summary:
          'High-efficiency search and shopping acquisition campaigns achieving a massive 3,649.87% ROAS with 279 verified purchase conversions.',
        fullStory:
          'Marketing Melon managed targeted Google Ads campaigns for commercial printing devices. By restructuring high-intent search keywords, negative matching, and bid optimization, the campaign generated 68,400 SAR in verified sales from an ad spend of just 1,870 SAR (3,649.87% ROAS).',
        verifiedScope: [
          'Google Search & Shopping Campaign Architecture',
          'Conversion Tracking & Analytics Audit',
          'High-Intent Keyword Precision Bidding',
          'ROAS Scaling & Bid Strategy Automation',
        ],
        isVerifiedProject: true,
        sourceNote: 'Verified InDesign Company Profile record: 3,649.87% ROAS | 279 Purchases | 68.4K SAR Sales | 1.87K SAR Cost.',
        heroColor: 'from-blue-700 via-indigo-900 to-black',
        tags: ['Google Ads', '3,649% ROAS', 'E-Commerce', 'B2B'],
        image: '/images/results/google-ads-1.png',
        badge: '3,649.87% ROAS',
        galleryItems: [
          {
            title: '3,649.87% ROAS Conversion Report',
            caption: '279 purchases delivering 68,400 SAR on 1,870 SAR spend.',
            aspectRatio: '16/9',
            image: '/images/results/google-ads-1.png',
          },
        ],
      },
      {
        slug: 'beauty-skincare-scaling',
        title: 'Luxury Beauty & Skincare Brand',
        client: 'GCC Cosmetics E-Commerce',
        category: 'Performance Marketing & Social Commerce',
        categoryKey: 'ads',
        year: 'Verified InDesign 2027 Record',
        summary:
          'Scaling high-converting paid traffic across Meta & Google Ads, generating 428,000 SAR in gross sales from 43,700 qualified clicks.',
        fullStory:
          'Through dynamic catalog ads, compelling beauty creative angles, and rigorous retargeting funnels, Marketing Melon delivered over 428,000 SAR in direct consumer purchases on a total spend of 9,330 SAR, recording a 4,587% overall return.',
        verifiedScope: [
          'Meta Advantage+ & Dynamic Product Ads',
          'Google Performance Max Campaigns',
          'Audience Retargeting & LTV Optimization',
          'Creative A/B Testing & Video Hooks',
        ],
        isVerifiedProject: true,
        sourceNote: 'Verified InDesign Company Profile record: 43.7K Clicks | 428K SAR Sales | 9.33K SAR Cost.',
        heroColor: 'from-pink-600 via-rose-900 to-black',
        tags: ['Beauty', '428K SAR Sales', 'Meta Ads', 'Google Ads'],
        image: '/images/results/google-ads-2.png',
        badge: '428K SAR Sales',
        galleryItems: [
          {
            title: '428K SAR Sales Acquisition Metric',
            caption: '43.7K targeted clicks converted across the GCC market.',
            aspectRatio: '16/9',
            image: '/images/results/google-ads-2.png',
          },
        ],
      },
      {
        slug: 'luxury-jewelry-reach',
        title: 'Gold & Fine Jewelry Boutique',
        client: 'Regional Fine Jewelry Atelier',
        category: 'Brand Awareness & High-End Performance',
        categoryKey: 'ads',
        year: 'Verified InDesign 2027 Record',
        summary:
          'Multi-channel brand awareness and conversion campaign reaching over 2.05 Million impressions and driving 72,900 SAR in fine jewelry acquisitions.',
        fullStory:
          'High-ticket jewelry requires trust-centric storytelling combined with high-frequency luxury visual assets. Marketing Melon orchestrated a high-impact digital rollout achieving 2.05M impressions and 23.3K targeted clicks with strong ROAS.',
        verifiedScope: [
          'High-End Luxury Visual Creative Direction',
          'Precision High-Net-Worth Audience Targeting',
          'Google Search & Social Conversion Funnel',
          'Omnichannel Brand Authority Building',
        ],
        isVerifiedProject: true,
        sourceNote: 'Verified InDesign Company Profile record: 2.05M Impressions | 23.3K Clicks | 72.9K SAR Sales | 14.3K SAR Cost.',
        heroColor: 'from-amber-600 via-yellow-900 to-black',
        tags: ['Fine Jewelry', '2.05M Impressions', 'Luxury', 'Performance'],
        image: '/images/results/google-ads-3.png',
        badge: '2.05M Impressions',
        galleryItems: [
          {
            title: '2.05M Impressions Campaign Reach',
            caption: '23,300 clicks and 72,900 SAR generated for fine gold pieces.',
            aspectRatio: '16/9',
            image: '/images/results/google-ads-3.png',
          },
        ],
      },
      {
        slug: 'organic-seo-dominance',
        title: 'Search Console & Technical SEO Dominance',
        client: 'Enterprise Regional Platform',
        category: 'Technical SEO & Organic Visibility',
        categoryKey: 'web',
        year: 'Verified InDesign 2027 Record',
        summary:
          'Long-term organic search engineering generating 3.32 Million Google search impressions, 96,700 clicks, and over 34,000 active users.',
        fullStory:
          'By rebuilding site technical architecture, conducting keyword gap mapping, optimizing Core Web Vitals, and implementing semantic topic clusters, Marketing Melon scaled search visibility to 3.32M impressions and 993,000 active web events.',
        verifiedScope: [
          'Technical SEO Architecture & Site Speed',
          'Bilingual Semantic Keyword Clustering',
          'Search Console Indexing & CTR Optimization',
          'Google Analytics 4 Tracking & Event Mapping',
        ],
        isVerifiedProject: true,
        sourceNote: 'Verified InDesign Company Profile record: 3.32M Impressions | 96.7K Clicks | 34K Active Users | 993K Events.',
        heroColor: 'from-emerald-600 via-teal-950 to-black',
        tags: ['Technical SEO', '3.32M Impressions', '96.7K Clicks', 'Google Analytics'],
        image: '/images/melon-strap.png',
        badge: '3.32M Impressions',
        galleryItems: [
          {
            title: '3.32M Organic Search Impressions',
            caption: '96.7K organic clicks with a 5.1% CTR on target keywords.',
            aspectRatio: '16/9',
            image: '/images/melon-strap.png',
          },
        ],
      },
      {
        slug: 'al-eairy-residence',
        title: 'Al Eairy Residence',
        client: 'Al Eairy Residence (Saudi Arabia)',
        category: 'Hospitality & Real Estate Marketing',
        categoryKey: 'production',
        year: 'Verified Production Record',
        summary:
          'Comprehensive creative direction, ground & drone visual media production, and digital presentation for residential & hospitality accommodation.',
        fullStory:
          'Al Eairy Residence is an established accommodation and residential hospitality brand in Saudi Arabia. Marketing Melon produced high-end interior and exterior imagery, architectural drone footage, and social media campaigns including the official Saudi National Day special rollout.',
        verifiedScope: [
          'Brand Visual Direction & Interior Photography',
          'Ground & Drone Exterior Cinematography',
          'Saudi National Day Campaign Creative',
          'Social Media Asset Creation & Placement',
        ],
        isVerifiedProject: true,
        sourceNote: 'Verified client relationship documented on official archives and production media.',
        heroColor: 'from-amber-700 via-rose-900 to-emerald-950',
        tags: ['Hospitality', 'Drone Filming', 'Interior Photography', 'Saudi Arabia'],
        image: '/images/work/al-eairy-residence.png',
        badge: 'Verified Client',
        galleryItems: [
          {
            title: 'Living Suites & Hospitality Branding',
            caption: 'Showcasing welcoming spaces, interior comfort, and brand hospitality.',
            aspectRatio: '4/5',
            image: '/images/work/al-eairy-residence.png',
          },
          {
            title: 'Saudi National Day Special Campaign',
            caption: 'Cultural hospitality storytelling: "Our Pride In Our Generosity".',
            aspectRatio: '4/5',
            image: '/images/work/al-eairy-national-day.png',
          },
          {
            title: 'Architectural & Interior Photography',
            caption: 'High-resolution interior photography of living suites and amenities.',
            aspectRatio: '16/9',
            image: '/images/work/al-eairy-interior.jpg',
          },
          {
            title: 'Drone & Exterior Facade Cinematography',
            caption: 'Aerial drone footage capturing residential property facade.',
            aspectRatio: '16/9',
            image: '/images/work/al-eairy-video.jpg',
          },
        ],
      },
      {
        slug: 'trova-travel-tourism',
        title: 'Trova Travel & Tourism Campaigns',
        client: 'Trova Tourism (Egypt)',
        category: 'Social Media & Tourism Marketing',
        categoryKey: 'social',
        year: '2025 – 2026 Production Record',
        summary:
          'High-impact social media marketing, 3D neon typography, and destination discovery campaigns across Sharm El-Sheikh, Dahab, and Taba.',
        fullStory:
          'Trova is a premier Egyptian tourism and getaway agency. Marketing Melon created comprehensive travel campaigns integrating 3D neon Arabic typography, vibrant coastal photography, and strategic booking packages for top destinations including Sharm El Sheikh, Dahab, and Taba.',
        verifiedScope: [
          '3D Arabic Typography & Key Visual Design',
          'Multi-Platform Social Media Content Strategy',
          'Hotel & Resort Promotional Packaging',
          'Paid Audience Targeting & Conversion Funnels',
        ],
        isVerifiedProject: true,
        sourceNote: 'Official agency campaign records from Marketing Melon Media archive.',
        heroColor: 'from-cyan-600 via-blue-900 to-black',
        tags: ['Tourism', 'Travel Marketing', '3D Typography', 'Social Media'],
        image: '/images/work/trova-sharm.jpg',
        badge: 'Verified Client',
        galleryItems: [
          {
            title: 'Sharm El Sheikh 3D Neon Destination Visual',
            caption: 'Hero campaign artwork featuring Sharm El Sheikh mountains and nightscape.',
            aspectRatio: '4/5',
            image: '/images/work/trova-sharm.jpg',
          },
          {
            title: 'Dahab Coastal Experience Campaign',
            caption: 'Lifestyle coastal photography and package offerings.',
            aspectRatio: '4/5',
            image: '/images/work/trova-dahab.jpg',
          },
          {
            title: 'Luxury Sharm Resort Promotion',
            caption: 'High-conversion travel package creatives.',
            aspectRatio: '4/5',
            image: '/images/work/trova-resort.jpg',
          },
          {
            title: 'Taba Getaways Artwork',
            caption: 'Red Sea getaway promotional campaign.',
            aspectRatio: '4/5',
            image: '/images/work/trova-taba.jpg',
          },
        ],
      },
      {
        slug: 'biolife-medical-clinic',
        title: 'BioLife Clinic Medical Video Production',
        client: 'BioLife Medical Clinics',
        category: 'Healthcare & Medical Video Production',
        categoryKey: 'production',
        year: '2025 – 2026 Production Record',
        summary:
          'Professional clinic studio filming, physician consultations, and patient awareness video reels for healthcare authority.',
        fullStory:
          'BioLife Clinic partnered with Marketing Melon to produce cinematic medical education and patient consultation video reels. Our production team set up multi-point studio lighting, high-fidelity audio, and clean visual graphics to build trust and drive clinic appointments.',
        verifiedScope: [
          'Medical Studio Filming & Lighting Direction',
          'Physician Q&A Video Scripting & Production',
          'Post-Production & Healthcare Motion Graphics',
          'Reels & TikTok Algorithm Optimization',
        ],
        isVerifiedProject: true,
        sourceNote: 'Official clinic production archives in Marketing Melon Media.',
        heroColor: 'from-teal-600 via-emerald-950 to-black',
        tags: ['Healthcare', 'Medical Reels', 'Video Production', 'Studio Filming'],
        image: '/images/work/biolife-profile.png',
        badge: 'Medical Production',
        galleryItems: [
          {
            title: 'Physician Consultation Series',
            caption: 'High-definition medical education video reels.',
            aspectRatio: '9/16',
            image: '/images/work/biolife-profile.png',
          },
          {
            title: 'Clinic Environment & Facilities Walkthrough',
            caption: 'Modern healthcare facilities and patient reception spaces.',
            aspectRatio: '9/16',
            image: '/images/work/biolife-profile.png',
          },
        ],
      },
      {
        slug: 'a26-restaurant-cafe',
        title: 'A26 Cafe & Beverage Commercial Launch',
        client: 'A26 Cafe & Lounge',
        category: 'F&B Commercial Production & Photography',
        categoryKey: 'production',
        year: '2025 – 2026 Production Record',
        summary:
          'Commercial product cinematography, dynamic beverage reels, and seasonal digital marketing campaigns.',
        fullStory:
          'A26 Cafe offers premium specialty beverages and curated cafe experiences. Marketing Melon led commercial video production, capturing product freshness, beverage craftsmanship, and store ambiance to elevate social engagement and in-store foot traffic.',
        verifiedScope: [
          'Beverage & Food Product Cinematography',
          'Fast-Paced Social Reels Post-Production',
          'Digital Menu & Store Launch Strategy',
          'Seasonal Festive Campaigns (Winter & Holidays)',
        ],
        isVerifiedProject: true,
        sourceNote: 'Official commercial video archives in Marketing Melon Media.',
        heroColor: 'from-blue-600 via-sky-950 to-black',
        tags: ['F&B', 'Beverage Reels', 'Commercial Production', 'Social Media'],
        image: '/images/work/a26-restaurant.jpg',
        badge: 'F&B Production',
        galleryItems: [
          {
            title: 'Signature Beverage Commercial Shoot',
            caption: 'Product showcase highlighting handcrafted iced beverages.',
            aspectRatio: '9/16',
            image: '/images/work/a26-restaurant.jpg',
          },
        ],
      },
      {
        slug: 'atheel-event-production',
        title: 'Atheel Champions Sports & Event Coverage',
        client: 'Atheel Customer Experience',
        category: 'Event Cinematography & Live Sports Media',
        categoryKey: 'production',
        year: '2026 Production Record',
        summary:
          'Full-scale tournament coverage, multi-camera sports action cinematography, and dynamic event highlights.',
        fullStory:
          'For the Atheel Champions corporate tournament, Marketing Melon provided comprehensive on-ground sports cinematography, capturing high-energy football matches, player celebrations, and corporate branding moments.',
        verifiedScope: [
          'Multi-Angle Sports Event Cinematography',
          'Field Photography & Action Shots',
          'High-Energy Highlight Reels & Color Grading',
          'Corporate Event Brand Storytelling',
        ],
        isVerifiedProject: true,
        sourceNote: 'Event footage and deliverables from Marketing Melon Media.',
        heroColor: 'from-indigo-600 via-blue-950 to-black',
        tags: ['Event Coverage', 'Sports Production', 'Cinematography', 'Corporate Events'],
        image: '/images/work/football-production.jpg',
        badge: 'Event Production',
        galleryItems: [
          {
            title: 'Tournament Team Showcase & Opening Match',
            caption: 'Atheel Champions tournament banner and team photography.',
            aspectRatio: '16/9',
            image: '/images/work/football-production.jpg',
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
          city: 'Hadayek al-Ahram, Giza',
          phone: '01150117387',
          phoneRaw: '+201150117387',
          status: 'Egypt Office: Hadayek al-Ahram, Giza',
        },
        saudi: {
          country: 'Saudi Arabia',
          city: 'Riyadh, Saudi Arabia',
          phone: '+966547851570 / +966 50 925 1351',
          phoneRaw: '+966547851570',
          secondaryPhoneRaw: '+966509251351',
          status: 'Saudi Arabia Office: Riyadh, Saudi Arabia',
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
    services: getServices('ar'),
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
        slug: 'printing-devices-campaign',
        title: 'أجهزة الطباعة وحلول المكاتب',
        client: 'شركة رائدة في قطاع الأجهزة والطباعة',
        category: 'التسويق بالأداء وإعلانات Google',
        categoryKey: 'ads',
        year: 'سجل موثق في ملف الشركة 2027',
        summary:
          'حملات إعلانية عالية الكفاءة عبر شبكة بحث وجوجل للتسوق حققت عائداً استثمارياً مذهلاً 3,649.87% ROAS مع 279 عملية شراء ناجحة.',
        fullStory:
          'أدارت وكالة ماركتنج ميلون حملات إعلانية مستهدفة عبر إعلانات Google لقطاع أجهزة ومعدات الطباعة. من خلال إعادة هيكلة الكلمات المفتاحية ذات نية الشراء العالية، استبعاد الكلمات السلبية، وضبط عروض الأسعار، حققت الحملة مبيعات بقيمة 68,400 ريال سعودي من ميزانية إعلانية بلغت 1,870 ريال فقط (عائد ROAS 3,649.87%).',
        verifiedScope: [
          'هيكلة حملات Google Search وShopping المتطورة',
          'تدقيق وضبط بكسل التتبع والتحويلات ومؤشرات الأداء',
          'استهداف كلمات البحث ذات النية الشرائية العالية',
          'أتمتة استراتيجيات المزايدة لتعظيم العائد على الإنفاق',
        ],
        isVerifiedProject: true,
        sourceNote: 'موثق في ملف الشركة الرسمي 2027: عائد ROAS 3,649.87% | 279 عملية شراء | 68.4 ألف ريال مبيعات | 1.87 ألف ريال تكلفة.',
        heroColor: 'from-blue-700 via-indigo-900 to-black',
        tags: ['إعلانات Google', 'عائد 3,649%', 'تجارة إلكترونية', 'B2B'],
        image: '/images/results/google-ads-1.png',
        badge: 'عائد 3,649% ROAS',
        galleryItems: [
          {
            title: 'تقرير عائد الاستثمار 3,649.87% ROAS',
            caption: '279 طلب شراء بمبيعات 68,400 ريال مقابل تكلفة 1,870 ريال.',
            aspectRatio: '16/9',
            image: '/images/results/google-ads-1.png',
          },
        ],
      },
      {
        slug: 'beauty-skincare-scaling',
        title: 'مستحضرات التجميل والعناية بالبشرة',
        client: 'متجر خليجي رائد لمستحضرات التجميل',
        category: 'التسويق بالأداء والتجارة الإلكترونية',
        categoryKey: 'ads',
        year: 'سجل موثق في ملف الشركة 2027',
        summary:
          'توسيع نطاق المبيعات الإلكترونية عبر Meta وGoogle Ads، محققاً مبيعات إجمالية تجاوزت 428,000 ريال سعودي من 43,700 نقرة مستهدفة.',
        fullStory:
          'عبر إعلانات الكتالوج الديناميكي والزوايا الإعلانية الجذابة ومسارات إعادة الاستهداف المتقدمة، قادت ماركتنج ميلون مبيعات مباشرة تجاوزت 428,000 ريال سعودي من ميزانية إجمالية بلغت 9,330 ريال بنسبة عائد إجمالي 4,587%.',
        verifiedScope: [
          'حملات Meta Advantage+ وإعلانات المنتجات الديناميكية',
          'حملات Google Performance Max متعددة القنوات',
          'إعادة الاستهداف وتحسين القيمة الدائمة للعميل (LTV)',
          'اختبارات A/B المستمرة للنسخ الإعلانية والفيديوهات',
        ],
        isVerifiedProject: true,
        sourceNote: 'موثق في ملف الشركة الرسمي 2027: 43.7 ألف نقرة | 428 ألف ريال مبيعات | 9.33 ألف ريال تكلفة.',
        heroColor: 'from-pink-600 via-rose-900 to-black',
        tags: ['تجميل وعناية', 'مبيعات 428 ألف ريال', 'إعلانات Meta', 'Google Ads'],
        image: '/images/results/google-ads-2.png',
        badge: 'مبيعات 428K ريال',
        galleryItems: [
          {
            title: 'مبيعات بقيمة 428 ألف ريال',
            caption: '43.7 ألف نقرة مستهدفة تحولت إلى طلبات شراء في السوق الخليجي.',
            aspectRatio: '16/9',
            image: '/images/results/google-ads-2.png',
          },
        ],
      },
      {
        slug: 'luxury-jewelry-reach',
        title: 'مجوهرات فاخرة وذهب',
        client: 'دار مجوهرات راقية',
        category: 'بناء العلامة الفاخرة والتسويق بالأداء',
        categoryKey: 'ads',
        year: 'سجل موثق في ملف الشركة 2027',
        summary:
          'حملة شاملة لتعزيز الوعي بالعلامة والتحويل المباشر، حققت أكثر من 2.05 مليون ظهور وأكثر من 72,900 ريال مبيعات في قطاع المجوهرات.',
        fullStory:
          'يتطلب تسويق المجوهرات الفاخرة رواية بصرية تبني الثقة مصحوبة بأصول فاخرة عالية التردد. نظمت ماركتنج ميلون انطلاقة رقمية واسعة حصدت أكثر من 2.05 مليون ظهور و23.3 ألف نقرة مستهدفة بعائد استثماري مميز.',
        verifiedScope: [
          'التوجيه الفني البصري لمنتجات الرفاهية والمجوهرات',
          'استهداف فئات الجمهور ذات الملاءة المالية العالية',
          'مسار تحويل متكامل عبر محركات البحث وشبكات التواصل',
          'بناء موثوقية العلامة ومكانتها الفاخرة في السوق',
        ],
        isVerifiedProject: true,
        sourceNote: 'موثق في ملف الشركة الرسمي 2027: 2.05 مليون ظهور | 23.3 ألف نقرة | 72.9 ألف ريال مبيعات | 14.3 ألف ريال تكلفة.',
        heroColor: 'from-amber-600 via-yellow-900 to-black',
        tags: ['مجوهرات فاخرة', '2.05 مليون ظهور', 'فخامة', 'أداء إعلاني'],
        image: '/images/results/google-ads-3.png',
        badge: '2.05 مليون ظهور',
        galleryItems: [
          {
            title: 'وصول واسع تجاوز 2.05 مليون ظهور',
            caption: '23,300 نقرة ومبيعات بقيمة 72,900 ريال للمشغولات الذهبية.',
            aspectRatio: '16/9',
            image: '/images/results/google-ads-3.png',
          },
        ],
      },
      {
        slug: 'organic-seo-dominance',
        title: 'تصدر محركات البحث وتحسين SEO التقني',
        client: 'منصة رقمية كبرى',
        category: 'الـ SEO التقني والظهور المجاني',
        categoryKey: 'web',
        year: 'سجل موثق في ملف الشركة 2027',
        summary:
          'هندسة متقدمة لتحسين محركات البحث أنتجت أكثر من 3.32 مليون ظهور في Google و96,700 نقرة وأكثر من 34,000 مستخدم نشط.',
        fullStory:
          'من خلال إعادة بناء البنية التقنية للموقع، سد فجوات الكلمات المفتاحية، تسريع الأداء وتحسين Core Web Vitals، وتطبيق العناقيد الدلالية (Topic Clusters)، ضاعفت ماركتنج ميلون الظهور المجاني ليصل إلى 3.32M ظهور و993,000 حدث تفاعلي على الموقع.',
        verifiedScope: [
          'البنية التقنية للـ SEO وسرعة استجابة الخوادم',
          'توزيع الكلمات الدلالية باللغتين العربية والإنجليزية',
          'تحسين الأرشفة في Google Search Console ومعدل النقر (CTR)',
          'تتبع Google Analytics 4 وخرائط تفاعل الزوار',
        ],
        isVerifiedProject: true,
        sourceNote: 'موثق في ملف الشركة الرسمي 2027: 3.32 مليون ظهور | 96.7 ألف نقرة | 34 ألف مستخدم نشط | 993 ألف حدث.',
        heroColor: 'from-emerald-600 via-teal-950 to-black',
        tags: ['SEO تقني', '3.32 مليون ظهور', '96.7 ألف نقرة', 'Google Analytics'],
        image: '/images/melon-strap.png',
        badge: '3.32M ظهور في Google',
        galleryItems: [
          {
            title: '3.32 مليون ظهور في نتائج البحث',
            caption: '96.7 ألف نقرة عضوية بمعدل نقر 5.1% على الكلمات الرئيسية.',
            aspectRatio: '16/9',
            image: '/images/melon-strap.png',
          },
        ],
      },
      {
        slug: 'al-eairy-residence',
        title: 'ريزيدنس العيري للشقق الفندقية',
        client: 'مجموعة العيري — المملكة العربية السعودية',
        category: 'تسويق الضيافة والإنتاج المرئي',
        categoryKey: 'production',
        year: 'سجل إنتاج معتمد وموثق',
        summary:
          'توجيه فني إبداعي، تصوير معماري داخلي وخارجي بالدرون، وتصميم حملات السوشيال ميديا والحملة الرسمية لليوم الوطني السعودي.',
        fullStory:
          'ريزيدنس العيري هي إحدى أعرق علامات الضيافة والشقق المخدومة بالمملكة العربية السعودية. قادت ماركتنج ميلون الإنتاج البصري الكامل للعلامة، بدءاً من التصوير المعماري والدرون الجوي وصولاً إلى إطلاق الحملات الوطنية الاحتفالية مثل "عزنا بكرمنا" وحملات "مو بس مكان للإقامة".',
        verifiedScope: [
          'التوجيه البصري الفني والتصوير الفوتوغرافي المعماري',
          'تصوير مرئي داخلي وإنتاج لقطات الدرون الجوية',
          'تصميم وإطلاق حملة اليوم الوطني السعودي (عزنا بكرمنا)',
          'صناعة وإدارة أصول النشر لمنصات التواصل الرقمي',
        ],
        isVerifiedProject: true,
        sourceNote: 'مشروع حقيقي معتمد من واقع أرشيف الإنتاج في Marketing Melon Media.',
        heroColor: 'from-amber-700 via-rose-900 to-emerald-950',
        tags: ['ضيافة وشقق فندقية', 'تصوير درون', 'اليوم الوطني السعودي', 'السعودية'],
        image: '/images/work/al-eairy-residence.png',
        badge: 'مشروع معتمد — السعودية',
        galleryItems: [
          {
            title: 'هوية حملة الإقامة "مو بس مكان للإقامة"',
            caption: 'تسليط الضوء على تجربة الراحة وحفاوة الاستقبال السعودي.',
            aspectRatio: '4/5',
            image: '/images/work/al-eairy-residence.png',
          },
          {
            title: 'حملة اليوم الوطني السعودي "عزنا بكرمنا"',
            caption: 'احتفاء بالتراث والأصالة وكرم الضيافة السعودية.',
            aspectRatio: '4/5',
            image: '/images/work/al-eairy-national-day.png',
          },
          {
            title: 'التصوير الفوتوغرافي الداخلي للأجنحة',
            caption: 'جلسات تصوير بدقة 6K تبرز رحابة الغرف وجودة الأثاث والتجهيزات.',
            aspectRatio: '16/9',
            image: '/images/work/al-eairy-interior.jpg',
          },
          {
            title: 'التصوير الجوي بالدرون للواجهات المعمارية',
            caption: 'لقطات سينمائية جوية تبرز موقع المبنى ومداخله الفندقية.',
            aspectRatio: '16/9',
            image: '/images/work/al-eairy-video.jpg',
          },
        ],
      },
      {
        slug: 'trova-travel-tourism',
        title: 'تروفا للسياحة والرحلات الفندقية',
        client: 'شركة تروفا ترافيل مصر (Trova Tourism)',
        category: 'سوشيال ميديا وتصميم الحملات الإعلانية',
        categoryKey: 'social',
        year: 'سجل إنتاج 2025 – 2026',
        summary:
          'حملات رقمية متكاملة لترويج الوجهات السياحية في شرم الشيخ ودهب وطابا بأسلوب التايبوجرافي ثلاثي الأبعاد المضيء (3D Neon).',
        fullStory:
          'تروفا هي شركة رائدة في تنظيم الرحلات والبرامج السياحية الساحلية في مصر. ابتكرت ماركتنج ميلون هوية بصرية مفعمة بالطاقة تجمع بين خطوط النيون ثلاثية الأبعاد والتصوير الواقعي للشواطئ والمنتجعات مع بطاقات أسعار وحزم إقامة جاذبة.',
        verifiedScope: [
          'تصميم تايبوجرافي عربي ثلاثي الأبعاد (3D Neon Artwork)',
          'تطوير استراتيجية محتوى السوشيال ميديا عبر فيسبوك وإنستغرام',
          'تصميم وبناء الباقات الفندقية والعروض الترويجية',
          'إدارة الحملات الممولة واستهداف المهتمين بالسفر والرحلات',
        ],
        isVerifiedProject: true,
        sourceNote: 'مشروع حقيقي معتمد من واقع أرشيف إنتاج Marketing Melon Media.',
        heroColor: 'from-cyan-600 via-blue-900 to-black',
        tags: ['تسويق سياحي', 'تايبوجرافي 3D', 'شرم الشيخ', 'دهب'],
        image: '/images/work/trova-sharm.jpg',
        badge: 'مشروع معتمد',
        galleryItems: [
          {
            title: 'حملة شرم الشيخ — تايبوجرافي نيون ثلاثي الأبعاد',
            caption: 'عمل فني إعلاني يدمج جبال شرم الشيخ مع إضاءات النيون الرقمية.',
            aspectRatio: '4/5',
            image: '/images/work/trova-sharm.jpg',
          },
          {
            title: 'كاروسيل دهب الساحلي والأنشطة البحرية',
            caption: 'تصوير طبيعي وأجواء استرخاء مع عروض حجز وإقامة متكاملة.',
            aspectRatio: '4/5',
            image: '/images/work/trova-dahab.jpg',
          },
          {
            title: 'عروض منتجعات وفنادق شرم الشيخ الفاخرة',
            caption: 'تصاميم تسويقية مباشرة تحفز عمليات الحجز والتواصل.',
            aspectRatio: '4/5',
            image: '/images/work/trova-resort.jpg',
          },
          {
            title: 'رحلات طابا والبحر الأحمر',
            caption: 'تصاميم إعلانية لحملات الاستجمام والمغامرات الساحلية.',
            aspectRatio: '4/5',
            image: '/images/work/trova-taba.jpg',
          },
        ],
      },
      {
        slug: 'biolife-medical-clinic',
        title: 'عيادات بايو لايف — الإنتاج الطبي المرئي',
        client: 'عيادات بايو لايف التخصصية (BioLife Clinic)',
        category: 'الإنتاج السينمائي والمحتوى الطبي الرقمي',
        categoryKey: 'production',
        year: 'سجل إنتاج 2025 – 2026',
        summary:
          'تصوير استوديو متكامل للأطباء، ريلز توعوية طبية، وتوثيق مرافق العيادات لبناء الثقة وجذب المراجعين.',
        fullStory:
          'تعاونت عيادات بايو لايف مع ماركتنج ميلون لتصوير وإنتاج سلسلة حلقات مرئية (Medical Video Reels) متخصصة تقدم إرشادات صحية وتجيب عن تساؤلات المرضى بإضاءة سينمائية احترافية وجودة صوت فائقة تعكس المستوى الطبي المرموق.',
        verifiedScope: [
          'إعداد وتجهيز استوديو التصوير داخل العيادة',
          'تصوير مقاطع Reels سينمائية للأطباء والاستشاريين',
          'المونتاج الطبي، التصحيح اللوني وإضافة العناوين الحركية',
          'خطة توزيع المحتوى على منصات Instagram وTikTok',
        ],
        isVerifiedProject: true,
        sourceNote: 'أصول وفيديوهات التصوير معتمدة من أرشيف Marketing Melon Media.',
        heroColor: 'from-teal-600 via-emerald-950 to-black',
        tags: ['إنتاج طبي', 'ريلز سينمائية', 'رعاية صحية', 'استوديو تصوير'],
        image: '/images/work/biolife-profile.png',
        badge: 'إنتاج طبي متخصص',
        galleryItems: [
          {
            title: 'سلسلة استشارات الأطباء المرئية',
            caption: 'فيديوهات توعوية موجهة للمرضى تم تصويرها باستوديو العيادة.',
            aspectRatio: '9/16',
            image: '/images/work/biolife-profile.png',
          },
          {
            title: 'توثيق أروقة العيادة وغرف الفحص',
            caption: 'إبراز النظافة والتعقيم والبيئة الطبية المريحة للمراجعين.',
            aspectRatio: '9/16',
            image: '/images/work/biolife-profile.png',
          },
        ],
      },
      {
        slug: 'a26-restaurant-cafe',
        title: 'كافيه ومطعم A26 — الإنتاج الإعلاني والتصوير',
        client: 'كافيه ومشروبات A26 (A26 Cafe & Beverages)',
        category: 'تصوير إعلاني وإنتاج مرئي للأغذية والمشروبات',
        categoryKey: 'production',
        year: 'سجل إنتاج 2025 – 2026',
        summary:
          'تصوير سينمائي للمشروبات الحصرية، ريلز ديناميكية سريعة الإيقاع، وحملات الإطلاق والمواسم الاحتفالية.',
        fullStory:
          'يقدم كافيه ومطعم A26 تشكيلة مبتكرة من المشروبات والعصائر المنعشة. قادت ماركتنج ميلون جلسات تصوير إعلاني وريلز استعراضية تبرز نضارة المكونات، وسرعة التحضير وتجربة الزائر لرفع التفاعل على السوشيال ميديا وزيادة المبيعات المباشرة.',
        verifiedScope: [
          'تصوير فوتوغرافي وسينمائي لمنتجات المشروبات والمأكولات',
          'إنتاج مقاطع ريلز قصيرة سريعة الانتشار (Viral Reels)',
          'استراتيجية التسويق البصري لقائمة المشروبات الرقمية',
          'تصميم حملات الأعياد والمواسم الشتوية',
        ],
        isVerifiedProject: true,
        sourceNote: 'أرشيف الفيديو والتصوير المعتمد في Marketing Melon Media.',
        heroColor: 'from-blue-600 via-sky-950 to-black',
        tags: ['أغذية ومشروبات', 'ريلز تجارية', 'تصوير إعلاني', 'إطلاق علامات'],
        image: '/images/work/a26-restaurant.jpg',
        badge: 'إنتاج تجاري F&B',
        galleryItems: [
          {
            title: 'جلسة تصوير المشروبات المنعشة',
            caption: 'لقطات سينمائية تبرز تفاصيل المشروبات المثلجة وطريقة تقديمها.',
            aspectRatio: '9/16',
            image: '/images/work/a26-restaurant.jpg',
          },
        ],
      },
      {
        slug: 'atheel-event-production',
        title: 'بطولة أثيل — التغطية والإنتاج الرياضي والميداني',
        client: 'شركة أثيل لتجربة العملاء (Atheel CX)',
        category: 'الإنتاج السينمائي والتغطيات الميدانية للفعاليات',
        categoryKey: 'production',
        year: 'سجل إنتاج 2026',
        summary:
          'تغطية ميدانية شاملة لبطولة كرة القدم للشركات، تصوير متعدد الكاميرات ولقطات سينمائية لأبرز أهداف وفعاليات البطولة.',
        fullStory:
          'خلال فعاليات دوري أثيل (Atheel Champions)، وفرت وكالة ماركتنج ميلون طاقم إنتاج ميداني متكامل لتغطية المباريات ولقطات الحماس والتكريم بأعلى معايير الإخراج الرياضي والتوثيق المؤسسي.',
        verifiedScope: [
          'تصوير ميداني متعدد الزوايا للمباريات الرياضية',
          'تصوير فوتوغرافي فوري للاعبين وفرق العمل والجمهور',
          'مونتاج فيديو الملخصات الحماسية مع تصحيح الألوان الصوتي',
          'توثيق الهوية المؤسسية وقيم التنافسية الإيجابية',
        ],
        isVerifiedProject: true,
        sourceNote: 'مواد التغطية والفيديو من أرشيف Marketing Melon Media.',
        heroColor: 'from-indigo-600 via-blue-950 to-black',
        tags: ['تغطيات فعاليات', 'إنتاج رياضي', 'توثيق شركات', 'فيديو سينمائي'],
        image: '/images/work/football-production.jpg',
        badge: 'تغطية ميدانية للفعاليات',
        galleryItems: [
          {
            title: 'افتتاح البطولة وتوثيق فرق العمل',
            caption: 'بانر بطولة أثيل الرسمية وفرق العمل الرياضية المشاركة.',
            aspectRatio: '16/9',
            image: '/images/work/football-production.jpg',
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
          country: 'جمهورية مصر العربية',
          city: 'حدائق الأهرام، الجيزة',
          phone: '01150117387',
          phoneRaw: '+201150117387',
          status: 'مكتب مصر: حدائق الأهرام، الجيزة',
        },
        saudi: {
          country: 'المملكة العربية السعودية',
          city: 'الرياض، المملكة العربية السعودية',
          phone: '+966547851570 / +966 50 925 1351',
          phoneRaw: '+966547851570',
          secondaryPhoneRaw: '+966509251351',
          status: 'مكتب السعودية: الرياض، المملكة العربية السعودية',
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

// The same projects power the home page, portfolio, detail pages, and editor.
const projectMedia: Record<string, { video?: string; disciplines: import('@/types/content').Discipline[]; order: number }> = {
  'al-eairy-residence': { video: '/videos/al-eairy.mp4', disciplines: ['videography', 'photography', 'branding'], order: 0 },
  'biolife-medical-clinic': { video: '/videos/biolife.mp4', disciplines: ['videography', 'social'], order: 1 },
  'a26-restaurant-cafe': { video: '/videos/a26.mp4', disciplines: ['videography', 'photography'], order: 2 },
  'atheel-event-production': { video: '/videos/atheel.mp4', disciplines: ['events', 'videography'], order: 3 },
  'trova-travel-tourism': { disciplines: ['social', 'photography'], order: 5 },
};
for (const locale of ['en', 'ar'] as const) {
  const ar = locale === 'ar';
  siteContent[locale].projects = siteContent[locale].projects.map((project, i) => {
    const media = projectMedia[project.slug];
    return { ...project, video: media?.video, disciplines: media?.disciplines, sortOrder: media?.order ?? i + 10, published: true };
  });
  siteContent[locale].projects.push({
    slug: 'marketing-melon-motion', client: 'Marketing Melon', title: ar ? 'هوية تتحرك بروح ميلون' : 'A brand with a little more motion',
    category: ar ? 'الموشن جرافيك' : 'Motion Graphics', categoryKey: 'production', year: '2025',
    summary: ar ? 'فيلم موشن جرافيك يقدم عالم ماركتنج ميلون الإبداعي.' : 'A motion graphics film introducing Marketing Melon’s creative world.',
    fullStory: ar ? 'تحريك يجمع شخصية العلامة ورسالتها في فيلم قصير، من مكتبة أعمال ميلون.' : 'Animation brings the brand’s personality and message together in a short film from the Melon creative library.',
    verifiedScope: ar ? ['الموشن جرافيك', 'محتوى العلامة'] : ['Motion graphics', 'Brand content'],
    isVerifiedProject: true, sourceNote: 'Marketing Melon Media / Melon / 2025 / Aug / reels', heroColor: 'from-green-800 to-black',
    tags: ['Motion', 'Animation'], image: '/images/hero-3d-banner.png', video: '/videos/melon-motion.mp4', disciplines: ['motion'], sortOrder: 4, published: true,
  });
  siteContent[locale].servicesSection.title = ar ? 'إمكانيات متكاملة لعلامتك' : 'A full-service approach';
  siteContent[locale].servicesSection.subtitle = ar ? 'الاستراتيجية والهوية والمحتوى والتقنية مع فريق إبداعي واحد.' : 'Strategy, identity, content, and technology, brought together by one creative team.';
  siteContent[locale].workSection.title = ar ? 'أعمال تحكي عنّا.' : 'Good work. Real brands.';
  siteContent[locale].workSection.subtitle = ar ? 'أفلام وهويات وحملات نصنعها مع عملائنا. شاهد ما نصنعه، وتعرف على قصصه.' : 'Films, identities, and campaigns made with our clients. Discover what we create together.';
}

siteContent.en.hero.badge = 'MARKETING MELON — EGYPT & SAUDI ARABIA';
siteContent.ar.hero.badge = 'ماركتنج ميلون — مصر والسعودية';
siteContent.ar.hero.tagline = 'من الفكرة إلى الصدارة';
siteContent.ar.hero.subtitle = 'وكالة متكاملة للإبداع والتسويق الرقمي. أفكار جديدة، تصميم مدروس، وأعمال تدفع علامتك إلى الأمام.';

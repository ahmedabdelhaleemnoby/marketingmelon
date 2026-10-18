import type { Locale, ServiceItem } from '@/types/content';

type Capability = { id: string; image: string; en: [string, string, string[]]; ar: [string, string, string[]] };
const capabilities: Capability[] = [
  { id: 'strategy-marketing', image: '/images/results/google-ads-1.png',
    en: ['Digital Marketing', 'A clear strategy connects your brand to the right people. We bring research, positioning, and campaign planning together around your business goals.', ['Market & audience research', 'Brand positioning', 'Campaign strategy', 'Channel planning & reporting']],
    ar: ['التسويق الرقمي', 'استراتيجية واضحة تصل بعلامتك إلى الجمهور المناسب. نجمع البحث وتحديد مكانة العلامة وتخطيط الحملات حول أهداف مشروعك.', ['دراسة السوق والجمهور', 'تحديد مكانة العلامة', 'استراتيجية الحملات', 'تخطيط القنوات وقياس الأداء']] },
  { id: 'brand-identity', image: '/images/work/al-eairy-national-day.png',
    en: ['Brand Identity', 'Give your brand a recognizable voice and visual world. From the first logo sketch to the way your identity lives across every touchpoint.', ['Logo & visual identity', 'Color & typography systems', 'Brand guidelines', 'Packaging & brand applications']],
    ar: ['الهوية البصرية', 'نمنح علامتك شخصية وصوتاً بصرياً واضحاً، من الفكرة الأولى للشعار إلى تطبيق الهوية على كل نقطة تواصل مع جمهورك.', ['تصميم الشعار والهوية', 'الألوان والخطوط', 'دليل استخدام الهوية', 'التغليف وتطبيقات العلامة']] },
  { id: 'social-media', image: '/images/work/trova-sharm.jpg',
    en: ['Social Media', 'Build a presence people want to follow. We plan, create, publish, and manage content that makes your brand part of the conversation.', ['Content strategy & calendars', 'Design & copywriting', 'Community management', 'Reels, stories & campaign content']],
    ar: ['السوشيال ميديا', 'نبني حضوراً يحب جمهورك متابعته. نخطط ونصمم وننشر وندير محتوى يضع علامتك في قلب الحوار.', ['استراتيجية وخطط المحتوى', 'التصميم وكتابة المحتوى', 'إدارة المجتمعات', 'الريلز والقصص والحملات']] },
  { id: 'web-development', image: '/slide.png',
    en: ['Web Development', 'Turn interest into action with a website that feels like your brand. Responsive experiences, online stores, and landing pages made for your customers.', ['Corporate websites', 'E-commerce stores', 'Landing pages', 'UI/UX & bilingual experiences']],
    ar: ['تطوير المواقع', 'نحوّل الاهتمام إلى خطوة فعلية بموقع يعبر عن علامتك. تجارب متجاوبة ومتاجر إلكترونية وصفحات هبوط مصممة لعملائك.', ['مواقع الشركات', 'المتاجر الإلكترونية', 'صفحات الهبوط', 'تجربة المستخدم والمواقع ثنائية اللغة']] },
  { id: 'production-motion', image: '/images/work/al-eairy-interior.jpg',
    en: ['Video Production', 'Stories worth watching, crafted from concept to final cut. Brand films, product reels, interviews, and ground and aerial filming.', ['Creative concepts & storyboards', 'Commercial films & reels', 'Ground & drone filming', 'Editing, color & sound']],
    ar: ['إنتاج الفيديو', 'قصص تستحق المشاهدة نصنعها من الفكرة إلى المونتاج النهائي. أفلام العلامات والريلز والمقابلات والتصوير الأرضي والجوي.', ['الأفكار والسيناريو', 'الأفلام الإعلانية والريلز', 'التصوير الأرضي والدرون', 'المونتاج والألوان والصوت']] },
  { id: 'photography', image: '/images/work/a26-restaurant.jpg',
    en: ['Photography', 'Make every detail count. Thoughtfully directed photography for products, food, hospitality, people, and the spaces behind your brand.', ['Product & food photography', 'Hospitality & interiors', 'Lifestyle & portraits', 'Art direction & retouching']],
    ar: ['التصوير الفوتوغرافي', 'كل تفصيلة تستحق الظهور. تصوير بإخراج مدروس للمنتجات والأطعمة والضيافة والأشخاص والأماكن التي تصنع هوية علامتك.', ['تصوير المنتجات والأطعمة', 'الضيافة والتصميم الداخلي', 'اللايف ستايل والبورتريه', 'الإخراج الفني ومعالجة الصور']] },
  { id: 'motion-graphics', image: '/images/hero-3d-banner.png',
    en: ['Motion Graphics', 'Bring ideas to life through movement. We combine illustration, animation, and visual effects to make complex stories easy to understand.', ['2D & 3D animation', 'Animated brand identities', 'Explainers & social animations', 'CGI, VFX & post-production']],
    ar: ['الموشن جرافيك', 'نمنح الأفكار حياة بالحركة. نجمع الرسم والتحريك والمؤثرات البصرية لعرض رسالتك بشكل واضح وجذاب.', ['تحريك ثنائي وثلاثي الأبعاد', 'تحريك الهوية والشعار', 'الفيديوهات التوضيحية والسوشيال', 'المؤثرات البصرية وما بعد الإنتاج']] },
  { id: 'events', image: '/images/work/football-production.jpg',
    en: ['Events & Coverage', 'Keep the energy of your event alive. Creative event branding, on-ground photo and video coverage, and highlights made to share.', ['Event visual identity', 'On-ground photography', 'Event filming & interviews', 'Highlights & social coverage']],
    ar: ['الفعاليات والتغطيات', 'نحافظ على روح فعاليتك حتى بعد انتهائها. هوية بصرية وتغطية ميدانية بالصور والفيديو وملخصات جاهزة للمشاركة.', ['الهوية البصرية للفعاليات', 'التصوير الفوتوغرافي الميداني', 'تصوير الفعاليات والمقابلات', 'الملخصات وتغطيات السوشيال']] },
  { id: 'seo', image: '/images/results/google-ads-3.png',
    en: ['SEO', 'Be found when customers search. We fix the technical foundations, shape content around real searches, and track every click that follows.', ['Technical SEO & site speed', 'Keyword & content strategy', 'Search Console & indexing', 'Analytics & reporting']],
    ar: ['تحسين محركات البحث (SEO)', 'اظهر عندما يبحث عملاؤك. نعالج الأساس التقني للموقع ونبني المحتوى حول عمليات البحث الحقيقية ونتابع كل نقرة.', ['السيو التقني وسرعة الموقع', 'الكلمات المفتاحية واستراتيجية المحتوى', 'سيرش كونسول والأرشفة', 'التحليلات والتقارير']] },
  { id: 'paid-ads', image: '/images/results/google-ads-2.png',
    en: ['Paid Advertising', 'Put your message in front of the people who matter. We plan, manage, and optimize campaigns across search and social platforms.', ['Google & YouTube ads', 'Meta, TikTok & Snapchat ads', 'Audience targeting & retargeting', 'Conversion tracking & optimization']],
    ar: ['الإعلانات الممولة', 'نصل برسالتك إلى الجمهور الأكثر اهتماماً. نخطط وندير ونحسن حملاتك عبر منصات البحث والتواصل الاجتماعي.', ['إعلانات جوجل ويوتيوب', 'إعلانات ميتا وتيك توك وسناب شات', 'الاستهداف وإعادة الاستهداف', 'تتبع التحويلات وتحسين الأداء']] },
];

export function getServices(locale: Locale): ServiceItem[] {
  return capabilities.map(({ id, image, ...translations }) => {
    const [title, description, scope] = translations[locale];
    return { id, title, image, shortDescription: description, fullDescription: description, scope, iconName: 'Compass', highlightTag: title, deliverables: { items: scope } };
  });
}

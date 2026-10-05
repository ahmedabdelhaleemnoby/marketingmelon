import type { Metadata } from 'next';
import { Outfit, Cairo } from 'next/font/google';
import '@/app/globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { Locale } from '@/types/content';
import { companyData } from '@/data/content';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-cairo',
});

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const rawLocale = (await params).locale;
  const locale: Locale = rawLocale === 'ar' ? 'ar' : 'en';
  const isArabic = locale === 'ar';

  const title = isArabic
    ? `${companyData.name} | وكالة تسويق رقمي، إنتاج مرئي وإعلانات ممولة`
    : `${companyData.name} | Creative Strategy, Production & Digital Growth`;

  const description = isArabic
    ? 'وكالة ماركتنج ميلون: ندمج بين الاستراتيجية الإبداعية والحملات المدعومة بالبيانات. إنتاج مرئي وتصوير درون، إعلانات ممولة، إدارة منصات التواصل، وتطوير الويب في مصر والمملكة العربية السعودية.'
    : 'Marketing Melon Agency: Combining creative strategy with data-informed campaigns. Ground & drone filming, social media management, paid ads, CGI motion graphics, and web development across Egypt & Saudi Arabia.';

  return {
    title,
    description,
    metadataBase: new URL('https://marketingmelon.online'),
    alternates: {
      canonical: `https://marketingmelon.online/${locale}`,
      languages: {
        en: 'https://marketingmelon.online/en',
        ar: 'https://marketingmelon.online/ar',
      },
    },
    openGraph: {
      title,
      description,
      url: `https://marketingmelon.online/${locale}`,
      siteName: companyData.name,
      locale: isArabic ? 'ar_EG' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    icons: {
      icon: [
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/icon.png', sizes: '64x64', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      shortcut: ['/favicon.ico'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const rawLocale = (await params).locale;
  const locale: Locale = rawLocale === 'ar' ? 'ar' : 'en';
  const isRTL = locale === 'ar';
  const fontClass = isRTL ? cairo.variable : outfit.variable;

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} className={fontClass}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`bg-[#FAF9F5] text-[#14171A] min-h-screen flex flex-col font-sans selection:bg-[#FF3B53] selection:text-white ${
          isRTL ? 'font-[family-name:var(--font-cairo)]' : 'font-[family-name:var(--font-outfit)]'
        }`}
      >
        {/* Skip to Main Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#FF3B53] focus:text-white focus:rounded-lg"
        >
          {isRTL ? 'تخطي إلى المحتوى الرئيسي' : 'Skip to main content'}
        </a>

        <JsonLd locale={locale} />
        <Navbar locale={locale} />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer locale={locale} />
      </body>
    </html>
  );
}

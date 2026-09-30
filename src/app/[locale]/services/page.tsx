import React from 'react';
import type { Metadata } from 'next';
import { siteContent, companyData } from '@/data/content';
import { Locale } from '@/types/content';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CtaBanner } from '@/components/home/CtaBanner';
import {
  Compass,
  Share2,
  TrendingUp,
  Video,
  Layout,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Info,
  PackageCheck,
} from 'lucide-react';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
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
    ? `خدماتنا | ${companyData.name}`
    : `Services & Capabilities | ${companyData.name}`;

  const description = isArabic
    ? 'استكشف خدمات وكالة ماركتنج ميلون: استراتيجيات التسويق الرقمي، إدارة السوشيال ميديا، الإعلانات الممولة، الإنتاج المرئي وتصوير الدرون، وتطوير الويب والتطبيقات.'
    : 'Comprehensive digital services: Strategy, Paid Advertising, Social Content, Ground & Drone Filming, Motion Graphics, CGI & Web Development.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://marketingmelon.online/${locale}/services`,
      languages: {
        en: 'https://marketingmelon.online/en/services',
        ar: 'https://marketingmelon.online/ar/services',
      },
    },
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const rawLocale = (await params).locale;
  const locale: Locale = rawLocale === 'ar' ? 'ar' : 'en';
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  const iconMap: Record<string, React.ReactNode> = {
    Compass: <Compass className="w-8 h-8 text-[#FF3B53]" />,
    Share2: <Share2 className="w-8 h-8 text-[#FF3B53]" />,
    TrendingUp: <TrendingUp className="w-8 h-8 text-[#FF3B53]" />,
    Video: <Video className="w-8 h-8 text-[#FF3B53]" />,
    Layout: <Layout className="w-8 h-8 text-[#FF3B53]" />,
  };

  return (
    <div className="pt-28 sm:pt-36 pb-16 bg-[#FAF9F5]">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <div className="max-w-3xl space-y-4">
          <Badge variant="coral" size="md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{content.servicesSection.eyebrow}</span>
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#14171A]">
            {content.servicesSection.title}
          </h1>
          <p className="text-base sm:text-lg text-[#586069] leading-relaxed">
            {content.servicesSection.subtitle}
          </p>
        </div>
      </section>

      {/* Services Detailed List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {content.services.map((service) => {
          return (
            <div
              key={service.id}
              id={service.id}
              className="scroll-mt-32 rounded-3xl bg-white border border-[#EBE8DE] p-8 sm:p-12 shadow-sm hover:border-[#FF3B53]/30 transition-all card-hover-glow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Header / Icon (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 rounded-2xl bg-[#FFF0F2] flex items-center justify-center shrink-0">
                      {iconMap[service.iconName] || <Compass className="w-8 h-8 text-[#FF3B53]" />}
                    </div>
                    <Badge variant="emerald" size="sm">
                      {service.highlightTag}
                    </Badge>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-[#14171A]">
                    {service.title}
                  </h2>

                  <p className="text-sm sm:text-base text-[#586069] leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div className="pt-2">
                    <Button
                      href={`/${locale}/contact?service=${encodeURIComponent(service.id)}`}
                      variant="primary"
                      size="md"
                      icon={
                        <ArrowUpRight
                          className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`}
                        />
                      }
                    >
                      {isRTL ? 'طلب عرض لهذه الخدمة' : 'Inquire About This Service'}
                    </Button>
                  </div>
                </div>

                {/* Right Scope & Deliverables Matrix (7 cols) */}
                <div className="lg:col-span-7 space-y-8 bg-[#FAF9F5] rounded-2xl p-6 sm:p-8 border border-[#EBE8DE]">
                  {/* Scope Checklist */}
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-[#14171A] uppercase tracking-wider">
                      {isRTL ? 'نطاق الخدمة والتنفيذ' : 'What We Cover in This Service'}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.scope.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                          <span className="text-[#3E454F] font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Typical Deliverables */}
                  <div className="pt-6 border-t border-[#EBE8DE] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-[#14171A] uppercase tracking-wider flex items-center gap-1.5">
                        <PackageCheck className="w-4 h-4 text-[#0F4C3A]" />
                        <span>{isRTL ? 'المخرجات والتسليمات' : 'Standard Deliverables'}</span>
                      </div>
                      {service.deliverables.isProposed && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          <Info className="w-3 h-3 text-amber-600" />
                          <span>{isRTL ? 'مقترح (قيد مراجعة المالك)' : 'Proposed framework'}</span>
                        </span>
                      )}
                    </div>

                    <ul className="space-y-2 text-xs sm:text-sm text-[#586069]">
                      {service.deliverables.items.map((deliv, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B53]" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <CtaBanner locale={locale} />
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { siteContent, companyData } from '@/data/content';
import { Locale } from '@/types/content';
import { Badge } from '@/components/ui/Badge';
import { PortfolioFilter } from '@/components/work/PortfolioFilter';
import { CtaBanner } from '@/components/home/CtaBanner';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface WorkPageProps {
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
    ? `أعمالنا والمشاريع المعتمدة | ${companyData.name}`
    : `Verified Client Showcases | ${companyData.name}`;

  const description = isArabic
    ? 'استعرض المشاريع والحملات الموثقة لوكالة ماركتنج ميلون في قطاعات الضيافة، العقارات، والإنتاج الإعلاني.'
    : 'Browse verified case studies and production showcases delivered by Marketing Melon Agency.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://marketingmelon.online/${locale}/work`,
      languages: {
        en: 'https://marketingmelon.online/en/work',
        ar: 'https://marketingmelon.online/ar/work',
      },
    },
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const rawLocale = (await params).locale;
  const locale: Locale = rawLocale === 'ar' ? 'ar' : 'en';
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  return (
    <div className="pt-28 sm:pt-36 pb-16 bg-[#FAF9F5]">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="max-w-3xl space-y-4">
          <Badge variant="coral" size="md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{content.workSection.eyebrow}</span>
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#14171A]">
            {content.workSection.title}
          </h1>
          <p className="text-base sm:text-lg text-[#586069] leading-relaxed">
            {content.workSection.subtitle}
          </p>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-[#0F4C3A]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            <span>
              {isRTL
                ? 'جميع الأعمال المعروضة حقيقية ومصرح بنشرها دون اختلاق أو تزييف'
                : 'All showcased records are verified client relationships without fabricated statistics'}
            </span>
          </div>
        </div>
      </section>

      {/* Filterable Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PortfolioFilter projects={content.projects} locale={locale} />
      </section>

      <CtaBanner locale={locale} />
    </div>
  );
}

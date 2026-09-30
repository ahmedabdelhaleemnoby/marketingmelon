import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { siteContent, companyData } from '@/data/content';
import { Locale } from '@/types/content';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CtaBanner } from '@/components/home/CtaBanner';
import {
  Video,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  Globe2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

interface AboutPageProps {
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
    ? `من نحن | ${companyData.name}`
    : `About Us | ${companyData.name}`;

  const description = isArabic
    ? 'تعرف على فلسفة وكالة ماركتنج ميلون: ندمج بين الاستراتيجية الإبداعية والحملات المدعومة بالبيانات في مصر والمملكة العربية السعودية.'
    : 'Discover Marketing Melon Agency: Combining creative strategy with data-informed campaigns across Cairo, Egypt and Saudi Arabia.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://marketingmelon.online/${locale}/about`,
      languages: {
        en: 'https://marketingmelon.online/en/about',
        ar: 'https://marketingmelon.online/ar/about',
      },
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const rawLocale = (await params).locale;
  const locale: Locale = rawLocale === 'ar' ? 'ar' : 'en';
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  return (
    <div className="pt-28 sm:pt-36 pb-16 bg-[#FAF9F5]">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <Badge variant="coral" size="md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{content.about.eyebrow}</span>
            </Badge>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#14171A] leading-[1.15]">
              {content.about.title}
            </h1>

            <p className="text-base sm:text-xl text-[#586069] leading-relaxed font-normal">
              {content.about.intro}
            </p>

            <div className="p-6 rounded-2xl bg-white border border-[#EBE8DE] shadow-xs space-y-3">
              <div className="text-xs font-bold text-[#FF3B53] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF3B53]" />
                <span>{isRTL ? 'فلسفة الشعار' : 'Tagline Philosophy'}</span>
              </div>
              <p className="text-sm text-[#14171A] leading-relaxed font-medium">
                {content.about.taglineMeaning}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-8 rounded-3xl bg-white border border-[#EBE8DE] shadow-xl text-center space-y-6 max-w-sm w-full card-hover-glow">
              <div className="relative w-full h-24 flex items-center justify-center">
                <Image
                  src="/images/logo-transparent.png"
                  alt="Marketing Melon Official Brand Logo"
                  width={280}
                  height={98}
                  priority
                  className="w-auto h-full object-contain"
                />
              </div>
              <div className="space-y-1">
                <div className="text-lg font-black text-[#14171A]">
                  Marketing Melon
                </div>
                <div className="text-xs text-[#586069]">
                  {companyData.positioning}
                </div>
              </div>
              <div className="pt-4 border-t border-[#EBE8DE] flex justify-center">
                <Badge variant="emerald" size="sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isRTL ? 'معتمد وموثق رسمياً' : 'Verified Company Info'}</span>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Principles Grid */}
      <section className="bg-white border-y border-[#EBE8DE] py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="emerald" size="md">
              {isRTL ? 'ركائز العمل' : 'Core Disciplines'}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14171A]">
              {content.about.pillarsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.about.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#FAF9F5] border border-[#EBE8DE] space-y-4 hover:border-[#0F4C3A]/40 transition-all card-hover-glow"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#EBF7F3] text-[#0F4C3A] flex items-center justify-center">
                  {idx === 0 && <ShieldCheck className="w-6 h-6 text-[#0F4C3A]" />}
                  {idx === 1 && <Video className="w-6 h-6 text-[#0F4C3A]" />}
                  {idx === 2 && <Globe2 className="w-6 h-6 text-[#0F4C3A]" />}
                </div>

                <h3 className="text-xl font-bold text-[#14171A]">
                  {pillar.title}
                </h3>

                <p className="text-sm text-[#586069] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Operational Presence */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <Badge variant="charcoal" size="md">
            {isRTL ? 'النطاق الجغرافي' : 'Regional Reach'}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#14171A]">
            {content.about.regionalPresence.title}
          </h2>
          <p className="text-sm text-[#586069]">
            {isRTL
              ? 'قنوات اتصال مباشرة وموثقة لخدمة عملائنا في مصر والمملكة العربية السعودية.'
              : 'Direct communication channels serving client partnerships across Egypt and Saudi Arabia.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Cairo Office Card */}
          <div className="p-8 rounded-3xl bg-white border border-[#EBE8DE] space-y-6 shadow-sm hover:border-[#10B981] transition-all card-hover-glow">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF7F3] text-[#0F4C3A] flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <Badge variant="emerald" size="sm">
                {content.about.regionalPresence.cairo.status}
              </Badge>
            </div>

            <div>
              <div className="text-xs font-bold text-[#8C959F] uppercase tracking-wider">
                {content.about.regionalPresence.cairo.country}
              </div>
              <h3 className="text-2xl font-black text-[#14171A] mt-1">
                {content.about.regionalPresence.cairo.city}
              </h3>
            </div>

            <div className="pt-4 border-t border-[#EBE8DE] flex items-center justify-between">
              <div className="font-mono text-base font-bold text-[#0F4C3A]">
                {companyData.phones.cairo.display}
              </div>
              <Button
                href={companyData.phones.cairo.whatsappUrl}
                isExternal
                variant="secondary"
                size="sm"
                icon={<ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />}
              >
                {content.cta.directChat}
              </Button>
            </div>
          </div>

          {/* Saudi Office Card */}
          <div className="p-8 rounded-3xl bg-white border border-[#EBE8DE] space-y-6 shadow-sm hover:border-[#10B981] transition-all card-hover-glow">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF7F3] text-[#0F4C3A] flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#0F4C3A]" />
              </div>
              <Badge variant="warning" size="sm">
                {isRTL ? 'مصدر بيهانس (قيد المراجعة)' : 'Source: Behance'}
              </Badge>
            </div>

            <div>
              <div className="text-xs font-bold text-[#8C959F] uppercase tracking-wider">
                {content.about.regionalPresence.saudi.country}
              </div>
              <h3 className="text-2xl font-black text-[#14171A] mt-1">
                {content.about.regionalPresence.saudi.city}
              </h3>
            </div>

            <div className="pt-4 border-t border-[#EBE8DE] flex items-center justify-between">
              <div className="font-mono text-base font-bold text-[#0F4C3A]">
                {companyData.phones.saudi.display}
              </div>
              <Button
                href={companyData.phones.saudi.whatsappUrl}
                isExternal
                variant="secondary"
                size="sm"
                icon={<ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />}
              >
                {content.cta.directChat}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner locale={locale} />
    </div>
  );
}

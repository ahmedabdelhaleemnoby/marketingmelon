'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { siteContent, companyData } from '@/data/content';
import { Locale } from '@/types/content';
import { ArrowUpRight, Sparkles, CheckCircle2, Video, TrendingUp, Layers } from 'lucide-react';

interface HeroProps {
  locale: Locale;
}

export const Hero: React.FC<HeroProps> = ({ locale }) => {
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  return (
    <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#FAF9F5] via-[#FAF9F5] to-[#F3EFE6]">
      {/* Background Watermelon Grid & Ambient Glows */}
      <div className="absolute inset-0 melon-grid-pattern pointer-events-none" />
      <div className="absolute top-20 -right-20 w-80 h-80 sm:w-96 sm:h-96 bg-[#FF3B53]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-60 -left-20 w-80 h-80 sm:w-96 sm:h-96 bg-[#0F4C3A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
            {/* Verified Badge */}
            <div className="inline-flex items-center justify-center lg:justify-start">
              <Badge variant="coral" size="md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{content.hero.badge}</span>
              </Badge>
            </div>

            {/* Tagline Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#14171A] leading-[1.1]">
              {isRTL ? (
                <>
                  اعصر <span className="text-[#FF3B53]">الأفضل</span>،
                  <br />
                  وتفوّق على البقية.
                </>
              ) : (
                <>
                  Squeeze the <span className="text-[#FF3B53]">best</span>,
                  <br />
                  beat the rest.
                </>
              )}
            </h1>

            {/* Original Supporting Copy */}
            <p className="text-base sm:text-lg lg:text-xl text-[#586069] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {content.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Button
                href={`/${locale}/contact`}
                variant="primary"
                size="lg"
                icon={
                  <ArrowUpRight
                    className={`w-5 h-5 ${isRTL ? 'rotate-[-90deg]' : ''}`}
                  />
                }
                className="w-full sm:w-auto"
              >
                {content.hero.ctaPrimary}
              </Button>

              <Button
                href={`/${locale}/work`}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white/80"
              >
                {content.hero.ctaSecondary}
              </Button>
            </div>

            {/* Verified Operational Facts Ribbon */}
            <div className="pt-8 border-t border-[#EBE8DE] grid grid-cols-3 gap-4 text-start">
              {content.hero.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-lg sm:text-2xl font-extrabold text-[#0F4C3A]">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-[#586069] leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual Card / Interactive Emblem (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Central Premium Slate Card */}
              <div className="relative rounded-3xl bg-white border border-[#EBE8DE] p-8 sm:p-10 shadow-xl overflow-hidden card-hover-glow">
                {/* Background decorative tint */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFF0F2] rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#EBF7F3] rounded-full blur-2xl pointer-events-none" />

                {/* Centerpiece Official Logo Showcase */}
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative w-64 sm:w-72 h-24 sm:h-28 flex items-center justify-center p-2">
                    <Image
                      src="/images/logo-transparent.png"
                      alt="Marketing Melon Official Brand Logo"
                      width={320}
                      height={112}
                      priority
                      className="w-full h-auto object-contain drop-shadow-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF9F5] border border-[#EBE8DE] text-xs font-bold text-[#14171A]">
                      <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                      <span>{companyData.name}</span>
                    </div>
                    <p className="text-xs text-[#586069] leading-relaxed max-w-xs mx-auto">
                      {isRTL
                        ? 'إنتاج مرئي، إعلانات مدفوعة، وإدارة محتوى بالمعايير الإقليمية'
                        : 'Creative Direction, Ground & Drone Filming, Performance Ads & Web Engineering'}
                    </p>
                  </div>
                </div>

                {/* Floating Micro-Pill Highlights */}
                <div className="mt-6 pt-6 border-t border-[#EBE8DE] flex flex-wrap gap-2 justify-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EBF7F3] text-[#0F4C3A] text-xs font-semibold">
                    <Video className="w-3.5 h-3.5" />
                    <span>{isRTL ? 'تصوير أرضي وجوي' : 'Ground & Drone Filming'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFF0F2] text-[#FF3B53] text-xs font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>{isRTL ? 'إعلانات ممولة' : 'Paid Media'}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FAF9F5] text-[#14171A] text-xs font-semibold border border-[#EBE8DE]">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isRTL ? 'موشن جرافيكس & CGI' : 'Motion & CGI'}</span>
                  </span>
                </div>
              </div>

              {/* Verified Trust Stamp */}
              <div
                className={`absolute -bottom-4 ${
                  isRTL ? '-right-4' : '-left-4'
                } bg-[#0F4C3A] text-white px-3.5 py-2 rounded-2xl shadow-lg border border-[#1A6A53] flex items-center gap-2 text-xs font-bold`}
              >
                <CheckCircle2 className="w-4 h-4 text-[#80ED99]" />
                <span>{isRTL ? 'سجلات معتمدة وموثقة' : 'Verified Public Agency'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { siteContent, companyData } from '@/data/content';
import { Locale } from '@/types/content';
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Video,
  TrendingUp,
  Layers,
  Zap,
} from 'lucide-react';

interface HeroProps {
  locale: Locale;
}

export const Hero: React.FC<HeroProps> = ({ locale }) => {
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#FAF9F5] via-[#FAF8F0] to-[#F1ECE1]">
      {/* 3D Background Grid & Ambient Glows */}
      <div className="absolute inset-0 melon-grid-pattern pointer-events-none" />
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#FF3B53]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-0 w-96 h-96 bg-[#1E6B27]/12 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Copy (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-start">
            {/* 3D Isometric Badge */}
            <div className="inline-flex items-center justify-center lg:justify-start">
              <Badge variant="coral" size="md" className="badge-3d shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{content.hero.badge}</span>
              </Badge>
            </div>

            {/* Tagline Heading with 3D Watermelon Slice Accent */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#14171A] leading-[1.1] drop-shadow-xs">
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

            {/* CTA Buttons with 3D Bevel Shadows */}
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
                className="w-full sm:w-auto shadow-md hover:shadow-lg hover:shadow-[#FF3B53]/30"
              >
                {content.hero.ctaPrimary}
              </Button>

              <Button
                href={`/${locale}/work`}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white/90 shadow-2xs hover:shadow-md"
              >
                {content.hero.ctaSecondary}
              </Button>
            </div>

            {/* 3D Operational Stats Ribbon */}
            <div className="pt-8 border-t border-[#EBE8DE] grid grid-cols-3 gap-4 text-start">
              {content.hero.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white/70 border border-[#EBE8DE] shadow-2xs space-y-1 hover:border-[#1E6B27]/40 transition-colors"
                >
                  <div className="text-lg sm:text-2xl font-black text-[#1E6B27]">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-[#586069] leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Hero Visual Stage with 3D Banner & Mascots (6 cols) */}
          <div className="lg:col-span-6 flex justify-center perspective-1000">
            <div className="relative w-full max-w-lg preserve-3d">
              {/* 3D Stage Card */}
              <div className="relative rounded-3xl bg-white/90 backdrop-blur-md border border-[#EBE8DE] p-4 sm:p-6 shadow-2xl overflow-hidden card-3d">
                {/* 3D Ambient Specular Lights */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#FF3B53]/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#1E6B27]/20 rounded-full blur-2xl pointer-events-none" />

                {/* Hero 3D Banner Artwork */}
                <div className="relative w-full rounded-2xl overflow-hidden shadow-md border border-[#EBE8DE] bg-[#FAF8EF]">
                  <Image
                    src="/images/hero-3d-banner.png"
                    alt="Marketing Melon Agency 3D Mascots and Slogan"
                    width={1024}
                    height={449}
                    priority
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* 3D Floating Feature Chips */}
                <div className="mt-5 pt-4 border-t border-[#EBE8DE] flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF7F3] text-[#1E6B27] border border-[#1E6B27]/20 shadow-2xs">
                    <Video className="w-3.5 h-3.5 text-[#1E6B27]" />
                    <span>{isRTL ? 'تصوير أرضي وجوي' : 'Ground & Drone Filming'}</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF0F2] text-[#FF3B53] border border-[#FF3B53]/20 shadow-2xs">
                    <TrendingUp className="w-3.5 h-3.5 text-[#FF3B53]" />
                    <span>{isRTL ? 'إعلانات ممولة' : 'Performance Media'}</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF9F5] text-[#14171A] border border-[#EBE8DE] shadow-2xs">
                    <Layers className="w-3.5 h-3.5 text-[#FF3B53]" />
                    <span>{isRTL ? 'موشن & 3D CGI' : '3D CGI & VFX'}</span>
                  </div>
                </div>
              </div>

              {/* 3D Floating Mascot Highlight Badge */}
              <div
                className={`absolute -bottom-5 ${
                  isRTL ? '-right-5' : '-left-5'
                } z-20 bg-[#1E6B27] text-white px-4 py-2.5 rounded-2xl shadow-xl border border-[#2EA03E] flex items-center gap-2.5 text-xs font-bold card-3d-floating`}
              >
                <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#80ED99]" />
                </div>
                <div>
                  <div className="text-[10px] text-[#80ED99] uppercase tracking-wider">
                    {companyData.name}
                  </div>
                  <div>{isRTL ? 'إبداع ثلاثي الأبعاد معتمد' : '3D Creative & Growth'}</div>
                </div>
              </div>

              {/* 3D Verified Client Seal */}
              <div
                className={`absolute -top-4 ${
                  isRTL ? '-left-4' : '-right-4'
                } z-20 bg-white text-[#14171A] px-3 py-1.5 rounded-xl shadow-lg border border-[#EBE8DE] flex items-center gap-1.5 text-xs font-bold`}
              >
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>{isRTL ? 'سجلات موثقة' : 'Verified Agency'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

'use client';

import React from 'react';
import Image from 'next/image';
import { Locale } from '@/types/content';
import { Target, Compass } from 'lucide-react';

interface VisionMissionSectionProps {
  locale: Locale;
}

export const VisionMissionSection: React.FC<VisionMissionSectionProps> = ({ locale }) => {
  const isRTL = locale === 'ar';

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Vision & Mission Badges & Statements */}
          <div className="lg:col-span-6 space-y-12">
            {/* Our Vision */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black text-white font-bold text-sm shadow-sm">
                <Target className="w-4 h-4 text-[#FF3B53]" />
                <span>{isRTL ? 'رؤيتنا — Our Vision' : 'Our Vision'}</span>
              </div>
              <p className="text-lg sm:text-xl text-[#3E454F] leading-relaxed font-medium">
                {isRTL
                  ? 'أن نكون الشريك الاستراتيجي الأول للعلامات التجارية الطموحة في مصر والمملكة العربية السعودية، ممكّنين إياها من تصدر أسواقها وترك أثر بصري وتجاري مستدام.'
                  : 'To become the leading full-spectrum digital partner that empowers ambitious brands with measurable business growth and an unforgettable market presence.'}
              </p>
            </div>

            {/* Our Mission */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-black text-white font-bold text-sm shadow-sm">
                <Compass className="w-4 h-4 text-[#80ED99]" />
                <span>{isRTL ? 'رسالتنا — Our Mission' : 'Our Mission'}</span>
              </div>
              <p className="text-lg sm:text-xl text-[#3E454F] leading-relaxed font-medium">
                {isRTL
                  ? 'دمج الإبداع الجريء بالتسويق المبني على البيانات والإنتاج السينمائي المتطور، لاستخلاص أقصى طاقات العلامة التجارية وتحويل الميزانيات إلى نتائج حقيقية ملموسة.'
                  : 'Empowering businesses through bold creative marketing, ground & aerial cinematography, precision media distribution, and bespoke web engineering.'}
              </p>
            </div>
          </div>

          {/* Right Column: Creative Agency Leader / Director Visual */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#EBE8DE] bg-gradient-to-br from-neutral-100 to-neutral-200">
              <div className="relative w-full h-[380px] sm:h-[460px]">
                <Image
                  src="/images/hero-3d-banner.png"
                  alt="Marketing Melon Agency Vision & Creative Direction"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Floating Agency Emblem Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white font-black text-xs">
                      MM
                    </div>
                    <div>
                      <div className="text-xs font-bold text-black">Marketing Melon Agency</div>
                      <div className="text-[11px] text-[#586069]">
                        {isRTL ? 'مصر والمملكة العربية السعودية' : 'Egypt & Saudi Arabia'}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-mono font-bold text-[#1E6B27]">
                    2026 Vision
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

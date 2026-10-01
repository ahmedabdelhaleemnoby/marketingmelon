'use client';

import React from 'react';
import { Locale } from '@/types/content';

interface MilestonesProps {
  locale: Locale;
}

export const MilestonesSection: React.FC<MilestonesProps> = ({ locale }) => {
  const isRTL = locale === 'ar';

  const stats = [
    {
      value: '251+',
      label: isRTL ? 'عميل وشريك نجاح' : 'Clients & Partners',
    },
    {
      value: '1M+',
      label: isRTL ? 'وصول وتفاعل إعلاني' : 'Campaign Reach & Impact',
    },
    {
      value: '398+',
      label: isRTL ? 'عمل إبداعي وحملة' : 'Creative Works Produced',
    },
    {
      value: '12+',
      label: isRTL ? 'ركيزة إبداعية وتقنية' : 'Core Disciplines',
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-[#0A1128] text-white">
      {/* Rich Atmospheric Glows and Vertical Beams (ROAR Style) */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070D1F] via-[#0D1B3E] to-[#1E0B1B] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-72 h-full bg-blue-500/15 blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-10 w-96 h-full bg-[#FF3B53]/15 blur-3xl pointer-events-none" />
      
      {/* Vertical light beam accents */}
      <div className="absolute inset-0 flex justify-around opacity-20 pointer-events-none">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-indigo-400 to-transparent" />
        <div className="w-px h-full bg-gradient-to-b from-transparent via-rose-500 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {isRTL ? 'إنجازاتنا وأرقامنا' : 'Our Milestones'}
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
              {isRTL
                ? 'منذ انطلاقتنا وحتى اليوم، نحن ملتزمون بتقديم نتائج حقيقية تعزز أعمال عملائنا. نفخر بصناعة تأثير ملموس ودفع عجلة النمو المستمر من خلال التميز الإبداعي.'
                : "Since our inception until today, we are committed to delivering results that elevate our clients' businesses. We pride ourselves in creating powerful impact and driving continuous growth through creative excellence."}
            </p>
          </div>

          {/* Right Column: 2x2 Big Numbers Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-8 sm:gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2 border-s border-white/10 ps-6">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-sm">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-neutral-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

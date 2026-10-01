'use client';

import React from 'react';
import Link from 'next/link';
import { Locale } from '@/types/content';
import { ArrowUpRight } from 'lucide-react';

interface ServicesPreviewProps {
  locale: Locale;
}

export const ServicesPreview: React.FC<ServicesPreviewProps> = ({ locale }) => {
  const isRTL = locale === 'ar';

  const cards = [
    {
      id: 'digital-marketing',
      title: isRTL ? 'التسويق الرقمي' : 'Digital Marketing',
      description: isRTL
        ? 'حملات موجهة بالبيانات لتعزيز التفاعل وجذب العملاء وتحقيق أعلى عائد استثماري.'
        : 'Data-driven campaigns that boost engagement, convert prospects, and maximize ROI.',
      href: `/${locale}/services#paid-ads`,
      glowBg: 'from-[#3A1C28] via-[#2A1520] to-[#14171A]',
      accentGlow: 'bg-gradient-to-tr from-[#FF6B6B]/40 via-[#FF8E53]/30 to-transparent',
    },
    {
      id: 'brand-identity',
      title: isRTL ? 'الهوية البصرية' : 'Brand Identity',
      description: isRTL
        ? 'بناء هويات بصرية استثنائية وعميقة تترك انطباعاً دائماً لدى جمهورك المستهدف.'
        : 'Crafting distinctive, memorable brand identities that resonate deeply with your audience.',
      href: `/${locale}/services#strategy-marketing`,
      glowBg: 'from-[#381822] via-[#241219] to-[#14171A]',
      accentGlow: 'bg-gradient-to-bl from-[#FF3B53]/40 via-[#9A1F40]/30 to-transparent',
    },
    {
      id: 'social-media',
      title: isRTL ? 'إدارة التواصل' : 'Social Media',
      description: isRTL
        ? 'سرد قصصي إبداعي وإدارة مجتمعات متكاملة ومحتوى يخطف الأنظار عبر كافة المنصات.'
        : 'Creative storytelling and active community management across all major platforms.',
      href: `/${locale}/services#social-media`,
      glowBg: 'from-[#1A263E] via-[#121A2C] to-[#14171A]',
      accentGlow: 'bg-gradient-to-tr from-[#FF3B53]/35 via-[#3B82F6]/35 to-transparent',
    },
    {
      id: 'web-development',
      title: isRTL ? 'تطوير الويب' : 'Web Development',
      description: isRTL
        ? 'مواقع رقمية فائقة السرعة وتطبيقات مخصصة تقدم تجربة مستخدم استثنائية.'
        : 'High-performance, bespoke web platforms engineered for seamless digital growth.',
      href: `/${locale}/services#web-development`,
      glowBg: 'from-[#151D3B] via-[#0E1428] to-[#14171A]',
      accentGlow: 'bg-gradient-to-br from-[#3B82F6]/40 via-[#8B5CF6]/30 to-[#06B6D4]/30',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Bold Headline & Context Copy */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#14171A] leading-[1.12]">
              {isRTL ? (
                <>
                  تمكين العلامات التجارية
                  <br />
                  من خلال <span className="text-[#FF3B53]">حلول مبتكرة</span>
                  <br />
                  وعصرية
                </>
              ) : (
                <>
                  Empowering
                  <br />
                  brands through
                  <br />
                  <span className="text-[#FF3B53]">innovative and</span>
                  <br />
                  modern solutions
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-[#586069] leading-relaxed font-normal">
              {isRTL
                ? 'نحوّل الأفكار إلى واقع ملموس ونرتقي بعلامتك التجارية إلى المستوى التالي من خلال التصميم الاستراتيجي، الهوية البصرية، والإنتاج المرئي والتسويق الرقمي.'
                : 'We shape ideas into reality and elevate your brand to the next level through strategic design, branding, high-impact media production, and digital marketing.'}
            </p>

            <div className="pt-2">
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#14171A] hover:text-[#FF3B53] transition-colors group"
              >
                <span>{isRTL ? 'استعرض كافة الخدمات' : 'Explore all capabilities'}</span>
                <ArrowUpRight className={`w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${isRTL ? 'rotate-[-90deg]' : ''}`} />
              </Link>
            </div>
          </div>

          {/* Right Column: 2x2 Mesh Gradient Glow Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {cards.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className={`group relative rounded-3xl p-7 sm:p-8 bg-gradient-to-b ${card.glowBg} text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[220px] border border-white/10`}
              >
                {/* Mesh Atmosphere Glow Overlay */}
                <div
                  className={`absolute inset-0 ${card.accentGlow} opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none`}
                />

                <div className="relative z-10 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-[#FFF] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal opacity-90 group-hover:opacity-100 transition-opacity">
                    {card.description}
                  </p>
                </div>

                <div className="relative z-10 pt-6 flex items-center justify-end">
                  <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center transition-all duration-200">
                    <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

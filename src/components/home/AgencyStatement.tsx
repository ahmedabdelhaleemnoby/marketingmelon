import React from 'react';
import Image from 'next/image';
import { siteContent } from '@/data/content';
import { Locale } from '@/types/content';
import { Sparkles, Shield, Compass, Video } from 'lucide-react';

interface AgencyStatementProps {
  locale: Locale;
}

export const AgencyStatement: React.FC<AgencyStatementProps> = ({ locale }) => {
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  return (
    <section className="py-20 sm:py-28 bg-[#14171A] text-white relative overflow-hidden perspective-1000">
      {/* 3D Ambient Neon Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF3B53]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#1E6B27]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Main Statement Copy (8 cols) */}
          <div className="lg:col-span-8 space-y-6 text-center lg:text-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#FF3B53] tracking-wide uppercase badge-3d">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isRTL ? 'فلسفة الوكالة والإبداع ثلاثي الأبعاد' : 'Agency Ethos & 3D Craft'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {content.statement.heading}
            </h2>

            <p className="text-base sm:text-lg text-[#B0B8C1] leading-relaxed font-normal max-w-2xl mx-auto lg:mx-0">
              {content.statement.body}
            </p>
          </div>

          {/* 3D Floating Mascot Element (4 cols) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="relative p-6 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-xl shadow-2xl card-3d mascot-3d-pulse text-center">
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                <Image
                  src="/images/mascots-3d-transparent.png"
                  alt="Marketing Melon 3D Watermelon Ninja Mascots"
                  width={240}
                  height={240}
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
              </div>
              <div className="mt-3 text-xs font-bold text-[#80ED99] uppercase tracking-wider">
                {isRTL ? 'شخصيات ميلون ثلاثية الأبعاد' : '3D Melon Ninja Characters'}
              </div>
            </div>
          </div>
        </div>

        {/* 3D Isometric Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#FF3B53]/50 transition-all card-3d shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#FF3B53]/20 text-[#FF3B53] flex items-center justify-center mb-5 shadow-inner">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {isRTL ? 'استراتيجية مدفوعة بالبيانات' : 'Data-Informed Strategy'}
            </h3>
            <p className="text-xs sm:text-sm text-[#8C959F] leading-relaxed">
              {isRTL
                ? 'قرارات تسويقية تستند لأبحاث السوق واحتياجات الجمهور الفعلي دون تخمين.'
                : 'Every creative decision is anchored in actual regional market demand and measurable metrics.'}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#80ED99]/50 transition-all card-3d shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#1E6B27]/40 text-[#80ED99] flex items-center justify-center mb-5 shadow-inner">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {isRTL ? 'شفافية ومصداقية كاملة' : 'Transparent Execution'}
            </h3>
            <p className="text-xs sm:text-sm text-[#8C959F] leading-relaxed">
              {isRTL
                ? 'نقدم تقارير واضحة وأداءً حقيقياً يركز على نمو علامتك التجارية.'
                : 'No inflated vanity numbers or unverifiable promises — only verified output and honest reporting.'}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#FF3B53]/50 transition-all card-3d shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#FF3B53]/20 text-[#FF3B53] flex items-center justify-center mb-5 shadow-inner">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {isRTL ? 'إنتاج بصري متفوق' : 'High-Impact Production'}
            </h3>
            <p className="text-xs sm:text-sm text-[#8C959F] leading-relaxed">
              {isRTL
                ? 'تصوير أرضي وجوي (درون) مع موشن جرافيكس وهندسة ويب فائقة الدقة.'
                : 'Full in-house execution spanning ground & drone cinematography to 3D CGI and custom code.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

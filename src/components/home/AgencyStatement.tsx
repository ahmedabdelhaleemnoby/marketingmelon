import React from 'react';
import { siteContent } from '@/data/content';
import { Locale } from '@/types/content';
import { Sparkles, Shield, Compass } from 'lucide-react';

interface AgencyStatementProps {
  locale: Locale;
}

export const AgencyStatement: React.FC<AgencyStatementProps> = ({ locale }) => {
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  return (
    <section className="py-20 sm:py-28 bg-[#14171A] text-white relative overflow-hidden">
      {/* Subtle ambient gradient highlights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF3B53]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0F4C3A]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-[#FF3B53] tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRTL ? 'فلسفة الوكالة' : 'Agency Ethos'}</span>
          </div>

          {/* Statement Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {content.statement.heading}
          </h2>

          {/* Body */}
          <p className="text-base sm:text-xl text-[#B0B8C1] leading-relaxed font-normal max-w-3xl mx-auto">
            {content.statement.body}
          </p>

          {/* 3 Value Pillars */}
          <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF3B53]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FF3B53]/20 text-[#FF3B53] flex items-center justify-center mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {isRTL ? 'استراتيجية مدفوعة بالبيانات' : 'Data-Informed Strategy'}
              </h3>
              <p className="text-xs sm:text-sm text-[#8C959F] leading-relaxed">
                {isRTL
                  ? 'قرارات تسويقية تستند لأبحاث السوق واحتياجات الجمهور الفعلي دون تخمين.'
                  : 'Every creative decision is anchored in actual regional market demand and measurable metrics.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#80ED99]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#0F4C3A]/60 text-[#80ED99] flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {isRTL ? 'شفافية ومصداقية كاملة' : 'Transparent Execution'}
              </h3>
              <p className="text-xs sm:text-sm text-[#8C959F] leading-relaxed">
                {isRTL
                  ? 'نقدم تقارير واضحة وأداءً حقيقياً يركز على نمو علامتك التجارية.'
                  : 'No inflated vanity numbers or unverifiable promises — only verified output and honest reporting.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF3B53]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#FF3B53]/20 text-[#FF3B53] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
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
      </div>
    </section>
  );
};

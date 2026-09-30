import React from 'react';
import { siteContent } from '@/data/content';
import { Locale } from '@/types/content';
import { Badge } from '@/components/ui/Badge';
import { Info, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

interface ProcessSectionProps {
  locale: Locale;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ locale }) => {
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5] relative overflow-hidden perspective-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <Badge variant="charcoal" size="md" className="badge-3d">
            <Sparkles className="w-3.5 h-3.5 text-[#FF3B53]" />
            <span>{content.process.eyebrow}</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14171A]">
            {content.process.title}
          </h2>
          <p className="text-sm sm:text-base text-[#586069] leading-relaxed">
            {content.process.subtitle}
          </p>

          {/* Explicit Owner Review Flag Notice */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold badge-3d">
            <Info className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{content.process.notice}</span>
          </div>
        </div>

        {/* 5-Step Process Timeline 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 lg:gap-6 relative">
          {content.process.steps.map((step, index) => {
            const isLast = index === content.process.steps.length - 1;

            return (
              <div
                key={step.stepNumber}
                className="relative rounded-3xl bg-white border border-[#EBE8DE] p-6 sm:p-7 flex flex-col justify-between card-3d shadow-md hover:border-[#FF3B53]/50 transition-all"
              >
                <div>
                  {/* Step Number with 3D Bevel Pill */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="w-11 h-11 rounded-2xl bg-[#FFF0F2] border border-[#FF3B53]/20 flex items-center justify-center text-xl font-black text-[#FF3B53] font-mono shadow-inner">
                      {step.stepNumber}
                    </span>
                    {!isLast && (
                      <span className="hidden md:inline-block text-[#D6D2C4]">
                        {isRTL ? (
                          <ArrowLeft className="w-4 h-4" />
                        ) : (
                          <ArrowRight className="w-4 h-4" />
                        )}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[#14171A] mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#586069] leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Deliverable Badge */}
                <div className="pt-4 border-t border-[#EBE8DE]">
                  <div className="text-[10px] font-bold text-[#8C959F] uppercase tracking-wider mb-1">
                    {isRTL ? 'المخرج المقترح' : 'Proposed Output'}
                  </div>
                  <div className="text-xs font-semibold text-[#1E6B27]">
                    {step.deliverable}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

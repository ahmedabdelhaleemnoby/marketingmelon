import React from 'react';
import { siteContent, companyData } from '@/data/content';
import { Locale } from '@/types/content';
import { Button } from '@/components/ui/Button';
import { WatermelonMotif } from '@/components/ui/WatermelonMotif';
import { ArrowUpRight, MessageSquare, Mail } from 'lucide-react';

interface CtaBannerProps {
  locale: Locale;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ locale }) => {
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0F4C3A] via-[#0D382B] to-[#07261D] text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl">
          {/* Ambient Glows & Background Watermark */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF3B53]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#10B981]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content (8 cols) */}
            <div className="lg:col-span-8 space-y-5 text-center lg:text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-[#80ED99]">
                <span className="w-2 h-2 rounded-full bg-[#FF3B53]" />
                <span>{companyData.tagline}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                {isRTL ? (
                  <>
                    جاهز لتعظيم حضور علامتك <br className="hidden sm:inline" />
                    وتحقيق نتائج استثنائية؟
                  </>
                ) : (
                  <>
                    Ready to elevate your brand <br className="hidden sm:inline" />
                    with high-impact creative strategy?
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base text-[#C7DBD4] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {isRTL
                  ? 'تواصل معنا مباشرة عبر استمارة المشروع، أو عبر واتساب لمكتبي القاهرة والمملكة.'
                  : 'Start a direct dialogue with our strategy and production teams for verified execution.'}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
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
                  {content.cta.talk}
                </Button>

                <Button
                  href={companyData.phones.cairo.whatsappUrl}
                  isExternal
                  variant="white"
                  size="lg"
                  icon={<MessageSquare className="w-5 h-5 text-[#10B981]" />}
                  className="w-full sm:w-auto"
                >
                  {content.cta.directChat}
                </Button>
              </div>
            </div>

            {/* Right Decorative Graphic (4 cols) */}
            <div className="lg:col-span-4 flex justify-center">
              <WatermelonMotif size="lg" className="transform scale-110" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

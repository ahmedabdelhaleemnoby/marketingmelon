import React from 'react';
import Image from 'next/image';
import { siteContent, companyData } from '@/data/content';
import { Locale } from '@/types/content';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight, MessageSquare, Sparkles } from 'lucide-react';

interface CtaBannerProps {
  locale: Locale;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ locale }) => {
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F5] relative perspective-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#1E6B27] via-[#124B1B] to-[#0A2E10] text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl card-3d">
          {/* 3D Ambient Glows & Background Watermark */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF3B53]/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#80ED99]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#80ED99] badge-3d">
                <Sparkles className="w-3.5 h-3.5 text-[#FF3B53]" />
                <span>{companyData.tagline}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white drop-shadow-md">
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
                  className="w-full sm:w-auto shadow-lg hover:shadow-xl hover:shadow-[#FF3B53]/40"
                >
                  {content.cta.talk}
                </Button>

                <Button
                  href={companyData.phones.cairo.whatsappUrl}
                  isExternal
                  variant="white"
                  size="lg"
                  icon={<MessageSquare className="w-5 h-5 text-[#1E6B27]" />}
                  className="w-full sm:w-auto shadow-md hover:shadow-lg"
                >
                  {content.cta.directChat}
                </Button>
              </div>
            </div>

            {/* Right 3D Mascots Showcase (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-80 h-64 sm:h-80 flex items-center justify-center mascot-3d-pulse">
                <Image
                  src="/images/mascots-3d-transparent.png"
                  alt="Marketing Melon 3D Mascots"
                  width={340}
                  height={340}
                  className="w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

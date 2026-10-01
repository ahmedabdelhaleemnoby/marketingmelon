'use client';

import React from 'react';
import { Locale } from '@/types/content';
import { companyData } from '@/data/content';
import { Phone, ArrowUpRight, MapPin } from 'lucide-react';

interface OfficeCardsProps {
  locale: Locale;
  className?: string;
  showBgImage?: boolean;
}

export const OfficeCards: React.FC<OfficeCardsProps> = ({
  locale,
  className = '',
  showBgImage = false,
}) => {
  const isRTL = locale === 'ar';

  return (
    <section
      className={`py-16 sm:py-24 relative overflow-hidden ${
        showBgImage
          ? 'bg-[#FAF8F5]'
          : 'bg-transparent'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Saudi Arabia Office Card */}
          <div className="group rounded-3xl bg-white/95 backdrop-blur-md border border-[#EBE8DE] p-8 sm:p-10 shadow-sm hover:shadow-xl hover:border-black/20 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Top Glow Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF3B53]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FF3B53]/10 transition-colors" />

            <div>
              {/* Office Icon (ROAR styled chair/office icon) */}
              <div className="w-12 h-12 rounded-2xl bg-[#F5F4F0] text-[#14171A] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                  <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5Z" />
                  <path d="M6 18v2" />
                  <path d="M18 18v2" />
                  <path d="M12 18v4" />
                </svg>
              </div>

              {/* Office Title */}
              <h3 className="text-2xl sm:text-3xl font-black text-[#14171A] tracking-tight">
                {isRTL ? 'مكتب المملكة العربية السعودية' : 'Saudi Arabia Office'}
              </h3>

              {/* Address */}
              <div className="flex items-center gap-2 mt-3 text-base sm:text-lg text-[#586069] font-medium">
                <MapPin className="w-4 h-4 text-[#FF3B53] shrink-0" />
                <span>{isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</span>
              </div>

              {/* Phone Numbers */}
              <div className="mt-4 space-y-2 font-mono">
                <a
                  href="tel:+9660547851570"
                  className="block text-base sm:text-lg font-bold text-[#14171A] hover:text-[#FF3B53] transition-colors"
                  dir="ltr"
                >
                  +966 054 785 1570
                </a>
                <a
                  href="tel:+966509251351"
                  className="block text-base sm:text-lg font-bold text-[#14171A] hover:text-[#FF3B53] transition-colors"
                  dir="ltr"
                >
                  +966 50 925 1351
                </a>
              </div>
            </div>

            {/* CTA Button (ROAR Pill Black Style) */}
            <div className="mt-8 pt-6 border-t border-[#F0ECE1] flex items-center gap-3">
              <a
                href={companyData.phones.saudi.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-black text-white font-semibold text-sm hover:bg-neutral-800 active:scale-95 transition-all shadow-sm"
              >
                <span>{isRTL ? 'تواصل معنا' : 'Contact us'}</span>
                <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
              </a>

              <a
                href="tel:+9660547851570"
                className="inline-flex items-center justify-center p-3 rounded-full bg-[#F5F4F0] text-[#14171A] hover:bg-[#EBE8DE] transition-colors"
                aria-label="Call Saudi Office"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Egypt Office Card */}
          <div className="group rounded-3xl bg-white/95 backdrop-blur-md border border-[#EBE8DE] p-8 sm:p-10 shadow-sm hover:shadow-xl hover:border-black/20 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            {/* Top Glow Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E6B27]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#1E6B27]/10 transition-colors" />

            <div>
              {/* Office Icon (ROAR styled chair/office icon) */}
              <div className="w-12 h-12 rounded-2xl bg-[#F5F4F0] text-[#14171A] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                  <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5Z" />
                  <path d="M6 18v2" />
                  <path d="M18 18v2" />
                  <path d="M12 18v4" />
                </svg>
              </div>

              {/* Office Title */}
              <h3 className="text-2xl sm:text-3xl font-black text-[#14171A] tracking-tight">
                {isRTL ? 'مكتب جمهورية مصر العربية' : 'Egypt Office'}
              </h3>

              {/* Address */}
              <div className="flex items-center gap-2 mt-3 text-base sm:text-lg text-[#586069] font-medium">
                <MapPin className="w-4 h-4 text-[#1E6B27] shrink-0" />
                <span>{isRTL ? 'حدائق الأهرام، الجيزة' : 'Hadayek al-ahram , Giza'}</span>
              </div>

              {/* Phone Number */}
              <div className="mt-4 space-y-2 font-mono">
                <a
                  href="tel:+201150117387"
                  className="block text-base sm:text-lg font-bold text-[#14171A] hover:text-[#1E6B27] transition-colors"
                  dir="ltr"
                >
                  01150117387
                </a>
                <div className="text-xs text-[#8C959F] font-sans font-medium">
                  {isRTL ? 'متاح للاتصال والواتساب' : 'Direct Call & WhatsApp Available'}
                </div>
              </div>
            </div>

            {/* CTA Button (ROAR Pill Black Style) */}
            <div className="mt-8 pt-6 border-t border-[#F0ECE1] flex items-center gap-3">
              <a
                href={companyData.phones.cairo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-black text-white font-semibold text-sm hover:bg-neutral-800 active:scale-95 transition-all shadow-sm"
              >
                <span>{isRTL ? 'تواصل معنا' : 'Contact us'}</span>
                <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
              </a>

              <a
                href="tel:+201150117387"
                className="inline-flex items-center justify-center p-3 rounded-full bg-[#F5F4F0] text-[#14171A] hover:bg-[#EBE8DE] transition-colors"
                aria-label="Call Egypt Office"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

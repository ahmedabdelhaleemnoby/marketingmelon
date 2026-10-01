'use client';

import React from 'react';
import { Locale } from '@/types/content';

interface PartnersQuoteProps {
  locale: Locale;
}

export const PartnersQuote: React.FC<PartnersQuoteProps> = ({ locale }) => {
  const isRTL = locale === 'ar';

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-[#EBE8DE] text-center relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#78828A] leading-relaxed tracking-tight">
          {isRTL ? (
            <>
              كل مشروع يعكس <span className="text-[#14171A]">الابتكار والتميز</span>،
              مع عملائنا كشركاء في مسيرة النجاح.
            </>
          ) : (
            <>
              Every project reflects <span className="text-[#14171A]">innovation and excellence</span>,
              with our clients as partners in success.
            </>
          )}
        </p>
      </div>
    </section>
  );
};

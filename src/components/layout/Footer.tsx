'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { companyData, siteContent } from '@/data/content';
import { Locale } from '@/types/content';
import { Mail, Phone, MapPin, ArrowUpRight, Lock, Heart } from 'lucide-react';
import {
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
  BehanceIcon,
  TikTokIcon,
} from '@/components/ui/SocialIcons';

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const pathname = usePathname();
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  if (pathname?.includes('/admin')) {
    return null;
  }

  return (
    <footer className="bg-black text-white relative overflow-hidden border-t border-neutral-900">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF3B53]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1E6B27]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main ROAR Style Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        {/* Massive Bold Callout & Socials (ROAR Style) */}
        <div className="space-y-8 max-w-4xl">
          {/* Main Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
            {isRTL ? (
              <>لا تنتظر — لنجعل علامتك التجارية تتصدر وتتألق</>
            ) : (
              <>Don&apos;t wait — Let&apos;s make your brand shine</>
            )}
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            {isRTL
              ? 'ابق على اتصال وتابعنا على منصات التواصل الاجتماعي لمعرفة أحدث التحديثات والأعمال.'
              : 'Stay connected and follow us on social media for the latest updates and case studies.'}
          </p>

          {/* Support Email */}
          <div className="pt-2">
            <a
              href={`mailto:${companyData.emails.primary}`}
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-white hover:text-[#FF3B53] transition-colors inline-flex items-center gap-3 group"
            >
              <span>{companyData.emails.primary}</span>
              <ArrowUpRight className="w-6 h-6 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          </div>

          {/* Circular Social Pill Badges Row (ROAR Style: TikTok, Behance, LinkedIn, Instagram, Facebook) */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <a
              href={companyData.socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white text-black hover:bg-[#FF3B53] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-5 h-5" />
            </a>

            <a
              href={companyData.socialLinks.behance}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white text-black hover:bg-[#FF3B53] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
              aria-label="Behance"
            >
              <BehanceIcon className="w-5 h-5" />
            </a>

            <a
              href={companyData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white text-black hover:bg-[#FF3B53] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
              aria-label="LinkedIn"
            >
              <LinkedInIcon className="w-5 h-5" />
            </a>

            <a
              href={companyData.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white text-black hover:bg-[#FF3B53] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>

            <a
              href={companyData.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white text-black hover:bg-[#FF3B53] hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 shadow-md"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Regional Offices Quick Bar in Footer */}
        <div className="mt-16 pt-12 border-t border-neutral-800/80 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Saudi Arabia Office Info */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              {isRTL ? 'مكتب المملكة العربية السعودية' : 'Saudi Arabia Office'}
            </div>
            <div className="text-sm font-semibold text-white">
              {isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
            </div>
            <div className="font-mono text-xs text-neutral-300 space-y-1" dir="ltr">
              <div>+966 054 785 1570</div>
              <div>+966 50 925 1351</div>
            </div>
          </div>

          {/* Egypt Office Info */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              {isRTL ? 'مكتب جمهورية مصر العربية' : 'Egypt Office'}
            </div>
            <div className="text-sm font-semibold text-white">
              {isRTL ? 'حدائق الأهرام، الجيزة' : 'Hadayek al-ahram , Giza'}
            </div>
            <div className="font-mono text-xs text-neutral-300" dir="ltr">
              01150117387
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              {content.footer.quickLinks}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-neutral-300">
              {content.nav.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Brand Vision */}
          <div className="space-y-2">
            <Logo locale={locale} variant="dark" />
            <p className="text-xs text-neutral-400 leading-relaxed">
              {companyData.tagline}
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Credit */}
        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            {new Date().getFullYear()} © {companyData.name}. {content.footer.rights}
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-[#FF3B53] fill-current" />
              <span>by Marketing Melon</span>
            </span>

            <Link
              href={`/${locale}/admin`}
              className="inline-flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-300 px-2 py-1 rounded bg-neutral-900 border border-neutral-800"
            >
              <Lock className="w-3 h-3 text-[#FF3B53]" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

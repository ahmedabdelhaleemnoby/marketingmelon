import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { companyData, siteContent } from '@/data/content';
import { Locale } from '@/types/content';
import {
  Mail,
  Phone,
  MessageSquare,
  ArrowUpRight,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import {
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
  BehanceIcon,
} from '@/components/ui/SocialIcons';

interface FooterProps {
  locale: Locale;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  return (
    <footer className="bg-[#0B1E19] text-white border-t border-[#143D32] relative overflow-hidden">
      {/* Decorative ambient background melon lights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF3B53]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F4C3A]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#1A453A]">
          {/* Brand Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Logo locale={locale} variant="dark" />
            <p className="text-sm sm:text-base text-[#B0C4BE] max-w-md leading-relaxed">
              {content.footer.description}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#13382F] border border-[#215749] text-xs font-semibold text-[#80ED99]">
              <span className="w-2 h-2 rounded-full bg-[#FF3B53] animate-pulse" />
              <span>“{companyData.tagline}”</span>
            </div>

            {/* Social Channels */}
            <div className="pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#79998F] mb-3">
                {isRTL ? 'قنواتنا الرسمية' : 'Verified Social Profiles'}
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href={companyData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#143D32] border border-[#235C4C] flex items-center justify-center text-[#B0C4BE] hover:text-white hover:bg-[#FF3B53] hover:border-[#FF3B53] transition-all"
                  aria-label="Marketing Melon LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a
                  href={companyData.socialLinks.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#143D32] border border-[#235C4C] flex items-center justify-center text-[#B0C4BE] hover:text-white hover:bg-[#FF3B53] hover:border-[#FF3B53] transition-all"
                  aria-label="Marketing Melon Behance"
                >
                  <BehanceIcon className="w-4 h-4" />
                </a>
                <a
                  href={companyData.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#143D32] border border-[#235C4C] flex items-center justify-center text-[#B0C4BE] hover:text-white hover:bg-[#FF3B53] hover:border-[#FF3B53] transition-all"
                  aria-label="Marketing Melon Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={companyData.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-[#143D32] border border-[#235C4C] flex items-center justify-center text-[#B0C4BE] hover:text-white hover:bg-[#FF3B53] hover:border-[#FF3B53] transition-all"
                  aria-label="Marketing Melon Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {content.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {content.nav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#B0C4BE] hover:text-[#FF3B53] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight
                      className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${
                        isRTL ? 'rotate-[-90deg]' : ''
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {content.footer.servicesTitle}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#B0C4BE]">
              {content.services.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/${locale}/services#${s.id}`}
                    className="hover:text-[#FF3B53] transition-colors line-clamp-1"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Regional Inquiries (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {content.footer.contactTitle}
            </h3>

            {/* Emails */}
            <div className="space-y-2 text-xs">
              <a
                href={`mailto:${companyData.emails.primary}`}
                className="flex items-center gap-2 text-[#B0C4BE] hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#FF3B53] shrink-0" />
                <span>{companyData.emails.primary}</span>
              </a>
              <a
                href={`mailto:${companyData.emails.secondary}`}
                className="flex items-center gap-2 text-[#8CA59E] hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#8CA59E] shrink-0" />
                <span>{companyData.emails.secondary}</span>
              </a>
            </div>

            {/* Cairo Phone */}
            <div className="pt-2 border-t border-[#1A453A]/60">
              <div className="text-[11px] font-semibold text-[#80ED99] uppercase tracking-wider mb-1">
                {isRTL ? 'القاهرة، مصر' : 'Cairo, Egypt'}
              </div>
              <a
                href={companyData.phones.cairo.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-white hover:text-[#80ED99] font-mono"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#10B981]" />
                <span dir="ltr">{companyData.phones.cairo.display}</span>
              </a>
            </div>

            {/* Saudi Phone */}
            <div className="pt-2 border-t border-[#1A453A]/60">
              <div className="text-[11px] font-semibold text-[#80ED99] uppercase tracking-wider mb-1">
                {isRTL ? 'المملكة العربية السعودية' : 'Saudi Arabia'}
              </div>
              <a
                href={companyData.phones.saudi.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-white hover:text-[#80ED99] font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-[#10B981]" />
                <span dir="ltr">{companyData.phones.saudi.display}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Verified Fact Seal, and Admin Entry */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#79998F]">
          <div className="flex items-center gap-2 text-center sm:text-start">
            <ShieldCheck className="w-4 h-4 text-[#80ED99] shrink-0" />
            <span>{content.footer.disclaimer}</span>
          </div>

          <div className="flex items-center gap-4 text-center sm:text-end">
            <span>© {new Date().getFullYear()} {companyData.name}. {content.footer.rights}</span>
            <Link
              href={`/${locale}/admin`}
              className="inline-flex items-center gap-1 text-[11px] text-[#79998F] hover:text-white px-2 py-1 rounded bg-[#13382F] border border-[#215749]"
              title="Admin Control Panel"
            >
              <Lock className="w-3 h-3 text-[#FF3B53]" />
              <span>CMS Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

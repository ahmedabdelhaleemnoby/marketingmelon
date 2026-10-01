import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { siteContent, companyData } from '@/data/content';
import { Locale } from '@/types/content';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ContactForm } from '@/components/contact/ContactForm';
import {
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  Loader2,
} from 'lucide-react';
import {
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
  BehanceIcon,
  TikTokIcon,
} from '@/components/ui/SocialIcons';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const rawLocale = (await params).locale;
  const locale: Locale = rawLocale === 'ar' ? 'ar' : 'en';
  const isArabic = locale === 'ar';

  const title = isArabic
    ? `تواصل معنا | ${companyData.name}`
    : `Contact & Project Inquiries | ${companyData.name}`;

  const description = isArabic
    ? 'تواصل مع وكالة ماركتنج ميلون لمناقشة حملتك القادمة، خدمات الإنتاج المرئي، الإعلانات الممولة أو تطوير المواقع في مصر والسعودية.'
    : 'Get in touch with Marketing Melon Agency for project inquiries, video production, paid advertising, and digital growth campaigns.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://marketingmelon.online/${locale}/contact`,
      languages: {
        en: 'https://marketingmelon.online/en/contact',
        ar: 'https://marketingmelon.online/ar/contact',
      },
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const rawLocale = (await params).locale;
  const locale: Locale = rawLocale === 'ar' ? 'ar' : 'en';
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  return (
    <div className="pt-28 sm:pt-36 pb-20 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <Badge variant="coral" size="md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{content.contactPage.eyebrow}</span>
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#14171A]">
            {content.contactPage.title}
          </h1>

          <p className="text-base sm:text-lg text-[#586069] leading-relaxed">
            {content.contactPage.subtitle}
          </p>
        </div>

        {/* Contact Grid: Interactive Form (7 cols) + Direct Channels (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Form Column */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="p-12 rounded-3xl bg-white border border-[#EBE8DE] flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-[#FF3B53]" />
                </div>
              }
            >
              <ContactForm locale={locale} />
            </Suspense>
          </div>

          {/* Direct Communication Channels Column */}
          <div className="lg:col-span-5 space-y-6">
            {/* Saudi Arabia Office Card (ROAR Style) */}
            <div className="rounded-3xl bg-white border border-[#EBE8DE] p-6 sm:p-8 shadow-sm space-y-4 hover:border-black/30 transition-all card-hover-glow">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#F5F4F0] text-black flex items-center justify-center">
                  <Phone className="w-5 h-5 text-black" />
                </div>
                <Badge variant="emerald" size="sm">
                  {isRTL ? 'مكتب السعودية (الرياض)' : 'Saudi Office (Riyadh)'}
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#14171A]">
                  {isRTL ? 'مكتب المملكة العربية السعودية' : 'Saudi Arabia Office'}
                </h3>
                <p className="text-xs text-[#586069] mt-1 font-medium">
                  {isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                </p>
              </div>

              <div className="pt-2 border-t border-[#EBE8DE] space-y-2 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#14171A]">+966 054 785 1570</span>
                  <a
                    href={companyData.phones.saudi.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-sans font-bold px-3 py-1 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors"
                  >
                    <span>{isRTL ? 'واتساب' : 'WhatsApp'}</span>
                    <ArrowUpRight className={`w-3 h-3 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#14171A]">+966 50 925 1351</span>
                  <a
                    href={companyData.phones.saudi.secondaryWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-sans font-bold px-3 py-1 rounded-full bg-[#F5F4F0] text-black hover:bg-black hover:text-white transition-colors"
                  >
                    <span>{isRTL ? 'واتساب ٢' : 'WhatsApp 2'}</span>
                    <ArrowUpRight className={`w-3 h-3 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                  </a>
                </div>
              </div>
            </div>

            {/* Egypt Office Card (ROAR Style) */}
            <div className="rounded-3xl bg-white border border-[#EBE8DE] p-6 sm:p-8 shadow-sm space-y-4 hover:border-black/30 transition-all card-hover-glow">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-[#F5F4F0] text-black flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-black" />
                </div>
                <Badge variant="emerald" size="sm">
                  {isRTL ? 'مكتب مصر (حدائق الأهرام)' : 'Egypt Office (Giza)'}
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#14171A]">
                  {isRTL ? 'مكتب جمهورية مصر العربية' : 'Egypt Office'}
                </h3>
                <p className="text-xs text-[#586069] mt-1 font-medium">
                  {isRTL ? 'حدائق الأهرام، الجيزة' : 'Hadayek al-ahram , Giza'}
                </p>
              </div>

              <div className="pt-2 border-t border-[#EBE8DE] flex items-center justify-between gap-3">
                <div className="font-mono text-sm font-bold text-[#14171A]">
                  01150117387
                </div>
                <a
                  href={companyData.phones.cairo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-sans font-bold px-3.5 py-1.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors"
                >
                  <span>{isRTL ? 'واتساب مصر' : 'WhatsApp Egypt'}</span>
                  <ArrowUpRight className={`w-3 h-3 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                </a>
              </div>
            </div>

            {/* Direct Official Emails Box */}
            <div className="rounded-3xl bg-white border border-[#EBE8DE] p-6 sm:p-8 shadow-sm space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF3B53] flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                <span>{isRTL ? 'البريد الإلكتروني الرسمي' : 'Official Email Inquiries'}</span>
              </div>

              <div className="space-y-2">
                <a
                  href={`mailto:${companyData.emails.primary}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9F5] border border-[#EBE8DE] text-xs font-semibold text-[#14171A] hover:bg-[#FFF0F2] hover:text-[#FF3B53] transition-colors"
                >
                  <span>{companyData.emails.primary}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </a>

                <a
                  href={`mailto:${companyData.emails.secondary}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9F5] border border-[#EBE8DE] text-xs font-semibold text-[#586069] hover:bg-[#FFF0F2] hover:text-[#FF3B53] transition-colors"
                >
                  <span>{companyData.emails.secondary}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </a>
              </div>
            </div>

            {/* Verified Social Presence Box */}
            <div className="rounded-3xl bg-[#14171A] text-white p-6 sm:p-8 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#8C959F]">
                  {isRTL ? 'المنصات الرسمية' : 'Verified Social Portfolios'}
                </span>
                <span className="text-xs text-[#80ED99] font-bold">100% Verified</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <a
                  href={companyData.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-[#FF3B53] hover:border-[#FF3B53] transition-colors text-xs font-semibold"
                >
                  <TikTokIcon className="w-4 h-4" />
                  <span>TikTok</span>
                </a>

                <a
                  href={companyData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-[#FF3B53] hover:border-[#FF3B53] transition-colors text-xs font-semibold"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={companyData.socialLinks.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-[#FF3B53] hover:border-[#FF3B53] transition-colors text-xs font-semibold"
                >
                  <BehanceIcon className="w-4 h-4" />
                  <span>Behance</span>
                </a>

                <a
                  href={companyData.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-[#FF3B53] hover:border-[#FF3B53] transition-colors text-xs font-semibold"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <span>Instagram</span>
                </a>

                <a
                  href={companyData.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-[#FF3B53] hover:border-[#FF3B53] transition-colors text-xs font-semibold"
                >
                  <FacebookIcon className="w-4 h-4" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { siteContent, companyData } from '@/data/content';
import { Locale } from '@/types/content';
import { X, ArrowUpRight, Phone, MessageSquare, MapPin } from 'lucide-react';
import {
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
  BehanceIcon,
  TikTokIcon,
} from '@/components/ui/SocialIcons';

interface NavbarProps {
  locale: Locale;
}

export const Navbar: React.FC<NavbarProps> = ({ locale }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const content = siteContent[locale];

  const isRTL = locale === 'ar';
  const otherLocale: Locale = locale === 'en' ? 'ar' : 'en';

  // Compute equivalent path in other locale
  const getSwitchLocalePath = (targetLocale: Locale) => {
    if (!pathname) return `/${targetLocale}`;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return `/${targetLocale}`;
    segments[0] = targetLocale;
    return `/${segments.join('/')}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [drawerOpen]);

  if (pathname?.includes('/admin')) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs py-3.5'
            : 'bg-[#FAF9F5]/90 backdrop-blur-xs py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo (Left) */}
            <Logo locale={locale} />

            {/* Desktop Center Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#EBE8DE] shadow-2xs"
              aria-label="Main Navigation"
            >
              {content.nav.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== `/${locale}` && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-black text-white shadow-2xs'
                        : 'text-[#586069] hover:text-black hover:bg-[#FAF9F5]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Circular Lang Toggle & Sleek Hamburger Trigger (ROAR Style) */}
            <div className="flex items-center gap-3">
              {/* Circular Language Switcher (ROAR Style: ع or EN) */}
              <Link
                href={getSwitchLocalePath(otherLocale)}
                className="w-10 h-10 rounded-full bg-[#F5F4F0] border border-[#EBE8DE] text-black hover:bg-black hover:text-white flex items-center justify-center font-bold text-sm transition-all duration-200 shadow-2xs active:scale-95"
                aria-label={`Switch to ${otherLocale === 'ar' ? 'Arabic' : 'English'}`}
              >
                <span>{locale === 'en' ? 'ع' : 'EN'}</span>
              </Link>

              {/* Desktop Direct CTA Button (Black Pill) */}
              <Link
                href={`/${locale}/contact`}
                className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white font-semibold text-sm hover:bg-neutral-800 active:scale-95 transition-all shadow-2xs"
              >
                <span>{content.cta.talk}</span>
                <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
              </Link>

              {/* Minimalist 2-line Hamburger Trigger (ROAR Style) */}
              <button
                type="button"
                onClick={() => setDrawerOpen(!drawerOpen)}
                className="w-10 h-10 rounded-full bg-[#F5F4F0] border border-[#EBE8DE] text-black hover:bg-black hover:text-white flex flex-col items-center justify-center gap-1.5 transition-all duration-200 shadow-2xs group cursor-pointer"
                aria-expanded={drawerOpen}
                aria-label={drawerOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              >
                {drawerOpen ? (
                  <X className="w-5 h-5 group-hover:text-white" />
                ) : (
                  <>
                    <span className="w-4 h-0.5 bg-black rounded-full group-hover:bg-white transition-colors" />
                    <span className="w-4 h-0.5 bg-black rounded-full group-hover:bg-white transition-colors" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen / Slide-Out Modern Navigation Drawer (ROAR Style) */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-all duration-300"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            className={`fixed top-0 ${
              isRTL ? 'left-0' : 'right-0'
            } w-full sm:w-[460px] h-full bg-[#FAF9F5] shadow-2xl p-6 sm:p-8 flex flex-col justify-between border-s border-[#EBE8DE] overflow-y-auto z-50`}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Top Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#EBE8DE]">
                <Logo locale={locale} />
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="w-10 h-10 rounded-full bg-white border border-[#EBE8DE] text-black hover:bg-black hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Close Navigation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-8 flex flex-col gap-2.5" aria-label="Drawer Navigation">
                {content.nav.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== `/${locale}` && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-lg font-bold transition-all ${
                        isActive
                          ? 'bg-black text-white shadow-md'
                          : 'bg-white border border-[#EBE8DE] text-black hover:bg-black hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight
                        className={`w-5 h-5 opacity-70 ${isRTL ? 'rotate-[-90deg]' : ''}`}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Regional Offices Quick Contact */}
              <div className="mt-8 pt-6 border-t border-[#EBE8DE] space-y-3">
                <div className="text-xs font-bold text-[#8C959F] uppercase tracking-wider">
                  {isRTL ? 'المكاتب الإقليمية' : 'Regional Offices'}
                </div>

                {/* Saudi Arabia Office */}
                <div className="p-4 rounded-2xl bg-white border border-[#EBE8DE] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-black">
                      {isRTL ? 'مكتب السعودية (الرياض)' : 'Saudi Arabia Office (Riyadh)'}
                    </span>
                    <span className="text-[10px] font-bold text-[#1E6B27] bg-[#EBF7F3] px-2 py-0.5 rounded-full">
                      KSA
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#586069]">
                    <MapPin className="w-3.5 h-3.5 text-[#FF3B53]" />
                    <span>{isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</span>
                  </div>
                  <div className="pt-1 flex flex-wrap items-center gap-2 font-mono text-xs font-bold text-black" dir="ltr">
                    <a href="tel:+9660547851570" className="hover:text-[#FF3B53] underline">
                      +966 054 785 1570
                    </a>
                    <span>•</span>
                    <a href="tel:+966509251351" className="hover:text-[#FF3B53] underline">
                      +966 50 925 1351
                    </a>
                  </div>
                </div>

                {/* Egypt Office */}
                <div className="p-4 rounded-2xl bg-white border border-[#EBE8DE] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-black">
                      {isRTL ? 'مكتب مصر (حدائق الأهرام)' : 'Egypt Office (Giza)'}
                    </span>
                    <span className="text-[10px] font-bold text-[#1E6B27] bg-[#EBF7F3] px-2 py-0.5 rounded-full">
                      EGY
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#586069]">
                    <MapPin className="w-3.5 h-3.5 text-[#1E6B27]" />
                    <span>{isRTL ? 'حدائق الأهرام، الجيزة' : 'Hadayek al-ahram , Giza'}</span>
                  </div>
                  <div className="pt-1 font-mono text-xs font-bold text-black" dir="ltr">
                    <a href="tel:+201150117387" className="hover:text-[#1E6B27] underline">
                      01150117387
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions & Social Row */}
            <div className="pt-6 border-t border-[#EBE8DE] space-y-4">
              <Link
                href={`/${locale}/contact`}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-black text-white font-bold text-sm hover:bg-neutral-800 transition-all shadow-md"
              >
                <span>{content.cta.talk}</span>
                <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
              </Link>

              {/* Social Icons Row in Drawer */}
              <div className="flex items-center justify-center gap-2">
                <a
                  href={companyData.socialLinks.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-[#EBE8DE] flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>
                <a
                  href={companyData.socialLinks.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-[#EBE8DE] flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
                  aria-label="Behance"
                >
                  <BehanceIcon className="w-4 h-4" />
                </a>
                <a
                  href={companyData.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-[#EBE8DE] flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
                <a
                  href={companyData.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-[#EBE8DE] flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href={companyData.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white border border-[#EBE8DE] flex items-center justify-center text-black hover:bg-black hover:text-white transition-all"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { siteContent, companyData } from '@/data/content';
import { Locale } from '@/types/content';
import { Menu, X, Globe, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';

interface NavbarProps {
  locale: Locale;
}

export const Navbar: React.FC<NavbarProps> = ({ locale }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Close mobile menu when pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'nav-glass shadow-xs py-3'
            : 'bg-[#FAF9F5]/90 backdrop-blur-xs py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Logo locale={locale} />

            {/* Desktop Navigation Links */}
            <nav
              className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#EBE8DE] shadow-2xs"
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
                    className={`px-3.5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-[#14171A] text-white shadow-2xs'
                        : 'text-[#586069] hover:text-[#14171A] hover:bg-[#FAF9F5]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons & Language Switcher */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language Switcher */}
              <Link
                href={getSwitchLocalePath(otherLocale)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg border border-[#EBE8DE] bg-white text-[#14171A] hover:bg-[#FFF0F2] hover:border-[#FF3B53]/30 hover:text-[#FF3B53] transition-colors"
                aria-label={`Switch to ${otherLocale === 'ar' ? 'Arabic' : 'English'}`}
              >
                <Globe className="w-3.5 h-3.5 text-[#FF3B53]" />
                <span>{locale === 'en' ? 'العربية' : 'English'}</span>
              </Link>

              {/* Primary Contact CTA */}
              <Button
                href={`/${locale}/contact`}
                variant="primary"
                size="sm"
                icon={<ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />}
              >
                {content.cta.talk}
              </Button>
            </div>

            {/* Mobile Menu Trigger & Language Button */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                href={getSwitchLocalePath(otherLocale)}
                className="px-2.5 py-1.5 text-xs font-bold rounded-lg border border-[#EBE8DE] bg-white text-[#14171A]"
                aria-label="Toggle language"
              >
                {locale === 'en' ? 'عربي' : 'EN'}
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white border border-[#EBE8DE] text-[#14171A] hover:bg-[#FAF9F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B53]"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#FF3B53]" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className={`fixed top-0 ${
              isRTL ? 'left-0' : 'right-0'
            } w-5/6 max-w-sm h-full bg-[#FAF9F5] shadow-2xl p-6 flex flex-col justify-between border-s border-[#EBE8DE] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#EBE8DE]">
                <Logo locale={locale} />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white border border-[#EBE8DE] text-[#586069]"
                  aria-label="Close Navigation Drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col gap-2" aria-label="Mobile Navigation">
                {content.nav.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== `/${locale}` && pathname.startsWith(item.href));

                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                        isActive
                          ? 'bg-[#FF3B53] text-white shadow-xs'
                          : 'bg-white border border-[#EBE8DE] text-[#14171A] hover:bg-[#FFF0F2]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight
                        className={`w-4 h-4 opacity-70 ${isRTL ? 'rotate-[-90deg]' : ''}`}
                      />
                    </Link>
                  );
                })}
              </nav>

              {/* Direct Quick WhatsApp Inquiries */}
              <div className="mt-8 pt-6 border-t border-[#EBE8DE] space-y-3">
                <div className="text-xs font-bold text-[#8C959F] uppercase tracking-wider">
                  {isRTL ? 'تواصل مباشر عبر واتساب' : 'Direct WhatsApp'}
                </div>
                <a
                  href={companyData.phones.cairo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#EBE8DE] hover:border-[#10B981] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#EBF7F3] text-[#0F4C3A] flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#14171A]">
                      {isRTL ? 'فرع القاهرة (مصر)' : 'Cairo Office (Egypt)'}
                    </div>
                    <div className="text-xs text-[#0F4C3A] font-mono">
                      {companyData.phones.cairo.display}
                    </div>
                  </div>
                </a>

                <a
                  href={companyData.phones.saudi.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white border border-[#EBE8DE] hover:border-[#10B981] transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#EBF7F3] text-[#0F4C3A] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#14171A]">
                      {isRTL ? 'فرع المملكة العربية السعودية' : 'Saudi Arabia Line'}
                    </div>
                    <div className="text-xs text-[#0F4C3A] font-mono">
                      {companyData.phones.saudi.display}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Bottom Drawer Actions */}
            <div className="pt-6 border-t border-[#EBE8DE] space-y-3">
              <Button
                href={`/${locale}/contact`}
                variant="primary"
                size="md"
                className="w-full justify-center"
              >
                {content.cta.talk}
              </Button>

              <Link
                href={getSwitchLocalePath(otherLocale)}
                className="w-full flex items-center justify-center gap-2 p-2.5 text-xs font-bold rounded-xl border border-[#EBE8DE] bg-white text-[#14171A]"
              >
                <Globe className="w-4 h-4 text-[#FF3B53]" />
                <span>{locale === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

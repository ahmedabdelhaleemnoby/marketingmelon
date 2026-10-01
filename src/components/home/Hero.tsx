'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/types/content';
import { companyData } from '@/data/content';
import {
  ArrowDown,
  ArrowUpRight,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Eye,
  CheckCircle2,
  Video,
  TrendingUp,
  Layers,
} from 'lucide-react';
import {
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
  BehanceIcon,
  TikTokIcon,
} from '@/components/ui/SocialIcons';

interface HeroProps {
  locale: Locale;
}

export const Hero: React.FC<HeroProps> = ({ locale }) => {
  const isRTL = locale === 'ar';

  // 3D Parallax Mouse Tracking
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [active3DMode, setActive3DMode] = useState<'mascots' | 'banner'>('mascots');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Calculate rotation limits (-10deg to +10deg)
    setRotateX(-(y / (rect.height / 2)) * 8);
    setRotateY((x / (rect.width / 2)) * 8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight * 0.85,
      behavior: 'smooth',
    });
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <section className="relative min-h-[92vh] pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#FAF9F5] via-[#FAF8F2] to-[#F3EFE6] flex flex-col justify-between">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF3B53]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-[#1E6B27]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 melon-grid-pattern pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Content (Left 6-7 cols - ROAR Layout) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-start">
            {/* Social Icons Row (ROAR Style: TikTok, Behance, LinkedIn, Instagram, Facebook) */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5">
              <a
                href={companyData.socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-[#EBE8DE] shadow-2xs flex items-center justify-center text-black hover:bg-black hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>

              <a
                href={companyData.socialLinks.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-[#EBE8DE] shadow-2xs flex items-center justify-center text-black hover:bg-black hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="Behance"
              >
                <BehanceIcon className="w-4 h-4" />
              </a>

              <a
                href={companyData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-[#EBE8DE] shadow-2xs flex items-center justify-center text-black hover:bg-black hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>

              <a
                href={companyData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-[#EBE8DE] shadow-2xs flex items-center justify-center text-black hover:bg-black hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>

              <a
                href={companyData.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white border border-[#EBE8DE] shadow-2xs flex items-center justify-center text-black hover:bg-black hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Massive Bold Headline (ROAR Style Typography) */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#14171A] leading-[1.02] uppercase drop-shadow-xs">
                {isRTL ? (
                  <>
                    من الفكرة
                    <br />
                    إلى <span className="text-[#FF3B53]">الصدارة</span>
                  </>
                ) : (
                  <>
                    FROM SPARK
                    <br />
                    TO <span className="text-[#FF3B53]">SQUEEZE</span>
                  </>
                )}
              </h1>

              {/* Tagline Subtitle (ROAR Subtitle Style) */}
              <p className="text-lg sm:text-xl lg:text-2xl text-[#586069] font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {isRTL
                  ? 'وكالة متكاملة للتسويق الرقمي والإنتاج الإبداعي.'
                  : 'A full service digital marketing & creative agency.'}
              </p>
            </div>

            {/* CTA Button (ROAR Pill Black Style: "Request service") */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href={`/${locale}/contact`}
                className="w-full sm:w-auto px-9 py-4 rounded-full bg-black text-white font-bold text-base sm:text-lg hover:bg-neutral-800 active:scale-95 transition-all duration-200 shadow-md hover:shadow-xl inline-flex items-center justify-center gap-3"
              >
                <span>{isRTL ? 'طلب خدمة' : 'Request service'}</span>
                <ArrowUpRight className={`w-5 h-5 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
              </Link>

              <Link
                href={`/${locale}/work`}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/90 border border-[#EBE8DE] text-black font-semibold text-base hover:bg-black hover:text-white hover:border-black active:scale-95 transition-all duration-200 shadow-2xs inline-flex items-center justify-center"
              >
                <span>{isRTL ? 'استكشف أعمالنا' : 'Explore portfolio'}</span>
              </Link>
            </div>

            {/* Quick Regional Contact Indicators */}
            <div className="pt-6 border-t border-[#EBE8DE] flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-[#586069]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>{isRTL ? 'الرياض: +9660547851570' : 'Riyadh: +966 054 785 1570'}</span>
              </div>
              <span className="text-[#C4BDB0]">•</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>{isRTL ? 'الجيزة: 01150117387' : 'Giza: 01150117387'}</span>
              </div>
            </div>
          </div>

          {/* Right 3D Visual Stage (5 cols - 3D Parallax) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            {/* 3D View Switcher Toolbar */}
            <div className="mb-4 inline-flex items-center gap-1.5 p-1 rounded-2xl bg-white/90 border border-[#EBE8DE] shadow-xs text-xs font-bold select-none">
              <button
                type="button"
                onClick={() => setActive3DMode('mascots')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  active3DMode === 'mascots'
                    ? 'bg-black text-white shadow-xs'
                    : 'text-[#586069] hover:text-black'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{isRTL ? 'مجسمات 3D' : '3D Stage'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActive3DMode('banner')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  active3DMode === 'banner'
                    ? 'bg-black text-white shadow-xs'
                    : 'text-[#586069] hover:text-black'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isRTL ? 'البانر 3D' : '3D Artwork'}</span>
              </button>
            </div>

            {/* Interactive 3D Card with Dynamic Tilt */}
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-full max-w-md preserve-3d cursor-grab active:cursor-grabbing select-none"
            >
              {/* Main 3D Glass Container */}
              <div className="relative rounded-3xl bg-white/90 backdrop-blur-md border border-[#EBE8DE] p-6 sm:p-8 shadow-2xl overflow-hidden preserve-3d">
                {/* 3D Dynamic Ambient Glows */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#FF3B53]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#1E6B27]/20 rounded-full blur-3xl pointer-events-none" />

                {active3DMode === 'mascots' ? (
                  /* 3D Mascots Interactive Spotlight */
                  <div className="space-y-6 preserve-3d text-center">
                    <div className="relative w-full h-60 sm:h-64 flex items-center justify-center preserve-3d">
                      <div className="absolute bottom-2 w-44 h-7 bg-black/10 rounded-[100%] blur-md" />

                      <div className="relative z-10 w-full h-full flex items-center justify-center mascot-3d-pulse">
                        <Image
                          src="/images/mascots-3d-transparent.png"
                          alt="Marketing Melon 3D Mascots"
                          width={440}
                          height={440}
                          priority
                          className="h-full w-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.2)]"
                        />
                      </div>

                      {/* 3D Floating Watermelon Emblem Badge */}
                      <div
                        style={{ transform: 'translateZ(45px)' }}
                        className={`absolute top-0 ${
                          isRTL ? 'left-0' : 'right-0'
                        } bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-xl border border-[#EBE8DE] flex items-center gap-2 card-3d-floating`}
                      >
                        <Image
                          src="/images/logo-mark.png"
                          alt="3D Melon Mark"
                          width={28}
                          height={28}
                          className="w-7 h-7 object-contain"
                        />
                        <div className="text-start">
                          <div className="text-[9px] text-[#8C959F] font-bold uppercase">Melon 3D</div>
                          <div className="text-xs font-black text-[#1E6B27]">Squeeze Best</div>
                        </div>
                      </div>
                    </div>

                    {/* Logo Inside 3D Card */}
                    <div style={{ transform: 'translateZ(25px)' }} className="space-y-1.5">
                      <div className="relative w-44 sm:w-52 h-10 sm:h-12 mx-auto flex items-center justify-center">
                        <Image
                          src="/images/logo-transparent.png"
                          alt="Marketing Melon"
                          width={220}
                          height={60}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <p className="text-xs text-[#586069] max-w-xs mx-auto">
                        {isRTL
                          ? 'استراتيجية إبداعية، إنتاج سينمائي وحملات رقمية'
                          : 'Creative Strategy, 3D Cinematography & Growth'}
                      </p>
                    </div>
                  </div>
                ) : (
                  /* 3D Banner Artwork Showcase */
                  <div className="space-y-4 preserve-3d">
                    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-[#EBE8DE] bg-[#FAF8EF]">
                      <Image
                        src="/images/hero-3d-banner.png"
                        alt="Marketing Melon 3D Banner Artwork"
                        width={1024}
                        height={449}
                        priority
                        className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="text-center text-xs text-[#586069] font-medium">
                      {isRTL
                        ? 'الهوية البصرية الرسمية لوكالة ماركتنج ميلون'
                        : 'Official 3D Brand Campaign Artwork'}
                    </div>
                  </div>
                )}

                {/* 3D Capabilities Chips */}
                <div
                  style={{ transform: 'translateZ(35px)' }}
                  className="mt-6 pt-4 border-t border-[#EBE8DE] flex flex-wrap items-center justify-between gap-2 text-xs font-bold"
                >
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF7F3] text-[#1E6B27] border border-[#1E6B27]/20 shadow-2xs">
                    <Video className="w-3.5 h-3.5 text-[#1E6B27]" />
                    <span>{isRTL ? 'إنتاج سينمائي' : 'Production'}</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF0F2] text-[#FF3B53] border border-[#FF3B53]/20 shadow-2xs">
                    <TrendingUp className="w-3.5 h-3.5 text-[#FF3B53]" />
                    <span>{isRTL ? 'إعلانات ممولة' : 'Performance'}</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF9F5] text-black border border-[#EBE8DE] shadow-2xs">
                    <Layers className="w-3.5 h-3.5 text-[#FF3B53]" />
                    <span>3D & VFX</span>
                  </div>
                </div>
              </div>

              {/* 3D Top Corner Verified Badge */}
              <div
                style={{ transform: 'translateZ(50px)' }}
                className={`absolute -top-3 ${
                  isRTL ? '-left-3' : '-right-3'
                } z-30 bg-black text-white px-3 py-1 rounded-full shadow-lg border border-neutral-700 flex items-center gap-1.5 text-xs font-bold`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                <span>{isRTL ? 'وكالة معتمدة' : 'Verified Agency'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROAR Style Floating Bottom Center Action Pill (Audio waves + Scroll Down Arrow) */}
      <div className="w-full flex items-center justify-center pt-8 pb-4 relative z-20">
        <div className="inline-flex items-center gap-2 p-1.5 rounded-full bg-white/95 border border-[#EBE8DE] shadow-md backdrop-blur-md">
          {/* Audio Wave Button */}
          <button
            type="button"
            onClick={toggleAudio}
            className="w-10 h-10 rounded-full bg-[#F5F4F0] text-black hover:bg-black hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer"
            aria-label={isPlayingAudio ? 'Mute ambient sound' : 'Play ambient audio wave'}
          >
            {isPlayingAudio ? (
              <div className="flex items-center gap-0.5">
                <span className="w-0.5 h-3.5 bg-current animate-pulse" />
                <span className="w-0.5 h-2 bg-current animate-pulse delay-75" />
                <span className="w-0.5 h-4 bg-current animate-pulse delay-150" />
              </div>
            ) : (
              <div className="flex items-center gap-0.5">
                <span className="w-0.5 h-2.5 bg-current" />
                <span className="w-0.5 h-4 bg-current" />
                <span className="w-0.5 h-2.5 bg-current" />
              </div>
            )}
          </button>

          {/* Scroll Down Button */}
          <button
            type="button"
            onClick={scrollToNextSection}
            className="w-10 h-10 rounded-full bg-black text-white hover:bg-neutral-800 flex items-center justify-center transition-all duration-200 cursor-pointer group"
            aria-label="Scroll down to explore"
          >
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

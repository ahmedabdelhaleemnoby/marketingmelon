'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { siteContent, companyData } from '@/data/content';
import { Locale } from '@/types/content';
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Video,
  TrendingUp,
  Layers,
  Zap,
  Eye,
  Sliders,
} from 'lucide-react';

interface HeroProps {
  locale: Locale;
}

export const Hero: React.FC<HeroProps> = ({ locale }) => {
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  // 3D Parallax Mouse Tracking
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [active3DMode, setActive3DMode] = useState<'mascots' | 'banner'>('mascots');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Calculate rotation limits (-12deg to +12deg)
    setRotateX(-(y / (rect.height / 2)) * 10);
    setRotateY((x / (rect.width / 2)) * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section className="relative pt-28 sm:pt-36 pb-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#FAF9F5] via-[#FAF8F0] to-[#F1ECE1] perspective-2000">
      {/* 3D Background Grid & Ambient Glows */}
      <div className="absolute inset-0 melon-grid-pattern pointer-events-none" />
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#FF3B53]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-40 left-0 w-96 h-96 bg-[#1E6B27]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Copy (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-start">
            {/* 3D Isometric Badge */}
            <div className="inline-flex items-center justify-center lg:justify-start">
              <Badge variant="coral" size="md" className="badge-3d shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{content.hero.badge}</span>
              </Badge>
            </div>

            {/* Tagline Heading with 3D Watermelon Slice Accent */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#14171A] leading-[1.1] drop-shadow-xs">
              {isRTL ? (
                <>
                  اعصر <span className="text-[#FF3B53]">الأفضل</span>،
                  <br />
                  وتفوّق على البقية.
                </>
              ) : (
                <>
                  Squeeze the <span className="text-[#FF3B53]">best</span>,
                  <br />
                  beat the rest.
                </>
              )}
            </h1>

            {/* Original Supporting Copy */}
            <p className="text-base sm:text-lg lg:text-xl text-[#586069] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {content.hero.subtitle}
            </p>

            {/* CTA Buttons with 3D Bevel Shadows */}
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
                className="w-full sm:w-auto shadow-md hover:shadow-lg hover:shadow-[#FF3B53]/30"
              >
                {content.hero.ctaPrimary}
              </Button>

              <Button
                href={`/${locale}/work`}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white/90 shadow-2xs hover:shadow-md"
              >
                {content.hero.ctaSecondary}
              </Button>
            </div>

            {/* 3D Operational Stats Ribbon */}
            <div className="pt-8 border-t border-[#EBE8DE] grid grid-cols-3 gap-4 text-start">
              {content.hero.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/80 border border-[#EBE8DE] shadow-2xs space-y-1 hover:border-[#1E6B27]/40 transition-colors badge-3d"
                >
                  <div className="text-lg sm:text-2xl font-black text-[#1E6B27]">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-[#586069] leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced 3D Interactive Stage (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            {/* 3D View Switcher Toolbar */}
            <div className="mb-4 inline-flex items-center gap-1.5 p-1 rounded-2xl bg-white/80 border border-[#EBE8DE] shadow-xs text-xs font-bold select-none">
              <button
                type="button"
                onClick={() => setActive3DMode('mascots')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  active3DMode === 'mascots'
                    ? 'bg-[#1E6B27] text-white shadow-xs'
                    : 'text-[#586069] hover:text-[#14171A]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>{isRTL ? 'مجسمات 3D التفاعلية' : '3D Mascots Stage'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActive3DMode('banner')}
                className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                  active3DMode === 'banner'
                    ? 'bg-[#1E6B27] text-white shadow-xs'
                    : 'text-[#586069] hover:text-[#14171A]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{isRTL ? 'البانر الإعلاني 3D' : '3D Brand Banner'}</span>
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
              className="relative w-full max-w-lg preserve-3d cursor-grab active:cursor-grabbing select-none"
            >
              {/* Main 3D Container */}
              <div className="relative rounded-3xl bg-gradient-to-br from-white via-white/95 to-[#FAF8EF] border border-[#EBE8DE] p-6 sm:p-8 shadow-2xl overflow-hidden preserve-3d">
                {/* 3D Dynamic Ambient Glows */}
                <div className="absolute -top-12 -right-12 w-56 h-56 bg-[#FF3B53]/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-[#1E6B27]/20 rounded-full blur-3xl pointer-events-none" />

                {active3DMode === 'mascots' ? (
                  /* 3D Mascots Interactive Spotlight */
                  <div className="space-y-6 preserve-3d text-center">
                    {/* Floating 3D Mascots */}
                    <div className="relative w-full h-64 sm:h-72 flex items-center justify-center preserve-3d">
                      {/* Background Soft Platform */}
                      <div className="absolute bottom-2 w-48 h-8 bg-black/10 rounded-[100%] blur-md" />

                      <div className="relative z-10 w-full h-full flex items-center justify-center mascot-3d-pulse">
                        <Image
                          src="/images/mascots-3d-transparent.png"
                          alt="Marketing Melon 3D Ninja Mascots"
                          width={480}
                          height={480}
                          priority
                          className="h-full w-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.2)]"
                        />
                      </div>

                      {/* 3D Floating Watermelon Emblem Badge (translateZ) */}
                      <div
                        style={{ transform: 'translateZ(45px)' }}
                        className={`absolute top-2 ${
                          isRTL ? 'left-2' : 'right-2'
                        } bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-xl border border-[#EBE8DE] flex items-center gap-2 card-3d-floating`}
                      >
                        <Image
                          src="/images/logo-mark.png"
                          alt="3D Melon Mark"
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain"
                        />
                        <div className="text-start">
                          <div className="text-[10px] text-[#8C959F] font-bold uppercase">Melon 3D</div>
                          <div className="text-xs font-black text-[#1E6B27]">Squeeze Best</div>
                        </div>
                      </div>
                    </div>

                    {/* Logo & Headline Inside 3D Card */}
                    <div style={{ transform: 'translateZ(25px)' }} className="space-y-2">
                      <div className="relative w-48 sm:w-56 h-12 sm:h-14 mx-auto flex items-center justify-center">
                        <Image
                          src="/images/logo-transparent.png"
                          alt="Marketing Melon"
                          width={240}
                          height={70}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <p className="text-xs text-[#586069] max-w-xs mx-auto leading-relaxed">
                        {isRTL
                          ? 'استراتيجية إبداعية، إنتاج سينمائي وحملات رقمية موجهة'
                          : 'Creative Strategy, 3D Cinematography & Performance Marketing'}
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

                {/* 3D Floating Capabilities Footer Chips */}
                <div
                  style={{ transform: 'translateZ(35px)' }}
                  className="mt-6 pt-5 border-t border-[#EBE8DE] flex flex-wrap items-center justify-between gap-2 text-xs font-bold"
                >
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF7F3] text-[#1E6B27] border border-[#1E6B27]/20 shadow-2xs badge-3d">
                    <Video className="w-3.5 h-3.5 text-[#1E6B27]" />
                    <span>{isRTL ? 'تصوير أرضي وجوي' : 'Ground & Drone'}</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF0F2] text-[#FF3B53] border border-[#FF3B53]/20 shadow-2xs badge-3d">
                    <TrendingUp className="w-3.5 h-3.5 text-[#FF3B53]" />
                    <span>{isRTL ? 'إعلانات ممولة' : 'Performance Media'}</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF9F5] text-[#14171A] border border-[#EBE8DE] shadow-2xs badge-3d">
                    <Layers className="w-3.5 h-3.5 text-[#FF3B53]" />
                    <span>{isRTL ? 'موشن & 3D CGI' : '3D CGI & VFX'}</span>
                  </div>
                </div>
              </div>

              {/* 3D Floating Bottom Ribbon */}
              <div
                style={{ transform: 'translateZ(60px)' }}
                className={`absolute -bottom-5 ${
                  isRTL ? '-right-5' : '-left-5'
                } z-30 bg-[#1E6B27] text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-[#2EA03E] flex items-center gap-2.5 text-xs font-bold card-3d-floating`}
              >
                <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-[#80ED99]" />
                </div>
                <div>
                  <div className="text-[10px] text-[#80ED99] uppercase tracking-wider">
                    {companyData.name}
                  </div>
                  <div>{isRTL ? 'تصميم وهوية ثلاثية الأبعاد' : '3D Interactive Experience'}</div>
                </div>
              </div>

              {/* 3D Top Corner Verified Badge */}
              <div
                style={{ transform: 'translateZ(50px)' }}
                className={`absolute -top-4 ${
                  isRTL ? '-left-4' : '-right-4'
                } z-30 bg-white text-[#14171A] px-3.5 py-1.5 rounded-xl shadow-xl border border-[#EBE8DE] flex items-center gap-1.5 text-xs font-bold badge-3d`}
              >
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>{isRTL ? 'وكالة معتمدة' : 'Verified Agency'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

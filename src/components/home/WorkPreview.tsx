'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Locale } from '@/types/content';
import { ArrowUpRight } from 'lucide-react';

interface WorkPreviewProps {
  locale: Locale;
}

export const WorkPreview: React.FC<WorkPreviewProps> = ({ locale }) => {
  const isRTL = locale === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: isRTL ? 'عرض الكل' : 'View All' },
    { id: 'branding', label: isRTL ? 'الهوية البصرية' : 'Branding' },
    { id: 'social', label: isRTL ? 'سوشيال ميديا' : 'Social Media' },
    { id: 'ads', label: isRTL ? 'إعلانات ممولة' : 'Performance Marketing' },
    { id: 'photography', label: isRTL ? 'تصوير فوتوغرافي' : 'Photography' },
    { id: 'videography', label: isRTL ? 'إنتاج سينمائي' : 'Videography' },
    { id: 'web', label: isRTL ? 'تطوير الويب' : 'Web Development' },
  ];

  const showcases = [
    {
      id: 'printing-devices-campaign',
      slug: 'printing-devices-campaign',
      title: isRTL ? 'حملة أجهزة ومعدات الطباعة — 3,649% ROAS' : 'Printing Devices Campaign — 3,649% ROAS',
      category: isRTL ? 'إعلانات Google والأداء الإعلاني' : 'Google Ads & Performance Marketing',
      categoryKey: 'ads',
      image: '/images/results/google-ads-1.png',
      badge: isRTL ? 'عائد 3,649% ROAS' : '3,649.87% ROAS',
      accentColor: 'from-blue-600 via-indigo-900 to-black',
    },
    {
      id: 'beauty-skincare-scaling',
      slug: 'beauty-skincare-scaling',
      title: isRTL ? 'مستحضرات التجميل الفاخرة — مبيعات 428 ألف ريال' : 'Luxury Beauty & Skincare — 428K SAR Sales',
      category: isRTL ? 'إعلانات السوشيال ميديا والتجارة الإلكترونية' : 'Social Ads & E-Commerce Scaling',
      categoryKey: 'social',
      image: '/images/results/google-ads-2.png',
      badge: isRTL ? 'مبيعات 428K ريال' : '428K SAR Sales',
      accentColor: 'from-pink-600 via-rose-900 to-black',
    },
    {
      id: 'luxury-jewelry-reach',
      slug: 'luxury-jewelry-reach',
      title: isRTL ? 'دار المجوهرات الفاخرة — 2.05 مليون ظهور' : 'Fine Jewelry Atelier — 2.05M Impressions',
      category: isRTL ? 'تصوير فوتوغرافي وحملات الرفاهية' : 'Luxury Photography & Brand Campaigns',
      categoryKey: 'photography',
      image: '/images/results/google-ads-3.png',
      badge: isRTL ? '2.05 مليون ظهور' : '2.05M Impressions',
      accentColor: 'from-amber-600 via-yellow-900 to-black',
    },
    {
      id: 'organic-seo-dominance',
      slug: 'organic-seo-dominance',
      title: isRTL ? 'تصدر نتائج محركات البحث — 3.32 مليون ظهور' : 'Organic SEO Dominance — 3.32M Impressions',
      category: isRTL ? 'تطوير الويب والـ SEO التقني' : 'Web Engineering & Technical SEO',
      categoryKey: 'web',
      image: '/images/melon-strap.png',
      badge: isRTL ? '3.32M ظهور في Google' : '3.32M Google Impressions',
      accentColor: 'from-emerald-600 via-teal-900 to-black',
    },
    {
      id: 'al-eairy-residence',
      slug: 'al-eairy-residence',
      title: isRTL ? 'ريزيدنس العيري — Al Eairy Residence' : 'Al Eairy Residence',
      category: isRTL ? 'إنتاج سينمائي وتصوير جوي بالدرون' : 'Cinematography & Aerial Drone Production',
      categoryKey: 'videography',
      image: '/images/characters/hero-ninja-team.jpg',
      badge: isRTL ? 'مشروع موثق' : 'Verified Project',
      accentColor: 'from-amber-600 via-rose-800 to-black',
    },
    {
      id: 'melon-brand-system',
      slug: 'printing-devices-campaign',
      title: isRTL ? 'هوية ماركتنج ميلون والشخصيات الثلاثية الأبعاد' : 'Marketing Melon 3D Brand & Mascots System',
      category: isRTL ? 'هوية بصرية وتصميم ثلاثي الأبعاد' : 'Brand Identity & 3D Spatial Design',
      categoryKey: 'branding',
      image: '/images/logo-transparent.png',
      badge: isRTL ? 'هوية الوكالة 2027' : 'Agency Identity 2027',
      accentColor: 'from-[#0037FF] via-[#001EC4] to-[#0A0E2A]',
      isGraphicCard: true,
    },
  ];

  const filteredShowcases =
    activeCategory === 'all'
      ? showcases
      : showcases.filter(
          (item) => item.categoryKey === activeCategory || activeCategory === 'all'
        );

  return (
    <section className="py-24 sm:py-32 bg-[#FAF9F5] border-t border-[#EBE8DE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Headline (ROAR Style) */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#14171A] leading-[1.15]">
            {isRTL ? (
              <>الإبداع مسألة منظور.. واعتزازنا بما نقدمه حقيقة راسخة</>
            ) : (
              <>Creativity is a matter of perspective. Our pride is a certain</>
            )}
          </h2>
        </div>

        {/* Category Filter Pills (ROAR Style Horizontal Bar) */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-14">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-black text-white shadow-md scale-105'
                    : 'bg-white border border-[#EBE8DE] text-[#586069] hover:text-black hover:bg-[#F3EFE6]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 2-Column Showcases Grid (ROAR Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredShowcases.map((item) => (
            <Link
              key={item.id}
              href={`/${locale}/work/${item.slug}`}
              className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-[#EBE8DE] flex flex-col justify-between"
            >
              {/* Media Visual Container */}
              <div
                className={`relative w-full h-80 sm:h-96 overflow-hidden flex items-center justify-center ${
                  item.isGraphicCard
                    ? 'bg-gradient-to-br from-[#0037FF] via-[#0522B0] to-[#04115C] p-8'
                    : 'bg-neutral-900'
                }`}
              >
                {item.isGraphicCard ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 relative mb-4 transform group-hover:scale-110 transition-transform duration-500">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.4)]"
                      />
                    </div>
                    <div className="text-white font-black text-xl sm:text-2xl tracking-widest uppercase">
                      Marketing Melon
                    </div>
                  </div>
                ) : (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-black font-bold text-xs shadow-sm">
                    {item.badge}
                  </span>
                </div>

                {/* Floating Arrow Trigger */}
                <div className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-black/60 group-hover:bg-white text-white group-hover:text-black flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className={`w-5 h-5 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6 sm:p-8 bg-white space-y-2">
                <div className="text-xs font-bold text-[#FF3B53] uppercase tracking-wider">
                  {item.category}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#14171A] group-hover:text-[#FF3B53] transition-colors">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Explore More CTA */}
        <div className="mt-14 text-center">
          <Link
            href={`/${locale}/work`}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-black text-white font-bold text-sm hover:bg-neutral-800 transition-all shadow-md active:scale-95"
          >
            <span>{isRTL ? 'استكشف جميع الأعمال والمشاريع' : 'Browse Full Portfolio'}</span>
            <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />
          </Link>
        </div>
      </div>
    </section>
  );
};

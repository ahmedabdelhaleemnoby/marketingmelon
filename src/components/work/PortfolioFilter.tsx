'use client';

import React, { useState } from 'react';
import { ProjectItem, Locale } from '@/types/content';
import { ProjectCard } from '@/components/work/ProjectCard';
import { Badge } from '@/components/ui/Badge';
import { Sparkles } from 'lucide-react';

interface PortfolioFilterProps {
  projects: ProjectItem[];
  locale: Locale;
}

export const PortfolioFilter: React.FC<PortfolioFilterProps> = ({ projects, locale }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const isRTL = locale === 'ar';

  const categories = [
    { key: 'all', label: isRTL ? 'جميع التخصصات' : 'All Disciplines' },
    { key: 'production', label: isRTL ? 'الإنتاج والتصوير' : 'Production & Motion' },
    { key: 'strategy', label: isRTL ? 'الاستراتيجية والهوية' : 'Strategy & Branding' },
    { key: 'ads', label: isRTL ? 'الإعلانات الممولة' : 'Paid Media' },
    { key: 'social', label: isRTL ? 'محتوى التواصل' : 'Social Media' },
    { key: 'web', label: isRTL ? 'المواقع والتطبيقات' : 'Web & Apps' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.categoryKey === activeCategory);

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-white border border-[#EBE8DE] max-w-fit mx-auto shadow-2xs">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#14171A] text-white shadow-2xs'
                  : 'text-[#586069] hover:text-[#14171A] hover:bg-[#FAF9F5]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Filtered Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-3xl bg-white border border-[#EBE8DE] max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF0F2] text-[#FF3B53] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#14171A]">
            {isRTL ? 'لا توجد مشاريع منشورة في هذا التصنيف حالياً' : 'No Public Projects in this Category Yet'}
          </h3>
          <p className="text-xs text-[#586069] leading-relaxed">
            {isRTL
              ? 'نحن ننشر فقط المشاريع المعتمدة والمصرح بها من قبل العملاء للحفاظ على المصداقية والسرية.'
              : 'We strictly publish verified, client-authorized portfolio items. Contact us to discuss tailored capabilities for your sector.'}
          </p>
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className="text-xs font-bold text-[#FF3B53] hover:underline"
          >
            {isRTL ? 'عرض جميع المشاريع المتاحة' : 'View all available showcases'}
          </button>
        </div>
      )}
    </div>
  );
};

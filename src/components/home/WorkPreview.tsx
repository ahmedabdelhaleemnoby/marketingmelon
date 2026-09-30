import React from 'react';
import { siteContent } from '@/data/content';
import { Locale } from '@/types/content';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProjectCard } from '@/components/work/ProjectCard';
import { ArrowUpRight } from 'lucide-react';

interface WorkPreviewProps {
  locale: Locale;
}

export const WorkPreview: React.FC<WorkPreviewProps> = ({ locale }) => {
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  return (
    <section className="py-20 sm:py-28 bg-[#F3EFE6]/60 border-y border-[#EBE8DE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="coral" size="md">
              {content.workSection.eyebrow}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14171A]">
              {content.workSection.title}
            </h2>
            <p className="text-sm sm:text-base text-[#586069] leading-relaxed">
              {content.workSection.subtitle}
            </p>
          </div>

          <Button
            href={`/${locale}/work`}
            variant="outline"
            size="md"
            icon={
              <ArrowUpRight
                className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`}
              />
            }
            className="self-start md:self-auto bg-white"
          >
            {content.cta.allWork}
          </Button>
        </div>

        {/* Projects Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.projects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}

          {/* Transparent Scope Card (Highlighting Verified Client Inquiries) */}
          <div className="rounded-3xl border-2 border-dashed border-[#D6D2C4] bg-[#FAF9F5]/80 p-8 flex flex-col justify-between text-center items-center">
            <div className="space-y-4 my-auto">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF0F2] text-[#FF3B53] flex items-center justify-center mx-auto">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#14171A]">
                {isRTL ? 'هل لديك مشروع قادم؟' : 'Have a Project in Mind?'}
              </h3>
              <p className="text-xs sm:text-sm text-[#586069] max-w-xs mx-auto leading-relaxed">
                {isRTL
                  ? 'نوفر حلول تصوير متكاملة، إعلانات موجهة، وهندسة برمجية مخصصة لعلامتك.'
                  : 'Let’s discuss custom production, targeted growth campaigns, and high-performance digital presence.'}
              </p>
            </div>

            <Button
              href={`/${locale}/contact`}
              variant="secondary"
              size="md"
              className="w-full justify-center mt-6"
            >
              {content.cta.talk}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

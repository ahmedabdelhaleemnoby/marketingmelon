import React from 'react';
import Link from 'next/link';
import { ProjectItem, Locale } from '@/types/content';
import { Badge } from '@/components/ui/Badge';
import { ArrowUpRight, CheckCircle2, Building, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  locale: Locale;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, locale }) => {
  const isRTL = locale === 'ar';

  return (
    <div className="group rounded-3xl bg-white border border-[#EBE8DE] overflow-hidden flex flex-col justify-between card-hover-glow">
      {/* Project Visual Stage Header */}
      <div
        className={`relative h-64 sm:h-72 w-full bg-gradient-to-br ${project.heroColor} p-6 sm:p-8 flex flex-col justify-between overflow-hidden`}
      >
        {/* Decorative Grid and Graphic Elements */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#FF3B53]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Tags */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <Badge
            variant="emerald"
            size="sm"
            className="bg-black/30 backdrop-blur-md text-[#80ED99] border-white/10"
          >
            <Building className="w-3 h-3" />
            <span>{project.category}</span>
          </Badge>

          {project.isVerifiedProject && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#10B981]/20 backdrop-blur-md text-[#80ED99] text-[11px] font-bold border border-[#10B981]/30">
              <CheckCircle2 className="w-3 h-3" />
              <span>{isRTL ? 'مشروع معتمد' : 'Verified Client'}</span>
            </span>
          )}
        </div>

        {/* Center Display Emblem */}
        <div className="relative z-10 text-center py-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-8 h-8 text-[#80ED99]" />
          </div>
          <div className="text-xs uppercase tracking-widest text-white/80 font-bold mt-3">
            {project.client}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="relative z-10 text-xs text-white/70 font-mono">
          {project.year}
        </div>
      </div>

      {/* Project Information Body */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-black text-[#14171A] mb-3 group-hover:text-[#FF3B53] transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-[#586069] leading-relaxed mb-6">
            {project.summary}
          </p>

          {/* Verified Scope Pills */}
          <div className="space-y-2 mb-6">
            <div className="text-xs font-bold text-[#8C959F] uppercase tracking-wider">
              {isRTL ? 'نطاق العمل المنفذ' : 'Executed Scope'}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.verifiedScope.map((scopeItem, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center text-xs px-2.5 py-1 rounded-md bg-[#FAF9F5] text-[#3E454F] border border-[#EBE8DE]"
                >
                  {scopeItem}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Card Action Link */}
        <div className="pt-4 border-t border-[#EBE8DE] flex items-center justify-between">
          <Link
            href={`/${locale}/work/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F4C3A] hover:text-[#FF3B53] transition-colors group/link"
          >
            <span>{isRTL ? 'استعراض دراسة الحالة' : 'View Full Case Study'}</span>
            <ArrowUpRight
              className={`w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 ${
                isRTL ? 'rotate-[-90deg]' : ''
              }`}
            />
          </Link>

          <span className="text-[11px] text-[#8C959F] font-mono">
            {isRTL ? 'سجل موثق' : 'Verified'}
          </span>
        </div>
      </div>
    </div>
  );
};

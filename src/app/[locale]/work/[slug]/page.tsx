import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { siteContent, companyData } from '@/data/content';
import { Locale } from '@/types/content';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CtaBanner } from '@/components/home/CtaBanner';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Building,
  Sparkles,
  Calendar,
  ShieldCheck,
  Video,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

interface ProjectDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales: Locale[] = ['en', 'ar'];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const project of siteContent[locale].projects) {
      params.push({ locale, slug: project.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = rawLocale === 'ar' ? 'ar' : 'en';
  const project = siteContent[locale].projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} | Case Study | ${companyData.name}`,
    description: project.summary,
    alternates: {
      canonical: `https://marketingmelon.online/${locale}/work/${slug}`,
      languages: {
        en: `https://marketingmelon.online/en/work/${slug}`,
        ar: `https://marketingmelon.online/ar/work/${slug}`,
      },
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = rawLocale === 'ar' ? 'ar' : 'en';
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  const project = content.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-28 sm:pt-36 pb-16 bg-[#FAF9F5]">
      {/* Back to Work Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href={`/${locale}/work`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#586069] hover:text-[#FF3B53] transition-colors"
        >
          {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{isRTL ? 'العودة إلى صفحة الأعمال' : 'Back to All Showcases'}</span>
        </Link>
      </div>

      {/* Project Hero Banner Stage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div
          className={`relative rounded-3xl bg-gradient-to-br ${project.heroColor} text-white p-8 sm:p-14 lg:p-16 overflow-hidden shadow-xl`}
        >
          {/* Ambient Lighting & Pattern */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF3B53]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="emerald"
                size="sm"
                className="bg-black/40 backdrop-blur-md text-[#80ED99] border-white/20"
              >
                <Building className="w-3 h-3" />
                <span>{project.category}</span>
              </Badge>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#10B981]/20 backdrop-blur-md text-[#80ED99] text-xs font-bold border border-[#10B981]/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isRTL ? 'مشروع معتمد' : 'Verified Project'}</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-white/85 leading-relaxed font-medium">
              {project.summary}
            </p>

            {/* Client & Metadata Pills */}
            <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-white/80">
              <div className="flex items-center gap-2">
                <span className="text-white/60 font-semibold">{isRTL ? 'العميل:' : 'Client:'}</span>
                <span className="font-bold text-white">{project.client}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#80ED99]" />
                <span className="font-mono">{project.year}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Case Story (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Story Card */}
            <div className="rounded-3xl bg-white border border-[#EBE8DE] p-8 sm:p-10 shadow-sm space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[#FF3B53] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isRTL ? 'سياق المشروع والهدف' : 'Project Background & Purpose'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#14171A]">
                {isRTL ? 'التوجيه الإبداعي وحضور العلامة البصري' : 'Elevating Brand Atmosphere & Visual Identity'}
              </h2>

              <p className="text-base text-[#586069] leading-relaxed">
                {project.fullStory}
              </p>

              {/* Source Verification Note */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-xs text-[#0F4C3A]">
                <ShieldCheck className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>{project.sourceNote}</span>
              </div>
            </div>

            {/* Visual Production Highlights Grid */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-[#14171A]">
                {isRTL ? 'أبرز محاور الإنتاج والتسليمات' : 'Production Highlights & Visual Assets'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.galleryItems?.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-white border border-[#EBE8DE] p-6 space-y-3 shadow-2xs hover:border-[#FF3B53]/30 transition-all card-hover-glow"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#FFF0F2] text-[#FF3B53] flex items-center justify-center">
                      {idx === 0 ? (
                        <Video className="w-5 h-5" />
                      ) : (
                        <Layers className="w-5 h-5" />
                      )}
                    </div>
                    <h4 className="text-base font-bold text-[#14171A]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#586069] leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Metadata & Inquiry (4 cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-28">
            {/* Executed Scope Box */}
            <div className="rounded-3xl bg-white border border-[#EBE8DE] p-6 sm:p-8 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-[#14171A]">
                {isRTL ? 'النطاق المنفذ المعتمد' : 'Confirmed Scope of Work'}
              </h3>

              <ul className="space-y-2.5">
                {project.verifiedScope.map((scopeItem, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <span className="text-[#3E454F] font-medium">{scopeItem}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-[#EBE8DE]">
                <div className="text-[11px] text-[#8C959F] uppercase tracking-wider font-bold mb-2">
                  {isRTL ? 'التصنيفات' : 'Tags'}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FAF9F5] border border-[#EBE8DE] text-[#586069]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Inquiry CTA Box */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0F4C3A] to-[#0A3629] text-white p-6 sm:p-8 shadow-lg space-y-4">
              <h3 className="text-lg font-bold">
                {isRTL ? 'هل لديك مشروع مشابه؟' : 'Need Similar Creative Execution?'}
              </h3>
              <p className="text-xs text-[#C7DBD4] leading-relaxed">
                {isRTL
                  ? 'دعنا نناقش متطلباتك في الإنتاج والتسويق الرقمي.'
                  : 'Connect with our creative director and strategy lead to shape your next campaign.'}
              </p>
              <Button
                href={`/${locale}/contact`}
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={<ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`} />}
              >
                {content.cta.talk}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner locale={locale} />
    </div>
  );
}

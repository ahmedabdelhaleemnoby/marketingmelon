import React from 'react';
import { getDynamicContent, getDynamicCompanyData } from '@/data/store';
export const dynamic = 'force-dynamic';
import { Hero } from '@/components/home/Hero';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { MilestonesSection } from '@/components/home/MilestonesSection';
import { PartnersQuote } from '@/components/home/PartnersQuote';
import { VisionMissionSection } from '@/components/home/VisionMissionSection';
import { WorkPreview } from '@/components/home/WorkPreview';
import { OfficeCards } from '@/components/home/OfficeCards';
import { Locale } from '@/types/content';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const rawLocale = (await params).locale;
  const locale: Locale = rawLocale === 'ar' ? 'ar' : 'en';

  const content = getDynamicContent()[locale];
  const company = getDynamicCompanyData();
  return (
    <>
      {/* 1. ROAR Style Hero Section */}
      <Hero locale={locale} hero={content.hero} company={company} />

      {/* 2. Empowering brands through innovative solutions (Image-led Service Cards) */}
      <ServicesPreview locale={locale} services={content.services} />

      {/* 3. Our Milestones (Agency Milestones) */}
      <MilestonesSection locale={locale} />

      {/* 4. Partners in Success Quote Banner */}
      <PartnersQuote locale={locale} />

      {/* 5. Our Vision & Our Mission Section */}
      <VisionMissionSection locale={locale} />

      {/* 6. Selected Case Studies with Category Filter Pills */}
      <WorkPreview locale={locale} projects={content.projects} />

      {/* 7. Saudi Arabia (Riyadh) & Egypt (Hadayek al-Ahram) Office Cards */}
      <OfficeCards locale={locale} showBgImage />
    </>
  );
}

import React from 'react';
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

  return (
    <>
      {/* 1. ROAR Style Hero Section */}
      <Hero locale={locale} />

      {/* 2. Empowering brands through innovative solutions (2x2 Mesh Gradient Cards) */}
      <ServicesPreview locale={locale} />

      {/* 3. Our Milestones (Atmospheric Neon Blue/Red Stats Banner) */}
      <MilestonesSection locale={locale} />

      {/* 4. Partners in Success Quote Banner */}
      <PartnersQuote locale={locale} />

      {/* 5. Our Vision & Our Mission Section */}
      <VisionMissionSection locale={locale} />

      {/* 6. Selected Case Studies with Category Filter Pills */}
      <WorkPreview locale={locale} />

      {/* 7. Saudi Arabia (Riyadh) & Egypt (Hadayek al-Ahram) Office Cards */}
      <OfficeCards locale={locale} showBgImage />
    </>
  );
}

import React from 'react';
import { Hero } from '@/components/home/Hero';
import { AgencyStatement } from '@/components/home/AgencyStatement';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { WorkPreview } from '@/components/home/WorkPreview';
import { ProcessSection } from '@/components/home/ProcessSection';
import { OfficeCards } from '@/components/home/OfficeCards';
import { CtaBanner } from '@/components/home/CtaBanner';
import { Locale } from '@/types/content';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const rawLocale = (await params).locale;
  const locale: Locale = rawLocale === 'ar' ? 'ar' : 'en';

  return (
    <>
      <Hero locale={locale} />
      <AgencyStatement locale={locale} />
      <ServicesPreview locale={locale} />
      <WorkPreview locale={locale} />
      <ProcessSection locale={locale} />
      <OfficeCards locale={locale} showBgImage />
      <CtaBanner locale={locale} />
    </>
  );
}

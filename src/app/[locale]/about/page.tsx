import type { Metadata } from 'next';
import Image from 'next/image';
import { companyData } from '@/data/content';
import { getDynamicContent } from '@/data/store';
import { PageHeader } from '@/components/layout/PageHeader';
import { VisionMissionSection } from '@/components/home/VisionMissionSection';
import { MilestonesSection } from '@/components/home/MilestonesSection';
import { PartnersQuote } from '@/components/home/PartnersQuote';
import { CtaBanner } from '@/components/home/CtaBanner';
import type { Locale } from '@/types/content';
export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale: Locale = (await params).locale === 'ar' ? 'ar' : 'en';
  const ar = locale === 'ar';
  return {
    title: ar ? `من نحن | ${companyData.name}` : `About Us | ${companyData.name}`,
    description: ar ? 'تعرف على ماركتنج ميلون: وكالة إبداعية وتسويق رقمي متكاملة في مصر والسعودية.' : 'Meet Marketing Melon: a full-service creative and digital marketing agency in Egypt and Saudi Arabia.',
    alternates: { canonical: `https://marketingmelon.online/${locale}/about`, languages: { en: 'https://marketingmelon.online/en/about', ar: 'https://marketingmelon.online/ar/about' } },
  };
}

export default async function AboutPage({ params }: Props) {
  const locale: Locale = (await params).locale === 'ar' ? 'ar' : 'en';
  const ar = locale === 'ar';
  const about = getDynamicContent()[locale].about;
  return <>
    <PageHeader locale={locale} crumb={ar ? 'من نحن' : 'About us'} title={ar ? 'شريكك في الإبداع والاستراتيجية الرقمية' : 'Your partner in creativity and digital strategy'} />
    <div className="agency-shell">
      <div className="about-banner"><Image src="/images/characters/hero-ninja-team.jpg" alt={ar ? 'شخصيات ماركتنج ميلون' : 'The Marketing Melon characters'} fill priority sizes="(max-width: 1320px) 100vw, 1320px" /></div>
      <div className="about-promise">
        <h2>{ar ? 'نعدك بحلول متكاملة واستراتيجيات واضحة تمهد طريق علامتك للنمو.' : 'We promise integrated solutions and clear, transparent strategies that pave your brand’s path to growth.'}</h2>
        <div><p>{about.intro}</p><p>{about.taglineMeaning}</p></div>
      </div>
    </div>
    <VisionMissionSection locale={locale} />
    <MilestonesSection locale={locale} />
    <PartnersQuote locale={locale} />
    <CtaBanner locale={locale} />
  </>;
}

import type { Metadata } from 'next';
import { getDynamicContent } from '@/data/store';
import { PortfolioFilter } from '@/components/work/PortfolioFilter';
import { PageHeader } from '@/components/layout/PageHeader';
import { CtaBanner } from '@/components/home/CtaBanner';
import type { Locale } from '@/types/content';
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return { title: (await params).locale === 'ar' ? 'أعمالنا | Marketing Melon' : 'Our Work | Marketing Melon' };
}
export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale: Locale = (await params).locale === 'ar' ? 'ar' : 'en';
  const ar = locale === 'ar';
  const content = getDynamicContent()[locale];
  return <>
    <PageHeader locale={locale} crumb={ar ? 'أعمالنا' : 'Our work'} title={ar ? 'الإبداع وجهة نظر، وأعمالنا هي الدليل.' : 'Creativity is a matter of perspective. Our work is the proof.'}><p>{content.workSection.subtitle}</p></PageHeader>
    <section className="agency-shell portfolio-roar"><PortfolioFilter projects={content.projects} locale={locale} /></section>
    <CtaBanner locale={locale} />
  </>;
}

import { getDynamicContent } from '@/data/store';
import { PortfolioFilter } from '@/components/work/PortfolioFilter';
import { CtaBanner } from '@/components/home/CtaBanner';
import type { Locale } from '@/types/content';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Our Work | Marketing Melon' };
export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale: Locale = (await params).locale === 'ar' ? 'ar' : 'en';
  const content = getDynamicContent()[locale];
  return <><section className="agency-shell page-heading"><p className="eyebrow">{locale === 'ar' ? 'أعمالنا' : 'OUR WORK'}</p><h1>{content.workSection.title}</h1><p>{content.workSection.subtitle}</p></section><section className="agency-shell"><PortfolioFilter projects={content.projects} locale={locale} /></section><CtaBanner locale={locale} /></>;
}

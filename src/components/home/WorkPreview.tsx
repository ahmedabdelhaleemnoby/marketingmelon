import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PortfolioFilter } from '@/components/work/PortfolioFilter';
import type { Locale, ProjectItem } from '@/types/content';
export function WorkPreview({ locale, projects }: { locale: Locale; projects: ProjectItem[] }) {
  const ar = locale === 'ar';
  return <section className="section-space home-work" id="work"><div className="agency-shell"><h2 className="home-work-title">{ar ? 'الإبداع وجهة نظر، وأعمالنا هي الدليل.' : 'Creativity is a matter of perspective. Our work is the proof.'}</h2><PortfolioFilter projects={projects} locale={locale} preview /><div className="portfolio-more"><Link className="pill-button" href={`/${locale}/work`}>{ar ? 'شاهد المزيد' : 'View more'}<ArrowUpRight size={18} /></Link></div></div></section>;
}

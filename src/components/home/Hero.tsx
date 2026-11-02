import Link from 'next/link';
import { Alexandria } from 'next/font/google';
import { ArrowUpRight } from 'lucide-react';
import type { Locale, CompanyInfo } from '@/types/content';
import { siteContent } from '@/data/content';
import { getServices } from '@/data/capabilities';
import { CrystalArtwork } from './CrystalArtwork';

const alexandria = Alexandria({ subsets: ['arabic', 'latin'], display: 'swap' });

type Props = { locale: Locale; hero?: typeof siteContent.en.hero; company?: CompanyInfo };
export function Hero({ locale, hero = siteContent[locale].hero }: Props) {
  const ar = locale === 'ar';
  const [first, second] = hero.tagline.split(ar ? / (?=إلى )/ : / (?=TO )/i);
  return <section className={`crystal-hero ${alexandria.className}`} aria-labelledby="hero-heading">
    <CrystalArtwork services={getServices(locale).map(service => service.title)} ar={ar} />
    <div className="agency-shell crystal-bottom">
      <div className="crystal-copy">
        <p className="crystal-chip"><span aria-hidden="true" />{ar ? 'وكالة إبداعية وتسويق رقمي متكاملة' : 'A full-service creative & digital agency'}</p>
        <h1 id="hero-heading">{first}{second && <><br /><span>{second}</span></>}</h1>
        <p className="crystal-caption" lang="en" dir="ltr">{ar ? 'From idea to the top' : 'Fresh ideas. Lasting impact.'}</p>
      </div>
      <div className="crystal-actions">
        <Link className="crystal-secondary" href={`/${locale}/work`}>{ar ? 'شوف أعمالنا' : 'Explore our work'}</Link>
        <Link className="crystal-primary" href={`/${locale}/request-service`}>{ar ? 'اطلب خدمة' : 'Request a service'}<span><ArrowUpRight size={21} aria-hidden="true" /></span></Link>
      </div>
    </div>
  </section>;
}

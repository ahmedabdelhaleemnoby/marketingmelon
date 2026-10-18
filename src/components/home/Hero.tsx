import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import type { Locale, CompanyInfo } from '@/types/content';
import { companyData, siteContent } from '@/data/content';
import { FacebookIcon, InstagramIcon, LinkedInIcon, BehanceIcon } from '@/components/ui/SocialIcons';
import { WatermelonStripes } from './WatermelonStripes';

type Props = { locale: Locale; hero?: typeof siteContent.en.hero; company?: CompanyInfo };
export function Hero({ locale, hero = siteContent[locale].hero, company = companyData }: Props) {
  const ar = locale === 'ar';
  const socials = [{ name: 'Instagram', Icon: InstagramIcon, url: company.socialLinks.instagram }, { name: 'Behance', Icon: BehanceIcon, url: company.socialLinks.behance }, { name: 'LinkedIn', Icon: LinkedInIcon, url: company.socialLinks.linkedin }, { name: 'Facebook', Icon: FacebookIcon, url: company.socialLinks.facebook }];
  // Break the slogan before its second half ("TO …" / "إلى …") so it reads on two bold lines.
  const [first, second] = hero.tagline.split(ar ? / (?=إلى )/ : / (?=TO )/i);
  return (
    <section className="home-hero">
      <div className="agency-shell home-hero-inner">
        <div className="home-hero-copy">
          <div className="hero-socials">{socials.map(({ name, Icon, url }) => <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name}><Icon className="w-4 h-4" /></a>)}</div>
          <h1>{first}{second && <><br /><span className="home-hero-line">{second}<small>{ar ? 'وكالة إبداعية وتسويق رقمي متكاملة.' : 'A full-service creative & digital marketing agency.'}</small></span></>}</h1>
          <div className="home-hero-actions">
            <Link className="pill-button" href={`/${locale}/request-service`}>{ar ? 'اطلب خدمة' : 'Request service'}<ArrowUpRight size={18} aria-hidden="true" /></Link>
            <a href="#services" className="round-button" aria-label={ar ? 'انتقل إلى الخدمات' : 'Scroll to services'}><ArrowDown size={18} /></a>
          </div>
        </div>
        <div className="home-hero-art"><WatermelonStripes /></div>
      </div>
    </section>
  );
}

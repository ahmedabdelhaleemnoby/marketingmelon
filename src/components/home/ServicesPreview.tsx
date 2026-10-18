import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Locale, ServiceItem } from '@/types/content';
import { getServices } from '@/data/capabilities';

// The four headline services; their images are the Melon ninja mascots (see capabilities.ts).
export const featuredServiceIds = ['brand-identity', 'strategy-marketing', 'web-development', 'social-media'];

export function ServicesPreview({ locale, services = getServices(locale) }: { locale: Locale; services?: ServiceItem[] }) {
  const ar = locale === 'ar';
  const cards = featuredServiceIds.flatMap(id => services.filter(s => s.id === id));
  const more = services.filter(s => !featuredServiceIds.includes(s.id));
  return <section id="services" className="home-services">
    <div className="agency-shell">
      <div className="home-service-cards">{cards.map(service => <Link className="home-service-card" key={service.id} href={`/${locale}/services#${service.id}`}>
        <Image src={service.image || '/images/hero-3d-banner.png'} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw" />
        <div className="home-service-copy"><h3>{service.title}<ArrowUpRight size={20} aria-hidden="true" /></h3><p>{service.shortDescription}</p></div>
      </Link>)}</div>
      <div className="home-empower">
        <h2>{ar ? 'نصنع لعلامتك حضوراً مختلفاً بحلول مبتكرة' : 'Making brands stand out with fresh, modern solutions'}</h2>
        <p>{ar ? 'من التصوير والإنتاج إلى السيو والفعاليات، نقدم كل ما تحتاجه علامتك تحت سقف واحد.' : 'From shooting and production to SEO and events, everything your brand needs lives under one roof.'}</p>
      </div>
      <ul className="home-more-services">{more.map(s => <li key={s.id}><Link href={`/${locale}/services#${s.id}`}>{s.title}<ArrowUpRight size={16} aria-hidden="true" /></Link></li>)}</ul>
    </div>
  </section>;
}

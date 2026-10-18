import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Locale, ServiceItem } from '@/types/content';
import { getServices } from '@/data/capabilities';

// The four headline services, each fronted by one of the Melon ninja mascots.
const featured = [
  { id: 'brand-identity', mascot: '/images/characters/WhatsApp Image 2025-01-14 at 3.14.18 PM (5).jpeg' },
  { id: 'strategy-marketing', mascot: '/images/characters/WhatsApp Image 2025-01-14 at 3.14.17 PM.jpeg' },
  { id: 'web-development', mascot: '/images/characters/WhatsApp Image 2025-01-13 at 5.52.46 PM.jpeg' },
  { id: 'social-media', mascot: '/images/characters/WhatsApp Image 2025-01-13 at 5.50.01 PM (1).jpeg' },
];

export function ServicesPreview({ locale, services = getServices(locale) }: { locale: Locale; services?: ServiceItem[] }) {
  const ar = locale === 'ar';
  const cards = featured.flatMap(f => { const s = services.find(x => x.id === f.id); return s ? [{ ...s, mascot: f.mascot }] : []; });
  const more = services.filter(s => !featured.some(f => f.id === s.id));
  return <section id="services" className="home-services">
    <div className="agency-shell">
      <div className="home-service-cards">{cards.map(service => <Link className="home-service-card" key={service.id} href={`/${locale}/services#${service.id}`}>
        <Image src={service.mascot} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 25vw" />
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

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { getDynamicContent } from '@/data/store';
import { CtaBanner } from '@/components/home/CtaBanner';
import type { Locale } from '@/types/content';
export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Services | Marketing Melon', description: 'Brand identity, digital marketing, social media, websites, video, photography, motion graphics, events, and paid advertising.' };
export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale: Locale = (await params).locale === 'ar' ? 'ar' : 'en';
  const ar = locale === 'ar';
  const services = getDynamicContent()[locale].services;
  return <>
    <section className="agency-shell page-heading"><p className="eyebrow">{ar ? 'خدماتنا' : 'OUR SERVICES'}</p><h1>{ar ? 'من الفكرة إلى التأثير.' : 'From the first idea. To lasting impact.'}</h1><p>{ar ? 'كل ما تحتاجه علامتك، مع فريق واحد. استكشف خدماتنا واختر نقطة البداية.' : 'Everything your brand needs, brought together by one creative team. Find your next starting point.'}</p></section>
    <div className="agency-shell"><nav className="service-index" aria-label={ar ? 'تصفح الخدمات' : 'Browse services'}>{services.map(s => <a href={`#${s.id}`} key={s.id}>{s.title}<ArrowUpRight size={15} /></a>)}</nav>
      {services.map((s, i) => <section className="service-detail" id={s.id} key={s.id}><div className="service-detail-image"><Image src={s.image || '/images/hero-3d-banner.png'} alt={s.title} fill sizes="(max-width: 800px) 100vw, 45vw" /></div><div><span className="eyebrow">{String(i + 1).padStart(2, '0')} / {ar ? 'إمكانياتنا' : 'OUR CAPABILITIES'}</span><h2>{s.title}</h2><p>{s.fullDescription}</p><ul>{s.scope.map(item => <li key={item}>{item}</li>)}</ul><Link className="pill-button" href={`/${locale}/request-service?service=${s.id}`}>{ar ? 'اطلب هذه الخدمة' : 'Request this service'}<ArrowUpRight size={18} /></Link></div></section>)}
    </div><CtaBanner locale={locale} />
  </>;
}

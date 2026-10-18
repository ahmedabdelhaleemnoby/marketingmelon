import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import { getDynamicContent } from '@/data/store';
import { PageHeader } from '@/components/layout/PageHeader';
import { CtaBanner } from '@/components/home/CtaBanner';
import type { Locale } from '@/types/content';
export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const ar = (await params).locale === 'ar';
  return ar
    ? { title: 'خدماتنا | Marketing Melon', description: 'الهوية البصرية والتسويق الرقمي والسوشيال ميديا والمواقع والفيديو والتصوير والموشن جرافيك والفعاليات والسيو والإعلانات الممولة.' }
    : { title: 'Services | Marketing Melon', description: 'Brand identity, digital marketing, social media, websites, video, photography, motion graphics, events, SEO, and paid advertising.' };
}
export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale: Locale = (await params).locale === 'ar' ? 'ar' : 'en';
  const ar = locale === 'ar';
  const services = getDynamicContent()[locale].services;
  return <>
    <PageHeader locale={locale} crumb={ar ? 'خدماتنا' : 'Our services'} title={ar ? 'نحوّل أفكارك إلى واقع ملموس' : 'Turning visions into tangible reality'}>
      <nav className="service-index" aria-label={ar ? 'تصفح الخدمات' : 'Browse services'}>{services.map(s => <a href={`#${s.id}`} key={s.id}>{s.title}</a>)}</nav>
    </PageHeader>
    <div className="agency-shell service-list">
      {services.map(s => <section className="service-detail" id={s.id} key={s.id}>
        <div className="service-detail-image"><Image src={s.image || '/images/hero-3d-banner.png'} alt="" fill sizes="(max-width: 800px) 100vw, 40vw" /></div>
        <div className="service-detail-copy">
          <h2>{s.title}</h2><p>{s.fullDescription}</p>
          <ul>{s.scope.map(item => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul>
          <Link className="pill-button" href={`/${locale}/request-service?service=${s.id}`}>{ar ? 'اطلب هذه الخدمة' : 'Request this service'}<ArrowUpRight size={18} /></Link>
        </div>
      </section>)}
    </div>
    <CtaBanner locale={locale} />
  </>;
}

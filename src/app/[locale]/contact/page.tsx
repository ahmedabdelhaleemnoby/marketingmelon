import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { getDynamicCompanyData } from '@/data/store';
import { PageHeader } from '@/components/layout/PageHeader';
import { ContactForm } from '@/components/contact/ContactForm';
import { FacebookIcon, LinkedInIcon, InstagramIcon, BehanceIcon, TikTokIcon } from '@/components/ui/SocialIcons';
import type { Locale } from '@/types/content';
export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale: Locale = (await params).locale === 'ar' ? 'ar' : 'en';
  const ar = locale === 'ar';
  return {
    title: ar ? 'تواصل معنا | Marketing Melon' : 'Contact Us | Marketing Melon',
    description: ar ? 'تواصل مع ماركتنج ميلون في السعودية ومصر عبر واتساب أو الهاتف أو البريد الإلكتروني.' : 'Reach Marketing Melon in Saudi Arabia and Egypt by WhatsApp, phone, or email.',
    alternates: { canonical: `https://marketingmelon.online/${locale}/contact`, languages: { en: 'https://marketingmelon.online/en/contact', ar: 'https://marketingmelon.online/ar/contact' } },
  };
}

export default async function ContactPage({ params }: Props) {
  const locale: Locale = (await params).locale === 'ar' ? 'ar' : 'en';
  const ar = locale === 'ar';
  const company = getDynamicCompanyData();
  const { saudi, cairo } = company.phones;
  const offices = [
    { name: ar ? 'مكتب السعودية' : 'Saudi Arabia Office', address: ar ? saudi.addressAr : saudi.address, lines: [{ display: saudi.display, raw: saudi.raw, whatsapp: saudi.whatsappUrl }, ...(saudi.secondaryRaw ? [{ display: saudi.secondaryDisplay || saudi.secondaryRaw, raw: saudi.secondaryRaw, whatsapp: saudi.secondaryWhatsappUrl }] : [])] },
    { name: ar ? 'مكتب مصر' : 'Egypt Office', address: ar ? cairo.addressAr : cairo.address, lines: [{ display: cairo.display, raw: cairo.raw, whatsapp: cairo.whatsappUrl }] },
  ];
  const socials = [
    { name: 'Instagram', Icon: InstagramIcon, url: company.socialLinks.instagram }, { name: 'TikTok', Icon: TikTokIcon, url: company.socialLinks.tiktok },
    { name: 'Behance', Icon: BehanceIcon, url: company.socialLinks.behance }, { name: 'LinkedIn', Icon: LinkedInIcon, url: company.socialLinks.linkedin },
    { name: 'Facebook', Icon: FacebookIcon, url: company.socialLinks.facebook },
  ].filter(s => s.url);
  return <div className="request-page">
    <PageHeader locale={locale} crumb={ar ? 'تواصل معنا' : 'Contact us'} title={ar ? 'لا تنتظر، لنجعل علامتك تتصدر' : 'Don’t wait. Let’s make your brand stand out.'}>
      <p>{ar ? 'أرسل لنا رسالة، أو تواصل مباشرة مع مكتبنا في السعودية أو مصر.' : 'Send us a message, or reach our Saudi Arabia or Egypt office directly.'}</p>
    </PageHeader>
    <div className="agency-shell">
      <Link className="contact-project-link" href={`/${locale}/request-service`}>
        <span><strong>{ar ? 'لديك مشروع؟' : 'Planning a project?'}</strong>{ar ? 'اختر الخدمات التي تحتاجها وسنعود إليك بخطة واضحة.' : 'Pick the services you need and we’ll come back with a clear plan.'}</span>
        <span className="pill-button">{ar ? 'اطلب خدمة' : 'Request service'}<ArrowUpRight size={18} aria-hidden="true" /></span>
      </Link>
      <div className="request-layout">
        <ContactForm locale={locale} whatsappUrl={saudi.whatsappUrl} />
        <aside className="request-aside contact-aside">
          {offices.map(o => <section key={o.name}>
            <h2>{o.name}</h2>
            {o.address && <p><MapPin size={16} aria-hidden="true" />{o.address}</p>}
            {o.lines.map(l => <div className="contact-line" key={l.raw}>
              <a href={`tel:${l.raw}`}><Phone size={16} aria-hidden="true" /><span dir="ltr">{l.display}</span></a>
              {l.whatsapp && <a href={l.whatsapp} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${l.display}`}><MessageCircle size={16} aria-hidden="true" />{ar ? 'واتساب' : 'WhatsApp'}</a>}
            </div>)}
          </section>)}
          <section>
            <h2>{ar ? 'البريد الإلكتروني' : 'Email'}</h2>
            {[company.emails.primary, company.emails.secondary].filter(Boolean).map(e => <a key={e} href={`mailto:${e}`}><Mail size={16} aria-hidden="true" /><span dir="ltr">{e}</span></a>)}
          </section>
          <div className="contact-socials">{socials.map(({ name, Icon, url }) => <a key={name} href={url} target="_blank" rel="noreferrer" aria-label={name}><Icon className="w-4 h-4" /></a>)}</div>
        </aside>
      </div>
    </div>
  </div>;
}

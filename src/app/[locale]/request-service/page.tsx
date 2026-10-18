import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Mail, MessageCircle } from 'lucide-react';
import { getDynamicContent, getDynamicCompanyData } from '@/data/store';
import { PageHeader } from '@/components/layout/PageHeader';
import { RequestServiceForm } from '@/components/contact/RequestServiceForm';
import type { Locale } from '@/types/content';
export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale: Locale = (await params).locale === 'ar' ? 'ar' : 'en';
  return {
    title: locale === 'ar' ? 'اطلب خدمة | Marketing Melon' : 'Request a Service | Marketing Melon',
    description: locale === 'ar' ? 'أخبرنا بما تحتاجه علامتك وسيتواصل معك فريق ماركتنج ميلون.' : 'Tell us what your brand needs and the Marketing Melon team will get back to you.',
    alternates: { canonical: `https://marketingmelon.online/${locale}/request-service`, languages: { en: 'https://marketingmelon.online/en/request-service', ar: 'https://marketingmelon.online/ar/request-service' } },
  };
}

export default async function RequestServicePage({ params }: Props) {
  const locale: Locale = (await params).locale === 'ar' ? 'ar' : 'en';
  const ar = locale === 'ar';
  const content = getDynamicContent()[locale];
  const company = getDynamicCompanyData();
  return <div className="request-page">
    <PageHeader locale={locale} crumb={ar ? 'اطلب خدمة' : 'Request service'} title={ar ? 'لنعمل معاً ونصنع أثراً' : 'Let’s work together and make an impact'} />
    <div className="agency-shell">
      <div className="request-layout">
        <Suspense fallback={<div className="request-form" aria-busy="true" />}>
          <RequestServiceForm locale={locale} services={content.services} budgetOptions={content.contactPage.form.budgetOptions} whatsappUrl={company.phones.saudi.whatsappUrl} />
        </Suspense>
        <aside className="request-aside">
          <h2>{ar ? 'تفضل التواصل المباشر؟' : 'Prefer to talk directly?'}</h2>
          <p>{ar ? 'فريقنا متاح في السعودية ومصر.' : 'Our team is available in Saudi Arabia and Egypt.'}</p>
          <a href={company.phones.saudi.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" /><span>{ar ? 'واتساب السعودية' : 'WhatsApp Saudi Arabia'}<small dir="ltr">{company.phones.saudi.display}</small></span></a>
          <a href={company.phones.cairo.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} aria-hidden="true" /><span>{ar ? 'واتساب مصر' : 'WhatsApp Egypt'}<small dir="ltr">{company.phones.cairo.display}</small></span></a>
          <a href={`mailto:${company.emails.primary}`}><Mail size={18} aria-hidden="true" /><span>{ar ? 'البريد الإلكتروني' : 'Email'}<small dir="ltr">{company.emails.primary}</small></span></a>
        </aside>
      </div>
    </div>
  </div>;
}

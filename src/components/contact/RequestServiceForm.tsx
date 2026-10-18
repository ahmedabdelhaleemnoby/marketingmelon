'use client';
import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import type { Locale, ServiceItem } from '@/types/content';

// Values are stored in English so the admin inbox reads the same whatever language the visitor used.
const countries = [
  { value: 'Saudi Arabia', en: 'Saudi Arabia', ar: 'السعودية', code: '+966' },
  { value: 'Egypt', en: 'Egypt', ar: 'مصر', code: '+20' },
  { value: 'UAE', en: 'UAE', ar: 'الإمارات', code: '+971' },
  { value: 'Other', en: 'Other', ar: 'أخرى', code: '' },
];
const sources = [
  { value: 'Social media', en: 'Social media', ar: 'السوشيال ميديا' },
  { value: 'Search', en: 'Search engine', ar: 'محركات البحث' },
  { value: 'Friends', en: 'A friend', ar: 'صديق' },
  { value: 'Worked with us before', en: 'Worked with us before', ar: 'تعاملنا من قبل' },
  { value: 'Saw us at an event', en: 'Saw us at an event', ar: 'شاهدتكم في فعالية' },
  { value: 'Other', en: 'Other', ar: 'أخرى' },
];

type Props = { locale: Locale; services: ServiceItem[]; budgetOptions: string[]; whatsappUrl: string };
export function RequestServiceForm({ locale, services, budgetOptions, whatsappUrl }: Props) {
  const ar = locale === 'ar';
  const preselected = useSearchParams()?.get('service');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const chosen = form.getAll('services').map(String);
    if (!chosen.length) { setStatus('error'); setError(ar ? 'اختر خدمة واحدة على الأقل.' : 'Please choose at least one service.'); return; }
    setStatus('sending'); setError('');
    const phone = String(form.get('phone') || '').trim();
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'), email: form.get('email'), phone: phone && `${form.get('dialCode') || ''} ${phone}`.trim(),
          location: form.get('location'), company: form.get('company'), workLocation: form.get('workLocation'),
          budget: form.get('budget'), message: form.get('message'), services: chosen, source: form.get('source'), honeypot: form.get('website'),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) setStatus('sent');
      else { setStatus('error'); setError(data.error || (ar ? 'تعذر إرسال الطلب. حاول مرة أخرى أو راسلنا على واتساب.' : 'We couldn’t send your request. Please try again or message us on WhatsApp.')); }
    } catch {
      setStatus('error'); setError(ar ? 'تحقق من اتصالك بالإنترنت وحاول مرة أخرى.' : 'Check your connection and try again.');
    }
  }

  if (status === 'sent') return <div className="request-done" role="status">
    <CheckCircle2 size={40} aria-hidden="true" />
    <h2>{ar ? 'وصلنا طلبك!' : 'We’ve got your request!'}</h2>
    <p>{ar ? 'سيتواصل معك فريقنا قريباً. للرد الأسرع، راسلنا على واتساب.' : 'Our team will get back to you soon. For the fastest reply, message us on WhatsApp.'}</p>
    <a className="pill-button" href={whatsappUrl} target="_blank" rel="noreferrer">{ar ? 'راسلنا على واتساب' : 'Message us on WhatsApp'}<ArrowUpRight size={18} /></a>
  </div>;

  return <form className="request-form" onSubmit={submit}>
    <div className="request-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>

    <fieldset>
      <legend>{ar ? 'المعلومات العامة' : 'General information'}</legend>
      <div className="request-grid">
        <label className="request-field">{ar ? 'الاسم الكامل' : 'Full name'} *<input name="name" required minLength={2} autoComplete="name" /></label>
        <label className="request-field">{ar ? 'البريد الإلكتروني' : 'Email'} *<input name="email" type="email" required autoComplete="email" dir="ltr" /></label>
        <div className="request-field">
          <label htmlFor="request-phone">{ar ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'} *</label>
          <div className="request-phone" dir="ltr">
            <select name="dialCode" aria-label={ar ? 'كود الدولة' : 'Country code'} defaultValue="+966">{countries.filter(c => c.code).map(c => <option key={c.code} value={c.code}>{c.code}</option>)}</select>
            <input id="request-phone" name="phone" type="tel" required autoComplete="tel-national" inputMode="tel" />
          </div>
        </div>
        <label className="request-field">{ar ? 'موقعك الحالي' : 'Your current location'}<select name="location" defaultValue="">{[<option key="" value="">{ar ? 'اختر الدولة' : 'Choose a country'}</option>, ...countries.map(c => <option key={c.value} value={c.value}>{c[locale]}</option>)]}</select></label>
      </div>
    </fieldset>

    <fieldset>
      <legend>{ar ? 'تفاصيل العمل' : 'Job details'}</legend>
      <div className="request-grid">
        <label className="request-field">{ar ? 'اسم الشركة أو العلامة' : 'Company or brand name'}<input name="company" autoComplete="organization" /></label>
        <label className="request-field">{ar ? 'مكان تنفيذ العمل' : 'Work location'}<select name="workLocation" defaultValue="">{[<option key="" value="">{ar ? 'اختر الدولة' : 'Choose a country'}</option>, ...countries.map(c => <option key={c.value} value={c.value}>{c[locale]}</option>)]}</select></label>
        <label className="request-field">{ar ? 'الميزانية التقديرية' : 'Estimated budget'}<select name="budget" defaultValue="">{[<option key="" value="">{ar ? 'اختر النطاق' : 'Choose a range'}</option>, ...budgetOptions.map(b => <option key={b} value={b}>{b}</option>)]}</select></label>
        <label className="request-field request-wide">{ar ? 'حدثنا عن مشروعك (اختياري)' : 'Tell us about your project (optional)'}<textarea name="message" rows={4} /></label>
      </div>
    </fieldset>

    <fieldset>
      <legend>{ar ? 'الخدمات المطلوبة' : 'The services needed'} *</legend>
      <div className="request-options">{services.map(s => <label key={s.id} className="request-check"><input type="checkbox" name="services" value={s.title} defaultChecked={s.id === preselected} /><span>{s.title}</span></label>)}</div>
    </fieldset>

    <fieldset>
      <legend>{ar ? 'كيف عرفت عنا؟' : 'How did you find us?'}</legend>
      <div className="request-options">{sources.map(s => <label key={s.value} className="request-check"><input type="radio" name="source" value={s.value} /><span>{s[locale]}</span></label>)}</div>
    </fieldset>

    {status === 'error' && <p className="request-error" role="alert">{error}</p>}
    <button className="pill-button request-submit" type="submit" disabled={status === 'sending'}>
      {status === 'sending' ? <><Loader2 size={18} className="animate-spin" aria-hidden="true" />{ar ? 'جارٍ الإرسال…' : 'Sending…'}</> : <>{ar ? 'إرسال الطلب' : 'Send request'}<ArrowUpRight size={18} aria-hidden="true" /></>}
    </button>
  </form>;
}

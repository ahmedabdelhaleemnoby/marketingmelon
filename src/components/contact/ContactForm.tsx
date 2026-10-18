'use client';
import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import type { Locale } from '@/types/content';

// General enquiries; project requests go through RequestServiceForm.
export function ContactForm({ locale, whatsappUrl }: { locale: Locale; whatsappUrl: string }) {
  const ar = locale === 'ar';
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setStatus('sending'); setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.get('name'), email: form.get('email'), phone: form.get('phone'), company: form.get('company'), message: form.get('message'), services: [], source: 'Contact page', honeypot: form.get('website') }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) setStatus('sent');
      else { setStatus('error'); setError(data.error || (ar ? 'تعذر إرسال رسالتك. حاول مرة أخرى أو راسلنا على واتساب.' : 'We couldn’t send your message. Please try again or message us on WhatsApp.')); }
    } catch {
      setStatus('error'); setError(ar ? 'تحقق من اتصالك بالإنترنت وحاول مرة أخرى.' : 'Check your connection and try again.');
    }
  }

  if (status === 'sent') return <div className="request-done" role="status">
    <CheckCircle2 size={40} aria-hidden="true" />
    <h2>{ar ? 'وصلتنا رسالتك!' : 'We’ve got your message!'}</h2>
    <p>{ar ? 'سيتواصل معك فريقنا قريباً. للرد الأسرع، راسلنا على واتساب.' : 'Our team will get back to you soon. For the fastest reply, message us on WhatsApp.'}</p>
    <a className="pill-button" href={whatsappUrl} target="_blank" rel="noreferrer">{ar ? 'راسلنا على واتساب' : 'Message us on WhatsApp'}<ArrowUpRight size={18} /></a>
  </div>;

  return <form className="request-form" onSubmit={submit}>
    <div className="request-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <fieldset>
      <legend>{ar ? 'أرسل لنا رسالة' : 'Send us a message'}</legend>
      <div className="request-grid">
        <label className="request-field">{ar ? 'الاسم الكامل' : 'Full name'} *<input name="name" required minLength={2} autoComplete="name" /></label>
        <label className="request-field">{ar ? 'البريد الإلكتروني' : 'Email'} *<input name="email" type="email" required autoComplete="email" dir="ltr" /></label>
        <label className="request-field">{ar ? 'رقم الهاتف / واتساب' : 'Phone / WhatsApp'}<input name="phone" type="tel" autoComplete="tel" dir="ltr" /></label>
        <label className="request-field">{ar ? 'اسم الشركة أو العلامة' : 'Company or brand name'}<input name="company" autoComplete="organization" /></label>
        <label className="request-field request-wide">{ar ? 'رسالتك' : 'Your message'} *<textarea name="message" rows={5} required minLength={10} /></label>
      </div>
    </fieldset>
    {status === 'error' && <p className="request-error" role="alert">{error}</p>}
    <button className="pill-button request-submit" type="submit" disabled={status === 'sending'}>
      {status === 'sending' ? <><Loader2 size={18} className="animate-spin" aria-hidden="true" />{ar ? 'جارٍ الإرسال…' : 'Sending…'}</> : <>{ar ? 'إرسال الرسالة' : 'Send message'}<ArrowUpRight size={18} aria-hidden="true" /></>}
    </button>
  </form>;
}

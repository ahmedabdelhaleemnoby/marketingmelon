'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { siteContent, companyData } from '@/data/content';
import { Locale } from '@/types/content';
import { Button } from '@/components/ui/Button';
import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Mail,
  Phone,
  ShieldAlert,
} from 'lucide-react';

interface ContactFormProps {
  locale: Locale;
}

export const ContactForm: React.FC<ContactFormProps> = ({ locale }) => {
  const content = siteContent[locale];
  const isRTL = locale === 'ar';
  const searchParams = useSearchParams();
  const preselectedService = searchParams?.get('service') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    services: preselectedService ? [preselectedService] : ([] as string[]),
    budget: '',
    message: '',
    honeypot: '', // bot trap
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'unconfigured' | 'error'>(
    'idle'
  );
  const [errorMessage, setErrorMessage] = useState('');

  const toggleService = (serviceId: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(serviceId);
      if (exists) {
        return { ...prev, services: prev.services.filter((s) => s !== serviceId) };
      } else {
        return { ...prev, services: [...prev.services, serviceId] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
      } else if (data.code === 'PROVIDER_UNCONFIGURED' || res.status === 503) {
        setStatus('unconfigured');
        setErrorMessage(data.error || content.contactPage.form.errorMessage);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Unable to submit inquiry. Please try again or reach us via WhatsApp.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network or connection issue. Please connect directly via WhatsApp or Email below.');
    }
  };

  // Generate mailto link with filled form content for fallback
  const mailtoHref = `mailto:${companyData.emails.primary}?subject=${encodeURIComponent(
    `Project Inquiry from ${formData.name || 'Client'}`
  )}&body=${encodeURIComponent(
    `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.company}\nServices: ${formData.services.join(', ')}\nBudget: ${formData.budget}\n\nProject Overview:\n${formData.message}`
  )}`;

  // Generate pre-filled WhatsApp message
  const whatsappCairoHref = `https://wa.me/201150117387?text=${encodeURIComponent(
    `Hello Marketing Melon, my name is ${formData.name || 'a new client'}. I would like to inquire about: ${formData.services.join(', ') || 'services'}. Message: ${formData.message}`
  )}`;

  return (
    <div className="rounded-3xl bg-white border border-[#EBE8DE] p-6 sm:p-10 shadow-lg relative overflow-hidden">
      {/* Success State */}
      {status === 'success' ? (
        <div className="py-12 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#EBF7F3] text-[#0F4C3A] flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10 text-[#10B981]" />
          </div>
          <div className="space-y-2 max-w-md mx-auto">
            <h3 className="text-2xl font-black text-[#14171A]">
              {content.contactPage.form.successTitle}
            </h3>
            <p className="text-sm text-[#586069] leading-relaxed">
              {content.contactPage.form.successMessage}
            </p>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <Button
              href={companyData.phones.cairo.whatsappUrl}
              isExternal
              variant="secondary"
              size="md"
              icon={<MessageSquare className="w-4 h-4" />}
            >
              {content.cta.directChat}
            </Button>
            <button
              type="button"
              onClick={() => {
                setStatus('idle');
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  company: '',
                  services: [],
                  budget: '',
                  message: '',
                  honeypot: '',
                });
              }}
              className="text-xs text-[#586069] hover:text-[#14171A] underline font-semibold py-2"
            >
              {isRTL ? 'إرسال استفسار آخر' : 'Submit another inquiry'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Honeypot Spam Trap (Hidden from real users) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company_trap">Please leave this field empty</label>
            <input
              type="text"
              id="company_trap"
              name="honeypot"
              tabIndex={-1}
              autoComplete="off"
              value={formData.honeypot}
              onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            />
          </div>

          {/* Unconfigured Provider Honest Banner (when SMTP credentials aren't active yet) */}
          {status === 'unconfigured' && (
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-3">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="text-sm font-bold">
                    {content.contactPage.form.errorTitle}
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    {errorMessage}
                  </p>
                </div>
              </div>
              <div className="pt-2 flex flex-wrap gap-2">
                <Button
                  href={whatsappCairoHref}
                  isExternal
                  variant="primary"
                  size="sm"
                  icon={<MessageSquare className="w-4 h-4" />}
                >
                  {isRTL ? 'إرسال البيانات عبر واتساب فوراً' : 'Send via WhatsApp Now'}
                </Button>
                <Button
                  href={mailtoHref}
                  isExternal
                  variant="outline"
                  size="sm"
                  icon={<Mail className="w-4 h-4" />}
                  className="bg-white"
                >
                  {isRTL ? 'فتح البريد الإلكتروني' : 'Open in Email Client'}
                </Button>
              </div>
            </div>
          )}

          {/* Generic Error Notice */}
          {status === 'error' && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14171A]">
                {content.contactPage.form.nameLabel}
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={content.contactPage.form.namePlaceholder}
                className="w-full px-4 py-3 text-sm rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] focus:bg-white focus:border-[#FF3B53] focus:ring-2 focus:ring-[#FF3B53]/20 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#14171A]">
                {content.contactPage.form.emailLabel}
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={content.contactPage.form.emailPlaceholder}
                className="w-full px-4 py-3 text-sm rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] focus:bg-white focus:border-[#FF3B53] focus:ring-2 focus:ring-[#FF3B53]/20 transition-all outline-none"
              />
            </div>
          </div>

          {/* Phone & Company Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#586069]">
                {content.contactPage.form.phoneLabel}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={content.contactPage.form.phonePlaceholder}
                className="w-full px-4 py-3 text-sm rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] focus:bg-white focus:border-[#FF3B53] focus:ring-2 focus:ring-[#FF3B53]/20 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#586069]">
                {content.contactPage.form.companyLabel}
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder={content.contactPage.form.companyPlaceholder}
                className="w-full px-4 py-3 text-sm rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] focus:bg-white focus:border-[#FF3B53] focus:ring-2 focus:ring-[#FF3B53]/20 transition-all outline-none"
              />
            </div>
          </div>

          {/* Services Multiselect */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#14171A]">
              {content.contactPage.form.servicesLabel}
            </label>
            <div className="flex flex-wrap gap-2">
              {content.services.map((service) => {
                const isSelected = formData.services.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-xl border transition-all text-start cursor-pointer ${
                      isSelected
                        ? 'bg-[#0F4C3A] text-white border-[#0F4C3A] shadow-xs'
                        : 'bg-[#FAF9F5] border-[#EBE8DE] text-[#586069] hover:bg-[#FFF0F2] hover:text-[#FF3B53]'
                    }`}
                  >
                    {service.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget Range Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#586069]">
              {content.contactPage.form.budgetLabel}
            </label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-4 py-3 text-sm rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] focus:bg-white focus:border-[#FF3B53] focus:ring-2 focus:ring-[#FF3B53]/20 transition-all outline-none text-[#14171A]"
            >
              <option value="">{isRTL ? '-- حدد نطاق الميزانية التقديري --' : '-- Select Estimated Budget --'}</option>
              {content.contactPage.form.budgetOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Message / Project Overview */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#14171A]">
              {content.contactPage.form.messageLabel}
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={content.contactPage.form.messagePlaceholder}
              className="w-full px-4 py-3 text-sm rounded-xl border border-[#EBE8DE] bg-[#FAF9F5] focus:bg-white focus:border-[#FF3B53] focus:ring-2 focus:ring-[#FF3B53]/20 transition-all outline-none resize-y"
            />
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={status === 'loading'}
              variant="primary"
              size="lg"
              className="w-full justify-center"
              icon={
                status === 'loading' ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                )
              }
            >
              {status === 'loading'
                ? content.contactPage.form.submitting
                : content.contactPage.form.submitButton}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

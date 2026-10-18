'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { siteContent } from '@/data/content';
import type { Locale } from '@/types/content';

export function Navbar({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const ar = locale === 'ar';
  const other = ar ? 'en' : 'ar';
  const switchPath = pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${other}`);
  useEffect(() => {
    const dialog = menuRef.current;
    if (open) { dialog?.showModal(); document.body.style.overflow = 'hidden'; }
    else { dialog?.close(); document.body.style.overflow = ''; }
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  if (pathname.includes('/admin')) return null;
  const links = siteContent[locale].nav;
  return <>
    <header className="site-header"><div className="agency-shell nav-row"><Logo locale={locale} />
      <nav className="desktop-nav" aria-label={ar ? 'القائمة الرئيسية' : 'Main navigation'}>{links.map(item => <Link key={item.key} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>{item.label}</Link>)}</nav>
      <div className="nav-actions"><Link className="pill-button nav-cta" href={`/${locale}/request-service`}>{ar ? 'طلب خدمة' : 'Request service'}</Link><Link className="round-button" href={switchPath} aria-label={ar ? 'Switch to English' : 'التحويل إلى العربية'}>{ar ? 'EN' : 'ع'}</Link><button ref={trigger} className="round-button menu-trigger" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="navigation-dialog" aria-label={ar ? 'فتح القائمة' : 'Open menu'}><Menu size={22} /></button></div>
    </div></header>
    <dialog ref={menuRef} id="navigation-dialog" className="nav-dialog" onCancel={() => setOpen(false)} onClose={() => { setOpen(false); trigger.current?.focus(); }}>
      <div className="agency-shell"><div className="nav-row"><Logo locale={locale} /><button className="round-button" onClick={() => setOpen(false)} aria-label={ar ? 'إغلاق القائمة' : 'Close menu'}><X /></button></div>
      <nav aria-label={ar ? 'قائمة الهاتف' : 'Mobile navigation'}>{links.map(item => <Link href={item.href} key={item.key} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight /></Link>)}</nav><p>{ar ? 'أفكار جديدة تبدأ بمحادثة.' : 'Fresh ideas start with a conversation.'}</p><Link className="pill-button" href={`/${locale}/request-service`} onClick={() => setOpen(false)}>{ar ? 'لنتحدث' : 'Let’s talk'}<ArrowUpRight size={18} /></Link></div>
    </dialog>
  </>;
}

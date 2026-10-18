import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Locale } from '@/types/content';

// Roar-style inner page header: breadcrumb, one bold title, optional short intro.
export function PageHeader({ locale, crumb, title, children }: { locale: Locale; crumb: string; title: string; children?: ReactNode }) {
  const ar = locale === 'ar';
  return <header className="inner-header">
    <div className="agency-shell">
      <nav className="inner-crumbs" aria-label={ar ? 'مسار التنقل' : 'Breadcrumb'}><Link href={`/${locale}`}>{ar ? 'الرئيسية' : 'Home'}</Link><span aria-hidden="true">/</span><span aria-current="page">{crumb}</span></nav>
      <h1>{title}</h1>
      {children && <div className="inner-intro">{children}</div>}
    </div>
  </header>;
}

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Locale } from '@/types/content';
export function CtaBanner({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  return <section className="agency-shell agency-cta"><div><p className="eyebrow">{ar ? 'الفكرة التالية تبدأ هنا' : 'YOUR NEXT CHAPTER STARTS HERE'}</p><h2>{ar ? 'لنصنع شيئاً\nيستحق أن يُرى.' : 'Let’s make something\nworth seeing.'}</h2></div><Link href={`/${locale}/request-service`} className="pill-button">{ar ? 'ابدأ مشروعك' : 'Start a project'}<ArrowUpRight size={18} /></Link></section>;
}

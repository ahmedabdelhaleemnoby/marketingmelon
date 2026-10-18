import type { Locale } from '@/types/content';
export function PartnersQuote({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  return <section className="agency-partners agency-shell"><p>{ar ? 'كل مشروع يحمل بصمة مختلفة، وعملاؤنا شركاء في كل نجاح' : 'Every project carries its own flavour, and our clients are partners in every success'}</p><div><span>Al Eairy <small>RESIDENCE</small></span><span>trova</span><span>BioLife <small>CLINIC</small></span><span>A26 <small>CAFÉ & LOUNGE</small></span><span>{ar ? 'أثيل' : 'ATHEEL'}</span></div></section>;
}

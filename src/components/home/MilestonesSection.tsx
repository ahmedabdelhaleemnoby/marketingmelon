import type { Locale } from '@/types/content';
import { CountUp } from './CountUp';

// Figures come from the verified case studies in src/data/content.ts.
export function MilestonesSection({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const stats = [
    { value: 3.32, decimals: 2, suffix: 'M+', label: ar ? 'ظهور في نتائج البحث' : 'Organic search impressions' },
    { value: 2.05, decimals: 2, suffix: 'M+', label: ar ? 'ظهور لحملة واحدة' : 'Impressions in a single campaign' },
    { value: 428, decimals: 0, suffix: 'K+', label: ar ? 'ريال مبيعات من الإعلانات' : 'SAR in ad-driven sales' },
    { value: 9, decimals: 0, suffix: '', label: ar ? 'تخصصات إبداعية' : 'Creative disciplines' },
  ];
  return <section className="home-milestones">
    <div className="agency-shell">
      <div className="home-milestones-copy">
        <h2>{ar ? 'إنجازاتنا' : 'Our Milestones'}</h2>
        <p>{ar ? 'من أول مشروع حتى اليوم ونحن ننافس أنفسنا. كل حملة نطلقها تتعلم من سابقتها، لنقدم لعملائنا في مصر والسعودية نتائج أفضل في كل مرة.' : 'From our first project until today, we compete with ourselves. Every campaign learns from the last, so our clients in Egypt and Saudi Arabia get better results every time.'}</p>
      </div>
      <dl className="home-stats">{stats.map(s => <div key={s.label}><dt>{s.label}</dt><dd dir="ltr"><CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} /></dd></div>)}</dl>
    </div>
  </section>;
}

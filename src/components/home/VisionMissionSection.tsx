import { Eye, Flag } from 'lucide-react';
import type { Locale } from '@/types/content';
export function VisionMissionSection({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const rows = [
    { Icon: Eye, label: ar ? 'رؤيتنا' : 'Our Vision', text: ar ? 'أن نكون الشريك التسويقي الأكثر تأثيراً للعلامات الطموحة، ونصنع لها حضوراً رقمياً لا يُنسى.' : 'To be the most impactful marketing partner for ambitious brands, building a digital presence people remember.' },
    { Icon: Flag, label: ar ? 'رسالتنا' : 'Our Mission', text: ar ? 'نحوّل الأفكار إلى قصص نجاح بالإبداع والاستراتيجية والبيانات، لنحقق لعملائنا نمواً مستداماً.' : 'We turn ideas into success stories through creativity, strategy, and data that drive sustainable growth for our clients.' },
  ];
  return <section className="home-vision agency-shell">{rows.map(({ Icon, label, text }) => <div key={label}><h2><span><Icon size={18} aria-hidden="true" /></span>{label}</h2><p>{text}</p></div>)}</section>;
}

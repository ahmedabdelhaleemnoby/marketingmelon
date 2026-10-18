'use client';
import { useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { disciplines, orderedProjects, projectDisciplines } from '@/lib/portfolio';
import type { ProjectItem, Locale } from '@/types/content';
export function PortfolioFilter({ projects, locale, preview = false }: { projects: ProjectItem[]; locale: Locale; preview?: boolean }) {
  const [active, setActive] = useState('all');
  const [client, setClient] = useState('all');
  const ar = locale === 'ar';
  const ordered = orderedProjects(projects);
  const clients = [...new Set(ordered.map(p => p.client))];
  const filtered = ordered.filter(p => (active === 'all' || projectDisciplines(p).some(d => d === active)) && (client === 'all' || p.client === client));
  const visible = preview && active === 'all' ? filtered.slice(0, 6) : filtered;
  return <div>
    <div className="portfolio-toolbar"><div className="portfolio-tabs" role="group" aria-label={ar ? 'تصفية الأعمال' : 'Filter work'}><button aria-pressed={active === 'all'} onClick={() => setActive('all')}>{ar ? 'الكل' : 'View all'}</button>{disciplines.map(d => <button key={d.key} aria-pressed={active === d.key} onClick={() => setActive(d.key)}>{d[locale]}</button>)}</div>
      {!preview && <label className="client-filter">{ar ? 'العميل' : 'Client'}<select value={client} onChange={e => setClient(e.target.value)}><option value="all">{ar ? 'كل العملاء' : 'All clients'}</option>{clients.map(c => <option key={c} value={c}>{c}</option>)}</select></label>}
    </div>
    <p className="sr-only" role="status">{visible.length} {ar ? 'مشروع' : 'projects'}</p>
    {visible.length ? <div className="portfolio-grid">{visible.map(p => <ProjectCard key={p.slug} project={p} locale={locale} />)}</div> : <div className="portfolio-empty"><h3>{ar ? 'المزيد من الأعمال قريباً' : 'More work on the way'}</h3><p>{ar ? 'استكشف مشاريعنا الأخرى، أو تواصل معنا لمناقشة ما تحتاجه.' : 'Explore our other projects, or get in touch to discuss what you have in mind.'}</p><button className="text-link" onClick={() => { setActive('all'); setClient('all'); }}>{ar ? 'عرض كل الأعمال' : 'View all work'}</button></div>}
  </div>;
}

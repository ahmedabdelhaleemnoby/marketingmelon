import type { Discipline, Locale, ProjectItem } from '@/types/content';
export const disciplines: { key: Discipline; en: string; ar: string }[] = [
  { key: 'branding', en: 'Branding', ar: 'الهوية البصرية' }, { key: 'social', en: 'Social Media', ar: 'السوشيال ميديا' },
  { key: 'web', en: 'Programming & Design', ar: 'البرمجة والتصميم' }, { key: 'photography', en: 'Photography', ar: 'التصوير الفوتوغرافي' },
  { key: 'videography', en: 'Videography', ar: 'الفيديو' }, { key: 'motion', en: 'Motion Graphics', ar: 'الموشن جرافيك' },
  { key: 'events', en: 'Events', ar: 'الفعاليات' }, { key: 'ads', en: 'Paid Advertising', ar: 'الإعلانات الممولة' },
];
export function projectDisciplines(project: ProjectItem): Discipline[] {
  return project.disciplines || [{ production: 'videography', strategy: 'branding', ads: 'ads', social: 'social', web: 'web' }[project.categoryKey] as Discipline];
}
export function orderedProjects(projects: ProjectItem[]) {
  return projects.filter(p => p.published !== false).toSorted((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999) || Number(Boolean(b.video)) - Number(Boolean(a.video)));
}
export function disciplineLabel(key: Discipline, locale: Locale) { return disciplines.find(d => d.key === key)?.[locale] || key; }
export function mediaUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  if (value.startsWith('/') && !value.startsWith('//') && !value.includes('..') && !value.includes('\\')) return value;
  try { const url = new URL(value); if (url.protocol === 'https:') return value; } catch { /* Invalid input is not rendered. */ }
  return undefined;
}
export function videoEmbed(value: string): string | undefined {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return undefined;
    const youtube = ['youtube.com', 'www.youtube.com', 'youtu.be', 'www.youtu.be'].includes(url.hostname);
    if (youtube) {
      const id = url.hostname.endsWith('youtu.be') ? url.pathname.slice(1) : url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts)\/([\w-]+)/)?.[1];
      if (id && /^[\w-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (['vimeo.com', 'www.vimeo.com', 'player.vimeo.com'].includes(url.hostname)) {
      const id = url.pathname.match(/\/(?:video\/)?(\d+)$/)?.[1];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch { /* Local video. */ }
  return undefined;
}

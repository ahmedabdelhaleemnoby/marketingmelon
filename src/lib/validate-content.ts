import type { siteContent } from '@/data/content';
import { mediaUrl, disciplines } from './portfolio';
export function validateContent(value: unknown): value is typeof siteContent {
  if (!value || typeof value !== 'object') return false;
  for (const locale of ['en', 'ar']) {
    const data = (value as Record<string, unknown>)[locale] as typeof siteContent.en | undefined;
    if (!data || !data.hero || typeof data.hero.subtitle !== 'string' || typeof data.hero.tagline !== 'string' || !data.workSection || !data.servicesSection || !Array.isArray(data.services) || !Array.isArray(data.projects) || data.projects.length > 200) return false;
    const slugs = new Set<string>();
    for (const p of data.projects) {
      if (!p || typeof p.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug) || slugs.has(p.slug)) return false;
      slugs.add(p.slug);
      if (![p.title, p.client, p.summary, p.fullStory, p.category, p.year].every(x => typeof x === 'string') || !Array.isArray(p.verifiedScope) || !p.verifiedScope.every(x => typeof x === 'string') || !Array.isArray(p.tags)) return false;
      if (!['strategy', 'social', 'ads', 'production', 'web'].includes(p.categoryKey)) return false;
      if ([p.video, p.image, p.clientLogo].some(url => url && !mediaUrl(url))) return false;
      if (p.disciplines && (!Array.isArray(p.disciplines) || !p.disciplines.every(d => disciplines.some(item => item.key === d)))) return false;
      if (p.sortOrder !== undefined && (!Number.isFinite(p.sortOrder) || p.sortOrder < 0)) return false;
      if (p.galleryItems && (!Array.isArray(p.galleryItems) || p.galleryItems.some(g => !g || typeof g.title !== 'string' || typeof g.caption !== 'string' || [g.image, g.video].some(url => url && !mediaUrl(url))))) return false;
    }
    for (const s of data.services) if (!s || typeof s.id !== 'string' || !/^[a-z0-9-]+$/.test(s.id) || typeof s.title !== 'string' || typeof s.fullDescription !== 'string' || typeof s.shortDescription !== 'string' || !Array.isArray(s.scope) || !s.scope.every(x => typeof x === 'string') || (s.image && !mediaUrl(s.image))) return false;
  }
  return true;
}

import { MetadataRoute } from 'next';
import { getDynamicContent } from '@/data/store';
import { orderedProjects } from '@/lib/portfolio';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://marketingmelon.online';
  const locales = ['en', 'ar'];
  const projects = orderedProjects(getDynamicContent().en.projects).map(p => `/work/${p.slug}`);
  const routes = ['', '/services', '/work', ...projects, '/about', '/request-service', '/contact'];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            ar: `${baseUrl}/ar${route}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}

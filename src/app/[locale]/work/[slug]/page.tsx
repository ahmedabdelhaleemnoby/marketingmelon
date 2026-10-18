import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check } from 'lucide-react';
import { getDynamicContent } from '@/data/store';
import { ProjectMedia } from '@/components/work/ProjectMedia';
import { PageHeader } from '@/components/layout/PageHeader';
import { CtaBanner } from '@/components/home/CtaBanner';
import { disciplineLabel, projectDisciplines, mediaUrl, orderedProjects } from '@/lib/portfolio';
import type { Locale } from '@/types/content';
export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ locale: string; slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getDynamicContent()[locale === 'ar' ? 'ar' : 'en'].projects.find(p => p.slug === slug && p.published !== false);
  return { title: project ? `${project.client} | Marketing Melon` : 'Project not found', description: project?.summary };
}
export default async function ProjectPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale: Locale = raw === 'ar' ? 'ar' : 'en';
  const ar = locale === 'ar';
  const projects = orderedProjects(getDynamicContent()[locale].projects);
  const index = projects.findIndex(p => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : undefined;
  const logo = mediaUrl(project.clientLogo);
  const gallery = project.galleryItems?.filter(item => item.image || item.video) || [];
  return <>
    <PageHeader locale={locale} parent={{ label: ar ? 'أعمالنا' : 'Our work', href: `/${locale}/work` }} crumb={project.client} title={project.client}>
      <div className="project-tags">{projectDisciplines(project).map(d => <span key={d}>{disciplineLabel(d, locale)}</span>)}</div>
      {logo && <Image src={logo} unoptimized width={160} height={70} alt={`${project.client} logo`} className="client-logo" />}
      <p>{project.summary}</p>
    </PageHeader>
    <div className="agency-shell project-detail">
      <ProjectMedia image={project.image} video={project.video} title={project.title} locale={locale} eager />
      <div className="project-story">
        <div><h2>{project.title}</h2><p>{project.fullStory}</p></div>
        <aside>
          <h3>{ar ? 'ما قدمناه' : 'What we did'}</h3>
          <ul>{project.verifiedScope.map(s => <li key={s}><Check size={16} aria-hidden="true" />{s}</li>)}</ul>
          <Link href={`/${locale}/request-service`} className="pill-button">{ar ? 'لنعمل معاً' : 'Let’s work together'}<ArrowUpRight size={18} /></Link>
        </aside>
      </div>
      {gallery.length > 0 && <section className="project-gallery">
        <h2>{ar ? 'من المشروع' : 'From the project'}</h2>
        <div className="portfolio-grid">{gallery.map((item, i) => <figure key={i}><ProjectMedia image={item.image} video={item.video} title={item.title} locale={locale} /><figcaption><h3>{item.title}</h3><p>{item.caption}</p></figcaption></figure>)}</div>
      </section>}
      {next && <Link className="project-next" href={`/${locale}/work/${next.slug}`}>
        <span>{ar ? 'المشروع التالي' : 'Next project'}</span><strong>{next.client}</strong><ArrowUpRight size={28} aria-hidden="true" />
      </Link>}
    </div>
    <CtaBanner locale={locale} />
  </>;
}

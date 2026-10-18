import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { getDynamicContent } from '@/data/store';
import { ProjectMedia } from '@/components/work/ProjectMedia';
import { CtaBanner } from '@/components/home/CtaBanner';
import { disciplineLabel, projectDisciplines, mediaUrl } from '@/lib/portfolio';
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
  const project = getDynamicContent()[locale].projects.find(p => p.slug === slug && p.published !== false);
  if (!project) notFound();
  const logo = mediaUrl(project.clientLogo);
  return <><section className="agency-shell page-heading"><Link href={`/${locale}/work`} className="text-link"><ArrowLeft size={17} />{ar ? 'كل الأعمال' : 'All work'}</Link><p className="eyebrow mt-6">{projectDisciplines(project).map(d => disciplineLabel(d, locale)).join(' / ')}</p>{logo && <Image src={logo} unoptimized width={160} height={70} alt={project.client} className="client-logo mt-5" />}<h1>{project.client}</h1><p>{project.summary}</p></section>
    <div className="agency-shell project-detail"><ProjectMedia image={project.image} video={project.video} title={project.title} locale={locale} eager /><div className="project-story"><div><p className="eyebrow">{ar ? 'عن المشروع' : 'THE PROJECT'}</p><h2>{project.title}</h2><p>{project.fullStory}</p></div><aside><p className="eyebrow">{ar ? 'ما قدمناه' : 'WHAT WE DID'}</p><ul>{project.verifiedScope.map(s => <li key={s}>{s}</li>)}</ul><Link href={`/${locale}/request-service`} className="text-link">{ar ? 'لنعمل معاً' : 'Let’s work together'}<ArrowUpRight size={17} /></Link></aside></div>
    {!!project.galleryItems?.length && <div className="portfolio-grid">{project.galleryItems.filter(item => item.image || item.video).map((item, i) => <figure key={i}><ProjectMedia image={item.image} video={item.video} title={item.title} locale={locale} /><figcaption className="py-5"><h3 className="font-semibold">{item.title}</h3><p className="text-sm text-[#5a6159] mt-2">{item.caption}</p></figcaption></figure>)}</div>}</div><CtaBanner locale={locale} /></>;
}

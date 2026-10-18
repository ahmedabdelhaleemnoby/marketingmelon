import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { ProjectItem, Locale } from '@/types/content';
import { ProjectMedia } from './ProjectMedia';
import { disciplineLabel, mediaUrl, projectDisciplines } from '@/lib/portfolio';
export function ProjectCard({ project, locale }: { project: ProjectItem; locale: Locale }) {
  const logo = mediaUrl(project.clientLogo);
  return <article className="project-card">
    <ProjectMedia image={project.image} video={project.video} title={project.title} locale={locale} />
    <Link href={`/${locale}/work/${project.slug}`} className="project-meta">
      <div>{logo && <Image src={logo} unoptimized width={100} height={42} alt={`${project.client} logo`} className="client-logo" />}<p className="project-category">{projectDisciplines(project).slice(0, 2).map(d => disciplineLabel(d, locale)).join(' / ')}</p><h3>{project.client}</h3><p className="project-title">{project.title}</p></div><span className="project-arrow"><ArrowUpRight size={23} /></span>
    </Link>
  </article>;
}

'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';
import { mediaUrl, videoEmbed } from '@/lib/portfolio';
import type { Locale } from '@/types/content';

export function ProjectMedia({ image, video, title, locale, eager = false }: { image?: string; video?: string; title: string; locale: Locale; eager?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const source = mediaUrl(video);
  const poster = mediaUrl(image);
  const embed = source ? videoEmbed(source) : undefined;
  const ar = locale === 'ar';
  return <div className="project-media">
    {playing && source ? <>{embed ? <iframe src={embed} title={title} allow="fullscreen; picture-in-picture; encrypted-media" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <video controls autoPlay playsInline preload="metadata" poster={poster} aria-label={title} onError={() => setFailed(true)}><source src={source} /><a href={source}>{ar ? 'افتح الفيديو' : 'Open video'}</a></video>}{failed && <div className="media-error"><p>{ar ? 'تعذر تشغيل الفيديو هنا.' : 'This video could not be played here.'}</p><a href={source} target="_blank" rel="noreferrer">{ar ? 'افتح الملف' : 'Open video file'}<ExternalLink size={15} /></a></div>}</> : <>
      {poster ? <Image unoptimized={poster.startsWith('https:') || poster.startsWith('/uploads/')} src={poster} alt={title} fill sizes="(max-width: 700px) 100vw, 50vw" preload={eager} className="project-cover" /> : <div className="project-placeholder">{title}</div>}
      {source && <button className="video-play" onClick={() => setPlaying(true)} aria-label={`${ar ? 'تشغيل' : 'Play'} ${title}`}><span><Play size={23} fill="currentColor" /></span><span>{ar ? 'شاهد الفيلم' : 'Watch film'}</span></button>}
    </>}
  </div>;
}

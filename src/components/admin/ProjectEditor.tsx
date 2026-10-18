'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUp, Plus, Upload, ExternalLink } from 'lucide-react';
import type { Locale, ProjectItem, Discipline } from '@/types/content';
import { disciplines } from '@/lib/portfolio';

type MediaPatch = Pick<Partial<ProjectItem>, 'image' | 'video' | 'clientLogo' | 'disciplines' | 'published' | 'slug'>;
type Props = { locale: Locale; projects: ProjectItem[]; onChange: (projects: ProjectItem[]) => void; onMedia: (slug: string, patch: MediaPatch) => void; onAdd: (slug: string) => void; onMove: (slug: string, direction: number) => void };
function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  return <label className="editor-field"><span>{label}</span>{multiline ? <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} /> : <input value={value} onChange={e => onChange(e.target.value)} />}</label>;
}
function MediaField({ label, value, kind, onChange }: { label: string; value?: string; kind: 'image' | 'video'; onChange: (value: string) => void }) {
  const [busy, setBusy] = useState(false); const [message, setMessage] = useState('');
  async function upload(file?: File) {
    if (!file) return; setBusy(true); setMessage('');
    try { const body = new FormData(); body.set('file', file); body.set('slot', 'project'); const res = await fetch('/api/admin/upload', { method: 'POST', body }); const data = await res.json(); if (!res.ok) throw new Error(data.error || 'Upload failed'); onChange(data.cleanUrl); setMessage('Uploaded. Save changes to publish. / تم الرفع، احفظ التغييرات للنشر.'); }
    catch (e) { setMessage(e instanceof Error ? e.message : 'Upload failed'); } finally { setBusy(false); }
  }
  return <div className="editor-media"><Field label={label} value={value || ''} onChange={onChange} /><div className="flex flex-wrap items-center gap-3"><label className="editor-upload"><Upload size={15} /><span>{busy ? 'Uploading… / جارٍ الرفع' : 'Upload / رفع ملف'}</span><input type="file" disabled={busy} accept={kind === 'video' ? 'video/mp4,video/webm' : 'image/png,image/jpeg,image/webp,image/gif'} className="sr-only" onChange={e => { void upload(e.target.files?.[0]); e.target.value = ''; }} /></label><span className="text-xs text-[#586069]">{kind === 'video' ? 'MP4 / WebM · 150 MB max · YouTube / Vimeo URL' : 'PNG / JPG / WebP / GIF · 15 MB max'}</span></div><p role="status" className="text-xs text-[#245f36] mt-2">{message}</p></div>;
}
export function ProjectEditor({ locale, projects, onChange, onMedia, onAdd, onMove }: Props) {
  const ar = locale === 'ar';
  const ordered = projects.toSorted((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
  function update(slug: string, patch: Partial<ProjectItem>) { onChange(projects.map(p => p.slug === slug ? { ...p, ...patch } : p)); }
  return <section className="space-y-6 max-w-5xl" dir={ar ? 'rtl' : 'ltr'}>
    <div className="flex flex-wrap items-center justify-between gap-4"><div><h2 className="text-2xl font-bold">{ar ? 'إدارة الأعمال والعملاء' : 'Projects & client work'}</h2><p className="text-sm text-[#586069] mt-2">{ar ? 'أضف الأعمال ورتبها، ثم احفظ التغييرات لعرضها على الموقع.' : 'Add and arrange your work, then save changes to publish it on the website.'}</p></div><button className="pill-button" onClick={() => onAdd(`project-${Date.now()}`)}><Plus size={17} />{ar ? 'مشروع جديد' : 'Add project'}</button></div>
    <details className="editor-guide" open><summary>{ar ? 'دليل سريع: كيف تضيف أعمالك؟' : 'Quick guide: how to publish your work'}</summary><ol><li>{ar ? 'أضف مشروعاً، واكتب اسم العميل والعنوان والوصف باللغتين.' : 'Add a project. Enter the client, title, and story in both languages.'}</li><li>{ar ? 'ارفع صورة الغلاف وشعار العميل. أضف فيديو MP4 أو WebM أو رابط يوتيوب أو فيميو.' : 'Upload the existing cover image and client logo. Add an MP4/WebM video or a YouTube/Vimeo link.'}</li><li>{ar ? 'اختر التخصصات المناسبة، ثم استخدم الأسهم لترتيب الأعمال.' : 'Choose the relevant disciplines and use the arrows to arrange projects.'}</li><li>{ar ? 'فعّل «منشور» ثم اضغط «حفظ التغييرات». ترتيب المشاريع والوسائط مشتركان بين اللغتين؛ النصوص مستقلة.' : 'Enable Published, then click Save Changes. Media and project order are shared between languages; text is edited separately.'}</li></ol></details>
    {ordered.map((project, index) => <article key={project.slug} className="editor-project">
      <div className="editor-project-heading"><div><span className="eyebrow">{String(index + 1).padStart(2, '0')} / {project.client}</span><h3>{project.title || (ar ? 'مشروع جديد' : 'New project')}</h3></div><div className="flex items-center gap-2"><button className="round-button" disabled={index === 0} onClick={() => onMove(project.slug, -1)} aria-label={`${ar ? 'نقل لأعلى' : 'Move up'}: ${project.client}`}><ArrowUp size={17} /></button><button className="round-button" disabled={index === ordered.length - 1} onClick={() => onMove(project.slug, 1)} aria-label={`${ar ? 'نقل لأسفل' : 'Move down'}: ${project.client}`}><ArrowDown size={17} /></button>{project.published !== false && <Link className="round-button" href={`/${locale}/work/${project.slug}`} target="_blank" aria-label={ar ? 'عرض المشروع' : 'View project'}><ExternalLink size={17} /></Link>}</div></div>
      <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={project.published !== false} onChange={e => onMedia(project.slug, { published: e.target.checked })} />{ar ? 'منشور على الموقع' : 'Published on website'}</label>
      <div className="editor-columns"><Field label={ar ? 'اسم العميل' : 'Client name'} value={project.client} onChange={client => update(project.slug, { client })} /><Field label={ar ? 'عنوان المشروع' : 'Project title'} value={project.title} onChange={title => update(project.slug, { title })} /></div>
      <Field label={ar ? 'ملخص المشروع' : 'Project summary'} value={project.summary} onChange={summary => update(project.slug, { summary })} multiline />
      <Field label={ar ? 'قصة المشروع' : 'Project story'} value={project.fullStory} onChange={fullStory => update(project.slug, { fullStory })} multiline />
      <fieldset className="editor-disciplines"><legend>{ar ? 'التخصصات' : 'Disciplines'}</legend>{disciplines.map(d => <label key={d.key}><input type="checkbox" checked={project.disciplines?.includes(d.key) ?? false} onChange={e => { const current = project.disciplines || []; const next: Discipline[] = e.target.checked ? [...current, d.key] : current.filter(x => x !== d.key); onMedia(project.slug, { disciplines: next }); }} />{d[locale]}</label>)}</fieldset>
      <MediaField label={ar ? 'صورة الغلاف أو البوستر' : 'Cover image / video poster'} value={project.image} kind="image" onChange={image => onMedia(project.slug, { image })} />
      <MediaField label={ar ? 'الفيديو الرئيسي' : 'Main video'} value={project.video} kind="video" onChange={video => onMedia(project.slug, { video })} />
      <MediaField label={ar ? 'شعار العميل (اختياري)' : 'Client logo (optional)'} value={project.clientLogo} kind="image" onChange={clientLogo => onMedia(project.slug, { clientLogo })} />
      <details className="editor-guide"><summary>{ar ? 'التفاصيل ومعرض الصور والفيديو' : 'Details & image/video gallery'}</summary>
        <Field label={ar ? 'السنة' : 'Year'} value={project.year} onChange={year => update(project.slug, { year })} />
        <Field label={ar ? 'ما قدمناه (عنصر في كل سطر)' : 'What we did (one item per line)'} value={project.verifiedScope.join('\n')} onChange={text => update(project.slug, { verifiedScope: text.split('\n') })} multiline />
        {(project.galleryItems || []).map((item, i) => { const change = (patch: Partial<typeof item>) => update(project.slug, { galleryItems: project.galleryItems?.map((g, j) => i === j ? { ...g, ...patch } : g) }); return <div className="editor-gallery-item" key={i}><Field label={ar ? 'عنوان العنصر' : 'Gallery item title'} value={item.title} onChange={title => change({ title })} /><Field label={ar ? 'الوصف' : 'Caption'} value={item.caption} onChange={caption => change({ caption })} /><MediaField label={ar ? 'الصورة' : 'Image'} kind="image" value={item.image} onChange={image => change({ image })} /><MediaField label={ar ? 'الفيديو (اختياري)' : 'Video (optional)'} kind="video" value={item.video} onChange={video => change({ video })} /><button className="text-link" onClick={() => update(project.slug, { galleryItems: project.galleryItems?.filter((_, j) => j !== i) })}>{ar ? 'إزالة العنصر من المعرض' : 'Remove from gallery'}</button></div>; })}
        <button className="text-link" onClick={() => update(project.slug, { galleryItems: [...(project.galleryItems || []), { title: '', caption: '', aspectRatio: '16/9' }] })}><Plus size={17} />{ar ? 'إضافة صورة أو فيديو' : 'Add gallery image or video'}</button>
      </details>
    </article>)}
  </section>;
}

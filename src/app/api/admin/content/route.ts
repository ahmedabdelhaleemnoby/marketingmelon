import { NextRequest, NextResponse } from 'next/server';
import { getDynamicContent, getDynamicCompanyData, saveWebsite } from '@/data/store';
import { requireAdmin } from '@/lib/admin-auth';
import { validateContent } from '@/lib/validate-content';
export async function GET(req: NextRequest) {
  const denied = requireAdmin(req); if (denied) return denied;
  return NextResponse.json({ success: true, content: getDynamicContent(), company: getDynamicCompanyData() }, { headers: { 'Cache-Control': 'no-store' } });
}
export async function POST(req: NextRequest) {
  const denied = requireAdmin(req); if (denied) return denied;
  try {
    const text = await req.text();
    if (text.length > 2_000_000) return NextResponse.json({ error: 'Content is too large.' }, { status: 413 });
    const { content, company } = JSON.parse(text);
    if (content && !validateContent(content)) return NextResponse.json({ error: 'Check project slugs, categories, media URLs, and required content fields.' }, { status: 400 });
    if (company && (!company.name || !company.emails?.primary || !company.phones?.cairo || !company.phones?.saudi || !company.socialLinks)) return NextResponse.json({ error: 'Company details are incomplete.' }, { status: 400 });
    const saved = saveWebsite(content, company);
    return NextResponse.json({ success: true, ...saved });
  } catch { return NextResponse.json({ error: 'Unable to save website content. Check the server storage configuration.' }, { status: 500 }); }
}

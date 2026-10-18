import { NextRequest, NextResponse } from 'next/server';
import { adminPassword, checkOrigin, createSession, isAdmin, passwordMatches, sessionCookie } from '@/lib/admin-auth';
const attempts = new Map<string, { count: number; until: number }>();
export async function GET(req: NextRequest) { return NextResponse.json({ authenticated: isAdmin(req), configured: !!adminPassword() }, { headers: { 'Cache-Control': 'no-store' } }); }
export async function POST(req: NextRequest) {
  if (!checkOrigin(req)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  if (!adminPassword()) return NextResponse.json({ error: 'Set ADMIN_PASSWORD on the server before signing in.' }, { status: 503 });
  const key = req.headers.get('x-forwarded-for')?.split(',')[0] || 'local';
  const now = Date.now();
  for (const [ip, attempt] of attempts) if (attempt.until < now) attempts.delete(ip);
  const attempt = attempts.get(key) || { count: 0, until: now + 60_000 };
  if (attempt.count >= 8) return NextResponse.json({ error: 'Too many attempts. Try again in a minute.' }, { status: 429 });
  let password: unknown;
  try { password = (await req.json()).password; } catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }
  if (typeof password !== 'string' || !passwordMatches(password)) { attempts.set(key, { ...attempt, count: attempt.count + 1 }); return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 }); }
  attempts.delete(key);
  const response = NextResponse.json({ success: true });
  response.cookies.set(sessionCookie, createSession(), { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 8 * 60 * 60 });
  return response;
}
export async function DELETE(req: NextRequest) {
  if (!checkOrigin(req)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  const response = NextResponse.json({ success: true }); response.cookies.delete(sessionCookie); return response;
}

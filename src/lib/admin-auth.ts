import { createHmac, createHash, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
export const sessionCookie = 'mm_admin_session';
export function adminPassword() { return process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === 'development' ? 'melon2026' : undefined); }
export function passwordMatches(value: string) {
  const password = adminPassword();
  return !!password && timingSafeEqual(createHash('sha256').update(value).digest(), createHash('sha256').update(password).digest());
}
function signature(value: string) { return createHmac('sha256', adminPassword() || '').update(`marketing-melon:${value}`).digest('hex'); }
export function createSession() { const expiry = String(Date.now() + 8 * 60 * 60 * 1000); return `${expiry}.${signature(expiry)}`; }
export function isAdmin(req: NextRequest) {
  if (!adminPassword()) return false;
  const value = req.cookies.get(sessionCookie)?.value || '';
  const [expiry, mac] = value.split('.');
  if (!expiry || !mac || !/^\d+$/.test(expiry) || Number(expiry) < Date.now() || !/^[a-f0-9]{64}$/.test(mac)) return false;
  return timingSafeEqual(Buffer.from(mac, 'hex'), Buffer.from(signature(expiry), 'hex'));
}
export function checkOrigin(req: NextRequest) {
  const origin = req.headers.get('origin');
  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    const forwardedHost = req.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
    const forwardedProto = req.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
    const expectedHost = forwardedHost || req.headers.get('host') || req.nextUrl.host;
    const expectedProto = forwardedProto || req.nextUrl.protocol.replace(':', '');

    return originUrl.host.toLowerCase() === expectedHost.toLowerCase()
      && originUrl.protocol === `${expectedProto}:`;
  } catch {
    return false;
  }
}
export function requireAdmin(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Please sign in to manage the website.' }, { status: 401 });
  if (!['GET', 'HEAD'].includes(req.method) && !checkOrigin(req)) return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 });
  return null;
}

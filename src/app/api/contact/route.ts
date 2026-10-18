import { NextRequest, NextResponse } from 'next/server';
import { addInquiry } from '@/data/store';

// In-memory rate limiting store (key: IP, value: timestamp array)
const rateLimitStore = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitStore.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitStore.set(ip, validTimestamps);
  return false;
}

// Visitor input is placed in notification emails, so escape it first.
const escapeHtml = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const optionalText = (value: unknown, max = 120) => (typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : undefined);

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'anonymous-client';

    // 1. Rate Limiting Check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please wait a few minutes before submitting another inquiry.',
          code: 'RATE_LIMITED',
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, phone, company, services, budget, message, honeypot } = body;
    const location = optionalText(body.location);
    const workLocation = optionalText(body.workLocation);
    const source = optionalText(body.source);
    const serviceList: string[] = (Array.isArray(services) ? services : services ? [services] : []).filter((s: unknown): s is string => typeof s === 'string').slice(0, 20);

    // 2. Anti-Spam Honeypot Verification
    if (honeypot && honeypot.trim().length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Spam validation failed.',
          code: 'SPAM_DETECTED',
        },
        { status: 400 }
      );
    }

    // 3. Server-Side Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide a valid name (at least 2 characters).',
          code: 'INVALID_NAME',
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide a valid work email address.',
          code: 'INVALID_EMAIL',
        },
        { status: 400 }
      );
    }

    // A project overview is required unless the visitor picked at least one service.
    const overview = typeof message === 'string' ? message.trim() : '';
    if (serviceList.length === 0 && overview.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide a detailed project overview (at least 10 characters).',
          code: 'INVALID_MESSAGE',
        },
        { status: 400 }
      );
    }

    // 4. Record Lead in Admin Store
    const savedInquiry = addInquiry({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      services: serviceList,
      budget: budget || undefined,
      message: overview,
      location,
      workLocation,
      source,
    });

    const details = `
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
      <p><strong>Current location:</strong> ${escapeHtml(location || 'Not provided')}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || 'Not provided')}</p>
      <p><strong>Work location:</strong> ${escapeHtml(workLocation || 'Not provided')}</p>
      <p><strong>Services:</strong> ${escapeHtml(serviceList.join(', ') || 'Not specified')}</p>
      <p><strong>Budget:</strong> ${escapeHtml(budget || 'Not specified')}</p>
      <p><strong>Found us via:</strong> ${escapeHtml(source || 'Not specified')}</p>
      <hr />
      <p><strong>Project overview:</strong></p>
      <p style="white-space: pre-wrap;">${escapeHtml(overview || 'Not provided')}</p>`;

    // 5. Provider Dispatch Check (Resend, SendGrid, or Custom SMTP via Env Vars)
    const resendApiKey = process.env.RESEND_API_KEY;
    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    const contactRecipient = process.env.CONTACT_EMAIL_RECIPIENT || 'info@marketingmelon.online';

    if (resendApiKey) {
      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'inquiries@marketingmelon.online',
            to: [contactRecipient],
            reply_to: email.trim(),
            subject: `New Project Inquiry from ${String(name).trim()} (${company || 'Direct Client'})`,
            html: `<h2>New Project Inquiry - Marketing Melon Website</h2>${details}`,
          }),
        });

        if (emailRes.ok) {
          return NextResponse.json({
            success: true,
            message: 'Inquiry successfully delivered to Marketing Melon Agency.',
            inquiryId: savedInquiry.id,
          });
        }
      } catch (dispatchError) {
        console.error('Email dispatch error:', dispatchError);
      }
    }

    if (sendgridApiKey) {
      try {
        const sendgridRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${sendgridApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: contactRecipient }] }],
            from: { email: process.env.SENDGRID_FROM_EMAIL || 'inquiries@marketingmelon.online' },
            reply_to: { email: email.trim(), name: name.trim() },
            subject: `New Project Inquiry from ${name}`,
            content: [
              {
                type: 'text/html',
                value: `<h2>New Project Inquiry</h2>${details}`,
              },
            ],
          }),
        });

        if (sendgridRes.ok || sendgridRes.status === 202) {
          return NextResponse.json({
            success: true,
            message: 'Inquiry successfully delivered to Marketing Melon Agency.',
            inquiryId: savedInquiry.id,
          });
        }
      } catch (sendgridError) {
        console.error('SendGrid dispatch error:', sendgridError);
      }
    }

    // 6. The inquiry is saved in the admin inbox either way; email is only a notification.
    if (!resendApiKey && !sendgridApiKey) console.warn('Inquiry saved without email notification: no RESEND_API_KEY or SENDGRID_API_KEY set.');
    else console.error('Inquiry saved but the email notification failed to send.');
    return NextResponse.json({ success: true, emailed: false, inquiryId: savedInquiry.id });
  } catch (error) {
    console.error('API Contact Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while processing your inquiry.',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}

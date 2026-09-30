import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting store (key: IP, value: timestamp array)
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

    // 2. Anti-Spam Honeypot Verification
    if (honeypot && honeypot.trim().length > 0) {
      // Bot trapped
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

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please provide a detailed project overview (at least 10 characters).',
          code: 'INVALID_MESSAGE',
        },
        { status: 400 }
      );
    }

    // 4. Provider Dispatch Check (Resend, SendGrid, or Custom SMTP via Env Vars)
    const resendApiKey = process.env.RESEND_API_KEY;
    const sendgridApiKey = process.env.SENDGRID_API_KEY;
    const contactRecipient = process.env.CONTACT_EMAIL_RECIPIENT || 'info@marketingmelon.online';

    // If Resend API Key is configured
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
            subject: `New Project Inquiry from ${name} (${company || 'Direct Client'})`,
            html: `
              <h2>New Project Inquiry - Marketing Melon Website</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
              <p><strong>Company:</strong> ${company || 'Not provided'}</p>
              <p><strong>Services:</strong> ${Array.isArray(services) ? services.join(', ') : services || 'Not specified'}</p>
              <p><strong>Budget Range:</strong> ${budget || 'Not specified'}</p>
              <hr />
              <p><strong>Project Overview:</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            `,
          }),
        });

        if (emailRes.ok) {
          return NextResponse.json({
            success: true,
            message: 'Inquiry successfully delivered to Marketing Melon Agency.',
          });
        }
      } catch (dispatchError) {
        console.error('Email dispatch error:', dispatchError);
      }
    }

    // If SendGrid API Key is configured
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
                value: `
                  <h2>New Project Inquiry</h2>
                  <p><strong>Name:</strong> ${name}</p>
                  <p><strong>Email:</strong> ${email}</p>
                  <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                  <p><strong>Company:</strong> ${company || 'Not provided'}</p>
                  <p><strong>Services:</strong> ${Array.isArray(services) ? services.join(', ') : services || 'Not specified'}</p>
                  <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
                  <hr />
                  <p><strong>Message:</strong></p>
                  <p style="white-space: pre-wrap;">${message}</p>
                `,
              },
            ],
          }),
        });

        if (sendgridRes.ok || sendgridRes.status === 202) {
          return NextResponse.json({
            success: true,
            message: 'Inquiry successfully delivered to Marketing Melon Agency.',
          });
        }
      } catch (sendgridError) {
        console.error('SendGrid dispatch error:', sendgridError);
      }
    }

    // 5. Honest Status: Provider credentials not yet set in environment
    // We never fake success when credentials are missing.
    return NextResponse.json(
      {
        success: false,
        error:
          'Direct email gateway is currently in configuration awaiting API credentials. Please connect directly via Cairo/Saudi WhatsApp or our direct emails below.',
        code: 'PROVIDER_UNCONFIGURED',
        directContacts: {
          email: 'info@marketingmelon.online',
          secondaryEmail: 'marketingmelon1@gmail.com',
          cairoWhatsapp: 'https://wa.me/201150117387',
          saudiWhatsapp: 'https://wa.me/966574128113',
        },
      },
      { status: 503 }
    );
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

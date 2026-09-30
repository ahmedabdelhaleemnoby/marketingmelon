# Marketing Melon Agency Website

A bespoke, production-ready website for **Marketing Melon Agency**, crafted with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and full bilingual support (**English & Arabic**) with native **RTL/LTR** layouts, editorial animations, structured schema markup, and verified brand assets.

---

## 🍉 Key Highlights

- **Bilingual Internationalization (EN / AR)**:
  - Accessible language switching across `/en` and `/ar` routes.
  - Native RTL layout support with appropriate regional typography (`Cairo` for Arabic, `Outfit` for Latin).
  - Dynamic localized OpenGraph, Twitter cards, and Schema.org `MarketingAgency` JSON-LD structured data.
- **Editorial Brand Art Direction**:
  - Warm linen canvas backgrounds (`#FAF9F5`), watermelon coral primary accents (`#FF3B53`), and deep melon rind emerald secondary accents (`#0F4C3A`).
  - Subtle geometric watermelon motifs, custom SVG seed patterns, and glassmorphic navigation.
  - Full respect for `prefers-reduced-motion` settings.
- **5 Verified Core Service Pillars**:
  1. Strategy & Digital Marketing
  2. Social Media & Content Creation
  3. Paid Advertising & Media Buying
  4. Production, Motion & Visual Arts (Ground & Drone filming, CGI, VFX, 3D)
  5. Website & Application Development
- **Verified Client Showcases**:
  - Filterable portfolio and case study detail routes (e.g. `Al Eairy Residence`) grounded in verified public agency updates.
- **Robust Contact Submission & Lead Routing**:
  - Server-side validation with anti-spam honeypot protection.
  - IP-based rate limiting (5 requests per 10 minutes per client).
  - Ready-to-use provider hooks for Resend or SendGrid via environment variables.
  - Honest fallback state with direct one-click WhatsApp to Cairo (`+201150117387`) and Saudi Arabia (`+966574128113`), plus direct emails.

---

## 🚀 Quick Start

### 1. Installation

```bash
# Clone or navigate to the repository
cd marketingmelon

# Install dependencies
npm install
```

### 2. Environment Configuration

Copy the example environment template:

```bash
cp .env.example .env.local
```

Optional email provider variables (if you want automatic server-side email dispatch):

```env
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=inquiries@marketingmelon.online
CONTACT_EMAIL_RECIPIENT=info@marketingmelon.online
```

*(Note: If left empty, the contact form gracefully informs the visitor and presents direct pre-filled WhatsApp and email client buttons).*

### 3. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website in English (`/en`) or Arabic (`/ar`).

### 4. Production Build & Validation

```bash
# Type check and build static/SSR bundles
npm run build

# Start production server
npm run start
```

---

## 📁 Project Architecture

```
marketingmelon/
├── public/                     # Static icons, manifest, and favicon
├── src/
│   ├── app/
│   │   ├── [locale]/           # Localized route tree (en, ar)
│   │   │   ├── about/          # Agency ethos, principles & regional presence
│   │   │   ├── contact/        # Interactive inquiry form & direct channels
│   │   │   ├── services/       # 5 full service pillar breakdowns & deliverables
│   │   │   ├── work/           # Filterable portfolio
│   │   │   │   └── [slug]/     # Verified project case studies (Al Eairy Residence)
│   │   │   ├── layout.tsx      # Root localized layout (RTL/LTR, Fonts, JSON-LD)
│   │   │   └── page.tsx        # Localized Home page
│   │   ├── api/
│   │   │   └── contact/        # Server-side validation, honeypot & dispatch
│   │   ├── globals.css         # Tailwind v4, custom melon palette & animations
│   │   ├── not-found.tsx       # Custom 404 page
│   │   ├── robots.ts           # Robots.txt configuration
│   │   └── sitemap.ts          # Multilingual XML sitemap
│   ├── components/
│   │   ├── contact/            # ContactForm component
│   │   ├── home/               # Hero, Statement, ServicesPreview, WorkPreview, ProcessSection, CtaBanner
│   │   ├── layout/             # Navbar, Footer, Mobile Drawer
│   │   ├── seo/                # JsonLd structured data
│   │   ├── ui/                 # Logo, Button, Badge, WatermelonMotif, SocialIcons
│   │   └── work/               # PortfolioFilter, ProjectCard
│   ├── data/
│   │   └── content.ts          # Structured bilingual dictionary & verified company facts
│   ├── middleware.ts           # Automatic language detection & redirection
│   └── types/
│       └── content.ts          # Strict TypeScript interfaces
├── CONTENT_CHECKLIST.md        # Verified facts vs. proposed copy checklist
├── .env.example                # Documented environment variables
└── README.md                   # Setup and architecture documentation
```

---

## 🔒 Content Truth & Verification Note

All company information implemented on this website strictly adheres to public records from Marketing Melon Agency's profiles (Facebook, LinkedIn, Instagram, and Behance). For detailed breakdown of verified data vs. owner review items, refer to [CONTENT_CHECKLIST.md](file:///Users/ahmedabuzyad/Documents/marketingmelon/CONTENT_CHECKLIST.md).

export type Locale = 'en' | 'ar';

export interface NavItem {
  key: string;
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  scope: string[];
  deliverables: {
    items: string[];
    isProposed?: boolean;
  };
  highlightTag: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  client: string;
  category: string;
  categoryKey: 'strategy' | 'social' | 'ads' | 'production' | 'web';
  year: string;
  summary: string;
  fullStory: string;
  verifiedScope: string[];
  isVerifiedProject: boolean;
  sourceNote: string;
  heroColor: string;
  tags: string[];
  image?: string;
  badge?: string;
  galleryItems?: {
    title: string;
    caption: string;
    aspectRatio: string;
    image?: string;
  }[];
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  positioning: string;
  emails: {
    primary: string;
    secondary: string;
  };
  phones: {
    cairo: {
      display: string;
      raw: string;
      whatsappUrl: string;
      address?: string;
      addressAr?: string;
      note?: string;
    };
    saudi: {
      display: string;
      raw: string;
      secondaryDisplay?: string;
      secondaryRaw?: string;
      whatsappUrl: string;
      secondaryWhatsappUrl?: string;
      address?: string;
      addressAr?: string;
      note?: string;
    };
  };
  socialLinks: {
    facebook: string;
    linkedin: string;
    instagram: string;
    behance: string;
    tiktok?: string;
  };
}


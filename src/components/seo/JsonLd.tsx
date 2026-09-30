import React from 'react';
import { companyData } from '@/data/content';
import { Locale } from '@/types/content';

interface JsonLdProps {
  locale: Locale;
}

export const JsonLd: React.FC<JsonLdProps> = ({ locale }) => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'MarketingAgency',
    name: companyData.name,
    alternateName: locale === 'ar' ? 'وكالة ماركتنج ميلون' : 'Marketing Melon',
    url: 'https://marketingmelon.online',
    slogan: companyData.tagline,
    description: companyData.positioning,
    email: companyData.emails.primary,
    telephone: companyData.phones.cairo.raw,
    address: [
      {
        '@type': 'PostalAddress',
        addressCountry: 'EG',
        addressLocality: 'Cairo',
      },
      {
        '@type': 'PostalAddress',
        addressCountry: 'SA',
        addressLocality: 'Saudi Arabia',
      },
    ],
    areaServed: ['EG', 'SA', 'AE', 'GCC'],
    sameAs: [
      companyData.socialLinks.facebook,
      companyData.socialLinks.linkedin,
      companyData.socialLinks.instagram,
      companyData.socialLinks.behance,
    ],
    knowsAbout: [
      'Digital Marketing Strategy',
      'Social Media Management',
      'Media Buying & Google Ads',
      'Ground and Drone Filming',
      'Motion Graphics and Video Editing',
      'CGI, VFX and 3D Design',
      'Web and Mobile Application Development',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

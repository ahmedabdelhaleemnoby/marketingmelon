import React from 'react';
import type { Metadata } from 'next';
import { Locale } from '@/types/content';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { companyData } from '@/data/content';

interface AdminPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'ar' ? 'ar' : 'en';

  return {
    title: `Admin Control Panel | ${companyData.name}`,
    description: 'WordPress-style content management and graphics control dashboard for Marketing Melon Agency.',
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'ar' ? 'ar' : 'en';

  return <AdminDashboard initialLocale={locale} />;
}

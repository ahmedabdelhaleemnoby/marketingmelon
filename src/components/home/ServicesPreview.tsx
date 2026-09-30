import React from 'react';
import Link from 'next/link';
import { siteContent } from '@/data/content';
import { Locale } from '@/types/content';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Compass,
  Share2,
  TrendingUp,
  Video,
  Layout,
  ArrowUpRight,
  CheckCircle,
} from 'lucide-react';

interface ServicesPreviewProps {
  locale: Locale;
}

export const ServicesPreview: React.FC<ServicesPreviewProps> = ({ locale }) => {
  const content = siteContent[locale];
  const isRTL = locale === 'ar';

  const iconMap: Record<string, React.ReactNode> = {
    Compass: <Compass className="w-6 h-6" />,
    Share2: <Share2 className="w-6 h-6" />,
    TrendingUp: <TrendingUp className="w-6 h-6" />,
    Video: <Video className="w-6 h-6" />,
    Layout: <Layout className="w-6 h-6" />,
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="emerald" size="md">
              {content.servicesSection.eyebrow}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#14171A]">
              {content.servicesSection.title}
            </h2>
            <p className="text-sm sm:text-base text-[#586069] leading-relaxed">
              {content.servicesSection.subtitle}
            </p>
          </div>

          <Button
            href={`/${locale}/services`}
            variant="outline"
            size="md"
            icon={
              <ArrowUpRight
                className={`w-4 h-4 ${isRTL ? 'rotate-[-90deg]' : ''}`}
              />
            }
            className="self-start md:self-auto bg-white"
          >
            {content.cta.allServices}
          </Button>
        </div>

        {/* 5 Service Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {content.services.map((service, index) => {
            const isFeatured = index === 3; // Production & Motion is a major differentiator

            return (
              <div
                key={service.id}
                className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-gradient-to-br from-[#0F4C3A] to-[#0A3629] text-white shadow-lg lg:col-span-2'
                    : 'bg-white border border-[#EBE8DE] text-[#14171A] hover:border-[#FF3B53]/40 card-hover-glow'
                }`}
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        isFeatured
                          ? 'bg-white/15 text-[#80ED99]'
                          : 'bg-[#FFF0F2] text-[#FF3B53]'
                      }`}
                    >
                      {iconMap[service.iconName] || <Compass className="w-6 h-6 text-[#FF3B53]" />}
                    </div>
                    <Badge
                      variant={isFeatured ? 'emerald' : 'charcoal'}
                      size="sm"
                      className={isFeatured ? 'bg-white/10 text-white border-white/20' : ''}
                    >
                      {service.highlightTag}
                    </Badge>
                  </div>

                  {/* Title & Description */}
                  <h3
                    className={`text-xl sm:text-2xl font-bold mb-3 ${
                      isFeatured ? 'text-white' : 'text-[#14171A]'
                    }`}
                  >
                    {service.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-6 ${
                      isFeatured ? 'text-[#C7DBD4]' : 'text-[#586069]'
                    }`}
                  >
                    {service.shortDescription}
                  </p>

                  {/* Scope Checklist */}
                  <div className="space-y-2 mb-8">
                    {service.scope.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                        <CheckCircle
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isFeatured ? 'text-[#80ED99]' : 'text-[#0F4C3A]'
                          }`}
                        />
                        <span className={isFeatured ? 'text-[#EBF7F3]' : 'text-[#3E454F]'}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-current/10 flex items-center justify-between">
                  <Link
                    href={`/${locale}/services#${service.id}`}
                    className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold transition-all group ${
                      isFeatured
                        ? 'text-[#80ED99] hover:text-white'
                        : 'text-[#FF3B53] hover:text-[#E02840]'
                    }`}
                  >
                    <span>{locale === 'en' ? 'Learn More' : 'تفاصيل الخدمة'}</span>
                    <ArrowUpRight
                      className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        isRTL ? 'rotate-[-90deg]' : ''
                      }`}
                    />
                  </Link>

                  <Link
                    href={`/${locale}/contact?service=${encodeURIComponent(service.id)}`}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${
                      isFeatured
                        ? 'bg-white/10 hover:bg-white/20 text-white'
                        : 'bg-[#FAF9F5] hover:bg-[#FFF0F2] text-[#586069] hover:text-[#FF3B53]'
                    }`}
                  >
                    {content.cta.talk}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

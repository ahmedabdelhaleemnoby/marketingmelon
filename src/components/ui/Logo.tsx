import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  locale: 'en' | 'ar';
  variant?: 'light' | 'dark';
  className?: string;
  isLink?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  locale,
  variant = 'light',
  className = '',
  isLink = true,
  size = 'md',
}) => {
  const isDark = variant === 'dark';

  const dimensions = {
    sm: { width: 140, height: 49, container: 'h-8 sm:h-9' },
    md: { width: 180, height: 63, container: 'h-9 sm:h-11' },
    lg: { width: 240, height: 84, container: 'h-12 sm:h-14' },
  };

  const logoSrc = isDark
    ? '/images/logo-white.png'
    : '/images/logo-transparent.png';

  const logoContent = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className={`relative ${dimensions[size].container} w-auto flex items-center`}>
        <Image
          src={logoSrc}
          alt="Marketing Melon Agency Logo"
          width={dimensions[size].width}
          height={dimensions[size].height}
          priority
          className="h-full w-auto object-contain transition-transform duration-200 hover:scale-[1.02]"
        />
      </div>

      {/* Localized descriptor */}
      <span className="sr-only">
        {locale === 'ar' ? 'وكالة ماركتنج ميلون' : 'Marketing Melon Agency'}
      </span>
    </div>
  );

  if (isLink) {
    return (
      <Link
        href={`/${locale}`}
        className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B53] rounded-lg transition-opacity hover:opacity-90"
        aria-label="Marketing Melon Agency Home"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  locale: 'en' | 'ar';
  variant?: 'light' | 'dark';
  className?: string;
  isLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  locale,
  variant = 'light',
  className = '',
  isLink = true,
}) => {
  const isDark = variant === 'dark';

  const logoContent = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Stylized Geometric Watermelon Slice Icon */}
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0F4C3A] to-[#0A3629] p-1.5 shadow-sm ring-1 ring-black/5">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform hover:rotate-6"
          aria-hidden="true"
        >
          {/* Watermelon Rind (Outer Green Arc) */}
          <path
            d="M5 18C5 25.1797 10.8203 31 18 31C25.1797 31 31 25.1797 31 18H5Z"
            fill="#0F4C3A"
          />
          {/* Inner Light Rind White/Mint */}
          <path
            d="M7 18C7 24.0751 11.9249 29 18 29C24.0751 29 29 24.0751 29 18H7Z"
            fill="#EBF7F3"
          />
          {/* Vibrant Coral Melon Flesh */}
          <path
            d="M9 18C9 22.9706 13.0294 27 18 27C22.9706 27 27 22.9706 27 18H9Z"
            fill="#FF3B53"
          />
          {/* Seeds */}
          <circle cx="14" cy="21" r="1.2" fill="#14171A" />
          <circle cx="18" cy="23.5" r="1.2" fill="#14171A" />
          <circle cx="22" cy="21" r="1.2" fill="#14171A" />
          {/* Fresh juice spark */}
          <path
            d="M18 5L19.2 8.8L23 10L19.2 11.2L18 15L16.8 11.2L13 10L16.8 8.8L18 5Z"
            fill="#FF3B53"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span
          className={`font-extrabold tracking-tight text-lg sm:text-xl leading-none ${
            isDark ? 'text-white' : 'text-[#14171A]'
          }`}
        >
          Marketing <span className="text-[#FF3B53]">Melon</span>
        </span>
        <span
          className={`text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase mt-0.5 ${
            isDark ? 'text-[#8C959F]' : 'text-[#586069]'
          }`}
        >
          {locale === 'ar' ? 'وكالة تسويق رقمي' : 'Creative & Growth Agency'}
        </span>
      </div>
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

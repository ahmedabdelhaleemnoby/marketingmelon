import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  icon,
  iconPosition = 'right',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantStyles = {
    primary:
      'bg-[#FF3B53] text-white hover:bg-[#E02840] shadow-sm hover:shadow-md hover:shadow-[#FF3B53]/25 focus-visible:ring-[#FF3B53]',
    secondary:
      'bg-[#0F4C3A] text-white hover:bg-[#0A3629] shadow-sm hover:shadow-md hover:shadow-[#0F4C3A]/25 focus-visible:ring-[#0F4C3A]',
    outline:
      'bg-transparent border-2 border-[#14171A]/15 text-[#14171A] hover:bg-[#14171A]/5 hover:border-[#14171A]/30 focus-visible:ring-[#14171A]',
    ghost:
      'bg-transparent text-[#14171A] hover:bg-[#14171A]/5 focus-visible:ring-[#14171A]',
    white:
      'bg-white text-[#14171A] hover:bg-white/90 shadow-md focus-visible:ring-white',
  };

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5 min-h-[36px]',
    md: 'text-sm px-5 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-base px-7 py-3.5 gap-2.5 min-h-[52px]',
  };

  const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};

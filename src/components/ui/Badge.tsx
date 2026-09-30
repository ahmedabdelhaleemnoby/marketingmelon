import React from 'react';

interface BadgeProps {
  variant?: 'coral' | 'emerald' | 'charcoal' | 'neutral' | 'warning';
  size?: 'sm' | 'md';
  className?: string;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'coral',
  size = 'md',
  className = '',
  children,
}) => {
  const variantStyles = {
    coral: 'bg-[#FFF0F2] text-[#FF3B53] border border-[#FF3B53]/20',
    emerald: 'bg-[#EBF7F3] text-[#0F4C3A] border border-[#0F4C3A]/20',
    charcoal: 'bg-[#14171A]/5 text-[#14171A] border border-[#14171A]/10',
    neutral: 'bg-white text-[#586069] border border-[#EBE8DE] shadow-2xs',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 font-medium rounded-full',
    md: 'text-xs px-3 py-1 font-semibold rounded-full',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 leading-none select-none tracking-wide ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};

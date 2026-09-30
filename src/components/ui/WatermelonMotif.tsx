import React from 'react';

interface WatermelonMotifProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const WatermelonMotif: React.FC<WatermelonMotifProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    hero: 'w-64 h-64 sm:w-80 sm:h-80',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center pointer-events-none select-none ${sizeClasses[size]} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl transform rotate-[-8deg] hover:rotate-0 transition-transform duration-700"
      >
        <defs>
          <linearGradient id="rindGrad" x1="20" y1="100" x2="180" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0F4C3A" />
            <stop offset="1" stopColor="#1B6A53" />
          </linearGradient>
          <linearGradient id="fleshGrad" x1="40" y1="100" x2="160" y2="100" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF3B53" />
            <stop offset="1" stopColor="#FF6B7D" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Coral Glow */}
        <circle cx="100" cy="110" r="70" fill="url(#fleshGrad)" opacity="0.12" filter="url(#softGlow)" />

        {/* Outer Rind Arc */}
        <path
          d="M20 100C20 144.183 55.8172 180 100 180C144.183 180 180 144.183 180 100H20Z"
          fill="url(#rindGrad)"
        />

        {/* Inner Crisp White/Mint Rind */}
        <path
          d="M32 100C32 137.555 62.4447 168 100 168C137.555 168 168 137.555 168 100H32Z"
          fill="#EBF7F3"
        />

        {/* Juicy Coral Flesh */}
        <path
          d="M44 100C44 130.928 69.072 156 100 156C130.928 156 156 130.928 156 100H44Z"
          fill="url(#fleshGrad)"
        />

        {/* Melon Seeds */}
        <g fill="#14171A">
          {/* Left Seeds */}
          <ellipse cx="75" cy="118" rx="4.5" ry="7" transform="rotate(-25 75 118)" />
          <ellipse cx="65" cy="132" rx="4" ry="6" transform="rotate(-35 65 132)" />
          {/* Center Seeds */}
          <ellipse cx="100" cy="125" rx="5" ry="7.5" />
          <ellipse cx="100" cy="142" rx="4.5" ry="6.5" />
          {/* Right Seeds */}
          <ellipse cx="125" cy="118" rx="4.5" ry="7" transform="rotate(25 125 118)" />
          <ellipse cx="135" cy="132" rx="4" ry="6" transform="rotate(35 135 132)" />
        </g>

        {/* Dynamic Energy Sparks */}
        <path d="M100 20L106 40L126 46L106 52L100 72L94 52L74 46L94 40L100 20Z" fill="#FF3B53" opacity="0.9" />
        <circle cx="165" cy="50" r="6" fill="#10B981" opacity="0.8" />
        <circle cx="35" cy="65" r="4.5" fill="#FF3B53" opacity="0.7" />
      </svg>
    </div>
  );
};

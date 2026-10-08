'use client';

import React from 'react';

interface AirlitLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const AirlitLogo: React.FC<AirlitLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const heightClass = size === 'sm' ? 'h-8' : size === 'lg' ? 'h-14' : 'h-11 sm:h-12';

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src="/logo.png"
        alt="AIRLIT — Measure | Understand | Protect"
        className={`${heightClass} w-auto object-contain mix-blend-multiply`}
      />
    </div>
  );
};

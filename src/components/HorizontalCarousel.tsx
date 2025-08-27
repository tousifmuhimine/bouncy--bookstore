/*
================================================================================
 FILE: src/components/HorizontalCarousel.tsx (UPDATE THIS FILE)
 DESC: This component is updated to accept children directly, which resolves the error.
================================================================================
*/
"use client";

import type { FC, ReactNode } from 'react';

interface HorizontalCarouselProps {
  children: ReactNode;
  speedMultiplier?: number;
  itemCount: number; // We need the original item count to calculate duration
}

const HorizontalCarousel: FC<HorizontalCarouselProps> = ({ children, speedMultiplier = 1, itemCount }) => {
  // Calculate a dynamic duration based on the number of items to keep speed consistent.
  const duration = (itemCount * 280) / (50 * speedMultiplier);

  return (
    <div className="w-full overflow-hidden">
      <div 
        className="animate-continuous-scroll"
        style={{ animationDuration: `${duration}s` }}
      >
        {children}
      </div>
    </div>
  );
};

export default HorizontalCarousel;
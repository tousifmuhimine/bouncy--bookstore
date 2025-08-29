/*
================================================================================
 FILE: src/components/HorizontalCarousel.tsx (UPDATE THIS FILE)
 DESC: This file is updated with more robust animation logic to ensure the
       floating effect works correctly on iOS/Safari.
================================================================================
*/
"use client";

import { FC, useRef, useEffect, useState, ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalCarouselProps {
  children: ReactNode;
  itemCount: number;
  speedMultiplier?: number;
}

const HorizontalCarousel: FC<HorizontalCarouselProps> = ({ children, itemCount, speedMultiplier = 1 }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  // FIX: Refactored animation logic for better cross-browser compatibility, especially on iOS.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || itemCount === 0) return;

    // Use a simpler CSS animation for the continuous scroll
    scroller.style.setProperty('--animation-duration', `${itemCount * 5 / speedMultiplier}s`);

    const handleInteractionStart = () => setIsInteracting(true);
    const handleInteractionEnd = () => setIsInteracting(false);

    scroller.addEventListener('pointerdown', handleInteractionStart);
    scroller.addEventListener('pointerup', handleInteractionEnd);
    scroller.addEventListener('pointerleave', handleInteractionEnd);

    return () => {
      scroller.removeEventListener('pointerdown', handleInteractionStart);
      scroller.removeEventListener('pointerup', handleInteractionEnd);
      scroller.removeEventListener('pointerleave', handleInteractionEnd);
    };
  }, [itemCount, speedMultiplier]);

  const handleNav = (direction: 'left' | 'right') => {
    const scroller = scrollerRef.current;
    if (scroller) {
      const scrollAmount = scroller.clientWidth * 0.8;
      scroller.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative group">
      <div
        ref={scrollerRef}
        className="flex overflow-x-auto continuous-scroll-container"
        data-interacting={isInteracting}
      >
        <div className="flex animate-continuous-scroll-inner">
          {children}
        </div>
        <div className="flex animate-continuous-scroll-inner" aria-hidden="true">
          {children}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={() => handleNav('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => handleNav('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default HorizontalCarousel;

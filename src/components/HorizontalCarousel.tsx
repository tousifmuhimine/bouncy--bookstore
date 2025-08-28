/*
================================================================================
 FILE: src/components/HorizontalCarousel.tsx (UPDATE THIS FILE)
 DESC: This component is updated to use a JavaScript animation that runs
       continuously, even during user interaction.
================================================================================
*/
"use client";

import { FC, ReactNode, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface HorizontalCarouselProps {
  children: ReactNode;
}

const HorizontalCarousel: FC<HorizontalCarouselProps> = ({ children }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let animationFrameId: number;

    const scrollAnimation = () => {
      // This animation runs continuously. Manual scrolling will temporarily
      // override it, but the animation will resume from the new position.
      scroller.scrollLeft += 0.5;
      
      // When the scroll position reaches the start of the second set of items,
      // reset it to the beginning to create a seamless loop.
      if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
        scroller.scrollLeft -= scroller.scrollWidth / 2;
      }
      animationFrameId = requestAnimationFrame(scrollAnimation);
    };

    animationFrameId = requestAnimationFrame(scrollAnimation);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array ensures this runs only once

  const scroll = (direction: 'left' | 'right') => {
    const scroller = scrollerRef.current;
    if (scroller) {
      const scrollAmount = scroller.clientWidth * 0.8;
      scroller.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative group">
      <div ref={scrollerRef} className="flex overflow-x-auto custom-scrollbar pb-4">
        {children}
      </div>
       <button 
        onClick={() => scroll('left')} 
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/75"
      >
        <ArrowLeft />
      </button>
      <button 
        onClick={() => scroll('right')} 
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-black/75"
      >
        <ArrowRight />
      </button>
    </div>
  );
};

export default HorizontalCarousel;
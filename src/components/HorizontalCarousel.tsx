/*
================================================================================
 FILE: src/components/HorizontalCarousel.tsx
 DESC: The continuously floating carousel component. Uses CSS animation.
================================================================================
*/
import type { FC, ReactNode } from 'react';

interface HorizontalCarouselProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  speedMultiplier?: number;
}

const HorizontalCarousel = <T extends {}>({ items, renderItem, speedMultiplier = 1 }: HorizontalCarouselProps<T>) => {
  const duration = (items.length * 280) / (50 * speedMultiplier);

  return (
    <div className="w-full overflow-hidden">
      <div 
        className="animate-continuous-scroll"
        style={{ animationDuration: `${duration}s` }}
      >
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex-shrink-0 mx-4">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCarousel;
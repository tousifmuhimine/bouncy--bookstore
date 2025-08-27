/*
================================================================================
 FILE: src/components/BookCarousel.tsx (CREATE THIS NEW FILE)
 DESC: This new Client Component handles rendering book cards in a carousel.
================================================================================
*/
"use client";

import type { FC } from 'react';
import HorizontalCarousel from './HorizontalCarousel';
import BookCard from './BookCard';
import type { Book } from '@/types';

interface BookCarouselProps {
  books: Book[];
  speedMultiplier?: number;
}

const BookCarousel: FC<BookCarouselProps> = ({ books, speedMultiplier = 1 }) => {
  return (
    <HorizontalCarousel itemCount={books.length} speedMultiplier={speedMultiplier}>
      {[...books, ...books].map((book, index) => (
        <div key={`${book.id}-${index}`} className="flex-shrink-0 mx-4">
          <BookCard book={book} displayType="carousel" />
        </div>
      ))}
    </HorizontalCarousel>
  );
};

export default BookCarousel;

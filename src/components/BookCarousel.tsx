/*
================================================================================
 FILE: src/components/BookCarousel.tsx (UPDATE THIS FILE)
 DESC: This file is updated to work with the new robust animation logic in the
       HorizontalCarousel component.
================================================================================
*/
"use client";

import { FC } from 'react';
import HorizontalCarousel from '@/components/HorizontalCarousel';
import BookCard from '@/components/BookCard';
import { Book } from '@/types';

interface BookCarouselProps {
  books: Book[];
  speedMultiplier?: number;
}

const BookCarousel: FC<BookCarouselProps> = ({ books, speedMultiplier = 1 }) => {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <HorizontalCarousel itemCount={books.length} speedMultiplier={speedMultiplier}>
      {books.map((book) => (
        <div key={`${book.id}-carousel`} className="flex-shrink-0 mx-2">
            <BookCard book={book} displayType="carousel" />
        </div>
      ))}
    </HorizontalCarousel>
  );
};

export default BookCarousel;


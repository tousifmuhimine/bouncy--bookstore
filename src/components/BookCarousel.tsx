/*
================================================================================
 FILE: src/components/BookCarousel.tsx (UPDATE THIS FILE)
================================================================================
*/
"use client";

import type { FC } from 'react';
import HorizontalCarousel from './HorizontalCarousel';
import BookCard from './BookCard';
import type { Book } from '@/types';

interface BookCarouselProps {
  books: Book[];
}

const BookCarousel: FC<BookCarouselProps> = ({ books }) => {
  return (
    <HorizontalCarousel>
      {[...books, ...books].map((book, index) => (
        <div key={`${book.id}-${index}`} className="flex-shrink-0 mx-2">
          <BookCard book={book} displayType="carousel" />
        </div>
      ))}
    </HorizontalCarousel>
  );
};

export default BookCarousel;
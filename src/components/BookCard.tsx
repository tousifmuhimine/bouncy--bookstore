/*
================================================================================
 FILE: src/components/BookCard.tsx (UPDATE THIS FILE)
 DESC: This file is updated with more robust responsive styles to prevent text
       overflow on smaller mobile screens.
================================================================================
*/
"use client";

import Link from 'next/link';
import type { FC } from 'react';
import type { Book } from '../types';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface BookCardProps {
  book: Book;
  displayType: 'grid' | 'carousel';
}

const BookCard: FC<BookCardProps> = ({ book, displayType }) => {
  const { addToCart } = useCart();

  const BookImage: FC<{ src: string; alt: string; className: string }> = ({ src, alt, className }) => (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: '2 / 3' }}>
      <img
        src={src}
        alt={alt}
        className={`${className} absolute inset-0 w-full h-full object-cover`}
        onError={(e) => {
          (e.target as HTMLImageElement).onerror = null;
          (e.target as HTMLImageElement).src = 'https://placehold.co/300x450/1e293b/ffffff?text=Bouncy';
        }}
      />
    </div>
  );

  // FIX: Adjusted base widths and text sizes for better mobile view.
  const baseCardStyles = "bg-slate-800 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:shadow-fuchsia-500/10 shadow-md border border-slate-700";
  const baseWidth = "w-32 sm:w-36 md:w-48"; // Slightly larger base width for better text fit
  const baseHeight = "h-auto"; // Allow height to be determined by aspect ratio and content

  if (displayType === 'carousel') {
    return (
      <Link
        href={`/book/${book.id}`}
        className={`${baseCardStyles} ${baseWidth} ${baseHeight} flex flex-col`}
      >
        <BookImage src={book.cover_url} alt={book.title} className="w-full" />
        <div className="p-2 text-center flex flex-col justify-start gap-0.5">
          {/* FIX: Reduced font size and line clamping for smaller screens */}
          <h4 className="text-xs font-bold text-white line-clamp-2">{book.title}</h4>
          <p className="text-[10px] sm:text-xs text-slate-400 line-clamp-1">{book.author}</p>
          <p className="text-xs sm:text-sm font-semibold text-cyan-400">${book.price}</p>
        </div>
      </Link>
    );
  }

  return (
    <div className={`${baseCardStyles} ${baseWidth} ${baseHeight} flex flex-col`}>
      <Link href={`/book/${book.id}`} className="block">
        <BookImage src={book.cover_url} alt={book.title} className="w-full" />
      </Link>
      <div className="p-2 flex flex-col justify-between flex-grow">
        <div className="flex flex-col gap-0.5 mb-2">
          <h3 className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">{book.title}</h3>
          <p className="text-[10px] sm:text-xs text-slate-400 line-clamp-1">{book.author}</p>
        </div>
        <div className="flex flex-col gap-2 mt-auto">
          <p className="text-sm sm:text-base font-bold text-cyan-400">${book.price}</p>
          <div className="flex gap-2">
            <button
              onClick={() => addToCart(book)}
              className="flex-1 bg-cyan-500 text-black font-bold py-1 px-2 rounded-md text-xs sm:text-sm hover:bg-cyan-400 transition-colors"
            >
              Buy
            </button>
            <button
              onClick={() => addToCart(book)}
              className="bg-slate-700 text-white p-1.5 rounded-md hover:bg-slate-600 transition-colors"
            >
              <ShoppingCart size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;


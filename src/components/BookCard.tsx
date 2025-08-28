"use client";

import Link from 'next/link';
import type { FC } from 'react';
import type { Book } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

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

  // Common styles for both grid and carousel
  const baseCardStyles = "bg-slate-800 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-[1.03] hover:shadow-fuchsia-500/10 shadow-md border border-slate-700";
  const baseWidth = "w-28 sm:w-36 md:w-48"; // Consistent responsive widths
  const baseHeight = "h-[12rem] sm:h-[16rem] md:h-[20rem]"; // Fixed height for uniformity

  if (displayType === 'carousel') {
    return (
      <Link
        href={`/book/${book.id}`}
        className={`${baseCardStyles} ${baseWidth} ${baseHeight} flex flex-col`}
        style={{ marginTop: 'env(safe-area-inset-top)', marginBottom: 'env(safe-area-inset-bottom)' }}
      >
        <BookImage src={book.cover_url} alt={book.title} className="w-full h-[50%] object-cover" />
        <div className="p-2 text-center flex flex-col justify-between h-[50%] min-h-[5.5rem] overflow-visible">
          <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 flex-shrink-0">{book.title}</h4>
          <p className="text-sm sm:text-base text-slate-400 line-clamp-2 flex-shrink-0">{book.author}</p>
          <p className="text-xs sm:text-sm text-cyan-400 flex-shrink-0">${book.price}</p>
        </div>
      </Link>
    );
  }

  return (
    <div className={`${baseCardStyles} ${baseWidth} ${baseHeight} flex flex-col`}>
      <Link href={`/book/${book.id}`} className="h-[40%]">
        <BookImage src={book.cover_url} alt={book.title} className="w-full h-full object-cover cursor-pointer" />
      </Link>
      <div className="p-2.5 flex flex-col justify-between h-[60%] min-h-[8rem] overflow-visible">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1 flex-shrink-0">{book.title}</h3>
          <p className="text-sm sm:text-base text-slate-400 line-clamp-2 flex-shrink-0">{book.author}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-base sm:text-lg font-bold text-cyan-400 flex-shrink-0">${book.price}</p>
          <div className="flex gap-2">
            <button
              onClick={() => addToCart(book)}
              className="flex-1 bg-cyan-500 text-black font-bold py-1 px-2 rounded-md text-xs sm:text-sm hover:bg-cyan-400 transition-colors touch-none"
              style={{ touchAction: 'manipulation' }}
            >
              Buy
            </button>
            <button
              onClick={() => addToCart(book)}
              className="bg-slate-700 text-white py-1 px-2 rounded-md hover:bg-slate-600 transition-colors touch-none"
              style={{ touchAction: 'manipulation' }}
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
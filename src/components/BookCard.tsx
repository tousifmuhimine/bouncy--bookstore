"use client";

import Link from 'next/link';
import type { FC } from 'react';
import type { Book } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

interface BookCardProps {
  book: Book;
  displayType: 'grid' | 'carousel';
}

const BookCard: FC<BookCardProps> = ({ book, displayType }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    addToCart(book);
    router.push('/checkout');
  };

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
        <BookImage src={book.cover_url} alt={book.title} className="w-full h-[65%] object-cover" />
        <div className="p-0.5 text-center flex flex-col justify-start gap-0.25 h-[35%] min-h-[4rem] overflow-visible">
          <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 flex-shrink-0">{book.title}</h4>
          <p className="text-sm sm:text-base text-slate-400 line-clamp-2 flex-shrink-0">{book.author}</p>
          <p className="text-xs sm:text-sm text-cyan-400 flex-shrink-0">${book.price}</p>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 border border-slate-700 flex flex-col group">
      <Link href={`/book/${book.id}`}>
        {/* ... BookImage component usage */}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        {/* ... book title, author, price */}
        <div className="flex gap-2">
          <button onClick={handleBuyNow} className="flex-1 bg-cyan-500 text-black font-bold py-2 px-4 rounded-md text-sm hover:bg-cyan-400 transition-colors">Buy</button>
          <button onClick={() => addToCart(book)} className="bg-slate-700 text-white py-2 px-3 rounded-md hover:bg-slate-600 transition-colors"><ShoppingCart size={16}/></button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
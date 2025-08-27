/*
================================================================================
 FILE: src/components/BookCard.tsx (THE FIX IS IN THIS FILE)
================================================================================
*/
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
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={(e) => { 
        (e.target as HTMLImageElement).onerror = null; 
        (e.target as HTMLImageElement).src='https://placehold.co/300x450/1e293b/ffffff?text=Bouncy'; 
      }}
    />
  );

  if (displayType === 'carousel') {
    return (
      <Link href={`/book/${book.id}`} className="w-48 bg-slate-800 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-fuchsia-500/20 shadow-lg border border-slate-700 overflow-hidden">
        {/* FIX: Changed book.cover to book.cover_url */}
        <BookImage src={book.cover_url} alt={book.title} className="w-full h-64 object-cover" />
        <div className="p-2 text-center">
          <h4 className="text-sm font-bold text-white truncate">{book.title}</h4>
          <p className="text-xs text-slate-400">${book.price}</p>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 border border-slate-700 flex flex-col group">
      <Link href={`/book/${book.id}`}>
        {/* FIX: Changed book.cover to book.cover_url */}
        <BookImage src={book.cover_url} alt={book.title} className="w-full h-64 object-cover cursor-pointer" />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{book.title}</h3>
        <p className="text-sm text-slate-400 mb-2">{book.author}</p>
        <p className="text-xl font-bold text-cyan-400 mt-auto mb-4">${book.price}</p>
        <div className="flex gap-2">
          <button onClick={() => addToCart(book)} className="flex-1 bg-cyan-500 text-black font-bold py-2 px-4 rounded-md text-sm hover:bg-cyan-400 transition-colors">Buy</button>
          <button onClick={() => addToCart(book)} className="bg-slate-700 text-white py-2 px-3 rounded-md hover:bg-slate-600 transition-colors"><ShoppingCart size={16}/></button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

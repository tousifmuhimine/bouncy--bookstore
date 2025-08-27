/*
================================================================================
 FILE: src/components/BookClientPage.tsx
================================================================================
*/
"use client";

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import type { FC } from 'react';
import { useCart } from '@/context/CartContext';
import type { Book } from '@/types';

const BookImage: FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className="w-full rounded-lg shadow-2xl border border-slate-700" 
      onError={(e) => { 
        (e.target as HTMLImageElement).onerror = null; 
        (e.target as HTMLImageElement).src='https://placehold.co/300x450/1e293b/ffffff?text=Bouncy'; 
      }}
    />
  );
};

interface BookClientPageProps {
  book: Book;
}

const BookClientPage: FC<BookClientPageProps> = ({ book }) => {
  const { addToCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <Link href="/" className="mb-8 text-cyan-400 hover:text-cyan-300 inline-block">&larr; Back to Home</Link>
       <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
             <BookImage src={book.cover_url} alt={book.title} />
          </div>
          <div className="text-white">
             <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">{book.title}</h1>
             <p className="text-xl text-slate-400 mb-4">{book.author}</p>
             <p className="text-3xl font-bold text-cyan-400 mb-6">${book.price}</p>
             <p className="text-slate-300 mb-8 leading-relaxed">
                A captivating tale that will transport you to another world. This book explores profound themes with unforgettable characters and a gripping plot that will keep you on the edge of your seat.
             </p>
             <div className="flex items-center gap-4">
                <button onClick={() => addToCart(book)} className="flex-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold py-3 px-6 rounded-lg text-lg hover:opacity-90 transition-opacity shadow-lg">Buy Now</button>
                <button onClick={() => addToCart(book)} className="bg-slate-700 text-white py-3 px-5 rounded-lg hover:bg-slate-600 transition-colors"><ShoppingCart size={24}/></button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default BookClientPage;
/*
================================================================================
 FILE: src/components/BookClientPage.tsx (UPDATE THIS FILE)
 DESC: Updated to show existing reviews and include the ReviewForm component.
================================================================================
*/
"use client";

import type { Book, Review } from '@/types';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import ReviewForm from './ReviewForm'; // Import the new form
import { Star } from 'lucide-react';

interface BookClientPageProps {
  book: Book;
  initialReviews: Review[];
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}
      />
    ))}
  </div>
);

export default function BookClientPage({ book, initialReviews }: BookClientPageProps) {
  const { addToCart } = useCart();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    fetchUser();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        <div>
          <img
            src={book.cover_url}
            alt={book.title}
            className="w-full rounded-lg shadow-2xl aspect-[2/3] object-cover"
          />
        </div>
        <div className="flex flex-col h-full">
          <div>
            <span className="text-cyan-400 font-semibold">{book.section}</span>
            <h1 className="text-4xl font-extrabold text-white mt-2">{book.title}</h1>
            <p className="text-lg text-slate-300 mt-2">by {book.author}</p>
            <p className="text-3xl font-bold text-white mt-4">${book.price}</p>
          </div>

          <div className="mt-8 flex-grow">
            <p className="text-slate-400">
              This is a placeholder description. In a real application, this would contain
              a detailed summary of the book, its themes, and why a reader might enjoy it.
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => addToCart(book)}
              className="flex-1 bg-cyan-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors"
            >
              Add to Cart
            </button>
            <button
               onClick={() => addToCart(book, true)}
               className="flex-1 bg-fuchsia-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-fuchsia-700 transition-colors"
             >
               Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* NEW: Reviews Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-white border-b border-slate-700 pb-4 mb-6">
          Reader Reviews ({initialReviews.length})
        </h2>

        {/* Display existing reviews */}
        <div className="space-y-6">
          {initialReviews.length > 0 ? (
            initialReviews.map(review => (
              <div key={review.id} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                    {review.user_name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-bold text-white">{review.user_name}</p>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <p className="text-slate-300">{review.review_text}</p>
              </div>
            ))
          ) : (
            <p className="text-slate-400">No reviews yet. Be the first to write one!</p>
          )}
        </div>

        {/* Display the form for logged-in users */}
        {user && <ReviewForm bookId={book.id} />}
      </div>
    </div>
  );
}

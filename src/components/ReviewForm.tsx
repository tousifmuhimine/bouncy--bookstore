/*
================================================================================
 FILE: src/components/ReviewForm.tsx (NEW FILE)
 DESC: A client component for the 'Write a review' form.
================================================================================
*/
"use client";

import { useState, useRef } from 'react';
import { Star } from 'lucide-react';
import { submitReview } from '@/actions/reviews';

interface ReviewFormProps {
  bookId: number;
}

export default function ReviewForm({ bookId }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = async (formData: FormData) => {
    formData.set('rating', String(rating));
    
    const result = await submitReview(formData);
    
    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else if (result.success) {
      setMessage({ type: 'success', text: result.success });
      formRef.current?.reset();
      setRating(0);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mt-8">
      <h3 className="text-2xl font-bold text-white mb-4">Write a Review</h3>
      <form action={handleFormSubmit} ref={formRef} className="space-y-4">
        <input type="hidden" name="bookId" value={bookId} />
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Your Rating</label>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <button
                  type="button"
                  key={starValue}
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(starValue)}
                >
                  <Star
                    className={`cursor-pointer transition-colors ${
                      starValue <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-slate-600'
                    }`}
                    size={24}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="reviewText" className="block text-sm font-medium text-slate-300">Your Review</label>
          <textarea
            id="reviewText"
            name="reviewText"
            rows={4}
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Tell us what you thought..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={rating === 0}
          className="w-full bg-cyan-500 text-black font-bold py-2 px-4 rounded-md hover:bg-cyan-400 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          Submit Review
        </button>

        {message && (
          <p className={`text-sm text-center ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}

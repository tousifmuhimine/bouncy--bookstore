/*
================================================================================
 FILE: src/components/SiteReviewForm.tsx (UPDATE THIS FILE)
 DESC: Updated to accept the 'existingReview' prop to enable editing.
================================================================================
*/
"use client";

import { useState, useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import { submitSiteReview } from '@/actions/siteReviews';
import type { SiteReview } from '@/types';

// FIX: Added the 'existingReview' prop to this interface
interface SiteReviewFormProps {
  existingReview?: SiteReview | null;
}

export default function SiteReviewForm({ existingReview }: SiteReviewFormProps) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [reviewText, setReviewText] = useState(existingReview?.review_text || '');
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // This useEffect ensures the form updates if the review prop changes
  useEffect(() => {
    setRating(existingReview?.rating || 0);
    setReviewText(existingReview?.review_text || '');
  }, [existingReview]);

  const handleFormSubmit = async (formData: FormData) => {
    formData.set('rating', String(rating));
    
    const result = await submitSiteReview(formData);
    
    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else if (result.success) {
      setMessage({ type: 'success', text: result.success });
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 mt-12 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4 text-center">
        {existingReview ? 'Edit Your Review' : 'Leave a Review'}
      </h3>
      <p className="text-center text-slate-400 mb-6">Let us know how we're doing!</p>
      <form action={handleFormSubmit} ref={formRef} className="space-y-4">
        <div className="flex items-center justify-center gap-2">
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
                  className={`cursor-pointer transition-all duration-200 transform hover:scale-125 ${
                    starValue <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-slate-600'
                  }`}
                  size={32}
                />
              </button>
            );
          })}
        </div>
        
        <div>
          <textarea
            id="reviewText"
            name="reviewText"
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            placeholder="Share your experience..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={rating === 0}
          className="w-full bg-cyan-500 text-black font-bold py-2 px-4 rounded-md hover:bg-cyan-400 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {existingReview ? 'Update Review' : 'Submit Review'}
        </button>

        {message && (
          <p className={`text-sm text-center pt-2 ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {message.text}
          </p>
        )}
      </form>
    </div>
  );
}

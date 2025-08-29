/*
================================================================================
 FILE: src/components/SiteReviewsSection.tsx (UPDATE THIS FILE)
 DESC: This component has been updated with a more compact design and improved
       logic for editing reviews.
================================================================================
*/
"use client";

import type { SiteReview } from '@/types';
import { Star } from 'lucide-react';
import SiteReviewForm from '@/components/SiteReviewForm';
import type { User } from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface SiteReviewsSectionProps {
  reviews: SiteReview[];
  user: User | null;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 justify-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-500'}
      />
    ))}
  </div>
);

export default function SiteReviewsSection({ reviews, user }: SiteReviewsSectionProps) {
  const [userReview, setUserReview] = useState<SiteReview | null>(null);
  // NEW: State to control when the editing form is visible
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user && reviews) {
      const foundReview = reviews.find(r => r.user_id === user.id);
      setUserReview(foundReview || null);
      // Reset editing state if the review changes (e.g., after submission)
      setIsEditing(false);
    }
  }, [reviews, user]);
  
  const floatingReviews = reviews?.slice(0, 5) || [];

  return (
    <div className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-fuchsia-500/10 rounded-full filter blur-3xl opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center mb-16">
          <h2 className="text-3xl font-bold text-white">What Our Readers Are Saying</h2>
          <Link href="/reviews" className="text-cyan-400 hover:text-cyan-300 font-semibold flex-shrink-0">See All &rarr;</Link>
        </div>
        
        {floatingReviews.length > 0 && (
          // FIX: Reduced the height of the container to take up less space
          <div className="relative h-80 flex justify-center items-center">
            {floatingReviews.map((review, index) => {
              const positions = [
                { top: '5%', left: '10%' },
                { top: '55%', left: '5%' },
                { top: '10%', right: '8%' },
                { top: '60%', right: '18%' },
                { top: '30%', left: '45%' },
              ];
              const animationDurations = ['10s', '12s', '9s', '11s', '13s'];
              const position = positions[index % positions.length];
              const duration = animationDurations[index % animationDurations.length];

              return (
                <div
                  key={review.id}
                  // FIX: Made the bubbles smaller (w-48 h-48)
                  className="absolute p-4 w-48 h-48 bg-slate-800/80 backdrop-blur-md rounded-full border border-slate-700 flex flex-col items-center justify-center text-center shadow-2xl"
                  style={{
                    ...position,
                    animation: `float-bubble ${duration} ease-in-out infinite`,
                    animationDelay: `${index * -2}s`,
                  }}
                >
                  <div className="w-10 h-10 mb-2 rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg">
                    {review.user_name.charAt(0)}
                  </div>
                  <p className="font-bold text-xs text-white">{review.user_name}</p>
                  <div className="my-1">
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-slate-400 text-xs italic line-clamp-2">"{review.review_text}"</p>
                </div>
              );
            })}
          </div>
        )}
        
        {/* FIX: Updated logic to show 'Edit' button or the form */}
        {user && (
          userReview && !isEditing ? (
            <div className="text-center mt-8">
              <p className="text-slate-300">Thank you for your review!</p>
              <button onClick={() => setIsEditing(true)} className="mt-2 text-cyan-400 hover:text-cyan-300 font-semibold">
                Edit Your Review
              </button>
            </div>
          ) : (
            <SiteReviewForm existingReview={userReview} />
          )
        )}
      </div>
    </div>
  );
}


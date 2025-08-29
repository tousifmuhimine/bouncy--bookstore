/*
================================================================================
 FILE: src/components/SiteReviewsSection.tsx (UPDATE THIS FILE)
 DESC: Updated to accept the 'user' prop to conditionally show the review form.
================================================================================
*/
import type { SiteReview } from '@/types';
import { Star } from 'lucide-react';
import SiteReviewForm from './SiteReviewForm';
import type { User } from '@supabase/supabase-js';

// FIX: Added the 'user' property to the props interface.
interface SiteReviewsSectionProps {
  reviews: SiteReview[];
  user: User | null;
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

// FIX: The component now accepts the 'user' prop.
export default function SiteReviewsSection({ reviews, user }: SiteReviewsSectionProps) {
  const extendedReviews = reviews && reviews.length > 0 ? [...reviews, ...reviews] : [];

  return (
    <div className="py-16 bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-white mb-12">What Our Readers Are Saying</h2>
        
        {extendedReviews.length > 0 && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900 z-10"></div>
            <div className="flex animate-continuous-scroll" style={{ animationDuration: `${extendedReviews.length * 5}s` }}>
              {extendedReviews.map((review, index) => (
                <div key={`${review.id}-${index}`} className="flex-shrink-0 w-80 mx-4 bg-slate-800 p-6 rounded-lg border border-slate-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xl">
                      {review.user_name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <p className="font-bold text-white">{review.user_name}</p>
                      <StarRating rating={review.rating} />
                    </div>
                  </div>
                  <p className="text-slate-300 italic line-clamp-3">"{review.review_text}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* This check will now work correctly */}
        {user && <SiteReviewForm />}
      </div>
    </div>
  );
}
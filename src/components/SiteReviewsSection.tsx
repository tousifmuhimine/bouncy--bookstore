/*
================================================================================
 FILE: src/components/SiteReviewsSection.tsx (UPDATE THIS FILE)
 DESC: Fixed the build error by removing client-side hooks and moving the logic
       to the server side. Added the 'See All' link and updated the layout.
================================================================================
*/
import type { SiteReview } from '@/types';
import { Star } from 'lucide-react';
import SiteReviewForm from '@/components/SiteReviewForm';
import type { User } from '@supabase/supabase-js';
import HorizontalCarousel from '@/components/HorizontalCarousel';
import Link from 'next/link';

interface SiteReviewsSectionProps {
  reviews: SiteReview[];
  user: User | null;
  userReview?: SiteReview | null; // Add this prop to receive the user's existing review
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

export default function SiteReviewsSection({ reviews, user, userReview = null }: SiteReviewsSectionProps) {
  return (
    <div className="py-16 bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Updated this section to add the 'See All' link */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-white">What Our Readers Are Saying</h2>
          <Link href="/reviews" className="text-cyan-400 hover:text-cyan-300 font-semibold flex-shrink-0">See All &rarr;</Link>
        </div>
        
        {reviews && reviews.length > 0 && (
          <HorizontalCarousel itemCount={reviews.length} speedMultiplier={0.5}>
            {reviews.map((review) => (
              <div key={review.id} className="flex-shrink-0 w-80 mx-4">
                <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 h-full">
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
              </div>
            ))}
          </HorizontalCarousel>
        )}
        
        {user && <SiteReviewForm existingReview={userReview} />}
      </div>
    </div>
  );
}
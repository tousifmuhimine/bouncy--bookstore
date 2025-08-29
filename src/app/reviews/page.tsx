/*
================================================================================
 FILE: src/app/reviews/page.tsx (NEW FILE)
 DESC: A new page to display all site reviews.
================================================================================
*/
import { createClient } from '@/lib/supabase/server';
import type { SiteReview } from '@/types';
import { Star } from 'lucide-react';

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

export default async function AllReviewsPage() {
    const supabase = await createClient();
    const { data: reviews, error } = await supabase
        .from('site_reviews')
        .select<"*", SiteReview>("*")
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching reviews:', error);
        return <p className="text-white text-center p-8">Could not load reviews.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-extrabold text-center text-white mb-12">All Reader Reviews</h1>
            <div className="space-y-6">
                {reviews.map(review => (
                    <div key={review.id} className="bg-slate-800 p-6 rounded-lg border border-slate-700">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xl">
                                {review.user_name.charAt(0)}
                            </div>
                            <div className="ml-4">
                                <p className="font-bold text-white">{review.user_name}</p>
                                <StarRating rating={review.rating} />
                            </div>
                        </div>
                        <p className="text-slate-300 italic">"{review.review_text}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
/*
================================================================================
 FILE: src/app/page.tsx (UPDATE THIS FILE)
 DESC: This is the updated homepage file that fetches and displays the new
       site review section at the bottom.
================================================================================
*/
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import HorizontalCarousel from '@/components/HorizontalCarousel';
import BookCarousel from '@/components/BookCarousel';
import SiteReviewsSection from '@/components/SiteReviewsSection'; // Import the new component
import type { Book, SiteReview } from '@/types'; // Import SiteReview type
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  
  // Fetch books
  const { data: books, error: booksError } = await supabase.from('books').select<"*", Book>("*");

  // Fetch the 10 most recent site reviews
  const { data: siteReviews, error: siteReviewsError } = await supabase
    .from('site_reviews')
    .select<"*", SiteReview>("*")
    .order('created_at', { ascending: false })
    .limit(10);
    
  // Fetch the current user to decide whether to show the review form
  const { data: { user } } = await supabase.auth.getUser();

  if (booksError || !books) {
    console.error('Error fetching books:', booksError);
    return <p className="text-white text-center p-8">Could not load books.</p>;
  }
  
  if (siteReviewsError) {
    console.error('Error fetching site reviews:', siteReviewsError);
    // Don't block the page if reviews fail, just log the error
  }

  const topSells = books.filter(book => book.is_top_sell).slice(0, 10);
  const favorites = books.filter(book => book.is_favorite).slice(0, 10);
  const sections = [...new Set(books.map(book => book.section))];

  return (
    <div className="space-y-16 pb-16">
      <HeroSection />
      <div className="space-y-16">
        {/* Existing sections carousel */}
        <div>
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <h2 className="text-3xl font-bold text-white">Explore Our Sections</h2>
            <Link href="/sections" className="text-cyan-400 hover:text-cyan-300 font-semibold">See All &rarr;</Link>
          </div>
          <HorizontalCarousel itemCount={sections.length} speedMultiplier={2}>
             {sections.map((sectionName, index) => (
               <div key={index} className="flex-shrink-0 mx-2">
                 <Link
                   href={`/sections/${encodeURIComponent(sectionName)}`}
                   className="w-40 sm:w-48 md:w-56 h-32 bg-slate-800/50 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-cyan-500/20 shadow-lg border border-slate-700 hover:border-cyan-500"
                 >
                   <h3 className="text-xl sm:text-2xl font-bold text-white text-center p-2">{sectionName}</h3>
                 </Link>
               </div>
             ))}
           </HorizontalCarousel>
        </div>
        
        {/* Existing Top Sells carousel */}
        <div>
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <h2 className="text-3xl font-bold text-white">Top Sells</h2>
            <Link href="/collection/top-sells" className="text-cyan-400 hover:text-cyan-300 font-semibold">See All &rarr;</Link>
          </div>
          <BookCarousel books={topSells} speedMultiplier={1.2} />
        </div>

        {/* Existing Editor's Favorites carousel */}
        <div>
          <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <h2 className="text-3xl font-bold text-white">Editor's Favorites</h2>
            <Link href="/collection/editors-favorites" className="text-cyan-400 hover:text-cyan-300 font-semibold">See All &rarr;</Link>
          </div>
          <BookCarousel books={favorites} speedMultiplier={1} />
        </div>

      </div>
      
      {/* NEW: Add the site reviews section at the bottom */}
      <SiteReviewsSection reviews={siteReviews || []} user={user} />

    </div>
  );
}

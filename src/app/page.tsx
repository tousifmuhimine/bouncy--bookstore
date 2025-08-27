/*
================================================================================
 FILE: src/app/page.tsx (UPDATE THIS FILE)
 DESC: This page now uses the new BookCarousel client component.
================================================================================
*/
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import HorizontalCarousel from '@/components/HorizontalCarousel';
import BookCarousel from '@/components/BookCarousel'; // Import the new component
import type { Book } from '@/types';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  
  const { data: books, error } = await supabase.from('books').select<"*", Book>("*");

  if (error || !books) {
    console.error('Error fetching books:', error);
    return <p className="text-white text-center p-8">Could not load books.</p>;
  }

  const topSells = books.filter(book => book.is_top_sell).slice(0, 10);
  const favorites = books.filter(book => book.is_favorite).slice(0, 10);
  const sections = [...new Set(books.map(book => book.section))];

  return (
    <div className="space-y-16 pb-16">
      <HeroSection />
      <div className="space-y-16">
         <div>
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
               <h2 className="text-3xl font-bold text-white">Explore Our Sections</h2>
               <Link href="/sections" className="text-cyan-400 hover:text-cyan-300 font-semibold">See All &rarr;</Link>
            </div>
            {/* FIX: The mapping for sections can stay here as it doesn't involve client components with event handlers */}
            <HorizontalCarousel itemCount={sections.length} speedMultiplier={2}>
              {[...sections, ...sections].map((sectionName, index) => (
                <div key={index} className="flex-shrink-0 mx-4">
                  <Link href={`/sections/${encodeURIComponent(sectionName)}`} className="w-64 h-40 bg-slate-800/50 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/20 shadow-lg border border-slate-700 hover:border-cyan-500">
                    <h3 className="text-2xl font-bold text-white text-center">{sectionName}</h3>
                  </Link>
                </div>
              ))}
            </HorizontalCarousel>
         </div>
         <div>
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
               <h2 className="text-3xl font-bold text-white">Top Sells</h2>
               <Link href="/collection/top-sells" className="text-cyan-400 hover:text-cyan-300 font-semibold">See All &rarr;</Link>
            </div>
            {/* FIX: Use the new BookCarousel component to handle rendering */}
            <BookCarousel books={topSells} speedMultiplier={1.2} />
         </div>
         <div>
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
               <h2 className="text-3xl font-bold text-white">Editor's Favorites</h2>
               <Link href="/collection/editors-favorites" className="text-cyan-400 hover:text-cyan-300 font-semibold">See All &rarr;</Link>
            </div>
            <BookCarousel books={favorites} speedMultiplier={1} />
         </div>
      </div>
    </div>
  );
}
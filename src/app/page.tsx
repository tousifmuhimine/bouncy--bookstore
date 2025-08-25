/*
================================================================================
 FILE: src/app/page.tsx (FIXED - Removed onClick)
================================================================================
*/
import Link from 'next/link';
import { bookData, topSells, favorites } from '@/data/books';
import HeroSection from '@/components/HeroSection';
import HorizontalCarousel from '@/components/HorizontalCarousel';
import BookCard from '@/components/BookCard';
import type { BookSection } from '@/types';

export default function Home() {
  const renderSection = (section: BookSection) => {
    console.log('Rendering section:', section.section);
    console.log('Link will be:', `/sections/${encodeURIComponent(section.section)}`);
    
    return (
      <Link 
        href={`/sections/${encodeURIComponent(section.section)}`}
        className="block p-6 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl hover:from-slate-700 hover:to-slate-600 transition-all duration-300 transform hover:scale-105 border border-slate-600 hover:border-cyan-500"
      >
        <h3 className="text-2xl font-bold text-white text-center">
          {section.section}
        </h3>
      </Link>
    );
  };

  return (
    <div className="space-y-16 pb-16">
      <HeroSection />
      <div className="space-y-16">
         <div>
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
               <h2 className="text-3xl font-bold text-white">Explore Our Sections</h2>
               <Link href="/sections" className="text-cyan-400 hover:text-cyan-300 font-semibold">See All &rarr;</Link>
            </div>
            <HorizontalCarousel items={bookData} renderItem={renderSection} speedMultiplier={2} />
         </div>
         <div>
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
               <h2 className="text-3xl font-bold text-white">Top Sells</h2>
               <Link href="/collection/top-sells" className="text-cyan-400 hover:text-cyan-300 font-semibold">See All &rarr;</Link>
            </div>
            <HorizontalCarousel items={topSells} renderItem={(book) => <BookCard book={book} displayType="carousel" />} speedMultiplier={1.2} />
         </div>
         <div>
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
               <h2 className="text-3xl font-bold text-white">Editor's Favorites</h2>
               <Link href="/collection/editors-favorites" className="text-cyan-400 hover:text-cyan-300 font-semibold">See All &rarr;</Link>
            </div>
            <HorizontalCarousel items={favorites} renderItem={(book) => <BookCard book={book} displayType="carousel" />} speedMultiplier={1} />
         </div>
      </div>
    </div>
  );
}
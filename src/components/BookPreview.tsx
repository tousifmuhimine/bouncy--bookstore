/*
================================================================================
 FILE: src/components/BookPreview.tsx (NEW FILE)
 DESC: A new component to display an auto-playing, interactive preview of
       featured books on the homepage.
================================================================================
*/
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Book } from '@/types';

interface BookPreviewProps {
  // We only want books that have preview images
  featuredBooks: Book[];
}

export default function BookPreview({ featuredBooks }: BookPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-cycle the preview every 8 seconds
  useEffect(() => {
    if (featuredBooks.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredBooks.length);
      }, 8000); // 8 seconds

      return () => clearInterval(timer); // Cleanup on component unmount
    }
  }, [featuredBooks.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + featuredBooks.length) % featuredBooks.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredBooks.length);
  };

  if (!featuredBooks || featuredBooks.length === 0) {
    return null; // Don't render if there are no featured books
  }

  const currentBook = featuredBooks[currentIndex];

  return (
    <div className="relative bg-slate-800/50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Book Info */}
          <div className="relative z-10">
            <h2 className="text-sm font-bold uppercase text-cyan-400 tracking-widest">Featured Preview</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white mt-4">{currentBook.title}</h3>
            <p className="text-lg text-slate-300 mt-2">by {currentBook.author}</p>
            <p className="mt-6 text-slate-400 line-clamp-3">
              Get a sneak peek into the captivating world of '{currentBook.title}'. 
              Explore the first few pages and let the story begin.
            </p>
            <Link 
              href={`/book/${currentBook.id}`}
              className="mt-8 inline-block bg-cyan-500 text-black font-bold py-3 px-8 rounded-full hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105"
            >
              See More & Buy Now
            </Link>
          </div>

          {/* Right Side: Fanned Pages Preview */}
          <div className="relative h-96 flex items-center justify-center">
            {currentBook.preview_image_urls?.map((url, index) => (
              <div
                key={index}
                className="absolute w-64 h-80 rounded-lg shadow-2xl transition-all duration-500 ease-in-out"
                style={{
                  transform: `translateX(${(index - 1.5) * 20}px) rotate(${(index - 1.5) * 5}deg)`,
                  zIndex: index,
                }}
              >
                <img 
                  src={url} 
                  alt={`Page ${index + 1} of ${currentBook.title}`} 
                  className="w-full h-full object-cover rounded-lg border-2 border-slate-600"
                />
              </div>
            ))}
            
            {/* Navigation Buttons */}
            {featuredBooks.length > 1 && (
              <>
                <button onClick={handlePrev} className="absolute left-[-2rem] top-1/2 -translate-y-1/2 z-20 bg-slate-700/50 p-2 rounded-full text-white hover:bg-slate-600 transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <button onClick={handleNext} className="absolute right-[-2rem] top-1/2 -translate-y-1/2 z-20 bg-slate-700/50 p-2 rounded-full text-white hover:bg-slate-600 transition-colors">
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
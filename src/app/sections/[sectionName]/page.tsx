/*
================================================================================
 FILE: src/app/sections/[sectionName]/page.tsx (SIMPLE VERSION)
================================================================================
*/
import { use } from 'react';
import Link from 'next/link';
import { bookData } from '@/data/books';
import BookCard from '@/components/BookCard';

interface SectionPageProps {
  params: Promise<{
    sectionName: string;
  }>
}

export default function SectionPage({ params }: SectionPageProps) {
  // Simple approach - just use the hook directly
  const { sectionName: rawSectionName } = use(params);
  const sectionName = decodeURIComponent(rawSectionName);
  
  // Find the section
  const section = bookData.find(s => 
    s.section.toLowerCase() === sectionName.toLowerCase()
  );

  if (!section) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Section not found</h1>
          <p className="text-gray-300 mb-6">
            Looking for: "{sectionName}"
          </p>
          <p className="text-gray-400 mb-8">
            Available sections: {bookData.map(s => s.section).join(', ')}
          </p>
          <Link 
            href="/"
            className="inline-block bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center text-white mb-4">{section.section}</h1>
      <div className="flex justify-center mb-12 flex-wrap gap-2">
        {bookData.map(s => (
          <Link 
            key={s.section} 
            href={`/sections/${encodeURIComponent(s.section)}`}
            className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${
              sectionName.toLowerCase() === s.section.toLowerCase() 
                ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold shadow-lg' 
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            {s.section}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {section.books.map(book => (
          <BookCard key={book.id} book={book} displayType="grid" />
        ))}
      </div>
    </div>
  );
};
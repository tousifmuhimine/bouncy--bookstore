/*
================================================================================
 FILE: src/components/SectionClientPage.tsx
================================================================================
*/
"use client";

import Link from 'next/link';
import BookCard from '@/components/BookCard';
import type { Book } from '@/types';
import type { FC } from 'react';

interface SectionClientPageProps {
  initialBooks: Book[];
  allSections: string[];
  sectionName: string;
}

const SectionClientPage: FC<SectionClientPageProps> = ({ initialBooks, allSections, sectionName }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center text-white mb-4">{sectionName}</h1>
      <div className="flex justify-center mb-12 flex-wrap gap-2">
        {allSections.map(s => (
          <Link 
            key={s} 
            href={`/sections/${encodeURIComponent(s)}`}
            className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${sectionName === s ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold shadow-lg' : 'bg-slate-800 text-gray-300 hover:bg-slate-700'}`}
          >
            {s}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {initialBooks.map(book => (
          <BookCard key={book.id} book={book} displayType="grid" />
        ))}
      </div>
    </div>
  );
};

export default SectionClientPage;

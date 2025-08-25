/*
================================================================================
 FILE: src/app/sections/page.tsx (CREATE THIS FILE)
================================================================================
*/
import Link from 'next/link';
import { bookData } from '@/data/books';

export default function SectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center text-white mb-4">All Sections</h1>
      <p className="text-center text-gray-300 mb-12">Browse books by category</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {bookData.map(section => (
          <Link 
            key={section.section}
            href={`/sections/${encodeURIComponent(section.section)}`}
            className="group block p-6 bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl hover:from-slate-700 hover:to-slate-600 transition-all duration-300 transform hover:scale-105 border border-slate-600 hover:border-cyan-500"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {section.section}
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                {section.books.length} book{section.books.length !== 1 ? 's' : ''}
              </p>
              <div className="flex -space-x-2 justify-center mb-4">
                {section.books.slice(0, 3).map((book, index) => (
                  <div 
                    key={book.id}
                    className="w-8 h-10 bg-gradient-to-br from-cyan-500 to-fuchsia-500 rounded-sm border-2 border-slate-700"
                    style={{ zIndex: 3 - index }}
                  />
                ))}
                {section.books.length > 3 && (
                  <div className="w-8 h-10 bg-slate-600 rounded-sm border-2 border-slate-700 flex items-center justify-center">
                    <span className="text-xs text-white">+{section.books.length - 3}</span>
                  </div>
                )}
              </div>
              <span className="text-cyan-400 group-hover:text-cyan-300 font-semibold">
                Explore →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
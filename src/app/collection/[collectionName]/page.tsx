/*
================================================================================
 FILE: src/app/collection/[collectionName]/page.tsx (UPDATED FOR NEXT.JS 15)
================================================================================
*/
import { use } from 'react';
import Link from 'next/link';
import { topSells, favorites } from '@/data/books';
import type { Book } from '@/types';
import BookCard from '@/components/BookCard';

interface CollectionPageProps {
  params: Promise<{
    collectionName: string;
  }>
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const { collectionName } = use(params);
  let collection: { title: string; books: Book[] } | null = null;

  if (collectionName === 'top-sells') {
    collection = { title: 'Top Sells', books: topSells };
  } else if (collectionName === 'editors-favorites') {
    collection = { title: "Editor's Favorites", books: favorites };
  }

  if (!collection) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Collection not found</h1>
          <p className="text-gray-300 mb-6">
            Looking for: "{collectionName}"
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
      <h1 className="text-4xl font-extrabold text-center text-white mb-12">{collection.title}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {collection.books.map(book => (
          <BookCard key={book.id} book={book} displayType="grid" />
        ))}
      </div>
    </div>
  );
};
/*
================================================================================
 FILE: src/components/CollectionClientPage.tsx
================================================================================
*/
"use client";

import type { Book } from '@/types';
import BookCard from '@/components/BookCard';
import type { FC } from 'react';

interface CollectionClientPageProps {
  collection: {
    title: string;
    books: Book[];
  }
}

const CollectionClientPage: FC<CollectionClientPageProps> = ({ collection }) => {
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

export default CollectionClientPage;
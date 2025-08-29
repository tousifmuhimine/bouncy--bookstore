/*
================================================================================
 FILE: src/components/CollectionClientPage.tsx (UPDATE THIS FILE)
 DESC: This file is updated to receive the pre-fetched book data as a prop,
       ensuring the book details are always available to render.
================================================================================
*/
"use client";

import { useState, useEffect } from 'react';
import type { FC } from 'react';
import type { Book } from '@/types';
import BookCard from './BookCard';

// FIX: Define props interface to accept initial data from the server component.
interface CollectionClientPageProps {
    initialBooks: Book[];
    title: string;
}

const CollectionClientPage: FC<CollectionClientPageProps> = ({ initialBooks, title }) => {
    // FIX: Initialize state with the data passed from the server.
    const [books, setBooks] = useState<Book[]>(initialBooks);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-extrabold text-center text-white mb-4">{title}</h1>
            <p className="text-center text-gray-300 mb-12">Discover our curated selection.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {books.map(book => (
                    <BookCard key={book.id} book={book} displayType="grid" />
                ))}
            </div>
        </div>
    );
};

export default CollectionClientPage;


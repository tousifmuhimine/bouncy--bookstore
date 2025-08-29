/*
================================================================================
 FILE: src/app/book/[bookId]/page.tsx (UPDATE THIS FILE)
 DESC: Fixed a runtime error by providing a fallback empty array for reviews.
================================================================================
*/
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Book, Review } from '@/types';
import BookClientPage from '@/components/BookClientPage';

interface BookPageProps {
  params: {
    bookId: string;
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const supabase = await createClient();
  const bookId = parseInt(params.bookId);

  // Fetch the specific book
  const { data: book, error: bookError } = await supabase
    .from('books')
    .select<"*", Book>("*")
    .eq('id', bookId)
    .single();

  // Fetch the reviews for this book
  const { data: reviews, error: reviewsError } = await supabase
    .from('reviews')
    .select<"*", Review>("*")
    .eq('book_id', bookId)
    .order('created_at', { ascending: false });

  if (bookError || !book) {
    console.error('Error fetching book:', bookError);
    notFound();
  }

  if (reviewsError) {
    console.error('Error fetching reviews:', reviewsError);
    // Don't crash the page if reviews fail to load. We will pass an empty array.
  }

  // FIX: Pass 'reviews || []' to ensure an array is always provided, even if
  // the database returns null (e.g., if there are no reviews).
  return <BookClientPage book={book} initialReviews={reviews || []} />;
}


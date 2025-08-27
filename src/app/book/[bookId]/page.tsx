/*
================================================================================
 FILE: src/app/book/[bookId]/page.tsx (UPDATE THIS FILE)
================================================================================
*/
import { createClient } from '@/lib/supabase/server';
import BookClientPage from '@/components/BookClientPage';
import type { Book } from '@/types';

interface BookPageProps {
  params: {
    bookId: string;
  }
}

export default async function BookPage({ params }: BookPageProps) {
  // FIX: Await the createClient function because it is now async.
  const supabase = await createClient();
  
  const { data: book, error } = await supabase
    .from('books')
    .select<"*", Book>("*")
    .eq('id', parseInt(params.bookId))
    .single();

  if (error || !book) {
    return <div className="text-white text-center py-20">Book not found.</div>;
  }

  return <BookClientPage book={book} />;
}
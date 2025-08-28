/*
================================================================================
 FILE: src/app/book/[bookId]/page.tsx (UPDATE THIS FILE)
 DESC: This file is now a Server Component that fetches data and passes it to a
       new Client Component. This is a more robust pattern.
================================================================================
*/
import { createClient } from '@/lib/supabase/server';
import BookClientPage from '@/components/BookClientPage'; // We will create this new component
import type { Book } from '@/types';

interface BookPageProps {
  params: {
    bookId: string;
  }
}

export default async function BookPage({ params }: BookPageProps) {
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
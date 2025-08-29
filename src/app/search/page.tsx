/*
================================================================================
 FILE: src/app/search/page.tsx (NEW FILE)
 DESC: This is the new page to display the results of a search.
================================================================================
*/
import { createClient } from '@/lib/supabase/server';
import BookCard from '@/components/BookCard';
import type { Book } from '@/types';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const supabase = await createClient();

  let books: Book[] = [];
  let error: any = null;

  if (query) {
    // Perform a text search across multiple columns: title, author, and section
    const { data, error: searchError } = await supabase
      .from('books')
      .select<"*", Book>("*")
      .or(`title.ilike.%${query}%,author.ilike.%${query}%,section.ilike.%${query}%`);
    
    if (searchError) {
      console.error('Error searching books:', searchError);
      error = searchError;
    } else {
      books = data || [];
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-white mb-2">
        Search Results
      </h1>
      
      {query ? (
        <p className="text-lg text-slate-400 mb-8">
          Showing results for: <span className="text-cyan-400 font-semibold">"{query}"</span>
        </p>
      ) : (
        <p className="text-lg text-slate-400 mb-8">
          Please enter a search term to find books.
        </p>
      )}

      {error && (
        <p className="text-red-500 text-center">
          There was an error performing the search. Please try again.
        </p>
      )}

      {!error && books.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {books.map(book => (
            <BookCard key={book.id} book={book} displayType="grid" />
          ))}
        </div>
      )}
      
      {!error && books.length === 0 && query && (
        <div className="text-center py-16">
          <p className="text-2xl font-bold text-white">No books found.</p>
          <p className="text-slate-400 mt-2">
            We couldn't find any books matching your search. Please try a different term.
          </p>
        </div>
      )}
    </div>
  );
}
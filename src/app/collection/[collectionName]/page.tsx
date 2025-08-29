/*
================================================================================
 FILE: src/app/collection/[collectionName]/page.tsx (UPDATE THIS FILE)
 DESC: This file is updated to correctly filter and pass book data to the client
       component, fixing the issue where no book details were shown.
================================================================================
*/
import { createClient } from '../../../lib/supabase/server';
import type { Book } from '@/types';
import CollectionClientPage from '../../../components/CollectionClientPage';

interface CollectionPageProps {
  params: {
    collectionName: string;
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const supabase = await createClient();
  const collectionName = decodeURIComponent(params.collectionName);

  let query = supabase.from('books').select<"*", Book>("*");

  if (collectionName === 'top-sells') {
    query = query.eq('is_top_sell', true);
  } else if (collectionName === 'editors-favorites') {
    query = query.eq('is_favorite', true);
  }

  const { data: books, error } = await query;

  const title = collectionName === 'top-sells' ? 'Top Sells' : "Editor's Favorites";

  if (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    return <p className="text-white text-center p-8">Could not load this collection.</p>;
  }

  // FIX: Pass the fetched books and title as props to the client component.
  return <CollectionClientPage initialBooks={books || []} title={title} />;
}
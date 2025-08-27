/*
================================================================================
 FILE: src/app/collection/[collectionName]/page.tsx (UPDATE THIS FILE)
================================================================================
*/
import { createClient } from '@/lib/supabase/server';
import CollectionClientPage from '@/components/CollectionClientPage';
import type { Book } from '@/types';

interface CollectionPageProps {
  params: {
    collectionName: string;
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  // FIX: Await the createClient function because it is now async.
  const supabase = await createClient();
  let collection: { title: string; books: Book[] } | null = null;
  
  let query = supabase.from('books').select<"*", Book>("*");
  let title = '';

  if (params.collectionName === 'top-sells') {
    title = 'Top Sells';
    query = query.eq('is_top_sell', true);
  } else if (params.collectionName === 'editors-favorites') {
    title = "Editor's Favorites";
    query = query.eq('is_favorite', true);
  } else {
    return <div className="text-white text-center py-20">Collection not found.</div>;
  }
  
  const { data, error } = await query;
  if (error || !data) {
    return <div className="text-white text-center py-20">Could not load collection.</div>;
  }
  
  collection = { title, books: data };

  return <CollectionClientPage collection={collection} />;
}

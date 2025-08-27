/*
================================================================================
 FILE: src/app/sections/[sectionName]/page.tsx (UPDATE THIS FILE)
================================================================================
*/
import { createClient } from '@/lib/supabase/server';
import SectionClientPage from '@/components/SectionClientPage'; 

interface SectionPageProps {
  params: {
    sectionName: string;
  }
}

export default async function SectionPage({ params }: SectionPageProps) {
  // FIX: Await the createClient function because it is now async.
  const supabase = await createClient();
  const sectionName = decodeURIComponent(params.sectionName);

  const { data: initialBooks } = await supabase
    .from('books')
    .select('*')
    .eq('section', sectionName);

  const { data: allBooksData } = await supabase.from('books').select('section');
  const allSections = allBooksData ? [...new Set(allBooksData.map(book => book.section))] : [];
  
  return (
    <SectionClientPage 
      initialBooks={initialBooks || []} 
      allSections={allSections} 
      sectionName={sectionName} 
    />
  );
}

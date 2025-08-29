/*
================================================================================
 FILE: src/components/Searchbar.tsx (NEW FILE)
 DESC: This is a new component for the search input bar.
================================================================================
*/
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function Searchbar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-xs md:max-w-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books or sections..."
        className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
    </form>
  );
}


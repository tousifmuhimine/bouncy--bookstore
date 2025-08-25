/*
================================================================================
 FILE: src/components/Header.tsx
 DESC: The main navigation header for the site. Uses Next.js Link.
================================================================================
*/
"use client"; // Needed for the mobile menu state

import { useState, FC } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';

const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900/80 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="bouncy-title text-2xl font-bold text-cyan-400">Bouncy</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link href="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
            </div>
          </div>
          <div className="flex items-center">
             <button className="p-2 rounded-full text-gray-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors">
                <ShoppingCart size={20} />
             </button>
             <div className="-mr-2 flex md:hidden ml-2">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700">
                   {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                </button>
             </div>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-cyan-400 hover:bg-slate-800 px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-cyan-400 hover:bg-slate-800 px-3 py-2 rounded-md text-base font-medium">About</Link>
            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block text-gray-300 hover:text-cyan-400 hover:bg-slate-800 px-3 py-2 rounded-md text-base font-medium">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

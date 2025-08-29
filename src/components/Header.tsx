/*
================================================================================
 FILE: src/components/Header.tsx (UPDATE THIS FILE)
 DESC: Added user name display beside the login/logout button.
       Fixed a TypeScript error in the cart item calculation.
================================================================================
*/
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Cart from '@/components/Cart';
import { createClient } from '@/lib/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import Searchbar from './Searchbar';
import type { CartItem } from '@/types'; // Import the CartItem type

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems: cart } = useCart(); // FIX: The context provides 'cartItems', renamed to 'cart' for local use.
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  
  const totalItems = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  // Get user's display name (prioritize full_name, fallback to email)
  const getUserDisplayName = () => {
    if (!user) return null;
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
  };

  return (
    <>
      <header className="bg-slate-900/80 backdrop-blur-lg sticky top-0 z-40 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-cyan-400 bouncy-title">
                Bouncy
              </Link>
            </div>
            
            <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-center">
                <div className="hidden md:block w-full max-w-md">
                    <Searchbar />
                </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </div>

              <div className="flex items-center gap-3">
                {!loading && (
                    user ? (
                      <div className="flex items-center gap-3">
                        {/* User greeting - hidden on small screens */}
                        <div className="hidden sm:flex items-center gap-2 text-gray-300">
                          <User size={16} />
                          <span className="text-sm">Hello, <span className="text-white font-medium">{getUserDisplayName()}</span></span>
                        </div>
                        
                        {/* Mobile user indicator - shown only on small screens */}
                        <div className="sm:hidden flex items-center text-cyan-400">
                          <User size={18} />
                        </div>
                        
                        <button 
                          onClick={handleLogout} 
                          className="bg-fuchsia-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-fuchsia-700 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                        <Link 
                          href="/login" 
                          className="bg-cyan-500 text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-cyan-400 transition-colors"
                        >
                          Login
                        </Link>
                    )
                )}
                
                <button 
                  onClick={() => setIsCartOpen(true)} 
                  className="relative text-gray-300 hover:text-white transition-colors"
                >
                  <ShoppingCart />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>

              <div className="md:hidden">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)} 
                  className="text-gray-300 hover:text-white"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 py-4">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              {/* Mobile user greeting */}
              {user && (
                <div className="flex items-center gap-2 text-cyan-400 mb-2 px-3 py-2">
                  <User size={16} />
                  <span className="text-sm">Hello, <span className="text-white font-medium">{getUserDisplayName()}</span></span>
                </div>
              )}
              
              <div className="w-full px-4 mb-4">
                  <Searchbar />
              </div>
              <Link 
                href="/" 
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" 
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" 
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" 
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
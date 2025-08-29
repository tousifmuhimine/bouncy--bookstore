/*
================================================================================
 FILE: src/context/CartContext.tsx (UPDATE THIS FILE)
 DESC: Added the 'totalPrice' calculation and exposed it in the context.
================================================================================
*/
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { CartItem, Book } from '@/types';

interface CartContextType {
  cartItems: CartItem[];
  totalPrice: number; // Add this property
  addToCart: (book: Book, buyNow?: boolean) => void;
  removeFromCart: (bookId: number) => void;
  updateQuantity: (bookId: number, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  // FIX: Calculate the total price from the cart items.
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = (book: Book, buyNow: boolean = false) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === book.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...book, quantity: 1 }];
    });

    if (buyNow) {
      setIsCartOpen(false);
      router.push('/checkout');
    } else {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (bookId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== bookId));
  };

  const updateQuantity = (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bookId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item => (item.id === bookId ? { ...item, quantity } : item))
      );
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    // FIX: Provide the new 'totalPrice' value to the context.
    <CartContext.Provider value={{ cartItems, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
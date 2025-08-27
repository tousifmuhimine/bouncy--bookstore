/*
================================================================================
 FILE: src/context/CartContext.tsx (CREATE THIS NEW FOLDER AND FILE)
 DESC: Manages the global state for the shopping cart.
================================================================================
*/
"use client";

import { createContext, useContext, useState, ReactNode, FC } from 'react';
import type { Book, CartItem } from '@/types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (book: Book) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === book.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: number) => {
    setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === bookId);
        if (existingItem?.quantity === 1) {
            return prevItems.filter(item => item.id !== bookId);
        }
        return prevItems.map(item =>
            item.id === bookId ? { ...item, quantity: item.quantity - 1 } : item
        );
    });
  };
  
  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

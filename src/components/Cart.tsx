/*
================================================================================
 FILE: src/components/Cart.tsx (UPDATE THIS FILE)
 DESC: This file is updated to use the correct property for the book cover image.
================================================================================
*/
"use client";

import { FC } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Trash2 } from 'lucide-react';
import type { CartItem } from '@/types'; // Import CartItem type if not already

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: FC<CartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, clearCart, totalPrice, cartCount } = useCart();

  return (
    <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-slate-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white">Your Cart ({cartCount})</h2>
                <button onClick={onClose} className="text-slate-400 hover:text-white">
                    <X size={24} />
                </button>
            </div>

            {cartItems.length === 0 ? (
                <div className="flex-grow flex items-center justify-center">
                    <p className="text-slate-400">Your cart is empty.</p>
                </div>
            ) : (
                <div className="flex-grow overflow-y-auto p-4">
                    {cartItems.map((item: CartItem) => (
                        <div key={item.id} className="flex items-center gap-4 mb-4">
                            {/* FIX: Changed item.cover to item.cover_url to match the database */}
                            <img src={item.cover_url} alt={item.title} className="w-16 h-24 object-cover rounded-md" />
                            <div className="flex-grow">
                                <h3 className="text-white font-semibold">{item.title}</h3>
                                <p className="text-slate-400 text-sm">${item.price.toFixed(2)} x {item.quantity}</p>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-red-500">
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {cartItems.length > 0 && (
                <div className="p-4 border-t border-slate-700">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg text-white font-bold">Total:</span>
                        <span className="text-lg text-cyan-400 font-bold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                        Proceed to Checkout
                    </button>
                     <button onClick={clearCart} className="w-full mt-2 text-slate-400 text-sm hover:text-white">
                        Clear Cart
                    </button>
                </div>
            )}
        </div>
    </div>
  );
};

export default Cart;
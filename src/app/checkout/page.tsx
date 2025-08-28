/*
================================================================================
 FILE: src/app/checkout/page.tsx (UPDATE THIS FILE)
 DESC: This file is updated to tell the login page where to redirect back to.
================================================================================
*/
"use client";

import { useCart } from '@/context/CartContext';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/actions/orders';

export default function CheckoutPage() {
    const { cartItems, totalPrice, clearCart } = useCart();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (!user) {
                // FIX: Add a redirect query parameter to the login URL
                router.push('/login?redirect=/checkout');
            } else {
                setUser(user);
            }
            setLoading(false);
        });
    }, [router]);

    const handleConfirmOrder = async () => {
        if (!user || cartItems.length === 0) return;

        const orderData = {
            userId: user.id,
            totalPrice: totalPrice,
            items: cartItems.map(item => ({
                book_id: item.id,
                quantity: item.quantity,
                price: item.price
            }))
        };
        
        const result = await createOrder(orderData);

        if (result.success) {
            clearCart();
            router.push('/order-success');
        } else {
            alert(`Error placing order: ${result.error}`);
        }
    };

    if (loading) {
        return <p className="text-center text-white py-20">Loading...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-white">
            <h1 className="text-4xl font-extrabold text-center mb-8">Confirm Your Order</h1>
            <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center">
                            <span>{item.title} (x{item.quantity})</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                </div>
                <div className="border-t border-slate-600 pt-4 flex justify-between items-center text-xl font-bold">
                    <span>Total</span>
                    <span className="text-cyan-400">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
                    <p><strong>Name:</strong> {user?.user_metadata.full_name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                    <p><strong>Address:</strong> {user?.user_metadata.address || 'Not provided'}</p>
                    <p><strong>Phone:</strong> {user?.user_metadata.phone || 'Not provided'}</p>
                </div>
                <button 
                    onClick={handleConfirmOrder}
                    className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold py-3 rounded-lg text-lg hover:opacity-90 transition-opacity"
                >
                    Confirm Order (Pay on Delivery)
                </button>
            </div>
        </div>
    );
}
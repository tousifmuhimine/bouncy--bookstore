/*
================================================================================
 FILE: src/app/order-success/page.tsx (CREATE THIS NEW PAGE)
 DESC: A simple page to show after a successful order.
================================================================================
*/
import Link from 'next/link';

export default function OrderSuccessPage() {
    return (
        <div className="max-w-2xl mx-auto text-center py-20 text-white">
            <h1 className="text-4xl font-extrabold mb-4">Thank You!</h1>
            <p className="text-lg text-slate-300 mb-8">Your order has been placed successfully.</p>
            <Link href="/" className="bg-cyan-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-cyan-400 transition-colors">
                Continue Shopping
            </Link>
        </div>
    );
}
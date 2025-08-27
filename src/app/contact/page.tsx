/*
================================================================================
 FILE: src/app/contact/page.tsx (UPDATE THIS FILE)
================================================================================
*/
"use client";

import { useRef, useState, FC, FormEvent, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

const ContactPage: FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });
    }, [supabase.auth]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        // ... EmailJS logic remains the same
    };

    return (
        <div className="py-20">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white">Contact Us</h1>
                    <p className="mt-4 text-lg text-slate-300">Have a question or want to work together? Drop us a line.</p>
                </div>
                <div className="mt-12 bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-lg">
                    <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                id="name" 
                                defaultValue={user?.user_metadata?.full_name || ''} 
                                disabled={!!user}
                                required 
                                className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50" 
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                defaultValue={user?.email || ''}
                                disabled={!!user}
                                required 
                                className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 disabled:opacity-50" 
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-300">Message</label>
                            <textarea id="message" name="message" rows={4} required className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"></textarea>
                        </div>
                        <div>
                            <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                        {status && <p className={`text-center text-sm ${status.includes('Failed') ? 'text-red-400' : 'text-green-400'}`}>{status}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
/*
================================================================================
 FILE: src/app/contact/page.tsx (UPDATE THIS FILE)
 DESC: Fixed TypeScript errors for the EmailJS integration.
================================================================================
*/
"use client";

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

// Define the shape of the EmailJS response for TypeScript
interface EmailJSResponse {
    status: number;
    text: string;
}

// FIX: Declare the emailjs object on the window to inform TypeScript
declare global {
    interface Window {
        emailjs: {
            sendForm: (serviceID: string, templateID: string, form: HTMLFormElement, userID: string) => Promise<EmailJSResponse>;
        };
    }
}

const useEmailJS = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        document.head.appendChild(script);
        return () => {
            document.head.removeChild(script);
        };
    }, []);
};

export default function ContactPage() {
    useEmailJS();
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const supabase = createClient();
        const fetchUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        fetchUser();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus('Sending...');
        

        if (window.emailjs && form.current) {
            const serviceID = 'service_948loc6';
            const templateID = 'template_35kopgs';
            const userID = 'xz0H2kzEl1ULijUFi';

            window.emailjs.sendForm(serviceID, templateID, form.current, userID)
                // FIX: Added explicit types for 'result' and 'error'
                .then((result: EmailJSResponse) => {
                    console.log(result.text);
                    setStatus('Message sent successfully!');
                    setLoading(false);
                    if (!user) form.current?.reset();
                    setTimeout(() => setStatus(''), 5000);
                }, (error: EmailJSResponse) => {
                    console.log(error.text);
                    setStatus('Failed to send message. Please try again.');
                    setLoading(false);
                    setTimeout(() => setStatus(''), 5000);
                });
        } else {
            setStatus('Email service is not ready. Please try again in a moment.');
            setLoading(false);
        }
    };

    const userName = user?.user_metadata?.full_name || '';
    const userEmail = user?.email || '';

    return (
        <div className="py-20 bg-slate-900">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-white">Contact Us</h1>
                    <p className="mt-4 text-lg text-slate-300">
                        Have a question or want to work together? Drop us a line.
                    </p>
                </div>
                <div className="mt-12 bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
                    <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                defaultValue={userName}
                                readOnly={!!user}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-slate-600 disabled:text-slate-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                defaultValue={userEmail}
                                readOnly={!!user}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-slate-600 disabled:text-slate-400"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-300">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={4}
                                required
                                className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-300 disabled:bg-cyan-700 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                        {status && <p className={`text-center text-sm ${status.includes('Failed') || status.includes('not ready') ? 'text-red-400' : 'text-green-400'}`}>{status}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

/*
================================================================================
 FILE: src/app/contact/page.tsx (UPDATE THIS FILE)
================================================================================
*/
"use client"; // This is a Client Component because it's interactive

import { useRef, useState, FC, FormEvent, useEffect } from 'react';

const ContactPage: FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isEmailJsLoaded, setIsEmailJsLoaded] = useState(false);

    useEffect(() => {
        const scriptId = 'emailjs-sdk';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId;
            script.type = 'text/javascript';
            script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
            script.onload = () => setIsEmailJsLoaded(true);
            document.head.appendChild(script);
        } else {
            setIsEmailJsLoaded(true);
        }
    }, []);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!isEmailJsLoaded) {
            setStatus('Email service is not ready. Please try again in a moment.');
            return;
        }

        setLoading(true);
        setStatus('Sending...');

        if ((window as any).emailjs && form.current) {
            const serviceID = 'service_948loc6';
            const templateID = 'template_35kopgs';
            const userID = 'xz0H2kzEl1ULijUFi'; 

            (window as any).emailjs.sendForm(serviceID, templateID, form.current, userID)
                .then(() => {
                    setStatus('Message sent successfully!');
                    setLoading(false);
                    form.current?.reset();
                    setTimeout(() => setStatus(''), 5000);
                }, (error: any) => {
                    console.log(error.text);
                    setStatus('Failed to send message. Please try again.');
                    setLoading(false);
                    setTimeout(() => setStatus(''), 5000);
                });
        }
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
                            <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address</label>
                            <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-300">Message</label>
                            <textarea id="message" name="message" rows={4} required className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"></textarea>
                        </div>
                        <div>
                            <button type="submit" disabled={loading || !isEmailJsLoaded} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
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
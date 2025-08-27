/*
================================================================================
 FILE: src/app/login/page.tsx (UPDATE THIS FILE)
 DESC: Adds a "Full Name" field to the sign-up form.
================================================================================
*/
"use client";

import { useState, FC, FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';

const LoginPage: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState(''); // State for the new name field
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const supabase = createClient();

    const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (isSignUp) {
            // Sign Up Logic
            const { error } = await supabase.auth.signUp({ 
                email, 
                password,
                options: {
                    data: {
                        full_name: fullName, // Pass the full name to Supabase
                    }
                }
            });
            if (error) {
                setError(error.message);
            } else {
                setMessage('Check your email for a confirmation link!');
            }
        } else {
            // Sign In Logic
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setError(error.message);
            } else {
                window.location.href = '/';
            }
        }
    };

    return (
        <div className="py-20">
            <div className="max-w-sm mx-auto px-4">
                <div className="bg-slate-800 border border-slate-700 p-8 rounded-xl shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-white mb-6">
                        {isSignUp ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <form onSubmit={handleAuth} className="space-y-6">
                        {isSignUp && ( // Conditionally render the name field
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-300">Full Name</label>
                                <input 
                                    type="text" 
                                    name="fullName" 
                                    id="fullName" 
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required 
                                    className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" 
                                />
                            </div>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address</label>
                            <input 
                                type="email" 
                                name="email" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                                className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" 
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                                className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" 
                            />
                        </div>
                        <div>
                            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:opacity-90 transition-opacity duration-300">
                                {isSignUp ? 'Sign Up' : 'Sign In'}
                            </button>
                        </div>
                        {message && <p className="text-center text-sm text-green-400">{message}</p>}
                        {error && <p className="text-center text-sm text-red-400">{error}</p>}
                    </form>
                    <div className="mt-6 text-center">
                        <button onClick={() => setIsSignUp(!isSignUp)} className="text-sm text-cyan-400 hover:text-cyan-300">
                            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

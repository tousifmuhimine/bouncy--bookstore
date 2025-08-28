/*
================================================================================
 FILE: src/app/login/page.tsx (UPDATE THIS FILE)
 DESC: This file is updated to intelligently redirect users back to the page
       they were trying to access after they log in.
================================================================================
*/
"use client";

import { useState, FC, FormEvent, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import "react-phone-number-input/style.css";
import PhoneInput from 'react-phone-number-input';
import { useRouter, useSearchParams } from 'next/navigation'; // Import useRouter and useSearchParams

const LoginPage: FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState<string | undefined>('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const supabase = createClient();
    const router = useRouter();
    const searchParams = useSearchParams(); // Hook to read URL parameters

    const handleAuth = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (isSignUp) {
            if (password !== confirmPassword) {
                setError("Passwords do not match.");
                return;
            }
            const { error } = await supabase.auth.signUp({ 
                email, 
                password,
                options: {
                    data: {
                        full_name: fullName,
                        address: address || null,
                        phone: phone || null,
                    }
                }
            });
            if (error) {
                setError(error.message);
            } else {
                setMessage('Check your email for a confirmation link!');
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) {
                setError(error.message);
            } else {
                // FIX: Check for a redirect URL, otherwise go home.
                const redirectPath = searchParams.get('redirect');
                router.push(redirectPath || '/');
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
                    <form onSubmit={handleAuth} className="space-y-4">
                        {isSignUp && (
                            <>
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-300">Full Name</label>
                                    <input type="text" name="fullName" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                                </div>
                            </>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address</label>
                            <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-300">Password</label>
                            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                        </div>
                        {isSignUp && (
                            <>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">Confirm Password</label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                                </div>
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-slate-300">Address (Optional)</label>
                                    <input type="text" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-md shadow-sm text-white placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-1">Phone Number (Optional)</label>
                                    <PhoneInput
                                        international
                                        defaultCountry="US"
                                        value={phone}
                                        onChange={setPhone}
                                        className="phone-input"
                                    />
                                </div>
                            </>
                        )}
                        <div className="pt-2">
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
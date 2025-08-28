/*
================================================================================
 FILE: src/app/login/page.tsx (UPDATE THIS FILE)
 DESC: This file is now a simple Server Component that wraps our login form
       in a Suspense boundary, which is required by Next.js.
================================================================================
*/
import { Suspense } from 'react';
import LoginClientPage from '@/components/LoginClientPage'; // We will create this new component

export default function LoginPage() {
  return (
    // FIX: Wrap the interactive part of the page in a Suspense boundary.
    <Suspense fallback={<div className="text-white text-center py-20">Loading...</div>}>
      <LoginClientPage />
    </Suspense>
  );
}
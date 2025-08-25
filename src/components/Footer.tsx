/*
================================================================================
 FILE: src/components/Footer.tsx
 DESC: The footer component for the site.
================================================================================
*/
import type { FC } from 'react';

const Footer: FC = () => (
  <footer className="bg-slate-900 border-t border-slate-700">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-gray-500">
      <p>&copy; {new Date().getFullYear()} Bouncy. All rights reserved.</p>
      <p className="text-sm mt-1">Your one-stop shop for amazing books.</p>
    </div>
  </footer>
);

export default Footer;

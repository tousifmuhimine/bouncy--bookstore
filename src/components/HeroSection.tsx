/*
================================================================================
 FILE: src/components/HeroSection.tsx
 DESC: The main hero section for the homepage.
================================================================================
*/
import type { FC } from 'react';

const HeroSection: FC = () => (
  <div className="text-center py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
     <div className="absolute inset-0 bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
     <div className="relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
           <span className="hero-title-bouncy block text-white">Dive into a</span>
           <span className="hero-title-gradient block bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text mt-2">New World</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-400">
           Discover your next favorite book from our vast collection of genres and top sellers.
        </p>
     </div>
  </div>
);

export default HeroSection;
/*
================================================================================
 FILE: src/app/about/page.tsx
 DESC: The About Us page.
================================================================================
*/
import type { FC } from 'react';

const AboutPage: FC = () => (
    <div className="py-20 text-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-transparent bg-clip-text">About Bouncy</h1>
      <p className="mt-6 text-lg text-slate-300 text-center">
        Welcome to Bouncy, where stories leap off the page and into your heart.
      </p>
      <div className="mt-10 prose prose-lg prose-invert mx-auto text-slate-300">
        <p>
          Founded in 2024, Bouncy was born from a simple passion: connecting readers with books that move them. We believe in the magic of a good story and the power of words to transport us to new worlds. Our curated collection spans genres and continents, ensuring there's always something new and exciting to discover.
        </p>
      </div>
    </div>
  </div>
);

export default AboutPage;

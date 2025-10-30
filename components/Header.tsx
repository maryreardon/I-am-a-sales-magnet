
import React from 'react';

const MagnetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 4a1 1 0 0 0-1-1h- collaborazioneh-4a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1Z" fill="#dc2626" stroke="none" />
    <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1Z" fill="#1d4ed8" stroke="none" />
    <path d="M4 9a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1Z" fill="#dc2626" stroke="none" />
    <path d="M15 9a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1Z" fill="#1d4ed8" stroke="none" />
    <path d="m5 15 3-3" />
    <path d="m6 16 2-2" />
    <path d="m17 15 2-2" />
    <path d="m18 16 1-1" />
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="text-center p-4 sm:p-6">
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2">
        <MagnetIcon />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          I am a Sales Magnet
        </h1>
      </div>
      <p className="text-md sm:text-lg text-slate-400">
        Your daily dose of sales motivation.
      </p>
    </header>
  );
};

export default Header;

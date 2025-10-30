import React, { useState } from 'react';
import { Quote } from '../types';

interface QuoteCardProps {
  quoteData: Quote;
}

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-emerald-400">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);


const QuoteCard: React.FC<QuoteCardProps> = ({ quoteData }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!quoteData) return;
    const textToCopy = `"${quoteData.quote}" — ${quoteData.author}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-2xl mx-auto transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-500/20">
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-full bg-slate-700/50 text-slate-300 hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          aria-label="Copy quote"
        >
          {isCopied ? (
            <>
              <CheckIcon />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <CopyIcon />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <blockquote className="relative">
        <p className="quote-text text-2xl sm:text-3xl italic text-slate-100 leading-relaxed sm:leading-loose">
          <span className="absolute -left-4 -top-3 sm:-left-6 sm:-top-4 text-6xl sm:text-7xl text-blue-500/50 opacity-50 font-serif">“</span>
          {quoteData.quote}
        </p>
      </blockquote>
      <footer className="mt-6 text-right">
        <p className="text-lg sm:text-xl font-semibold text-emerald-400 tracking-wide">— {quoteData.author}</p>
      </footer>
    </div>
  );
};

export default QuoteCard;
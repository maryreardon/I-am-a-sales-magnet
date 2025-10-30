import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import QuoteCard from './components/QuoteCard';
import LoadingSpinner from './components/LoadingSpinner';
import { generateSalesQuote } from './services/geminiService';
import { Quote } from './types';

const getInitialQuote = (): Quote | null => {
  try {
    const savedQuote = localStorage.getItem('salesMagnetQuote');
    return savedQuote ? JSON.parse(savedQuote) : null;
  } catch (error) {
    console.error("Failed to parse quote from localStorage", error);
    return null;
  }
};

const App: React.FC = () => {
  const [quoteData, setQuoteData] = useState<Quote | null>(getInitialQuote());
  const [isLoading, setIsLoading] = useState<boolean>(!quoteData);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateSalesQuote();
      setQuoteData(data);
      localStorage.setItem('salesMagnetQuote', JSON.stringify(data));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
      // Don't clear quoteData on error, so the old one remains visible
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Only fetch a quote on initial load if none exists in localStorage
    if (!quoteData) {
      fetchQuote();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderContent = () => {
    if (isLoading && !quoteData) { // Show spinner only if there's no quote to display
      return (
        <div className="flex-grow flex items-center justify-center">
          <LoadingSpinner />
        </div>
      );
    }
    if (error && !quoteData) { // Show error only if there's no quote to display
      return (
        <div className="flex-grow flex items-center justify-center text-center text-red-400 bg-red-900/20 border border-red-500 rounded-lg p-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h2>
            <p>{error}</p>
          </div>
        </div>
      );
    }
    if (quoteData) {
      return (
        <div className="flex-grow flex items-center justify-center">
            <QuoteCard quoteData={quoteData} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <Header />
      <main className="flex-grow flex flex-col justify-center w-full px-4 py-8">
        {renderContent()}
      </main>
      <footer className="w-full flex justify-center py-4">
        <button
          onClick={fetchQuote}
          disabled={isLoading}
          className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 disabled:bg-slate-500 disabled:cursor-not-allowed transform transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        >
          {isLoading ? 'Generating...' : 'Get New Quote'}
        </button>
      </footer>
    </div>
  );
};

export default App;
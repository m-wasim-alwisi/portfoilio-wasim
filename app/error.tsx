// src/app/error.tsx
"use client"; // Required for client-side animations with Framer Motion

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error for debugging (optional)
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        
        <motion.h1
          className="text-8xl md:text-9xl font-bold text-blue-600 mb-4"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
        
          Error
        
        </motion.h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
        
          Oops! Something Went Wrong
        
        </h2>
        <p className="text-gray-300 mb-8">
        
          We encountered an unexpected error. Please try refreshing the page or
          go back home.
        
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 
            transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Try again by refreshing"
          >
        
            Try Again
        
          </button>
          <Link
            href="/"
            className="inline-block bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-600 
            transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Go back to home page"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

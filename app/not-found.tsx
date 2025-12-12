// src/app/not-found.tsx
'use client'; // Add this to make it a client component for Framer Motion

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
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
          404
        </motion.h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-300 mb-8">
          It looks like the page you're looking for doesn't exist. Maybe it was moved or you mistyped the URL.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Go back to home page"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}

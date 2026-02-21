"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Forbidden() {
  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-md"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Forbidden</h2>
          <p className="text-gray-300 mb-8">
            You are not authorized to access this resource.
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
    </div>
  );
}

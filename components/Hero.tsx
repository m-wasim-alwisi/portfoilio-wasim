"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface HeroProps {
  name?: string;
  title?: string;
  tagline?: string;
  imageSrc?: string;
}

export default function Hero({
  name = "Your Name",
  title = "Full-Stack Developer",
  tagline = "Creative Problem Solver",
  imageSrc = "/me.jpg",
}: HeroProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gradient-to-b from-gray-900 to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-2xl"
      >
        <div className="mb-6">
          <Image
            src={imageError ? "/file.svg" : imageSrc} // Fallback to a placeholder if image fails
            // src={imageError ? "/images/placeholder.jpg" : imageSrc} // Fallback to a placeholder if image fails
            alt={`Profile picture of ${name}`}
            width={150}
            height={150}
            className="rounded-full mx-auto shadow-lg"
            onError={() => setImageError(true)}
            priority // Loads immediately for above-the-fold content
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
          {name}
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-4">
          {title} | {tagline}
        </p>
        <a
          href="#projects"
          className="inline-block bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Scroll to projects section"
        >
          View My Work
        </a>
      </motion.div>
    </section>
  );
}

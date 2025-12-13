"use client";
import { Code, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
// src/components/Projects.tsx
export default function Projects() {
  return (
    <section id="love" className="py-20 px-4 bg-gray-800 rounded-2xl mt-10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6"
        >
          I love Web Development & Data Science
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col md:flex-row justify-center items-center gap-10 mt-8"
        >
          <div className="flex flex-col items-center">
            <div className="bg-gray-700 p-6 rounded-full shadow-lg">
              <Code size={48} />
            </div>
            <p className="mt-4 text-lg font-semibold">Web Development</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-gray-700 p-6 rounded-full shadow-lg">
              <BarChart3 size={48} />
            </div>
            <p className="mt-4 text-lg font-semibold">Data Science</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

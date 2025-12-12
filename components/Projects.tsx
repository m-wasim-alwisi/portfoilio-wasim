"use client"
// src/components/Projects.tsx
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { projects } from '@/app/lib/projects'; // Add this import


export default function Projects() {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="projects" className="py-20 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                // src={imageErrors[project.id] ? '/images/placeholder.jpg' : project.image}
                src={(imageErrors[project.id] ? '/file.svg' : project.image)?? ''}
                alt={project.title}
                fill={true}
                className="object-cover rounded"
                onError={() => handleImageError(project.id)}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <Link href={`/projects/${project.slug}`} className="text-blue-400 hover:underline">
              Learn More
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

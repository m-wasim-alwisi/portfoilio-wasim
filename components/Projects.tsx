"use client";
// src/components/Projects.tsx
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/app/lib/projects";

interface ImageErrors {
  [key: string]: boolean;
}

export default function Projects() {
  const [imageErrors, setImageErrors] = useState<ImageErrors>({});

  const handleImageError = (id: string): void => {
    setImageErrors((prev: ImageErrors) => ({ ...prev, [id]: true }));
  };

  return (
    <section 
      id="projects" 
      className="py-20 px-4 bg-gray-900"
      aria-label="Featured Projects"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Featured Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 p-6 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={imageErrors[project.id] ? '/file.svg' : project.image || ''}
                  alt={`Screenshot of ${project.title} project`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  // quality={75}
                  className="object-cover"
                  onError={() => handleImageError(project.id)}
                  priority={index < 3}
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-white">
                {project.title}
              </h3>
              
              <p className="text-gray-300 mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <Link 
                href={`/projects/${project.slug}`}
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200"
                aria-label={`Learn more about ${project.title}`}
              >
                Learn More
                <svg 
                  className="w-4 h-4 ml-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
// src/app/projects/[slug]/page.tsx
'use client'; // Required for Framer Motion animations

import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {projects} from "@/app/lib/projects";
<<<<<<< HEAD
import Footer from '@/components/Footer';
=======
>>>>>>> f0bf2fe163f9001125f6084adfc5b7af6ad321b0

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound(); // Triggers your custom not-found page

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-96 flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900"
      >
        <Image
          src={project.image??''}
          alt={project.title}
          fill={true}
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-gray-300 max-w-2xl">{project.description}</p>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6">About This Project</h2>
          <p className="text-gray-300 leading-relaxed">{project.longDescription}</p>
        </motion.div>

        {/* Gallery (Optional) */}
        {project.gallery && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-semibold mb-6">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((img, index) => (
                <div key={index} className="relative h-64">
                  <Image
                    src={img}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill={true}
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold mb-6">Technologies Used</h2>
          <div className="flex flex-wrap gap-4">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              View Live Demo
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors text-center"
            >
              View on GitHub
            </a>
          )}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link
            href="/"
            className="text-blue-400 hover:underline"
          >
            ← Back to Home
          </Link>
        </motion.div>
<<<<<<< HEAD
        <br />

      </section>
      <Footer/>
    </div>
    
=======
      </section>
    </div>
>>>>>>> f0bf2fe163f9001125f6084adfc5b7af6ad321b0
  );
}

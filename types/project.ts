// src/types/project.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  slug: string;
  gallery?: string[];
  techStack: string[];
  features: string[];
  category: string;
  status: string;
  liveLink?: `http://${string}` | `https://${string}`;
  githubLink?: `https://github.com/${string}`;
  demoLink?: `https://${string}`;
  longDescription?: string;
  videoLink?: `https://${'youtube' | 'vimeo'}.com/${string}`;
  documentation?: `https://${string}.${string}`;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
  id: '1',
  title: 'Smart Calculator',
  description: 'A clean, responsive calculator built with Next.js.',
  longDescription:
    'A fully responsive, accessible calculator built with Next.js, React, and Tailwind CSS. It features a custom expression parser (no eval), keyboard support, precise decimal handling, and a polished UI inspired by modern mobile calculators. This project focuses on clean state management using useReducer, safe math evaluation, and a well-structured component architecture.',
  image: '/calculater.jpg',
  slug: 'nextjs-calculator',
  gallery: [
    '/calculater.jpg',
    // '/images/calculator-2.png',
    // '/images/calculator-3.png'
  ],
  techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  liveLink: 'https://calculator-ten-delta.vercel.app',
  githubLink: 'https://github.com/m-wasim-alwisi/calculator',
  category: 'web',
  status: 'completed',
  features: [
    'Custom math parser (no eval)',
    'Keyboard controls',
    'Responsive mobile-first UI',
    'Safe decimal and operator handling',
    'useReducer state architecture',
    'Accessible buttons and ARIA labels'
  ],
  createdAt: '2024-02-01',
  updatedAt: '2024-02-20'
},
{
  id: '2',
  title: 'AI Chat',
  description: 'A modern, responsive AI chat application built with Next.js and FastAPI.',
  longDescription:
    'A fully responsive AI chat application combining a Next.js frontend with a FastAPI backend. It supports real-time conversation, context-aware responses, and a polished mobile-first UI designed with Tailwind CSS. This project demonstrates clean API integration, state management using React hooks, and scalable architecture for AI-powered applications.',
  image: '/Ai.jpg',
  slug: 'nextjs-ai-chat',
  gallery: [
     '/Ai.jpg',
    // '/images/ai-chat-2.png',
    // '/images/ai-chat-3.png'
  ],
  techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Python','pydantic','uvicorn'],
  liveLink: 'https://yourdomain.com/ai-chat',
  githubLink: 'https://github.com/yourusername/nextjs-ai-chat',
  category: 'web',
  status: 'in progress',
  features: [
    'AI-powered chat with context awareness',
    'Real-time messaging',
    'Responsive mobile-first design',
    'Tailwind CSS styling',
    'FastAPI backend with Python',
    'Clean state management with React hooks'
  ],
  createdAt: '2025-12-11',
  updatedAt: '2025-12-11'
}
];

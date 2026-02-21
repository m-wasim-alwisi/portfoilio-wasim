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
  liveLink: 'https://chat-ai-black-eta.vercel.app',
  githubLink: 'https://github.com/m-wasim-alwisi/chat-ai',
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
},

{ id: '3',
    title: 'Social Media Sentiment Tracker',
    description: 'A real-time dashboard that monitors and analyzes social media sentiment about any topic.',
    longDescription:
      'A comprehensive social media sentiment analysis dashboard built with Next.js 14, TypeScript, and Tailwind CSS. The application scrapes data from Reddit (real API) and Twitter (simulated), analyzes sentiment using the AFINN-165 word list, and displays results through interactive visualizations. Features include real-time mood scoring, pie and bar charts, live post feed, auto-refresh functionality, and a modern glassmorphism UI with smooth Framer Motion animations.',
    image: '/sentiment-tracker.jpg',
    slug: 'sentiment-tracker',
    gallery: [
      '/sentiment-tracker.jpg',
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Recharts', 'Sentiment.js'],
    liveLink: 'https://sentiment-tracker-ten.vercel.app/',
    githubLink: 'https://github.com/m-wasim-alwisi/sentiment-tracker',
    category: 'web',
    status: 'completed',
    features: [
      'Real-time sentiment analysis with mood scoring (-100 to +100)',
      'Live data from Reddit API with simulated Twitter data',
      'Interactive pie and bar charts using Recharts',
      'Auto-refresh every 30 seconds',
      'Live feed showing recent posts with sentiment indicators',
      'Modern glassmorphism UI design',
      'Smooth animations with Framer Motion',
      'Responsive design for desktop and mobile',
      'Quick topic buttons for instant analysis',
      'Platform comparison (Twitter vs Reddit)'
    ],
    createdAt: '2025-01-15',
    updatedAt: '2025-01-20'
  },
  {
  id: '4',
  title: 'CSV Analyzer',
  description: 'A powerful web application for analyzing and validating CSV files with 5 columns.',
  longDescription:
    'A comprehensive CSV analysis tool built with Next.js 15, TypeScript, and Tailwind CSS. This application provides instant insights into CSV data with automatic column type detection, statistical analysis, null value detection, invalid data identification, and number-in-text detection. Features include a beautiful dark mode, responsive design, interactive data tables, and JSON report export. Perfect for data validation and quality assurance.',
  image: '/csv-analyzer (1).jpg',
  slug: 'csv-analyzer',
  gallery: [
    '/csv-analyzer (1).jpg',
    '/csv-analyzer (2).jpg',
    '/csv-analyzer (3).jpg',
    '/csv-analyzer (4).jpg',
  ],
  techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Lucide React', 'Papa Parse'],
  liveLink: 'https://csv-analyzer.vercel.app',
  githubLink: 'https://github.com/m-wasim-alwisi/csv-analyzer',
  category: 'web',
  status: 'completed',
  features: [
    'Automatic column type detection (numeric, integer, string, email, date, phone, boolean, name)',
    'Statistical analysis (minimum, maximum, average, sum) for numeric columns',
    'Null value detection across all columns',
    'Invalid data identification based on column type',
    'Number-in-text detection for string validation',
    'Interactive data table with preview of first 100 rows',
    'Data quality score calculation',
    'Beautiful dark mode with smooth transitions',
    'Responsive design for desktop, tablet, and mobile',
    'Export analysis reports in JSON format',
    'Drag and drop CSV file upload',
    'Real-time validation with detailed error messages',
    'Tabbed interface for Analysis, Data Quality, and Data Preview'
  ],
  createdAt: '2025-01-25',
  updatedAt: '2025-01-28'
}

];

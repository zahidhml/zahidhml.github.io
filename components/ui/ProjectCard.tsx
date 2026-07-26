'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github, Lock } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  featured: boolean;
  category: string;
  shortDesc: string;
  tech: string[];
  live: string;
  github: string | null;
  image: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * ProjectCard component
 * Displays individual project with tech stack and action buttons
 */
export default function ProjectCard({ project, index }: ProjectCardProps) {
  const categoryColors = {
    'E-Commerce': 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300',
    'Nonprofit / NGO':
      'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300',
  };

  const categoryColor =
    categoryColors[project.category as keyof typeof categoryColors] ||
    'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300';

  return (
    <motion.div
      whileHover={{ y: -16 }}
      transition={{ duration: 0.3 }}
      className="h-full group"
    >
      <div className="relative h-full bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 flex flex-col"
      >
        {/* Featured Ribbon */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
            Featured
          </div>
        )}

        {/* Project Image */}
        <div className="relative w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="text-center">
              <div className="text-4xl font-bold text-primary/40 mb-2">
                {project.title.charAt(0)}
              </div>
              <p className="text-gray-500 dark:text-gray-500 text-sm">
                {project.category}
              </p>
            </div>
          )}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-white transition-opacity" />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Category Badge */}
          <div className="flex items-start justify-between mb-4">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColor}`}
            >
              {project.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-display font-bold text-gray-900 dark:text-gray-100 mb-3 line-clamp-2">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
            {project.shortDesc}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full">
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-light dark:hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
            >
              Live Site <ExternalLink className="w-4 h-4" />
            </a>

            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                GitHub <Github className="w-4 h-4" />
              </a>
            ) : (
              <button
                disabled
                title="Private / client project"
                className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 rounded-lg font-semibold text-sm opacity-50 cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> Private
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

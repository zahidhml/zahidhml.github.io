'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Lock, Star, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import projectsData from '@/data/projects.json';
import type { Project } from '@/types';

const projects = projectsData as Project[];

const filters = ['All', 'WordPress', 'Ecommerce', 'SEO', 'NGO', 'Business Website'];

const categoryColor: Record<string, string> = {
  Ecommerce: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200/60',
  NGO: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border-teal-200/60',
  'Fashion Ecommerce': 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200/60',
};

/**
 * Projects section — featured projects with category filter and animated cards.
 */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.tags?.includes(activeFilter));

  return (
    <section
      id="projects"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-[#0a0a09]/80"
      aria-label="Projects section"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="My Work"
          title="Featured Projects"
          subtitle="Ecommerce platforms, nonprofit solutions, and custom WordPress builds — all optimized for performance and SEO."
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-12"
          role="group"
          aria-label="Project filters"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200 border ${
                activeFilter === f
                  ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                  : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary/50 hover:text-primary dark:hover:text-primary-light'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Cards grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 dark:text-gray-400">No projects in this category yet.</p>
          </motion.div>
        )}

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light transition-colors shadow-lg shadow-primary/20"
          >
            View All Projects
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const catColor =
    categoryColor[project.category] ||
    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200/60';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-300 flex flex-col"
    >
      {/* Featured ribbon */}
      {project.featured && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 bg-accent text-white text-xs font-bold rounded-full shadow-md">
          <Star className="w-3 h-3 fill-white" />
          Featured
        </div>
      )}

      {/* Image area */}
      <div className="relative h-48 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/15 flex items-center justify-center overflow-hidden">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-30 dark:opacity-20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,110,86,0.15),transparent_70%)]" />
            </div>
            <div className="relative text-center px-6">
              <div className="text-5xl font-display font-bold text-primary/30 dark:text-primary/20 mb-2 select-none">
                {project.title.charAt(0)}
              </div>
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${catColor}`}>
                {project.category}
              </span>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <h3 className="text-lg font-display font-bold text-gray-900 dark:text-gray-50 mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed flex-grow line-clamp-3">
          {project.shortDesc}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 4).map((t) => (
            <Badge key={t} label={t} variant="default" size="sm" />
          ))}
          {project.tech.length > 4 && (
            <Badge label={`+${project.tech.length - 4}`} variant="ghost" size="sm" />
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-colors"
          >
            Live Demo
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              GitHub
            </a>
          ) : (
            <button
              disabled
              title="Private / client project"
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-200/60 dark:border-gray-800/60 text-gray-400 dark:text-gray-600 text-sm font-semibold rounded-xl opacity-50 cursor-not-allowed"
            >
              <Lock className="w-3.5 h-3.5" />
              Private
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}

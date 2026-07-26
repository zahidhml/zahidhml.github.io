'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Lock, Star, Search } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import projectsData from '@/data/projects.json';
import type { Project } from '@/types';

const projects = projectsData as Project[];
const allFilters = ['All', 'WordPress', 'Ecommerce', 'SEO', 'NGO', 'Business Website'];

const categoryColor: Record<string, string> = {
  Ecommerce:
    'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200/60',
  NGO: 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border-teal-200/60',
  'Fashion Ecommerce':
    'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200/60',
};

export default function ProjectsPageContent() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = projects.filter((p) => {
    const matchesFilter =
      activeFilter === 'All' || p.tags?.includes(activeFilter);
    const matchesSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      {/* Page header */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/6 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-light px-4 py-2 bg-primary/8 dark:bg-primary/15 border border-primary/20 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-light" />
              My Work
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4">
              Projects
            </h1>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-1 bg-primary rounded-full" />
              <div className="w-4 h-1 bg-accent rounded-full opacity-60" />
            </div>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              WordPress, WooCommerce, SEO, and nonprofit projects — each built
              with performance and real-world impact in mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & search */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-[#0a0a09]/50 border-y border-gray-200/60 dark:border-gray-800/60 sticky top-16 sm:top-20 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Filter tabs */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Project category filters"
          >
            {allFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                aria-pressed={activeFilter === f}
                className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all border ${
                  activeFilter === f
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-primary/50 hover:text-primary dark:hover:text-primary-light'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-primary/30 focus:outline-none"
              aria-label="Search projects"
            />
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Showing <strong>{filtered.length}</strong> project{filtered.length !== 1 ? 's' : ''}
          </p>

          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, idx) => (
                <FullProjectCard key={project.id} project={project} index={idx} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="flex justify-center mb-4 text-gray-400 dark:text-gray-600">
                <Search className="w-16 h-16" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No projects found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your filters or search term.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

function FullProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
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
      {project.featured && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 bg-accent text-white text-xs font-bold rounded-full shadow-md">
          <Star className="w-3 h-3 fill-white" />
          Featured
        </div>
      )}

      {/* Image placeholder */}
      <div className="relative h-52 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/15 flex items-center justify-center overflow-hidden">
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
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(15,110,86,0.12),transparent_70%)]" />
            <div className="relative text-center px-6">
              <div className="text-6xl font-display font-black text-primary/20 dark:text-primary/15 mb-2 select-none">
                {project.title.charAt(0)}
              </div>
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border ${catColor}`}
              >
                {project.category}
              </span>
            </div>
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <h2 className="text-lg font-display font-bold text-gray-900 dark:text-gray-50 mb-2 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
          {project.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed flex-grow">
          {project.longDesc || project.shortDesc}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <Badge key={t} label={t} variant="default" size="sm" />
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags?.map((tag) => (
            <Badge key={tag} label={tag} variant="primary" size="sm" />
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live demo of ${project.title}`}
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
              aria-label={`View ${project.title} on GitHub`}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              GitHub
            </a>
          ) : (
            <button
              disabled
              title="Private / client project"
              aria-label="Private repository"
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

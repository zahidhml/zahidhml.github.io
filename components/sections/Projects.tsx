'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Lock, Star, ArrowRight, Github } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import MagneticButton from '@/components/ui/MagneticButton';
import { useSmoothScroll } from '@/components/providers/LenisProvider';
import projectsData from '@/data/projects.json';
import type { Project } from '@/types';

const projects = projectsData as Project[];

const filters = ['All', 'WordPress', 'Ecommerce', 'SEO', 'NGO', 'Business Website'];

/**
 * Projects — premium dark project cards with glass overlay, image zoom, and filter pills.
 * Navigation uses Lenis scrollTo — no page routing.
 */
export default function Projects() {
  const { scrollTo } = useSmoothScroll();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.tags?.includes(activeFilter));

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8"
      aria-label="Projects section"
      style={{ background: '#0B1021' }}
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, rgba(72,191,227,0.5) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          badge="My Work"
          title="Featured Projects"
          subtitle="Ecommerce platforms, nonprofit solutions, and custom WordPress builds — optimized for performance and SEO."
        />

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
          role="group"
          aria-label="Project filters"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              aria-pressed={activeFilter === f}
              className="px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200"
              style={
                activeFilter === f
                  ? {
                      background: 'linear-gradient(135deg, #7400B8, #5E60CE)',
                      color: '#FFFFFF',
                      boxShadow: '0 4px 16px rgba(116,0,184,0.3)',
                      border: '1px solid transparent',
                    }
                  : {
                      background: 'rgba(255,255,255,0.04)',
                      color: '#8A94A7',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }
              }
              onMouseEnter={(e) => {
                if (activeFilter !== f) {
                  (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(116,0,184,0.35)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== f) {
                  (e.currentTarget as HTMLElement).style.color = '#8A94A7';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                }
              }}
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
            <p style={{ color: '#8A94A7' }}>No projects in this category yet.</p>
          </motion.div>
        )}

        {/* View all → scroll to contact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <MagneticButton strength={0.22}>
            <button
              onClick={() => scrollTo('#contact', { offset: -76 })}
              className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-xl text-sm text-white transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #7400B8, #5E60CE)',
                boxShadow: '0 4px 24px rgba(116,0,184,0.35)',
              }}
            >
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-400 hover:-translate-y-2"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(116,0,184,0.4)';
        el.style.boxShadow = '0 12px 48px rgba(116,0,184,0.2)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.08)';
        el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
      }}
    >
      {/* Featured badge */}
      {project.featured && (
        <div
          className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full"
          style={{
            background: 'linear-gradient(135deg, #7400B8, #5E60CE)',
            boxShadow: '0 4px 12px rgba(116,0,184,0.4)',
          }}
        >
          <Star className="w-2.5 h-2.5 fill-white text-white" />
          <span className="text-white">Featured</span>
        </div>
      )}

      {/* Image area */}
      <div className="relative h-56 overflow-hidden bg-[#0F1629]">
        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Hover glass overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(to top, rgba(116,0,184,0.3) 0%, transparent 60%)' }}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className="text-6xl font-bold select-none mb-3"
              style={{ color: 'rgba(116,0,184,0.3)' }}
            >
              {project.title.charAt(0)}
            </div>
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: 'rgba(116,0,184,0.15)',
                border: '1px solid rgba(116,0,184,0.3)',
                color: '#B8C0D4',
              }}
            >
              {project.category}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6">
        <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-[#80FFDB] transition-colors duration-200">
          {project.title}
        </h3>

        <p
          className="text-sm leading-relaxed flex-grow line-clamp-3 mb-5"
          style={{ color: '#8A94A7' }}
        >
          {project.shortDesc}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{
                background: 'rgba(94,96,206,0.12)',
                border: '1px solid rgba(94,96,206,0.25)',
                color: '#B8C0D4',
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span
              className="text-xs px-2.5 py-1 rounded-lg font-medium"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#8A94A7',
              }}
            >
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div
          className="flex gap-3 pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #7400B8, #5E60CE)',
              boxShadow: '0 4px 12px rgba(116,0,184,0.25)',
            }}
          >
            Live Demo
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              style={{
                color: '#B8C0D4',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
          ) : (
            <button
              disabled
              title="Private / client project"
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold rounded-xl opacity-40 cursor-not-allowed"
              style={{
                color: '#8A94A7',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
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

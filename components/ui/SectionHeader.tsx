'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Reusable section header with badge, title, accent line, and optional subtitle.
 */
export default function SectionHeader({
  badge,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`flex flex-col gap-3 mb-16 ${alignClass} ${className}`}
    >
      {badge && (
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-light px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-full self-start">
          <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-light inline-block" />
          {badge}
        </span>
      )}
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-gray-900 dark:text-gray-50">
        {title}
      </h2>
      <div
        className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <div className="w-12 h-1 bg-primary rounded-full" />
        <div className="w-4 h-1 bg-accent rounded-full opacity-60" />
      </div>
      {subtitle && (
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

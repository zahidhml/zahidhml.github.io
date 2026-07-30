'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleGradient?: boolean;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Reusable premium section header with badge, title, accent rule, and subtitle.
 */
export default function SectionHeader({
  badge,
  title,
  titleGradient = false,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      viewport={{ once: true }}
      className={`flex flex-col gap-4 mb-16 ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      {badge && (
        <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#80FFDB] px-4 py-1.5 bg-[#80FFDB]/10 border border-[#80FFDB]/20 rounded-full ${isCenter ? 'self-center' : 'self-start'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#80FFDB] inline-block" />
          {badge}
        </span>
      )}

      <h2
        className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight ${
          titleGradient
            ? 'text-gradient'
            : 'text-white'
        }`}
      >
        {title}
      </h2>

      {/* Accent rule */}
      <div className={`flex items-center gap-2 ${isCenter ? 'justify-center' : ''}`}>
        <div className="h-px w-12 bg-gradient-to-r from-[#7400B8] to-[#48BFE3]" />
        <div className="h-px w-4 bg-[#80FFDB]/40" />
      </div>

      {subtitle && (
        <p className="text-base sm:text-lg text-[#B8C0D4] max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, MapPin, Star } from 'lucide-react';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

const roles = [
  'WordPress Developer',
  'SEO Expert',
  'WooCommerce Specialist',
  'Web Performance Engineer',
];

const stats = [
  { label: 'Projects Delivered', end: 3, suffix: '+' },
  { label: 'Years Experience', end: 2, suffix: '+' },
  { label: 'Lighthouse Score', end: 90, suffix: '+' },
  { label: 'Client Satisfaction', end: 100, suffix: '%' },
];

/**
 * Hero — landing section with typewriter roles, animated stats, and 3 CTA buttons.
 */
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!mounted) return;
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIdx((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 55 : 80;
      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? current.slice(0, displayText.length - 1)
            : current.slice(0, displayText.length + 1)
        );
      }, speed);
    }
    return () => clearTimeout(timeout);
  }, [mounted, displayText, isDeleting, roleIdx]);

  if (!mounted) return null;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <motion.div
          animate={{ y: [0, 30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-primary/8 dark:bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [30, 0, 30], scale: [1.05, 1, 1.05] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/8 dark:bg-accent/5 rounded-full blur-3xl"
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,110,86,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,110,86,0.03)_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(rgba(29,158,117,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(29,158,117,0.04)_1px,transparent_1px)]" />
      </div>

      <div className="max-w-5xl mx-auto w-full text-center relative z-10">

        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary dark:text-primary-light px-4 py-2 bg-primary/8 dark:bg-primary/15 border border-primary/20 dark:border-primary/30 rounded-full">
            <MapPin className="w-3.5 h-3.5" />
            Chitral, KPK, Pakistan
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold mb-6 leading-[1.1] tracking-tight"
        >
          Hi, I&apos;m{' '}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-primary">
              Zahid Iqbal
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                d="M4 8 Q75 2 150 8 Q225 14 296 8"
                stroke="url(#underline-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="underline-gradient" x1="0" y1="0" x2="300" y2="0">
                  <stop offset="0%" stopColor="#0F6E56" />
                  <stop offset="100%" stopColor="#BA7517" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </motion.h1>

        {/* Typewriter subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-center gap-2 h-12 sm:h-14 mb-6"
        >
          <span className="text-2xl sm:text-3xl lg:text-4xl font-display font-semibold text-gray-700 dark:text-gray-300">
            {displayText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
              className="ml-0.5 text-primary dark:text-primary-light"
            >
              |
            </motion.span>
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          I build fast, accessible WordPress websites and WooCommerce stores —
          optimized for search engines, performance, and real-world impact.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <Link
            href="/projects"
            className="group flex items-center gap-2 px-7 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light shadow-lg hover:shadow-xl shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Star className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            View Projects
          </Link>
          <a
            href="/resume/zahid-iqbal-resume.pdf"
            download
            className="group flex items-center gap-2 px-7 py-3.5 border-2 border-primary text-primary dark:text-primary-light dark:border-primary-light font-semibold rounded-xl hover:bg-primary hover:text-white dark:hover:bg-primary-light dark:hover:text-gray-900 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            Download Resume
          </a>
          <Link
            href="/contact"
            className="group flex items-center gap-2 px-7 py-3.5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-800 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Contact Me
          </Link>
        </motion.div>

        {/* Animated stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-gray-200/80 dark:border-gray-800/80 rounded-2xl p-4 sm:p-5 text-center"
            >
              <div className="text-3xl sm:text-4xl font-display font-bold text-primary dark:text-primary-light mb-1">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 text-gray-400 dark:text-gray-600"
        >
          <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </div>
    </section>
  );
}

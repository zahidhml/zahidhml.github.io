'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import skillsData from '@/data/skills.json';
import type { SkillsData } from '@/types';

const skills = skillsData as SkillsData;

// Quick bio for home page snippet
const bio = [
  "I'm a WordPress Developer & SEO Expert at HindukushSoft Technologies, based in Drosh, Lower Chitral. I design and build WordPress websites, WooCommerce e-commerce platforms, and implement technical SEO strategies.",
  "With a B.S. in Computer Science from the University of Chitral and 2+ years of hands-on experience, I combine strong technical fundamentals with real-world web development expertise.",
];

const levelColor: Record<string, string> = {
  Expert: 'bg-primary/15 text-primary dark:bg-primary/25 dark:text-primary-light border-primary/20',
  Advanced: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200/50',
  Intermediate: 'bg-accent/10 text-amber-800 dark:bg-accent/20 dark:text-amber-300 border-accent/20',
  Beginner: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border-gray-200',
};

/**
 * About (home snippet) — brief intro, skills overview, CTA to full about page.
 */
export default function About() {
  // Flatten all skills for quick overview (first 3 categories)
  const topCategories = Object.entries(skills).slice(0, 3);

  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8"
      aria-label="About section"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="About Me"
          title="WordPress Dev & SEO Expert"
          subtitle="Turning great ideas into fast, search-optimized websites."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Avatar / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute -top-6 -left-6 w-72 h-72 border-2 border-primary/15 rounded-full" />
              <div className="absolute -bottom-6 -right-6 w-72 h-72 border-2 border-accent/15 rounded-full" />

              {/* Avatar card */}
              <div className="relative w-60 h-60 sm:w-72 sm:h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 border-2 border-primary/20 shadow-2xl flex flex-col items-center justify-center gap-4">
                <div className="w-24 h-24 rounded-full bg-primary/20 border-4 border-primary/30 flex items-center justify-center overflow-hidden relative">
                  <Image
                    src="/images/profile-1.jpg"
                    alt="Zahid Iqbal"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="text-center px-4">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Muhammad Zahid Iqbal</p>
                  <p className="text-xs text-primary dark:text-primary-light font-medium">WordPress Dev & SEO Expert</p>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl px-4 py-2 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Open to Work</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-5 mb-8">
              {bio.map((para, i) => (
                <p key={i} className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Personal details */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: 'Location', value: 'Drosh, Chitral, KPK' },
                { label: 'Company', value: 'HindukushSoft Technologies' },
                { label: 'Education', value: 'BS Computer Science' },
                { label: 'Languages', value: 'EN / UR / PS / KHO' },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 border border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-0.5">{item.label}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{item.value}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 font-semibold text-primary dark:text-primary-light hover:underline underline-offset-4"
            >
              Read Full Biography
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Skills overview */}
        <div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-gray-900 dark:text-gray-100 mb-8">
            Core Skills & Technologies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {topCategories.map(([key, cat], catIdx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl p-5"
              >
                <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
                  {cat.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.slice(0, 6).map((skill) => (
                    <span
                      key={skill.name}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium border ${levelColor[skill.level] || levelColor.Intermediate}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary dark:text-primary-light dark:border-primary-light font-semibold rounded-xl hover:bg-primary hover:text-white dark:hover:bg-primary-light dark:hover:text-gray-900 transition-all duration-200"
            >
              View All Skills & Experience
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Download, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Timeline, { TimelineItem } from '@/components/ui/Timeline';
import experienceData from '@/data/experience.json';
import educationData from '@/data/education.json';
import type { Experience, Education } from '@/types';

const experiences = experienceData as Experience[];
const educations = educationData as Education[];

// Map JSON data to TimelineItem format
const timelineItems: TimelineItem[] = [
  ...experiences.map((exp) => ({
    id: exp.id,
    type: 'work' as const,
    title: exp.role,
    organization: exp.company,
    location: exp.location,
    period: exp.period,
    typeLabel: exp.type,
    description: exp.description,
    highlights: exp.highlights,
  })),
  ...educations.map((edu) => ({
    id: edu.id,
    type: 'education' as const,
    title: edu.degree,
    organization: edu.institution,
    location: edu.location,
    period: edu.period,
    typeLabel: edu.status,
    description: edu.description,
    highlights: edu.highlights,
  })),
];

/**
 * Resume section — shows timeline of work + education on home page,
 * with a prominent download button.
 */
export default function Resume() {
  return (
    <section
      id="resume"
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8"
      aria-label="Resume section"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          badge="Experience"
          title="My Journey"
          subtitle="From internship to WordPress & SEO expert — building real products for real businesses."
        />

        {/* Download + View Full Resume */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-14"
        >
          <a
            href="/resume/zahid-iqbal-resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" />
            Download Full Resume
          </a>
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary dark:text-primary-light hover:underline underline-offset-4"
          >
            View Resume Page
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Timeline */}
        <Timeline items={timelineItems} />
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Timeline, { TimelineItem } from '@/components/ui/Timeline';
import MagneticButton from '@/components/ui/MagneticButton';
import experienceData from '@/data/experience.json';
import educationData from '@/data/education.json';
import type { Experience, Education } from '@/types';

const experiences = experienceData as Experience[];
const educations = educationData as Education[];

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
 * Resume section — premium timeline of work + education with download CTA.
 */
export default function Resume() {
  return (
    <section
      id="resume"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8"
      aria-label="Resume section"
      style={{ background: '#050816' }}
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-10 -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(116,0,184,0.6) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeader
          badge="Experience"
          title="My Journey"
          subtitle="From internship to WordPress & SEO expert — building real products for real businesses."
        />

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mb-14"
        >
          <MagneticButton strength={0.22}>
            <a
              href="/resume/zahid-iqbal-resume.pdf"
              download
              className="inline-flex items-center gap-2.5 px-7 py-3.5 font-semibold rounded-xl text-sm text-white transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #7400B8, #5E60CE)',
                boxShadow: '0 4px 24px rgba(116, 0, 184, 0.4)',
              }}
            >
              <Download className="w-4 h-4" />
              Download Full Resume
            </a>
          </MagneticButton>
        </motion.div>

        {/* Timeline */}
        <Timeline items={timelineItems} />
      </div>
    </section>
  );
}

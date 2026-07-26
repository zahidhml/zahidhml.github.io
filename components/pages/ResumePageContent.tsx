'use client';

import { motion } from 'framer-motion';
import { Download, Briefcase, GraduationCap, Award, Star, BarChart, Globe, Search } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Timeline, { TimelineItem } from '@/components/ui/Timeline';
import Badge from '@/components/ui/Badge';
import experienceData from '@/data/experience.json';
import educationData from '@/data/education.json';
import skillsData from '@/data/skills.json';
import type { Experience, Education, SkillsData } from '@/types';

const experiences = experienceData as Experience[];
const educations = educationData as Education[];
const skills = skillsData as SkillsData;

const careerTimeline: TimelineItem[] = [
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

const certifications = [
  {
    title: 'Google Analytics Certified',
    issuer: 'Google',
    year: '2024',
    icon: <BarChart className="w-8 h-8 text-primary dark:text-primary-light" />,
  },
  {
    title: 'WordPress Development',
    issuer: 'HindukushSoft Technologies',
    year: '2023',
    icon: <Globe className="w-8 h-8 text-primary dark:text-primary-light" />,
  },
  {
    title: 'Technical SEO Fundamentals',
    issuer: 'Self-Learning / Practice',
    year: '2023',
    icon: <Search className="w-8 h-8 text-primary dark:text-primary-light" />,
  },
];

const levelDot: Record<string, string> = {
  Expert: 'bg-primary',
  Advanced: 'bg-blue-500',
  Intermediate: 'bg-amber-500',
  Beginner: 'bg-gray-400',
};

const levelBar: Record<string, number> = {
  Expert: 100,
  Advanced: 80,
  Intermediate: 60,
  Beginner: 35,
};

export default function ResumePageContent() {
  return (
    <>
      {/* Page header */}
      <section className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/6 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-light px-4 py-2 bg-primary/8 dark:bg-primary/15 border border-primary/20 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-light" />
              Resume
            </span>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl sm:text-5xl font-display font-bold text-gray-900 dark:text-gray-50 mb-2">
                  My Resume
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  WordPress Developer & SEO Expert · 2+ years experience
                </p>
              </div>
              <a
                href="/resume/zahid-iqbal-resume.pdf"
                download
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 self-start sm:self-auto"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-[#0a0a09]/50 border-y border-gray-200/60 dark:border-gray-800/60">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Briefcase, label: 'Experience', value: '2+ Years' },
              { icon: Star, label: 'Projects', value: '3+' },
              { icon: GraduationCap, label: 'Degree', value: 'BS CS' },
              { icon: Award, label: 'Lighthouse', value: '90+ Score' },
            ].map(({ icon: Icon, label, value }, idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.07 }}
                className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex items-center gap-3"
              >
                <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-xl">
                  <Icon className="w-4 h-4 text-primary dark:text-primary-light" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                  <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionHeader badge="Experience & Education" title="Career Timeline" />
          <Timeline items={careerTimeline} />
        </div>
      </section>

      {/* Skills */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-[#0a0a09]/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeader badge="Technical Skills" title="Skills" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([key, cat], catIdx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl p-5"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                  {cat.title}
                </h3>
                <div className="space-y-3">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {skill.name}
                        </span>
                        <span className={`text-xs font-semibold flex items-center gap-1`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${levelDot[skill.level] || levelDot.Intermediate}`} />
                          {skill.level}
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${levelBar[skill.level] || 60}%` }}
                          transition={{ duration: 1, ease: 'easeOut', delay: catIdx * 0.05 }}
                          viewport={{ once: true }}
                          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <SectionHeader badge="Certifications" title="Credentials" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:border-primary/30 dark:hover:border-primary/30 transition-colors"
              >
                <div className="text-3xl mb-3">{cert.icon}</div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">
                  {cert.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {cert.issuer} · {cert.year}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-[#0a0a09]/50">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-gray-900 dark:text-gray-100 mb-3">
              Interested in working together?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Download my resume or reach out directly — I&apos;d love to discuss how I can help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/resume/zahid-iqbal-resume.pdf"
                download
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-light shadow-lg shadow-primary/20 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
              <a
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary dark:text-primary-light dark:border-primary-light font-semibold rounded-xl hover:bg-primary hover:text-white dark:hover:bg-primary-light dark:hover:text-gray-900 transition-all duration-200"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

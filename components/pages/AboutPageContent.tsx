'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import Timeline, { TimelineItem } from '@/components/ui/Timeline';
import Badge from '@/components/ui/Badge';
import { MapPin, Building, GraduationCap, Calendar, Globe, CheckCircle2, Flag, Leaf, Mountain } from 'lucide-react';
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

const levelColor: Record<string, string> = {
  Expert: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light border border-primary/20',
  Advanced: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200/50',
  Intermediate: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200/50',
  Beginner: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-200',
};

const levelDot: Record<string, string> = {
  Expert: 'bg-primary',
  Advanced: 'bg-blue-500',
  Intermediate: 'bg-amber-500',
  Beginner: 'bg-gray-400',
};

const languages = [
  { name: 'English', level: 'Professional', bars: 4 },
  { name: 'Urdu', level: 'Native', bars: 5 },
  { name: 'Pashto', level: 'Native', bars: 5 },
  { name: 'Khowar', level: 'Native', bars: 5 },
];

const careerGoals = [
  'Master advanced WordPress performance optimization and Core Web Vitals',
  'Expand into full-stack development using Next.js 15 and TypeScript',
  'Build scalable SaaS products for South Asian markets',
  'Contribute to open-source WordPress plugins and SEO tools',
];

export default function AboutPageContent() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/6 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/6 rounded-full blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary dark:text-primary-light px-4 py-2 bg-primary/8 dark:bg-primary/15 border border-primary/20 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-light" />
            About Me
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-gray-50 mb-4"
          >
            Muhammad Zahid Iqbal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            WordPress Developer & SEO Expert · HindukushSoft Technologies · Drosh, Chitral
          </motion.p>
        </div>
      </section>

      {/* Biography */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-[#0a0a09]/50">
        <div className="max-w-5xl mx-auto">
          <SectionHeader badge="Biography" title="My Story" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative w-48 h-48 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 via-primary/8 to-accent/20 border-2 border-primary/20 shadow-2xl flex items-center justify-center">
                <Image
                  src="/images/profile-2.jpg"
                  alt="Zahid Iqbal"
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
              <div className="w-full bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 text-sm space-y-2">
                {[
                  { icon: <MapPin className="w-4 h-4 text-primary" />, label: 'Location', value: 'Drosh, Lower Chitral, KPK' },
                  { icon: <Building className="w-4 h-4 text-primary" />, label: 'Company', value: 'HindukushSoft Technologies' },
                  { icon: <GraduationCap className="w-4 h-4 text-primary" />, label: 'Degree', value: 'BS Computer Science' },
                  { icon: <Calendar className="w-4 h-4 text-primary" />, label: 'Grad Year', value: '2024' },
                  { icon: <Globe className="w-4 h-4 text-primary" />, label: 'Languages', value: 'EN / UR / PS / KHO' },
                  { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, label: 'Status', value: 'Open to Work' },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex justify-between gap-2 items-center">
                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {icon}
                      <span>{label}</span>
                    </div>
                    <span className="font-medium text-gray-800 dark:text-gray-200 text-right text-xs">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bio text */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-5"
            >
              {[
                "I'm Muhammad Zahid Iqbal, a WordPress Developer & SEO Expert currently working at HindukushSoft Technologies in Drosh, Lower Chitral, Khyber Pakhtunkhwa, Pakistan. I design and build WordPress websites, WooCommerce e-commerce platforms, and implement comprehensive technical SEO strategies to drive organic growth.",
                "I graduated in 2024 with a Bachelor of Science in Computer Science from the University of Chitral, where I gained strong fundamentals in data structures, algorithms, web development, and software engineering principles. My capstone project involved building a full-stack web application.",
                "My journey in web development started as a WordPress intern at HindukushSoft Technologies in 2023. I quickly advanced to a full-time role as WordPress Developer & SEO Expert, where I now build and optimize WooCommerce stores, configure Google Analytics and Search Console, implement schema markup, and drive organic growth for clients across Pakistan.",
                "I'm fluent in four languages — English, Urdu, Pashto, and Khowar — which helps me communicate clearly with clients and stakeholders from diverse backgrounds. I'm passionate about building fast, accessible websites that serve real users and deliver measurable business impact.",
              ].map((para, i) => (
                <p key={i} className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {para}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Career Journey Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <SectionHeader badge="Career Journey" title="Experience & Education" />
          <Timeline items={careerTimeline} />
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-[#0a0a09]/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="Technical Skills" title="Skills & Technologies" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(skills).map(([key, cat], catIdx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIdx * 0.08 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:border-primary/30 dark:hover:border-primary/30 transition-colors"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="relative group">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg font-medium ${levelColor[skill.level] || levelColor.Intermediate}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${levelDot[skill.level] || levelDot.Intermediate}`} />
                        {skill.name}
                      </span>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                        {skill.level}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skill level legend */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400"
          >
            {Object.entries(levelDot).map(([level, color]) => (
              <div key={level} className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${color}`} />
                {level}
              </div>
            ))}
            <span className="text-gray-400 dark:text-gray-600 ml-1">— hover skill for level</span>
          </motion.div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <SectionHeader badge="Languages" title="Multilingual" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {languages.map((lang, idx) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 text-center"
              >
                <div className="flex justify-center mb-2 text-primary dark:text-primary-light">
                  {lang.name === 'English' ? <Globe className="w-8 h-8" /> : lang.name === 'Urdu' ? <Flag className="w-8 h-8" /> : lang.name === 'Pashto' ? <Leaf className="w-8 h-8" /> : <Mountain className="w-8 h-8" />}
                </div>
                <p className="font-bold text-sm text-gray-900 dark:text-gray-100 mb-1">{lang.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{lang.level}</p>
                <div className="flex justify-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-1.5 rounded-full ${i < lang.bars ? 'bg-primary dark:bg-primary-light' : 'bg-gray-200 dark:bg-gray-700'}`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Goals */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-[#0a0a09]/50">
        <div className="max-w-3xl mx-auto">
          <SectionHeader badge="Vision" title="Career Goals" />
          <div className="space-y-3">
            {careerGoals.map((goal, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-primary/30 dark:hover:border-primary/30 transition-colors"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-light flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">{goal}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

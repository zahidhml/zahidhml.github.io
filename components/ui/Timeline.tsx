'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';

export interface TimelineItem {
  id: string;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  typeLabel?: string;
  description?: string;
  highlights: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

const iconMap = {
  work: Briefcase,
  education: GraduationCap,
};

const colorMap = {
  work: 'bg-primary text-white',
  education: 'bg-accent text-white',
};

const badgeMap = {
  work: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light',
  education:
    'bg-accent/10 text-amber-800 dark:bg-accent/20 dark:text-amber-300',
};

/**
 * Timeline — animated vertical timeline for experience and education entries.
 */
export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/30 to-transparent hidden sm:block" />

      <div className="space-y-10">
        {items.map((item, idx) => {
          const Icon = iconMap[item.type];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              viewport={{ once: true }}
              className="relative flex gap-6"
            >
              {/* Icon dot */}
              <div
                className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${colorMap[item.type]}`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Content card */}
              <div className="flex-1 bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                {/* Top meta row */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${badgeMap[item.type]}`}
                  >
                    {item.typeLabel ||
                      (item.type === 'work' ? 'Work Experience' : 'Education')}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {item.period}
                  </span>
                </div>

                {/* Title & org */}
                <h3 className="text-xl font-display font-bold text-gray-900 dark:text-gray-50 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm font-semibold text-primary dark:text-primary-light mb-0.5">
                  {item.organization}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-1">
                  <MapPin className="w-3 h-3 flex-shrink-0" /> {item.location}
                </p>

                {/* Description */}
                {item.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Highlights */}
                <ul className="space-y-1.5">
                  {item.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-light flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

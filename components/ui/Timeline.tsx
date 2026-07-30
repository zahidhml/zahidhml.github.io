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
  logo?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const iconMap = { work: Briefcase, education: GraduationCap };

/**
 * Timeline — premium dark glass timeline for experience and education entries.
 */
export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical connecting line */}
      <div
        className="absolute left-5 top-0 bottom-0 w-px hidden sm:block"
        style={{
          background: 'linear-gradient(to bottom, #7400B8, rgba(116,0,184,0.2), transparent)',
        }}
      />

      <div className="space-y-10">
        {items.map((item, idx) => {
          const Icon = iconMap[item.type];
          const isWork = item.type === 'work';

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              viewport={{ once: true }}
              className="relative flex gap-6"
            >
              {/* Icon dot / Logo */}
              <div
                className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg overflow-hidden"
                style={{
                  background: item.logo 
                    ? '#ffffff'
                    : isWork
                      ? 'linear-gradient(135deg, #7400B8, #5E60CE)'
                      : 'linear-gradient(135deg, #48BFE3, #80FFDB)',
                  boxShadow: isWork
                    ? '0 0 20px rgba(116,0,184,0.4)'
                    : '0 0 20px rgba(72,191,227,0.3)',
                }}
              >
                {item.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.logo} alt={item.organization} className="w-full h-full object-cover" />
                ) : (
                  <Icon className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Content card */}
              <div
                className="flex-1 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(116,0,184,0.3)';
                  el.style.boxShadow = '0 8px 32px rgba(116,0,184,0.12)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(255,255,255,0.08)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Top meta */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={
                      isWork
                        ? {
                            background: 'rgba(116,0,184,0.15)',
                            border: '1px solid rgba(116,0,184,0.3)',
                            color: '#B8C0D4',
                          }
                        : {
                            background: 'rgba(72,191,227,0.12)',
                            border: '1px solid rgba(72,191,227,0.25)',
                            color: '#B8C0D4',
                          }
                    }
                  >
                    {item.typeLabel || (isWork ? 'Work Experience' : 'Education')}
                  </span>
                  <span
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: '#8A94A7',
                    }}
                  >
                    {item.period}
                  </span>
                </div>

                {/* Title & org */}
                <h3 className="text-xl font-bold text-white mb-1 tracking-tight">
                  {item.title}
                </h3>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: '#80FFDB' }}
                >
                  {item.organization}
                </p>
                <p
                  className="text-xs flex items-center gap-1.5 mb-5"
                  style={{ color: '#8A94A7' }}
                >
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  {item.location}
                </p>

                {/* Description */}
                {item.description && (
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: '#8A94A7' }}
                  >
                    {item.description}
                  </p>
                )}

                {/* Highlights */}
                <ul className="space-y-2">
                  {item.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: '#B8C0D4' }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{
                          background: isWork
                            ? 'linear-gradient(135deg, #7400B8, #5E60CE)'
                            : 'linear-gradient(135deg, #48BFE3, #80FFDB)',
                        }}
                      />
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

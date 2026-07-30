'use client';

import { motion } from 'framer-motion';
import { useRef, type MouseEvent } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';

interface Skill {
  name: string;
  icon: string;
  years: string;
  color: string;
}

const skillGrid: Skill[] = [
  { name: 'WordPress', icon: 'https://cdn.simpleicons.org/wordpress/white', years: '2+ yrs', color: '#21759B' },
  { name: 'WooCommerce', icon: 'https://cdn.simpleicons.org/woocommerce/white', years: '2+ yrs', color: '#7F54B3' },
  { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/white', years: '3+ yrs', color: '#E34F26' },
  { name: 'CSS3', icon: 'https://cdn.simpleicons.org/css3/white', years: '3+ yrs', color: '#1572B6' },
  { name: 'JavaScript', icon: 'https://cdn.simpleicons.org/javascript/white', years: '2+ yrs', color: '#F7DF1E' },
  { name: 'PHP', icon: 'https://cdn.simpleicons.org/php/white', years: '2+ yrs', color: '#777BB4' },
  { name: 'Technical SEO', icon: 'https://cdn.simpleicons.org/googlesearchconsole/white', years: '2+ yrs', color: '#4EA8DE' },
  { name: 'On-Page SEO', icon: 'https://cdn.simpleicons.org/google/white', years: '2+ yrs', color: '#56CFE1' },
  { name: 'Google Analytics', icon: 'https://cdn.simpleicons.org/googleanalytics/white', years: '2+ yrs', color: '#F9AB00' },
  { name: 'Elementor', icon: 'https://cdn.simpleicons.org/elementor/white', years: '2+ yrs', color: '#92003B' },
  { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/white', years: '2+ yrs', color: '#ffffff' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/white', years: '1+ yr', color: '#FFFFFF' },
  { name: 'Performance Opt.', icon: 'https://cdn.simpleicons.org/lighthouse/white', years: '2+ yrs', color: '#72EFDD' },
  { name: 'REST APIs', icon: 'https://cdn.simpleicons.org/json/white', years: '1+ yr', color: '#80FFDB' },
  { name: 'SSL & Hosting', icon: 'https://cdn.simpleicons.org/letsencrypt/white', years: '2+ yrs', color: '#5390D9' },
  { name: 'Schema Markup', icon: 'https://cdn.simpleicons.org/schemaorg/white', years: '2+ yrs', color: '#5E60CE' },
];

/**
 * Skills — premium technology card grid with glass tilt, hover glow, and lift.
 */
export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8"
      aria-label="Skills section"
      style={{ background: '#050816' }}
    >
      {/* Background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(ellipse, rgba(116,0,184,0.6) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          badge="Skills"
          title="What I Work With"
          titleGradient={false}
          subtitle="Technologies and tools I use to build fast, optimized, and scalable web experiences."
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
          {skillGrid.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              viewport={{ once: true }}
            >
              <SkillCard skill={skill} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const hlRef      = useRef<HTMLDivElement>(null);
  const isLightIcon = skill.color === '#F7DF1E' || skill.color === '#F9AB00';

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    const hl = hlRef.current;
    if (!el || !hl) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform  = `perspective(600px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg)`;
    el.style.transition = 'transform 0.1s ease';
    hl.style.opacity = '1';
    hl.style.left    = `${e.clientX - rect.left}px`;
    hl.style.top     = `${e.clientY - rect.top}px`;
  };
  const onLeave = () => {
    if (cardRef.current) { cardRef.current.style.transform = ''; cardRef.current.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)'; }
    if (hlRef.current)   { hlRef.current.style.opacity = '0'; }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative rounded-2xl p-5 cursor-default transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(116,0,184,0.2)] overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        willChange: 'transform',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(116,0,184,0.4)';
        el.style.background  = 'rgba(255,255,255,0.06)';
      }}
    >
      {/* Cursor highlight */}
      <div
        ref={hlRef}
        className="pointer-events-none absolute w-36 h-36 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', opacity: 0, transition: 'opacity 0.2s ease' }}
      />

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: `${skill.color}18`,
          border: `1px solid ${skill.color}30`,
          boxShadow: `0 0 20px ${skill.color}15`,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={skill.icon} alt={skill.name} className="w-5 h-5 object-contain opacity-90" />
      </div>

      {/* Name */}
      <p className="font-semibold text-sm text-white mb-1 leading-tight">{skill.name}</p>

      {/* Years */}
      <p className="text-xs font-medium" style={{ color: '#8A94A7' }}>{skill.years}</p>

      {/* Bottom gradient line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(90deg, #7400B8, #48BFE3, #80FFDB)' }}
      />
    </div>
  );
}

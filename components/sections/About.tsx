'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, MapPin, Briefcase, GraduationCap, Globe } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import skillsData from '@/data/skills.json';
import type { SkillsData } from '@/types';
import { useSmoothScroll } from '@/components/providers/LenisProvider';
import { useRef, type MouseEvent } from 'react';

const skills = skillsData as SkillsData;

const bio = [
  "I'm a WordPress Developer & SEO Expert at HindukushSoft Technologies, based in Drosh, Lower Chitral. I design and build WordPress websites, WooCommerce e-commerce platforms, and implement technical SEO strategies.",
  "With a B.S. in Computer Science from the University of Chitral and 2+ years of hands-on experience, I combine strong technical fundamentals with real-world web development expertise.",
];

const details = [
  { icon: MapPin,         label: 'Location',  value: 'Drosh, Chitral, KPK' },
  { icon: Briefcase,      label: 'Company',   value: 'HindukushSoft Technologies' },
  { icon: GraduationCap, label: 'Education', value: 'BS Computer Science' },
  { icon: Globe,          label: 'Languages', value: 'EN / UR / PS / KHO' },
];

/** Glass card with subtle 2° tilt and highlight sweep on hover */
function GlassTiltCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    const hl = highlightRef.current;
    if (!el || !hl) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform  = `perspective(700px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg)`;
    el.style.transition = 'transform 0.12s ease';
    // Move the highlight
    hl.style.opacity   = '1';
    hl.style.left      = `${(e.clientX - rect.left)}px`;
    hl.style.top       = `${(e.clientY - rect.top)}px`;
  };

  const onLeave = () => {
    const el = cardRef.current;
    const hl = highlightRef.current;
    if (el) { el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)'; el.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)'; }
    if (hl) { hl.style.opacity = '0'; }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ willChange: 'transform', ...style }}
    >
      {/* Radial highlight that follows the cursor */}
      <div
        ref={highlightRef}
        className="pointer-events-none absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)',
          opacity: 0,
          transition: 'opacity 0.2s ease',
        }}
      />
      {children}
    </div>
  );
}

/**
 * About — profile card with image rotation + glass tilt, bio, detail cards, skill overview.
 */
export default function About() {
  const topCategories = Object.entries(skills).slice(0, 3);
  const { scrollTo } = useSmoothScroll();

  // Image mouse rotation
  const imgCardRef = useRef<HTMLDivElement>(null);
  const onImgMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = imgCardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    el.style.transform  = `perspective(600px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    el.style.transition = 'transform 0.1s ease';
  };
  const onImgLeave = () => {
    if (imgCardRef.current) {
      imgCardRef.current.style.transform  = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
      imgCardRef.current.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
    }
  };

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 lg:px-8"
      aria-label="About section"
      style={{ background: '#0B1021' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(94,96,206,0.3) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          badge="About Me"
          title="Crafting the Web, One Site at a Time"
          subtitle="Turning great ideas into fast, search-optimized WordPress experiences."
        />

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-20">

          {/* Profile visual — interactive tilt + image rotation */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <div className="relative">
              {/* Glow */}
              <div
                className="absolute -inset-4 rounded-3xl blur-xl opacity-25"
                style={{ background: 'linear-gradient(135deg, rgba(116,0,184,0.5), rgba(72,191,227,0.3))' }}
              />

              {/* Profile card — rotates on mouse */}
              <div
                ref={imgCardRef}
                onMouseMove={onImgMove}
                onMouseLeave={onImgLeave}
                className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl flex flex-col items-center justify-center gap-5 cursor-default"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(12px)',
                  willChange: 'transform',
                }}
              >
                <div
                  className="relative w-32 h-32 rounded-2xl overflow-hidden"
                  style={{ border: '2px solid rgba(116,0,184,0.5)', boxShadow: '0 0 30px rgba(116,0,184,0.3)' }}
                >
                  <Image
                    src="/images/profile-1.jpg"
                    alt="Muhammad Zahid Iqbal"
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
                <div className="text-center px-6">
                  <p className="text-base font-bold text-white mb-1">Muhammad Zahid Iqbal</p>
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#80FFDB' }}>
                    WordPress Dev & SEO Expert
                  </p>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{ background: 'linear-gradient(90deg, #7400B8, #48BFE3, #80FFDB)' }}
                />
              </div>

              {/* Floating badges */}
              <div
                className="absolute -bottom-5 -right-5 px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-xl"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-white">Open to Work</span>
              </div>
              <div
                className="absolute -top-5 -left-5 px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-xl"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}
              >
                <span className="text-lg font-bold" style={{ color: '#80FFDB' }}>2+</span>
                <span className="text-xs font-semibold text-[#B8C0D4]">Years Exp.</span>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="space-y-5 mb-10">
              {bio.map((para, i) => (
                <p key={i} className="text-base sm:text-lg leading-relaxed" style={{ color: '#B8C0D4' }}>
                  {para}
                </p>
              ))}
            </div>

            {/* Detail cards — glass tilt */}
            <div className="grid grid-cols-2 gap-3 mb-10">
              {details.map((item) => {
                const Icon = item.icon;
                return (
                  <GlassTiltCard
                    key={item.label}
                    className="rounded-xl p-3.5"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-3.5 h-3.5" style={{ color: '#5E60CE' }} />
                      <p className="text-xs" style={{ color: '#8A94A7' }}>{item.label}</p>
                    </div>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                  </GlassTiltCard>
                );
              })}
            </div>

            <button
              onClick={() => scrollTo('#resume', { offset: -76 })}
              className="group inline-flex items-center gap-2 font-semibold text-sm transition-all duration-200 cursor-pointer"
              style={{ color: '#80FFDB' }}
            >
              View My Experience
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>
        </div>

        {/* Skills overview */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 tracking-tight text-center">Core Skills & Technologies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {topCategories.map(([key, cat], catIdx) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: catIdx * 0.1 }}
                viewport={{ once: true }}
              >
                <GlassTiltCard
                  className="rounded-2xl p-5 h-full"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <h4
                    className="text-xs font-bold uppercase tracking-[0.15em] mb-4"
                    style={{ color: '#5E60CE' }}
                  >
                    {cat.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.slice(0, 6).map((skill) => (
                      <span
                        key={skill.name}
                        className="text-xs px-2.5 py-1 rounded-lg font-medium"
                        style={{ background: 'rgba(116,0,184,0.12)', border: '1px solid rgba(116,0,184,0.25)', color: '#B8C0D4' }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </GlassTiltCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => scrollTo('#skills', { offset: -76 })}
              className="inline-flex items-center gap-2 px-6 py-3 font-semibold rounded-xl text-sm transition-all duration-300 hover:-translate-y-0.5 border cursor-pointer"
              style={{ color: '#B8C0D4', borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(116,0,184,0.4)'; (e.currentTarget as HTMLElement).style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.color = '#B8C0D4'; }}
            >
              View All Skills
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

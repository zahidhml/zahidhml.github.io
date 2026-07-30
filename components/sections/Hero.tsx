'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Mail, Star, MapPin } from 'lucide-react';
import FloatingCodeBg from '@/components/ui/FloatingCodeBg';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import MagneticButton from '@/components/ui/MagneticButton';
import { useSmoothScroll } from '@/components/providers/LenisProvider';

const roles = [
  'WordPress Developer',
  'Frontend Developer',
  'SEO Specialist',
  'WooCommerce Expert',
];

const stats = [
  { label: 'Projects Delivered', end: 3,   suffix: '+' },
  { label: 'Years Experience',   end: 2,   suffix: '+' },
  { label: 'Lighthouse Score',   end: 90,  suffix: '+' },
  { label: 'Client Satisfaction',end: 100, suffix: '%' },
];

/**
 * Hero — full-viewport landing section.
 * Features: floating code canvas, magnetic CTAs, gradient heading, animated stats.
 */
export default function Hero() {
  const [mounted,     setMounted]     = useState(false);
  const [roleIdx,     setRoleIdx]     = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting,  setIsDeleting]  = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => { setMounted(true); }, []);

  // Typewriter
  useEffect(() => {
    if (!mounted) return;
    const current = roles[roleIdx];
    let t: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText === current) {
      t = setTimeout(() => setIsDeleting(true), 2600);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    } else {
      t = setTimeout(
        () => setDisplayText(isDeleting
          ? current.slice(0, displayText.length - 1)
          : current.slice(0, displayText.length + 1)
        ),
        isDeleting ? 42 : 68,
      );
    }
    return () => clearTimeout(t);
  }, [mounted, displayText, isDeleting, roleIdx]);

  // We removed if (!mounted) return null; to allow SSR to render the Hero section.

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Hero section"
      style={{ background: '#050816' }}
    >
      {/* Floating code canvas */}
      <FloatingCodeBg />

      {/* Radial gradient overlay — top hero glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(116,0,184,0.25) 0%, transparent 65%)',
        }}
      />
      {/* Subtle grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center pt-16">

        {/* Location badge */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex items-center justify-center mb-9"
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] px-5 py-2 rounded-full border"
            style={{ color: '#80FFDB', background: 'rgba(128,255,219,0.08)', borderColor: 'rgba(128,255,219,0.2)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#80FFDB] animate-pulse" />
            <MapPin className="w-3 h-3" />
            Chitral, KPK, Pakistan
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="font-bold tracking-tight leading-[1.08] mb-6 select-none"
          style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}
        >
          <span className="text-white">Muhammad</span>{' '}
          <br className="hidden sm:block" />
          <span
            style={{
              background: 'linear-gradient(135deg, #7400B8 0%, #6930C3 25%, #5E60CE 50%, #48BFE3 75%, #80FFDB 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Zahid Iqbal
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="flex items-center justify-center h-10 sm:h-12 mb-7"
        >
          <span className="text-xl sm:text-2xl lg:text-3xl font-semibold" style={{ color: '#B8C0D4' }}>
            {mounted ? displayText : roles[0]}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.85, repeat: Infinity }}
              style={{ color: '#80FFDB' }}
            >
              |
            </motion.span>
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.26 }}
          className="text-base sm:text-lg mb-12 max-w-xl mx-auto leading-relaxed"
          style={{ color: '#8A94A7' }}
        >
          Building fast, accessible WordPress websites and WooCommerce stores —
          optimized for search engines, performance, and real-world impact.
        </motion.p>

        {/* CTA buttons — magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.36 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-20"
        >
          {/* Primary */}
          <MagneticButton strength={0.25}>
            <button
              onClick={() => scrollTo('#projects', { offset: -76 })}
              className="group flex items-center gap-2.5 px-7 py-3.5 text-white font-semibold rounded-xl text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(116,0,184,0.5)] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #7400B8, #5E60CE)',
                boxShadow: '0 4px 24px rgba(116,0,184,0.4)',
              }}
            >
              <Star className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              View Projects
            </button>
          </MagneticButton>

          {/* Secondary */}
          <MagneticButton strength={0.25}>
            <a
              href="/resume/zahid-iqbal-resume.pdf"
              download
              className="group flex items-center gap-2.5 px-7 py-3.5 font-semibold rounded-xl text-sm transition-all duration-300 hover:-translate-y-1 border"
              style={{
                color: '#B8C0D4',
                borderColor: 'rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(116,0,184,0.5)';
                el.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.12)';
                el.style.color = '#B8C0D4';
              }}
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" />
              Download Resume
            </a>
          </MagneticButton>

          {/* Tertiary */}
          <MagneticButton strength={0.25}>
            <button
              onClick={() => scrollTo('#contact', { offset: -76 })}
              className="group flex items-center gap-2.5 px-7 py-3.5 font-semibold rounded-xl text-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{ color: '#8A94A7' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#80FFDB')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#8A94A7')}
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              Contact Me
            </button>
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.56 + i * 0.08 }}
              className="relative rounded-2xl p-4 sm:p-5 text-center overflow-hidden group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(116,0,184,0.35)';
                el.style.boxShadow = '0 8px 24px rgba(116,0,184,0.15)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.08)';
                el.style.boxShadow = 'none';
              }}
            >
              <div className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: '#80FFDB' }}>
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <p className="text-xs font-medium" style={{ color: '#8A94A7' }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.button
          onClick={() => scrollTo('#about', { offset: -76 })}
          animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 mx-auto cursor-pointer"
          style={{ color: '#8A94A7' }}
          aria-label="Scroll to about section"
        >
          <span className="text-xs uppercase tracking-[0.2em] font-medium">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </div>
    </section>
  );
}

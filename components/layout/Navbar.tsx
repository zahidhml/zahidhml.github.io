'use client';

import { useEffect, useState } from 'react';
import { Menu, X, Download, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from '@/components/providers/LenisProvider';

const navLinks = [
  { label: 'Home',          section: 'home'     },
  { label: 'About',         section: 'about'    },
  { label: 'Skills',        section: 'skills'   },
  { label: 'Selected Work', section: 'projects' },
  { label: 'Experience',    section: 'resume'   },
  { label: 'Contact',       section: 'contact'  },
];

/**
 * Navbar — executive header with prominent top-right CTAs, glassmorphism,
 * responsive visibility, and 100% accurate scroll position section tracking.
 */
export default function Navbar() {
  const [isOpen,        setIsOpen]        = useState(false);
  const [isScrolled,    setIsScrolled]    = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollTo } = useSmoothScroll();

  // Scroll detection for glass backdrop and active section tracking
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.section);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;

      // Toggle glass header background
      setIsScrolled(scrollPosition > 20);

      // Edge case 1: Top of page -> Home
      if (scrollPosition < 120) {
        setActiveSection('home');
        return;
      }

      // Edge case 2: Bottom of page -> Contact
      if (window.innerHeight + scrollPosition >= totalHeight - 100) {
        setActiveSection('contact');
        return;
      }

      // Mathematical section collision detection (target point 35% down viewport)
      const targetY = scrollPosition + viewportHeight * 0.35;
      let matchedSection = 'home';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.offsetTop;
        const height = el.offsetHeight;

        if (targetY >= top && targetY < top + height) {
          matchedSection = id;
          break;
        }
      }

      setActiveSection(matchedSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveSection(section);
    scrollTo(`#${section}`, { offset: -80, duration: 1.3 });
  };

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="fixed top-4 left-4 z-[100] px-5 py-2.5 bg-[#7400B8] text-white text-sm font-semibold rounded-xl opacity-0 focus:opacity-100 focus:outline-none transition-opacity shadow-2xl"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#050816]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)] py-1'
            : 'bg-transparent py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-22">

            {/* Brand Logo */}
            <button
              onClick={(e) => handleNavClick(e as unknown as React.MouseEvent, 'home')}
              className="group flex items-center gap-3 font-bold text-xl cursor-pointer"
              aria-label="Go to home"
            >
              <div
                className="relative w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border-2 border-[#7400B8] transition-transform duration-300 group-hover:scale-105 shadow-md flex-shrink-0"
                style={{
                  boxShadow: '0 0 20px rgba(116,0,184,0.4)',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/profile-1.jpg"
                  alt="Muhammad Zahid Iqbal"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-white font-bold text-base sm:text-lg tracking-tight group-hover:text-[#80FFDB] transition-colors duration-300">
                  Zahid Iqbal
                </span>
                <span className="text-xs font-medium text-[#8A94A7] hidden sm:block">
                  WordPress & SEO Specialist
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.07)',
                backdropFilter: 'blur(16px)',
              }}
              role="navigation"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.section;
                return (
                  <button
                    key={link.section}
                    onClick={(e) => handleNavClick(e as unknown as React.MouseEvent, link.section)}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-white bg-white/[0.08]'
                        : 'text-[#8A94A7] hover:text-white hover:bg-white/[0.04]'
                    }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill-active"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] w-6 rounded-full"
                        style={{
                          background: 'linear-gradient(90deg, #7400B8, #80FFDB)',
                          boxShadow: '0 0 8px rgba(128, 255, 219, 0.6)',
                        }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Top-Right Executive Actions */}
            <div className="flex items-center gap-3">
              {/* Primary Resume / CV Download Button */}
              <a
                href="/resume/zahid-iqbal-resume.pdf"
                download
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl text-white transition-all duration-300 hover:-translate-y-0.5 border"
                style={{
                  background: 'linear-gradient(135deg, #7400B8 0%, #5E60CE 100%)',
                  borderColor: 'rgba(128, 255, 219, 0.3)',
                  boxShadow: '0 4px 20px rgba(116, 0, 184, 0.4)',
                }}
              >
                <Download className="w-4 h-4 text-[#80FFDB]" />
                <span>Resume / CV</span>
              </a>

              {/* Contact Me Quick CTA */}
              <button
                onClick={(e) => handleNavClick(e as unknown as React.MouseEvent, 'contact')}
                className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-xl text-[#B8C0D4] hover:text-white transition-all duration-300 hover:-translate-y-0.5 border cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                }}
              >
                <span>Hire Me</span>
                <ArrowUpRight className="w-4 h-4 text-[#80FFDB]" />
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2.5 text-[#B8C0D4] hover:text-white hover:bg-white/[0.08] rounded-xl border border-white/[0.08] transition-colors cursor-pointer"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu modal overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="md:hidden overflow-hidden border-t border-white/[0.08] bg-[#050816]/98 backdrop-blur-2xl"
            >
              <nav
                className="px-5 py-6 space-y-2"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.section;
                  return (
                    <motion.div
                      key={link.section}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.25 }}
                    >
                      <button
                        onClick={(e) => handleNavClick(e as unknown as React.MouseEvent, link.section)}
                        className={`w-full flex items-center px-4 py-3.5 text-base font-semibold rounded-2xl transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-white/[0.08] text-white border border-white/[0.12]'
                            : 'text-[#B8C0D4] hover:text-white hover:bg-white/[0.04]'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {link.label}
                        {isActive && (
                          <span
                            className="ml-auto w-2 h-2 rounded-full shadow-lg"
                            style={{ background: 'linear-gradient(135deg, #7400B8, #80FFDB)' }}
                          />
                        )}
                      </button>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.25 }}
                  className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5"
                >
                  <a
                    href="/resume/zahid-iqbal-resume.pdf"
                    download
                    className="flex items-center justify-center gap-2.5 px-5 py-3.5 text-sm font-bold rounded-2xl text-white shadow-xl"
                    style={{ background: 'linear-gradient(135deg, #7400B8, #5E60CE)' }}
                  >
                    <Download className="w-4 h-4 text-[#80FFDB]" />
                    Download Resume / CV
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

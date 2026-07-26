'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Navbar — sticky glass-morphism nav with multi-page routing, active states,
 * animated mobile menu, and theme toggle.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="fixed top-4 left-4 z-[60] px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg opacity-0 focus:opacity-100 focus:outline-none transition-opacity"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-[#111210]/80 backdrop-blur-xl shadow-sm border-b border-gray-200/60 dark:border-gray-800/60'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-2 font-display font-bold text-xl"
            >
              <span className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm group-hover:bg-primary-light transition-colors">
                ZI
              </span>
              <span className="hidden sm:block text-gray-900 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                Zahid Iqbal
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-primary dark:text-primary-light'
                        : 'text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light hover:bg-gray-100/60 dark:hover:bg-gray-800/60'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary dark:bg-primary-light rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <a
                href="/resume/zahid-iqbal-resume.pdf"
                download
                className="hidden lg:flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Resume
              </a>
              <ThemeToggle />
              {/* Mobile menu button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-[#111210]/95 backdrop-blur-xl"
            >
              <nav className="px-4 py-4 space-y-1" role="navigation" aria-label="Mobile navigation">
                {navLinks.map((link, i) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-light'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {link.label}
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-light" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
                <div className="pt-2 border-t border-gray-200 dark:border-gray-800">
                  <a
                    href="/resume/zahid-iqbal-resume.pdf"
                    download
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary-light transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

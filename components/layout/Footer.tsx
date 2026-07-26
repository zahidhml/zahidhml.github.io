'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, MessageCircle, MapPin, Heart, Facebook, Instagram } from 'lucide-react';

const socialLinks = [
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:mzahidiqbal129@gmail.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/zahidhml',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/itszahidd7/',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/itszahidd7',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/itszahidd7',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    href: 'https://wa.me/923486377723',
  },
];

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resume', href: '/resume' },
  { label: 'Contact', href: '/contact' },
];

const skills = [
  'WordPress',
  'WooCommerce',
  'Technical SEO',
  'On-Page SEO',
  'Google Analytics',
  'Next.js 15',
];

/**
 * Footer — rich footer with brand, skills cloud, quick nav, and social links.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-[#0d0e0c] border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm">
                ZI
              </div>
              <span className="text-xl font-display font-bold text-gray-900 dark:text-gray-100">
                Zahid Iqbal
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 max-w-xs">
              WordPress Developer & SEO Expert at HindukushSoft Technologies.
              Building fast, accessible websites with real-world impact.
            </p>
            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-500 mb-6">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              Drosh, Lower Chitral, KPK, Pakistan
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="p-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white hover:border-primary dark:hover:bg-primary-light dark:hover:text-gray-900 dark:hover:border-primary-light rounded-xl transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-bold text-gray-900 dark:text-gray-100 mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills cloud */}
          <div>
            <h3 className="font-display font-bold text-gray-900 dark:text-gray-100 mb-4 text-sm uppercase tracking-wider">
              Top Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 rounded-lg font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
            <p className="flex items-center gap-1">
              © {currentYear} Muhammad Zahid Iqbal — Made with{' '}
              <Heart className="w-3 h-3 text-red-500 fill-red-500 inline mx-0.5" />{' '}
              by Zahid
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Open to opportunities
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

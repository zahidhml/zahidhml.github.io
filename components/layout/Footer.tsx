'use client';

import { Github, Linkedin, Mail, MessageCircle, MapPin, Heart, Facebook, Instagram, ArrowUp } from 'lucide-react';
import { useSmoothScroll } from '@/components/providers/LenisProvider';

const socialLinks = [
  { icon: Mail,          label: 'Email',     href: 'mailto:mzahidiqbal129@gmail.com' },
  { icon: Github,        label: 'GitHub',    href: 'https://github.com/zahidhml' },
  { icon: Linkedin,      label: 'LinkedIn',  href: 'https://www.linkedin.com/in/itszahidd7/' },
  { icon: Facebook,      label: 'Facebook',  href: 'https://www.facebook.com/itszahidd7' },
  { icon: Instagram,     label: 'Instagram', href: 'https://www.instagram.com/itszahidd7' },
  { icon: MessageCircle, label: 'WhatsApp',  href: 'https://wa.me/923486377723' },
];

const quickLinks = [
  { label: 'Home',          section: 'home'     },
  { label: 'About',         section: 'about'    },
  { label: 'Skills',        section: 'skills'   },
  { label: 'Selected Work', section: 'projects' },
  { label: 'Experience',    section: 'resume'   },
  { label: 'Contact',       section: 'contact'  },
];

const topSkills = [
  'WordPress', 'WooCommerce', 'Technical SEO',
  'On-Page SEO', 'Google Analytics', 'Next.js 15',
];

/**
 * Footer — elegant minimal dark footer with subtle hover heart animation.
 */
export default function Footer() {
  const { scrollTo } = useSmoothScroll();

  return (
    <footer
      style={{
        background: '#050816',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand & Socials */}
          <div className="md:col-span-2">
            <button
              onClick={() => scrollTo('#home', { offset: 0 })}
              className="flex items-center gap-3 mb-4 cursor-pointer group text-left"
              aria-label="Back to home"
            >
              <div
                className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-[#7400B8] flex-shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/profile-1.jpg"
                  alt="Muhammad Zahid Iqbal"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-bold text-white tracking-tight group-hover:text-[#80FFDB] transition-colors duration-200">
                Zahid Iqbal
              </span>
            </button>

            <p className="text-xs sm:text-sm leading-relaxed mb-4 max-w-xs text-[#8A94A7]">
              WordPress Developer & SEO Expert at HindukushSoft Technologies.
              Crafting fast, search-optimized web applications.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-[#8A94A7] mb-6">
              <MapPin className="w-3.5 h-3.5 text-[#7400B8] flex-shrink-0" />
              Drosh, Lower Chitral, KPK, Pakistan
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 flex-wrap">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="p-2 rounded-xl text-[#8A94A7] hover:text-white transition-colors duration-150 border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08]"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-4 text-[#5E60CE]">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.section}>
                  <button
                    onClick={() => scrollTo(`#${link.section}`, { offset: -76 })}
                    className="text-xs sm:text-sm text-[#8A94A7] hover:text-white transition-colors duration-150 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#7400B8]/50" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Skills */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-widest mb-4 text-[#5E60CE]">
              Top Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {topSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs px-2.5 py-1 rounded-lg font-medium text-[#8A94A7] bg-white/[0.03] border border-white/[0.08]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal Centered Footer Text */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06]"
        >
          <div className="flex items-center gap-1.5 text-xs text-[#8A94A7] group cursor-default">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 transition-transform duration-200 group-hover:scale-125" />
            <span>by <strong className="text-white font-semibold">Muhammad Zahid Iqbal</strong></span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs text-[#8A94A7]">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Open for opportunities
            </span>

            <button
              onClick={() => scrollTo('#home', { offset: 0, duration: 1.2 })}
              aria-label="Back to top"
              className="p-2 rounded-xl text-[#B8C0D4] hover:text-white transition-colors duration-150 border border-white/[0.08] bg-white/[0.04] cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

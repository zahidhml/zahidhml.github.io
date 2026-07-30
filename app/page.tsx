import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Resume from '@/components/sections/Resume';
import Contact from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Muhammad Zahid Iqbal — WordPress Developer & SEO Expert | Portfolio',
  description:
    'WordPress Developer & SEO Expert at HindukushSoft Technologies. I build fast WooCommerce stores, optimize websites for search engines, and drive organic growth. Based in Chitral, Pakistan.',
  alternates: {
    canonical: '/',
  },
};

function SectionDivider() {
  return (
    <div className="relative w-full h-px overflow-hidden pointer-events-none z-10" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(116,0,184,0.3) 25%, rgba(128,255,219,0.3) 50%, rgba(72,191,227,0.3) 75%, transparent 100%)',
        }}
      />
    </div>
  );
}

/**
 * Home page — continuous single-page portfolio with soft gradient transitions.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Skills />
      <SectionDivider />
      <Projects />
      <SectionDivider />
      <Resume />
      <SectionDivider />
      <Contact />
    </>
  );
}

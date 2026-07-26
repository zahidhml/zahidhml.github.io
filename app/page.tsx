import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
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

/**
 * Home page — combines all major sections with smooth scroll anchors.
 */
export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <About />
      <Projects />
      <Resume />
      <Contact />
    </main>
  );
}

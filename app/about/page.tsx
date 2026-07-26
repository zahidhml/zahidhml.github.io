import type { Metadata } from 'next';
import AboutPageContent from '@/components/pages/AboutPageContent';

export const metadata: Metadata = {
  title: 'About — Muhammad Zahid Iqbal | WordPress Developer & SEO Expert',
  description:
    'Learn about Zahid Iqbal — WordPress Developer & SEO Expert at HindukushSoft Technologies. BS Computer Science graduate from University of Chitral with expertise in WooCommerce, Technical SEO, and Google Analytics.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About — Muhammad Zahid Iqbal',
    description:
      'WordPress Developer & SEO Expert based in Chitral, Pakistan. Skilled in WooCommerce, Technical SEO, and web performance.',
    url: '/about',
  },
};

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <AboutPageContent />
    </main>
  );
}

import type { Metadata } from 'next';
import ProjectsPageContent from '@/components/pages/ProjectsPageContent';

export const metadata: Metadata = {
  title: 'Projects — Muhammad Zahid Iqbal | WordPress & WooCommerce Portfolio',
  description:
    'Browse WordPress, WooCommerce, SEO, and NGO website projects built by Zahid Iqbal at HindukushSoft Technologies. Filter by category and explore live demos.',
  alternates: {
    canonical: '/projects',
  },
  openGraph: {
    title: 'Projects — Muhammad Zahid Iqbal',
    description:
      'WordPress, WooCommerce, and SEO projects. Explore e-commerce stores, nonprofit websites, and more.',
    url: '/projects',
  },
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ProjectsPageContent />
    </main>
  );
}

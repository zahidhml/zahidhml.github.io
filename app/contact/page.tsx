import type { Metadata } from 'next';
import ContactPageContent from '@/components/pages/ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact — Muhammad Zahid Iqbal | Hire a WordPress & SEO Expert',
  description:
    "Get in touch with Zahid Iqbal — WordPress Developer & SEO Expert. Available for WordPress projects, WooCommerce development, SEO consultations, and web development work.",
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ContactPageContent />
    </main>
  );
}

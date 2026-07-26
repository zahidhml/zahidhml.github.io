import type { Metadata } from 'next';
import ResumePageContent from '@/components/pages/ResumePageContent';

export const metadata: Metadata = {
  title: 'Resume — Muhammad Zahid Iqbal | WordPress Developer & SEO Expert',
  description:
    "View and download Zahid Iqbal's resume. WordPress Developer & SEO Expert with 2+ years experience at HindukushSoft Technologies. BS Computer Science, University of Chitral, 2024.",
  alternates: {
    canonical: '/resume',
  },
};

export default function ResumePage() {
  return (
    <main id="main-content" className="min-h-screen">
      <ResumePageContent />
    </main>
  );
}

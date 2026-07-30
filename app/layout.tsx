import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LenisProvider from '@/components/providers/LenisProvider';
import ScrollProgress from '@/components/ui/ScrollProgress';
import CursorSpotlight from '@/components/ui/CursorSpotlight';
import MouseTrail from '@/components/ui/MouseTrail';
import ParticlesCanvas from '@/components/ui/ParticlesCanvas';
import GradientOrbs from '@/components/ui/GradientOrbs';
import { LazyChatWidget } from '@/components/ui/LazyChatWidget';
import { Toaster } from 'sonner';
import './globals.css';

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zahidiqbal.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Muhammad Zahid Iqbal — WordPress Developer & SEO Expert',
    template: '%s | Zahid Iqbal',
  },
  description:
    'WordPress Developer & SEO Expert at HindukushSoft Technologies. I build fast WooCommerce stores, optimize websites for search engines, and drive organic growth. Based in Chitral, KPK, Pakistan.',
  keywords: [
    'WordPress Developer',
    'SEO Expert',
    'WooCommerce Developer',
    'Technical SEO',
    'WordPress Pakistan',
    'Chitral Developer',
    'Web Developer Pakistan',
    'Google Analytics',
    'Website Speed Optimization',
    'HindukushSoft Technologies',
  ],
  authors: [{ name: 'Muhammad Zahid Iqbal', url: siteUrl }],
  creator: 'Muhammad Zahid Iqbal',
  publisher: 'Muhammad Zahid Iqbal',
  category: 'Technology',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Muhammad Zahid Iqbal — WordPress Developer & SEO Expert',
    description:
      'WordPress Developer & SEO Expert. Building fast WooCommerce stores and SEO-optimized websites in Chitral, Pakistan.',
    siteName: 'Zahid Iqbal Portfolio',
    images: [{ url: `${siteUrl}/og.svg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Zahid Iqbal — WordPress Developer & SEO Expert',
    description:
      'WordPress Developer & SEO Expert at HindukushSoft Technologies. WooCommerce, Technical SEO, Google Analytics.',
    creator: '@zahidhml',
    images: [`${siteUrl}/og.svg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/images/profile-1.jpg',
    shortcut: '/images/profile-1.jpg',
    apple: '/images/profile-1.jpg',
  },
  alternates: { canonical: siteUrl },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Zahid Iqbal',
  alternateName: 'Zahid Iqbal',
  url: siteUrl,
  sameAs: ['https://github.com/zahidhml', 'https://linkedin.com/in/zahidhml'],
  jobTitle: 'WordPress Developer & SEO Expert',
  worksFor: {
    '@type': 'Organization',
    name: 'HindukushSoft Technologies',
    url: 'https://hindukushtech.com',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Chitral',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chitral',
      addressRegion: 'Khyber Pakhtunkhwa',
      addressCountry: 'PK',
    },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Drosh, Lower Chitral',
    addressRegion: 'Khyber Pakhtunkhwa',
    addressCountry: 'PK',
  },
  knowsLanguage: ['English', 'Urdu', 'Pashto', 'Khowar'],
  knowsAbout: ['WordPress Development', 'WooCommerce', 'SEO', 'Technical SEO', 'Google Analytics'],
  description:
    'WordPress Developer & SEO Expert at HindukushSoft Technologies, based in Drosh, Lower Chitral, Pakistan. BS CS graduate from University of Chitral (2024).',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Zahid Iqbal Portfolio',
  url: siteUrl,
  author: { '@type': 'Person', name: 'Muhammad Zahid Iqbal' },
  description: 'Portfolio of Muhammad Zahid Iqbal — WordPress Developer & SEO Expert',
  inLanguage: 'en-US',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#050816" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/jpeg" href="/images/profile-1.jpg" />
        <link rel="shortcut icon" type="image/jpeg" href="/images/profile-1.jpg" />
        <link rel="apple-touch-icon" href="/images/profile-1.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body
        suppressHydrationWarning
        className={`${interTight.variable} bg-[#050816] text-white antialiased overflow-x-hidden`}
      >
        {/* Skip link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#7400B8] focus:text-white focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>

        <LenisProvider>
          {/* ── Global fixed/fixed-position layers (z-order: 0→9) ── */}
          {/* z-0: gradient orbs */}
          <GradientOrbs />
          {/* z-1: particles */}
          <ParticlesCanvas />
          {/* z-30: cursor spotlight & mouse trail */}
          <CursorSpotlight />
          <MouseTrail />
          {/* z-50: Floating Chat Widget (shadcn UI) */}
          <LazyChatWidget />
          {/* z-9999: scroll progress bar */}
          <ScrollProgress />

          {/* ── Scrollable content (z-10+) ── */}
          <div className="relative z-10">
            <Navbar />
            <main id="main-content">
              {children}
            </main>
            <Footer />
          </div>
        </LenisProvider>

        <Toaster
          position="bottom-right"
          theme="dark"
          richColors
          closeButton
          toastOptions={{
            style: {
              fontFamily: 'Inter Tight, system-ui, sans-serif',
              background: '#0B1021',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#FFFFFF',
            },
          }}
        />
      </body>
    </html>
  );
}

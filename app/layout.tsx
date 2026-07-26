import type { Metadata } from 'next';
import { Syne, DM_Sans } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeProviderWrapper from '@/components/layout/ThemeProviderWrapper';
import { Toaster } from 'sonner';
import './globals.css';

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
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
    images: [
      {
        url: `${siteUrl}/og.svg`,
        width: 1200,
        height: 630,
      },
    ],
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
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

// JSON-LD Person schema for rich search results
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Zahid Iqbal',
  alternateName: 'Zahid Iqbal',
  url: siteUrl,
  sameAs: [
    'https://github.com/zahidhml',
    'https://linkedin.com/in/zahidhml',
  ],
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
  knowsAbout: [
    'WordPress Development',
    'WooCommerce',
    'SEO',
    'Technical SEO',
    'On-Page SEO',
    'Google Analytics',
    'Website Speed Optimization',
  ],
  description:
    'WordPress Developer & SEO Expert at HindukushSoft Technologies, based in Drosh, Lower Chitral, Pakistan. BS Computer Science graduate from University of Chitral (2024).',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Zahid Iqbal Portfolio',
  url: siteUrl,
  author: {
    '@type': 'Person',
    name: 'Muhammad Zahid Iqbal',
  },
  description:
    'Portfolio website of Muhammad Zahid Iqbal — WordPress Developer & SEO Expert',
  inLanguage: 'en-US',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#111210" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />

        {/* Inline theme script to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${syne.variable} ${dmSans.variable} bg-white dark:bg-[#111210] text-gray-900 dark:text-gray-100 antialiased transition-colors duration-300`}
      >
        {/* Skip to main content for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:font-semibold"
        >
          Skip to main content
        </a>

        <ThemeProviderWrapper>
          <Navbar />
          <div className="relative">
            {/* Global ambient gradient elements */}
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
              <div className="absolute top-0 -left-1/4 w-[500px] h-[500px] bg-primary/5 dark:bg-primary/3 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 dark:bg-accent/3 rounded-full blur-3xl" />
            </div>
            {children}
          </div>
          <Footer />
          <Toaster
            position="bottom-right"
            theme="system"
            richColors
            closeButton
            expand={false}
            toastOptions={{
              style: {
                fontFamily: 'var(--font-dm-sans)',
              },
            }}
          />
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}

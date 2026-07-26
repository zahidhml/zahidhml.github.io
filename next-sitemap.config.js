/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://zahidhml.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 50000,
  exclude: ['/404', '/500', '/api/*'],
};

module.exports = config;

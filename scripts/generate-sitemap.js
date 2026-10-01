import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://globalenterprises.in';
const TODAY = new Date().toISOString().split('T')[0];

const canonicalPages = [
  { url: '/', priority: '1.0', changefreq: 'daily', image: '/images/headquarters.webp', title: 'Global Enterprises Headquarters CR Park New Delhi', caption: 'Commercial CCTV, Access Control & Office Fit-Out Solutions Delhi NCR' },
  { url: '/services', priority: '0.95', changefreq: 'daily', image: '/images/cctv.webp', title: 'Specialized Commercial Service Domains', caption: '4K CCTV, Access Control, Fire Safety, Boardroom AV, Network IT & Office Fit-Outs' },
  { url: '/about', priority: '0.90', changefreq: 'weekly', image: '/images/headquarters.webp', title: 'About Global Enterprises Sachin & Vasu Arora', caption: 'Over a decade of engineering excellence in CR Park, New Delhi' },
  { url: '/capabilities', priority: '0.85', changefreq: 'weekly', image: '/images/speedgates.webp', title: 'Security Hardware & Systems Matrix', caption: 'Commercial security equipment specifications and partner hardware matrix' },
  { url: '/clients', priority: '0.85', changefreq: 'weekly', image: '/images/firesafety.webp', title: 'Enterprise Clients Portfolio', caption: 'Trusted by Indigo, FedEx, Air India, Cosmo First and corporate facilities' },
  { url: '/contact', priority: '0.90', changefreq: 'weekly', image: '/images/headquarters.webp', title: 'Contact CR Park Headquarters New Delhi', caption: 'Technical site audit, custom BOQ proposals and consultation' },
  { url: '/values', priority: '0.70', changefreq: 'monthly', image: '/images/workspace.webp', title: 'Core Operating Values & Corporate Ethics', caption: 'Quality, Timeliness, Fair Value, Dedication and Integrity' },
  { url: '/mission', priority: '0.70', changefreq: 'monthly', image: '/images/hero_bg.webp', title: 'Mission & Strategic Vision', caption: 'Engineering safe, smart, and sustainable commercial workspaces across India' }
];

function generateSitemap() {
  const allUrls = canonicalPages;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  allUrls.forEach(page => {
    const fullUrl = page.url === '/' ? `${BASE_URL}/` : `${BASE_URL}${page.url}`;
    const imgUrl = `${BASE_URL}${page.image}`;
    const escapedCaption = (page.caption || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    const escapedTitle = (page.title || page.caption || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    xml += `  <url>\n`;
    xml += `    <loc>${fullUrl}</loc>\n`;
    xml += `    <lastmod>${TODAY}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${imgUrl}</image:loc>\n`;
    xml += `      <image:title>${escapedTitle}</image:title>\n`;
    xml += `      <image:caption>${escapedCaption}</image:caption>\n`;
    xml += `    </image:image>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;

  const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`Successfully generated public/sitemap.xml with ${allUrls.length} indexable URLs`);
}

generateSitemap();

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = resolve(__dirname, '../dist');

const pages = [
  { path: '/', priority: '1.0' },
  { path: '/search', priority: '0.8' },
  { path: '/sets', priority: '0.8' },
  { path: '/about', priority: '0.5' },
  { path: '/privacy', priority: '0.3' },
];

const today = new Date().toISOString().split('T')[0];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>https://www.gamewayz.com${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync(resolve(dist, 'sitemap.xml'), xml);
console.log('✓ sitemap.xml generated');

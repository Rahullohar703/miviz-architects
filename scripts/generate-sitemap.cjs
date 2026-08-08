const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

// Base URLs
const pages = [
  { url: 'https://mivizarchitects.in/', priority: '1.0', changefreq: 'weekly' },
  { url: 'https://mivizarchitects.in/contact', priority: '0.8', changefreq: 'monthly' }
];

// Get all slugs from data files
const tsFiles = fs.readdirSync(dataDir).filter(f => f.startsWith('seo-') && f.endsWith('.ts'));

tsFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
    const match = content.match(/slug:\s*['"]([^'"]+)['"]/);
    if (match) {
        pages.push({
            url: `https://mivizarchitects.in/${match[1]}`,
            priority: '0.90',
            changefreq: 'monthly'
        });
    }
});

// Generate XML
const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

pages.forEach(page => {
    xml += `  <url>\n`;
    xml += `    <loc>${page.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
});

xml += `</urlset>\n`;

fs.writeFileSync(sitemapPath, xml);
console.log('Sitemap successfully regenerated with ' + pages.length + ' URLs.');

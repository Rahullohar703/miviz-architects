const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
const vercelConfigPath = path.join(__dirname, '../vercel.json');

// 1. Pre-validation of Vercel configuration
if (!fs.existsSync(vercelConfigPath)) {
  console.error(`Fatal Error: vercel.json not found at ${vercelConfigPath}`);
  process.exit(1);
}

let vercelConfig;
try {
  vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
  if (!vercelConfig || typeof vercelConfig !== 'object') {
    throw new Error('vercel.json is not a valid JSON object');
  }
} catch (e) {
  console.error('Fatal Error: Failed to parse vercel.json:', e.message);
  process.exit(1);
}

// 2. Base URLs
const pages = [
  { url: 'https://mivizarchitects.in/', priority: '1.0', changefreq: 'weekly' },
  { url: 'https://mivizarchitects.in/contact', priority: '0.8', changefreq: 'monthly' }
];

const rewrites = [
  { source: '/', destination: '/index.html' },
  { source: '/contact', destination: '/index.html' }
];

const seenSlugs = new Set(['', 'contact']);

// 3. Extract and validate slugs from SEO data files
if (!fs.existsSync(dataDir)) {
  console.error(`Fatal Error: Data directory not found at ${dataDir}`);
  process.exit(1);
}

const tsFiles = fs.readdirSync(dataDir)
  .filter(f => f.startsWith('seo-') && f.endsWith('.ts'))
  .sort();

if (tsFiles.length === 0) {
  console.error('Fatal Error: No SEO data files found in ' + dataDir);
  process.exit(1);
}

for (const file of tsFiles) {
  const filePath = path.join(dataDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/slug:\s*['"]([^'"]+)['"]/);

  if (!match || !match[1] || !match[1].trim()) {
    console.error(`Fatal Error: Missing or empty slug in SEO file: ${file}`);
    process.exit(1);
  }

  const slug = match[1].trim();

  if (seenSlugs.has(slug)) {
    console.error(`Fatal Error: Duplicate slug '${slug}' detected in SEO file: ${file}`);
    process.exit(1);
  }

  seenSlugs.add(slug);

  pages.push({
    url: `https://mivizarchitects.in/${slug}`,
    priority: '0.90',
    changefreq: 'monthly'
  });

  rewrites.push({
    source: `/${slug}`,
    destination: '/index.html'
  });
}

// 4. Validate routes and rewrites count
if (pages.length <= 2 || rewrites.length <= 2) {
  console.error('Fatal Error: Insufficient routes found for sitemap and rewrites.');
  process.exit(1);
}

// 5. Generate XML sitemap
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

// 6. Write validated files
try {
  fs.writeFileSync(sitemapPath, xml);
  console.log(`Sitemap successfully regenerated with ${pages.length} URLs.`);

  vercelConfig.rewrites = rewrites;
  fs.writeFileSync(vercelConfigPath, JSON.stringify(vercelConfig, null, 2) + '\n');
  console.log(`vercel.json rewrites successfully synchronized with ${rewrites.length} valid routes.`);
} catch (e) {
  console.error('Fatal Error: Failed to write generated files:', e.message);
  process.exit(1);
}

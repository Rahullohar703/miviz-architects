const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

// 1. Get all expected slugs from the data files
const expectedSlugs = new Set();
expectedSlugs.add(''); // For the home page
expectedSlugs.add('contact'); // For the contact page

const tsFiles = fs.readdirSync(dataDir).filter(f => f.startsWith('seo-') && f.endsWith('.ts'));

tsFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
    const match = content.match(/slug:\s*['"]([^'"]+)['"]/);
    if (match) {
        expectedSlugs.add(match[1]);
    } else {
        console.warn(`Could not find slug in ${file}`);
    }
});

// 2. Read sitemap URLs
let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const locRegex = /<loc>([^<]+)<\/loc>/g;
let locMatch;
const foundUrls = new Set();
let hasErrors = false;

while ((locMatch = locRegex.exec(sitemapContent)) !== null) {
    const url = locMatch[1].trim();
    foundUrls.add(url);
    
    // Check if domain is exactly https://mivizarchitects.in
    if (!url.startsWith('https://mivizarchitects.in/') && url !== 'https://mivizarchitects.in') {
        // Exception: www.mivizarchitects.in
        if (url.startsWith('https://www.mivizarchitects.in/')) {
            console.log(`WARN: Found www in URL: ${url}`);
        } else {
            console.error(`ERROR: Invalid domain in URL: ${url}`);
            hasErrors = true;
        }
    }
    
    // Extract slug
    let slug = url.replace('https://mivizarchitects.in/', '').replace('https://www.mivizarchitects.in/', '');
    if (slug.endsWith('/')) slug = slug.slice(0, -1);
    
    if (!expectedSlugs.has(slug)) {
        console.error(`ERROR: Sitemap contains URL with slug '${slug}' which does not exist in src/data/`);
        hasErrors = true;
    }
}

// 3. Check for missing URLs
expectedSlugs.forEach(slug => {
    const expectedUrl1 = `https://mivizarchitects.in${slug ? '/' + slug : ''}`;
    const expectedUrl2 = `https://www.mivizarchitects.in${slug ? '/' + slug : ''}`;
    
    if (!foundUrls.has(expectedUrl1) && !foundUrls.has(expectedUrl2)) {
        console.error(`ERROR: Missing URL for slug '${slug}' in sitemap.xml`);
        hasErrors = true;
    }
});

if (!hasErrors) {
    console.log("Sitemap validation passed. All URLs are correct and account for all slugs.");
}


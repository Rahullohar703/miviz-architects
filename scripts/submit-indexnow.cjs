const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

// Configuration
const HOST = 'mivizarchitects.in';
const KEY = '7198f088ccd5a7c740e207caedba265';
const KEY_FILE_NAME = '7198f088ccd5a7c740e207caedba265.txt';
const KEY_LOCATION = `https://${HOST}/${KEY_FILE_NAME}`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const MAX_BATCH_SIZE = 10000;

const rootDir = path.join(__dirname, '..');
const publicDir = path.join(rootDir, 'public');
const keyFilePath = path.join(publicDir, KEY_FILE_NAME);
const sitemapPath = path.join(publicDir, 'sitemap.xml');
const generateSitemapScript = path.join(__dirname, 'generate-sitemap.cjs');
const dataDir = path.join(rootDir, 'src/data');

// CLI Arguments
const isDryRun = process.argv.includes('--dry-run');

console.log('='.repeat(60));
console.log('MIVIZ Architects — IndexNow URL Submission');
console.log('='.repeat(60));

// Step 1: Validate verification key file
console.log(`\n[1/5] Checking verification key file...`);
if (!fs.existsSync(keyFilePath)) {
  console.error(`ERROR: Key file not found at: ${keyFilePath}`);
  console.error(`Please ensure ${KEY_FILE_NAME} exists in public/ directory.`);
  process.exit(1);
}

const fileKey = fs.readFileSync(keyFilePath, 'utf8').trim();
if (fileKey !== KEY) {
  console.error(`ERROR: Key file content mismatch!`);
  console.error(`Expected: ${KEY}`);
  console.error(`Found:    ${fileKey}`);
  process.exit(1);
}
console.log(`✓ Verification key confirmed: ${KEY}`);
console.log(`✓ Key location: ${KEY_LOCATION}`);

// Step 2: Ensure sitemap is freshly generated using existing generator
console.log(`\n[2/5] Regenerating sitemap with source of truth (scripts/generate-sitemap.cjs)...`);
try {
  execFileSync(process.execPath, [generateSitemapScript], { stdio: 'inherit' });
} catch (err) {
  console.error('ERROR: Failed to run scripts/generate-sitemap.cjs:', err.message);
  process.exit(1);
}

if (!fs.existsSync(sitemapPath)) {
  console.error(`ERROR: Sitemap not found at: ${sitemapPath}`);
  process.exit(1);
}

// Step 3: Extract and validate published canonical URLs
console.log(`\n[3/5] Extracting canonical URLs from ${sitemapPath}...`);
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const locMatches = sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g);
const rawUrls = Array.from(locMatches, m => m[1].trim());

console.log(`Found ${rawUrls.length} URL entries in sitemap.xml.`);

// Build published slugs lookup from src/data and static pages to exclude any fabricated/orphaned URLs
const publishedSlugs = new Set(['', 'contact']);
if (fs.existsSync(dataDir)) {
  const tsFiles = fs.readdirSync(dataDir).filter(f => f.startsWith('seo-') && f.endsWith('.ts'));
  tsFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
    const match = content.match(/slug:\s*['"]([^'"]+)['"]/);
    if (match) {
      publishedSlugs.add(match[1]);
    }
  });
}

const validUrls = [];
const skippedUrls = [];

for (const rawUrl of rawUrls) {
  try {
    const parsed = new URL(rawUrl);

    // Host must match exactly
    if (parsed.hostname.toLowerCase() !== HOST.toLowerCase()) {
      skippedUrls.push({ url: rawUrl, reason: `Hostname ${parsed.hostname} does not match ${HOST}` });
      continue;
    }

    // Protocol must be https
    if (parsed.protocol !== 'https:') {
      skippedUrls.push({ url: rawUrl, reason: 'Protocol is not HTTPS' });
      continue;
    }

    // Must not contain query parameters or fragments
    if (parsed.search || parsed.hash) {
      skippedUrls.push({ url: rawUrl, reason: 'Contains query params or URL fragments' });
      continue;
    }

    // Extract slug
    let slug = parsed.pathname.replace(/^\/+|\/+$/g, '');
    if (!publishedSlugs.has(slug)) {
      skippedUrls.push({ url: rawUrl, reason: `Slug "${slug}" does not correspond to an active published page in src/data/` });
      continue;
    }

    // Canonical format: https://mivizarchitects.in/ or https://mivizarchitects.in/slug
    const canonicalUrl = slug ? `https://${HOST}/${slug}` : `https://${HOST}/`;
    if (!validUrls.includes(canonicalUrl)) {
      validUrls.push(canonicalUrl);
    }
  } catch (err) {
    skippedUrls.push({ url: rawUrl, reason: `Invalid URL format: ${err.message}` });
  }
}

if (skippedUrls.length > 0) {
  console.log(`\nWarning: Skipped ${skippedUrls.length} invalid/unverified URLs:`);
  skippedUrls.forEach(s => console.log(`  - ${s.url} (${s.reason})`));
}

console.log(`✓ Validated ${validUrls.length} canonical URLs for submission.`);

if (validUrls.length === 0) {
  console.error('ERROR: No valid URLs found to submit.');
  process.exit(1);
}

// Step 4: Batch URLs
console.log(`\n[4/5] Preparing IndexNow batches (max ${MAX_BATCH_SIZE} per batch)...`);
const batches = [];
for (let i = 0; i < validUrls.length; i += MAX_BATCH_SIZE) {
  batches.push(validUrls.slice(i, i + MAX_BATCH_SIZE));
}
console.log(`Prepared ${batches.length} batch(es) for submission.`);

// Step 5: Submit to IndexNow
async function submitBatch(batch, batchIndex, totalBatches) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: batch
  };

  console.log(`\n--- Submitting Batch ${batchIndex + 1} of ${totalBatches} (${batch.length} URLs) ---`);

  if (isDryRun) {
    console.log('[DRY RUN] Payload that would be submitted:');
    console.log(JSON.stringify(payload, null, 2));
    console.log('✓ Dry run completed. No network requests sent.');
    return;
  }

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'MivizArchitects-IndexNow/1.0'
      },
      body: JSON.stringify(payload)
    });

    const status = response.status;
    const statusText = response.statusText;
    let responseBody = '';
    try {
      responseBody = await response.text();
    } catch {
      // response might be empty
    }

    console.log(`HTTP Status: ${status} ${statusText}`);

    switch (status) {
      case 200:
        console.log(`✓ Success: IndexNow successfully accepted ${batch.length} URLs.`);
        break;
      case 202:
        console.log(`✓ Accepted: IndexNow received ${batch.length} URLs; key verification / indexing queue in progress.`);
        break;
      case 400:
        console.error(`✗ Error 400 (Bad Request): Invalid format or parameters sent to IndexNow.`);
        if (responseBody) console.error(`  Details: ${responseBody}`);
        break;
      case 403:
        console.error(`✗ Error 403 (Forbidden): Key validation failed.`);
        console.error(`  Please verify that ${KEY_LOCATION} is publicly accessible on the live production site.`);
        if (responseBody) console.error(`  Details: ${responseBody}`);
        break;
      case 422:
        console.error(`✗ Error 422 (Unprocessable Entity): URLs in urlList do not match the host ${HOST}.`);
        if (responseBody) console.error(`  Details: ${responseBody}`);
        break;
      case 429:
        console.error(`✗ Error 429 (Too Many Requests): Rate limit reached on IndexNow endpoint.`);
        if (responseBody) console.error(`  Details: ${responseBody}`);
        break;
      default:
        console.warn(`! Unexpected response status ${status} from IndexNow.`);
        if (responseBody) console.log(`  Response: ${responseBody}`);
        break;
    }
  } catch (err) {
    console.error(`✗ Network Error while connecting to ${INDEXNOW_ENDPOINT}:`, err.message);
  }
}

async function run() {
  for (let i = 0; i < batches.length; i++) {
    await submitBatch(batches[i], i, batches.length);
  }

  console.log('\n' + '='.repeat(60));
  console.log('Submission Summary');
  console.log('='.repeat(60));
  console.log(`Total URLs submitted: ${validUrls.length}`);
  console.log(`Host:                 ${HOST}`);
  console.log(`Key Location:         ${KEY_LOCATION}`);
  console.log('\nNOTE: IndexNow notifies participating search engines (Bing, Yandex, etc.)');
  console.log('that these URLs are published/updated. Crawling and indexing are handled');
  console.log('by each search engine independently according to their evaluation criteria.');
  console.log('='.repeat(60));
}

run();

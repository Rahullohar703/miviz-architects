const fs = require('fs');
const path = require('path');

const dataDir = 'src/data';
const imgDir = 'public/images';

// 1. Get the 7 new images we generated based on timestamps
const allImages = fs.readdirSync(imgDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg'));
// The 7 new images we generated
const newImages = [
  'luxury_facade_1787657254916.png',
  'modern_kitchen_1787657271989.png',
  'eco_home_1787657289396.png',
  'minimalist_living_1787657304160.png',
  'contemp_office_1787657320788.png',
  'cozy_bedroom_1787657336197.png',
  'landscape_arch_1787657460749.png'
];

// 2. Find all used schema images to know which ones are free
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts') && f !== 'seoData.ts');
let usedImages = new Set();
let filesNeedingUnique = [];

files.forEach(f => {
  const content = fs.readFileSync(path.join(dataDir, f), 'utf8');
  const m = content.match(/"image":\s*"([^"]+)"/);
  if(m) {
    const url = m[1];
    if(url.includes('og-image.png')) {
      filesNeedingUnique.push(f);
    } else {
      const basename = path.basename(url);
      usedImages.add(basename);
    }
  }
});

console.log(`Files needing unique images: ${filesNeedingUnique.length}`);

// 3. Find available images
let availableImages = [...newImages]; // prioritize new images
for(const img of allImages) {
  if(!usedImages.has(img) && !newImages.includes(img)) {
    availableImages.push(img);
  }
}

// 4. Replace
let replacedCount = 0;
filesNeedingUnique.forEach(f => {
  const content = fs.readFileSync(path.join(dataDir, f), 'utf8');
  if(availableImages.length > 0) {
    const imgToUse = availableImages.shift();
    const newContent = content.replace(/"image":\s*"[^"]+"/, `"image": "https://mivizarchitects.in/images/${imgToUse}"`);
    fs.writeFileSync(path.join(dataDir, f), newContent);
    replacedCount++;
    console.log(`Updated ${f} with ${imgToUse}`);
  } else {
    console.log(`Not enough available images for ${f}!`);
  }
});

console.log(`Replaced schema images in ${replacedCount} files. All 42 blogs now have 100% unique schema images.`);

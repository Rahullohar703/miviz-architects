const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const imagesDir = path.join(__dirname, 'public', 'images');

// 1. Get all images in public/images
const allImages = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.webp') || f.endsWith('.jpeg'));

// 2. Find all used images
const usedImages = new Set();
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
    const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
    const match = content.match(/image:\s*['"]\/images\/([^'"]+)['"]/);
    if (match) {
        usedImages.add(match[1]);
    }
});

// 3. Find unused images
const unusedImages = allImages.filter(img => !usedImages.has(img));
console.log('Unused images:', unusedImages.length, unusedImages);

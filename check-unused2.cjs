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
    // find all occurrences of .png, .jpg etc
    const matches = content.match(/[a-zA-Z0-9_-]+\.(png|jpg|jpeg|webp)/g);
    if (matches) {
        matches.forEach(m => usedImages.add(m));
    }
});

// 3. Find unused images
const unusedImages = allImages.filter(img => !usedImages.has(img));
console.log('Truly unused images:', unusedImages.length);
console.log(unusedImages.slice(0, 5));

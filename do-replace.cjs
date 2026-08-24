const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const imagesDir = path.join(__dirname, 'public', 'images');

// 1. Get all images in public/images
const allImages = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.webp') || f.endsWith('.jpeg'));

// 2. Find all used images in schema
const schemaUsedImages = new Set();
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts'));

let imgMap = {};

files.forEach(f => {
    const content = fs.readFileSync(path.join(dataDir, f), 'utf8');
    const m = content.match(/\"image\":\s*\"https:\/\/mivizarchitects\.in\/images\/([^\"]+)\"/);
    if(m) {
        const img = m[1];
        schemaUsedImages.add(img);
        if(!imgMap[img]) imgMap[img] = [];
        imgMap[img].push(f);
    }
});

// 3. Find images not used in ANY schema
const nonSchemaImages = allImages.filter(img => !schemaUsedImages.has(img));

// 4. The 13 new images we generated
const newImagesList = [
  'modern_patio', 'smart_home', 'cozy_reading_nook', 'luxury_pool', 
  'urban_apartment', 'rustic_cabin', 'luxury_facade', 'modern_kitchen', 
  'eco_home', 'minimalist_living', 'luxury_bathroom', 'modern_atrium', 'modern_bedroom'
];
const newlyGenerated = nonSchemaImages.filter(img => newImagesList.some(prefix => img.startsWith(prefix)));
const otherUnused = nonSchemaImages.filter(img => !newlyGenerated.includes(img));

// Combine newly generated and other unused to get enough replacements
const availableReplacements = [...newlyGenerated, ...otherUnused];

let replacementIndex = 0;
let replacedCount = 0;

for(const [img, duplicateFiles] of Object.entries(imgMap)) {
    // Keep the first file as is, replace the rest
    for (let i = 1; i < duplicateFiles.length; i++) {
        const fileToFix = duplicateFiles[i];
        if (replacementIndex >= availableReplacements.length) {
            console.error("Not enough unique images to replace all duplicates!");
            process.exit(1);
        }
        const newImg = availableReplacements[replacementIndex++];
        
        const filePath = path.join(dataDir, fileToFix);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace in schema
        content = content.replace(
            /(\"image\":\s*\"https:\/\/mivizarchitects\.in\/images\/)[^\"]+(\")/,
            `$1${newImg}$2`
        );
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Replaced duplicate ${img} with ${newImg} in ${fileToFix}`);
        replacedCount++;
    }
}

console.log(`Successfully replaced ${replacedCount} duplicate schema images.`);

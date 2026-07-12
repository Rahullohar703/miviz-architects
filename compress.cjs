const sharp = require('sharp');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'src', 'assets').replace(/\\/g, '/');

console.log('Searching in:', targetDir);

// Find all images
const files = glob.sync(`${targetDir}/**/*.{jpg,jpeg,png,webp}`);
console.log(`Found ${files.length} images.`);

files.forEach(async (file) => {
  const stats = fs.statSync(file);
  const sizeKB = stats.size / 1024;
  
  if (sizeKB > 300) {
    console.log(`Compressing: ${file} (${sizeKB.toFixed(2)} KB)`);
    
    const ext = path.extname(file).toLowerCase();
    const tempFile = `${file}.tmp`;

    try {
      if (ext === '.webp') {
        await sharp(file).webp({ quality: 80 }).toFile(tempFile);
      } else if (ext === '.jpg' || ext === '.jpeg') {
        await sharp(file).jpeg({ quality: 80, progressive: true }).toFile(tempFile);
      } else if (ext === '.png') {
        await sharp(file).png({ quality: 80, compressionLevel: 9 }).toFile(tempFile);
      }
      
      // Replace original with compressed if it's actually smaller
      if (fs.existsSync(tempFile)) {
          const newStats = fs.statSync(tempFile);
          if (newStats.size < stats.size) {
            fs.renameSync(tempFile, file);
            console.log(`✅ Success: Reduced to ${(newStats.size / 1024).toFixed(2)} KB`);
          } else {
            fs.unlinkSync(tempFile);
            console.log(`ℹ️ Ignored: Compressed size is larger.`);
          }
      }
    } catch (err) {
      console.error(`❌ Error compressing ${file}:`, err);
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    }
  }
});

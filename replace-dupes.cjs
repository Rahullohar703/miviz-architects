const fs = require('fs');

const files = fs.readdirSync('src/data').filter(f => f.endsWith('.ts'));

// Find duplicates
const map = {};
files.forEach(f => {
  const content = fs.readFileSync('src/data/' + f, 'utf8');
  const imgs = [...content.matchAll(/([a-zA-Z0-9_-]+\.(?:png|jpg))/g)].map(m => m[1]);
  imgs.forEach(i => {
    if (!map[i]) map[i] = new Set();
    map[i].add(f);
  });
});

const newImages = [
  'luxury-facade-modern.png',
  'eco-friendly-home.png',
  'modern-kitchen-island.png',
  'cozy-living-room.png',
  'contemporary-bedroom.png',
  'minimalist-bathroom.png',
  'open-plan-office.png'
];
let usedNewImages = 0;

for (const [img, fileSet] of Object.entries(map)) {
  if (fileSet.size > 1 && usedNewImages < newImages.length) {
    const filesArray = Array.from(fileSet);
    // Keep the first file using the original image, change the second file
    const fileToChange = filesArray[1]; 
    const newImage = newImages[usedNewImages];
    
    console.log(`Replacing ${img} with ${newImage} in ${fileToChange}`);
    
    const filePath = 'src/data/' + fileToChange;
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.split(img).join(newImage);
    fs.writeFileSync(filePath, content, 'utf8');
    
    usedNewImages++;
  }
}
console.log(`Replaced ${usedNewImages} images.`);

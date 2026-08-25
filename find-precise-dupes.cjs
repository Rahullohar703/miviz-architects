const fs = require('fs');
const files = fs.readdirSync('src/data');
let imgMap = {};

files.forEach(f => {
  if(f.endsWith('.ts')) {
    const content = fs.readFileSync('src/data/' + f, 'utf8');
    
    // find all images in /images/ path
    const matches = content.matchAll(/\/images\/([a-zA-Z0-9_]+\.(?:png|jpg|jpeg|gif))/g);
    for (const match of matches) {
      const img = match[1];
      if(!imgMap[img]) imgMap[img] = new Set();
      imgMap[img].add(f);
    }
  }
});

let shared = 0;
let sharedImagesCount = 0;
for(const [img, fileSet] of Object.entries(imgMap)) {
  const f = Array.from(fileSet);
  if(f.length > 1) {
    shared += f.length; // total blogs sharing
    sharedImagesCount++;
    console.log(`${img} is used by:`, f);
  }
}
console.log(`Total shared images: ${sharedImagesCount}`);
console.log(`Total blogs sharing these images: ${shared}`);

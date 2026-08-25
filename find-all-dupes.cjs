const fs = require('fs');
const files = fs.readdirSync('src/data');
let imgMap = {};
let count = 0;

files.forEach(f => {
  if(f.endsWith('.ts')) {
    count++;
    const content = fs.readFileSync('src/data/' + f, 'utf8');
    
    // find all image files mentioned
    const matches = content.matchAll(/([a-zA-Z0-9_]+\.(?:png|jpg|jpeg|gif))/g);
    for (const match of matches) {
      const img = match[1];
      if(!imgMap[img]) imgMap[img] = new Set();
      imgMap[img].add(f);
    }
  }
});

let shared = 0;
console.log(`Parsed ${count} ts files.`);
for(const [img, fileSet] of Object.entries(imgMap)) {
  const f = Array.from(fileSet);
  if(f.length > 1) {
    shared += f.length - 1;
    console.log(`${img} is used by:`, f);
  }
}
console.log(`Total blogs that need a unique image: ${shared}`);

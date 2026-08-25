const fs = require('fs');
const files = fs.readdirSync('src/data');
let imgMap = {};

files.forEach(f => {
  if(f.endsWith('.ts')) {
    const content = fs.readFileSync('src/data/' + f, 'utf8');
    const matches = content.matchAll(/\/images\/([a-zA-Z0-9_]+\.(?:png|jpg|jpeg|gif))/g);
    for (const match of matches) {
      const img = match[1];
      if(!imgMap[img]) imgMap[img] = new Set();
      imgMap[img].add(f);
    }
  }
});

let exactlyTwo = 0;
for(const [img, fileSet] of Object.entries(imgMap)) {
  const f = Array.from(fileSet);
  if(f.length === 2) {
    exactlyTwo++;
    console.log(`Shared by exactly 2: ${img}`, f);
  }
}
console.log(`Total images shared by exactly 2 blogs: ${exactlyTwo}`);

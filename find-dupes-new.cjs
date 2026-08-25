const fs = require('fs');
const files = fs.readdirSync('src/data');
let imgMap = {};

files.forEach(f => {
  if(f.endsWith('.ts')) {
    const content = fs.readFileSync('src/data/' + f, 'utf8');
    const m = content.match(/"image":\s*"[^"]+\/images\/([^"]+)"/);
    if(m) {
      const img = m[1];
      if(!imgMap[img]) imgMap[img] = [];
      imgMap[img].push(f);
    }
  }
});

let shared = 0;
for(const [img, f] of Object.entries(imgMap)) {
  if(f.length > 1) {
    shared += f.length - 1;
    console.log(`${img} is used by:`, f);
  }
}
console.log(`Total blogs that need a unique image: ${shared}`);

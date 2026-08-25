const fs = require('fs');
const files = fs.readdirSync('src/data');
let imgMap = {};

files.forEach(f => {
  if(f.endsWith('.ts') && f !== 'seoData.ts') {
    const content = fs.readFileSync('src/data/' + f, 'utf8');
    const m = content.match(/"image":\s*"https:\/\/mivizarchitects\.in\/([^"]+)"/);
    if(m) {
      const img = m[1];
      if(!imgMap[img]) imgMap[img] = [];
      imgMap[img].push(f);
    }
  }
});

let shared = 0;
for(const [img, filesList] of Object.entries(imgMap)) {
  if(filesList.length > 1) {
    shared += filesList.length;
    console.log(`${img} is used by:`, filesList);
  }
}
console.log(`Total blogs sharing a top-level image: ${shared}`);

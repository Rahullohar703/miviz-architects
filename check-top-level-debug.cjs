const fs = require('fs');
const files = fs.readdirSync('src/data');
let imgMap = {};
let noMatchFiles = [];

files.forEach(f => {
  if(f.endsWith('.ts')) {
    const content = fs.readFileSync('src/data/' + f, 'utf8');
    const m = content.match(/"image":\s*"https:\/\/mivizarchitects\.in\/images\/([^"]+)"/);
    if(m) {
      const img = m[1];
      if(!imgMap[img]) imgMap[img] = [];
      imgMap[img].push(f);
    } else {
      noMatchFiles.push(f);
    }
  }
});

let shared = 0;
let sharedImgs = 0;
for(const [img, filesList] of Object.entries(imgMap)) {
  if(filesList.length > 1) {
    shared += filesList.length;
    sharedImgs++;
    console.log(`${img} is used by:`, filesList);
  }
}
console.log(`Total blogs sharing a top-level image: ${shared}`);
console.log(`Total top-level shared images: ${sharedImgs}`);
console.log(`Files with no top-level image match: ${noMatchFiles.length}`, noMatchFiles);

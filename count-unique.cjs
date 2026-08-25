const fs = require('fs');
const files = fs.readdirSync('src/data').filter(f => f.endsWith('.ts') && f !== 'seoData.ts');
let imgMap = {};

files.forEach(f => {
  const content = fs.readFileSync('src/data/' + f, 'utf8');
  const m = content.match(/"image":\s*"([^"]+)"/);
  if(m) {
    const url = m[1];
    if(!imgMap[url]) imgMap[url] = [];
    imgMap[url].push(f);
  }
});

let shared = 0;
let unique = 0;
for(const [url, filesList] of Object.entries(imgMap)) {
  unique++;
  if(filesList.length > 1) {
    shared++;
    console.log(`${url} is used by:`, filesList);
  }
}
console.log(`Total blogs: ${files.length}`);
console.log(`Total unique images: ${unique}`);
console.log(`Images shared: ${shared}`);

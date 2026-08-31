const fs = require('fs');
const files = fs.readdirSync('src/data').filter(f => f.endsWith('.ts'));

const counts = {};
const map = {};

files.forEach(f => {
  const content = fs.readFileSync('src/data/' + f, 'utf8');
  const matches = [...content.matchAll(/https:\/\/mivizarchitects\.in\/(?:images|wp-content\/uploads)\/([^\s"'`]+)/g)];
  matches.forEach(m => {
    const img = m[1];
    if (!map[img]) map[img] = new Set();
    map[img].add(f);
  });
});

let shared = 0;
for (const [img, fileSet] of Object.entries(map)) {
  if (fileSet.size > 1) {
    shared += fileSet.size - 1;
    console.log(`${img} is used by:`, Array.from(fileSet));
  }
}
console.log(`Total blogs that need a unique image: ${shared}`);

const fs = require('fs');

const files = fs.readdirSync('src/data').filter(f => f.endsWith('.ts'));

const violations = {};

files.forEach(f => {
  const content = fs.readFileSync('src/data/' + f, 'utf8');
  
  const titleMatch = content.match(/head:\s*\{\s*title:\s*'([^']+)'/);
  const descMatch = content.match(/description:\s*'([^']+)'/);
  const heroMatch = content.match(/hero:\s*\{\s*title:\s*'([^']+)'/);
  
  let needsFix = false;
  const fileData = {};
  
  if (titleMatch) {
    const title = titleMatch[1];
    if (title.length < 50 || title.length > 60) {
      fileData.title = title;
      needsFix = true;
    }
  }
  
  if (descMatch) {
    const desc = descMatch[1];
    if (desc.length < 150 || desc.length > 160) {
      fileData.description = desc;
      needsFix = true;
    }
  }
  
  if (heroMatch) {
    const h1 = heroMatch[1];
    if (h1.length < 20 || h1.length > 70) {
      fileData.h1 = h1;
      needsFix = true;
    }
  }
  
  if (needsFix) {
    violations[f] = fileData;
  }
});

fs.writeFileSync('seo-violations.json', JSON.stringify(violations, null, 2));
console.log('Saved to seo-violations.json');

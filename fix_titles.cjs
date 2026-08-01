const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.startsWith('seo-') && f.endsWith('.ts'));

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  let contentStr = fs.readFileSync(filePath, 'utf-8');
  
  const heroTitleMatch = contentStr.match(/hero:\s*\{\s*title:\s*'([^']+)'/);
  
  if (heroTitleMatch) {
    const heroTitle = heroTitleMatch[1];
    
    // Replace the title inside head: { title: '...' }
    // It looks like:
    // head: {
    //   title: 'Architect Fees in Pune 2026: Cost per Sq Ft, Percentage & Hidden Charges',
    // ...
    // So we use regex to replace it
    contentStr = contentStr.replace(/(head:\s*\{\s*title:\s*')[^']+'/i, `$1${heroTitle}'`);
    
    fs.writeFileSync(filePath, contentStr);
    console.log(`Updated ${file}`);
  }
});

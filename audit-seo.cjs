const fs = require('fs');

const files = fs.readdirSync('src/data').filter(f => f.endsWith('.ts'));

let titleViolations = 0;
let descViolations = 0;
let h1Violations = 0;
let totalViolations = 0;

files.forEach(f => {
  const content = fs.readFileSync('src/data/' + f, 'utf8');
  
  const titleMatch = content.match(/title:\s*'([^']+)'/);
  const descMatch = content.match(/description:\s*'([^']+)'/);
  // H1 is the title under hero
  const heroMatch = content.match(/hero:\s*\{\s*title:\s*'([^']+)'/);
  
  let violation = false;
  
  if (titleMatch) {
    const title = titleMatch[1];
    if (title.length < 50 || title.length > 60) {
      titleViolations++;
      violation = true;
    }
  }
  
  if (descMatch) {
    const desc = descMatch[1];
    if (desc.length < 150 || desc.length > 160) {
      descViolations++;
      violation = true;
    }
  }
  
  if (heroMatch) {
    const h1 = heroMatch[1];
    if (h1.length < 20 || h1.length > 70) {
      h1Violations++;
      violation = true;
    }
  }
  
  if (violation) totalViolations++;
});

console.log(`Title Violations: ${titleViolations}`);
console.log(`Description Violations: ${descViolations}`);
console.log(`H1 Violations: ${h1Violations}`);
console.log(`Total Files to Optimize: ${totalViolations}`);

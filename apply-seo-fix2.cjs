const fs = require('fs');

const optimizations = {
  "seo-3-things-to-make-villa-premium.ts": {
    type: 'desc',
    old: "Planning a luxury villa in Pune? Architect Manohar reveals 3 architectural secrets to make it look truly premium: floating walls and frameless doors.",
    newStr: "Planning a luxury villa in Pune? Architect Manohar reveals 3 architectural secrets to make it look truly premium: floating walls, and frameless doors."
  },
  "seo-4-bhk-house-construction-cost-pune-2026.ts": {
    type: 'desc',
    old: "Planning to build a 4 BHK duplex or villa in Pune? Discover the exact house construction cost per sq ft for 2026. Get room sizes, and budget splits.",
    newStr: "Planning to build a 4 BHK duplex or villa in Pune? Discover the exact house construction cost per sq ft for 2026. Get room sizes, and precise budget splits."
  },
  "seo-best-house-designs-pune-climate.ts": {
    type: 'desc',
    old: "Learn the best architectural house designs for Pune\\",
    newStr: "Learn the best architectural house designs for Pune's unique climate. We explore ventilation, shading, and materials for sustainable modern homes in Pune."
  },
  "seo-modern-luxury-villa-design-pune-2026.ts": {
    type: 'desc',
    old: "Discover the 2026 trends for modern luxury villa design in Pune. We explore open floor plans, premium materials, sustainable features, and smart home automation.",
    newStr: "Discover the 2026 trends for modern luxury villa design in Pune. We explore open floor plans, premium materials, sustainable features, and smart automation."
  },
  "seo-modern-vastu-tips-homes-pune-2026.ts": {
    type: 'desc',
    old: "Building a home in Pune? Discover how modern architects balance Vastu Shastra with luxury design, open floor plans, and contemporary home aesthetics.",
    newStr: "Building a home in Pune? Discover how modern architects balance Vastu Shastra with luxury design, open floor plans, and contemporary aesthetic designs."
  },
  "seo-top-ten-architects-in-pune.ts": {
    type: 'desc',
    old: "Looking for the top 10 architects in Pune? Discover the best residential and commercial architecture firms, compare 2026 fees, and learn how to hire.",
    newStr: "Looking for the top 10 architects in Pune? Discover the best residential and commercial architecture firms, compare 2026 fees, and learn how to hire them."
  }
};

for (const [filename, opt] of Object.entries(optimizations)) {
  const filePath = 'src/data/' + filename;
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (opt.type === 'desc') {
      // Need to handle backslashes correctly for replace
      if (opt.old.includes('\\')) {
         // for seo-best-house-designs-pune-climate.ts
         content = content.replace(/description:\s*'Learn the best architectural house designs for Pune\\'/, `description: '${opt.newStr}'`);
         content = content.replace(/"description":\s*"Learn the best architectural house designs for Pune\\"/, `"description": "${opt.newStr}"`);
      } else {
         content = content.replace(`description: '${opt.old}'`, `description: '${opt.newStr}'`);
         content = content.replace(`"description": "${opt.old}"`, `"description": "${opt.newStr}"`);
      }
    }

    fs.writeFileSync(filePath, content, 'utf8');
  }
}

console.log('Second pass applied!');

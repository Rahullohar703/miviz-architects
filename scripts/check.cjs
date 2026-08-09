const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, '../src/data');
let hasDuplicates = false;

fs.readdirSync(dir).filter(f => f.startsWith('seo-') && f.endsWith('.ts')).forEach(f => {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const imgs = [...content.matchAll(/src="(\/images\/[^"]+\.png)"/g)].map(m => m[1]);
    const uniqueImgs = new Set(imgs);
    if (imgs.length !== uniqueImgs.size) {
        console.log(`❌ Duplicate found IN THE SAME BLOG (${f}):`, imgs);
        hasDuplicates = true;
    }
});

if (!hasDuplicates) {
    console.log('✅ Success: No single blog contains the same image twice!');
}

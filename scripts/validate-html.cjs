const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const publicImagesDir = path.join(__dirname, '../public/images');

let totalErrors = 0;

function validateFile(filePath) {
    let fileContent = fs.readFileSync(filePath, 'utf8');
    const templateMatch = fileContent.match(/content:\s*`([\s\S]*?)`/);
    if (!templateMatch) {
        console.error(`ERROR in ${path.basename(filePath)}: No content template found!`);
        totalErrors++;
        return;
    }
    const htmlContent = templateMatch[1];
    
    // 1. Tag balancing
    const divOpenCount = (htmlContent.match(/<div/g) || []).length;
    const divCloseCount = (htmlContent.match(/<\/div>/g) || []).length;
    if (divOpenCount !== divCloseCount) {
        console.error(`ERROR in ${path.basename(filePath)}: Mismatched <div> tags. Open: ${divOpenCount}, Close: ${divCloseCount}`);
        totalErrors++;
    }

    const h2OpenCount = (htmlContent.match(/<h2/g) || []).length;
    const h2CloseCount = (htmlContent.match(/<\/h2>/g) || []).length;
    if (h2OpenCount !== h2CloseCount) {
        console.error(`ERROR in ${path.basename(filePath)}: Mismatched <h2> tags. Open: ${h2OpenCount}, Close: ${h2CloseCount}`);
        totalErrors++;
    }

    const pOpenCount = (htmlContent.match(/<p/g) || []).length;
    const pCloseCount = (htmlContent.match(/<\/p>/g) || []).length;
    if (pOpenCount !== pCloseCount) {
        console.error(`ERROR in ${path.basename(filePath)}: Mismatched <p> tags. Open: ${pOpenCount}, Close: ${pCloseCount}`);
        totalErrors++;
    }

    // 2. Check for leftover enhancement block comments
    if (htmlContent.includes('<!-- BEGIN ENHANCEMENTS -->') || htmlContent.includes('<!-- END ENHANCEMENTS -->')) {
        console.error(`ERROR in ${path.basename(filePath)}: Found leftover enhancements block comments.`);
        totalErrors++;
    }

    // 3. Check for leftover unreadable dark boxes (#111 or #222)
    if (htmlContent.includes('background: #111;') || htmlContent.includes('background:#111;') || 
        htmlContent.includes('background: #222;') || htmlContent.includes('background:#222;')) {
        console.error(`ERROR in ${path.basename(filePath)}: Found leftover dark box backgrounds (#111 or #222).`);
        totalErrors++;
    }

    // 4. Validate Image Paths Format
    const imgRegex = /<img[^>]*src="([^"]+)"[^>]*>/g;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(htmlContent)) !== null) {
        const src = imgMatch[1];
        if (!src.startsWith('/images/')) {
            console.error(`ERROR in ${path.basename(filePath)}: Image src does not start with /images/ : ${src}`);
            totalErrors++;
        }
        // Note: We don't check if file physically exists because many are queued for generation by the cron job
    }
}

function run() {
    fs.readdir(dataDir, (err, files) => {
        if (err) throw err;
        const tsFiles = files.filter(f => f.startsWith('seo-') && f.endsWith('.ts'));
        tsFiles.forEach(file => {
            validateFile(path.join(dataDir, file));
        });
        
        if (totalErrors === 0) {
            console.log(`\nSUCCESS: Validated ${tsFiles.length} files. Zero structural or formatting errors found.`);
        } else {
            console.log(`\nFAILURE: Found ${totalErrors} errors across the files.`);
        }
    });
}

run();

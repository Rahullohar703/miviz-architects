const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

function run() {
    fs.readdir(dataDir, (err, files) => {
        if (err) throw err;
        const tsFiles = files.filter(f => f.startsWith('seo-') && f.endsWith('.ts'));
        
        let changedFiles = 0;
        tsFiles.forEach(file => {
            const filePath = path.join(dataDir, file);
            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;

            // Replace outer dark boxes
            content = content.replace(/<div style="background:\s*#111;\s*color:\s*#fff;\s*padding:\s*25px;\s*border-radius:\s*12px;\s*margin:\s*30px 0;">/g, 
                '<div style="background: #fdfbf7; border: 2px solid #d9a05b; color: #222; padding: 25px; border-radius: 12px; margin: 30px 0; box-shadow: 0 4px 15px rgba(217,160,91,0.1);">');

            // Replace CTA dark boxes (slightly different padding/margin)
            content = content.replace(/<div style="background:\s*#111;\s*color:\s*#fff;\s*padding:\s*30px;\s*text-align:\s*center;\s*margin-top:\s*40px;\s*border-radius:\s*8px;">/g, 
                '<div style="background: #fdfbf7; border: 2px solid #d9a05b; color: #222; padding: 30px; text-align: center; margin-top: 40px; border-radius: 12px; box-shadow: 0 4px 15px rgba(217,160,91,0.1);">');

            // Replace inner dark boxes (like grid items)
            content = content.replace(/<div style="background:#222; padding:15px; border-radius:8px;">/g, 
                '<div style="background: #ffffff; border: 1px solid #e5e7eb; color: #222; padding: 15px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.03);">');
            
            // Also replace any other stray #111 or #222 backgrounds just in case
            // content = content.replace(/background:\s*#111;/g, 'background: #fdfbf7; border: 2px solid #d9a05b; color: #222;');

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated dark boxes in ${file}`);
                changedFiles++;
            }
        });
        
        console.log(`Finished checking files. Changed ${changedFiles} files.`);
    });
}

run();

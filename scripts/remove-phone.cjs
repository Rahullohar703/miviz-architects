const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

fs.readdirSync(dataDir).forEach(file => {
    if (file.endsWith('.ts')) {
        const filePath = path.join(dataDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove the telephone line completely
        const newContent = content.replace(/\s*"telephone":\s*"\+918149811468",\n?/g, '\n');
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Removed phone number from ${file}`);
        }
    }
});

// Also remove from index.html if it exists there
const indexHtmlPath = path.join(__dirname, '../index.html');
if (fs.existsSync(indexHtmlPath)) {
    let indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
    // We already know from their diff that it doesn't have telephone, but let's be safe
    // Wait, the index.html diff earlier showed no telephone, only email.
}

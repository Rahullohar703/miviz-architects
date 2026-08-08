const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

function distributeVisualsInFile(filePath) {
    let fileContent = fs.readFileSync(filePath, 'utf8');

    // Isolate the HTML template string
    const templateMatch = fileContent.match(/content:\s*`([\s\S]*?)`/);
    if (!templateMatch) {
        console.log(`Skipping ${path.basename(filePath)} - no content template found.`);
        return;
    }

    let htmlContent = templateMatch[1];

    // Extract the ENHANCEMENTS block
    const enhancementsRegex = /<!-- BEGIN ENHANCEMENTS -->([\s\S]*?)<!-- END ENHANCEMENTS -->/;
    const match = htmlContent.match(enhancementsRegex);
    
    if (!match) {
        console.log(`Skipping ${path.basename(filePath)} - no enhancements block found.`);
        return;
    }

    const enhancementsHTML = match[1];
    htmlContent = htmlContent.replace(enhancementsRegex, '').trim();

    // Remove the wrapper div that has margin-top: 50px if it exists
    htmlContent = htmlContent.replace(/<div style="margin-top: 50px;">\s*<h2>Visual Inspiration & Architecture Highlights<\/h2>\s*<p>Explore some of our premium design features that elevate spaces in Pune\.<\/p>/, '');
    
    // Sometimes the div is left open if we stripped the end block. Actually, the regex above won't match if it spans multiple lines without matching exactly.
    // Since the original block was generated programmatically, the ENHANCEMENTS block includes the opening <div style="margin-top: 50px;"> and the closing </div> is at the end of the ENHANCEMENTS block.
    // So replacing the whole ENHANCEMENTS block removes it entirely.

    // Parse out the 5 visual elements
    const imageRegex = /<div style="text-align: center; margin: 30px 0;">\s*<img[\s\S]*?<\/p>\s*<\/div>/g;
    const images = [...enhancementsHTML.matchAll(imageRegex)].map(m => m[0]);
    const firstImage = images.length > 0 ? images[0] : '';
    const secondImage = images.length > 1 ? images[1] : '';

    let dataviz = '';
    const datavizMatch = enhancementsHTML.match(/<!-- DATA VISUALIZATION BAR GRAPH -->[\s\S]*?(?=<div style="background: #fdfbf7;|<div style="margin: 40px 0;">|<div style="text-align: center; margin: 30px 0;">|$)/);
    // Actually a safer way is to match from <!-- DATA to the closing </div> of that block.
    // We know it's wrapped in a <div style="background: #ffffff;...box-shadow..."> and ends with </div>
    const dvMatch = enhancementsHTML.match(/<!-- DATA VISUALIZATION BAR GRAPH -->\s*<div style="background: #ffffff[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/);
    if (dvMatch) {
        dataviz = dvMatch[0].trim();
    }

    let caseStudy = '';
    const csMatch = enhancementsHTML.match(/<div style="background: #fdfbf7; border: 2px solid #d9a05b; padding: 25px[^>]*>[\s\S]*?<\/div>/);
    if (csMatch) {
        caseStudy = csMatch[0].trim();
    }

    let infographic = '';
    const infoMatch = enhancementsHTML.match(/<div style="margin: 40px 0;">\s*<h3[^>]*>Flowchart:[\s\S]*?<\/ol>\s*<\/div>/);
    if (infoMatch) {
        infographic = infoMatch[0].trim();
    }
    
    // Also check for the manual table infographic if Flowchart doesn't exist
    if (!infographic) {
        const tableMatch = enhancementsHTML.match(/<div style="margin: 40px 0;">\s*<h3[^>]*>Infographic:[\s\S]*?<\/table>\s*<\/div>/);
        if (tableMatch) {
            infographic = tableMatch[0].trim();
        }
    }

    // Now, split the htmlContent by <h2>
    const parts = htmlContent.split(/(<h2.*?>)/);
    
    // parts[0] = before first H2
    // parts[1] = first H2 tag
    // parts[2] = content of first H2
    // parts[3] = second H2 tag ...
    
    let newHtmlContent = parts[0];
    
    // Inject firstImage after intro paragraphs
    if (firstImage) {
        newHtmlContent += `\n\n${firstImage}\n\n`;
    }

    let h2Count = 0;
    
    // Find the last or second-to-last H2 for the Case Study
    let caseStudyIndex = parts.length - 2;
    for (let i = parts.length - 2; i >= 1; i -= 2) {
        if (parts[i].toLowerCase().includes('conclusion') || parts[i].toLowerCase().includes('faq')) {
            caseStudyIndex = i;
        }
    }

    for (let i = 1; i < parts.length; i += 2) {
        const h2Tag = parts[i];
        const sectionContent = parts[i+1] || '';
        h2Count++;
        
        // Inject Case Study right before Conclusion/FAQ H2
        if (i === caseStudyIndex && caseStudy) {
            newHtmlContent += `\n\n${caseStudy}\n\n`;
        }
        
        newHtmlContent += h2Tag + sectionContent;
        
        // Inject Dataviz after 1st H2
        if (h2Count === 1 && dataviz) {
            newHtmlContent += `\n\n${dataviz}\n\n`;
        }
        
        // Inject Infographic after 2nd H2
        if (h2Count === 2 && infographic) {
            newHtmlContent += `\n\n${infographic}\n\n`;
        }
        
        // Inject Second Image after 3rd H2
        if (h2Count === 3 && secondImage) {
            newHtmlContent += `\n\n${secondImage}\n\n`;
        }
    }
    
    // If there were fewer H2s than elements, append remaining to the end of htmlContent (before the backtick)
    if (h2Count < 1 && dataviz) newHtmlContent += `\n\n${dataviz}\n\n`;
    if (h2Count < 2 && infographic) newHtmlContent += `\n\n${infographic}\n\n`;
    if (h2Count < 3 && secondImage) newHtmlContent += `\n\n${secondImage}\n\n`;
    // If case study wasn't injected (e.g. no H2s), append it
    if (parts.length < 3 && caseStudy) newHtmlContent += `\n\n${caseStudy}\n\n`;

    // Put the new HTML content back into the file
    const finalFileContent = fileContent.replace(templateMatch[0], 'content: `\n' + newHtmlContent.trim() + '\n`');
    
    fs.writeFileSync(filePath, finalFileContent, 'utf8');
    console.log(`Successfully distributed visuals in ${path.basename(filePath)}`);
}

function run() {
    fs.readdir(dataDir, (err, files) => {
        if (err) throw err;
        const tsFiles = files.filter(f => f.startsWith('seo-') && f.endsWith('.ts') && !f.includes('backup'));
        tsFiles.forEach(file => {
            distributeVisualsInFile(path.join(dataDir, file));
        });
    });
}

run();

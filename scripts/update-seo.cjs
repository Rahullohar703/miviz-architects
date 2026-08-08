const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

function generateEnhancements(filename) {
    const isInterior = filename.includes('interior');
    const isCost = filename.includes('cost') || filename.includes('fees') || filename.includes('affordable');
    const isTurnkey = filename.includes('turnkey');
    
    // Default image paths
    const imgPath1 = isInterior ? '/assets/hero-luxury-interior-Dkz_Ed08.jpg' : '/assets/hero-architecture-9kSrcD2B.png';
    const imgPath2 = isInterior ? '/assets/seamless-experience-interior-BNjltinh.jpg' : '/assets/baner-villa-case-study.jpg';
    
    const altText1 = isInterior 
        ? 'High-end luxury interior design executed by top interior designers in Pune, featuring modern aesthetics and premium lighting.'
        : 'Modern residential architecture in Pune, showcasing contemporary facade design and sustainable materials.';
        
    const altText2 = isInterior
        ? 'Turnkey interior design execution process in Pune from 3D concept to flawless factory finish.'
        : 'Completed turnkey residential villa project in Pune highlighting flawless civil construction and elevation design.';

    const caseStudyTitle = isInterior
        ? 'Luxury Penthouse Makeover in Koregaon Park'
        : (isTurnkey ? 'End-to-End Turnkey Villa Construction in Baner' : 'Modern Eco-Friendly Bungalow in Balewadi');

    const infographicHTML = isCost ? `
    <div style="margin: 40px 0;">
        <h3 style="color: #d9a05b;">Infographic: Cost & Process Comparison</h3>
        <table border="1" cellpadding="10" cellspacing="0" style="width:100%; border-collapse: collapse; min-width: 600px; margin-bottom: 20px;">
            <thead>
                <tr style="background:#f1f1f1;">
                    <th>Parameter</th>
                    <th>Standard Approach</th>
                    <th>Premium / Turnkey Approach</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Cost Predictability</strong></td>
                    <td>High Variance (Hidden Costs)</td>
                    <td>Fixed Price (BOQ Guaranteed)</td>
                </tr>
                <tr>
                    <td><strong>Time Required</strong></td>
                    <td>18-24 Months</td>
                    <td>12-14 Months</td>
                </tr>
                <tr>
                    <td><strong>Material Quality</strong></td>
                    <td>Locally Sourced, Handcrafted</td>
                    <td>Factory Finished, European Hardware</td>
                </tr>
            </tbody>
        </table>
    </div>` : `
    <div style="margin: 40px 0;">
        <h3 style="color: #d9a05b;">Flowchart: The 5-Step Execution Process</h3>
        <ol style="background: #fdfbf7; padding: 20px 40px; border-radius: 8px; border-left: 4px solid #d9a05b;">
            <li><strong>Step 1:</strong> Initial Consultation & Site Analysis</li>
            <li><strong>Step 2:</strong> 3D Concept Design & Space Planning</li>
            <li><strong>Step 3:</strong> BOQ Finalization & Legal Approvals</li>
            <li><strong>Step 4:</strong> Material Procurement & Factory Production</li>
            <li><strong>Step 5:</strong> On-Site Execution & Final Handover</li>
        </ol>
    </div>`;

    const htmlContent = `

    <!-- BEGIN ENHANCEMENTS -->
    <div style="margin-top: 50px;">
        <h2>Visual Inspiration & Architecture Highlights</h2>
        <p>Explore some of our premium design features that elevate spaces in Pune.</p>
        <div style="text-align: center; margin: 30px 0;">
            <img src="${imgPath1}" alt="${altText1}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);" />
            <p style="font-size: 0.9em; color: #666; margin-top: 10px;"><em>Visual Inspiration: ${altText1}</em></p>
        </div>

        ${infographicHTML}

        <div style="text-align: center; margin: 30px 0;">
            <img src="${imgPath2}" alt="${altText2}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);" />
            <p style="font-size: 0.9em; color: #666; margin-top: 10px;"><em>Execution Quality: ${altText2}</em></p>
        </div>

        <div style="background: #111; color: #fff; padding: 30px; border-radius: 8px; margin: 40px 0;">
            <h2 style="color: #d9a05b; margin-top: 0;">Featured Case Study: ${caseStudyTitle}</h2>
            <p><strong>The Challenge:</strong> The client wanted a seamless, modern living space that maximized natural light without compromising on privacy in a densely populated urban area of Pune.</p>
            <p><strong>The Solution:</strong> Our team deployed a custom Vastu-compliant spatial layout featuring double-height ceilings, automated smart-lighting, and factory-finished modular units to minimize on-site clutter.</p>
            <p><strong>The Result:</strong> Delivered 45 days ahead of schedule, the project achieved a 30% improvement in natural airflow and set a new benchmark for luxury residential design in the locality.</p>
        </div>
    </div>
    <!-- END ENHANCEMENTS -->
`;
    return htmlContent;
}

function processFiles() {
    fs.readdir(dataDir, (err, files) => {
        if (err) throw err;

        const tsFiles = files.filter(f => f.startsWith('seo-') && f.endsWith('.ts'));

        tsFiles.forEach(file => {
            const filePath = path.join(dataDir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // Skip if already enhanced
            if (content.includes('<!-- BEGIN ENHANCEMENTS -->')) {
                console.log(`Skipping ${file}, already enhanced.`);
                return;
            }

            // Find the last backtick of the content string
            // Usually it ends with `\n};
            const match = content.match(/`\s*};\s*$/);
            if (match) {
                const enhancements = generateEnhancements(file);
                const replacement = enhancements + match[0];
                const newContent = content.substring(0, match.index) + replacement;
                
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Successfully updated: ${file}`);
            } else {
                console.log(`Could not find end of content string in ${file}`);
            }
        });
    });
}

processFiles();

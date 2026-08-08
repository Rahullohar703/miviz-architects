const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

function generateDatavizHTML(file) {
    const isInterior = file.includes('interior');
    const isCost = file.includes('cost') || file.includes('fees') || file.includes('affordable');
    
    if (isCost) {
        return `
        <!-- DATA VISUALIZATION BAR GRAPH -->
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 25px; margin: 40px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <h3 style="color: #d9a05b; margin-top: 0; font-size: 1.3em;">📊 Data Visualization: Project Cost Allocation Breakdown</h3>
            <p style="font-size: 0.9em; color: #666; margin-bottom: 20px;">Benchmark expenditure distribution for residential construction & design in Pune.</p>
            
            <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                    <span style="font-weight: 600; color: #333;">Structural Civil Construction</span>
                    <span style="font-weight: 600; color: #d9a05b;">45%</span>
                </div>
                <div style="background: #f3f4f6; border-radius: 6px; height: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #d9a05b, #b8860b); width: 45%; height: 100%; border-radius: 6px;"></div>
                </div>
            </div>

            <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                    <span style="font-weight: 600; color: #333;">Interior Fit-out & Millwork</span>
                    <span style="font-weight: 600; color: #d9a05b;">30%</span>
                </div>
                <div style="background: #f3f4f6; border-radius: 6px; height: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #d9a05b, #b8860b); width: 30%; height: 100%; border-radius: 6px;"></div>
                </div>
            </div>

            <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                    <span style="font-weight: 600; color: #333;">Architecture & Structural Engineering</span>
                    <span style="font-weight: 600; color: #d9a05b;">15%</span>
                </div>
                <div style="background: #f3f4f6; border-radius: 6px; height: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #d9a05b, #b8860b); width: 15%; height: 100%; border-radius: 6px;"></div>
                </div>
            </div>

            <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                    <span style="font-weight: 600; color: #333;">PMC Approvals & Sanctions</span>
                    <span style="font-weight: 600; color: #d9a05b;">10%</span>
                </div>
                <div style="background: #f3f4f6; border-radius: 6px; height: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #d9a05b, #b8860b); width: 10%; height: 100%; border-radius: 6px;"></div>
                </div>
            </div>
        </div>`;
    } else if (isInterior) {
        return `
        <!-- DATA VISUALIZATION BAR GRAPH -->
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 25px; margin: 40px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <h3 style="color: #d9a05b; margin-top: 0; font-size: 1.3em;">📊 Data Visualization: Interior Budget Distribution</h3>
            <p style="font-size: 0.9em; color: #666; margin-bottom: 20px;">Average budget split for luxury home interior projects in Pune.</p>
            
            <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                    <span style="font-weight: 600; color: #333;">Custom Carpentry & Modular Furniture</span>
                    <span style="font-weight: 600; color: #d9a05b;">40%</span>
                </div>
                <div style="background: #f3f4f6; border-radius: 6px; height: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #d9a05b, #b8860b); width: 40%; height: 100%; border-radius: 6px;"></div>
                </div>
            </div>

            <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                    <span style="font-weight: 600; color: #333;">Electrical, Lighting & Ceiling</span>
                    <span style="font-weight: 600; color: #d9a05b;">25%</span>
                </div>
                <div style="background: #f3f4f6; border-radius: 6px; height: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #d9a05b, #b8860b); width: 25%; height: 100%; border-radius: 6px;"></div>
                </div>
            </div>

            <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                    <span style="font-weight: 600; color: #333;">Civil Modification & Tiling</span>
                    <span style="font-weight: 600; color: #d9a05b;">20%</span>
                </div>
                <div style="background: #f3f4f6; border-radius: 6px; height: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #d9a05b, #b8860b); width: 20%; height: 100%; border-radius: 6px;"></div>
                </div>
            </div>

            <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                    <span style="font-weight: 600; color: #333;">Design & Supervision Fee</span>
                    <span style="font-weight: 600; color: #d9a05b;">15%</span>
                </div>
                <div style="background: #f3f4f6; border-radius: 6px; height: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #d9a05b, #b8860b); width: 15%; height: 100%; border-radius: 6px;"></div>
                </div>
            </div>
        </div>`;
    } else {
        return `
        <!-- DATA VISUALIZATION BAR GRAPH -->
        <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 25px; margin: 40px 0; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <h3 style="color: #d9a05b; margin-top: 0; font-size: 1.3em;">📊 Data Visualization: Project Timeline Phases</h3>
            <p style="font-size: 0.9em; color: #666; margin-bottom: 20px;">Percentage time distribution for architectural execution in Pune.</p>
            
            <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                    <span style="font-weight: 600; color: #333;">Structural Civil Execution</span>
                    <span style="font-weight: 600; color: #d9a05b;">50%</span>
                </div>
                <div style="background: #f3f4f6; border-radius: 6px; height: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #d9a05b, #b8860b); width: 50%; height: 100%; border-radius: 6px;"></div>
                </div>
            </div>

            <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                    <span style="font-weight: 600; color: #333;">Concept & Working Drawings</span>
                    <span style="font-weight: 600; color: #d9a05b;">20%</span>
                </div>
                <div style="background: #f3f4f6; border-radius: 6px; height: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #d9a05b, #b8860b); width: 20%; height: 100%; border-radius: 6px;"></div>
                </div>
            </div>

            <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                    <span style="font-weight: 600; color: #333;">Finishing & Millwork</span>
                    <span style="font-weight: 600; color: #d9a05b;">20%</span>
                </div>
                <div style="background: #f3f4f6; border-radius: 6px; height: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #d9a05b, #b8860b); width: 20%; height: 100%; border-radius: 6px;"></div>
                </div>
            </div>

            <div style="margin-bottom: 10px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 5px;">
                    <span style="font-weight: 600; color: #333;">PMC Liaisoning & Sanctions</span>
                    <span style="font-weight: 600; color: #d9a05b;">10%</span>
                </div>
                <div style="background: #f3f4f6; border-radius: 6px; height: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #d9a05b, #b8860b); width: 10%; height: 100%; border-radius: 6px;"></div>
                </div>
            </div>
        </div>`;
    }
}

function processFiles() {
    fs.readdir(dataDir, (err, files) => {
        if (err) throw err;

        const tsFiles = files.filter(f => f.startsWith('seo-') && f.endsWith('.ts'));

        tsFiles.forEach(file => {
            const filePath = path.join(dataDir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            const isInterior = file.includes('interior');
            const isTurnkey = file.includes('turnkey');
            const caseStudyTitle = isInterior
                ? 'Luxury Penthouse Makeover in Koregaon Park'
                : (isTurnkey ? 'End-to-End Turnkey Villa Construction in Baner' : 'Modern Eco-Friendly Bungalow in Balewadi');

            const dataviz = generateDatavizHTML(file);

            // Replace dark box with light luxury readable box AND inject dataviz bar graph
            const darkBoxRegex = /<div style="background: #111; color: #fff; padding: 30px; border-radius: 8px; margin: 40px 0;">[\s\S]*?<\/div>\s*<\/div>\s*<!-- END ENHANCEMENTS -->/;

            const replacementHTML = `
        ${dataviz}

        <div style="background: #fdfbf7; border: 2px solid #d9a05b; padding: 25px; border-radius: 12px; margin: 40px 0; box-shadow: 0 4px 15px rgba(217,160,91,0.1);">
            <h3 style="color: #b8860b; margin-top: 0; font-size: 1.4em;">🏛️ Featured Case Study: ${caseStudyTitle}</h3>
            <p style="color: #222; margin-bottom: 12px; font-size: 1em;"><strong>The Challenge:</strong> The client wanted a seamless, modern living space that maximized natural light without compromising on privacy in a densely populated urban area of Pune.</p>
            <p style="color: #222; margin-bottom: 12px; font-size: 1em;"><strong>The Solution:</strong> Our team deployed a custom Vastu-compliant spatial layout featuring double-height ceilings, automated smart-lighting, and factory-finished modular units to minimize on-site clutter.</p>
            <p style="color: #222; margin-bottom: 0; font-size: 1em;"><strong>The Result:</strong> Delivered 45 days ahead of schedule, the project achieved a 30% improvement in natural airflow and set a new benchmark for luxury residential design in the locality.</p>
        </div>
    </div>
    <!-- END ENHANCEMENTS -->`;

            if (darkBoxRegex.test(content)) {
                content = content.replace(darkBoxRegex, replacementHTML);
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`Updated dataviz & dark box in: ${file}`);
            } else {
                console.log(`Regex did not match in: ${file}`);
            }
        });
    });
}

processFiles();

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

const generatedImages = [
    '/images/affordable_blueprint_planning_1786199099845.png',
    '/images/architect_client_meeting_1786199129803.png',
    '/images/award_winning_architecture_1786199253133.png',
    '/images/baner_architect_planning_1786199212112.png',
    '/images/baner_luxury_villa_1786199200937.png',
    '/images/cost_effective_modern_home_1786199115729.png',
    '/images/design_studio_pune_1786199159834.png',
    '/images/house_construction_site_1786199173816.png',
    '/images/mistakes_foundation_pune_1786199068222.png',
    '/images/perfect_planning_home_1786199083695.png',
    '/images/premium_villa_pune_1786199143803.png',
    '/images/pune_architecture_firm_1786199224083.png',
    '/images/pune_wada_modern_fusion_1786199237957.png'
];

let imageIndex = 0;

function getNextImage() {
    const img = generatedImages[imageIndex % generatedImages.length];
    imageIndex++;
    return img;
}

function processFiles() {
    fs.readdir(dataDir, (err, files) => {
        if (err) throw err;

        const tsFiles = files.filter(f => f.startsWith('seo-') && f.endsWith('.ts'));

        tsFiles.forEach(file => {
            const filePath = path.join(dataDir, file);
            let content = fs.readFileSync(filePath, 'utf8');

            // Replace the first broken image
            const img1 = getNextImage();
            content = content.replace(/<img src="\/assets\/hero-luxury-interior-Dkz_Ed08.jpg"/, `<img src="${img1}"`);
            content = content.replace(/<img src="\/assets\/hero-architecture-9kSrcD2B.png"/, `<img src="${img1}"`);
            
            // Replace the second broken image
            const img2 = getNextImage();
            content = content.replace(/<img src="\/assets\/seamless-experience-interior-BNjltinh.jpg"/, `<img src="${img2}"`);
            content = content.replace(/<img src="\/assets\/baner-villa-case-study.jpg"/, `<img src="${img2}"`);

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Successfully assigned unique images to: ${file}`);
        });
    });
}

processFiles();

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

const generatedImages = [
    '/images/affordable_blueprint_planning_1786199099845.png',
    '/images/architect_client_meeting_1786199129803.png',
    '/images/architectural_blueprint_desk_1786268594634.png',
    '/images/architecture_studio_interior_1786268556153.png',
    '/images/award_winning_architecture_1786199253133.png',
    '/images/cost_effective_modern_home_1786199115729.png',
    '/images/cozy_contemporary_bedroom_1786269022779.png',
    '/images/elegant_dining_room_1786269008797.png',
    '/images/house_construction_site_1786199173816.png',
    '/images/luxury_modern_bathroom_1786268994970.png',
    '/images/minimalist_kitchen_interior_1786268626145.png',
    '/images/minimalist_living_room_1786268570473.png',
    '/images/modern_home_office_1786269048987.png',
    '/images/modern_kitchen_island_1786269079744.png',
    '/images/modern_villa_exterior_1786268542687.png',
    '/images/outdoor_patio_firepit_1786269064482.png',
    '/images/perfect_planning_home_1786199083695.png',
    '/images/spacious_walk_in_closet_1786269036529.png',
    '/images/wada_fusion_home_1786268610050.png'
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

            let count = 0;
            content = content.replace(/src="\/images\/[^"]+\.png"/g, (match) => {
                count++;
                return `src="${getNextImage()}"`;
            });

            // Fallback for files that still have the old assets (if any)
            if (count === 0) {
                content = content.replace(/<img src="\/assets\/hero-luxury-interior-Dkz_Ed08\.jpg"/, () => `<img src="${getNextImage()}"`);
                content = content.replace(/<img src="\/assets\/hero-architecture-9kSrcD2B\.png"/, () => `<img src="${getNextImage()}"`);
                content = content.replace(/<img src="\/assets\/seamless-experience-interior-BNjltinh\.jpg"/, () => `<img src="${getNextImage()}"`);
                content = content.replace(/<img src="\/assets\/baner-villa-case-study\.jpg"/, () => `<img src="${getNextImage()}"`);
            }

            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Successfully assigned unique images to: ${file}`);
        });
    });
}

processFiles();

const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const https = require('https');

if (!process.env.OPENAI_API_KEY) {
    console.error("\n❌ ERROR: Please add OPENAI_API_KEY to your .env file!\n");
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Since we need 47 images, we will loop with varied architectural prompts
const basePrompts = [
    "A photorealistic exterior view of a modern luxury residential villa in Pune, India, with lush greenery. Architectural photography. No text, no words.",
    "A sleek minimalist living room interior with large floor-to-ceiling windows, modern Indian design elements. Photorealistic architectural photography. No text.",
    "A clean minimalist kitchen interior with marble countertops, wooden cabinets, and modern lighting fixtures. Photorealistic architectural photography. No text.",
    "A modern Indian wada style fusion home exterior. Traditional courtyard with modern glass elements, sunset lighting. Photorealistic architectural photography. No text.",
    "A luxury modern bathroom with a freestanding tub, large window, and natural stone tiles. Photorealistic architectural photography. No text.",
    "An elegant open-concept dining room with a large wooden table and modern pendant lights. Photorealistic architectural photography. No text.",
    "A cozy contemporary bedroom with warm lighting, wood paneling, and a large window. Photorealistic architectural photography. No text.",
    "A spacious walk-in closet with custom wooden shelving and soft recessed lighting. Photorealistic architectural photography. No text.",
    "A modern home office with a sleek desk, ergonomic chair, and floor-to-ceiling bookshelves. Photorealistic architectural photography. No text.",
    "An outdoor patio area with a fire pit, modern seating, and subtle landscape lighting at twilight. Photorealistic architectural photography. No text.",
    "A photorealistic top-down view of an architectural blueprint and a hardhat on a wooden desk. Professional workspace. No text."
];

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => {});
            reject(err);
        });
    });
}

async function run() {
    const totalNeeded = 47;
    console.log(`\n🚀 Starting generation of ${totalNeeded} images using DALL-E 3...\n`);
    
    let generatedFiles = [];
    
    for (let i = 0; i < totalNeeded; i++) {
        const prompt = basePrompts[i % basePrompts.length] + ` Unique angle variation ${i}. Completely text-free, no letters, no typography, no watermarks.`;
        console.log(`📸 Generating image ${i + 1}/${totalNeeded}...`);
        
        try {
            const response = await openai.images.generate({
                model: "dall-e-2",
                prompt: prompt,
                n: 1,
                size: "1024x1024"
            });
            
            const imageUrl = response.data[0].url;
            const fileName = `dalle_arch_${Date.now()}_${i}.png`;
            const filePath = path.join(__dirname, '../public/images', fileName);
            
            await downloadImage(imageUrl, filePath);
            console.log(`✅ Saved ${fileName}`);
            generatedFiles.push('/images/' + fileName);
        } catch (error) {
            console.error(`❌ Failed to generate image ${i + 1}:`, error.message);
            // DALL-E 3 rate limit is usually 50-100 images per minute depending on tier. 
            // If we hit a limit, we pause for a bit.
            if (error.message.includes("429")) {
                 console.log("Waiting 10 seconds for rate limit...");
                 await new Promise(r => setTimeout(r, 10000));
            }
        }
    }
    
    if (generatedFiles.length > 0) {
        console.log(`\n🎉 Generated ${generatedFiles.length} images! Updating assignment script...`);
        const assignScriptPath = path.join(__dirname, 'assign-unique-images.cjs');
        let scriptContent = fs.readFileSync(assignScriptPath, 'utf8');
        
        // Merge the new images into the existing array safely
        const appendString = generatedFiles.map(f => `    ,'${f}'`).join('\n');
        scriptContent = scriptContent.replace(/];/, appendString + "\n];");
        
        fs.writeFileSync(assignScriptPath, scriptContent, 'utf8');
        console.log("✅ Updated scripts/assign-unique-images.cjs!");
        console.log("\nNext Steps: Run `node scripts/assign-unique-images.cjs` to apply the new images to all 33 blogs!");
    }
}

run();

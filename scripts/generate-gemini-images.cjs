const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("\n❌ ERROR: GEMINI_API_KEY not found in .env\n");
    process.exit(1);
}

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

async function generateImage(prompt) {
    const data = JSON.stringify({
        instances: [{ prompt: prompt }],
        parameters: {
            sampleCount: 1,
            outputOptions: { mimeType: "image/jpeg" }
        }
    });

    const options = {
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => responseBody += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(responseBody);
                    if (json.error) {
                        return reject(new Error(json.error.message || JSON.stringify(json.error)));
                    }
                    if (json.predictions && json.predictions[0] && json.predictions[0].bytesBase64Encoded) {
                        resolve(json.predictions[0].bytesBase64Encoded);
                    } else {
                        reject(new Error("No image data returned. Full response: " + responseBody));
                    }
                } catch (e) {
                    reject(new Error("Failed to parse response: " + responseBody));
                }
            });
        });

        req.on('error', (e) => reject(e));
        req.write(data);
        req.end();
    });
}

async function run() {
    const totalNeeded = 47;
    console.log(`\n🚀 Starting generation of ${totalNeeded} images using Google Imagen 3...\n`);
    
    let generatedFiles = [];
    
    for (let i = 0; i < totalNeeded; i++) {
        const prompt = basePrompts[i % basePrompts.length] + ` Unique angle variation ${i}. Completely text-free, no letters, no typography, no watermarks.`;
        console.log(`📸 Generating image ${i + 1}/${totalNeeded}...`);
        
        try {
            const base64Data = await generateImage(prompt);
            const fileName = `imagen_arch_${Date.now()}_${i}.jpg`;
            const filePath = path.join(__dirname, '../public/images', fileName);
            
            // Save base64 to file
            fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
            console.log(`✅ Saved ${fileName}`);
            generatedFiles.push('/images/' + fileName);
        } catch (error) {
            console.error(`❌ Failed to generate image ${i + 1}:`, error.message);
            // Wait 10 seconds if we hit a rate limit
            if (error.message.includes("429") || error.message.includes("quota")) {
                 console.log("Waiting 10 seconds for rate limit...");
                 await new Promise(r => setTimeout(r, 10000));
            }
        }
    }
    
    if (generatedFiles.length > 0) {
        console.log(`\n🎉 Generated ${generatedFiles.length} images! Updating assignment script...`);
        const assignScriptPath = path.join(__dirname, 'assign-unique-images.cjs');
        let scriptContent = fs.readFileSync(assignScriptPath, 'utf8');
        
        const appendString = generatedFiles.map(f => `    ,'${f}'`).join('\n');
        scriptContent = scriptContent.replace(/];/, appendString + "\n];");
        
        fs.writeFileSync(assignScriptPath, scriptContent, 'utf8');
        console.log("✅ Updated scripts/assign-unique-images.cjs!");
        console.log("\nNext Steps: Run `node scripts/assign-unique-images.cjs` to apply the new images to all 33 blogs!");
    }
}

run();

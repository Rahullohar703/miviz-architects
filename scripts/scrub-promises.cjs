const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const files = fs.readdirSync(dataDir).filter(f => f.startsWith('seo-') && f.endsWith('.ts'));

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // --- VR & Virtual Reality Replacements ---
  content = content.replace(/Virtual Reality \(VR\)/g, 'High-Fidelity 3D Renders');
  content = content.replace(/VR \(Virtual Reality\)/g, 'High-Fidelity 3D Renders');
  content = content.replace(/Virtual Reality/g, 'High-Fidelity 3D Renders');
  content = content.replace(/immersive VR walkthroughs/gi, 'detailed 3D design walkthroughs');
  content = content.replace(/VR walkthroughs/gi, '3D design walkthroughs');
  content = content.replace(/VR walkthrough/gi, '3D design walkthrough');
  content = content.replace(/VR presentations/gi, '3D presentations');
  content = content.replace(/VR presentation/gi, '3D presentation');
  content = content.replace(/VR headsets/gi, 'detailed 3D models');
  content = content.replace(/put on a VR headset/gi, 'review the detailed 3D models');
  content = content.replace(/put on a headset/gi, 'review the detailed 3D models');
  content = content.replace(/put on the headset/gi, 'review the models');
  content = content.replace(/in VR first/gi, 'in 3D first');
  content = content.replace(/in VR/g, 'in 3D');
  content = content.replace(/immersive VR/gi, 'immersive 3D');
  content = content.replace(/VR design/gi, '3D design');
  content = content.replace(/VR conceptualization/gi, '3D conceptualization');
  content = content.replace(/VR planning/gi, '3D planning');
  content = content.replace(/3D\/VR/g, '3D');
  content = content.replace(/VR visualizations/gi, '3D visualizations');
  content = content.replace(/VR rendering/gi, '3D rendering');
  
  // Clean up any stray " VR " (case sensitive to avoid words like "every")
  content = content.replace(/\bVR\b/g, '3D');

  // --- Specific Fake Promises Replacements ---
  // 45 to 60 days
  content = content.replace(/in 45 to 60 days post-design approval/g, 'within a strict timeline post-design approval');
  // 50-point checklist
  content = content.replace(/a 50-point checklist/g, 'a rigorous quality checklist');

  // --- Internal App / Software Clarification ---
  // Ensure that when we mention project management software, it's clear it's for internal use.
  // E.g., "modern project management software" -> "internal project management software"
  content = content.replace(/modern project management software/g, 'internal project management software');
  content = content.replace(/modern project management tools/g, 'internal project management tools');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
});

// Also update index.html
const indexPath = path.join(__dirname, '../index.html');
if (fs.existsSync(indexPath)) {
  let indexContent = fs.readFileSync(indexPath, 'utf8');
  if (indexContent.includes('VR walkthroughs')) {
    indexContent = indexContent.replace(/VR walkthroughs/g, '3D walkthroughs');
    fs.writeFileSync(indexPath, indexContent);
    console.log('Updated index.html');
  }
}

console.log('Scrub complete!');

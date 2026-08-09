const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const files = fs.readdirSync(dataDir).filter(f => f.startsWith('seo-') && f.endsWith('.ts'));

const promiseKeywords = [
  'we provide',
  'we offer',
  'we guarantee',
  'we will',
  'we use',
  'miviz provides',
  'miviz offers',
  'miviz will',
  'guarantee',
  'warranty',
  'app',
  'dashboard',
  'software',
  'portal',
  'drone',
  'free',
  'video call'
];

let allPromises = [];

files.forEach(file => {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
  
  // Extract sentences by splitting on . ? ! followed by space or newline
  // We remove HTML tags first to make it cleaner
  const cleanContent = content.replace(/<[^>]+>/g, ' ');
  const sentences = cleanContent.split(/(?<=[.?!])\s+/);
  
  sentences.forEach(sentence => {
    const lower = sentence.toLowerCase();
    
    // Check if the sentence contains any promise keywords
    const matches = promiseKeywords.some(kw => lower.includes(kw));
    
    // Make sure it mentions MIVIZ or 'we ' so we don't get generic advice
    const mentionsUs = lower.includes('miviz') || lower.includes('we ');
    
    if (matches && mentionsUs && sentence.length > 20 && sentence.length < 500) {
      // Clean up the sentence (remove extra spaces, newlines)
      const cleanSentence = sentence.replace(/\s+/g, ' ').trim();
      allPromises.push({ file, sentence: cleanSentence });
    }
  });
});

// Deduplicate sentences
const uniquePromises = [];
const seen = new Set();
allPromises.forEach(p => {
  if (!seen.has(p.sentence)) {
    seen.add(p.sentence);
    uniquePromises.push(p);
  }
});

// Write to a markdown artifact
let mdOutput = '# Potential Service Promises Found in Blogs\n\nReview this list to see if any of these are "fake promises".\n\n';

uniquePromises.forEach(p => {
  mdOutput += `- **${p.file}**: "${p.sentence}"\n`;
});

fs.writeFileSync(path.join(__dirname, '../promises-report.md'), mdOutput);
console.log('Promises extracted to promises-report.md');

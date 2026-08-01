const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const files = fs.readdirSync(dataDir).filter(f => f.startsWith('seo-') && f.endsWith('.ts'));

let report = '# SEO Blog Pages Audit Report\n\n';

files.forEach(file => {
  const contentStr = fs.readFileSync(path.join(dataDir, file), 'utf-8');
  
  // Extract fields using regex
  const slugMatch = contentStr.match(/slug:\s*'([^']+)'/);
  const titleMatch = contentStr.match(/title:\s*'([^']+)'/);
  const descMatch = contentStr.match(/description:\s*'([^']+)'/);
  const heroTitleMatch = contentStr.match(/hero:\s*\{\s*title:\s*'([^']+)'/);
  
  // Content extraction might be tricky if there are multiple backticks, but usually there's one main block
  const contentBlockMatch = contentStr.match(/content:\s*`([\s\S]*?)`\s*};/);
  
  const slug = slugMatch ? slugMatch[1] : 'unknown';
  const keyword = slug.replace(/-/g, ' ');
  const titleTag = titleMatch ? titleMatch[1] : '';
  const metaDesc = descMatch ? descMatch[1] : '';
  const h1 = heroTitleMatch ? heroTitleMatch[1] : '';
  const content = contentBlockMatch ? contentBlockMatch[1] : '';

  // 1. One H1 tag
  const h1InContent = (content.match(/<h1/gi) || []).length;
  const totalH1 = 1 + h1InContent;

  // 2. Keyword in H1
  const keywordRegex = new RegExp(keyword.split(' ').filter(w => w.length > 2).join('|'), 'gi');
  const h1HasKeyword = h1.toLowerCase().includes(keyword.toLowerCase()) || keywordRegex.test(h1);

  // 3 & 4. H2 and H3 tags
  const h2Tags = [...content.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, ''));
  const h3Tags = [...content.matchAll(/<h3[^>]*>(.*?)<\/h3>/gi)].map(m => m[1].replace(/<[^>]+>/g, ''));

  // 5. Title matches H1
  const titleMatchesH1 = titleTag.toLowerCase() === h1.toLowerCase() || titleTag.toLowerCase().includes(h1.toLowerCase());

  // 6. Meta description
  const metaHasKeyword = metaDesc.toLowerCase().includes(keyword.toLowerCase()) || keywordRegex.test(metaDesc);

  // 7. Word count
  const textOnly = content.replace(/<[^>]+>/g, ' ');
  const words = textOnly.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // 8. Internal links
  const internalLinks = [...content.matchAll(/href="(\/[^"]+)"/gi)].map(m => m[1]);
  
  // 9. External links
  const externalLinks = [...content.matchAll(/href="(http[^"]+)"/gi)].map(m => m[1]);

  report += `## Page: ${slug}\n`;
  report += `- **Main Keyword (Derived from slug):** ${keyword}\n`;
  report += `- **Heading 1:** \`${h1}\`\n`;
  report += `  - *One H1 per page?* ${totalH1 === 1 ? '✅ Yes' : '❌ No (Found ' + totalH1 + ')'}\n`;
  report += `  - *H1 includes keyword?* ${h1HasKeyword ? '✅ Yes' : '❌ No/Partial'}\n`;
  report += `- **Title Tag:** \`${titleTag}\`\n`;
  report += `  - *Matches H1?* ${titleMatchesH1 ? '✅ Yes' : '❌ No'}\n`;
  report += `- **Meta Description:** \`${metaDesc}\`\n`;
  report += `  - *Includes keyword?* ${metaHasKeyword ? '✅ Yes' : '❌ No/Partial'}\n`;
  report += `  - *Length:* ${metaDesc.length} chars\n`;
  report += `- **Word Count:** ${wordCount} words ${wordCount >= 1000 ? '✅' : '❌ (Under 1,000)'}\n`;
  report += `- **Internal Links:** ${internalLinks.length} ${internalLinks.length >= 3 && internalLinks.length <= 4 ? '✅' : (internalLinks.length > 4 ? '⚠️ (More than 4)' : '❌ (Less than 3)')}\n`;
  if(internalLinks.length > 0) report += `  - ${internalLinks.join(', ')}\n`;
  report += `- **External Links:** ${externalLinks.length} ${externalLinks.length >= 2 && externalLinks.length <= 3 ? '✅' : (externalLinks.length > 3 ? '⚠️ (More than 3)' : '❌ (Less than 2)')}\n`;
  if(externalLinks.length > 0) report += `  - ${externalLinks.join(', ')}\n`;
  report += `- **H2 Tags:**\n`;
  h2Tags.forEach(h2 => report += `  - ${h2}\n`);
  report += `- **H3 Tags:**\n`;
  h3Tags.forEach(h3 => report += `  - ${h3}\n`);
  
  report += `\n---\n\n`;
});

fs.writeFileSync('seo_audit_report.md', report);
console.log('Report generated at seo_audit_report.md');

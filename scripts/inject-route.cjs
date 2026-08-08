const fs = require('fs');

const appTsxPath = 'src/App.tsx';
let content = fs.readFileSync(appTsxPath, 'utf8');

// Inject the import
const importStatement = `const ArchitectsInKoregaonParkPunePage = React.lazy(() => import("./pages/seo/ArchitectsInKoregaonParkPunePage"));\n`;
content = content.replace(
  'const ArchitectsInBanerPunePage = React.lazy(() => import("./pages/seo/ArchitectsInBanerPunePage"));',
  'const ArchitectsInBanerPunePage = React.lazy(() => import("./pages/seo/ArchitectsInBanerPunePage"));\n' + importStatement
);

// Inject the route
const routeStatement = `                <Route path="/architects-in-koregaon-park-pune" element={<ArchitectsInKoregaonParkPunePage />} />\n`;
content = content.replace(
  '<Route path="/architects-in-baner-pune" element={<ArchitectsInBanerPunePage />} />',
  '<Route path="/architects-in-baner-pune" element={<ArchitectsInBanerPunePage />} />\n' + routeStatement
);

fs.writeFileSync(appTsxPath, content);
console.log('App.tsx updated.');

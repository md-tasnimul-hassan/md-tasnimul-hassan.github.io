import fsp from 'fs/promises';
import fs from 'fs';
import pathModule from 'path';

async function copyIndexHtml() {
  const distDir = 'dist';
  const indexHtmlPath = pathModule.join(distDir, 'index.html');
  
  if (!fs.existsSync(indexHtmlPath)) {
    console.error(`Error: ${indexHtmlPath} not found. Build the project first.`);
    process.exit(1);
  }

  const indexHtml = await fsp.readFile(indexHtmlPath, 'utf8');

  const routes = [
    'cv',
    'projects',
    'certificate',
    'certificates',
    'extra-curricular'
  ];

  for (const route of routes) {
    const routeDir = pathModule.join(distDir, route);
    if (!fs.existsSync(routeDir)) {
      await fsp.mkdir(routeDir, { recursive: true });
    }
    await fsp.writeFile(pathModule.join(routeDir, 'index.html'), indexHtml);
    console.log(`Created ${route}/index.html`);
  }

  // Also create a 404.html that is just a copy of index.html for unknown routes
  // so BrowserRouter can handle them instead of showing GH Pages default 404 
  // (though it will return a 404 status code, which is correct for actual 404s)
  await fsp.writeFile(pathModule.join(distDir, '404.html'), indexHtml);
  console.log('Created 404.html');
}

copyIndexHtml().catch(err => {
  console.error(err);
  process.exit(1);
});

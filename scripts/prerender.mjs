import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs/promises';
import Prerenderer from '@prerenderer/prerenderer';
import PuppeteerRenderer from '@prerenderer/renderer-puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

const routes = [
  '/projects/nudge',
  '/projects/nudge/privacy',
  '/projects/nudge/support',
  '/projects/paws',
  '/projects/paws/privacy',
  '/projects/paws/support',
];

const prerenderer = new Prerenderer({
  staticDir: distDir,
  renderer: new PuppeteerRenderer({
    renderAfterElementExists: '.project-detail-container',
    renderAfterTime: 6000,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  }),
});

try {
  await prerenderer.initialize();
  const rendered = await prerenderer.renderRoutes(routes);

  for (const { route, html } of rendered) {
    const outDir = path.join(distDir, route);
    await fs.mkdir(outDir, { recursive: true });
    const outFile = path.join(outDir, 'index.html');
    await fs.writeFile(outFile, html.trim());
    console.log(`prerendered: ${route} -> ${path.relative(distDir, outFile)}`);
  }
} catch (err) {
  console.error('Prerender failed:', err);
  process.exitCode = 1;
} finally {
  await prerenderer.destroy();
}

// Bundle the design-sync foundation stylesheet (styles-src.css) into a
// self-contained styles-foundation.css that cfg.cssEntry points at. Run as part
// of buildCmd so re-syncs regenerate it. SGDS component styles live in shadow
// DOM (in the JS bundle); this file carries tokens + base + utilities + the
// story layout helpers so rendered designs and preview cards are styled.
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..');

// esbuild is available in the repo (via vite/storybook) or in the staged
// .ds-sync converter deps — resolve from whichever exists.
const require = createRequire(import.meta.url);
let esbuild;
for (const p of [join(repoRoot, 'node_modules/esbuild'), join(repoRoot, '.ds-sync/node_modules/esbuild')]) {
  try { esbuild = require(p); break; } catch {}
}
if (!esbuild) { console.error('build-css: could not resolve esbuild'); process.exit(1); }

// Output inside the shim dir (react-entry/): the converter resolves cfg.cssEntry
// relative to PKG_DIR — which the shim's package.json makes react-entry/ — and
// bounds it to that dir, so the file must live there.
await esbuild.build({
  entryPoints: [join(here, 'styles-src.css')],
  bundle: true,
  outfile: join(here, 'react-entry', 'styles-foundation.css'),
  loader: { '.css': 'css' },
  logLevel: 'warning',
});
console.error('build-css: wrote .design-sync/react-entry/styles-foundation.css');

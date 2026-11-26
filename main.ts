// Hand-in program for the Alvarez Family Budget entry (Node 22, standard
// library only). The site itself is plain static files in app/ — an
// index.html shell, one stylesheet, and ES modules that hold the household's
// data and render its five pages. Nothing it runs, styles, or shows loads
// over the network, so the program's job is only to gather the entry:
//
//   1. copy app/ into the output directory,
//   2. copy screenshots/ beside it, when the folder is there,
//   3. write /output/dossier.json with the kit's buildDossier, so the judge
//      reads the screenshots, the first load's files and bytes, and the
//      source outline.
//
// The dossier library lives in vendor/makefun-frontend.ts, the kit's own
// copy, untouched: the scorer rebuilds the dossier with its copy and the two
// must match byte for byte, so this file never edits or re-derives it.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
cpSync(join(repoRoot, 'app'), join(outDir, 'app'), { recursive: true });

const shotsDir = join(repoRoot, 'screenshots');
if (existsSync(shotsDir)) {
  cpSync(shotsDir, join(outDir, 'screenshots'), { recursive: true });
}

// The caps are the scorer's own: at most four screenshots of 256 KiB, app/
// within 993 entries and 16 MiB, and the dossier text within 160 KiB.
const dossier = buildDossier(outDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outDir, 'dossier.json'), dossier);

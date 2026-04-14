/**
 * Verify every local Markdown path in SUMMARY.md exists (GitBook navigation).
 * Run: node scripts/verify-book-links.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const summaryPath = path.join(root, 'SUMMARY.md');

if (!fs.existsSync(summaryPath)) {
  console.error('verify-book-links: SUMMARY.md not found at repo root.');
  process.exit(1);
}

const text = fs.readFileSync(summaryPath, 'utf8');
const linkRe = /\]\(([^)]+)\)/g;
let match;
let missing = false;

while ((match = linkRe.exec(text)) !== null) {
  let href = match[1].trim();
  if (/^https?:\/\//i.test(href) || href.startsWith('mailto:')) continue;
  if (!href || href.startsWith('#')) continue;
  const target = path.join(root, href);
  if (!fs.existsSync(target)) {
    console.error(`verify-book-links: missing file for SUMMARY link: ${href}`);
    missing = true;
  }
}

const readmePath = path.join(root, 'README.md');
if (!fs.existsSync(readmePath)) {
  console.error('verify-book-links: README.md missing at repo root.');
  missing = true;
}

if (missing) {
  console.error('verify-book-links: failed.');
  process.exit(1);
}

console.log('verify-book-links: OK (SUMMARY.md paths and README.md present).');

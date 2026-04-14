import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';
import gifenc from 'gifenc';

const { GIFEncoder, quantize, applyPalette } = gifenc;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const demosRoot = path.join(repoRoot, 'assets', 'demos');
const framesRoot = path.join(demosRoot, 'frames');

const jobs = [
  {
    name: 'login-flow.gif',
    inputDir: path.join(framesRoot, 'login'),
    delays: [900, 900, 900, 1400],
  },
  {
    name: 'approval-flow.gif',
    inputDir: path.join(framesRoot, 'approval'),
    delays: [900, 900, 900, 1400],
  },
];

await fs.mkdir(demosRoot, { recursive: true });

for (const job of jobs) {
  const files = (await fs.readdir(job.inputDir))
    .filter((file) => file.endsWith('.png'))
    .sort((a, b) => a.localeCompare(b));

  if (!files.length) {
    throw new Error(`No PNG frames found in ${job.inputDir}`);
  }

  const frames = [];
  for (const file of files) {
    const buffer = await fs.readFile(path.join(job.inputDir, file));
    const png = PNG.sync.read(buffer);
    frames.push(png);
  }

  const width = frames[0].width;
  const height = frames[0].height;
  const encoder = GIFEncoder();

  for (let index = 0; index < frames.length; index += 1) {
    const frame = frames[index];
    const palette = quantize(frame.data, 256);
    const indexed = applyPalette(frame.data, palette);
    encoder.writeFrame(indexed, width, height, {
      palette,
      delay: job.delays[index] ?? 1000,
    });
  }

  encoder.finish();
  await fs.writeFile(path.join(demosRoot, job.name), encoder.bytesView());
  console.log(`Wrote ${job.name}`);
}

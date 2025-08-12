import { readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { Resvg } from '@resvg/resvg-js';

async function main() {
  const [,, inputPathArg, outputPathArg, widthArg] = process.argv;
  if (!inputPathArg || !outputPathArg) {
    console.error('Usage: node scripts/svg_to_png.mjs <input.svg> <output.png> [widthPx]');
    process.exit(1);
  }

  const inputPath = resolve(inputPathArg);
  const outputPath = resolve(outputPathArg);
  const width = widthArg ? parseInt(widthArg, 10) : undefined;

  const svg = await readFile(inputPath, 'utf-8');
  const resvg = new Resvg(svg, width ? { fitTo: { mode: 'width', value: width } } : undefined);
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  await writeFile(outputPath, pngBuffer);
  console.log(`Wrote ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});



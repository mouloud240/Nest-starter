import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const source = path.resolve(__dirname, '..', 'templates', 'base');
const destination = path.resolve(__dirname, 'templates', 'base');

const ignored = new Set([
  'node_modules',
  'dist',
  '.git',
  'coverage',
  '.env',
  'pnpm-lock.yaml',
]);

async function main() {
  await rm(destination, { recursive: true, force: true });
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination, {
    recursive: true,
    filter: (src) => {
      const base = path.basename(src);
      return !ignored.has(base);
    },
  });
  console.log(`Copied templates/base to ${destination}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

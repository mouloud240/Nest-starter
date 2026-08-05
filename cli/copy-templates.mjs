import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ignored = new Set([
  'node_modules',
  'dist',
  '.git',
  'coverage',
  '.env',
  'pnpm-lock.yaml',
]);

const templates = ['base', 'graphql'];

async function main() {
  for (const name of templates) {
    const source = path.resolve(__dirname, '..', 'templates', name);
    const destination = path.resolve(__dirname, 'templates', name);
    await rm(destination, { recursive: true, force: true });
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(source, destination, {
      recursive: true,
      filter: (src) => {
        const base = path.basename(src);
        return !ignored.has(base);
      },
    });
    console.log(`Copied templates/${name} to ${destination}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

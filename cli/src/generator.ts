import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = path.resolve(__dirname, '..', 'templates', 'base');

const IGNORED = new Set([
  'node_modules',
  'dist',
  '.git',
  'coverage',
  '.env',
  'pnpm-lock.yaml',
]);

export interface CreateProjectOptions {
  projectName: string;
  targetDir: string;
}

export async function createProject(options: CreateProjectOptions) {
  const { projectName, targetDir } = options;
  const dest = path.resolve(targetDir);

  if (existsSync(dest)) {
    throw new Error(`Directory ${dest} already exists.`);
  }

  await mkdir(dest, { recursive: true });
  await cp(TEMPLATE_DIR, dest, {
    recursive: true,
    filter: (src) => !IGNORED.has(path.basename(src)),
  });

  const pkgPath = path.join(dest, 'package.json');
  const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
  pkg.name = projectName;
  await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

  const envExample = await readFile(
    path.join(dest, '.env.example'),
    'utf8',
  );
  await writeFile(path.join(dest, '.env'), envExample);
}

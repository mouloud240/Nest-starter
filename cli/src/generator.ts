import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = path.resolve(__dirname, '..', 'templates');

const IGNORED = new Set([
  'node_modules',
  'dist',
  '.git',
  'coverage',
  '.env',
  'pnpm-lock.yaml',
]);

export type Variant = 'rest' | 'graphql';

export interface CreateProjectOptions {
  projectName: string;
  targetDir: string;
  variant?: Variant;
  templatesDir?: string;
  initGit?: boolean;
  gitInitBranch?: string;
}

export async function createProject(options: CreateProjectOptions) {
  const {
    projectName,
    targetDir,
    variant = 'rest',
    templatesDir,
    initGit = false,
    gitInitBranch = 'main',
  } = options;
  const dest = path.resolve(targetDir);
  const resolvedTemplatesDir = templatesDir
    ? path.resolve(templatesDir)
    : TEMPLATES_DIR;

  if (existsSync(dest)) {
    throw new Error(`Directory ${dest} already exists.`);
  }

  await mkdir(dest, { recursive: true });
  await cp(path.join(resolvedTemplatesDir, 'base'), dest, {
    recursive: true,
    filter: (src) => !IGNORED.has(path.basename(src)),
  });

  const pkgPath = path.join(dest, 'package.json');
  const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));

  if (variant === 'graphql') {
    const overlay = path.join(resolvedTemplatesDir, 'graphql');
    await cp(overlay, dest, {
      recursive: true,
      filter: (src) =>
        path.basename(src) !== 'package.json' &&
        !IGNORED.has(path.basename(src)),
    });
    const overlayPkg = JSON.parse(
      await readFile(path.join(overlay, 'package.json'), 'utf8'),
    );
    pkg.dependencies = { ...pkg.dependencies, ...overlayPkg.dependencies };
  }

  pkg.name = projectName;
  await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

  const envExample = await readFile(path.join(dest, '.env.example'), 'utf8');
  await writeFile(path.join(dest, '.env'), envExample);

  if (initGit) {
    execSync(`git init -b ${gitInitBranch}`, {
      cwd: dest,
      stdio: 'ignore',
    });
  }
}

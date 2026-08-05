#!/usr/bin/env node
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  intro,
  outro,
  text,
  select,
  isCancel,
} from '@clack/prompts';
import pc from 'picocolors';
import { createProject, Variant } from './generator.js';

export { createProject } from './generator.js';

function parseArgs(argv: string[]) {
  const args: Record<string, string> = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const value = argv[i + 1];
      if (value !== undefined && !value.startsWith('--')) {
        args[key] = value;
        i += 1;
      } else {
        args[key] = 'true';
      }
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  intro(pc.bgCyan(pc.black(' nestforge ')));

  let projectName = args['project-name'];
  if (!projectName) {
    const result = await text({
      message: 'What is your project name?',
      placeholder: 'my-nest-app',
      defaultValue: 'my-nest-app',
      validate: (value) => {
        if (!value) return 'Project name is required';
        if (!/^[a-z0-9-]+$/.test(String(value))) {
          return 'Use lowercase letters, numbers, and dashes only';
        }
      },
    });
    if (isCancel(result)) {
      outro(pc.red('Cancelled'));
      process.exit(0);
    }
    projectName = String(result);
  }

  let variant: Variant =
    args['variant'] === 'graphql' ? 'graphql' : 'rest';
  if (!args['variant'] && !args['target-dir']) {
    const result = await select({
      message: 'Which variant?',
      options: [
        { value: 'rest', label: 'Express + REST (default)' },
        { value: 'graphql', label: 'GraphQL (Apollo)' },
      ],
      initialValue: 'rest',
    });
    if (isCancel(result)) {
      outro(pc.red('Cancelled'));
      process.exit(0);
    }
    variant = result as Variant;
  }

  // Create the project next to where the command is run, named after the
  // project. `--target-dir` overrides this for automation.
  const targetDir = args['target-dir'] ?? path.join(process.cwd(), projectName);

  await createProject({ projectName, targetDir, variant });

  outro(
    pc.green(
      `Project created at ${pc.cyan(targetDir)}.\nRun:\n  cd ${projectName}\n  pnpm install\n  cp .env.example .env\n  pnpm start:dev`,
    ),
  );
}

// Resolve symlinks so the guard matches when invoked through npm's `.bin` shim.
const isEntryPoint =
  process.argv[1] !== undefined &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);

if (isEntryPoint) {
  main().catch((err) => {
    console.error(pc.red(err instanceof Error ? err.message : String(err)));
    process.exit(1);
  });
}

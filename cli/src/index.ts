#!/usr/bin/env node
import { pathToFileURL } from 'node:url';
import {
  intro,
  outro,
  text,
  confirm,
  isCancel,
} from '@clack/prompts';
import pc from 'picocolors';
import { createProject } from './generator.js';

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

  intro(pc.bgCyan(pc.black(' create-nest-starter ')));

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

  let targetDir = args['target-dir'];
  if (!targetDir) {
    const result = await text({
      message: 'Where should the project be created?',
      placeholder: projectName,
      defaultValue: projectName,
    });
    if (isCancel(result)) {
      outro(pc.red('Cancelled'));
      process.exit(0);
    }
    targetDir = String(result);
  }

  if (!args['target-dir']) {
    const confirmed = await confirm({
      message: `Create project at ${pc.cyan(targetDir)}?`,
      initialValue: true,
    });
    if (isCancel(confirmed) || !confirmed) {
      outro(pc.red('Cancelled'));
      process.exit(0);
    }
  }

  await createProject({ projectName, targetDir });

  outro(
    pc.green(
      `Project created at ${pc.cyan(targetDir)}.\nRun:\n  cd ${targetDir}\n  pnpm install\n  cp .env.example .env\n  pnpm start:dev`,
    ),
  );
}

if (pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((err) => {
    console.error(pc.red(err instanceof Error ? err.message : String(err)));
    process.exit(1);
  });
}

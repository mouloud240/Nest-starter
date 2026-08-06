#!/usr/bin/env node
import { realpathSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  intro,
  outro,
  text,
  select,
  confirm,
  spinner,
  isCancel,
  note,
} from '@clack/prompts';
import pc from 'picocolors';
import { createProject, Variant } from './generator.js';

export { createProject } from './generator.js';

const LOGO = `
  ███╗   ██╗███████╗███████╗████████╗     ██╗███████╗███████╗ ██████╗ ██████╗  ██████╗ ███████╗
████╗  ██║██╔════╝██╔════╝╚══██╔══╝     ██║██╔════╝██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
██╔██╗ ██║█████╗  ███████╗   ██║        ██║███████╗█████╗  ██║   ██║██████╔╝██║  ███╗█████╗
██║╚██╗██║██╔══╝  ╚════██║   ██║   ██   ██║╚════██║██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝
██║ ╚████║███████╗███████║   ██║   ╚█████╔╝███████║██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
╚═╝  ╚═══╝╚══════╝╚══════╝   ╚═╝    ╚════╝ ╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝`;

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

function banner() {
  return `${pc.bold(pc.magenta(LOGO))}\n${pc.dim(
    'Scaffold a production-ready NestJS backend in seconds.',
  )}`;
}

function formatCommand(label: string, command: string) {
  return `  ${pc.dim(label)}\n  ${pc.cyan(pc.bold(command))}`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  intro(banner());

  let projectName = args['project-name'];
  if (!projectName) {
    const result = await text({
      message: `${pc.bold('Step 1 of 3')} — What is your project name?`,
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
      message: `${pc.bold('Step 2 of 3')} — Which variant?`,
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

  let initGit = args['git'] ? true : args['no-git'] ? false : true;
  if (
    args['git'] === undefined &&
    args['no-git'] === undefined &&
    args['target-dir'] === undefined
  ) {
    const result = await confirm({
      message: `${pc.bold('Step 3 of 3')} — Initialize a git repository?`,
      initialValue: true,
    });
    if (isCancel(result)) {
      outro(pc.red('Cancelled'));
      process.exit(0);
    }
    initGit = result as boolean;
  }

  const s = spinner();
  s.start(`Creating ${pc.bold(projectName)} (${variant})...`);
  await createProject({ projectName, targetDir, variant, initGit });
  s.stop(`${pc.green(pc.bold('✔'))} Created ${pc.bold(projectName)} at ${pc.cyan(targetDir)}`);

  note(
    [
      formatCommand('Move into the project:', `cd ${projectName}`),
      initGit &&
        formatCommand('Create your first commit:', 'git add . && git commit -m "init"'),
      formatCommand('Install dependencies:', 'pnpm install'),
      formatCommand('Copy environment defaults:', 'cp .env.example .env'),
      formatCommand('Start the dev server:', 'pnpm start:dev'),
    ]
      .filter(Boolean)
      .join('\n\n'),
    'Next steps',
  );

  outro(
    pc.green(
      `Ready to build. ${pc.dim('Run the commands above to get started.')}`,
    ),
  );
}

// Resolve symlinks so the guard matches when invoked through npm's `.bin` shim.
const isEntryPoint =
  process.argv[1] !== undefined &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url);

if (isEntryPoint) {
  main().catch((err) => {
    console.error(
      pc.red('\nError: ') + (err instanceof Error ? err.message : String(err)),
    );
    console.error(pc.dim('\nFor help, run: npx create-nestforge@latest --help'));
    process.exit(1);
  });
}

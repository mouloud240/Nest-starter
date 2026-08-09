#!/usr/bin/env node
import { realpathSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {
  intro,
  outro,
  text,
  select,
  multiselect,
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

function readVersion(): string {
  try {
    const pkg = JSON.parse(
      readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
    );
    return pkg.version ?? 'unknown';
  } catch {
    return 'unknown';
  }
}

function showHelp() {
  console.log(`${pc.bold(pc.magenta('create-nestforge'))} ${pc.dim(`v${readVersion()}`)}`);
  console.log(pc.dim('Scaffold a production-ready NestJS backend in seconds.'));
  console.log('');
  console.log(`${pc.bold('Usage:')}`);
  console.log(`  ${pc.cyan('npx create-nestforge@latest')} ${pc.dim('[flags]')}`);
  console.log(`  ${pc.cyan('pnpm create nestforge@latest')} ${pc.dim('[flags]')}`);
  console.log('');
  console.log(`${pc.bold('Flags:')}`);
  console.log(`  ${pc.yellow('--help')}              ${pc.dim('Show this help message and exit')}`);
  console.log(`  ${pc.yellow('--version')}           ${pc.dim('Print version and exit')}`);
  console.log(`  ${pc.yellow('--project-name')}      ${pc.dim('Project name (kebab-case)')}`);
  console.log(`  ${pc.yellow('--variant')}           ${pc.dim('"rest" or "graphql"')}`);
  console.log(`  ${pc.yellow('--oauth-providers')}  ${pc.dim('Comma-separated: google,github')}`);
  console.log(`  ${pc.yellow('--target-dir')}        ${pc.dim('Override output directory')}`);
  console.log(`  ${pc.yellow('--git')}               ${pc.dim('Initialize a git repo (default)')}`);
  console.log(`  ${pc.yellow('--no-git')}            ${pc.dim('Skip git initialization')}`);
  console.log('');
  console.log(`${pc.bold('Examples:')}`);
  console.log(`  ${pc.dim('# interactive mode')}`);
  console.log(`  ${pc.cyan('npx create-nestforge@latest')}`);
  console.log(`  ${pc.dim('')}`);
  console.log(`  ${pc.dim('# automation / CI')}`);
  console.log(`  ${pc.cyan('npx create-nestforge@latest --project-name my-app --variant graphql')}`);
  console.log(`  ${pc.dim('')}`);
  console.log(`  ${pc.dim('# specify output directory')}`);
  console.log(`  ${pc.cyan('npx create-nestforge@latest --project-name my-app --target-dir ./out')}`);
  process.exit(0);
}

function showVersion() {
  console.log(readVersion());
  process.exit(0);
}

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
  const argv = process.argv.slice(2);

  for (const arg of argv) {
    if (arg === '--help' || arg === '-h') showHelp();
    if (arg === '--version' || arg === '-v') showVersion();
  }

  const args = parseArgs(argv);

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
      message: `${pc.bold('Step 2 of 4')} — Which variant?`,
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

  let oauthProviders: string[] | undefined;
  const oauthFlags = args['oauth-providers'];
  if (oauthFlags !== undefined) {
    oauthProviders = oauthFlags
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
  } else if (!args['target-dir']) {
    const result = await multiselect({
      message: `${pc.bold('Step 3 of 4')} — Which OAuth providers?`,
      options: [
        { value: 'google', label: 'Google', hint: 'ready' },
      ],
      required: false,
    });
    if (isCancel(result)) {
      outro(pc.red('Cancelled'));
      process.exit(0);
    }
    oauthProviders = (result as string[]) ?? [];
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
      message: `${pc.bold('Step 4 of 4')} — Initialize a git repository?`,
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
  await createProject({
    projectName,
    targetDir,
    variant,
    initGit,
    oauthProviders,
  });
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

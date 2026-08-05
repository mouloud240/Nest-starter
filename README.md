# create-nest-starter

A T3-style CLI that scaffolds a production-ready NestJS project.

## Quickstart

```bash
npx create-nest-starter
```

You will be asked for a project name and target directory, then the CLI copies
the base template, sets the package name, and creates a `.env` from the example.

## Prerequisites

The generated project requires Redis to boot. Start one with:

```bash
docker run -p 6379:6379 redis:latest
```

## Monorepo layout

```
.
├── cli/            # create-nest-starter (interactive scaffolder)
├── templates/
│   └── base/       # Express + REST + Redis-session NestJS app (no-op defaults)
└── landing/        # Astro docs site
```

## Development

```bash
pnpm install

# Build everything (CLI, template, landing)
pnpm build

# Run the template app in watch mode
pnpm dev:base

# Tests
pnpm test

# Lint
pnpm lint
```

## Workspace scripts

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `pnpm build:cli`    | Build the CLI and bundle the base template   |
| `pnpm build:base`   | Type-check and compile the base template     |
| `pnpm test:base`    | Run the base template unit tests             |
| `pnpm dev:base`     | Run the base template in watch mode          |

## Template contents

The generated project is Express + REST + Redis-backed sessions with no-op
defaults so it boots without a database. `USER_REPOSITORY` is a no-op stub,
OAuth is not wired, and rate limiting is enabled globally.

## License

MIT © Mouloud Hasrane

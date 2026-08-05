# create-nest-starter

A command-line tool that scaffolds a production-ready NestJS project. Answer a
couple of prompts and you get a working application you can build on top of.

## Capabilities

The generated project ships with:

- **Interactive scaffolding** — prompts for project name and target directory,
  then generates the project.
- **Non-interactive mode** — `--project-name` and `--target-dir` flags for
  automation and CI.
- **Express + REST** — a NestJS API with URI versioning (`/api/v1`).
- **Auth-ready** — Passport local and Google OAuth strategies, Redis-backed
  sessions, guards, DTO validation, email-verification codes, and password
  reset.
- **WebSocket gateway** — socket.io gateway with a Redis adapter for
  horizontal scaling and 1-to-1 messaging.
- **Background jobs** — BullMQ queues for mail and upload processing.
- **Mailer** — `@nestjs-modules/mailer` with Handlebars templates for
  verification and password-reset emails.
- **Prod-grade abstractions** — repository pattern (`USER_REPOSITORY` token),
  upload service behind an injectable token, config via `registerAs`, so you
  swap implementations without touching callers.
- **Testing suite** — Suites-based unit tests (`TestBed.solitary`) with a
  configured Jest setup.
- **Docker support** — dev and production Dockerfiles, a `compose.yaml` with
  Redis, Postgres, and a Traefik reverse proxy, plus a PM2 ecosystem file.
- **Security baseline** — Helmet, CSRF double-submit cookies, global rate
  limiting with Redis-backed storage.
- **Observability** — Swagger/Scalar docs at `/api-docs`, Terminus health
  checks, Winston logging with request context.
- **Boots without a database** — persistence is a no-op stub by default, so you
  can start building immediately.

## Quickstart

```bash
npx create-nest-starter
```

You will be asked for a project name and target directory, then the CLI copies
the base template, sets the package name, and creates a `.env` from the example.

## Running the generated project

### Docker (recommended)

The compose stack brings up the app, Redis, and Traefik, so nothing else needs
to be installed locally:

```bash
cd my-nest-app
cp .env.example .env
docker compose up
```

The app is served through Traefik at `http://localhost` (port 80).

### Manual

This route requires Redis running locally:

```bash
docker run -p 6379:6379 redis:latest
```

Then:

```bash
cd my-nest-app
pnpm install
cp .env.example .env
pnpm start:dev
```

The app runs on `http://localhost:3000`.

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

## Template notes

- `USER_REPOSITORY` is a no-op stub. Add a real repository when you are ready to
  persist users.
- OAuth routes exist but are not fully wired. Configure the providers in `.env`
  and implement the strategy callback before use.
- Rate limiting is enabled globally via `ThrottlerGuard`.

## License

MIT © Mouloud Hasrane

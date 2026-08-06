# Agent Notes for nestjs-starter

This file is a compact source of repo-specific truth for AI agents. If a fact is obvious from filenames or standard NestJS conventions, it is intentionally omitted.

## Repo shape

This is a pnpm monorepo, not a single app:

- `cli/` — the `create-nestforge` scaffolder (interactive prompts + generator).
- `templates/base/` — the base NestJS app (Express + REST) that the CLI scaffolds.
- `templates/graphql/` — a template **overlay** (delta files + a `package.json` deps snippet) layered over `base` by the generator to produce the GraphQL variant. Only override files that change; the rest is inherited from `base`.
- `landing/` — Astro docs site.

The `fastify` branch holds the reference implementation for a future overlay; `graphql` was folded into the `templates/graphql/` overlay. When adding features, keep the app source under `templates/base/src/` and the generator/packaging under `cli/`.

Do not add adapter-specific or transport-specific code to `core` services; keep it in `main.ts`, guards, decorators, and resolvers. Core services are shared across variants.

The GraphQL overlay must stay aligned with `base`'s service APIs: resolvers depend on `AuthenticationService` (`login`, `registerUser`, `logout`, `resendVerificationCode`, `verifyEmail`, `forgotPassword`, `resetPassword`, `validateUser`) and `UserService.findById/updateUser`. The GraphQL variant needs `@as-integrations/express5` (Apollo v5 Express integration) — its latest stable is `1.1.2`, not the 2.x alphas. The overlay's `local.guard.ts`, `session.guard.ts`, and `current-user.decorator.ts` are GraphQL-aware versions that also serve HTTP.

## Package manager

Use `pnpm` with the workspace root. The lockfile is `pnpm-lock.yaml`.

## Essential commands

```bash
pnpm install

# Build a workspace package
pnpm build:cli
pnpm build:base

# Run all tests
pnpm test

# Run tests for one package
pnpm --filter nestjs-starter-base test

# Run a single test file
pnpm --filter nestjs-starter-base test -- src/core/user/v1/user.service.spec.ts

# Lint
pnpm run lint
```

`pnpm build:base` (nest build) runs the TypeScript type checker; there is no separate `typecheck` script.

## Important: `cli/templates/base` is generated

Before `pnpm build:cli` runs, `cli/copy-templates.mjs` copies `templates/base` and `templates/graphql` into `cli/templates/` (ignoring `node_modules`, `dist`, `.git`, `coverage`, `.env`, `pnpm-lock.yaml`). `cli/templates/` is gitignored. If you edit either template, run `pnpm --filter create-nestforge build` (or `copy-templates`) so the CLI picks up the change — and always re-verify a generated project after template edits. The generator copies `base` first, then layers the `graphql` overlay over it (overwriting the shared files and merging `dependencies`).

## Testing

- New unit tests in `templates/base` should use **Suites** (`@suites/unit`, `@suites/di.nestjs`, `@suites/doubles.jest`).
- `Mocked` is imported from `@suites/doubles.jest`, not `@suites/unit`. `TestBed` comes from `@suites/unit`. See `templates/base/src/core/user/v1/user.service.spec.ts` and `templates/base/src/common/modules/email/email.service.spec.ts`.
- `Test.createTestingModule` is still appropriate for module-wiring, guard, decorator, and interceptor tests.
- The Jest config in `templates/base/package.json` maps `src/` imports via `moduleNameMapper` and transforms `uuid` through `transformIgnorePatterns` because `uuid` is ESM-only.

## Current known stubs and gaps

- `USER_REPOSITORY` (`templates/base/src/core/user/repository/`) is a `NoopUserRepository` in-memory stub. Swap in a real repository before persisting users.
- `GoogleStrategy.logOauthUser` throws `NotImplementedException`. OAuth routes exist but do not work.
- `ThrottlerGuard` is registered as `APP_GUARD` in `RateLimitingModule`.
- `GoogleStrategy.logOauthUser` throws `NotImplementedException`. OAuth routes exist but do not work.
- `cli/` has no automated tests yet; add `vitest` coverage when the generator grows beyond a straight copy.

## Environment and infra

- The generated project requires Redis to boot. `templates/base/compose.yaml` brings up Redis (and Traefik); the DB service is not used by the no-op defaults.
- Copy `templates/base/.env.example` to `.env`.

## Code conventions

- Configuration lives under `templates/base/src/config/` using `registerAs` from `@nestjs/config`.
- Feature modules live under `templates/base/src/core/<feature>/`. Use the `v1/` subfolder for versioned controllers/services.
- Shared building blocks live under `templates/base/src/common/` and `templates/base/src/infrastructure/`.
- Do not add new dependencies unless a standard library or already-installed package cannot solve the problem.

## Documentation

- `README.md` is the human-facing overview.
- `CHOOSE.md` explains variant selection.
- `CONTRIBUTING.md` covers branching, commits, and PR workflow.
- `COMMIT.md` has the commit-message convention.

## Logging

Do not write prompts or changes to an `ai_logs` folder. No per-session log files are required.

# Choosing a Starter Variant

The repo is a monorepo that ships a CLI (`create-nestforge`). The CLI asks
which variant to scaffold, or you can pass `--variant` for automation.

## Variants

- `rest` (default) — **Express** + REST + Redis-backed sessions, with no-op
  defaults so it boots without a database.
- `graphql` — **Express** + GraphQL (Apollo, code-first) + Redis-backed
  sessions. Adds a `/graphql` endpoint alongside the REST API, with resolvers
  for authentication and user operations plus a per-request DataLoader setup.

## How to get the starter

```bash
npx create-nestforge
```

Or run the CLI from this repo:

```bash
pnpm --filter create-nestforge start
```

Both variants are template overlays in `templates/`:

- `templates/base/` — the full Express + REST app.
- `templates/graphql/` — a delta applied over `base` that adds the GraphQL
  layer (config, resolvers, guards, DataLoaders, dependencies).

## Planned variants

- `fastify` — Fastify + REST + Redis-backed sessions

The historical `fastify` branch contains the reference implementation it will
be derived from.

## Manual alternative

You can clone the `fastify` reference branch directly:

```bash
git clone -b fastify https://github.com/mouloud240/NestForge.git
```

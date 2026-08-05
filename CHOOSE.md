# Choosing a Starter Variant

The repo is a T3-style monorepo that ships a CLI (`create-nest-starter`). The
CLI currently scaffolds a single variant (Express + REST + Redis sessions). More
variants are planned as template overlays.

## Current template

- `base` — **Express** + REST + Redis-backed sessions, with no-op defaults so it
  boots without a database.

## How to get the starter

```bash
npx create-nest-starter
```

Or run the CLI from this repo:

```bash
pnpm --filter create-nest-starter start
```

## Planned variants

- `fastify` — Fastify + REST + Redis-backed sessions
- `graphql` — Express + GraphQL + Redis-backed sessions

These will be added as overlays in `templates/` in a later milestone. Until then,
the historical branches (`fastify`, `graphql`) contain the reference
implementations they will be derived from.

## Manual alternative

You can clone the reference branches directly:

```bash
git clone -b fastify https://github.com/your-org/nestjs-starter.git
git clone -b graphql https://github.com/your-org/nestjs-starter.git
```

These are the source variants the templates are derived from; they are not the
primary distribution mechanism.

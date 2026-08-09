# NestForge Starter

<p align="center">
  <a href="https://www.npmjs.com/package/create-nestforge"><img src="https://img.shields.io/npm/v/create-nestforge?style=flat-square&logo=npm&color=780f20" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/create-nestforge"><img src="https://img.shields.io/npm/dm/create-nestforge?style=flat-square&label=downloads&color=780f20" alt="npm downloads"></a>
  <a href="https://github.com/mouloud240/NestForge"><img src="https://img.shields.io/github/stars/mouloud240/NestForge?style=flat-square&logo=github&color=780f20" alt="GitHub stars"></a>
  <a href="https://github.com/mouloud240/NestForge/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/create-nestforge?style=flat-square&label=license&color=780f20" alt="License"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D%2022-780f20?style=flat-square&logo=node.js&logoColor=white" alt="Node.js &gt;= 22"></a>
  <a href="https://github.com/mouloud240/NestForge"><img src="https://img.shields.io/badge/PRs-welcome-780f20?style=flat-square" alt="PRs welcome"></a>
</p>

`create-nestforge` scaffolds a production-ready NestJS backend from the command
line. Answer a couple of prompts and you get a working application you can build
on top of — Express + REST or Express + GraphQL (Apollo), Redis-backed sessions,
and no-op persistence so it boots before you've written a line.

## Usage

```bash
npx create-nestforge@latest
```

You will be asked for a project name and which variant to scaffold. The project
is created in the current directory, named after the project. The CLI copies
the template (layering the GraphQL overlay when selected), sets the package
name, and creates a `.env` from the example.

### Non-interactive

Pass the same options as flags for automation and CI:

```bash
npx create-nestforge@latest --project-name my-app --variant graphql
```

Available flags:

| Flag | Description |
| --- | --- |
| `--help` | Show help message and exit |
| `--version` | Print version and exit |
| `--project-name` | Project name (defaults to an interactive prompt) |
| `--oauth-providers` | Comma-separated provider list: `google,github` |
| `--variant` | `rest` or `graphql` (defaults to an interactive prompt, then `rest`) |
| `--target-dir` | Override where the project is created (defaults to `./<project-name>`) |
| `--git` | Initialize a git repository (default) |
| `--no-git` | Skip git initialization |

## Running the generated project

```bash
cd my-app
pnpm install
cp .env.example .env
pnpm start:dev
```

The app runs at `http://localhost:3000`, with interactive docs at
`http://localhost:3000/api-docs` (Scalar on top of the Swagger/OpenAPI document). Docker users can skip local setup entirely:

```bash
docker compose up --build
```

## What you get

- Express + REST with URI versioning (`/api/v1`), or Express + GraphQL with an
  Apollo code-first `/graphql` endpoint
- Auth-ready: Passport local + Google OAuth, Redis-backed sessions
- WebSocket gateway with gated, session-authenticated connections
- BullMQ background jobs, mailer with Handlebars templates
- Security baseline: Helmet, CSRF double-submit cookies, global rate limiting
- Swagger/Scalar docs, Terminus health checks, Winston logging
- Boots without a database (no-op persistence stub)

## Documentation

- [GitHub](https://github.com/mouloud240/NestForge) — source, docs, and the
  landing site

## License

MIT © Mouloud Hasrane

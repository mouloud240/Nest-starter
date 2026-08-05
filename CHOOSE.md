# 🧭 Choosing a Starter Variant

This project provides multiple long-lived branches so you can pick the starter shape that fits your project:

* `main` — **Express** + REST + Redis-backed sessions
* `fastify` — **Fastify** + REST + Redis-backed sessions
* `graphql` — **Express** + GraphQL + Redis-backed sessions
* `cli` *(planned)* — **CLI tool** that reuses the compiled core modules

---

## ⚖️ Comparison Overview

| Feature                | `main` (Express)          | `fastify` (Fastify)             | `graphql` (GraphQL)              |
| ---------------------- | ------------------------- | ------------------------------- | -------------------------------- |
| **Transport**          | Express HTTP              | Fastify HTTP                    | Express HTTP + GraphQL           |
| **API Style**          | REST                      | REST                            | GraphQL (code-first)             |
| **Session Store**      | Redis via express-session | Redis via @fastify/session       | Redis via express-session        |
| **Swagger UI**         | Scalar                    | Swagger UI                      | Scalar                           |
| **Performance**        | 🚶 Slower                 | 🏎️ Faster                       | 🚶 Same as Express               |
| **Maturity**           | ✅ Very stable             | 🚧 Stable core, smaller ecosystem | 🚧 GraphQL adds complexity        |
| **Learning Curve**     | 🟢 Low                    | 🟡 Slightly higher              | 🟡 Higher (GraphQL concepts)     |

---

## 🚀 `main` — Express + REST

Use this if:

* You want the widest compatibility with the NestJS ecosystem
* You prefer middleware-heavy libraries (helmet, csrf-csrf, express-session)
* You want the Scalar API documentation UI

---

## ⚡ `fastify` — Fastify + REST

Use this if:

* You are building a high-performance API
* You want native JSON schema validation support
* You are comfortable with a smaller plugin ecosystem

🛠️ Swagger is powered by **standard Swagger UI** (no Scalar support).

---

## 🌌 `graphql` — Express + GraphQL

Use this if:

* You want a single GraphQL endpoint instead of REST resources
* Your frontend is Apollo Client / Relay / urql
* You are comfortable with code-first GraphQL schema generation

---

## 📁 How to Switch

```bash
# Clone a specific variant
git clone -b fastify https://github.com/your-org/nestjs-starter.git
git clone -b graphql https://github.com/your-org/nestjs-starter.git

# Or switch inside the existing project
git fetch
git checkout fastify
# or
git checkout graphql
```

> All variants share the same core services, folder structure, and environment setup. Only the HTTP adapter, transport layer, and GraphQL resolvers differ.

---

## 📌 Recommendation

| Scenario                               | Recommended Branch |
| -------------------------------------- | ------------------ |
| Full-stack app, standard backend needs | `main`             |
| Microservices or blazing fast APIs     | `fastify`          |
| Maximum ecosystem support              | `main`             |
| Minimal resource usage/performance     | `fastify`          |
| Frontend-first GraphQL consumers       | `graphql`          |

---

Have feedback or suggestions? Feel free to open an issue!

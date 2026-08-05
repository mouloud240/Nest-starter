
# 🤝 Contributing to NestJS Starter

Thank you for considering contributing to the **NestJS Starter** project! We welcome all kinds of contributions – from fixing bugs and writing tests to suggesting features and improving documentation.

---

## 🧱 Project Philosophy

This project aims to:

* Encourage **clean, scalable architecture**.
* Provide a **batteries-included** starter for modern NestJS backends.
* Emphasize **security, documentation, and performance**.

---

## 🛠️ Local Development Setup

1. **Fork the repository**
2. Clone your fork:

   ```bash
   git clone https://github.com/mouloud240/NestForge.git
   cd nestjs-starter
   ```
3. Install dependencies:

   ```bash
   npm install
   ```
4. Create a `.env` file:

   ```bash
   cp .env.example .env
   ```
5. Run the development server:

   ```bash
   pnpm run start:dev
   ```

---

## 📁 Suggested Branching Strategy

* Use the `main` branch for production-ready code.
* Open pull requests to `dev` branch.

Branch naming convention:

```
pseudo-name/feature
kingSlayer/auth
```

---

## ✅ Contribution Guidelines

### 📄 Code Style & Standards

* Follow the NestJS + TypeScript style conventions.
* Lint before you push:

  ```bash
  pnpm run lint
  ```
* Write meaningful commit messages.
* Follow this commit-message Guide  [COMMIT.md](COMMIT.md) 

### 🧪 Testing

* Write unit tests for new features when applicable (usualy not applicable so don't worry to much about it).
* Run all tests before submitting:

  ```bash
  pnpm test
  ```

### 📚 Documentation

If you're adding new functionality, please update the relevant parts of the README or other docs.

---

## 🐛 Reporting Bugs

1. Create a [GitHub Issue](https://github.com/mouloud240/NestForge/issues)
2. Include the following:

   * Expected behavior
   * Actual behavior
   * Steps to reproduce
   * Screenshots/logs if available

---

## 🌟 Feature Requests

We’d love to hear your ideas! Feel free to open an issue or a discussion to describe a new feature or enhancement.

---

## 💬 Need Help?

Open a discussion on GitHub or reach out via issues if you're stuck or have questions.

---

## 📝 License

By contributing, you agree that your contributions will be licensed under the same license as the project: **MIT**.

---

Thanks again for being awesome! 🚀

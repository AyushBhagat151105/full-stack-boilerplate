---
# Full Stack Boilerplate

This is a **Turborepo-based monorepo** setup that includes a full-stack project with both web and mobile applications, along with shared packages. It provides a clean starting point for developing scalable applications using **Next.js**, **Expo (React Native)**, and **Convex backend APIs**.
---

## 📦 Project Structure

```
full-stack-boilerplate/
├── apps/
│   ├── next/        # Web frontend built with Next.js
│   └── mobile/      # Mobile app powered by Expo (React Native)
├── packages/
│   ├── api/         # Convex backend logic and database schemas
│   └── shared/      # Shared utilities, types, and logic
├── turbo.json       # Turborepo config
└── package.json


```

- **apps/**
  - `next/`: Your main web app built using Next.js.
  - `mobile/`: Your cross-platform mobile app using Expo + React Native.

- **packages/**
  - `api/`: Backend logic built using [Convex](https://convex.dev).
  - `shared/`: Shared utilities, constants, and type definitions used across web, mobile, and backend.

---

## 🚀 Getting Started

1. **Install dependencies**

   ```sh
   pnpm install
   ```

2. **Start development servers**

   ```sh
   pnpm dev
   ```

   > This runs both the web and mobile development servers (if configured in your root `dev` script).

---

## 🛠️ Useful Turborepo Commands

- `pnpm build` – Build all apps and packages
- `pnpm lint` – Run linter across all codebases
- `pnpm test` – Run all test suites
- `turbo run build` – Build apps and packages using caching and parallel execution
- `turbo run dev` – Run development servers (via scripts inside each app)

---

## 📚 Learn More

- [Turborepo Documentation](https://turbo.build/docs)
- [Monorepo Patterns](https://monorepo.tools/)
- [Convex Documentation](https://docs.convex.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [Next.js Documentation](https://nextjs.org/docs)

---

Let me know if you want to include additional sections like **Environment Setup**, **Deployment**, or **Contributing Guidelines**.

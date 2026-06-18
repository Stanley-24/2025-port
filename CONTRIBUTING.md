# Contributing to Stanley Owarieta's Portfolio

Thank you for your interest in contributing! This document explains how to report issues, suggest improvements, and submit code changes.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Who Can Contribute](#who-can-contribute)
- [How to Use This Project](#how-to-use-this-project)
- [Development Workflow](#development-workflow)
- [Reporting Issues](#reporting-issues)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Security Guidelines](#security-guidelines)
- [Branching Strategy](#branching-strategy)

---

## Code of Conduct

Be respectful, constructive, and professional in all interactions. Harassment or abusive behaviour of any kind will not be tolerated.

---

## Who Can Contribute

Contributions are welcome from anyone who wants to:

- Fix a bug or broken UI behaviour
- Improve performance or accessibility
- Add or improve test coverage for the backend
- Improve documentation
- Suggest improvements to the API design or data models

> **Note:** This is a personal portfolio. Major feature additions (new pages, new integrations) will be evaluated case-by-case and may be declined if they don't align with the project's purpose.

---

## How to Use This Project

If you want to adapt this project for your own portfolio:

1. Fork the repository on GitHub.
2. Follow the [Getting Started](README.md#getting-started) guide in the README.
3. Replace all personal content (bio, projects, testimonials, services) in `src/data/`.
4. Create your own accounts for Supabase, Resend, Flutterwave, and Cloudflare, then configure your own secrets.
5. Update `wrangler.toml` `[vars]` with your own non-sensitive values.
6. Deploy the frontend to Vercel and the backend to Cloudflare Workers.

**Please do not republish this portfolio as your own work.**

---

## Development Workflow

### 1. Fork and clone

```bash
git clone https://github.com/your-username/2025-port.git
cd 2025-port
```

### 2. Create a feature branch

Always branch off `main`. Use a descriptive name:

```bash
git checkout -b fix/contact-form-validation
git checkout -b feat/add-dark-mode-toggle
git checkout -b docs/improve-api-reference
```

### 3. Set up the project locally

Follow the full setup in [README.md](README.md#getting-started).

For backend local secrets, create `server/.dev.vars` (never commit this file):

```ini
SUPABASE_SERVICE_ROLE_KEY=your_value
RESEND_API_KEY=your_value
FLUTTERWAVE_PUBLIC_KEY=your_value
FLUTTERWAVE_SECRET_KEY=your_value
FLUTTERWAVE_ENCRYPTION_KEY=your_value
FLUTTERWAVE_WEBHOOK_SECRET=your_value
FLUTTERWAVE_SECRET_HASH=your_value
MEETING_LINK=your_value
```

### 4. Make your changes

- Keep changes focused on a single concern per branch.
- Write or update tests for any backend logic you change.
- Run linting and tests before committing.

```bash
# Frontend
npm run lint

# Backend
cd server
npm test
```

### 5. Commit your changes

Write clear, imperative commit messages:

```
fix: validate email field before contact form submission
feat: add skeleton loader to projects section
test: add unit tests for rateLimiter middleware
docs: update API reference for payment endpoints
```

Prefix types: `feat`, `fix`, `docs`, `test`, `refactor`, `style`, `chore`.

### 6. Push and open a Pull Request

```bash
git push origin your-branch-name
```

Open a Pull Request on GitHub against the `main` branch. Fill out the PR description template.

---

## Reporting Issues

Before opening an issue:

- Search existing issues to avoid duplicates.
- Check whether the issue still exists on the latest commit.

When filing a bug report, include:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behaviour
- Screenshots or error messages where relevant
- Browser/OS/Node version (for frontend or local dev issues)

**Do not include any API keys, secrets, or personal data in issue reports.**

---

## Submitting a Pull Request

A good PR:

- Has a clear title and description explaining *what* and *why*.
- Links to any related issue (`Closes #42`).
- Is focused — one concern per PR.
- Passes all existing tests and adds new ones where appropriate.
- Does not introduce linting errors.
- Does not commit any secrets, `.dev.vars`, or `.env` files.

PRs that introduce new dependencies will be reviewed carefully. Justify the addition in the description.

---

## Coding Standards

### Frontend (React / JSX)

- Functional components only.
- Keep components small and single-purpose.
- Use Tailwind CSS for styling — avoid inline styles.
- Use `prop-types` for prop validation on shared components.
- Follow the existing file naming convention: `PascalCase` for components, `camelCase` for hooks and utilities.

### Backend (TypeScript / Hono)

- All new logic must be typed — avoid `any`.
- Validate all incoming data with Zod before touching business logic.
- Keep controllers thin — move logic into services.
- Use the existing `Bindings` type for Cloudflare environment variables.
- Never `console.log` secrets or user PII.

---

## Testing

The backend has a Jest test suite in `server/src/test/`.

```bash
cd server
npm test             # Run all tests
npm run test:watch   # Watch mode during development
```

- Write unit tests for new service methods and middleware.
- Write integration tests for new routes where feasible.
- Aim to keep code coverage for new code above 80%.
- Mock external services (Supabase, Resend, Flutterwave) using the existing patterns in `server/src/test/mocks/`.

---

## Security Guidelines

> Violations of these rules will result in the PR being closed immediately.

1. **Never commit secrets.** No API keys, passwords, tokens, or private URLs in any file — including comments, test fixtures, or example files.
2. **Never log sensitive data.** Do not log request bodies containing user data, payment details, or credentials.
3. **Always validate external input.** Use Zod on every new POST/PUT endpoint.
4. **Use timing-safe comparisons** for any secret or signature verification (see `server/src/lib/timingSafe.ts`).
5. **Do not weaken CORS or security headers** without a documented reason.
6. **Do not add new environment variables** that bypass the `Bindings` type — add them to `bindings.ts` so they are type-checked.

If you discover a security vulnerability, please **do not open a public issue**. Contact the maintainer directly.

---

## Branching Strategy

| Branch | Purpose |
|---|---|
| `main` | Production-ready code, deployed automatically |
| `feat/*` | New features |
| `fix/*` | Bug fixes |
| `docs/*` | Documentation changes only |
| `test/*` | Test-only changes |
| `refactor/*` | Code cleanup with no behaviour change |

All branches are merged into `main` via Pull Request. Direct pushes to `main` are not allowed.

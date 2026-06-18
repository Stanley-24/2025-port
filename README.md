# Stanley Owarieta — Portfolio Website

A full-stack personal portfolio website built with React (frontend) and a Cloudflare Workers edge API (backend). It showcases projects, skills, services, and testimonials, and includes a fully working contact form and payment integration.

---

## Table of Contents

- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## Live Demo

> Frontend: deployed on **Cloudflare Pages**
> Backend API: deployed on **Cloudflare Workers**

---

## Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Styling | Tailwind CSS v4 |
| UI Components | Radix UI, shadcn/ui, Flowbite React |
| Animation | Motion (Framer Motion v12) |
| Routing | React Router DOM v6 |
| Icons | Lucide React, React Icons |
| SEO | React Helmet |
| Analytics | Cloudflare Web Analytics |

### Backend
| Layer | Technology |
|---|---|
| Runtime | Cloudflare Workers (edge) |
| Framework | Hono v4 |
| Database | Supabase (PostgreSQL) |
| Email | Resend + React Email |
| Payments | Flutterwave |
| Validation | Zod |
| Testing | Jest + ts-jest |
| Language | TypeScript |

---

## Project Structure

```
.
├── .github/
│   └── workflows/
│       └── supabase-keep-alive.yml   # Scheduled workflow to keep Supabase DB active
├── public/                           # Static assets served as-is
│   ├── avatars/                      # Testimonial avatar images (.webp)
│   ├── stan-pic.webp
│   ├── robots.txt
│   ├── sitemap.xml
├── src/                              # React frontend source
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── assets/                       # Project images, CV PDF
│   │   ├── nature-ent.webp
│   │   ├── photoPilot.webp
│   │   ├── product-mockup.webp
│   │   ├── rental-wave.webp
│   │   ├── salesFunnel.webp
│   │   ├── stan-abt.webp
│   │   ├── stan-pic.webp
│   │   └── stanley-owarieta-cv.pdf
│   ├── components/
│   │   ├── RouteScrollHandler.jsx
│   │   ├── AboutMe/
│   │   │   ├── AboutMe.jsx
│   │   │   ├── BackendSkillItem.jsx
│   │   │   └── BackendToolsItem.jsx
│   │   ├── Contact/
│   │   │   ├── Contact.jsx
│   │   │   └── contactUI.jsx
│   │   ├── Footer/
│   │   │   └── new-footer.jsx
│   │   ├── FormNotification/
│   │   │   └── FormNotification.jsx
│   │   ├── Header/
│   │   │   ├── HeaderLg.jsx
│   │   │   └── HeaderSm.jsx
│   │   ├── Hero/
│   │   │   └── Hero.jsx
│   │   ├── MyServices/
│   │   │   ├── MyServices.jsx
│   │   │   └── MyServicesCard.jsx
│   │   ├── Payment/
│   │   │   └── CheckoutModal.jsx
│   │   ├── ProjectModal/
│   │   │   └── ProjectModal.jsx
│   │   ├── Projects/
│   │   │   ├── Projects.jsx
│   │   │   └── ProjectCard.jsx
│   │   ├── ScrollToTop/
│   │   │   └── ScrollToTop.jsx
│   │   ├── SectionIntro/
│   │   │   └── SectionIntro.jsx
│   │   ├── ServicesPage/
│   │   │   ├── ServiceHero.jsx
│   │   │   ├── ServiceList.jsx
│   │   │   ├── DeliverySection.jsx
│   │   │   ├── PricingSection.jsx
│   │   │   └── PaymentSection.jsx
│   │   ├── Skills/
│   │   │   ├── Skills.jsx
│   │   │   └── SkillsCard.jsx
│   │   ├── Testimonials/
│   │   │   └── Testimonials.jsx
│   │   └── ui/                       # shadcn/ui primitives
│   │       ├── accordion.jsx
│   │       ├── avatar.jsx
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── dialog.jsx
│   │       ├── input.jsx
│   │       ├── label.jsx
│   │       └── textarea.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── Services.jsx
│   │   ├── PaymentResult.jsx
│   │   ├── PipelineLanding.jsx
│   │   └── NotFound.jsx
│   ├── hooks/
│   │   ├── useContactForm.js
│   │   └── usePayment.js
│   ├── data/
│   │   ├── projectsData.js
│   │   ├── skillsData.js
│   │   ├── servicesData.js
│   │   ├── servicePageData.js
│   │   ├── testimonialsData.js
│   │   ├── backendSkillsData.js
│   │   ├── backendtoolsData.js
│   │   └── closeModal.js
│   └── lib/
│       └── utils.js                  # Tailwind class merge helper
├── server/                           # Cloudflare Workers backend
│   ├── wrangler.toml                 # Workers config & non-sensitive [vars]
│   ├── jest.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   ├── .dev.vars                     # ⚠ Local secrets — never commit
│   └── src/
│       ├── index.ts                  # App entrypoint & route mounting
│       ├── configs/
│       │   ├── bindings.ts           # Cloudflare env bindings type
│       │   └── resend.ts             # Resend client config
│       ├── controllers/
│       │   ├── contactControllers.ts
│       │   └── paymentController.ts
│       ├── routes/
│       │   ├── contactRoute.ts
│       │   ├── paymentRoutes.ts
│       │   └── flutterwaveWebhook.ts
│       ├── services/
│       │   ├── contactService.ts
│       │   ├── emailService.ts
│       │   └── paymentService.ts
│       ├── middleware/
│       │   └── rateLimiter.ts
│       ├── lib/
│       │   ├── cors.ts
│       │   ├── errors.ts
│       │   ├── loggers.ts
│       │   ├── supabase.ts
│       │   ├── timingSafe.ts
│       │   └── validation.ts
│       ├── emails/
│       │   └── templates/
│       │       ├── ContactConfirmation.tsx
│       │       ├── ContactNotification.tsx
│       │       └── ImmediateThankYou.tsx
│       ├── types/
│       │   ├── contactMessages.ts
│       │   ├── payment.ts
│       │   └── flutterwave.d.ts
│       └── test/
│           ├── setup.ts
│           ├── setup-db.ts
│           ├── mongoMemory.ts
│           ├── contactService.test.ts
│           ├── cors.test.ts
│           ├── payment.test.ts
│           ├── paymentController.webhook.test.ts
│           ├── rateLimiter.test.ts
│           └── mocks/
│               ├── configMock.ts
│               ├── redisMock.ts
│               └── resendMock.ts
├── .gitignore
├── .env                              # ⚠ Local env overrides — never commit
├── index.html
├── vite.config.js
├── vercel.json                       # Security headers config
├── components.json                   # shadcn/ui config
├── jsconfig.json
├── eslint.config.js
└── package.json
```

---

## Features

- Responsive multi-page portfolio (Hero, About, Projects, Skills, Services, Testimonials, Contact)
- Animated UI with smooth scroll and section transitions
- Contact form with backend validation, rate limiting, and email delivery via Resend
- Payment integration via Flutterwave with webhook handling
- Supabase database for storing contact messages and payment records
- Edge-deployed API with global low-latency via Cloudflare Workers
- Security headers (HSTS, X-Frame-Options, nosniff, Referrer-Policy) on the frontend
- CORS restricted to the configured frontend origin
- Full test coverage for backend services and middleware

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A [Cloudflare account](https://dash.cloudflare.com/) (free tier works)
- A [Supabase](https://supabase.com/) project
- A [Resend](https://resend.com/) account and verified sending domain
- A [Flutterwave](https://flutterwave.com/) account

---

### Frontend Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-username/2025-port.git
cd 2025-port

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app runs at `http://localhost:5173` by default.

---

### Backend Setup

```bash
cd server

# 1. Install dependencies
npm install

# 2. Authenticate with Cloudflare (one-time)
npx wrangler login

# 3. Add all required secrets (see Environment Variables section below)
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put FLUTTERWAVE_PUBLIC_KEY
npx wrangler secret put FLUTTERWAVE_SECRET_KEY
npx wrangler secret put FLUTTERWAVE_ENCRYPTION_KEY
npx wrangler secret put FLUTTERWAVE_WEBHOOK_SECRET
npx wrangler secret put FLUTTERWAVE_SECRET_HASH
npx wrangler secret put MEETING_LINK

# 4. Start the local dev server
npm run dev
```

The API runs at `http://localhost:8787` by default.

---

## Environment Variables

> **Never commit secrets to source control.** All sensitive values must be stored as Cloudflare Workers Secrets and never placed in `wrangler.toml` or any file tracked by Git.

### Non-sensitive vars (safe in `wrangler.toml` under `[vars]`)

| Variable | Description |
|---|---|
| `FRONTEND_URL` | The deployed frontend URL (used for CORS) |
| `SUPABASE_URL` | Your Supabase project URL |
| `AdminEmail` | Email address to receive contact notifications |
| `SenderEmail` | Verified sender email address via Resend |
| `PaymentLogo` | URL to the logo shown on the payment page |

### Secrets (set via `wrangler secret put` — never stored in files)

| Secret | Description |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (backend auth only) |
| `RESEND_API_KEY` | Resend API key for transactional email |
| `FLUTTERWAVE_PUBLIC_KEY` | Flutterwave public key |
| `FLUTTERWAVE_SECRET_KEY` | Flutterwave secret key |
| `FLUTTERWAVE_ENCRYPTION_KEY` | Flutterwave encryption key |
| `FLUTTERWAVE_WEBHOOK_SECRET` | Shared webhook secret for signature verification |
| `FLUTTERWAVE_SECRET_HASH` | Hash used to authenticate Flutterwave webhook payloads |
| `MEETING_LINK` | Private booking/meeting link |

#### Local development secrets

For local `wrangler dev`, create a `.dev.vars` file in `/server` (this file must never be committed):

```ini
# server/.dev.vars  — DO NOT COMMIT THIS FILE
SUPABASE_SERVICE_ROLE_KEY=your_value_here
RESEND_API_KEY=your_value_here
FLUTTERWAVE_PUBLIC_KEY=your_value_here
FLUTTERWAVE_SECRET_KEY=your_value_here
FLUTTERWAVE_ENCRYPTION_KEY=your_value_here
FLUTTERWAVE_WEBHOOK_SECRET=your_value_here
FLUTTERWAVE_SECRET_HASH=your_value_here
MEETING_LINK=your_value_here
```

Make sure `.dev.vars` is listed in `.gitignore`.

---

## Available Scripts

### Frontend (`/`)

| Script | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

### Backend (`/server`)

| Script | Description |
|---|---|
| `npm run dev` | Start local Cloudflare Workers dev server |
| `npm run build` | Dry-run deploy (validates the build) |
| `npm run deploy` | Deploy to Cloudflare Workers |
| `npm test` | Run Jest test suite |
| `npm run test:watch` | Run Jest in watch mode |

---

## API Reference

All API endpoints are prefixed with `/api/v1`.

### Health

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/` | Basic health check |
| `GET` | `/healthz` | JSON health check |

### Contact

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/contact` | Submit a contact form message |

### Payment

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/payment/initialize` | Initialize a Flutterwave payment |
| `GET` | `/api/v1/payment/verify` | Verify payment status after redirect |

### Webhooks

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/webhooks/flutterwave` | Flutterwave payment webhook receiver |

---

## Deployment

### Frontend → Cloudflare Pages

1. Connect your GitHub repository to [Cloudflare Pages](https://pages.cloudflare.com/).
2. Set the **build command** to `npm run build` and the **output directory** to `dist`.
3. Cloudflare Pages will auto-deploy on every push to `main`.
4. SPA routing is handled via a `_redirects` file or the Pages routing config. Security headers can be set in the Cloudflare dashboard or via `_headers`.

### Backend → Cloudflare Workers

```bash
cd server
npm run deploy
```

Ensure all secrets have been added with `wrangler secret put` before deploying. The `wrangler.toml` [vars] section is safe for non-sensitive configuration.

---

## Security

- **No secrets in source code** — all sensitive credentials are stored exclusively as Cloudflare Workers Secrets, never in `wrangler.toml`, `.env`, or any Git-tracked file.
- **CORS** — the API only accepts requests from the configured `FRONTEND_URL`.
- **Rate limiting** — contact and payment endpoints are rate-limited via middleware.
- **Input validation** — all request bodies are validated with Zod schemas before processing.
- **Webhook signature verification** — Flutterwave webhooks are authenticated using `FLUTTERWAVE_SECRET_HASH` via timing-safe comparison.
- **Security headers** — the frontend enforces `Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy`.
- **Service role key isolation** — `SUPABASE_SERVICE_ROLE_KEY` is only used server-side and is never exposed to the frontend.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

---

## License

This is a personal portfolio project. You are welcome to use it as inspiration or reference, but please do not republish it as your own work.
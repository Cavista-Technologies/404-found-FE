# CT-Recruita

CT-Recruita is a recruitment management platform frontend. It lets **Admins** and **Recruiters** open, activate, and manage job roles, build custom application forms for each role, and track candidates through the hiring pipeline — while **Candidates** apply through a public, no-login application form.

> 📘 **Looking for usage instructions instead of setup steps?** See [`manual.md`](./manual.md) for a walkthrough of how to actually use the application (creating roles, building forms, reviewing applicants, etc.).

## Tech Stack

- **React 19** + **TypeScript** — UI and app logic
- **Vite** — dev server and build tooling
- **React Router v7** — routing, including role-protected routes
- **Redux Toolkit** — auth/session and active-role state
- **TanStack Query** — server-state fetching, caching, and mutations
- **React Hook Form** + **Zod** — form state and schema validation
- **Tailwind CSS v4** + **Radix UI / base-ui** + `shadcn` — styling and accessible UI primitives
- **Tiptap** — rich text editing (role descriptions, form intros)
- **Axios** — HTTP client with a shared envelope/error-handling layer
- **Recharts** — analytics/dashboard charts
- **pnpm** — package manager (see `pnpm-lock.yaml`)

## Prerequisites

- Node.js 20+ (recommended)
- [pnpm](https://pnpm.io/) installed globally (`npm install -g pnpm`)

## Getting Started

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Configure environment variables**

   Create a `.env` file in the project root:

   ```bash
   VITE_API_BASE_URL=https://your-api-base-url.com
   ```

   If `VITE_API_BASE_URL` is not set, the app falls back to a default development API URL baked into `src/services/httpClient.ts`.

3. **Run the dev server**

   ```bash
   pnpm dev
   ```

   The app will be available at `http://localhost:5173` by default.

## Available Scripts

| Command        | Description                                        |
| -------------- | --------------------------------------------------- |
| `pnpm dev`     | Start the Vite dev server with HMR                   |
| `pnpm build`   | Type-check (`tsc -b`) and build for production        |
| `pnpm lint`    | Run ESLint across the project                        |
| `pnpm preview` | Preview the production build locally                  |

## Project Structure

```
src/
├── assets/            Static images/icons
├── components/
│   ├── auth/           Route guards (ProtectedRoute)
│   ├── cards/          Reusable card components
│   ├── charts/         Analytics chart components
│   ├── date-picker/    Date picker component
│   ├── forms/          Shared form building blocks
│   ├── GenericComponents/  Reusable inputs (dropdowns, rich text editor, etc.)
│   ├── icons/           SVG icon components
│   ├── layouts/         Authenticated app shell/layout
│   ├── toast/            Toast notification system
│   └── ui/                Base UI primitives (shadcn-style)
├── config/              App-level config (e.g. role-based menu config)
├── constants/           Shared constants (field types, helpers)
├── context/              React context providers (e.g. toast)
├── hooks/                Custom hooks (auth, application form)
├── lib/                   Utilities (JWT decoding, storage, redirect resolution)
├── pages/
│   ├── AdminPages/        Admin dashboard, role management, form builder, analytics
│   ├── AuthPages/          Login, forgot password, check email
│   ├── ProtectedPages/     Shared authenticated pages
│   ├── PublicPages/        Public candidate application form
│   └── RecruiterPages/     Recruiter dashboard, role management
├── schemas/               Zod schemas for forms and dynamic application form validation
├── services/               API service modules (auth, roles, application forms, lookups)
├── store/                   Redux store and slices (auth, active role)
├── types/                   Shared TypeScript types
├── App.tsx                   Route definitions
└── main.tsx                  App entry point
```

## Core Features

- **Authentication** — login, forgot password, and token refresh flow, with sessions persisted via `localStorage`/`sessionStorage`.
- **Role-based access** — Admin (`SuperAdmin`) and Recruiter routes are separated and access-guarded via `ProtectedRoute`.
- **Role management** — create, edit, and activate job roles, with a live "activation readiness" checklist.
- **Application Form Builder** — attach a dynamic, drag-and-reorder application form (standard + custom fields) to a role, save as a draft, or publish it.
- **Public candidate application** — a no-login public form (`/job/:slug`) built dynamically from the published form's field definitions, submitted as `multipart/form-data` to support file uploads (e.g. resumes).
- **Admin dashboard & analytics** — role pipeline, applicant tracking, and hiring analytics via Recharts.

## Notes

- The HTTP client (`src/services/httpClient.ts`) wraps all API responses in a shared envelope (`{ isError, data, message, statusCode }`) and normalizes errors so services and mutations can consume/throw a consistent shape.
- Auth tokens are stored under the `ctr-atk` key in `localStorage`/`sessionStorage`; the active role is persisted under `activeRole`.
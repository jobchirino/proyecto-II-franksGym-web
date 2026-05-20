# AGENTS.md

- Use `npm` in this repo; the lockfile is `package-lock.json`.
- `npm install` runs `prisma generate` via `postinstall`.
- Dev and production builds both use Turbopack: `npm run dev`, `npm run build`.
- Prisma schema lives in `prisma/schema.prisma`; the generated client output is `src/generated/prisma`, and that directory is gitignored. After schema changes, run `npx prisma generate`, and use `npx prisma migrate dev --name <name>` when the database shape changes.
- Required env vars verified from code/config: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NEXT_PUBLIC_API_URL`, `RESEND_API_KEY`. `NEXT_PUBLIC_API_URL` must be the app base URL because NextAuth credentials calls `/api/auth/signIn` through it and forgot-password emails build links from it.
- This is a single Next.js App Router app. Main authenticated UI lives in `src/app/(main)`, auth screens in `src/app/auth`, and route handlers in `src/app/api`.
- `src/proxy.js` is the auth gate in Next 16. When adding or moving pages/endpoints, update both `config.matcher` and the `authRoutes` allowlist or you can accidentally expose or block routes.
- Data access is split: many server components query Prisma directly (`src/app/(main)/page.jsx`, `manage/page.jsx`, detail pages), while client components use `axios` against `/api/*` and usually submit `FormData`. Keep both sides in sync before changing payloads.
- Admin behavior is built around `isFirst`: `/auth` uses `/api/users/is-first` to decide between registration and sign-in, NextAuth copies `isFirst` into JWT/session, `src/proxy.js` blocks `/manage` unless `token.isFirst`, and the nav hides manage links unless `session.user.isFirst`.
- `/api/athletes` GET has two response shapes: `?search=` returns a single athlete object or `404`, while paginated requests return `{ athletes, hasMore }` with a fixed page size of `5`. `src/app/(main)/athlete/page.jsx` and `src/app/(main)/athlete/logic.js` depend on that contract.
- Validation lives in `src/schemas/*.js`; API routes translate Zod issues through `src/utils/customErros.js` into arrays of `{ Campo: [mensajes...] }`. Preserve that shape unless you also update the form/modal consumers.
- Styling is Tailwind CSS 4 via `@import "tailwindcss"` in `src/app/globals.css`; there is no `tailwind.config.*`. The custom `desktop` breakpoint is defined in `globals.css` with `@theme inline`.
- There is no test suite, typecheck script, or CI workflow in the repo. Focus verification on the exact page or route you changed, usually by running `npm run dev` and exercising the Prisma-backed flow manually.
- Verified command quirks:
  - `npm run lint` currently crashes inside `@eslint/eslintrc` / `eslint-config-next` before linting files.
  - `npm run build` can fail in network-restricted environments because `next/font/google` fetches `Roboto Mono`, `Trade Winds`, and `Train One` at build time.

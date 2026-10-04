# Vercel Web Analytics and Speed Insights

## Project architecture and mounting

This site is a Vite + React single-page application, not a Next.js app (there is no App Router or Pages Router). Keep the official React adapters:

- `@vercel/analytics/react`
- `@vercel/speed-insights/react`

Both packages are declared in `package.json` and locked in `package-lock.json`. Their components are mounted once in the root `App` component in `src/App.tsx`, alongside the site and inside the existing language provider. Do not add another instance to individual sections or pages, and do not switch to the Next.js entry points.

The official React adapters return no visible UI and append their scripts with `defer`; they do not gate rendering on an environment variable. The Vercel production endpoints are `/_vercel/insights/script.js` and `/_vercel/speed-insights/script.js`.

`vercel.json` rewrites application paths to the SPA entry point while excluding `/_vercel/` paths. A single global integration therefore covers direct visits to `/uz`, `/ru`, and nested URLs. The current language picker changes React state and local storage rather than changing the URL; introducing a router later should preserve the single global mounts and use the relevant official route integration if route templates need to be reported separately.

## Vercel project dashboard

For the Vercel project serving this app:

1. Open **Web Analytics** in the project dashboard and enable it if it is not already enabled.
2. Open **Speed Insights** and enable it if it is not already enabled.
3. Deploy the production branch after enabling either feature so Vercel can provision its project endpoints.
4. Visit the production site and check the browser Network panel for the two script requests above. Allow time for visits and Web Vitals to appear in their respective dashboard sections.

No extra tracking vendor, custom tracker, API key, environment variable, or hand-written script tag is required. The production build and type-check commands are:

```sh
npm ci
npm run build
npx tsc --noEmit
```

## Quick summary

This is a small React + Vite app (local parts catalog) used to browse "ricambi" (spare parts). The UI is single-page, routes are declared in `src/App.jsx`, and the app reads static product data from `src/impianti.json` and static images from the `public/` folder.

Top-level commands
- Start dev server: `npm run dev` (Vite, HMR)
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Run linter: `npm run lint`

Architecture & important files
- `src/main.jsx` — React entry, wraps `<App/>` in `BrowserRouter`.
- `src/App.jsx` — central route map (see the `<Routes>` block). Route params (e.g. `:opzioni`) drive page content.
- `src/pages/*` — page components. Each page is a small React component (JSX). Example: `src/pages/Ricambi.jsx` uses `useParams()` and reads `dati` from `src/impianti.json`.
- `src/impianti.json` — canonical static data source for spare parts and device models. Prefer editing this for content changes instead of hardcoding in components.
- `public/` — static images referenced by pages (for example `/dettCTM.png` used in `Ricambi.jsx`).

Patterns and conventions for AI edits
- Routing-driven pages: Components read route params (useParams) and then select the relevant data slice from `dati` (example: `const ricambiModello = dati.ricambi[opzioni];`).
- State lifting: The shopping cart ("carrello") state lives in `App.jsx` and is passed down to `Ricambi` and `Carrello` as props (`carrello`, `setCarrello`). When adding features that touch cart state, update only `App.jsx` and pass props — avoid recreating local cart state in page components.
- Data access: Prefer importing `src/impianti.json` in pages or making a thin data helper (if refactoring). Do not call external APIs — the app is currently static-data-driven.
- File naming: many identifiers and comments are Italian (e.g., `ricambi`, `carrello`, `inviaEmail`). When adding UI labels or new variables follow the existing language choice in the same file.

Examples from this repo (copy/paste-safe)
- Route wiring (from `src/App.jsx`):
  - `/ricambi/:opzioni` -> `<Ricambi carrello={carrello} setCarrello={setCarrello} />`
- Reading spare parts in `src/pages/Ricambi.jsx`:
  - `import dati from "../impianti.json"`
  - `const ricambiModello = dati.ricambi[opzioni];`

Editing UI and behavior notes
- Keep prop drilling minimal: extend `App.jsx` if the new feature needs global UI state (e.g., cart count in header), or consider a small context provider if state sharing grows.
- Images referenced with leading slash are served from `public/`. Use those paths (e.g. `/dettCTM.png`) rather than importing from `src/assets` unless you add them to the build.

Linting and quality gates
- The project includes ESLint scripts; run `npm run lint` after modifying JS/JSX. There is no test harness in the repo — prefer manual run/visual check with `npm run dev`.

When to ask for clarification
- If a change requires new data structure in `src/impianti.json`, confirm the new schema shape before editing pages.
- If adding persistent storage (localStorage, server), ask which pattern to follow — current code stores cart only in memory.

Helpful paths to inspect
- `src/App.jsx` — routing and cart state
- `src/pages/Ricambi.jsx` — example of data-driven UI + cart mutation helpers
- `src/impianti.json` — all product/catalog data
- `public/` — static images referenced at runtime

If you update behavior or data shape, leave a short comment in the touched files describing the reason and the new shape so future agents/humans can follow the change.

---
If something in these notes is unclear or you want more examples (for instance, a suggested small context-provider for cart state), tell me which area to expand and I'll update this file.

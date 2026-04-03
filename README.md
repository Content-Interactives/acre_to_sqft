# Acre to Square Feet

React + Vite unit converter between acres and square feet (fixed conversion factor; see `AcreToSqft.jsx`). Bi-directional or single-direction UI depends on component state.

**Live site:** [https://content-interactives.github.io/acre_to_sqft](https://content-interactives.github.io/acre_to_sqft)

Curriculum alignment and placement: [Standards.md](Standards.md).

---

## Stack

| Layer | Notes |
|--------|--------|
| Build | Vite 6, `@vitejs/plugin-react` |
| UI | React 19 |
| Styling | Tailwind 3 |
| Icons | lucide-react |
| Deploy | `gh-pages -d dist`; `predeploy` runs `vite build` |

---

## Layout

```
vite.config.js          # base: '/acre_to_sqft/'
src/
  main.jsx → App.jsx → components/AcreToSqft.jsx
  components/ui/
```

---

## `vite.config.js`

`base: '/acre_to_sqft/'` must match the GitHub Pages repository path.

---

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
| `npm run deploy` | Build and push `dist/` to `gh-pages` |

---

## Embedding

Compact form layout; see `AcreToSqft.jsx` for input controls and min height.

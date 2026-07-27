<div align="center">

# 🛍️ Nuvara

**A responsive, production-grade e-commerce storefront built with React 19, Redux Toolkit, and Vite.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5-7952B3?logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass&logoColor=white)](https://sass-lang.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](#-license)

</div>

---

## 📖 Overview

**Nuvara** is a fully responsive e-commerce frontend that fetches a live product
catalog from a REST API and lets users browse, filter by category, manage a
wishlist, build a cart, and complete a simulated checkout. State is managed with
Redux Toolkit, styling is authored in Sass on top of Bootstrap 5, and the whole
app is bundled and served by Vite with route-level code splitting.

> **Live Demo:** _nuvara-store.vercel.app_ · **Case Study:** _https://www.behance.net/gallery/249175953/NUVARA-Luxury-Ecommerce-Website_

---

## ✨ Features

| | Feature | Description |
| --- | --- | --- |
| 🏠 | **Product catalog** | Live products fetched from a configurable REST API |
| 🔎 | **Category filtering** | Filter the catalog by dynamically-derived categories |
| ❤️ | **Wishlist** | Add/remove favourites, persisted in the Redux store |
| 🛒 | **Cart** | Quantity-aware cart with subtotal/total calculation |
| 💳 | **Checkout** | Billing form + order summary (simulated) |
| ⏳ | **Flash-sale countdown** | Live countdown timers |
| 📱 | **Responsive** | Mobile-first layout from 320px up to 1920px |
| 🔔 | **Toasts** | Non-blocking feedback via react-toastify |
| ⚡ | **Code-split routes** | Each page ships in its own lazy-loaded chunk |

---

## 🧰 Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | React 19 + React Router DOM 7 |
| **State** | Redux Toolkit (slices + async thunks) |
| **Styling** | Bootstrap 5 + Sass (modular `@use` partials) |
| **HTTP** | Axios |
| **UI/Icons** | react-icons · Font Awesome · Swiper (carousels) |
| **Notifications** | react-toastify |
| **Tooling** | Vite 8 · ESLint 9 (flat config) |
| **Hosting** | Vercel / GitHub Pages |

---

## 🏗️ Architecture

```
UI (Pages + components)
        │  dispatch
        ▼
Redux Api/ (thunk action creators)  ──►  react-toastify feedback
        │  dispatch
        ▼
Redux Slices/ (cart · products · wishList)  ──►  configureStore
        │  useSelector
        ▼
UI re-renders
```

- **Pages** are route-level views, lazy-loaded in `utils/Routing.jsx`.
- **components** are presentational/reusable units (`MainProduct`, `Button`, `Title`, …).
- **Redux/Slices** own state and reducers; **Redux/Api** wraps dispatch with
  side effects (toasts) so components stay declarative.
- **utils** holds cross-cutting helpers: the router, layout shell, the
  `usePageMeta` SEO hook, and the `activate` accessibility helper.

---

## 📂 Folder Structure

```
nuvara/
├── public/                 # static assets served at root
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── Assets/             # optimized .webp imagery
│   ├── Pages/              # route views (Home, Products, Cart, …)
│   ├── Redux/
│   │   ├── Api/            # thunk action creators (cart, wishlist)
│   │   ├── Slices/         # cart / product / wishlist slices
│   │   └── store.js
│   ├── Sass/               # style.scss entry + _partials
│   ├── components/         # reusable UI components
│   ├── utils/              # Routing, Layout, usePageMeta, interactive
│   ├── App.jsx
│   └── main.jsx
├── eslint.config.js
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
git clone <your-repo-url>
cd "Ecommerce Website - Nuvara"
npm install
```

### Environment

Copy the example env file and adjust if needed:

```bash
cp .env.example .env
```

```dotenv
# Product catalog API endpoint (any FakeStore-shaped REST endpoint).
# If unset, the app falls back to https://fakestoreapi.com/products
VITE_API_URL=https://fakestoreapi.com/products
```

### Development

```bash
npm run dev      # start Vite dev server
```

### Build & Preview

```bash
npm run build    # production build to /dist
npm run preview  # preview the production build locally
```

### Lint

```bash
npm run lint     # ESLint (flat config), zero-warning policy
```

---

## ☁️ Deployment

<details>
<summary><strong>Vercel</strong></summary>

The included `vercel.json` rewrites all paths to `/` so client-side routing
works on refresh. Import the repo in Vercel, set `VITE_API_URL` in project
environment variables, and deploy.
</details>

<details>
<summary><strong>GitHub Pages</strong></summary>

```bash
npm run deploy   # builds and publishes /dist via gh-pages
```

`vite.config.js` uses `base: "./"` so assets resolve correctly on Pages.
</details>

---

## 🎨 Customization Guide

| Want to change… | Edit |
| --- | --- |
| Brand colors / typography | `src/Sass/_variables.scss`, `src/Sass/_global.scss` |
| Product data source | `VITE_API_URL` in `.env` |
| Navigation / routes | `src/utils/Routing.jsx` |
| Page `<title>` / meta | the `usePageMeta({ title, description })` call in each page |
| Homepage sections | `src/Pages/Home.jsx` |

---

## 🔍 SEO

- Per-route `document.title` + meta description via the `usePageMeta` hook.
- Open Graph + Twitter Card tags and a `canonical` URL in `index.html`.
- `robots.txt` and `sitemap.xml` served from `public/`.
- Semantic landmarks and descriptive `alt` text on imagery.

> Add an `og-image.jpg` (1200×630) to `public/` to complete social previews.

---

## ⚡ Performance

- **Route-level code splitting** — every page is a lazy `import()` chunk, so the
  initial load only ships what the landing route needs.
- **Single source fetch** — the shared product list is fetched once and reused
  across sections instead of refetching per component.
- **WebP imagery** and **font preconnect** to reduce transfer size and latency.
- **Vite build** with tree-shaking and hashed, cacheable asset filenames.

---

## ♿ Accessibility

- Interactive controls built on non-semantic elements are made keyboard-operable
  and screen-reader-friendly via the shared `activate()` helper
  (`role="button"`, `tabIndex`, Enter/Space activation, `aria-label`).
- Form fields carry associated `<label>`s or `aria-label`s.
- Descriptive `alt` text on product and content imagery.

---

## 🔒 Security

- No secrets in the bundle — the API endpoint is injected via `VITE_*` env vars.
- No `dangerouslySetInnerHTML`; all rendered content is escaped by React.
- Failed API calls degrade gracefully to an error state (no unhandled crashes).

---

## 🤝 Contributing

1. Fork the repo and create a feature branch: `git checkout -b feature/my-change`
2. Keep `npm run lint` green (zero warnings).
3. Commit with a clear message and open a pull request.

---

## 📄 License

Released under the **MIT License**.

---

## 🙌 Credits

- Product data: [FakeStore API](https://fakestoreapi.com/)
- Icons: [react-icons](https://react-icons.github.io/react-icons/) · [Font Awesome](https://fontawesome.com/)
- Carousels: [Swiper](https://swiperjs.com/)

---

## 📬 Contact

**Hi Webinator** — for questions, feedback, or collaboration, open an issue on this repository.

# Interactive Recipe Book

An interactive recipe book web app built with React + Vite. Browse, search, and filter recipes by category or key ingredient, mark favorites, and add your own recipes — all with a smooth, animated UI.

Live site: [recipe.chipbong.me](https://recipe.chipbong.me)

## Features

- **Browse recipes** — view a curated list of seed recipes with images, descriptions, and prep time.
- **Search & filter** — search by title, filter by category, and filter by key ingredient (scoped to the selected category).
- **Favorites** — mark recipes as favorites and toggle a favorites-only view. Persisted in `localStorage`.
- **Add your own recipes** — user-added recipes are saved locally and merged with the seed data.
- **Recipe details** — dedicated page per recipe (`/recipes/:id`).
- **Smooth UX** — animated transitions with Framer Motion and smooth scrolling with Lenis.

## Tech Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) for client-side routing
- [Tailwind CSS 4](https://tailwindcss.com/) for styling
- [Framer Motion](https://motion.dev/) for animations
- [Lenis](https://lenis.darkroom.engineering/) for smooth scrolling
- React Context (`RecipeContext`) for recipe data, filters, and favorites

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (Node 24 is used in CI)
- npm (comes bundled with Node.js)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Chipboong/Interactive-Recipe-Book.git
   cd Interactive-Recipe-Book
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   ```

   Vite will print a local URL (usually `http://localhost:5173`). Open it in your browser to see the app. The dev server supports hot module reloading (HMR).

## Available Scripts

| Command           | Description                                        |
| ------------------ | --------------------------------------------------- |
| `npm run dev`      | Start the Vite development server with HMR         |
| `npm run build`     | Build an optimized production bundle into `dist/`  |
| `npm run preview`   | Locally preview the production build                |
| `npm run lint`      | Run ESLint over the project                          |

## Project Structure

```
Interactive-Recipe-Book/
├── public/                  # Static assets served as-is
├── src/
│   ├── assets/               # Images used throughout the app (e.g. recipe photos)
│   ├── components/           # Reusable UI components (NavBar, Footer, Card, Button, ...)
│   ├── context/              # RecipeContext: recipe data, filters, favorites, add-recipe logic
│   ├── data/                 # Seed recipe data (recipes.js)
│   ├── routes/                # Page components (Home, Recipes, RecipeDetail, About, AddRecipe, NotFound)
│   ├── App.jsx                # Root layout (NavBar/Footer + routed content)
│   ├── main.jsx                # App entry point
│   └── router.js               # React Router route definitions
├── vite.config.js            # Vite configuration (React, Tailwind, React Compiler, path alias @ -> src)
└── package.json
```

### Path Alias

The `@` alias points to `src/`, so imports can be written like:

```js
import RecipeCard from "@/components/Card.jsx";
```

## Data & Persistence

- Seed recipes live in `src/data/recipes.js`.
- Recipes added via the **Add Recipe** page are stored under the `platemate_recipes` key in `localStorage` and merged with the seed recipes at runtime.
- Favorited recipe IDs are stored under the `platemate_favorites` key in `localStorage`.

Because this data lives in the browser's `localStorage`, it is per-browser/device and will be lost if the browser storage is cleared.

## Deployment

This project is configured to deploy automatically to **GitHub Pages** via the workflow in `.github/workflows/deploy.yml`. Every push to the `main` branch triggers a build (`npm run build`) and deploys the contents of `dist/` to GitHub Pages.

The custom domain used for the deployed site is defined in the `CNAME` file (`recipe.chipbong.me`).

To deploy your own fork:

1. Update or remove the `CNAME` file to match your own domain (or delete it to use the default GitHub Pages URL).
2. Enable GitHub Pages for the repository, using the **GitHub Actions** source.
3. Push to `main` — the workflow will build and publish the site automatically.

## Linting

This project uses ESLint (see `eslint.config.js`) with React Hooks and React Refresh rules. Run:

```bash
npm run lint
```

to check for lint errors before committing.

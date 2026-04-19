# Keeth House — Experience Natural Living

Keeth House is an organically built eco-stay situated near the beautiful town of Auroville. This project is the marketing site showcasing the unique accommodations and eco-friendly lifestyle offered by Keeth House.

**Live:** https://keethhouse-dev.github.io

## Features

- **Interactive UI** — smooth animations and responsive design.
- **Dynamic content** — information about different phases, houses, and amenities, driven by a single static data file.
- **Booking integration** — deep links into the bookings portal.
- **Sustainability focus** — highlights eco-friendly practices and natural living.

## Tech stack

- **Framework:** Next.js 15 (App Router) with static export (`output: 'export'`)
- **Language:** TypeScript, React 19
- **Styling:** Tailwind CSS, Framer Motion
- **UI primitives:** Radix UI, Lucide icons
- **Hosting:** GitHub Pages (user site at `keethhouse-dev.github.io`)
- **CI/CD:** GitHub Actions

## Getting started

### Prerequisites

- Node.js ≥ 20
- yarn

### Install & run

```bash
git clone https://github.com/keethhouse-dev/keethhouse-dev.github.io.git
cd keethhouse-dev.github.io
yarn install
yarn dev
```

Open http://localhost:3000.

### Build locally

```bash
yarn build
```

Emits a fully static `out/` directory. You can preview it with any static file server (e.g. `npx serve out`).

## Project structure

```
app/          Pages and layouts (App Router)
components/   Reusable UI (Header, Footer, sections, shadcn/ui primitives)
lib/          House data (lib/house-data.ts) and utilities
public/       Static assets (images, favicon, .nojekyll)
styles/       Global CSS
.github/workflows/deploy.yml   CI/CD pipeline
```

## Deployment

Every push to `main` automatically builds and publishes the site to GitHub Pages via `.github/workflows/deploy.yml`. No manual steps.

```bash
git add .
git commit -m "your message"
git push origin main
```

Build + deploy takes ~2–4 min on a cold cache, ~1–2 min after. Watch progress in the **Actions** tab:
https://github.com/keethhouse-dev/keethhouse-dev.github.io/actions

### Manual redeploy

**Actions → Deploy to GitHub Pages → Run workflow → main.** Use when you need to re-publish without a new commit.

### Rollback

```bash
git revert <bad-commit-sha>
git push origin main
```

The workflow runs and restores the previous state.

### One-time GitHub settings

Enable at https://github.com/keethhouse-dev/keethhouse-dev.github.io/settings:

- **Pages → Source** → `GitHub Actions`
- **Actions → General → Workflow permissions** → `Read and write permissions`

### Troubleshooting

- **Build failed:** check the Actions log. The most common cause is adding a new dynamic route (`app/.../[param]/page.tsx`) without a `generateStaticParams` export — every dynamic segment must enumerate its values at build time.
- **Changes not showing:** hard refresh (Ctrl+Shift+R), and confirm the latest workflow run is green.
- **Assets 404:** if the repo is ever renamed away from `keethhouse-dev.github.io`, the site becomes a project site served at `/<repo>/`. In that case, add `basePath: '/<repo>'` and `assetPrefix: '/<repo>/'` to `next.config.mjs`.

## Contributing

Contributions are welcome. Please fork the repository and open a pull request.

## License

MIT — see `LICENSE`.

## Contact

[reservations@keethhouse.com](mailto:reservations@keethhouse.com)

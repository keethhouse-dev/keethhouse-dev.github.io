# Deployment

This site is deployed to **GitHub Pages** as a fully static Next.js export. Every push to `main` triggers an automatic build and deploy via GitHub Actions.

**Live URL:** https://keethhouse-dev.github.io/keethhouse-ui/

---

## How it works

- Next.js is configured with `output: 'export'` in `next.config.mjs`, so `next build` emits a fully static `out/` directory — no Node server needed.
- `.github/workflows/deploy.yml` runs on every push to `main` and on manual dispatch. It installs deps (yarn), builds the site, adds `.nojekyll`, and uploads `out/` as the Pages artifact.
- GitHub Pages serves the artifact at the URL above.

Because the site is hosted under a repo subpath, `basePath: '/keethhouse-ui'` and `assetPrefix: '/keethhouse-ui/'` are set in `next.config.mjs` when `NODE_ENV === 'production'`. Local `yarn dev` still runs at `/`.

---

## Deploying

### Normal deploy

```bash
git add .
git commit -m "your message"
git push origin main
```

That's it. The workflow takes ~2–4 minutes on the first run (no cache) and ~1–2 minutes after that.

### Convenience script

```bash
yarn deploy
```

This runs `git add . && git commit -m "Deploy" && git push origin main`. Fine for quick content updates, but prefer real commit messages for anything substantive.

### Manual trigger

If you need to re-deploy without pushing a new commit:

1. Go to **Actions** → **Deploy to GitHub Pages**
2. Click **Run workflow** → pick `main` → **Run workflow**

---

## Checking deployment status

- **Actions tab:** `https://github.com/keethhouse-dev/keethhouse-ui/actions` — see the build/deploy logs live.
- **Pages settings:** `https://github.com/keethhouse-dev/keethhouse-ui/settings/pages` — shows the latest deployment URL and status.
- **Environments:** the `github-pages` environment on the repo homepage sidebar links to the most recent deploy.

---

## Rolling back

GitHub Pages doesn't have a built-in "previous version" switch for Actions-based deploys, so rollback = revert + push:

```bash
git revert <bad-commit-sha>
git push origin main
```

The workflow will run and restore the previous state. If multiple bad commits, revert the range:

```bash
git revert <first-bad>^..<last-bad>
git push origin main
```

---

## Troubleshooting

### Build failed on the "Build" step
Check the Actions log. Most common causes:
- **`generateStaticParams` missing** on a new dynamic route. Every `[param]` segment must enumerate its values at build time.
- **Server-only APIs** used in a client page (cookies, headers, `fetch` on the server without proper handling, server actions).
- **`next/image` with external remote** — already handled via `images.unoptimized: true`, so this shouldn't happen unless config changes.

### Site loads but CSS/JS is 404
The `basePath` is wrong. If you moved to a custom domain, remove `basePath`/`assetPrefix` from `next.config.mjs`. If you renamed the repo, update `repoBasePath` in `next.config.mjs`.

### Changes aren't showing up
- Hard refresh (Ctrl+Shift+R) — the browser may be caching the old bundle.
- Check the Actions tab — the workflow may have failed silently or still be running.
- Verify the commit actually landed on `main` (`git log origin/main -1`).

### 404 on a nested route (e.g. `/stays/keeth-house-4/`)
`trailingSlash: true` is set, so URLs must end with a slash. Direct-linking to `/stays/keeth-house-4` (no slash) will 404; the trailing-slash version works. Internal `<Link>` navigation handles this automatically.

### Deploy worked but the site is blank
Open devtools console. Usually a path-resolution issue — the `.nojekyll` file is missing and GitHub Pages is stripping `_next/*` paths. The workflow creates it at build time, so this should not happen; if it does, verify the "Add .nojekyll" step in the Actions log.

---

## First-time GitHub settings checklist

These must be enabled manually at `https://github.com/keethhouse-dev/keethhouse-ui/settings`:

- **Pages** → **Source**: select **"GitHub Actions"** (not "Deploy from a branch")
- **Actions** → **General** → **Workflow permissions**: **"Read and write permissions"**
- **Branches** (optional but recommended): add a protection rule on `main` requiring the Deploy workflow to pass before merge

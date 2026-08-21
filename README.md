# Personal site — Anastasiia Zhemaitite

Interactive resume deck. Next.js 16 (App Router), Tailwind v4, static export.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Content

All resume content lives in `lib/resume-data.ts` — one array of typed slides.
Editing that file is the only thing needed to change what the site says.
Slide kinds: `intro`, `text`, `role`, `skills`, `education`, `contact`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds a
static export and publishes it to GitHub Pages.

One-time setup: **Settings → Pages → Source: GitHub Actions**.

`basePath` is set automatically by the workflow — empty for a
`<username>.github.io` repo, `/<repo-name>` otherwise. Nothing to configure
by hand.

### Custom domain

Add the domain under **Settings → Pages → Custom domain**, then create a
`public/CNAME` file containing just the domain so it survives redeploys.
With a custom domain the site is served from the root, so set
`NEXT_PUBLIC_BASE_PATH` to empty in the workflow.

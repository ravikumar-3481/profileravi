# CI/CD setup for profileravi.vercel.app

This bundle is designed for the current repository structure: TanStack Start + TanStack Router, React, Vite, Nitro, npm lockfile, ESLint, Prettier, TypeScript, and Vitest.

## Files in this bundle

- `.github/workflows/ci.yml`: validates pull requests and pushes to `main`.
- `.github/workflows/vercel-deployment-check.yml`: checks the actual production deployment URL before Vercel promotes it, when configured as a Vercel Deployment Check.
- `.github/workflows/codeql.yml`: scheduled and push/PR static security analysis for JavaScript/TypeScript.
- `.github/dependabot.yml`: weekly npm and GitHub Actions update PRs.
- `scripts/smoke-test.mjs`: checks critical routes return an HTML document with a successful status.
- `package.json.scripts.patch`: scripts that must be merged into the existing `package.json`.

## 1. Copy the files

Copy the `.github` folder and `scripts/smoke-test.mjs` into the root of the portfolio repository. Merge the three scripts in `package.json.scripts`; do not replace the whole `package.json` with the snippet.

The CI workflow uses `npm ci`, so `package-lock.json` must remain committed. It deliberately uses npm even though the repository also has `bun.lock`. Avoid generating dependency changes with both package managers; make npm the agreed package manager and later remove `bun.lock` only if you are sure no Bun-based workflow relies on it.

## 2. Fix the baseline before requiring CI

On your machine, run:

```bash
npm ci
npm run format
```

Review the formatting diff before committing it. Formatting may change many existing files because Prettier is currently configured with double quotes while some source files use single quotes. Then run:

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
```

Fix real failures rather than weakening or skipping the checks. I have inspected the repository configuration, but these commands have not been run against your local working tree as part of preparing this bundle.

## 3. GitHub branch protection

After the CI workflow runs once, open **Settings → Branches** (or repository rulesets) and protect `main`:

- Require a pull request before merging.
- Require the `CI / Quality checks` status check.
- Optionally require `CodeQL / Analyze JavaScript and TypeScript` once that check has completed successfully at least once.
- Block force pushes and branch deletion.

Do **not** make the production smoke-test check a required PR merge check. It runs after Vercel creates a production candidate, so requiring it for PR merging would create a deadlock. Configure it as a Vercel Deployment Check instead.

## 4. Vercel production release gate

First make sure your Vercel project is connected to `ravikumar-3481/profileravi` and its framework/build configuration successfully serves the TanStack Start SSR routes. The repository's Vite config uses `@lovable.dev/vite-tanstack-config` and its comments mention a Cloudflare Nitro default, so verify the actual Vercel framework preset and build output before treating this pipeline as production-ready. This bundle intentionally does not overwrite `vite.config.ts` or invent an output directory.

Then:

1. In Vercel, open the project's **Settings → Deployment Checks**.
2. Add the GitHub check named exactly `Vercel - profileravi: production smoke test` and mark it required for the Production environment.
3. Also require the `CI / Quality checks` GitHub Action check if it is available in the checks selector. This prevents the production candidate from being promoted until CI passes.
4. Keep automatic production aliasing enabled. Vercel Deployment Checks hold the production promotion until the required checks pass.
5. Ensure the Vercel GitHub integration can send `repository_dispatch` events and that Actions are enabled in GitHub.

Vercel only triggers `repository_dispatch` workflows that exist on the default branch. Merge these workflow files into `main` before expecting the Vercel deployment check to run.

The Vercel check workflow listens for `vercel.deployment.ready`, tests the deployment URL from the event payload, and reports the result against that deployment's commit. It checks `/`, `/about`, `/projects`, `/experience`, `/skills`, `/blog`, and `/contact`. A route that returns a redirect is followed; each final response must be a successful HTTP response containing an HTML document.

## 5. Manual smoke test

After committing the files, you can run the smoke test locally:

PowerShell:

```powershell
$env:BASE_URL = "https://profileravi.vercel.app"
npm run test:smoke
```

Bash:

```bash
BASE_URL="https://profileravi.vercel.app" npm run test:smoke
```

You can also start **Actions → Vercel production smoke test → Run workflow** and enter a specific deployment URL. The manual run validates the URL but does not publish a Vercel commit status.

## What the pipeline catches

- Formatting, lint, and TypeScript errors.
- Unit/component test failures.
- Production build failures.
- Basic production SSR/routing failures across the main portfolio routes.
- A subset of code security issues through CodeQL.
- Out-of-date npm dependencies and GitHub Actions via Dependabot PRs.

This is not a guarantee that all bugs will be found. The next high-value improvement is browser-level Playwright coverage for navigation, contact-form validation, mobile layout, and key user journeys.

# ReFi BCN Website - Quick Reference Commands

## Development Commands

### Build and serve locally (with hot reload):
```bash
npx quartz build --serve
```
Site will be available at `http://localhost:8080`

### Build for production:
```bash
npx quartz build
```

### Build multilang (production build):
```bash
npm run build:multilang
```

### Build docs (serve documentation):
```bash
npm run docs
```

## Code Quality Commands

### Format code:
```bash
npm run format
```

### Check code (TypeScript + Prettier):
```bash
npm run check
```

## Git Operations

### Quick push workflow (stage, commit, push):
```bash
git add .
git commit -m "Your commit message here"
git push origin main
```

### Check git status:
```bash
git status
```

### View recent commits:
```bash
git log --oneline -10
```

### View git remotes:
```bash
git remote -v
```

### Set up template upstream (copy/paste)

This repo uses:
- `origin` = this website repo
- `upstream` = the shared template source (`ReFiDAO/quartz-refi-template`)

If `upstream` is missing, add it:

```bash
git remote add upstream https://github.com/ReFiDAO/quartz-refi-template.git
```

If you want the simplest flow, ensure `origin` is HTTPS:

```bash
git remote set-url origin https://github.com/refibcn/ReFi-BCN-Website
```

### Fetch upstream changes (if upstream remote exists):
```bash
git fetch upstream
```

## Deployment Commands

### Deploy to production (push to main triggers GitHub Actions):
```bash
git add .
git commit -m "Deploy: your deployment message"
git push origin main
```
GitHub Actions will automatically build and deploy to GitHub Pages (refibcn.cat) in 3-5 minutes.

### Check deployment status:
Visit: https://github.com/YOUR_USERNAME/ReFi-BCN-Website/actions

### View deployment logs:
```bash
gh run list --limit 5
```
(Requires GitHub CLI: `gh`)

## Utility Commands

### Install dependencies:
```bash
npm install
```

### Clean install (remove node_modules and reinstall):
```bash
rm -rf node_modules package-lock.json
npm install
```

### Clean build artifacts:
```bash
rm -rf public
```

### View local site URL:
After running `npx quartz build --serve`, the site is available at:
- Local: `http://localhost:8080`
- Network: Check terminal output for network URL

### Check Node.js version:
```bash
node --version
cat .node-version
```

### Run tests:
```bash
npm test
```

## Content Management

### View content structure:
```bash
ls -la content/
```

### Find all markdown files:
```bash
find content/ -name "*.md" -type f | sort
```

### Count content files:
```bash
find content/ -name "*.md" -type f | wc -l
```

## Scripts

### Run setup scripts:
```bash
npm run setup
```

### Sync upstream (if configured):
```bash
node scripts/sync-upstream.mjs
```

### Setup cursor rules:
```bash
node scripts/setup-cursor-rules.mjs
```

### Setup packages:
```bash
node scripts/setup-packages.mjs
```

## Troubleshooting

### Clear cache and rebuild:
```bash
rm -rf public node_modules/.cache
npx quartz build
```

### Check for TypeScript errors:
```bash
npx tsc --noEmit
```

### Verify configuration:
```bash
cat quartz.config.ts | head -20
```


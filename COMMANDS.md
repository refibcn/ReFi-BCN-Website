# ReFi BCN Website - Quick Reference Commands

## Development Commands

### Build and serve locally (with hot reload):
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
npx quartz build --serve
```
Site will be available at `http://localhost:8080`

### Build for production:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
npx quartz build
```

### Build multilang (production build):
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
npm run build:multilang
```

### Build docs (serve documentation):
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
npm run docs
```

## Code Quality Commands

### Format code:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
npm run format
```

### Check code (TypeScript + Prettier):
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
npm run check
```

## Git Operations

### Quick push workflow (stage, commit, push):
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
git add .
git commit -m "Your commit message here"
git push origin main
```

### Check git status:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
git status
```

### View recent commits:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
git log --oneline -10
```

### View git remotes:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
git remote -v
```

### Fetch upstream changes (if upstream remote exists):
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
git fetch upstream
```

## Deployment Commands

### Deploy to production (push to main triggers GitHub Actions):
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
git add .
git commit -m "Deploy: your deployment message"
git push origin main
```
GitHub Actions will automatically build and deploy to GitHub Pages (refibcn.cat) in 3-5 minutes.

### Check deployment status:
Visit: https://github.com/YOUR_USERNAME/ReFi-BCN-Website/actions

### View deployment logs:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
gh run list --limit 5
```
(Requires GitHub CLI: `gh`)

## Utility Commands

### Install dependencies:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
npm install
```

### Clean install (remove node_modules and reinstall):
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
rm -rf node_modules package-lock.json
npm install
```

### Clean build artifacts:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
rm -rf public
```

### View local site URL:
After running `npx quartz build --serve`, the site is available at:
- Local: `http://localhost:8080`
- Network: Check terminal output for network URL

### Check Node.js version:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
node --version
cat .node-version
```

### Run tests:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
npm test
```

## Content Management

### View content structure:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
ls -la content/
```

### Find all markdown files:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
find content/ -name "*.md" -type f | sort
```

### Count content files:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
find content/ -name "*.md" -type f | wc -l
```

## Scripts

### Run setup scripts:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
npm run setup
```

### Sync upstream (if configured):
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
node scripts/sync-upstream.mjs
```

### Setup cursor rules:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
node scripts/setup-cursor-rules.mjs
```

### Setup packages:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
node scripts/setup-packages.mjs
```

## Troubleshooting

### Clear cache and rebuild:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
rm -rf public node_modules/.cache
npx quartz build
```

### Check for TypeScript errors:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
npx tsc --noEmit
```

### Verify configuration:
```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
cat quartz.config.ts | head -20
```


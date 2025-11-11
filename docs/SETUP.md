# Setup Guide

Complete guide to setting up your Quartz ReFi website from this template.

## Prerequisites

- Node.js v22 or higher
- npm v10.9.2 or higher
- Git
- GitHub account (for deployment)

## Step 1: Fork the Template

1. Go to https://github.com/ReFiDAO/quartz-refi-template
2. Click "Use this template"
3. Create a new repository with your desired name
4. Clone your new repository locally

```bash
git clone https://github.com/your-org/your-repo.git
cd your-repo
```

## Step 2: Run Setup Script

The setup script will configure your site and install packages.

```bash
npm install
npm run setup
```

The script will prompt you for:

- **Site name**: Your website name (e.g., "ReFi Barcelona")
- **Base URL**: Your domain (e.g., "refibcn.cat")
- **Default locale**: Default language (e.g., "en-US")
- **GitHub organization**: Your GitHub org/username
- **GitHub repository**: Your repository name
- **Packages**: Select optional packages to install

### Package Selection

You'll be prompted to select optional packages:

- **Multilang**: Enable if you need multiple languages
- **Analytics**: Enable for Plausible Analytics
- **Comments**: Enable for Giscus comments
- **OG Images**: Enable for custom social media images (slows builds)

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Set Up Cursor Rules (Optional)

Generate site-specific cursor rules:

```bash
npm run setup:cursor
```

This creates `.cursorrules/` directory with site-specific context.

## Step 5: Customize Your Site

### Update Content

Edit `content/index.md` for your homepage:

```markdown
---
title: Welcome
---

# Your Site Name

Your homepage content here...
```

### Customize Theme

Edit `quartz/styles/custom.scss` to change colors:

```scss
:root {
  --primary-dark: #your-color;
  --primary-medium: #your-color;
  --primary-light: #your-color;
}
```

### Configure Site Settings

Edit `quartz.config.ts`:

```typescript
configuration: {
  pageTitle: "Your Site Name",
  baseUrl: "yourdomain.com",
  // ... other settings
}
```

## Step 6: Preview Locally

```bash
npx quartz build --serve
```

Visit `http://localhost:8080` to preview your site.

## Step 7: Configure Deployment

### GitHub Pages

1. Go to repository Settings → Pages
2. Select source: GitHub Actions
3. Save

### Custom Domain (Optional)

1. Create `quartz/static/CNAME` file:
   ```
   yourdomain.com
   ```
2. Configure DNS:
   - Add CNAME record: `yourdomain.com` → `your-org.github.io`
   - Or A records for apex domain

## Step 8: Deploy

Push to `main` branch:

```bash
git add .
git commit -m "Initial setup"
git push origin main
```

GitHub Actions will automatically build and deploy your site.

## Post-Setup Configuration

### Multi-language Setup (if enabled)

1. Create content directories:
   ```
   content/
   ├── en/    # English content
   ├── ca/    # Catalan content
   └── es/    # Spanish content
   ```

2. Update `scripts/build-multilang.mjs` with your locales

3. Build with:
   ```bash
   npm run build:multilang
   ```

### Analytics Setup (if enabled)

1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain
3. Analytics will work automatically

### Comments Setup (if enabled)

1. Enable Discussions in your GitHub repository
2. Visit [giscus.app](https://giscus.app)
3. Configure and get repo/category IDs
4. Update `quartz.layout.ts` with your Giscus configuration

## Troubleshooting

### Build Errors

- Check Node.js version: `node --version` (should be v22+)
- Clear cache: `rm -rf .quartz-cache node_modules`
- Reinstall: `npm install`

### Deployment Issues

- Check GitHub Actions logs
- Verify `baseUrl` in `quartz.config.ts` matches your domain
- Ensure GitHub Pages is enabled in repository settings

### Package Issues

- Verify package files were copied correctly
- Check configuration files for placeholder values
- Re-run setup script if needed

## Next Steps

- Read [Package Documentation](PACKAGES.md) for package details
- Read [Upstream Sync Guide](UPSTREAM-SYNC.md) to stay updated
- Read [Contributing Guide](CONTRIBUTING.md) to contribute back

## Getting Help

- Check [GitHub Issues](https://github.com/ReFiDAO/quartz-refi-template/issues)
- Ask in [Discussions](https://github.com/ReFiDAO/quartz-refi-template/discussions)
- Review [Quartz Documentation](https://quartz.jzhao.xyz/)


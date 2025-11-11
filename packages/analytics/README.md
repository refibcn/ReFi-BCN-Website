# Analytics Package

Adds privacy-compliant analytics integration to your Quartz site using Plausible Analytics.

## What's Included

- Plausible Analytics configuration
- Privacy-compliant tracking (no cookies, GDPR compliant)
- Simple setup process

## Installation

This package is automatically installed when you select "analytics" during setup.

## Configuration

### 1. Get Plausible Account

1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain
3. Get your domain name (e.g., `yourdomain.com`)

### 2. Configure in quartz.config.ts

After installation, the analytics configuration will be added to `quartz.config.ts`:

```typescript
analytics: {
  provider: "plausible",
  // Plausible will automatically detect your domain
}
```

### 3. Verify Setup

1. Build your site: `npm run quartz build`
2. Deploy to production
3. Visit your site and check Plausible dashboard
4. You should see pageviews within a few minutes

## How It Works

Plausible Analytics:
- Tracks pageviews automatically
- No cookies required (GDPR compliant)
- Lightweight script (~1KB)
- Respects Do Not Track
- No personal data collection

## Customization

### Custom Domain (Self-hosted)

If you're self-hosting Plausible, configure the script URL in `quartz/components/Head.tsx`:

```typescript
<script defer data-domain="yourdomain.com" src="https://plausible.yourdomain.com/js/script.js"></script>
```

### Disable on Specific Pages

Add to page frontmatter:

```markdown
---
analytics: false
---
```

## Dependencies

- Core package (required)

## Notes

- Plausible is free for sites under 10k pageviews/month
- No configuration needed beyond domain setup
- Works automatically after installation
- Privacy-focused alternative to Google Analytics


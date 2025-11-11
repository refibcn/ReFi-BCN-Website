# OG Images Package

Adds custom Open Graph (OG) image generation to your Quartz site.

## What's Included

- Custom OG image generation plugin
- Automatic image creation for each page
- Social media preview support

## Installation

This package is automatically installed when you select "og-images" during setup.

## Configuration

After installation, the `CustomOgImages` plugin is automatically added to `quartz.config.ts`:

```typescript
emitters: [
  // ... other emitters
  Plugin.CustomOgImages(),
],
```

## Usage

OG images are generated automatically for each page during build. They include:
- Page title
- Site name
- Branding/styling

## Performance Impact

**Important:** OG image generation can significantly slow down build times, especially for large sites.

- Small sites (< 50 pages): ~1-2 minutes additional build time
- Medium sites (50-200 pages): ~5-10 minutes additional build time
- Large sites (> 200 pages): ~15+ minutes additional build time

## Customization

### Custom OG Images

To use custom OG images instead of generated ones:

1. Place images in `quartz/static/og-images/`
2. Name them to match page slugs (e.g., `about.png` for `about.md`)
3. Reference in page frontmatter:

```markdown
---
ogImage: og-images/about.png
---
```

### Disable for Specific Pages

```markdown
---
ogImage: false
---
```

## Dependencies

- Core package (required)
- Sharp image processing library (included)

## Notes

- OG images improve social media sharing appearance
- Consider disabling for development builds
- Can be re-enabled for production builds only
- Images are cached to improve performance

## Recommendation

For most sites, consider:
- Generating OG images only for important pages
- Using a default OG image for all pages
- Generating images only in production builds

To disable OG image generation, comment out the plugin in `quartz.config.ts`:

```typescript
// Plugin.CustomOgImages(), // Disabled for faster builds
```


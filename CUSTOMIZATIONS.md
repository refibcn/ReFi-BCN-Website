# ReFi-BCN-Website Customizations

**Last Updated:** January 27, 2025  
**Upstream:** https://github.com/ReFiDAO/quartz-refi-template

## Theme Customizations

### Color Scheme
- **Primary Blue:** `--blue-dark: #092045` (dark navy)
- **Medium Blue:** `--blue-medium: #1A3A6B` (links)
- **Light Blue:** `--blue-light: #2E5491` (hover states)
- **Highlight:** `rgba(9, 32, 69, 0.15)` (transparent blue)

### Styling
- Custom styles in `quartz/styles/custom.scss`
- Blue monochromatic theme
- Box-based component design
- Responsive grid layouts

## Content

### Multi-language Support
- **Languages:** en-US (English), ca-ES (Catalan), es-ES (Spanish)
- **Content Structure:** `content/en/`, `content/ca/`, `content/es/`
- **Build Script:** `scripts/build-multilang.mjs`
- **Language Switcher:** Enabled in header

### Site Sections
- Homepage with hero section
- About ReFi Barcelona
- What We Do (Ecosystem Map, Events, Funding Programs)
- Past Events showcase
- Team member bios
- Footer with links

## Configuration

### Site Settings
- **Site Name:** ReFi Barcelona
- **Base URL:** refibcn.cat
- **Default Locale:** en-US
- **Analytics:** Plausible enabled

### GitHub
- **Repository:** https://github.com/refibcn/ReFi-BCN-Website
- **Organization:** refibcn

## Upstream Sync Notes

### Initial Sync (2025-01-27)
- Merged template structure
- Preserved all site-specific customizations
- Kept blue color scheme
- Maintained multi-language setup
- Preserved site content

### Conflicts Resolved
- Kept site-specific `quartz.config.ts` and `quartz.layout.ts`
- Preserved custom `quartz/styles/custom.scss`
- Maintained site content structure
- Kept deployment configuration

### Template Features Adopted
- Package system structure (for reference)
- Documentation improvements
- Cursor rules (can be customized)
- GitHub Actions workflows (can be adapted)

## Files to Keep Customized

- `quartz.config.ts` - Site-specific configuration
- `quartz.layout.ts` - Site-specific layout
- `quartz/styles/custom.scss` - Blue theme
- `content/` - Site-specific content
- `.github/workflows/deploy.yml` - Deployment config

## Files to Sync from Upstream

- `docs/` - Documentation improvements
- `.cursorrules/` - Cursor rules (can customize)
- `packages/` - Package system (reference)
- `scripts/` - Utility scripts (can use)

## Notes

- This site was created before the template, so it has its own structure
- Template provides best practices and improvements
- Can selectively adopt template features
- Maintain independence while benefiting from improvements


# Package Documentation

Complete catalog of available packages for the Quartz ReFi template.

## Package Overview

The template uses a modular package system. You can select which packages to install during setup.

## Core Package

**Status:** Always Included  
**Dependencies:** None

Essential Quartz framework setup including:
- Base Quartz framework files
- Essential components (Navigation, Search, Footer)
- Basic configuration structure
- TypeScript configuration

**Files:**
- `packages/core/quartz.config.ts.template`
- `packages/core/quartz.layout.ts.template`

## Theme Package

**Status:** Always Included  
**Dependencies:** Core

Customizable theme architecture:
- CSS variables system
- Base styles and typography
- Responsive design patterns
- Component styling patterns

**Files:**
- `packages/theme/styles/custom.scss.template`
- `packages/theme/styles/variables.scss`

**Customization:**
- Edit `quartz/styles/custom.scss` after installation
- Update CSS variables for colors
- Modify typography in `quartz.config.ts`

## Multilang Package

**Status:** Optional  
**Dependencies:** Core

Multi-language support:
- Multi-language build script
- LanguageSwitcher component
- i18n translation files
- Locale configuration

**Installation:**
Select "multilang" during setup.

**Configuration:**
1. Edit `scripts/build-multilang.mjs` to configure locales
2. Create content directories: `content/en/`, `content/ca/`, etc.
3. Build with: `npm run build:multilang`

**Files:**
- `packages/multilang/scripts/build-multilang.mjs`
- `packages/multilang/components/LanguageSwitcher.tsx`

**See:** [packages/multilang/README.md](../packages/multilang/README.md)

## Analytics Package

**Status:** Optional  
**Dependencies:** Core

Plausible Analytics integration:
- Privacy-compliant tracking
- No cookies required
- GDPR compliant
- Lightweight script

**Installation:**
Select "analytics" during setup.

**Configuration:**
1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain
3. Analytics works automatically

**Files:**
- `packages/analytics/plausible.ts`

**See:** [packages/analytics/README.md](../packages/analytics/README.md)

## Comments Package

**Status:** Optional  
**Dependencies:** Core, GitHub Repository

Giscus comments system:
- GitHub Discussions integration
- Light and dark theme support
- Configurable per-page
- Requires GitHub account to comment

**Installation:**
Select "comments" during setup.

**Configuration:**
1. Enable Discussions in GitHub repository
2. Visit [giscus.app](https://giscus.app) to configure
3. Update `quartz.layout.ts` with repo/category IDs

**Files:**
- `packages/comments/components/Comments.tsx`
- `packages/comments/static/giscus/` (theme files)

**See:** [packages/comments/README.md](../packages/comments/README.md)

## OG Images Package

**Status:** Optional  
**Dependencies:** Core

Custom Open Graph image generation:
- Automatic OG image creation
- Social media preview support
- Customizable per-page

**Installation:**
Select "og-images" during setup.

**Performance Impact:**
- Small sites (< 50 pages): ~1-2 min additional build time
- Medium sites (50-200 pages): ~5-10 min additional build time
- Large sites (> 200 pages): ~15+ min additional build time

**Configuration:**
- Automatically enabled after installation
- Can be disabled by commenting out plugin in `quartz.config.ts`

**Files:**
- Configuration in `quartz.config.ts`

**See:** [packages/og-images/README.md](../packages/og-images/README.md)

## Package Dependencies

```
Core (required)
├── Theme (required)
├── Multilang (optional)
├── Analytics (optional)
├── Comments (optional)
└── OG Images (optional)
```

## Adding Packages After Setup

If you didn't install a package during setup, you can add it later:

1. Copy package files from `packages/{package-name}/`
2. Update configuration files as needed
3. See package README for specific instructions

## Removing Packages

To remove a package:

1. Remove package files
2. Revert configuration changes
3. Remove from `package.json` scripts if added
4. Test to ensure nothing breaks

## Package Updates

To update a package:

1. Check package README for update instructions
2. Compare your installed version with template version
3. Merge changes carefully
4. Test after updating

## Creating New Packages

To add a new package to the template:

1. Create `packages/{package-name}/` directory
2. Add package files and `README.md`
3. Update `scripts/setup-packages.mjs` to handle installation
4. Update template configuration files with placeholders
5. Document in this file

## Package Compatibility

All packages are compatible with each other. You can install any combination of optional packages.

## Support

For package-specific questions:
- Check package README in `packages/{package-name}/README.md`
- See [GitHub Issues](https://github.com/ReFiDAO/quartz-refi-template/issues)
- Ask in [Discussions](https://github.com/ReFiDAO/quartz-refi-template/discussions)


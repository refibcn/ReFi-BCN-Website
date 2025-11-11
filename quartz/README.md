# Quartz Framework Directory

This directory contains the Quartz framework files.

## Setup

When setting up from the template, you need to populate this directory. You can:

1. **Copy from existing Quartz installation:**
   ```bash
   cp -r /path/to/quartz/quartz/* quartz/
   ```

2. **Copy from ReFi-BCN-Website:**
   ```bash
   cp -r ../ReFi-BCN-Website/quartz/* quartz/
   ```

3. **Use Quartz CLI:**
   ```bash
   npx quartz create
   # Then copy the quartz/ directory
   ```

## Structure

The quartz directory should contain:
- `components/` - React components
- `plugins/` - Quartz plugins
- `styles/` - SCSS stylesheets
- `util/` - Utility functions
- `i18n/` - Internationalization files
- `static/` - Static assets
- Framework files (bootstrap-cli.mjs, build.ts, etc.)

## Note

The template includes package-specific components that will be copied here during setup:
- `components/LanguageSwitcher.tsx` (from multilang package)
- `components/Comments.tsx` (from comments package)


# Core Package

The core package provides the essential Quartz framework setup and is always included in every installation.

## What's Included

- Base Quartz framework files
- Essential components (Navigation, Search, Footer)
- Theme architecture (customizable)
- Basic configuration structure
- TypeScript configuration
- Build tooling

## Files

- `quartz.config.ts.template` - Main Quartz configuration with placeholders
- `quartz.layout.ts.template` - Layout configuration with conditional package components

## Customization

The core package includes a customizable theme system. Colors, fonts, and spacing can be customized in:
- `quartz/styles/custom.scss` (after setup)
- `quartz/styles/variables.scss` (after setup)

## Dependencies

This package has no dependencies on other packages. All other packages depend on this core package.


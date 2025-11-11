# Changelog

All notable changes to the Quartz ReFi Template will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-27

### Added

- Initial template repository release
- Modular package system with core, multilang, analytics, comments, og-images, and theme packages
- Interactive setup script (`scripts/setup-packages.mjs`) for package selection and installation
- Cursor rules setup script (`scripts/setup-cursor-rules.mjs`) for generating site-specific cursor rules
- Upstream sync helper script (`scripts/sync-upstream.mjs`)
- Comprehensive documentation:
  - TEMPLATE-README.md - Main template documentation
  - docs/SETUP.md - Detailed setup guide
  - docs/PACKAGES.md - Complete package catalog
  - docs/UPSTREAM-SYNC.md - Upstream sync guide
  - docs/CONTRIBUTING.md - Contribution guidelines
- Cursor rules for template repository:
  - template-overview.mdc (always applied)
  - package-management.mdc
  - customization-guide.mdc
  - upstream-workflow.mdc
- Cursor rules templates for child repositories:
  - project-overview.mdc.template
  - site-customization.mdc.template
  - upstream-sync.mdc.template
- GitHub Actions workflows:
  - ci.yml - CI/CD pipeline
  - deploy.yml.template - Deployment template
  - sync-upstream.yml - Optional automated upstream sync
- Package documentation for all packages
- Issue and PR templates

### Features

- **Core Package**: Essential Quartz framework (always included)
- **Theme Package**: Customizable theme architecture with CSS variables (always included)
- **Multilang Package**: Multi-language support with LanguageSwitcher component (optional)
- **Analytics Package**: Plausible Analytics integration (optional)
- **Comments Package**: Giscus comments system (optional)
- **OG Images Package**: Custom Open Graph image generation (optional)

### Documentation

- Complete setup guide with step-by-step instructions
- Package documentation with installation and configuration details
- Upstream sync guide with conflict resolution strategies
- Contributing guide with contribution process and guidelines

### Infrastructure

- Template configuration files with placeholders
- Package installer script with interactive prompts
- Cursor rules generator script
- Upstream sync helper script
- GitHub Actions workflows for CI/CD

## [Unreleased]

### Planned

- Additional package options
- Enhanced customization options
- More documentation examples
- Community-contributed packages

---

[1.0.0]: https://github.com/ReFiDAO/quartz-refi-template/releases/tag/v1.0.0


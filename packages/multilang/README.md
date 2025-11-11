# Multi-language Package

Adds multi-language support to your Quartz site with automatic language detection and switching.

## What's Included

- Multi-language build script (`scripts/build-multilang.mjs`)
- LanguageSwitcher component
- i18n translation files (from Quartz core)
- Locale configuration support

## Installation

This package is automatically installed when you select "multilang" during setup.

## Configuration

### 1. Configure Locales

Edit `scripts/build-multilang.mjs` and update the `LOCALES` array:

```javascript
const LOCALES = [
  { code: "en-US", prefix: "en", isDefault: true },
  { code: "ca-ES", prefix: "ca", isDefault: false },
  { code: "es-ES", prefix: "es", isDefault: false },
]
```

### 2. Organize Content

Create content directories for each language:

```
content/
├── en/          # English content (default)
├── ca/           # Catalan content
└── es/           # Spanish content
```

### 3. Update Build Script

Add the multilang build script to `package.json`:

```json
{
  "scripts": {
    "build:multilang": "node scripts/build-multilang.mjs"
  }
}
```

### 4. Configure Language Switcher

The LanguageSwitcher component is automatically added to the header when this package is installed. It will detect the current language from the URL and allow users to switch between languages.

## Usage

### Building

Use the multilang build script instead of the standard build:

```bash
npm run build:multilang
```

This will:
1. Build each locale separately
2. Output to `public/` (default locale) and `public/{prefix}/` (other locales)
3. Merge static assets
4. Create a root redirect page

### Content Structure

Each language should have its own content directory:

```
content/
├── en/
│   ├── index.md
│   ├── about.md
│   └── blog/
├── ca/
│   ├── index.md
│   ├── about.md
│   └── blog/
└── es/
    ├── index.md
    ├── about.md
    └── blog/
```

## Customization

### Supported Locales

The LanguageSwitcher supports all locales defined in Quartz's i18n system. See `quartz/i18n/locales/` for available translations.

### Language Detection

The build script creates a root redirect page that:
- Detects browser language
- Redirects to the appropriate language version
- Falls back to default locale if no match

### URL Structure

- Default locale: `/` (root) and `/en/`
- Other locales: `/{prefix}/` (e.g., `/ca/`, `/es/`)

## Dependencies

- Core package (required)
- Quartz i18n system (included in core)

## Notes

- Static assets are shared across all languages
- Each language build uses its own content directory
- The LanguageSwitcher component requires JavaScript to function
- Language detection happens client-side for better performance


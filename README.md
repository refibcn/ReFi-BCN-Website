# ReFi Barcelona - Quartz Website

This is the [Quartz](https://quartz.jzhao.xyz/) website for ReFi Barcelona, connecting Catalonia's regenerative movements with global innovations in finance, technology, and governance.

## About

ReFi Barcelona is a hub where ideas meet collective action. By weaving connections between projects, technologies, and communities, we cultivate the infrastructure that makes systemic change possible.

## Development

### Prerequisites

- Node.js (see `.node-version` for the specific version)
- npm

### Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx quartz build --serve
```

The site will be available at `http://localhost:8080`

### Build for Production

```bash
npx quartz build
```

## Theme Configuration

This site uses a **blue monochromatic** color scheme to distinguish it from Regenerant Catalunya's green theme:

- **Primary Blue**: `#092045` (dark navy)
- **Medium Blue**: `#1A3A6B` (links)
- **Light Blue**: `#2E5491` (hover states)

The theme is configured in:
- `quartz.config.ts` - color definitions
- `quartz/styles/custom.scss` - custom styling
- `quartz/components/styles/listPage.scss` - folder listing styles

## Project Structure

- `content/` - Markdown content files
  - `about/` - About ReFi Barcelona
  - `events/` - Past and upcoming events
  - `ecosystem/` - Projects and partners
  - `blog/` - Blog posts and updates
- `quartz/` - Quartz framework files
  - `components/` - React components
  - `styles/` - SCSS stylesheets
  - `static/` - Static assets (images, etc.)

## Deployment

The site is automatically deployed via GitHub Actions when changes are pushed to the `main` branch.

See `.github/workflows/deploy.yml` for the deployment configuration.

## Contact

For questions or contributions, contact us at [hola@refibcn.cat](mailto:hola@refibcn.cat)

## License

[Add license information]

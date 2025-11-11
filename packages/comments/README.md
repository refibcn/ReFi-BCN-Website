# Comments Package

Adds Giscus comments system to your Quartz site, powered by GitHub Discussions.

## What's Included

- Giscus comments component
- Light and dark theme styles
- GitHub Discussions integration
- Configurable per-page

## Installation

This package is automatically installed when you select "comments" during setup.

## Configuration

### 1. Set Up GitHub Discussions

1. Go to your repository on GitHub
2. Enable Discussions in repository settings
3. Create a Discussions category (e.g., "Announcements" or "General")

### 2. Get Giscus Configuration

1. Visit [giscus.app](https://giscus.app)
2. Enter your repository details:
   - Repository: `your-org/your-repo`
   - Discussion category: Select your category
3. Copy the configuration values

### 3. Configure in quartz.layout.ts

After installation, you'll need to configure Giscus in `quartz.layout.ts`:

```typescript
Component.Comments({
  provider: "giscus",
  options: {
    repo: "your-org/your-repo",
    repoId: "R_xxxxxxxxxxxxx", // From Giscus
    category: "Announcements",
    categoryId: "DIC_xxxxxxxxxxxxx", // From Giscus
    mapping: "url",
    strict: true,
    reactionsEnabled: true,
    inputPosition: "bottom",
    lang: "en",
  },
}),
```

### 4. Configure Theme Styles

Copy the Giscus theme files to `quartz/static/giscus/`:

- `light.css` - Light theme
- `dark.css` - Dark theme

These are included in the package and will be copied during installation.

## Usage

### Enable Comments on a Page

Comments are enabled by default. To disable on a specific page:

```markdown
---
comments: false
---
```

### Customize Appearance

Edit the Giscus CSS files in `quartz/static/giscus/` to customize the appearance.

## How It Works

Giscus:
- Uses GitHub Discussions as the backend
- Requires users to sign in with GitHub
- Automatically creates discussions for each page
- Supports reactions and replies
- Works with GitHub's authentication

## Customization

### Change Comment Position

In `quartz.layout.ts`, change `inputPosition`:

```typescript
inputPosition: "top" // or "bottom"
```

### Disable Reactions

```typescript
reactionsEnabled: false
```

### Change Language

```typescript
lang: "en" // or "es", "ca", etc.
```

## Dependencies

- Core package (required)
- GitHub repository with Discussions enabled

## Notes

- Requires public GitHub repository
- Users must have GitHub account to comment
- Discussions are created automatically per page
- Free and open-source
- Privacy-friendly (no tracking)


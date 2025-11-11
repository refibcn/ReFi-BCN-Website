# Theme Package

Provides a customizable theme architecture for your Quartz site with CSS variables and SCSS structure.

## What's Included

- Custom SCSS stylesheet template
- CSS variables for easy customization
- Base styles and typography
- Responsive design patterns
- Component styling patterns

## Installation

This package is always included (core package dependency). The theme files are copied during initial setup.

## Customization

### Color Scheme

Edit CSS variables in `quartz/styles/custom.scss`:

```scss
:root {
  // Primary colors
  --blue-dark: #092045;       // Dark navy (main)
  --blue-medium: #1A3A6B;     // Medium blue (links)
  --blue-light: #2E5491;      // Light blue (hover states)
  
  // Or customize with your own colors
  --primary-color: #your-color;
  --secondary-color: #your-color;
}
```

### Typography

Customize fonts in `quartz.config.ts`:

```typescript
theme: {
  typography: {
    header: "Your Header Font",
    body: "Your Body Font",
    code: "Your Code Font",
  },
}
```

### Spacing

Adjust layout spacing:

```scss
:root {
  --layout-inline: clamp(1.5rem, 5vw, 3.5rem);
}
```

## File Structure

```
quartz/styles/
├── custom.scss        # Main stylesheet (customize here)
├── variables.scss     # CSS variables
├── base.scss          # Base styles
└── syntax.scss        # Code syntax highlighting
```

## Design Patterns

### Box Components

Use the box pattern for cards and sections:

```scss
.box-component {
  border: 2px solid var(--blue-dark);
  padding: 2rem 1.5rem;
  background: var(--light);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--action-btn-shadow);
  }
}
```

### Grid Layouts

Responsive grid patterns:

```scss
.grid-3-col {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

## Customization Points

1. **Colors**: Edit CSS variables in `custom.scss`
2. **Fonts**: Update in `quartz.config.ts`
3. **Spacing**: Adjust `--layout-inline` and other spacing variables
4. **Components**: Override component styles in `custom.scss`

## Dependencies

- Core package (required)

## Notes

- All colors use CSS variables for easy theming
- Responsive design built-in
- Dark mode support via Quartz theme configuration
- Mobile-first approach


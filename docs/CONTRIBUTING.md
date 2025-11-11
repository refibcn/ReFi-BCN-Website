# Contributing Guide

How to contribute improvements back to the Quartz ReFi template.

## Overview

Contributions help improve the template for all ReFi local nodes. This guide explains how to contribute effectively.

## What to Contribute

### Good Contributions

- **Bug Fixes**: Fixes for issues in shared code
- **New Features**: Features useful to all nodes
- **Documentation**: Improvements to docs and guides
- **Package Enhancements**: Improvements to packages
- **Performance**: Performance optimizations
- **Best Practices**: Improvements to patterns and practices

### What NOT to Contribute

- **Site-Specific Content**: Content specific to one node
- **Custom Color Schemes**: Unless generalizable as a theme option
- **Domain-Specific Configs**: Configurations for specific domains
- **Local Node Branding**: Branding specific to one node

## Contribution Process

### 1. Fork the Template

1. Go to https://github.com/ReFiDAO/quartz-refi-template
2. Click "Fork" to create your fork
3. Clone your fork locally

```bash
git clone https://github.com/your-username/quartz-refi-template.git
cd quartz-refi-template
```

### 2. Create Feature Branch

```bash
git checkout -b feature/my-improvement
```

Use descriptive branch names:
- `feature/add-new-package`
- `fix/analytics-config`
- `docs/improve-setup-guide`

### 3. Make Changes

- Make your improvements
- Test thoroughly
- Update documentation if needed
- Follow code style (use Prettier)

### 4. Commit Changes

Write clear commit messages:

```bash
git add .
git commit -m "Add multilang package improvements

- Fix language detection issue
- Update build script documentation
- Add example locales configuration"
```

### 5. Push and Create Pull Request

```bash
git push origin feature/my-improvement
```

Then:
1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill out PR template
5. Submit PR

## Pull Request Guidelines

### PR Title

Use clear, descriptive titles:
- ✅ "Add multilang package improvements"
- ✅ "Fix analytics configuration issue"
- ❌ "Updates"
- ❌ "Fixes"

### PR Description

Include:
- **What**: What changes are made
- **Why**: Why these changes are needed
- **How**: How to test the changes
- **Breaking Changes**: Any breaking changes

Example:

```markdown
## What
Adds support for custom locale configuration in multilang package.

## Why
Currently, locales are hardcoded. This allows users to configure their own locales.

## How to Test
1. Install multilang package
2. Edit scripts/build-multilang.mjs
3. Configure custom locales
4. Run build:multilang
5. Verify output structure

## Breaking Changes
None - backward compatible
```

### Code Review

- Be responsive to feedback
- Make requested changes
- Ask questions if unclear
- Be patient - reviews take time

## Code Style

### TypeScript/JavaScript

- Use Prettier (run `npm run format`)
- Follow existing code patterns
- Add comments for complex logic
- Use descriptive variable names

### Documentation

- Use clear, concise language
- Include examples
- Update related docs
- Check spelling and grammar

### Testing

- Test your changes locally
- Test with different package combinations
- Test edge cases
- Document test steps in PR

## Package Contributions

### Adding New Packages

1. Create `packages/{package-name}/` directory
2. Add package files and `README.md`
3. Update `scripts/setup-packages.mjs`
4. Update template configuration files
5. Document in `docs/PACKAGES.md`
6. Add to package selection in setup script

### Improving Existing Packages

1. Make improvements to package files
2. Update package README if needed
3. Test installation process
4. Update documentation

## Documentation Contributions

### Types of Documentation

- **Setup Guides**: Step-by-step instructions
- **Package Docs**: Package-specific documentation
- **Examples**: Code examples and patterns
- **Troubleshooting**: Common issues and solutions

### Documentation Style

- Clear headings and structure
- Code examples with syntax highlighting
- Step-by-step instructions
- Links to related docs

## Review Process

### What Happens After Submission

1. **Automated Checks**: CI runs tests and checks
2. **Review**: Template maintainers review PR
3. **Feedback**: Comments and suggestions
4. **Changes**: Make requested changes
5. **Merge**: PR gets merged when approved

### Timeline

- Initial review: Usually within a few days
- Feedback: Depends on complexity
- Merge: After approval and tests pass

## Recognition

Contributors are recognized in:
- PR history
- Release notes
- CONTRIBUTORS.md (if maintained)

## Questions?

- Check [GitHub Issues](https://github.com/ReFiDAO/quartz-refi-template/issues)
- Ask in [Discussions](https://github.com/ReFiDAO/quartz-refi-template/discussions)
- Review existing PRs for examples

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect different perspectives

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the Quartz ReFi template! 🎉


# Upstream Sync Guide

How to sync improvements from the template repository to your fork.

## Overview

The template repository (`ReFiDAO/quartz-refi-template`) is the upstream source. Your fork is downstream. This guide explains how to pull updates from upstream.

## Setting Up Upstream Remote

### Initial Setup

Add the upstream remote to your repository:

```bash
git remote add upstream https://github.com/ReFiDAO/quartz-refi-template.git
```

Verify it's added:

```bash
git remote -v
```

You should see:
- `origin` - Your fork
- `upstream` - Template repository

## Syncing Methods

### Method 1: Using Sync Script

The template includes a sync helper script:

```bash
npm run sync:upstream
# or
node scripts/sync-upstream.mjs
```

This script:
- Adds upstream remote if not present
- Fetches latest changes
- Shows merge instructions

### Method 2: Manual Sync

```bash
# Fetch upstream changes
git fetch upstream

# Checkout your main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Resolve conflicts if any
# Push changes
git push origin main
```

## Review Before Merging

It's recommended to review changes before merging:

```bash
# Create review branch
git checkout -b review-upstream

# Merge upstream
git merge upstream/main

# Review changes
git diff main..review-upstream

# If good, merge to main
git checkout main
git merge review-upstream
git branch -d review-upstream
```

## Conflict Resolution

### Common Conflicts

- `package.json` dependencies
- `quartz.config.ts` settings
- Component customizations
- Workflow file changes

### Resolution Strategy

1. **Keep Template Defaults**: Template maintains "default" values
2. **Document Overrides**: Note customizations in `CUSTOMIZATIONS.md`
3. **Resolve Carefully**: Review each conflict

### Resolving Conflicts

When conflicts occur:

```bash
# Merge upstream
git merge upstream/main

# Git will show conflicted files
# Edit files to resolve conflicts
# Remove conflict markers (<<<<<<, ======, >>>>>>)

# Stage resolved files
git add .

# Complete merge
git commit
```

### Conflict Example

```typescript
// In quartz.config.ts
<<<<<<< HEAD
pageTitle: "My Custom Site",
=======
pageTitle: "{{SITE_NAME}}",
>>>>>>> upstream/main
```

Resolution:
```typescript
pageTitle: "My Custom Site", // Keep your customization
```

## Sync Frequency

### Recommended Schedule

- **Critical Updates**: Immediately (security, breaking bugs)
- **Feature Updates**: Monthly sync window
- **Dependency Updates**: Quarterly review
- **Major Versions**: As needed (with testing period)

### Checking for Updates

```bash
# Fetch latest
git fetch upstream

# See what's new
git log main..upstream/main

# See file changes
git diff main..upstream/main --stat
```

## Version Management

### Template Releases

Template uses semantic versioning:
- `v1.0.0` - Major release (breaking changes)
- `v1.1.0` - Minor release (new features)
- `v1.1.1` - Patch release (bug fixes)

### Syncing Specific Versions

```bash
# Fetch tags
git fetch upstream --tags

# Checkout specific version
git checkout v1.0.0

# Create branch from version
git checkout -b upgrade-to-v1.0.0 v1.0.0
```

## What Gets Synced

### Synced from Upstream

- Core Quartz framework updates
- Shared component improvements
- Build script enhancements
- Workflow improvements
- Documentation updates
- Bug fixes in shared code

### Not Synced (Your Customizations)

- Site-specific content
- Custom color schemes
- Domain-specific configurations
- Local node branding
- Site-specific features

## Best Practices

1. **Sync Regularly**: Monthly sync recommended
2. **Test Before Merging**: Always test upstream changes
3. **Document Customizations**: Keep track of overrides
4. **Review Changes**: Understand what's changing
5. **Backup First**: Commit or stash your changes before syncing

## Troubleshooting

### Upstream Not Found

```bash
# Re-add upstream
git remote remove upstream
git remote add upstream https://github.com/ReFiDAO/quartz-refi-template.git
```

### Merge Conflicts

```bash
# Abort merge
git merge --abort

# Try again with strategy
git merge upstream/main --strategy-option theirs
```

### Lost Customizations

```bash
# Check what changed
git diff main upstream/main

# Restore customizations
git checkout main -- path/to/custom/file
```

### Diverged Too Far

If your fork has diverged significantly:

```bash
# Create backup branch
git branch backup-main

# Reset to upstream (careful!)
git reset --hard upstream/main

# Re-apply your customizations
# Use git cherry-pick or manual edits
```

## Contributing Back

After syncing, consider contributing improvements back:

1. Fork template repository
2. Create feature branch
3. Make improvements
4. Submit pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Automated Sync (Optional)

You can set up automated sync with GitHub Actions:

```yaml
# .github/workflows/sync-upstream.yml
name: Sync Upstream
on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly on Sunday
  workflow_dispatch:  # Manual trigger
```

See template for example workflow file.

## Support

- Check [GitHub Issues](https://github.com/ReFiDAO/quartz-refi-template/issues)
- Ask in [Discussions](https://github.com/ReFiDAO/quartz-refi-template/discussions)
- Review [Quartz Documentation](https://quartz.jzhao.xyz/)


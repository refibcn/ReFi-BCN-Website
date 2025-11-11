# Upstream Relationships Setup Guide

## Status: Upstream Remotes Added ✅

All three existing repositories now have upstream remotes configured pointing to the template repository.

### Repository Status

#### ReFi-BCN-Website
- **Upstream:** `https://github.com/ReFiDAO/quartz-refi-template.git`
- **Status:** Remote added ✅
- **Next:** Review changes before syncing

#### Regenerant-Catalunya
- **Upstream:** `https://github.com/ReFiDAO/quartz-refi-template.git`
- **Status:** Remote added ✅
- **Next:** Review changes before syncing

#### ReFi-DAO-Website
- **Upstream:** `https://github.com/ReFiDAO/quartz-refi-template.git`
- **Status:** Remote added ✅
- **Next:** Review changes before syncing

## Next Steps: Review and Sync

### Step 1: Fetch Upstream Changes

For each repository, fetch the upstream changes:

```bash
# ReFi-BCN-Website
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
git fetch upstream

# Regenerant-Catalunya
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/Regenerant-Catalunya"
git fetch upstream

# ReFi-DAO-Website
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-DAO-Website"
git fetch upstream
```

### Step 2: Review Changes

Before merging, review what would change:

```bash
# See what commits would be merged
git log main..upstream/main --oneline

# See file changes
git diff main..upstream/main --stat

# See specific file changes
git diff main..upstream/main -- path/to/file
```

### Step 3: Create Review Branch

Create a branch to review changes safely:

```bash
git checkout -b review-upstream-template
git merge upstream/main --allow-unrelated-histories
```

### Step 4: Document Customizations

Before syncing, document site-specific customizations in `CUSTOMIZATIONS.md`:

**For ReFi-BCN-Website:**
- Blue color scheme (--blue-dark: #092045)
- Multi-language support (en-US, ca-ES, es-ES)
- Site-specific content
- Custom domain: refibcn.cat

**For Regenerant-Catalunya:**
- Green color scheme customizations
- Multi-language setup
- Regenerant Catalunya specific content

**For ReFi-DAO-Website:**
- Purple/blue gradient theme
- ReFi DAO specific content
- Current theme architecture

### Step 5: Resolve Conflicts

If conflicts occur:
1. Review each conflict carefully
2. Keep site-specific customizations
3. Accept template improvements where appropriate
4. Document decisions in CUSTOMIZATIONS.md

### Step 6: Merge to Main

After reviewing and resolving conflicts:

```bash
git checkout main
git merge review-upstream-template
git push origin main
```

## Important Notes

### What to Keep

- Site-specific content
- Custom color schemes
- Domain-specific configurations
- Local node branding
- Site-specific features

### What to Accept from Template

- Bug fixes in shared code
- Framework improvements
- Documentation updates
- Package enhancements
- Best practices

## Sync Frequency Recommendations

- **Initial Sync:** Review carefully, may have many changes
- **Regular Sync:** Monthly recommended
- **Critical Updates:** Immediately (security, breaking bugs)
- **Feature Updates:** Review before merging

## Troubleshooting

### If Upstream Not Found

```bash
git remote remove upstream
git remote add upstream https://github.com/ReFiDAO/quartz-refi-template.git
```

### If Merge Conflicts

```bash
# Abort merge
git merge --abort

# Review conflicts
git status

# Resolve manually
# Then:
git add .
git commit
```

### If Diverged Too Far

Consider creating a new branch from upstream and manually migrating customizations:

```bash
git checkout -b migrate-from-template
git merge upstream/main --allow-unrelated-histories
# Manually review and migrate customizations
```

## Verification

After syncing, verify:
- [ ] Site still builds correctly
- [ ] Customizations preserved
- [ ] No broken functionality
- [ ] Documentation updated
- [ ] CUSTOMIZATIONS.md created

## Support

- See `docs/UPSTREAM-SYNC.md` for detailed sync guide
- Check template repository: https://github.com/ReFiDAO/quartz-refi-template
- Review CHANGELOG.md for template changes


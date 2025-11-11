# Upstream Setup Instructions

This document provides instructions for setting up upstream relationships between existing repositories and the template repository.

## For ReFi-BCN-Website

### Step 1: Add Upstream Remote

```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-BCN-Website"
git remote add upstream https://github.com/ReFiDAO/quartz-refi-template.git
git remote -v  # Verify
```

### Step 2: Fetch Upstream

```bash
git fetch upstream
```

### Step 3: Review Changes

```bash
git log main..upstream/main --oneline
git diff main..upstream/main --stat
```

### Step 4: Create Review Branch

```bash
git checkout -b review-upstream-template
git merge upstream/main --allow-unrelated-histories
```

### Step 5: Resolve Conflicts

Review and resolve any conflicts, keeping ReFi-BCN customizations:
- Site name: "ReFi Barcelona"
- Base URL: "refibcn.cat"
- Blue color scheme
- Multi-language setup (en-US, ca-ES, es-ES)
- Site-specific content

### Step 6: Document Customizations

Create `CUSTOMIZATIONS.md`:

```markdown
# ReFi-BCN-Website Customizations

## Theme
- Blue color scheme (--blue-dark: #092045)
- Custom styling in quartz/styles/custom.scss

## Content
- Site-specific content in content/
- Multi-language support (en, ca, es)

## Configuration
- baseUrl: refibcn.cat
- Analytics: Plausible enabled
```

### Step 7: Merge to Main

```bash
git checkout main
git merge review-upstream-template
git push origin main
```

## For Regenerant-Catalunya

### Step 1: Add Upstream Remote

```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/Regenerant-Catalunya"
git remote add upstream https://github.com/ReFiDAO/quartz-refi-template.git
```

### Step 2: Sync Process

Follow same steps as ReFi-BCN-Website, but maintain:
- Green color scheme customizations
- Regenerant Catalunya specific content
- Multi-language setup

## For ReFi-DAO-Website

### Step 1: Add Upstream Remote

```bash
cd "/Users/luizfernando/Desktop/Workspaces/Zettelkasten/03 Libraries/ReFi-DAO-Website"
git remote add upstream https://github.com/ReFiDAO/quartz-refi-template.git
```

### Step 2: Sync Process

Follow same steps, maintaining:
- Purple/blue gradient theme
- ReFi DAO specific content
- Current theme architecture

## Notes

- Use `--allow-unrelated-histories` flag for initial merge
- Always review changes before merging
- Keep site-specific customizations
- Document all overrides in CUSTOMIZATIONS.md
- Test after syncing


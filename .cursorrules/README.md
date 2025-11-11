# Cursor Rules - Template Repository

**Repository:** Quartz ReFi Template (https://github.com/ReFiDAO/quartz-refi-template)  
**Purpose:** Template repository for ReFi local node websites  
**Created:** January 2025  
**Rules:** 4 specialized context files

---

## Available Rules

### 1. **template-overview.mdc** (Always Applied)
Loads automatically when working in this folder.

**Provides:**
- Template repository purpose and structure
- Package system overview
- Upstream/downstream workflow explanation
- Quick reference to key files

### 2. **package-management.mdc**
**Fetch with:** "package", "install", "setup", "modules"

**Provides:**
- Available packages and their descriptions
- Installation process
- Configuration updates per package
- Package dependencies
- Customization points

### 3. **customization-guide.mdc**
**Fetch with:** "customize", "theme", "styling", "colors", "layout"

**Provides:**
- Theme customization (colors, fonts, spacing)
- Content structure customization
- Component customization
- Configuration options
- Best practices

### 4. **upstream-workflow.mdc**
**Fetch with:** "upstream", "sync", "contribute", "merge", "pull"

**Provides:**
- How to sync from upstream
- How to contribute back to template
- Conflict resolution strategies
- Version management
- Best practices

---

## How to Use

### **Automatic Context**
The **template-overview** rule loads automatically when you work in this folder, giving you immediate context about:
- Template structure and purpose
- Package system
- Upstream/downstream workflow
- Key files and directories

### **Fetch Specific Context**
Use natural language to load specialized rules:
- "How do packages work?" → Loads package-management
- "How do I customize the theme?" → Loads customization-guide
- "How do I sync from upstream?" → Loads upstream-workflow

### **Quick Reference by Task**

**Working on packages:**
- Auto-loaded overview + Fetch "package management"
- Reference: `packages/` directory
- Setup script: `scripts/setup-packages.mjs`

**Customizing theme:**
- Fetch "customization guide"
- Edit: `packages/theme/styles/custom.scss.template`
- Reference: `quartz/styles/custom.scss` (after setup)

**Managing upstream sync:**
- Fetch "upstream workflow"
- Script: `scripts/sync-upstream.mjs`
- Process: fetch → merge → resolve conflicts

---

## Key Principles

**Template Philosophy:**
- Modular and extensible
- Easy to fork and customize
- Maintains sync capability
- Documents best practices

**Package System:**
- Core packages always included
- Optional packages selectable
- Clear dependencies
- Well-documented

**Workflow:**
- Upstream maintains template
- Downstream forks and customizes
- Bidirectional sharing of improvements
- Version management via tags

---

## Document Integration

**Template Files:**
- `packages/core/*.template` - Configuration templates
- `scripts/setup-packages.mjs` - Package installer
- `scripts/sync-upstream.mjs` - Sync helper
- `docs/` - Complete documentation

**Package Documentation:**
- Each package has `README.md`
- Installation instructions
- Configuration options
- Customization points

---

## Benefits

**Efficiency:**
- Instant template context
- Package system clearly explained
- Sync process documented
- Customization guide available

**Consistency:**
- Standardized package structure
- Clear contribution process
- Unified documentation
- Predictable behavior

**Community:**
- Shared improvements
- Clear contribution path
- Version management
- Easy onboarding

---

## Keeping Updated

**Current as of:** January 2025

**Update when:**
- New packages added
- Workflow changes
- Documentation updates
- Best practices evolve

**Who updates:**
- Template maintainers
- Contributors via PRs
- Document improvements welcome

---

## Quick Start

1. **Just start working** - Overview loads automatically
2. **Add packages** - Use setup script or manual installation
3. **Customize** - Edit theme and configuration files
4. **Sync upstream** - Use sync script or manual git commands
5. **Contribute back** - Submit PRs with improvements

---

**These rules apply when working in the template repository.**

For questions or updates, see the template repository: https://github.com/ReFiDAO/quartz-refi-template


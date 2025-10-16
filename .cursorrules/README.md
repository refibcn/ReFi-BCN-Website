# ReFi Barcelona Website - Cursor Rules

**Repository:** Quartz Website (https://github.com/refibcn/ReFi-BCN-Website)  
**Purpose:** Public website and digital presence for ReFi Barcelona  
**Created:** October 2025  
**Rules:** 4 specialized context files

---

## 📋 Available Rules

### 1. **project-overview.mdc** (Always Applied)
Loads automatically when working in this folder.

**Provides:**
- ReFi Barcelona organization context and mission
- Team structure and roles
- Core activities and initiatives
- Website structure and navigation
- Design system and branding guidelines

### 2. **website-design.mdc**
**Fetch with:** "design", "styling", "brand", "layout"

**Provides:**
- Design system and visual identity
- Color palette (blue theme with CSS variables)
- Component styling patterns (boxes, cards, grids)
- Typography and spacing guidelines
- Responsive design approach
- Custom SCSS architecture

### 3. **content-structure.mdc**
**Fetch with:** "content", "sections", "pages", "navigation"

**Provides:**
- Website sections and their purpose
- Content organization principles
- Hero section, What We Do, Past Events, About Us
- Ecosystem Map integration
- Footer and navigation structure

### 4. **deployment-workflow.mdc**
**Fetch with:** "deploy", "publish", "github pages", "cloudflare"

**Provides:**
- GitHub Actions deployment workflow
- Custom domain configuration (refibcn.cat)
- Cloudflare DNS setup
- SSL/HTTPS configuration
- Deployment troubleshooting

---

## 🎯 How to Use

### **Automatic Context**
The **project-overview** rule loads automatically when you work in this folder, giving you immediate context about:
- ReFi Barcelona's mission and activities
- Website structure and purpose
- Team and contact information
- Quick reference to design patterns

### **Fetch Specific Context**
Use natural language to load specialized rules:
- "Show me the design system" → Loads website-design
- "How is the content organized?" → Loads content-structure
- "How do I deploy changes?" → Loads deployment-workflow

### **Quick Reference by Task**

**Working on design/styling:**
- Auto-loaded overview + Fetch "website design"
- Reference: `quartz/styles/custom.scss` for all styling

**Adding/editing content:**
- Fetch "content structure"
- Edit: `content/index.md` for homepage
- Preview: `npx quartz build --serve`

**Deploying changes:**
- Fetch "deployment workflow"
- Process: commit → push → automatic GitHub Actions deployment
- Live site: https://refibcn.cat

---

## 📚 Document Integration

**Website Repository:**
- `content/index.md` - Homepage with all sections
- `quartz/styles/custom.scss` - All custom styling
- `quartz/components/` - Custom Quartz components
- `quartz.config.ts` - Site configuration
- `quartz.layout.ts` - Layout configuration

**Design System:**
- Blue color palette with CSS variables
- Box-based card layouts for sections
- Responsive grid systems
- Green hover states and accents
- Consistent spacing (3rem vertical, responsive horizontal)

**Deployment:**
- GitHub Actions: `.github/workflows/deploy.yml`
- Custom domain: `refibcn.cat` via Cloudflare
- SSL/HTTPS enabled
- Automatic deploys on push to main

---

## 🔑 Key Principles

**Design Philosophy:**
- Clean, modern, professional
- Accessibility and readability first
- Mobile-responsive throughout
- Consistent spacing and alignment
- Box-based component design

**Content Approach:**
- Clear, concise messaging
- Action-oriented CTAs
- Showcase activities and impact
- Build trust and credibility
- Easy to update and maintain

**Technical Stack:**
- Quartz v4.5.2 (static site generator)
- TypeScript + SCSS
- GitHub Pages for hosting
- Cloudflare for DNS + SSL
- GitHub Actions for CI/CD

---

## 💡 Benefits

**Efficiency:**
- Instant project context when working
- Design patterns readily available
- Deployment process documented
- No searching through multiple docs

**Consistency:**
- Unified design system
- Standardized components
- Clear content patterns
- Predictable behavior

**Team Alignment:**
- Shared understanding of structure
- Clear roles and responsibilities
- Consistent approach to updates
- Easy onboarding for new contributors

---

## 🔄 Keeping Updated

**Current as of:** October 12, 2025

**Update when:**
- Design system evolves
- New sections or pages added
- Team structure changes
- Deployment process modified
- New features or initiatives launched

**Who updates:**
- Any team member can request updates
- Best practice: Update after significant changes
- Document design decisions in commit messages

---

## ⚡ Quick Start

1. **Just start working** - Overview loads automatically
2. **Edit content** - Files in `content/` folder
3. **Edit styling** - `quartz/styles/custom.scss`
4. **Preview locally** - `npx quartz build --serve`
5. **Deploy** - Commit and push to trigger GitHub Actions
6. **Ask questions** - "What's the design system?" or "How do I deploy?"
7. **Get instant context** - Rules provide relevant information

---

## 🌐 Workflow: Edit → Preview → Deploy

1. **Edit:** Update content in `content/` or styling in `quartz/styles/`
2. **Preview:** Run `npx quartz build --serve` to preview at http://localhost:8080
3. **Commit:** Stage and commit your changes with descriptive message
4. **Push:** Push to main branch to trigger automatic deployment
5. **Verify:** Check https://refibcn.cat after ~1-2 minutes

---

**These rules only apply when working in the `03 Libraries/ReFi-BCN-Website/` repository.**

For questions or updates, contact the ReFi Barcelona team at hola@refibcn.cat.




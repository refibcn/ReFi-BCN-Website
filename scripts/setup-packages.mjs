#!/usr/bin/env node

/**
 * Package Setup Script
 * 
 * Interactive script to select and install packages for the Quartz ReFi template.
 * This script:
 * 1. Prompts user to select packages
 * 2. Copies package files to appropriate locations
 * 3. Updates configuration files
 * 4. Updates package.json scripts
 */

import { select, confirm, text, intro, outro, isCancel, cancel } from "@clack/prompts"
import { execSync } from "child_process"
import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, "..")

const PACKAGES = {
  core: {
    name: "Core",
    description: "Essential Quartz framework (always included)",
    required: true,
  },
  multilang: {
    name: "Multi-language Support",
    description: "Multi-language build script and LanguageSwitcher component",
    required: false,
  },
  analytics: {
    name: "Analytics",
    description: "Plausible Analytics integration",
    required: false,
  },
  comments: {
    name: "Comments",
    description: "Giscus comments system (GitHub Discussions)",
    required: false,
  },
  "og-images": {
    name: "OG Images",
    description: "Custom Open Graph image generation (slows builds)",
    required: false,
  },
  theme: {
    name: "Theme",
    description: "Customizable theme architecture (always included)",
    required: true,
  },
}

async function main() {
  intro("Quartz ReFi Template - Package Setup")

  // Collect site information
  const siteName = await text({
    message: "What is your site name?",
    placeholder: "My ReFi Node",
    initialValue: "My ReFi Node",
  })

  if (isCancel(siteName)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const baseUrl = await text({
    message: "What is your site's base URL? (without https://)",
    placeholder: "example.com",
    initialValue: "example.com",
  })

  if (isCancel(baseUrl)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const defaultLocale = await text({
    message: "Default locale?",
    placeholder: "en-US",
    initialValue: "en-US",
  })

  if (isCancel(defaultLocale)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const githubOrg = await text({
    message: "GitHub organization/username?",
    placeholder: "your-org",
    initialValue: "",
  })

  if (isCancel(githubOrg)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const githubRepo = await text({
    message: "GitHub repository name?",
    placeholder: "your-repo",
    initialValue: "",
  })

  if (isCancel(githubRepo)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  // Select optional packages
  const selectedPackages = await select({
    message: "Select packages to install:",
    options: Object.entries(PACKAGES)
      .filter(([key]) => !PACKAGES[key].required)
      .map(([key, pkg]) => ({
        value: key,
        label: `${pkg.name} - ${pkg.description}`,
      })),
    multiple: true,
  })

  if (isCancel(selectedPackages)) {
    cancel("Setup cancelled.")
    process.exit(0)
  }

  const packagesToInstall = ["core", "theme", ...(Array.isArray(selectedPackages) ? selectedPackages : [selectedPackages])]

  console.log("\n📦 Installing packages...")

  // Install core package (always)
  installCorePackage(siteName, baseUrl, defaultLocale, githubOrg, githubRepo)

  // Install optional packages
  for (const pkg of packagesToInstall) {
    if (pkg === "core" || pkg === "theme") continue

    console.log(`\n📦 Installing ${pkg}...`)
    installPackage(pkg, siteName, baseUrl, defaultLocale, githubOrg, githubRepo)
  }

  // Install theme package
  installThemePackage()

  // Update package.json scripts
  updatePackageJsonScripts(packagesToInstall)

  outro("✨ Setup complete! Run 'npm install' to install dependencies.")

  // Save configuration for future reference
  const config = {
    siteName,
    baseUrl,
    defaultLocale,
    githubOrg,
    githubRepo,
    packages: packagesToInstall,
  }
  writeFileSync(join(rootDir, "setup-config.json"), JSON.stringify(config, null, 2))
}

function installCorePackage(siteName, baseUrl, locale, githubOrg, githubRepo) {
  // Copy template files
  const configTemplate = readFileSync(join(rootDir, "packages/core/quartz.config.ts.template"), "utf-8")
  const layoutTemplate = readFileSync(join(rootDir, "packages/core/quartz.layout.ts.template"), "utf-8")

  // Replace placeholders
  let config = configTemplate
    .replace(/\{\{SITE_NAME\}\}/g, siteName)
    .replace(/\{\{BASE_URL\}\}/g, baseUrl)
    .replace(/\{\{LOCALE\}\}/g, locale)

  let layout = layoutTemplate
    .replace(/\{\{SITE_NAME\}\}/g, siteName)
    .replace(/\{\{BASE_URL\}\}/g, baseUrl)
    .replace(/\{\{GITHUB_ORG\}\}/g, githubOrg)
    .replace(/\{\{GITHUB_REPO\}\}/g, githubRepo)
    .replace(/\{\{LOCALE\}\}/g, locale)

  // Write files
  writeFileSync(join(rootDir, "quartz.config.ts"), config)
  writeFileSync(join(rootDir, "quartz.layout.ts"), layout)

  console.log("✅ Core package installed")
}

function installPackage(pkgName, siteName, baseUrl, locale, githubOrg, githubRepo) {
  const pkgDir = join(rootDir, "packages", pkgName)

  if (!existsSync(pkgDir)) {
    console.log(`⚠️  Package ${pkgName} not found, skipping...`)
    return
  }

  switch (pkgName) {
    case "multilang":
      installMultilangPackage(pkgDir)
      break
    case "analytics":
      installAnalyticsPackage(pkgDir)
      break
    case "comments":
      installCommentsPackage(pkgDir, githubOrg, githubRepo, locale)
      break
    case "og-images":
      installOgImagesPackage()
      break
  }
}

function installMultilangPackage(pkgDir) {
  // Copy build script
  const scriptPath = join(pkgDir, "scripts", "build-multilang.mjs")
  if (existsSync(scriptPath)) {
    const scriptsDir = join(rootDir, "scripts")
    if (!existsSync(scriptsDir)) mkdirSync(scriptsDir, { recursive: true })
    cpSync(scriptPath, join(scriptsDir, "build-multilang.mjs"))
  }

  // Copy LanguageSwitcher component
  const componentPath = join(pkgDir, "components", "LanguageSwitcher.tsx")
  if (existsSync(componentPath)) {
    const componentsDir = join(rootDir, "quartz", "components")
    if (!existsSync(componentsDir)) mkdirSync(componentsDir, { recursive: true })
    cpSync(componentPath, join(componentsDir, "LanguageSwitcher.tsx"))
  }

  // Update quartz.config.ts to add locale support
  updateConfigForMultilang()

  // Update quartz.layout.ts to add LanguageSwitcher
  updateLayoutForMultilang()

  console.log("✅ Multi-language package installed")
}

function installAnalyticsPackage(pkgDir) {
  // Update quartz.config.ts to add analytics
  const configPath = join(rootDir, "quartz.config.ts")
  let config = readFileSync(configPath, "utf-8")

  const analyticsConfig = `    analytics: {
      provider: "plausible",
    },`

  config = config.replace(
    /\/\/ ANALYTICS_CONFIG_PLACEHOLDER.*/,
    analyticsConfig
  )

  writeFileSync(configPath, config)
  console.log("✅ Analytics package installed")
}

function installCommentsPackage(pkgDir, githubOrg, githubRepo, locale) {
  // Copy Comments component
  const componentPath = join(pkgDir, "components", "Comments.tsx")
  if (existsSync(componentPath)) {
    const componentsDir = join(rootDir, "quartz", "components")
    if (!existsSync(componentsDir)) mkdirSync(componentsDir, { recursive: true })
    cpSync(componentPath, join(componentsDir, "Comments.tsx"))
  }

  // Copy Giscus styles
  const giscusDir = join(pkgDir, "static", "giscus")
  if (existsSync(giscusDir)) {
    const staticDir = join(rootDir, "quartz", "static", "giscus")
    if (!existsSync(staticDir)) mkdirSync(staticDir, { recursive: true })
    cpSync(giscusDir, staticDir, { recursive: true })
  }

  // Update quartz.layout.ts to add Comments
  updateLayoutForComments(githubOrg, githubRepo, locale)

  console.log("✅ Comments package installed")
  console.log("⚠️  Don't forget to configure Giscus in quartz.layout.ts with your repo details!")
}

function installOgImagesPackage() {
  // Update quartz.config.ts to add CustomOgImages plugin
  const configPath = join(rootDir, "quartz.config.ts")
  let config = readFileSync(configPath, "utf-8")

  const ogImagesPlugin = `      Plugin.CustomOgImages(),`

  config = config.replace(
    /\/\/ OG_IMAGES_PLACEHOLDER.*/,
    ogImagesPlugin
  )

  writeFileSync(configPath, config)
  console.log("✅ OG Images package installed")
  console.log("⚠️  Note: OG image generation can slow down builds significantly")
}

function installThemePackage() {
  // Copy theme template
  const themeTemplate = join(rootDir, "packages/theme/styles/custom.scss.template")
  if (existsSync(themeTemplate)) {
    const stylesDir = join(rootDir, "quartz", "styles")
    if (!existsSync(stylesDir)) mkdirSync(stylesDir, { recursive: true })
    
    // Check if custom.scss already exists
    const customScssPath = join(stylesDir, "custom.scss")
    if (!existsSync(customScssPath)) {
      const template = readFileSync(themeTemplate, "utf-8")
      writeFileSync(customScssPath, template)
    }
  }

  console.log("✅ Theme package installed")
}

function updateConfigForMultilang() {
  const configPath = join(rootDir, "quartz.config.ts")
  let config = readFileSync(configPath, "utf-8")

  // Already handled by template, but ensure locale is set correctly
  // No changes needed as locale is already configured
}

function updateLayoutForMultilang() {
  const layoutPath = join(rootDir, "quartz.layout.ts")
  let layout = readFileSync(layoutPath, "utf-8")

  // Add LanguageSwitcher to header
  const languageSwitcher = `    Component.LanguageSwitcher(),`

  layout = layout.replace(
    /\/\/ LANGUAGE_SWITCHER_PLACEHOLDER.*/,
    languageSwitcher
  )

  writeFileSync(layoutPath, layout)
}

function updateLayoutForComments(githubOrg, githubRepo, locale) {
  const layoutPath = join(rootDir, "quartz.layout.ts")
  let layout = readFileSync(layoutPath, "utf-8")

  // Add Comments component
  const commentsComponent = `    Component.Comments({
      provider: "giscus",
      options: {
        repo: "${githubOrg}/${githubRepo}",
        repoId: "YOUR_REPO_ID", // Get from giscus.app
        category: "Announcements",
        categoryId: "YOUR_CATEGORY_ID", // Get from giscus.app
        mapping: "url",
        strict: true,
        reactionsEnabled: true,
        inputPosition: "bottom",
        lang: "${locale.split('-')[0]}",
      },
    }),`

  layout = layout.replace(
    /\/\/ COMMENTS_PLACEHOLDER.*/,
    commentsComponent
  )

  writeFileSync(layoutPath, layout)
}

function updatePackageJsonScripts(packages) {
  const packageJsonPath = join(rootDir, "package.json")
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"))

  // Add multilang build script if multilang package is installed
  if (packages.includes("multilang")) {
    packageJson.scripts["build:multilang"] = "node scripts/build-multilang.mjs"
  }

  writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2))
}

main().catch((error) => {
  console.error("❌ Setup failed:", error)
  process.exit(1)
})


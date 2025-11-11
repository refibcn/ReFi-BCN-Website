#!/usr/bin/env node

/**
 * Multi-language build script template
 * 
 * This script builds the Quartz site for multiple locales.
 * Configure LOCALES array below with your desired languages.
 * 
 * Example structure:
 * - en-US (English) -> public/ and public/en/
 * - ca-ES (Catalan) -> public/ca/
 * - es-ES (Spanish) -> public/es/
 * 
 * Then merges static assets and ensures proper structure.
 */

import { execSync } from "child_process"
import { writeFileSync, existsSync, mkdirSync, cpSync, rmSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, "..")

// Configure your locales here
// Format: { code: "locale-code", prefix: "url-prefix", isDefault: true/false }
const LOCALES = [
  { code: "en-US", prefix: "en", isDefault: true },
  // Add more locales as needed:
  // { code: "ca-ES", prefix: "ca", isDefault: false },
  // { code: "es-ES", prefix: "es", isDefault: false },
]

function buildForLocale(locale, prefix, isDefault) {
  console.log(`\n🌍 Building for ${locale.code} (${prefix})...`)
  
  const contentDir = `content/${prefix}`
  const outputDir = isDefault ? "public" : `public/${prefix}`
  
  try {
    // Build the site with environment variables
    execSync(
      `npm run quartz build -- --output ${outputDir} --directory ${contentDir}`,
      { 
        cwd: rootDir,
        stdio: "inherit",
        env: { 
          ...process.env, 
          QUARTZ_LOCALE: locale.code,
          QUARTZ_CONTENT_DIR: contentDir
        }
      }
    )
    
    console.log(`✅ Built ${locale.code} to ${outputDir}`)
  } catch (error) {
    console.error(`❌ Failed to build ${locale.code}:`, error)
    throw error
  }
  
  // If this is the default locale, also copy to public/{prefix}/ for consistency
  if (isDefault && prefix !== "en") {
    const defaultOutputDir = `public/${prefix}`
    if (existsSync("public")) {
      if (!existsSync(defaultOutputDir)) {
        mkdirSync(defaultOutputDir, { recursive: true })
      }
      // Copy index and other files
      if (existsSync("public/index.html")) {
        cpSync("public/index.html", join(defaultOutputDir, "index.html"), { recursive: true })
      }
      // Copy other directories as needed
      const dirsToCopy = ["about", "blog", "events", "ecosystem"]
      dirsToCopy.forEach(dir => {
        if (existsSync(`public/${dir}`)) {
          cpSync(`public/${dir}`, join(defaultOutputDir, dir), { recursive: true })
        }
      })
    }
  }
}

function mergeStaticAssets() {
  console.log("\n📦 Merging static assets...")
  
  // Static assets should be shared across all languages
  // They're already in public/static from the first build
  // Just ensure they're accessible from language subdirectories
  
  const staticDirs = LOCALES
    .filter(locale => !locale.isDefault)
    .map(locale => `public/${locale.prefix}`)
  
  // Also add default locale prefix if not "en"
  const defaultLocale = LOCALES.find(l => l.isDefault)
  if (defaultLocale && defaultLocale.prefix !== "en") {
    staticDirs.push(`public/${defaultLocale.prefix}`)
  }
  
  staticDirs.forEach((dir) => {
    if (existsSync(dir) && existsSync("public/static")) {
      // Create symlink or copy static directory
      const staticLink = join(dir, "static")
      if (!existsSync(staticLink)) {
        try {
          // Try symlink first (Unix)
          execSync(`ln -s ../static ${staticLink}`, { cwd: rootDir })
        } catch {
          // Fallback to copy (Windows or if symlink fails)
          cpSync("public/static", staticLink, { recursive: true })
        }
      }
    }
  })
  
  console.log("✅ Static assets merged")
}

function createRootRedirect() {
  console.log("\n🔀 Creating root redirect...")
  
  const defaultLocale = LOCALES.find(l => l.isDefault)
  const defaultPrefix = defaultLocale ? defaultLocale.prefix : "en"
  
  // Create a simple redirect page at root that detects language
  const redirectHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{SITE_NAME}}</title>
  <script>
    // Detect browser language and redirect
    const lang = navigator.language || navigator.userLanguage;
    const locales = ${JSON.stringify(LOCALES.map(l => ({ prefix: l.prefix, code: l.code })))};
    let redirect = '/${defaultPrefix}/';
    
    // Find matching locale
    for (const locale of locales) {
      if (lang.startsWith(locale.code.split('-')[0])) {
        redirect = '/' + locale.prefix + '/';
        break;
      }
    }
    
    // Check if we're already at root with a path
    const path = window.location.pathname;
    if (path !== '/' && path !== '/index.html') {
      // Preserve the path
      window.location.href = redirect + path.replace(/^\\//, '');
    } else {
      window.location.href = redirect;
    }
  </script>
  <noscript>
    <meta http-equiv="refresh" content="0; url=/${defaultPrefix}/">
  </noscript>
</head>
<body>
  <p>Redirecting... <a href="/${defaultPrefix}/">Click here if you are not redirected</a></p>
</body>
</html>`
  
  writeFileSync(join(rootDir, "public", "index-redirect.html"), redirectHTML)
  console.log("✅ Root redirect created")
}

async function main() {
  console.log("🚀 Starting multi-language build...\n")
  
  // Clean public directory
  if (existsSync("public")) {
    console.log("🧹 Cleaning public directory...")
    rmSync("public", { recursive: true })
  }
  mkdirSync("public", { recursive: true })
  
  // Build each locale
  for (const locale of LOCALES) {
    buildForLocale(locale, locale.prefix, locale.isDefault)
  }
  
  // Merge static assets
  mergeStaticAssets()
  
  // Create root redirect
  createRootRedirect()
  
  console.log("\n✨ Multi-language build complete!")
  console.log("\n📁 Output structure:")
  const defaultLocale = LOCALES.find(l => l.isDefault)
  console.log(`   public/          - ${defaultLocale ? defaultLocale.code : 'Default'} (default)`)
  LOCALES.forEach(locale => {
    if (locale.isDefault && locale.prefix !== "en") {
      console.log(`   public/${locale.prefix}/       - ${locale.code} (explicit)`)
    } else if (!locale.isDefault) {
      console.log(`   public/${locale.prefix}/       - ${locale.code}`)
    }
  })
  console.log("   public/static/   - Shared static assets")
}

main().catch((error) => {
  console.error("❌ Build failed:", error)
  process.exit(1)
})


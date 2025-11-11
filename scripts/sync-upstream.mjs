#!/usr/bin/env node

/**
 * Upstream Sync Helper Script
 * 
 * Helps sync changes from the upstream template repository.
 * Usage: node scripts/sync-upstream.mjs
 */

import { execSync } from "child_process"
import { existsSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, "..")

const UPSTREAM_REPO = "https://github.com/ReFiDAO/quartz-refi-template.git"

async function main() {
  console.log("🔄 Syncing from upstream template repository...\n")

  try {
    // Check if upstream remote exists
    let upstreamExists = false
    try {
      const remotes = execSync("git remote -v", { cwd: rootDir, encoding: "utf-8" })
      upstreamExists = remotes.includes("upstream")
    } catch {
      // Git might not be initialized
    }

    if (!upstreamExists) {
      console.log("📡 Adding upstream remote...")
      execSync(`git remote add upstream ${UPSTREAM_REPO}`, { cwd: rootDir, stdio: "inherit" })
    }

    console.log("📥 Fetching upstream changes...")
    execSync("git fetch upstream", { cwd: rootDir, stdio: "inherit" })

    console.log("\n📊 Checking for changes...")
    const currentBranch = execSync("git branch --show-current", {
      cwd: rootDir,
      encoding: "utf-8",
    }).trim()

    console.log(`\nCurrent branch: ${currentBranch}`)
    console.log("\nTo merge upstream changes, run:")
    console.log(`  git checkout ${currentBranch}`)
    console.log(`  git merge upstream/main`)
    console.log("\nOr create a new branch to review changes:")
    console.log(`  git checkout -b sync-upstream`)
    console.log(`  git merge upstream/main`)

    console.log("\n✨ Fetch complete! Review changes before merging.")
  } catch (error) {
    console.error("❌ Sync failed:", error.message)
    console.log("\nMake sure you're in a git repository and have git installed.")
    process.exit(1)
  }
}

main()


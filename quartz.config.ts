import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */

// Support environment variables for multi-language builds
const LOCALE = (process.env.QUARTZ_LOCALE as string) || "en-US"
const CONTENT_DIR = (process.env.QUARTZ_CONTENT_DIR as string) || "content"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "ReFi Barcelona",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: LOCALE as any,
    baseUrl: "refibcn.cat",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
    typography: {
      header: "Inter",
      body: "Inter",
      code: "IBM Plex Mono",
    },
      colors: {
        lightMode: {
          light: "#E6DFD7",           // warm sand background
          lightgray: "#D8D0C8",        // slightly darker
          gray: "#8F9A9E",             // subtle gray
          darkgray: "#092045",         // dark navy (main text)
          dark: "#092045",             // dark navy (headings)
          secondary: "#1A3A6B",        // medium blue (links)
          tertiary: "#2E5491",         // light blue (hover)
          highlight: "rgba(9, 32, 69, 0.15)",
          textHighlight: "rgba(9, 32, 69, 0.25)",
        },
        darkMode: {
          light: "#0A0F1A",            // very dark navy
          lightgray: "#151D2E",        // light surface
          gray: "#6B7A8F",             // muted gray
          darkgray: "#B8C2D0",         // light gray (main text)
          dark: "#E6DFD7",             // warm sand (headings)
          secondary: "#5E7A9F",        // light blue (links in dark mode)
          tertiary: "#7A93B5",         // lighter blue (hover in dark mode)
          highlight: "rgba(94, 122, 159, 0.15)",
          textHighlight: "rgba(94, 122, 159, 0.25)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config

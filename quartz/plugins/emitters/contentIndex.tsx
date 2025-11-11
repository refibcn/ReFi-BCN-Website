import { Root } from "hast"
import { GlobalConfiguration } from "../../cfg"
import { getDate } from "../../components/Date"
import { escapeHTML } from "../../util/escape"
import { FilePath, FullSlug, SimpleSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { toHtml } from "hast-util-to-html"
import { write } from "./helpers"
import { i18n } from "../../i18n"

export type ContentIndexMap = Map<FullSlug, ContentDetails>
export type ContentDetails = {
  slug: FullSlug
  filePath: FilePath
  title: string
  links: SimpleSlug[]
  tags: string[]
  content: string
  richContent?: string
  date?: Date
  description?: string
}

interface Options {
  enableSiteMap: boolean
  enableRSS: boolean
  rssLimit?: number
  rssFullHtml: boolean
  rssSlug: string
  includeEmptyFiles: boolean
}

const defaultOptions: Options = {
  enableSiteMap: true,
  enableRSS: true,
  rssLimit: 10,
  rssFullHtml: false,
  rssSlug: "rss",
  includeEmptyFiles: true,
}

function generateSiteMap(cfg: GlobalConfiguration, idx: ContentIndexMap): string {
  const base = cfg.baseUrl ?? ""
  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => `<url>
    <loc>https://${joinSegments(base, encodeURI(slug))}</loc>
    ${content.date && `<lastmod>${content.date.toISOString()}</lastmod>`}
  </url>`
  const urls = Array.from(idx)
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .join("")
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`
}

function generateRSSFeed(cfg: GlobalConfiguration, idx: ContentIndexMap, limit?: number, languagePrefix?: string): string {
  const base = cfg.baseUrl ?? ""
  
  // Build the base URL with language prefix if provided
  // languagePrefix can be "ca", "es", "en", or empty/undefined for root English
  let baseUrlWithPrefix = `https://${base}`
  if (languagePrefix && languagePrefix !== "en") {
    baseUrlWithPrefix = `https://${base}/${languagePrefix}`
  } else if (languagePrefix === "en") {
    baseUrlWithPrefix = `https://${base}/en`
  }

  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => {
    // Simplify slug - this removes "index" and trailing slashes
    let urlSlug = simplifySlug(slug)
    
    // Build the full URL with language prefix
    let fullUrl: string
    if (!urlSlug || urlSlug === "/" || urlSlug === "") {
      // Homepage - use language prefix
      if (languagePrefix && languagePrefix !== "en") {
        fullUrl = `https://${base}/${languagePrefix}/`
      } else if (languagePrefix === "en") {
        fullUrl = `https://${base}/en/`
      } else {
        fullUrl = `https://${base}/`
      }
    } else {
      // Other pages - add language prefix if needed
      const cleanSlug = urlSlug.startsWith("/") ? urlSlug.slice(1) : urlSlug
      if (languagePrefix && languagePrefix !== "en") {
        fullUrl = `https://${base}/${languagePrefix}/${cleanSlug}`
      } else if (languagePrefix === "en") {
        fullUrl = `https://${base}/en/${cleanSlug}`
      } else {
        fullUrl = `https://${base}/${cleanSlug}`
      }
    }
    
    return `<item>
    <title>${escapeHTML(content.title)}</title>
    <link>${fullUrl}</link>
    <guid>${fullUrl}</guid>
    <description><![CDATA[ ${content.richContent ?? content.description} ]]></description>
    <pubDate>${content.date?.toUTCString()}</pubDate>
  </item>`
  }

  const items = Array.from(idx)
    .sort(([_, f1], [__, f2]) => {
      if (f1.date && f2.date) {
        return f2.date.getTime() - f1.date.getTime()
      } else if (f1.date && !f2.date) {
        return -1
      } else if (!f1.date && f2.date) {
        return 1
      }

      return f1.title.localeCompare(f2.title)
    })
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .slice(0, limit ?? idx.size)
    .join("")

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
      <title>${escapeHTML(cfg.pageTitle)}</title>
      <link>${baseUrlWithPrefix}</link>
      <description>${!!limit ? i18n(cfg.locale).pages.rss.lastFewNotes({ count: limit }) : i18n(cfg.locale).pages.rss.recentNotes} on ${escapeHTML(
        cfg.pageTitle,
      )}</description>
      <generator>Quartz -- quartz.jzhao.xyz</generator>
      ${items}
    </channel>
  </rss>`
}

export const ContentIndex: QuartzEmitterPlugin<Partial<Options>> = (opts) => {
  opts = { ...defaultOptions, ...opts }
  return {
    name: "ContentIndex",
    async *emit(ctx, content) {
      const cfg = ctx.cfg.configuration
      const linkIndex: ContentIndexMap = new Map()
      for (const [tree, file] of content) {
        const slug = file.data.slug!
        const date = getDate(ctx.cfg.configuration, file.data) ?? new Date()
        if (opts?.includeEmptyFiles || (file.data.text && file.data.text !== "")) {
          linkIndex.set(slug, {
            slug,
            filePath: file.data.relativePath!,
            title: file.data.frontmatter?.title!,
            links: file.data.links ?? [],
            tags: file.data.frontmatter?.tags ?? [],
            content: file.data.text ?? "",
            richContent: opts?.rssFullHtml
              ? escapeHTML(toHtml(tree as Root, { allowDangerousHtml: true }))
              : undefined,
            date: date,
            description: file.data.description ?? "",
          })
        }
      }

      // Extract language prefix from output directory
      // Examples: "public/ca" -> "ca", "public/es" -> "es", "public" -> undefined (root English)
      let languagePrefix: string | undefined = undefined
      const outputPath = ctx.argv.output || ""
      const outputMatch = outputPath.match(/public\/(ca|es|en)$/)
      if (outputMatch) {
        languagePrefix = outputMatch[1]
      } else if (outputPath === "public" || outputPath.endsWith("/public")) {
        // Root English build - no prefix needed, but we can set it to undefined
        languagePrefix = undefined
      }

      if (opts?.enableSiteMap) {
        yield write({
          ctx,
          content: generateSiteMap(cfg, linkIndex),
          slug: "sitemap" as FullSlug,
          ext: ".xml",
        })
      }

      if (opts?.enableRSS) {
        yield write({
          ctx,
          content: generateRSSFeed(cfg, linkIndex, opts.rssLimit, languagePrefix),
          slug: (opts?.rssSlug ?? "index") as FullSlug,
          ext: ".xml",
        })
      }

      const fp = joinSegments("static", "contentIndex") as FullSlug
      const simplifiedIndex = Object.fromEntries(
        Array.from(linkIndex).map(([slug, content]) => {
          // remove description and from content index as nothing downstream
          // actually uses it. we only keep it in the index as we need it
          // for the RSS feed
          delete content.description
          delete content.date
          return [slug, content]
        }),
      )

      yield write({
        ctx,
        content: JSON.stringify(simplifiedIndex),
        slug: fp,
        ext: ".json",
      })
    },
    externalResources: (ctx) => {
      if (opts?.enableRSS) {
        // Determine RSS feed path based on locale
        const locale = ctx.cfg.configuration.locale as string
        let rssPath = "/rss.xml"
        
        // Extract language prefix from locale (e.g., "ca-ES" -> "ca", "es-ES" -> "es")
        if (locale.startsWith("ca-")) {
          rssPath = "/ca/rss.xml"
        } else if (locale.startsWith("es-")) {
          rssPath = "/es/rss.xml"
        } else if (locale.startsWith("en-")) {
          // English can be at root or /en/
          // Default to root for consistency with homepage
          rssPath = "/rss.xml"
        }
        
        return {
          additionalHead: [
            <link
              rel="alternate"
              type="application/rss+xml"
              title="RSS Feed"
              href={`https://${ctx.cfg.configuration.baseUrl}${rssPath}`}
            />,
          ],
        }
      }
    },
  }
}

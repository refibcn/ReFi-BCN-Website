import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { FullSlug } from "../util/path"

const LOCALE_PREFIXES: Record<string, string> = {
  "en-US": "en",
  "ca-ES": "ca",
  "es-ES": "es",
}

function getCurrentLanguage(slug: FullSlug): string {
  const segments = slug.split("/").filter((s) => s.length > 0)
  const firstSegment = segments[0]
  
  if (firstSegment === "ca") return "ca-ES"
  if (firstSegment === "es") return "es-ES"
  if (firstSegment === "en") return "en-US"
  
  return "en-US"
}

function getLanguagePrefix(locale: string, slug: FullSlug): string {
  const prefix = LOCALE_PREFIXES[locale] || "en"
  
  // For English, check if we're explicitly on /en/ path
  if (prefix === "en") {
    const segments = slug.split("/").filter((s) => s.length > 0)
    const firstSegment = segments[0]
    // If slug starts with "en", use /en prefix, otherwise use root
    return firstSegment === "en" ? "/en" : ""
  }
  
  return `/${prefix}`
}

const PageTitle: QuartzComponent = ({ cfg, displayClass, fileData }: QuartzComponentProps) => {
  const title = "ReFi Barcelona"
  const currentSlug = fileData.slug || ("index" as FullSlug)
  // Use cfg.locale as primary source for language detection since slug might not include language prefix
  const currentLang = getCurrentLanguage(currentSlug) || (cfg.locale as string)
  
  // For language prefix, prefer cfg.locale if slug doesn't have language info
  let detectedLang = currentLang
  if (currentLang === "en-US" && cfg.locale !== "en-US") {
    detectedLang = cfg.locale as string
  }
  
  const langPrefix = getLanguagePrefix(detectedLang, currentSlug)
  // Ensure home link has trailing slash for language prefixes
  const homeLink = langPrefix ? `${langPrefix}/` : "/"
  
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={homeLink}>
        <img src="/static/refi-bcn-logo.png" alt="ReFi BCN Logo" class="page-title-logo" />
        <span>{title}</span>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.75rem;
  margin: 0;
  font-family: var(--titleFont);
}

.page-title a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  border-bottom: none;
}

.page-title-logo {
  width: 1.75rem;
  height: 1.75rem;
  display: block;
  object-fit: contain;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor

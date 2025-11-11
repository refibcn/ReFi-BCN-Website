import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/navigation.scss"
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

function getHomepageHashLink(langPrefix: string, hash: string): string {
  // For hash links, we need to ensure they point to the homepage with the correct language prefix
  if (langPrefix) {
    // For /ca, /es, or /en, use /ca/#section, /es/#section, or /en/#section
    return `${langPrefix}/#${hash}`
  } else {
    // For English at root, use /#section
    return `/#${hash}`
  }
}

export default (() => {
  const Navigation: QuartzComponent = ({ displayClass, cfg, fileData }: QuartzComponentProps) => {
    const currentSlug = fileData.slug || ("index" as FullSlug)
    // Use cfg.locale as primary source for language detection since slug might not include language prefix
    const currentLang = getCurrentLanguage(currentSlug) || (cfg.locale as string)
    const navCopy = i18n(cfg.locale).components.navigation
    
    // For language prefix, prefer cfg.locale if slug doesn't have language info
    let detectedLang = currentLang
    if (currentLang === "en-US" && cfg.locale !== "en-US") {
      detectedLang = cfg.locale as string
    }
    
    const langPrefix = getLanguagePrefix(detectedLang, currentSlug)
    
    return (
      <nav class={`navigation ${displayClass ?? ""}`} aria-label="Primary navigation">
        <div class="nav-shell">
          <ul id="nav-menu" class="nav-links">
            <li><a href={getHomepageHashLink(langPrefix, "about")}>{navCopy.about}</a></li>
            <li><a href={getHomepageHashLink(langPrefix, "events")}>{navCopy.events}</a></li>
            <li><a href={getHomepageHashLink(langPrefix, "regenerant-catalunya")}>{navCopy.regenerantCatalunya}</a></li>
            <li><a href={getHomepageHashLink(langPrefix, "ecosystem-map")}>{navCopy.ecosystemMap}</a></li>
            <li><a href={getHomepageHashLink(langPrefix, "contact")}>{navCopy.contact}</a></li>
          </ul>
          <button
            class="nav-toggle action-button"
            type="button"
            aria-controls="nav-menu"
            aria-expanded="false"
            aria-label="Toggle navigation menu"
            data-nav-toggle
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </nav>
    )
  }

  Navigation.css = style
  Navigation.afterDOMLoaded = `
    document.addEventListener('DOMContentLoaded', () => {
      const navigation = document.querySelector('.navigation');
      const navShell = navigation?.querySelector('.nav-shell');
      const navMenu = navigation?.querySelector('#nav-menu');
      const menuButton = navigation?.querySelector('[data-nav-toggle]');

      if (!navigation || !navShell || !navMenu || !menuButton) {
        return;
      }

      let isCollapsed = navigation.hasAttribute('data-collapsed');
      let rafId = null;

      const closeMenu = () => {
        navMenu.classList.remove('open');
        navShell.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
      };

      const openMenu = () => {
        navMenu.classList.add('open');
        navShell.classList.add('menu-open');
        menuButton.setAttribute('aria-expanded', 'true');
        const firstLink = navMenu.querySelector('a');
        if (firstLink instanceof HTMLElement) {
          firstLink.focus();
        }
      };

      const measureNavWidth = () => {
        const originalStyle = navMenu.getAttribute('style') ?? '';
        navMenu.setAttribute(
          'style',
          [
            originalStyle,
            'position:absolute !important',
            'visibility:hidden !important',
            'display:flex !important',
            'flex-direction:row !important',
            'flex-wrap:nowrap !important',
            'white-space:nowrap !important',
            'height:auto !important',
            'max-width:none !important',
          ].join(';')
        );
        const width = navMenu.scrollWidth;
        if (originalStyle) {
          navMenu.setAttribute('style', originalStyle);
        } else {
          navMenu.removeAttribute('style');
        }
        return width;
      };

      const updateCollapsedState = () => {
        rafId = null;
        
        // Ensure elements are still available (in case of DOM changes)
        if (!navigation || !navShell || !navMenu) {
          return;
        }
        
        const available = navShell.clientWidth;
        const needed = measureNavWidth();
        const forceMobile = window.innerWidth <= 768;
        const shouldCollapse = forceMobile || needed + 48 > available;

        // Always update state to ensure accuracy, especially after language changes
        // This prevents stale state when text length changes
        const previousCollapsed = isCollapsed;
        isCollapsed = shouldCollapse;

        if (shouldCollapse) {
          navigation.setAttribute('data-collapsed', 'true');
          // If switching from expanded to collapsed, ensure menu is closed
          if (!previousCollapsed) {
            closeMenu();
          }
        } else {
          navigation.removeAttribute('data-collapsed');
          // Always close menu when expanding
          closeMenu();
        }
      };

      const scheduleUpdate = () => {
        if (rafId !== null) {
          return;
        }
        rafId = window.requestAnimationFrame(updateCollapsedState);
      };

      const forceUpdate = () => {
        // Clear any pending updates and force immediate recalculation
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        // Use double RAF to ensure DOM has fully updated
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            updateCollapsedState();
          });
        });
      };

      const resizeObserver = new ResizeObserver(scheduleUpdate);
      resizeObserver.observe(navigation);
      window.addEventListener('resize', scheduleUpdate);
      updateCollapsedState();

      // Listen to SPA navigation events to recalculate on language switch
      document.addEventListener('nav', () => {
        // Small delay to ensure DOM updated with new language text
        setTimeout(() => {
          forceUpdate();
        }, 0);
      });

      // Watch for text content changes in navigation links (e.g., language switching)
      const mutationObserver = new MutationObserver(() => {
        scheduleUpdate();
      });
      
      mutationObserver.observe(navMenu, {
        childList: true,
        subtree: true,
        characterData: true,
        attributes: false
      });

      menuButton.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navMenu.classList.contains('open')) {
          closeMenu();
          menuButton.focus();
        }
      });

      document.addEventListener('click', (event) => {
        if (!navigation.contains(event.target)) {
          closeMenu();
        }
      });

      navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
      });
    });
  `

  return Navigation
}) satisfies QuartzComponentConstructor

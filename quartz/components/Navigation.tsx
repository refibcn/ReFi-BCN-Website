import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/navigation.scss"
// @ts-ignore
import script from "./scripts/navigation.inline"

export default (() => {
  const Navigation: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <nav class={`navigation ${displayClass ?? ""}`}>
        <button 
          id="mobile-menu-button"
          class="mobile-nav-trigger" 
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <ul id="nav-menu" class="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#events">Events</a></li>
          <li><a href="#regenerant-catalunya">Regenerant Catalunya</a></li>
          <li><a href="#ecosystem-map">Ecosystem Map</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        {/* Overlay for closing menu */}
        <div id="nav-menu-overlay" class="nav-menu-overlay"></div>
      </nav>
    )
  }

  Navigation.css = style
  Navigation.afterDOMLoaded = script
  return Navigation
}) satisfies QuartzComponentConstructor

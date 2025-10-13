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
          class="hamburger" 
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
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


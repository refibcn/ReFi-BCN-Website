import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/navigation.scss"
import script from "./scripts/navigation.inline"

export default (() => {
  const Navigation: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <nav class={`navigation ${displayClass ?? ""}`}>
        <button class="hamburger" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul class="nav-links">
          <li><a href="/about">About</a></li>
          <li><a href="/events">Events</a></li>
          <li><a href="/ecosystem">Ecosystem</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="mailto:hola@refibcn.cat">Contact</a></li>
        </ul>
      </nav>
    )
  }

  Navigation.css = style
  Navigation.afterDOMLoaded = script
  return Navigation
}) satisfies QuartzComponentConstructor


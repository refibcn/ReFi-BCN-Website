import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ cfg, displayClass }: QuartzComponentProps) => {
  const title = "ReFi Barcelona"
  
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href="/">
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

import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <div class="footer-logo">
          <img src="/static/ReFiBCN.png" alt="ReFi Barcelona" />
        </div>
        <div class="footer-content">
          <div class="footer-links">
            <ul>
              {Object.entries(links).map(([text, link], index) => (
                <>
                  {index > 0 && <li class="separator">•</li>}
                  <li>
                    <a href={link}>{text}</a>
                  </li>
                </>
              ))}
            </ul>
          </div>
          <div class="footer-copyright">
            <p>
              {i18n(cfg.locale).components.footer.createdWith}{" "}
              <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a> © {year}
            </p>
          </div>
        </div>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor

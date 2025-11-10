import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/navigation.scss"

export default (() => {
  const Navigation: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <nav class={`navigation ${displayClass ?? ""}`} aria-label="Primary navigation">
        <div class="nav-shell">
          <ul id="nav-menu" class="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#regenerant-catalunya">Regenerant Catalunya</a></li>
            <li><a href="#ecosystem-map">Ecosystem Map</a></li>
            <li><a href="#contact">Contact</a></li>
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
        const available = navShell.clientWidth;
        const needed = measureNavWidth();
        const forceMobile = window.innerWidth <= 768;
        const shouldCollapse = forceMobile || needed + 48 > available;

        if (shouldCollapse === isCollapsed) {
          return;
        }

        isCollapsed = shouldCollapse;

        if (shouldCollapse) {
          navigation.setAttribute('data-collapsed', 'true');
        } else {
          navigation.removeAttribute('data-collapsed');
          closeMenu();
        }
      };

      const scheduleUpdate = () => {
        if (rafId !== null) {
          return;
        }
        rafId = window.requestAnimationFrame(updateCollapsedState);
      };

      const resizeObserver = new ResizeObserver(scheduleUpdate);
      resizeObserver.observe(navigation);
      window.addEventListener('resize', scheduleUpdate);
      updateCollapsedState();

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

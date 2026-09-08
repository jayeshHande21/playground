import { createHeaderBlock } from './headerShared'

export const headerBlock = createHeaderBlock({
  id: 'portfolio-header',
  label: 'Standard Header',
  media: `<svg viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="72" height="48" fill="#f3f3f3"/>
    <rect x="4" y="14" width="64" height="20" fill="#ffffff"/>
    <rect x="8" y="22" width="18" height="4" fill="#111111"/>
    <rect x="40" y="23" width="7" height="2" fill="#111111"/>
    <rect x="49" y="23" width="7" height="2" fill="#111111"/>
    <rect x="58" y="23" width="6" height="2" fill="#111111"/>
  </svg>`,
  html: `
<header class="krw-header" data-gjs-name="Standard header" data-gjs-droppable="false">
  <div class="krw-header__bar" data-gjs-name="Header row" data-gjs-draggable="false">
    <a class="krw-header__logo" href="#top" data-gjs-name="Logo">.KEEROWA</a>
    <nav class="krw-header__nav" data-gjs-name="Navigation" data-gjs-draggable="false">
      <a class="krw-header__link" href="#works" data-gjs-name="Link">Works</a>
      <a class="krw-header__link" href="#about" data-gjs-name="Link">About</a>
      <a class="krw-header__link" href="#contact" data-gjs-name="Link">Contact</a>
    </nav>
  </div>
</header>
`,
  css: `
.krw-header {
  background: #ffffff;
  color: #111111;
}

.krw-header__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: clamp(1.35rem, 3.2vw, 2.15rem) clamp(1.5rem, 5vw, 3.5rem);
}

.krw-header__logo {
  font-family: 'Libre Bodoni', 'Times New Roman', serif;
  font-size: clamp(1.35rem, 2vw, 1.7rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1;
  color: #111111;
  text-decoration: none;
  text-transform: uppercase;
}

.krw-header__nav {
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 2.5rem);
}

.krw-header__link {
  position: relative;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  color: #111111;
  text-decoration: none;
  text-transform: uppercase;
}

.krw-header__link::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: -0.35rem;
  left: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
}

.krw-header__link:hover::after {
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .krw-header__link::after {
    transition: none;
  }
}
`,
})

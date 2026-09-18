import { createHeaderBlock } from './headerShared'

export const headerMastheadBlock = createHeaderBlock({
  id: 'portfolio-header-masthead',
  label: 'Stacked Header',
  media: `<svg viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="72" height="48" fill="#f3f3f3"/>
    <rect x="4" y="8" width="64" height="32" fill="#ffffff"/>
    <rect x="26" y="16" width="20" height="5" fill="#111111"/>
    <rect x="18" y="28" width="8" height="2" fill="#111111"/>
    <rect x="32" y="28" width="8" height="2" fill="#111111"/>
    <rect x="46" y="28" width="8" height="2" fill="#111111"/>
  </svg>`,
  html: `
<header class="krw-mast" data-gjs-name="Stacked header" data-gjs-droppable="false">
  <div class="krw-mast__bar" data-gjs-name="Header row" data-gjs-draggable="false">
    <a class="krw-mast__logo" href="#top" data-gjs-name="Logo" data-content-slot="logo">.KEEROWA</a>
    <nav class="krw-mast__nav" data-gjs-name="Navigation" data-gjs-draggable="false">
      <a class="krw-mast__link" href="#works" data-gjs-name="Link">Works</a>
      <a class="krw-mast__link" href="#about" data-gjs-name="Link">About</a>
      <a class="krw-mast__link" href="#contact" data-gjs-name="Link">Contact</a>
    </nav>
  </div>
</header>
`,
  css: `
.krw-mast {
  background: var(--theme-surface);
  color: var(--theme-text);
}

.krw-mast__bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.15rem;
  padding: clamp(1.75rem, 4vw, 2.75rem) clamp(1.5rem, 5vw, 3.5rem);
}

.krw-mast__logo {
  font-family: var(--theme-font-display);
  font-size: var(--theme-size-logo);
  font-weight: 700;
  letter-spacing: 0.18em;
  line-height: 1;
  color: var(--theme-text);
  text-decoration: none;
  text-transform: uppercase;
}

.krw-mast__nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(1.5rem, 4vw, 2.75rem);
}

.krw-mast__link {
  position: relative;
  font-family: var(--theme-font-body);
  font-size: var(--theme-size-label);
  font-weight: 500;
  letter-spacing: 0.2em;
  color: var(--theme-text);
  text-decoration: none;
  text-transform: uppercase;
}

.krw-mast__link::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: -0.4rem;
  left: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform 220ms ease;
}

.krw-mast__link:hover::after {
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .krw-mast__link::after {
    transition: none;
  }
}
`,
})

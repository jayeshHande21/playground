import { createHeaderBlock } from './headerShared'

export const headerSplitBlock = createHeaderBlock({
  id: 'portfolio-header-split',
  label: 'Centered Header',
  media: `<svg viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="72" height="48" fill="#f3f3f3"/>
    <rect x="4" y="14" width="64" height="20" fill="#ffffff"/>
    <rect x="8" y="23" width="8" height="2" fill="#111111"/>
    <rect x="18" y="23" width="8" height="2" fill="#111111"/>
    <rect x="31" y="21.5" width="10" height="5" fill="#111111"/>
    <rect x="48" y="23" width="8" height="2" fill="#111111"/>
    <rect x="58" y="23" width="6" height="2" fill="#111111"/>
  </svg>`,
  html: `
<header class="krw-split" data-gjs-name="Centered header" data-gjs-droppable="false">
  <div class="krw-split__bar" data-gjs-name="Header row" data-gjs-draggable="false">
    <nav class="krw-split__nav krw-split__nav--start" data-gjs-name="Left navigation" data-gjs-draggable="false">
      <a class="krw-split__link" href="#works" data-gjs-name="Link">Works</a>
      <a class="krw-split__link" href="#about" data-gjs-name="Link">About</a>
    </nav>
    <a class="krw-split__logo" href="#top" data-gjs-name="Logo" data-content-slot="logo">.KEEROWA</a>
    <nav class="krw-split__nav krw-split__nav--end" data-gjs-name="Right navigation" data-gjs-draggable="false">
      <a class="krw-split__link" href="#contact" data-gjs-name="Link">Contact</a>
    </nav>
  </div>
</header>
`,
  css: `
.krw-split {
  background: var(--theme-surface);
  color: var(--theme-text);
}

.krw-split__bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1rem;
  padding: clamp(1.25rem, 3vw, 1.85rem) clamp(1.5rem, 5vw, 3.5rem);
}

.krw-split__logo {
  font-family: var(--theme-font-display);
  font-size: var(--theme-size-logo);
  font-weight: 700;
  letter-spacing: 0.12em;
  line-height: 1;
  color: var(--theme-text);
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
}

.krw-split__nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.krw-split__nav--start {
  justify-content: flex-start;
}

.krw-split__nav--end {
  justify-content: flex-end;
}

.krw-split__link {
  position: relative;
  font-family: var(--theme-font-body);
  font-size: var(--theme-size-label);
  font-weight: 500;
  letter-spacing: 0.16em;
  color: var(--theme-text);
  text-decoration: none;
  text-transform: uppercase;
}

.krw-split__link::after {
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

.krw-split__link:hover::after {
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .krw-split__link::after {
    transition: none;
  }
}
`,
})

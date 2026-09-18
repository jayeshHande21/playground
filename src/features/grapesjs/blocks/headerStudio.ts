import { createHeaderBlock } from './headerShared'

export const headerStudioBlock = createHeaderBlock({
  id: 'portfolio-header-studio',
  label: 'Studio Header',
  media: `<svg viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="72" height="48" fill="#f3f3f3"/>
    <rect x="4" y="12" width="64" height="24" fill="#ffffff"/>
    <rect x="8" y="18" width="14" height="4" fill="#111111"/>
    <rect x="8" y="24" width="10" height="2" fill="#888888"/>
    <rect x="38" y="22" width="7" height="2" fill="#111111"/>
    <rect x="47" y="22" width="7" height="2" fill="#111111"/>
    <rect x="56" y="22" width="7" height="2" fill="#111111"/>
    <line x1="4" y1="36" x2="68" y2="36" stroke="#111111" stroke-width="1"/>
  </svg>`,
  html: `
<header class="krw-studio" data-gjs-name="Studio header" data-gjs-droppable="false">
  <div class="krw-studio__bar" data-gjs-name="Header row" data-gjs-draggable="false">
    <a class="krw-studio__brand" href="#top" data-gjs-name="Brand">
      <span class="krw-studio__name" data-gjs-name="Name" data-content-slot="logo">Keerowa</span>
      <span class="krw-studio__meta" data-gjs-name="Role">Design studio</span>
    </a>
    <nav class="krw-studio__nav" data-gjs-name="Navigation" data-gjs-draggable="false">
      <a class="krw-studio__link" href="#works" data-gjs-name="Link">
        <span class="krw-studio__num">01</span>
        Works
      </a>
      <a class="krw-studio__link" href="#about" data-gjs-name="Link">
        <span class="krw-studio__num">02</span>
        About
      </a>
      <a class="krw-studio__link" href="#contact" data-gjs-name="Link">
        <span class="krw-studio__num">03</span>
        Contact
      </a>
    </nav>
  </div>
</header>
`,
  css: `
.krw-studio {
  background: var(--theme-surface);
  color: var(--theme-text);
  border-bottom: 1px solid var(--theme-text);
}

.krw-studio__bar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  padding: clamp(1.15rem, 2.8vw, 1.75rem) clamp(1.5rem, 5vw, 3.5rem);
}

.krw-studio__brand {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  color: var(--theme-text);
  text-decoration: none;
}

.krw-studio__name {
  font-family: var(--theme-font-display);
  font-size: var(--theme-size-logo);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1;
}

.krw-studio__meta {
  font-family: var(--theme-font-body);
  font-size: var(--theme-size-label);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--theme-text-muted);
}

.krw-studio__nav {
  display: flex;
  align-items: baseline;
  gap: clamp(1.25rem, 3vw, 2rem);
}

.krw-studio__link {
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  font-family: var(--theme-font-body);
  font-size: var(--theme-size-label);
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--theme-text);
  text-decoration: none;
  text-transform: uppercase;
}

.krw-studio__num {
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--theme-text-muted);
}

.krw-studio__link:hover {
  opacity: 0.55;
  transition: opacity 220ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .krw-studio__link:hover {
    transition: none;
  }
}
`,
})

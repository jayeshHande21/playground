import { createFooterBlock } from './sectionShared'

export const footerStudioBlock = createFooterBlock({
  id: 'portfolio-footer-studio',
  label: 'Studio Footer',
  media: `<svg viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="72" height="48" fill="#f3f3f3"/>
    <rect x="4" y="14" width="64" height="20" fill="#ffffff"/>
    <line x1="4" y1="14" x2="68" y2="14" stroke="#111111" stroke-width="1"/>
    <rect x="8" y="20" width="14" height="4" fill="#111111"/>
    <rect x="8" y="26" width="10" height="2" fill="#888888"/>
    <rect x="44" y="23" width="8" height="2" fill="#111111"/>
    <rect x="54" y="23" width="8" height="2" fill="#111111"/>
  </svg>`,
  html: `
<footer class="krw-studio-foot" data-gjs-name="Studio footer" data-gjs-droppable="false">
  <div class="krw-studio-foot__bar" data-gjs-name="Footer row" data-gjs-draggable="false">
    <a class="krw-studio-foot__brand" href="#top" data-gjs-name="Brand">
      <span class="krw-studio-foot__name" data-gjs-name="Name" data-content-slot="logo">Keerowa</span>
      <span class="krw-studio-foot__meta" data-gjs-name="Role">Design studio</span>
    </a>
    <nav class="krw-studio-foot__nav" data-gjs-name="Socials" data-gjs-draggable="false" data-content-slot="socials">
      <a class="krw-studio-foot__link" href="#contact" data-gjs-name="Link">
        <span class="krw-studio-foot__num">01</span>
        Instagram
      </a>
      <a class="krw-studio-foot__link" href="#contact" data-gjs-name="Link">
        <span class="krw-studio-foot__num">02</span>
        Email
      </a>
    </nav>
  </div>
</footer>
`,
  css: `
.krw-studio-foot {
  background: var(--theme-surface);
  color: var(--theme-text);
  border-top: 1px solid var(--theme-text);
}

.krw-studio-foot__bar {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  padding: clamp(1.15rem, 2.8vw, 1.75rem) clamp(1.5rem, 5vw, 3.5rem);
}

.krw-studio-foot__brand {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  color: var(--theme-text);
  text-decoration: none;
}

.krw-studio-foot__name {
  font-family: var(--theme-font-display);
  font-size: var(--theme-size-logo);
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1;
}

.krw-studio-foot__meta {
  font-family: var(--theme-font-body);
  font-size: var(--theme-size-label);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--theme-text-muted);
}

.krw-studio-foot__nav {
  display: flex;
  align-items: baseline;
  gap: clamp(1.25rem, 3vw, 2rem);
}

.krw-studio-foot__link {
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

.krw-studio-foot__num {
  font-size: 0.65rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--theme-text-muted);
}

.krw-studio-foot__link:hover {
  opacity: 0.55;
  transition: opacity 220ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .krw-studio-foot__link:hover {
    transition: none;
  }
}
`,
})

import { createFooterBlock } from './sectionShared'

export const footerBlock = createFooterBlock({
  id: 'portfolio-footer',
  label: 'Standard Footer',
  media: `<svg viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="72" height="48" fill="#f3f3f3"/>
    <rect x="4" y="16" width="64" height="16" fill="#ffffff"/>
    <rect x="8" y="22" width="16" height="4" fill="#111111"/>
    <rect x="42" y="23" width="8" height="2" fill="#111111"/>
    <rect x="52" y="23" width="8" height="2" fill="#111111"/>
  </svg>`,
  html: `
<footer class="krw-footer" data-gjs-name="Standard footer" data-gjs-droppable="false">
  <div class="krw-footer__bar" data-gjs-name="Footer row" data-gjs-draggable="false">
    <a class="krw-footer__logo" href="#top" data-gjs-name="Logo" data-content-slot="logo">.KEEROWA</a>
    <nav class="krw-footer__nav" data-gjs-name="Socials" data-gjs-draggable="false" data-content-slot="socials">
      <a class="krw-footer__link" href="#contact" data-gjs-name="Link">Instagram</a>
      <a class="krw-footer__link" href="#contact" data-gjs-name="Link">Email</a>
    </nav>
  </div>
</footer>
`,
  css: `
.krw-footer {
  background: var(--theme-surface);
  color: var(--theme-text);
}

.krw-footer__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: clamp(1.35rem, 3.2vw, 2.15rem) clamp(1.5rem, 5vw, 3.5rem);
}

.krw-footer__logo {
  font-family: var(--theme-font-display);
  font-size: var(--theme-size-logo);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1;
  color: var(--theme-text);
  text-decoration: none;
  text-transform: uppercase;
}

.krw-footer__nav {
  display: flex;
  align-items: center;
  gap: clamp(1.5rem, 3vw, 2.5rem);
}

.krw-footer__link {
  position: relative;
  font-family: var(--theme-font-body);
  font-size: var(--theme-size-label);
  font-weight: 500;
  letter-spacing: 0.14em;
  color: var(--theme-text);
  text-decoration: none;
  text-transform: uppercase;
}

.krw-footer__link::after {
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

.krw-footer__link:hover::after {
  transform: scaleX(1);
}

@media (prefers-reduced-motion: reduce) {
  .krw-footer__link::after {
    transition: none;
  }
}
`,
})

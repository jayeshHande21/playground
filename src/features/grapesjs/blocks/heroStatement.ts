import { createHeroBlock } from './sectionShared'

export const heroStatementBlock = createHeroBlock({
  id: 'portfolio-hero-statement',
  label: 'Statement Hero',
  media: `<svg viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="72" height="48" fill="#ffffff"/>
    <rect x="8" y="12" width="56" height="10" fill="#111111"/>
    <rect x="20" y="28" width="32" height="3" fill="#111111"/>
    <rect x="24" y="34" width="24" height="2" fill="#b3472e"/>
  </svg>`,
  html: `
<section class="krw-hero-role" data-gjs-name="Statement hero" data-gjs-droppable="false">
  <h1 class="krw-hero-role__title" data-gjs-name="Role">Photographer</h1>
  <p class="krw-hero-role__name" data-gjs-name="Name">Lisa Keerowa</p>
  <p class="krw-hero-role__where" data-gjs-name="Location">Based in San Francisco</p>
</section>
`,
  css: `
.krw-hero-role {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 68vh;
  padding: clamp(4.5rem, 12vw, 8rem) clamp(1.25rem, 4vw, 2.5rem);
  background: var(--theme-surface);
  color: var(--theme-text);
  text-align: center;
}

.krw-hero-role__title {
  margin: 0;
  font-family: var(--theme-font-display);
  font-size: var(--theme-size-display);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 0.9;
  text-transform: uppercase;
}

.krw-hero-role__name {
  margin: 1.35rem 0 0.7rem;
  font-family: var(--theme-font-display);
  font-size: clamp(1.15rem, 2vw, 1.5rem);
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.krw-hero-role__where {
  margin: 0;
  font-family: var(--theme-font-body);
  font-size: var(--theme-size-label);
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--theme-accent);
}
`,
})

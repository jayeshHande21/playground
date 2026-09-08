import { createHeroBlock } from './sectionShared'

export const heroIntroBlock = createHeroBlock({
  id: 'portfolio-hero-intro',
  label: 'Centered Hero',
  media: `<svg viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="72" height="48" fill="#ffffff"/>
    <rect x="22" y="14" width="28" height="2" fill="#b3472e"/>
    <rect x="12" y="22" width="48" height="5" fill="#111111"/>
    <rect x="20" y="30" width="32" height="5" fill="#111111"/>
  </svg>`,
  html: `
<section class="krw-hero" data-gjs-name="Centered hero" data-gjs-droppable="false">
  <p class="krw-hero__where" data-gjs-name="Location">Based in San Francisco</p>
  <h1 class="krw-hero__title" data-gjs-name="Headline">
    <span data-gjs-name="Name">Hey! I'm Lisa Keerowa</span>
    <span data-gjs-name="Role">Photographer</span>
  </h1>
</section>
`,
  css: `
.krw-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 68vh;
  padding: clamp(4.5rem, 12vw, 8rem) clamp(1.5rem, 5vw, 3.5rem);
  background: #ffffff;
  color: #111111;
  text-align: center;
}

.krw-hero__where {
  margin: 0 0 1.35rem;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #b3472e;
}

.krw-hero__title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  font-family: 'Libre Bodoni', 'Times New Roman', serif;
  font-size: clamp(2.1rem, 6.4vw, 4.6rem);
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1.04;
  text-transform: uppercase;
}

.krw-hero__title span {
  display: block;
}
`,
})

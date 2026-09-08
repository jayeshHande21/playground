import { createSectionBlock } from './sectionShared'

export const heroSplitBlock = createSectionBlock({
  id: 'portfolio-hero-split',
  label: 'Split Hero',
  media: `<svg viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="72" height="48" fill="#ffffff"/>
    <rect x="8" y="18" width="26" height="5" fill="#111111"/>
    <rect x="8" y="26" width="20" height="5" fill="#111111"/>
    <rect x="42" y="18" width="22" height="2" fill="#b3472e"/>
    <rect x="42" y="26" width="22" height="4" fill="#111111"/>
  </svg>`,
  html: `
<section class="krw-hero-split" data-gjs-name="Split hero" data-gjs-droppable="false">
  <h1 class="krw-hero-split__title" data-gjs-name="Headline">
    <span data-gjs-name="Name">Hey! I'm Lisa Keerowa</span>
  </h1>
  <div class="krw-hero-split__meta" data-gjs-name="Details">
    <p class="krw-hero-split__where" data-gjs-name="Location">Based in San Francisco</p>
    <p class="krw-hero-split__role" data-gjs-name="Role">Photographer</p>
  </div>
</section>
`,
  css: `
.krw-hero-split {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  align-items: end;
  gap: clamp(1.5rem, 5vw, 4rem);
  min-height: 68vh;
  padding: clamp(4.5rem, 12vw, 8rem) clamp(1.5rem, 5vw, 3.5rem);
  background: #ffffff;
  color: #111111;
}

.krw-hero-split__title {
  margin: 0;
  font-family: 'Libre Bodoni', 'Times New Roman', serif;
  font-size: clamp(2rem, 5.5vw, 4.1rem);
  font-weight: 700;
  letter-spacing: 0.01em;
  line-height: 1.04;
  text-transform: uppercase;
}

.krw-hero-split__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;
  padding-bottom: 0.35rem;
}

.krw-hero-split__where {
  margin: 0;
  font-family: 'Public Sans', system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #b3472e;
}

.krw-hero-split__role {
  margin: 0;
  font-family: 'Libre Bodoni', 'Times New Roman', serif;
  font-size: clamp(1.35rem, 2.4vw, 1.85rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  line-height: 1.1;
  text-transform: uppercase;
}

@media (max-width: 720px) {
  .krw-hero-split {
    grid-template-columns: 1fr;
    align-items: start;
  }
}
`,
})

import { createAboutBlock } from './sectionShared'

export const aboutBlock = createAboutBlock({
  id: 'portfolio-about',
  label: 'Card About',
  media: `<svg viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="72" height="48" fill="#f3f3f3"/>
    <rect x="8" y="6" width="56" height="36" rx="6" fill="#ffffff"/>
    <rect x="14" y="12" width="28" height="6" fill="#111111"/>
    <rect x="14" y="20" width="16" height="6" fill="#111111"/>
    <rect x="34" y="20" width="16" height="8" rx="2" fill="#cfcfcf"/>
    <rect x="14" y="32" width="22" height="2" fill="#111111"/>
    <rect x="14" y="36" width="36" height="2" fill="#d4d4d4"/>
  </svg>`,
  html: `
<section class="krw-about" data-gjs-name="About" data-gjs-droppable="false">
  <div class="krw-about__card" data-gjs-name="About card" data-gjs-draggable="false">
    <h2 class="krw-about__title" data-gjs-name="Title">
      <span class="krw-about__line" data-gjs-name="Title line">about</span>
      <span class="krw-about__row" data-gjs-name="Name row">
        <span class="krw-about__line krw-about__line--me" data-gjs-name="Title line">me.</span>
        <img
          class="krw-about__photo"
          data-gjs-type="image"
          data-gjs-name="Portrait"
          data-content-slot="portrait"
          src="/ai-generate/enhance-fashion.jpg"
          alt="Portrait of Lisa Keerowa"
        />
      </span>
    </h2>
    <div class="krw-about__body" data-gjs-name="Bio">
      <p class="krw-about__hello" data-gjs-name="Greeting">nice to meet you!</p>
      <p class="krw-about__copy" data-gjs-name="Copy">
        I am Lisa Keerowa, a photographer in San Francisco. I make portraits, editorials, and quiet documentary frames. Light, gesture, and the moment between poses are what I look for. This site is a record of that work.
      </p>
    </div>
    <div class="krw-about__footer" data-gjs-name="Footer" data-gjs-draggable="false">
      <a class="krw-about__link" href="#works" data-gjs-name="Link">
        Visit site
        <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
          <path d="M3 11L11 3M11 3H5M11 3V9" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </a>
      <p class="krw-about__sign" data-gjs-name="Signature">~ Lisa</p>
    </div>
  </div>
</section>
`,
  css: `
.krw-about {
  padding: clamp(1.25rem, 4vw, 2.5rem);
  background: var(--theme-bg);
  color: var(--theme-text);
}

.krw-about__card {
  position: relative;
  overflow: hidden;
  max-width: 52rem;
  margin: 0 auto;
  padding: clamp(2.25rem, 6vw, 3.75rem) clamp(1.5rem, 5vw, 3rem) clamp(1.75rem, 4vw, 2.5rem);
  background: var(--theme-surface);
  border-radius: 2rem;
}

.krw-about__title {
  margin: 0;
  font-family: var(--theme-font-display);
  font-size: var(--theme-size-display);
  font-weight: 800;
  letter-spacing: -0.07em;
  line-height: 0.82;
  text-transform: lowercase;
}

.krw-about__line {
  position: relative;
  display: block;
}

.krw-about__line::before {
  content: '';
  position: absolute;
  left: 76%;
  bottom: 100%;
  width: 2px;
  height: 8rem;
  background: var(--theme-text);
}

.krw-about__line--me {
  display: inline-block;
}

.krw-about__line--me::before {
  display: none;
}

.krw-about__line--me::after {
  content: '';
  position: absolute;
  left: 0.18em;
  top: 92%;
  width: 2px;
  height: 4.25rem;
  background: var(--theme-text);
}

.krw-about__row {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 3vw, 1.5rem);
}

.krw-about__photo {
  width: clamp(6.5rem, 18vw, 9.5rem);
  height: clamp(4.25rem, 12vw, 6.25rem);
  border-radius: 0.7rem;
  object-fit: cover;
  filter: grayscale(1);
}

.krw-about__body {
  max-width: 34rem;
  margin-top: 3.25rem;
}

.krw-about__hello {
  margin: 0 0 0.85rem;
  font-family: var(--theme-font-body);
  font-size: clamp(1.15rem, 2.4vw, 1.55rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.2;
  text-transform: lowercase;
}

.krw-about__copy {
  margin: 0;
  font-family: var(--theme-font-body);
  font-size: var(--theme-size-body);
  font-weight: 400;
  line-height: 1.55;
  color: var(--theme-text-muted);
}

.krw-about__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: clamp(2.5rem, 6vw, 4rem);
}

.krw-about__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-height: 44px;
  font-family: var(--theme-font-body);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--theme-text);
  text-decoration: none;
  cursor: pointer;
}

.krw-about__link svg {
  display: block;
}

.krw-about__sign {
  margin: 0;
  font-family: var(--theme-font-body);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}
`,
})

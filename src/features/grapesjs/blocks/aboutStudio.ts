import { createAboutBlock } from './sectionShared'

export const aboutStudioBlock = createAboutBlock({
  id: 'portfolio-about-studio',
  label: 'Studio About',
  media: `<svg viewBox="0 0 72 48" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect width="72" height="48" fill="#f3f3f3"/>
    <rect x="4" y="8" width="28" height="32" fill="#cfcfcf"/>
    <rect x="38" y="12" width="10" height="2" fill="#888888"/>
    <rect x="38" y="18" width="26" height="4" fill="#111111"/>
    <rect x="38" y="26" width="24" height="2" fill="#111111"/>
    <rect x="38" y="30" width="20" height="2" fill="#d4d4d4"/>
  </svg>`,
  html: `
<section class="krw-about-studio" id="about" data-gjs-name="Studio about" data-gjs-droppable="false">
  <div class="krw-about-studio__grid" data-gjs-name="About row" data-gjs-draggable="false">
    <img
      class="krw-about-studio__photo"
      data-gjs-type="image"
      data-gjs-name="Portrait"
      data-content-slot="portrait"
      src="/ai-generate/enhance-fashion.jpg"
      alt="Portrait of Lisa Keerowa"
    />
    <div class="krw-about-studio__copy" data-gjs-name="Bio" data-gjs-draggable="false">
      <p class="krw-about-studio__index" data-gjs-name="Index">02 / About</p>
      <h2 class="krw-about-studio__title" data-gjs-name="Name">Lisa Keerowa</h2>
      <p class="krw-about-studio__role" data-gjs-name="Role">Photographer</p>
      <p class="krw-about-studio__text" data-gjs-name="Copy">
        I make portraits, editorials, and quiet documentary frames in San Francisco. Light, gesture, and the moment between poses are what I look for. This site is a record of that work.
      </p>
      <a class="krw-about-studio__link" href="#works" data-gjs-name="Link">
        Visit site
        <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
          <path d="M3 11L11 3M11 3H5M11 3V9" fill="none" stroke="currentColor" stroke-width="1.5" />
        </svg>
      </a>
    </div>
  </div>
</section>
`,
  css: `
.krw-about-studio {
  background: var(--theme-bg);
  color: var(--theme-text);
  border-top: 1px solid var(--theme-text);
}

.krw-about-studio__grid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: stretch;
  gap: clamp(1.5rem, 5vw, 3.5rem);
  padding: clamp(1.75rem, 5vw, 3rem) clamp(1.5rem, 5vw, 3.5rem);
}

.krw-about-studio__photo {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 16rem;
  object-fit: cover;
  filter: grayscale(1);
}

.krw-about-studio__copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 34rem;
  padding: 0.35rem 0;
}

.krw-about-studio__index {
  margin: 0 0 0.85rem;
  font-family: var(--theme-font-body);
  font-size: var(--theme-size-label);
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--theme-text-muted);
}

.krw-about-studio__title {
  margin: 0;
  font-family: var(--theme-font-display);
  font-size: var(--theme-size-heading);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1;
}

.krw-about-studio__role {
  margin: 0.65rem 0 1.35rem;
  font-family: var(--theme-font-body);
  font-size: var(--theme-size-label);
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--theme-accent);
}

.krw-about-studio__text {
  margin: 0;
  font-family: var(--theme-font-body);
  font-size: var(--theme-size-body);
  font-weight: 400;
  line-height: 1.55;
  color: var(--theme-text-muted);
}

.krw-about-studio__link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  width: fit-content;
  min-height: 44px;
  margin-top: 1.5rem;
  font-family: var(--theme-font-body);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--theme-text);
  text-decoration: none;
  cursor: pointer;
}

.krw-about-studio__link svg {
  display: block;
}

.krw-about-studio__link:hover {
  opacity: 0.55;
  transition: opacity 220ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .krw-about-studio__link:hover {
    transition: none;
  }
}

@media (max-width: 720px) {
  .krw-about-studio__grid {
    grid-template-columns: 1fr;
  }

  .krw-about-studio__photo {
    min-height: 14rem;
  }
}
`,
})

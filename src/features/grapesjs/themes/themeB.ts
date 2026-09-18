import type { ThemeJson } from './types'

export const themeB: ThemeJson = {
  id: 'theme-b',
  name: 'Theme B',
  summary: 'Near-black surfaces, cream type, Outfit',
  tokens: {
    colors: {
      bg: '#0d0d0d',
      surface: '#161616',
      text: '#faf6ed',
      textMuted: '#b8b0a6',
      accent: '#e08a6a',
    },
    fonts: {
      display: "'Outfit', 'Public Sans', system-ui, sans-serif",
      body: "'Public Sans', system-ui, sans-serif",
    },
    type: {
      display: 'clamp(3.2rem, 14vw, 7.5rem)',
      heading: 'clamp(2rem, 5.8vw, 4.2rem)',
      logo: 'clamp(1.4rem, 2.2vw, 1.8rem)',
      body: '0.95rem',
      label: '0.7rem',
    },
  },
  sections: [
    { slot: 'header', blockId: 'portfolio-header-studio' },
    { slot: 'hero', blockId: 'portfolio-hero-split' },
    { slot: 'about', blockId: 'portfolio-about-studio' },
    { slot: 'footer', blockId: 'portfolio-footer-studio' },
  ],
  content: {
    logo: { text: 'Keerowa' },
    socials: {},
    images: {},
  },
}

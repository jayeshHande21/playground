import type { ThemeJson } from './types'
import { defaultThemeTokens } from './tokens'

export const themeA: ThemeJson = {
  id: 'theme-a',
  name: 'Theme A',
  summary: 'Light paper, black type, rust accent, Libre Bodoni',
  tokens: defaultThemeTokens,
  sections: [
    { slot: 'header', blockId: 'portfolio-header' },
    { slot: 'hero', blockId: 'portfolio-hero-intro' },
    { slot: 'about', blockId: 'portfolio-about' },
    { slot: 'footer', blockId: 'portfolio-footer' },
  ],
  content: {
    logo: { text: '.KEEROWA' },
    socials: {},
    images: {},
  },
}

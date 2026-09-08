import type { BlockProperties } from 'grapesjs'
import { headerFontImport } from './headerShared'

export const heroesCategory = {
  id: 'heroes',
  label: 'Heroes',
  open: true,
} as const

export const aboutCategory = {
  id: 'about',
  label: 'About',
  open: true,
} as const

type SectionBlockInput = {
  id: string
  label: string
  media: string
  html: string
  css: string
}

function createCategorizedBlock(
  category: { id: string; label: string; open: boolean },
  { id, label, media, html, css }: SectionBlockInput,
): BlockProperties {
  return {
    id,
    label,
    category,
    select: true,
    media,
    content: `${html}<style>${headerFontImport}${css}</style>`,
  }
}

export function createHeroBlock(input: SectionBlockInput) {
  return createCategorizedBlock(heroesCategory, input)
}

export function createAboutBlock(input: SectionBlockInput) {
  return createCategorizedBlock(aboutCategory, input)
}

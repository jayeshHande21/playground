import type { BlockProperties } from 'grapesjs'
import { registerSectionCss } from './cssRegistry'

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

export const footersCategory = {
  id: 'footers',
  label: 'Footers',
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
  registerSectionCss(id, css)
  return {
    id,
    label,
    category,
    select: true,
    media,
    content: html,
  }
}

export function createHeroBlock(input: SectionBlockInput) {
  return createCategorizedBlock(heroesCategory, input)
}

export function createAboutBlock(input: SectionBlockInput) {
  return createCategorizedBlock(aboutCategory, input)
}

export function createFooterBlock(input: SectionBlockInput) {
  return createCategorizedBlock(footersCategory, input)
}

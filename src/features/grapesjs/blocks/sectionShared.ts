import type { BlockProperties } from 'grapesjs'
import { headerFontImport } from './headerShared'

export const sectionsCategory = {
  id: 'sections',
  label: 'Sections',
  open: true,
} as const

type SectionBlockInput = {
  id: string
  label: string
  media: string
  html: string
  css: string
}

export function createSectionBlock({
  id,
  label,
  media,
  html,
  css,
}: SectionBlockInput): BlockProperties {
  return {
    id,
    label,
    category: sectionsCategory,
    select: true,
    media,
    content: `${html}<style>${headerFontImport}${css}</style>`,
  }
}

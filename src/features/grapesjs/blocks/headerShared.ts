import type { BlockProperties } from 'grapesjs'

export const headersCategory = {
  id: 'headers',
  label: 'Headers',
  open: true,
} as const

export const headerFontImport = `@import url('https://fonts.googleapis.com/css2?family=Libre+Bodoni:wght@500;700&family=Public+Sans:wght@400;500;600&display=swap');`

type HeaderBlockInput = {
  id: string
  label: string
  media: string
  html: string
  css: string
}

export function createHeaderBlock({
  id,
  label,
  media,
  html,
  css,
}: HeaderBlockInput): BlockProperties {
  return {
    id,
    label,
    category: headersCategory,
    select: true,
    media,
    content: `${html}<style>${headerFontImport}${css}</style>`,
  }
}

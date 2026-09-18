export type ThemeSectionSlot = 'header' | 'hero' | 'about' | 'footer'

export type ThemeColorTokens = {
  bg: string
  surface: string
  text: string
  accent: string
  textMuted?: string
}

export type ThemeFontTokens = {
  display: string
  body: string
}

export type ThemeTypeTokens = {
  display: string
  heading: string
  logo: string
  body: string
  label: string
}

export type ThemeTokens = {
  colors: ThemeColorTokens
  fonts: ThemeFontTokens
  type: ThemeTypeTokens
}

export type ThemeSection = {
  slot: ThemeSectionSlot | string
  blockId: string
}

export type ThemeContent = {
  logo: { text: string }
  socials: Record<string, string>
  images: Record<string, string>
}

export type ThemeJson = {
  id: string
  name: string
  summary?: string
  tokens: ThemeTokens
  sections: ThemeSection[]
  content: ThemeContent
}

export type ThemeValidationResult =
  | { ok: true }
  | { ok: false; errors: string[] }

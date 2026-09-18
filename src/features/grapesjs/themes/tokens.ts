import type { Editor } from 'grapesjs'
import type { ThemeTokens } from './types'

export const themeVars = {
  bg: '--theme-bg',
  surface: '--theme-surface',
  text: '--theme-text',
  textMuted: '--theme-text-muted',
  accent: '--theme-accent',
  fontDisplay: '--theme-font-display',
  fontBody: '--theme-font-body',
  sizeDisplay: '--theme-size-display',
  sizeHeading: '--theme-size-heading',
  sizeLogo: '--theme-size-logo',
  sizeBody: '--theme-size-body',
  sizeLabel: '--theme-size-label',
} as const

export const defaultThemeTokens: ThemeTokens = {
  colors: {
    bg: '#f3f3f3',
    surface: '#ffffff',
    text: '#111111',
    textMuted: '#5a5a5a',
    accent: '#b3472e',
  },
  fonts: {
    display: "'Libre Bodoni', 'Times New Roman', serif",
    body: "'Public Sans', system-ui, sans-serif",
  },
  type: {
    display: 'clamp(3.6rem, 16vw, 8.25rem)',
    heading: 'clamp(2.1rem, 6.4vw, 4.6rem)',
    logo: 'clamp(1.35rem, 2vw, 1.7rem)',
    body: '0.92rem',
    label: '0.75rem',
  },
}

export function tokensToDeclarations(tokens: ThemeTokens): Record<string, string> {
  return {
    [themeVars.bg]: tokens.colors.bg,
    [themeVars.surface]: tokens.colors.surface,
    [themeVars.text]: tokens.colors.text,
    [themeVars.textMuted]: tokens.colors.textMuted ?? tokens.colors.text,
    [themeVars.accent]: tokens.colors.accent,
    [themeVars.fontDisplay]: tokens.fonts.display,
    [themeVars.fontBody]: tokens.fonts.body,
    [themeVars.sizeDisplay]: tokens.type.display,
    [themeVars.sizeHeading]: tokens.type.heading,
    [themeVars.sizeLogo]: tokens.type.logo,
    [themeVars.sizeBody]: tokens.type.body,
    [themeVars.sizeLabel]: tokens.type.label,
  }
}

function declarationsToCss(tokens: ThemeTokens) {
  return Object.entries(tokensToDeclarations(tokens))
    .map(([prop, value]) => `    ${prop}: ${value};`)
    .join('\n')
}

export const canvasBaseCss = `
:root {
${declarationsToCss(defaultThemeTokens)}
}

* { box-sizing: border-box; }

html,
body {
  margin: 0;
  background: var(--theme-bg);
  color: var(--theme-text);
  font-family: var(--theme-font-body);
}
`.trim()

export function applyCanvasTokens(editor: Editor, tokens: ThemeTokens) {
  const doc = editor.Canvas.getDocument()
  if (!doc) return

  const root = doc.documentElement
  for (const [prop, value] of Object.entries(tokensToDeclarations(tokens))) {
    root.style.setProperty(prop, value)
  }
}

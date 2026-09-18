import { themeA } from './themeA'
import { themeB } from './themeB'
import type { ThemeJson } from './types'

export { applyTheme } from './applyTheme'
export { canvasBaseCss, applyCanvasTokens, themeVars } from './tokens'
export { injectThemeCanvasCss } from './canvasStyles'
export { validateTheme } from './validateTheme'
export type { ThemeJson, ThemeTokens, ThemeSection, ThemeContent } from './types'
export { themeA, themeB }

export const themes: ThemeJson[] = [themeA, themeB]

export const defaultTheme = themeA

export function getThemeById(id: string) {
  return themes.find((theme) => theme.id === id)
}

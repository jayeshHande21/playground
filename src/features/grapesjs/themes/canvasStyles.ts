import type { Editor } from 'grapesjs'
import { getSectionCss } from '../blocks/cssRegistry'
import { headerFontImport } from '../blocks/headerShared'
import { canvasBaseCss } from './tokens'

const THEME_STYLE_ID = 'portfolio-theme-css'

export function getThemeCanvasCss() {
  return `
${canvasBaseCss}
${headerFontImport}
${getSectionCss()}

html,
body {
  background-color: var(--theme-bg) !important;
  color: var(--theme-text);
  font-family: var(--theme-font-body);
}
`.trim()
}

export function injectThemeCanvasCss(editor: Editor) {
  const doc = editor.Canvas.getDocument()
  if (!doc) return

  let el = doc.getElementById(THEME_STYLE_ID) as HTMLStyleElement | null
  if (!el) {
    el = doc.createElement('style')
    el.id = THEME_STYLE_ID
    doc.head.appendChild(el)
  }
  el.textContent = getThemeCanvasCss()
}

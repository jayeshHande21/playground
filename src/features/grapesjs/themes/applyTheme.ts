import type { Component, Editor } from 'grapesjs'
import { getBlockById } from '../blocks'
import { applyCanvasTokens } from './tokens'
import { injectThemeCanvasCss } from './canvasStyles'
import type { ThemeContent, ThemeJson } from './types'
import { validateTheme } from './validateTheme'

function blockHtml(blockId: string) {
  const content = getBlockById(blockId)?.content
  return typeof content === 'string' ? content : ''
}

function setText(component: Component, text: string) {
  component.components(text)
}

function applyContentSlots(editor: Editor, content: ThemeContent) {
  const wrapper = editor.getWrapper()
  if (!wrapper) return

  if (content.logo.text) {
    wrapper.find('[data-content-slot="logo"]').forEach((component) => {
      setText(component, content.logo.text)
    })
  }

  const socials = Object.entries(content.socials)
  if (socials.length > 0) {
    const html = socials
      .map(([label, href]) => `<a href="${href}">${label}</a>`)
      .join('')
    wrapper.find('[data-content-slot="socials"]').forEach((component) => {
      component.components(html)
    })
  }

  for (const [slot, src] of Object.entries(content.images)) {
    if (!src) continue
    wrapper.find(`[data-content-slot="${slot}"]`).forEach((component) => {
      component.set('src', src)
      component.addAttributes({ src })
    })
  }
}

export function applyTheme(editor: Editor, json: ThemeJson) {
  const validation = validateTheme(json)
  if (!validation.ok) {
    console.error('[applyTheme] invalid theme', validation.errors)
    return false
  }

  editor.setStyle('')
  editor.setComponents('')

  for (const section of json.sections) {
    const html = blockHtml(section.blockId)
    if (html) editor.addComponents(html)
  }

  applyContentSlots(editor, json.content)
  injectThemeCanvasCss(editor)
  applyCanvasTokens(editor, json.tokens)
  return true
}

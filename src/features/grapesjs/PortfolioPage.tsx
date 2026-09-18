import { useEffect, useRef, useState } from 'react'
import grapesjs, { type Editor } from 'grapesjs'
import { ArrowLeft } from '@phosphor-icons/react'
import BackLink from '../../shared/components/BackLink'
import { editorOptions } from './config/editorConfig'
import { ThemeGallery } from './ThemeGallery'
import {
  applyCanvasTokens,
  applyTheme,
  injectThemeCanvasCss,
  themes,
  type ThemeJson,
} from './themes'
import 'grapesjs/dist/css/grapes.min.css'
import './portfolio.css'

type PortfolioEditorProps = {
  theme: ThemeJson
  onChangeTheme: () => void
}

function PortfolioEditor({ theme, onChangeTheme }: PortfolioEditorProps) {
  const editorEl = useRef<HTMLDivElement>(null)
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    const container = editorEl.current
    if (!container) return

    let editor: Editor | undefined
    const timer = window.setTimeout(() => {
      editor = grapesjs.init({
        ...editorOptions,
        container,
      })
      editor.Panels.getButton('views', 'open-blocks')?.set('active', true)

      editor.on('load', () => {
        applyTheme(editor!, themeRef.current)
      })
      editor.on('canvas:frame:load', () => {
        injectThemeCanvasCss(editor!)
        applyCanvasTokens(editor!, themeRef.current.tokens)
      })
    }, 0)

    return () => {
      window.clearTimeout(timer)
      editor?.destroy()
    }
  }, [])

  return (
    <div className="portfolio-page">
      <div className="portfolio-page__bar">
        <button
          type="button"
          className="portfolio-page__themes"
          onClick={onChangeTheme}
        >
          <ArrowLeft size={16} weight="bold" aria-hidden="true" />
          Themes
        </button>
        <p className="portfolio-page__current">{theme.name}</p>
      </div>
      <div className="portfolio-page__editor" ref={editorEl} />
    </div>
  )
}

export default function PortfolioPage() {
  const [theme, setTheme] = useState<ThemeJson | null>(null)

  if (!theme) {
    return (
      <div className="theme-gallery-page">
        <BackLink className="theme-gallery-page__back" />
        <ThemeGallery themes={themes} onSelect={setTheme} />
      </div>
    )
  }

  return (
    <PortfolioEditor theme={theme} onChangeTheme={() => setTheme(null)} />
  )
}

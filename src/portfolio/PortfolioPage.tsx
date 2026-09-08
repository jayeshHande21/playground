import { useEffect, useRef } from 'react'
import grapesjs, { type Editor } from 'grapesjs'
import { ArrowLeft } from '@phosphor-icons/react'
import { editorOptions } from './editorConfig'
import 'grapesjs/dist/css/grapes.min.css'
import './portfolio.css'

export default function PortfolioPage() {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = editorRef.current
    if (!container) return

    let editor: Editor | undefined
    const timer = window.setTimeout(() => {
      editor = grapesjs.init({
        ...editorOptions,
        container,
      })
      editor.Panels.getButton('views', 'open-blocks')?.set('active', true)
    }, 0)

    return () => {
      window.clearTimeout(timer)
      editor?.destroy()
    }
  }, [])

  return (
    <div className="portfolio-page">
      <header className="portfolio-page__bar">
        <div className="portfolio-page__brand">
          <span className="portfolio-page__kicker">AI Studio</span>
          <h1 className="portfolio-page__title">Portfolio editor</h1>
        </div>
        <a className="portfolio-page__back" href="/">
          <ArrowLeft size={18} weight="bold" aria-hidden="true" />
          Back to studio
        </a>
      </header>
      <div className="portfolio-page__editor" ref={editorRef} />
    </div>
  )
}

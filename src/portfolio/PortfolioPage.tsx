import { useEffect, useRef } from 'react'
import grapesjs, { type Editor } from 'grapesjs'
import { editorOptions } from './editorConfig'
import 'grapesjs/dist/css/grapes.min.css'
import '../home.css'
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
      <div className="portfolio-page__back">
        <a className="back-home" href="/">
          Back to playground
        </a>
      </div>
      <div className="portfolio-page__editor" ref={editorRef} />
    </div>
  )
}

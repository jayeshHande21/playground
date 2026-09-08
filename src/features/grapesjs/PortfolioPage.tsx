import { useEffect, useRef } from 'react'
import grapesjs, { type Editor } from 'grapesjs'
import BackLink from '../../shared/components/BackLink'
import { editorOptions } from './config/editorConfig'
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
      <BackLink className="portfolio-page__back" />
      <div className="portfolio-page__editor" ref={editorRef} />
    </div>
  )
}

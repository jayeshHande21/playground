import type { EditorConfig } from 'grapesjs'
import { editorBlocks } from '../blocks'

export const PORTFOLIO_STORAGE_KEY = 'gjs-portfolio'

export const canvasFonts =
  'https://fonts.googleapis.com/css2?family=Libre+Bodoni:wght@500;700&family=Public+Sans:wght@400;500;600&display=swap'

export const editorOptions: EditorConfig = {
  height: '100%',
  width: 'auto',
  storageManager: false,
  fromElement: false,
  noticeOnUnload: false,
  canvas: {
    styles: [canvasFonts],
  },
  style: `
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #f3f3f3;
      font-family: 'Public Sans', system-ui, sans-serif;
    }
  `,
  blockManager: {
    blocks: editorBlocks,
  },
  components: '',
}

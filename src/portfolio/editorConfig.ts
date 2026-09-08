import type { EditorConfig } from 'grapesjs'

export const PORTFOLIO_STORAGE_KEY = 'gjs-portfolio'

export const starterComponents = `
<section style="padding: 72px 24px; max-width: 720px; margin: 0 auto; font-family: system-ui, sans-serif;">
  <h1>Your name</h1>
  <p>Personal portfolio. Open the blocks panel, then drag sections onto the canvas.</p>
</section>
`

export const editorOptions: EditorConfig = {
  height: '100%',
  width: 'auto',
  storageManager: false,
  fromElement: false,
  noticeOnUnload: false,
  blockManager: {
    blocks: [
      {
        id: 'section',
        label: 'Section',
        content: `<section style="padding: 48px 24px;">
          <h2>Section title</h2>
          <p>Add your content here.</p>
        </section>`,
      },
      {
        id: 'text',
        label: 'Text',
        content: '<div data-gjs-type="text">Insert your text here</div>',
      },
      {
        id: 'image',
        label: 'Image',
        select: true,
        activate: true,
        content: { type: 'image' },
      },
    ],
  },
  components: starterComponents,
}

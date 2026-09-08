import type { BlockProperties } from 'grapesjs'
import { headerBlock } from './header'
import { headerSplitBlock } from './headerSplit'
import { headerMastheadBlock } from './headerMasthead'
import { headerStudioBlock } from './headerStudio'

export const sectionBlocks: BlockProperties[] = [
  headerBlock,
  headerSplitBlock,
  headerMastheadBlock,
  headerStudioBlock,
]

export const basicBlocks: BlockProperties[] = [
  {
    id: 'section',
    label: 'Section',
    category: 'Basic',
    content: `<section style="padding: 48px 24px;">
      <h2>Section title</h2>
      <p>Add your content here.</p>
    </section>`,
  },
  {
    id: 'text',
    label: 'Text',
    category: 'Basic',
    content: '<div data-gjs-type="text">Insert your text here</div>',
  },
  {
    id: 'image',
    label: 'Image',
    category: 'Basic',
    select: true,
    activate: true,
    content: { type: 'image' },
  },
]

export const editorBlocks = [...sectionBlocks, ...basicBlocks]

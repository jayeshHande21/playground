declare module 'grapesjs-blocks-basic' {
  import type { Plugin } from 'grapesjs'

  const plugin: Plugin<{
    flexGrid?: boolean
    category?: string
  }>

  export default plugin
}

declare module 'grapesjs-preset-webpage' {
  import type { Plugin } from 'grapesjs'

  const plugin: Plugin<{
    blocks?: string[]
    useCustomTheme?: boolean
  }>

  export default plugin
}

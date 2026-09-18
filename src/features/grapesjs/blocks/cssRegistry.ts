const cssById = new Map<string, string>()

export function registerSectionCss(id: string, css: string) {
  cssById.set(id, css)
}

export function getSectionCss() {
  return [...cssById.values()].join('\n')
}

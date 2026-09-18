import { getBlockById } from '../blocks'
import type { ThemeJson, ThemeTokens, ThemeValidationResult } from './types'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function requireString(
  value: unknown,
  path: string,
  errors: string[],
): value is string {
  if (typeof value !== 'string' || value.trim() === '') {
    errors.push(`${path} is required`)
    return false
  }
  return true
}

function validateTokens(tokens: unknown, errors: string[]) {
  if (!isRecord(tokens)) {
    errors.push('tokens is required')
    return
  }

  if (!isRecord(tokens.colors)) {
    errors.push('tokens.colors is required')
  } else {
    requireString(tokens.colors.bg, 'tokens.colors.bg', errors)
    requireString(tokens.colors.surface, 'tokens.colors.surface', errors)
    requireString(tokens.colors.text, 'tokens.colors.text', errors)
    requireString(tokens.colors.accent, 'tokens.colors.accent', errors)
  }

  if (!isRecord(tokens.fonts)) {
    errors.push('tokens.fonts is required')
  } else {
    requireString(tokens.fonts.display, 'tokens.fonts.display', errors)
    requireString(tokens.fonts.body, 'tokens.fonts.body', errors)
  }

  if (!isRecord(tokens.type)) {
    errors.push('tokens.type is required')
  } else {
    requireString(tokens.type.display, 'tokens.type.display', errors)
    requireString(tokens.type.heading, 'tokens.type.heading', errors)
    requireString(tokens.type.logo, 'tokens.type.logo', errors)
    requireString(tokens.type.body, 'tokens.type.body', errors)
    requireString(tokens.type.label, 'tokens.type.label', errors)
  }
}

function validateContent(content: unknown, errors: string[]) {
  if (!isRecord(content)) {
    errors.push('content is required')
    return
  }

  if (!isRecord(content.logo) || !requireString(content.logo.text, 'content.logo.text', errors)) {
    if (!isRecord(content.logo)) errors.push('content.logo.text is required')
  }

  if (!isRecord(content.socials)) {
    errors.push('content.socials is required')
  }

  if (!isRecord(content.images)) {
    errors.push('content.images is required')
  }
}

export function validateTheme(input: unknown): ThemeValidationResult {
  const errors: string[] = []

  if (!isRecord(input)) {
    return { ok: false, errors: ['theme must be an object'] }
  }

  requireString(input.id, 'id', errors)
  requireString(input.name, 'name', errors)
  validateTokens(input.tokens, errors)
  validateContent(input.content, errors)

  if (!Array.isArray(input.sections) || input.sections.length === 0) {
    errors.push('sections must contain at least one block')
  } else {
    input.sections.forEach((section, index) => {
      if (!isRecord(section)) {
        errors.push(`sections[${index}] is required`)
        return
      }

      requireString(section.slot, `sections[${index}].slot`, errors)

      if (!requireString(section.blockId, `sections[${index}].blockId`, errors)) {
        return
      }

      if (!getBlockById(section.blockId)) {
        errors.push(`sections[${index}].blockId "${section.blockId}" is not in the block registry`)
      }
    })
  }

  return errors.length === 0 ? { ok: true } : { ok: false, errors }
}

export function assertThemeJson(input: unknown): input is ThemeJson {
  return validateTheme(input).ok
}

export function isThemeTokens(value: unknown): value is ThemeTokens {
  const errors: string[] = []
  validateTokens(value, errors)
  return errors.length === 0
}

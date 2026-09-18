import { ArrowRight } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import type { CSSProperties } from 'react'
import { getBlockById } from './blocks'
import type { ThemeJson } from './themes'

type ThemeGalleryProps = {
  themes: ThemeJson[]
  onSelect: (theme: ThemeJson) => void
}

const easeOut = [0.22, 1, 0.36, 1] as const

function previewVars(theme: ThemeJson): CSSProperties {
  const { colors, fonts } = theme.tokens
  return {
    '--preview-bg': colors.bg,
    '--preview-surface': colors.surface,
    '--preview-text': colors.text,
    '--preview-muted': colors.textMuted ?? colors.text,
    '--preview-accent': colors.accent,
    '--preview-display': fonts.display,
    '--preview-body': fonts.body,
  } as CSSProperties
}

function ThemePreview({ theme }: { theme: ThemeJson }) {
  const headerId = theme.sections.find((section) => section.slot === 'header')?.blockId
  const heroId = theme.sections.find((section) => section.slot === 'hero')?.blockId
  const aboutId = theme.sections.find((section) => section.slot === 'about')?.blockId
  const studio = headerId === 'portfolio-header-studio'
  const split = heroId === 'portfolio-hero-split'
  const studioAbout = aboutId === 'portfolio-about-studio'

  return (
    <div
      className="theme-preview"
      data-layout={studio ? 'studio' : 'paper'}
      style={previewVars(theme)}
      aria-hidden="true"
    >
      <div className="theme-preview__header">
        <span className="theme-preview__logo">{theme.content.logo.text}</span>
        {studio ? (
          <span className="theme-preview__nav">01 Works · 02 About</span>
        ) : (
          <span className="theme-preview__nav">Works · About · Contact</span>
        )}
      </div>
      <div className={`theme-preview__hero${split ? ' theme-preview__hero--split' : ''}`}>
        <span className="theme-preview__kicker">Based in San Francisco</span>
        <span className="theme-preview__headline">
          {split ? (
            <>
              Hey! I&apos;m Lisa
              <br />
              Keerowa
            </>
          ) : (
            <>
              Hey! I&apos;m Lisa Keerowa
              <br />
              Photographer
            </>
          )}
        </span>
        {split ? <span className="theme-preview__role">Photographer</span> : null}
      </div>
      <div
        className={`theme-preview__about${studioAbout ? ' theme-preview__about--studio' : ''}`}
      >
        {studioAbout ? (
          <>
            <span className="theme-preview__photo" />
            <span className="theme-preview__bio">
              <span className="theme-preview__index">02 / About</span>
              <span className="theme-preview__who">Lisa Keerowa</span>
            </span>
          </>
        ) : (
          <div className="theme-preview__card">
            about <span>me.</span>
          </div>
        )}
      </div>
    </div>
  )
}

export function ThemeGallery({ themes, onSelect }: ThemeGalleryProps) {
  const reduceMotion = useReducedMotion()

  return (
    <main className="theme-gallery">
      <header className="theme-gallery__intro">
        <p className="theme-gallery__eyebrow">Portfolio editor</p>
        <h1 className="theme-gallery__title">Choose a theme</h1>
        <p className="theme-gallery__lead">
          Open a starting layout. After it loads, you can still edit copy and swap sections.
        </p>
      </header>
      <ul className="theme-gallery__grid">
        {themes.map((theme, index) => {
          const sections = theme.sections
            .map((section) => getBlockById(section.blockId)?.label)
            .filter((label): label is string => Boolean(label))

          return (
            <li key={theme.id}>
              <motion.button
                type="button"
                className="theme-gallery__card"
                aria-label={`Open ${theme.name}. ${theme.summary ?? ''}`}
                onClick={() => onSelect(theme)}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.4, delay: index * 0.08, ease: easeOut }
                }
                whileHover={reduceMotion ? undefined : { y: -4 }}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              >
                <ThemePreview theme={theme} />
                <span className="theme-gallery__meta">
                  <span className="theme-gallery__name">{theme.name}</span>
                  {theme.summary ? (
                    <span className="theme-gallery__summary">{theme.summary}</span>
                  ) : null}
                  <span className="theme-gallery__sections">
                    {sections.join(' · ')}
                  </span>
                  <span className="theme-gallery__cta">
                    Open editor
                    <ArrowRight size={16} weight="bold" aria-hidden="true" />
                  </span>
                </span>
              </motion.button>
            </li>
          )
        })}
      </ul>
    </main>
  )
}

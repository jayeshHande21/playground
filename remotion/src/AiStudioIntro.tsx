import type { CSSProperties } from 'react'
import { AbsoluteFill, Img, interpolate, useCurrentFrame } from 'remotion'
import { Cover } from './Cover'
import { media } from './media'
import { colors, fonts } from './theme'

export const INTRO_FPS = 30
export const INTRO_WIDTH = 1280
export const INTRO_HEIGHT = 720
export const INTRO_DURATION = 600

function clamp(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

function sceneOpacity(frame: number, start: number, end: number, fade = 8) {
  if (end >= INTRO_DURATION) {
    return interpolate(frame, [start, start + fade], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  }
  return interpolate(frame, [start, start + fade, end - fade, end], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

function typeOut(text: string, frame: number, start: number, perChar = 2) {
  const count = Math.round(
    interpolate(frame, [start, start + text.length * perChar], [0, text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  )
  return text.slice(0, count)
}

function Meta({ light }: { light?: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 28,
        right: 36,
        textAlign: 'right',
        fontFamily: fonts.mono,
        fontSize: 11,
        letterSpacing: '0.08em',
        lineHeight: 1.45,
        color: light ? 'rgba(45, 38, 32, 0.55)' : 'rgba(253, 191, 54, 0.72)',
      }}
    >
      AI STUDIO
      <br />
      GENERATE + ENHANCE — 2026
    </div>
  )
}

function Spark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        d="M9 1 L10.1 7 L16 6.4 L11.2 9.4 L16 13.2 L10.1 11.2 L9 17 L7.9 11.2 L2 13.2 L6.8 9.4 L2 6.4 L7.9 7 Z"
        fill={colors.action}
      />
    </svg>
  )
}

function Corners() {
  const arm = 22
  const inset = 22
  const bar: CSSProperties = {
    position: 'absolute',
    background: 'rgba(253, 191, 54, 0.55)',
  }
  return (
    <>
      <span style={{ ...bar, top: inset, left: inset, width: arm, height: 1 }} />
      <span style={{ ...bar, top: inset, left: inset, width: 1, height: arm }} />
      <span style={{ ...bar, top: inset, right: inset, width: arm, height: 1 }} />
      <span style={{ ...bar, top: inset, right: inset, width: 1, height: arm }} />
      <span style={{ ...bar, bottom: inset, left: inset, width: arm, height: 1 }} />
      <span style={{ ...bar, bottom: inset, left: inset, width: 1, height: arm }} />
      <span style={{ ...bar, bottom: inset, right: inset, width: arm, height: 1 }} />
      <span style={{ ...bar, bottom: inset, right: inset, width: 1, height: arm }} />
    </>
  )
}

function Rings({ scale }: { scale: number }) {
  return (
    <div
      style={{
        position: 'absolute',
        right: -180,
        top: '50%',
        width: 620,
        height: 620,
        transform: `translateY(-50%) scale(${scale})`,
        pointerEvents: 'none',
      }}
    >
      {[620, 460, 300, 160].map((size) => (
        <div
          key={size}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: size,
            height: size,
            margin: `${-size / 2}px 0 0 ${-size / 2}px`,
            border: '1px solid rgba(253, 191, 54, 0.18)',
            borderRadius: '50%',
          }}
        />
      ))}
    </div>
  )
}

function MethodCard({ frame }: { frame: number }) {
  const typed = typeOut('ESSENCE', frame, 18, 2)
  const caretOn = Math.floor(frame / 8) % 2 === 0
  const ring = interpolate(frame, [0, 70], [0.86, 1.04], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily: fonts.display }}>
      <Rings scale={ring} />
      <Corners />
      <Meta />
      <div
        style={{
          position: 'absolute',
          right: 28,
          top: 120,
        }}
      >
        <Spark />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 72,
          bottom: 88,
          color: colors.white,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            color: 'rgba(250, 246, 237, 0.72)',
          }}
        >
          THE LOOK
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
            color: colors.gold,
          }}
        >
          {typed}
          <span style={{ opacity: caretOn ? 1 : 0 }}>|</span>
        </div>
      </div>
    </AbsoluteFill>
  )
}

function GhostType({ frame }: { frame: number }) {
  const lock = interpolate(frame, [8, 28], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const second = clamp(frame, 36, 52)

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        backgroundColor: colors.ink,
        fontFamily: fonts.display,
      }}
    >
      <Meta />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-6%',
          top: '-18%',
          width: '120%',
          color: 'transparent',
          WebkitTextStroke: `2.5px ${colors.gold}`,
          fontSize: 248,
          fontWeight: 800,
          letterSpacing: '-0.07em',
          lineHeight: 0.82,
          textTransform: 'lowercase',
        }}
      >
        studio
        <br />
        studio
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '46%',
          textAlign: 'center',
          color: colors.gold,
          fontSize: 42,
          fontWeight: 600,
          letterSpacing: '-0.03em',
          transform: `translateY(${lock}px)`,
        }}
      >
        {second > 0.5 ? 'render it.' : 'imagine it.'}
      </div>
      <div
        style={{
          position: 'absolute',
          right: 28,
          top: 120,
          opacity: clamp(frame, 10, 22),
        }}
      >
        <Spark />
      </div>
    </AbsoluteFill>
  )
}

function TwoPaths({ frame }: { frame: number }) {
  const bars = clamp(frame, 12, 28)

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.steel,
        backgroundImage:
          'repeating-linear-gradient(0deg, rgba(20, 18, 16, 0.1) 0px, rgba(20, 18, 16, 0.1) 1px, transparent 1px, transparent 3px)',
        fontFamily: fonts.mono,
      }}
    >
      <Meta light />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 22,
          color: colors.goldDark,
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: '0.02em' }}>
          two paths
        </div>
        <div style={{ display: 'flex', gap: 14, transform: `scaleY(${0.2 + bars * 0.8})` }}>
          <div style={{ width: 18, height: 72, background: colors.goldDark }} />
          <div style={{ width: 18, height: 72, background: colors.goldDark }} />
        </div>
        <div
          style={{
            display: 'flex',
            gap: 28,
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            opacity: bars,
          }}
        >
          <span>Generate</span>
          <span>Enhance</span>
        </div>
      </div>
    </AbsoluteFill>
  )
}

const stills = [
  { src: media.watercolor, label: 'Generate', position: 'center top' },
  { src: media.royal, label: 'Generate', position: 'center 8%' },
  { src: media.enhanceConcert, label: 'Enhance', position: 'center 42%' },
  { src: media.enhanceTravel, label: 'Enhance', position: 'center 38%' },
] as const

function FeatureBoard({ frame }: { frame: number }) {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink, fontFamily: fonts.body }}>
      <Meta />
      <div
        style={{
          position: 'absolute',
          inset: '72px 48px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 12,
        }}
      >
        {stills.map((still, index) => {
          const enter = clamp(frame, 6 + index * 8, 20 + index * 8)
          return (
            <div
              key={still.label + still.src}
              style={{
                position: 'relative',
                overflow: 'hidden',
                opacity: enter,
                transform: `translateY(${interpolate(enter, [0, 1], [16, 0])}px)`,
              }}
            >
              <Cover src={still.src} position={still.position} />
              <span
                style={{
                  position: 'absolute',
                  left: 10,
                  bottom: 10,
                  padding: '3px 8px',
                  background: 'rgba(13, 15, 18, 0.78)',
                  color: colors.gold,
                  fontFamily: fonts.mono,
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {still.label}
              </span>
            </div>
          )
        })}
      </div>
    </AbsoluteFill>
  )
}

function CloseCard({ frame }: { frame: number }) {
  const rise = interpolate(frame, [0, 20], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <AbsoluteFill
      style={{
        overflow: 'hidden',
        backgroundColor: colors.ink,
        fontFamily: fonts.display,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-8%',
          top: '8%',
          color: 'transparent',
          WebkitTextStroke: `2px ${colors.gold}`,
          fontSize: 220,
          fontWeight: 800,
          letterSpacing: '-0.07em',
          textTransform: 'lowercase',
        }}
      >
        studio
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          transform: `translateY(${rise}px)`,
        }}
      >
        <Img src={media.logo} style={{ height: 28, width: 'auto' }} />
        <div
          style={{
            color: colors.gold,
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: '-0.04em',
          }}
        >
          AI Studio
        </div>
        <div
          style={{
            color: 'rgba(250, 246, 237, 0.62)',
            fontFamily: fonts.mono,
            fontSize: 12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          Generate · Enhance
        </div>
      </div>
    </AbsoluteFill>
  )
}

export function AiStudioIntro() {
  const frame = useCurrentFrame()

  const scenes = [
    { start: 0, end: 96, node: <MethodCard frame={frame} /> },
    { start: 88, end: 216, node: <GhostType frame={frame - 88} /> },
    { start: 208, end: 320, node: <TwoPaths frame={frame - 208} /> },
    { start: 312, end: 468, node: <FeatureBoard frame={frame - 312} /> },
    { start: 460, end: INTRO_DURATION, node: <CloseCard frame={frame - 460} /> },
  ] as const

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink }}>
      {scenes.map((scene) => {
        if (frame < scene.start || frame > scene.end) return null
        return (
          <AbsoluteFill
            key={scene.start}
            style={{ opacity: sceneOpacity(frame, scene.start, scene.end) }}
          >
            {scene.node}
          </AbsoluteFill>
        )
      })}
    </AbsoluteFill>
  )
}

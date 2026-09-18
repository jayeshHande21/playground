import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { GalleryScene } from './GalleryScene'
import { StudioScene } from './StudioScene'
import { colors } from './theme'

export const FPS = 30
export const WIDTH = 1280
export const HEIGHT = 720
export const DURATION_IN_FRAMES = 600

const PROMPT = 'A watercolor painting of a young South Indian couple.'

function clampProgress(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

function pulse(frame: number, at: number) {
  return interpolate(frame, [at, at + 7, at + 16], [0, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

function Cursor({
  x,
  y,
  pressed,
  trail,
}: {
  x: number
  y: number
  pressed: number
  trail: number
}) {
  const scale = interpolate(pressed, [0, 1], [1, 0.78])
  const ring = interpolate(pressed, [0, 1], [0, 1])

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        zIndex: 30,
        width: 22,
        height: 22,
        margin: '-4px 0 0 -4px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 7,
          top: 7,
          width: 28,
          height: 28,
          margin: '-14px 0 0 -14px',
          borderRadius: 999,
          border: `2px solid ${colors.gold}`,
          opacity: interpolate(ring, [0, 1], [0.55, 0]) * (pressed > 0 ? 1 : 0),
          transform: `scale(${interpolate(ring, [0, 1], [0.45, 1.85])})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: 7,
          top: 7,
          width: 10,
          height: 10,
          margin: '-5px 0 0 -5px',
          borderRadius: 999,
          background: 'rgba(253, 191, 54, 0.35)',
          opacity: trail,
          transform: `scale(${interpolate(trail, [0, 1], [0.6, 1.4])})`,
        }}
      />
      <div style={{ transform: `scale(${scale})` }}>
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          <path
            d="M3 2 L3 17 L7.6 12.8 L11.2 20.2 L13.4 19.2 L9.8 11.8 H16 Z"
            fill={colors.primary}
            stroke={colors.gold}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}

export function AiGenerateSteps() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const inStudio = frame >= 186
  const photoSelected = frame >= 72
  const showBar = frame >= 76
  const templateSelected = frame >= 268
  const showResult = frame >= 400

  const ease = Easing.bezier(0.22, 1, 0.36, 1)
  const cursorX = interpolate(
    frame,
    [16, 68, 110, 152, 200, 262, 310, 348],
    [764, 764, 764, 1004, 720, 430, 430, 1218],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease },
  )
  const cursorY = interpolate(
    frame,
    [16, 68, 110, 152, 200, 262, 310, 348],
    [220, 220, 220, 668, 210, 562, 562, 692],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease },
  )

  const clickPhoto = pulse(frame, 68)
  const clickGenerate = pulse(frame, 152)
  const clickTemplate = pulse(frame, 262)
  const clickPreview = pulse(frame, 348)
  const cursorPressed = Math.max(clickPhoto, clickGenerate, clickTemplate, clickPreview)
  const cursorTrail = interpolate(
    Math.sin(frame / 4.2),
    [-1, 1],
    [0.12, 0.42],
  )

  const zoom = interpolate(
    frame,
    [0, 248, 262, 292, 330, 348, 372, 420],
    [1, 1, 1.22, 1.08, 1.08, 1.22, 1.02, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease },
  )

  const enter = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120 },
  })
  const studioIn = clampProgress(frame, 186, 216)
  const galleryOut = clampProgress(frame, 170, 200)
  const templatePress = spring({
    frame: frame - 262,
    fps,
    config: { damping: 14, stiffness: 240 },
  })
  const selectionPop = spring({
    frame: frame - 72,
    fps,
    config: { damping: 12, stiffness: 260 },
  })
  const barIn = spring({
    frame: frame - 76,
    fps,
    config: { damping: 16, stiffness: 160 },
  })
  const generatePulse = clampProgress(frame, 140, 152)
  const previewPulse = clampProgress(frame, 336, 348)
  const settingsIn = clampProgress(frame, 250, 290)
  const typedCount = Math.round(
    interpolate(frame, [276, 340], [0, PROMPT.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  )
  const resultIn = spring({
    frame: frame - 400,
    fps,
    config: { damping: 16, stiffness: 120 },
  })
  const studioFrame = Math.max(0, frame - 186)

  return (
    <AbsoluteFill style={{ backgroundColor: '#f3f4f6' }}>
      <div
        style={{
          width: WIDTH,
          height: HEIGHT,
          transform: `scale(${zoom})`,
          transformOrigin: `${cursorX}px ${cursorY}px`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: interpolate(galleryOut, [0, 1], [1, 0]) * enter,
            transform: `scale(${interpolate(galleryOut, [0, 1], [1, 0.96])}) translateY(${interpolate(galleryOut, [0, 1], [0, -18])}px)`,
            filter: `blur(${interpolate(galleryOut, [0, 1], [0, 4])}px)`,
          }}
        >
          <GalleryScene
            frame={frame}
            selected={photoSelected}
            showBar={showBar}
            selectionPop={selectionPop}
            barIn={barIn}
            generatePulse={generatePulse}
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: studioIn,
            transform: `translateY(${interpolate(studioIn, [0, 1], [28, 0])}px) scale(${interpolate(studioIn, [0, 1], [0.97, 1])})`,
          }}
        >
          {inStudio ? (
            <StudioScene
              sceneFrame={studioFrame}
              templateSelected={templateSelected}
              templatePress={templatePress}
              typed={PROMPT.slice(0, typedCount)}
              caretOn={frame >= 276 && frame < 348 && Math.floor(frame / 8) % 2 === 0}
              settingsIn={settingsIn}
              previewPulse={previewPulse}
              showResult={showResult}
              resultIn={resultIn}
            />
          ) : null}
        </div>
      </div>
      {frame < 400 ? (
        <Cursor x={cursorX} y={cursorY} pressed={cursorPressed} trail={cursorTrail} />
      ) : null}
    </AbsoluteFill>
  )
}

import type { CSSProperties, ReactNode } from 'react'
import { AbsoluteFill, Audio, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { media } from './media'
import { colors, fonts } from './theme'

export const INTRO_FPS = 30
export const INTRO_WIDTH = 1280
export const INTRO_HEIGHT = 500
export const INTRO_DURATION = 600

function clamp(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

function sceneOpacity(frame: number, start: number, end: number, fade = 6) {
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

function typeOut(text: string, frame: number, start: number, perChar = 1.4) {
  const count = Math.round(
    interpolate(frame, [start, start + text.length * perChar], [0, text.length], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  )
  return text.slice(0, count)
}

function pop(frame: number, at: number) {
  return spring({
    frame: frame - at,
    fps: INTRO_FPS,
    config: { damping: 14, stiffness: 180 },
  })
}

function Chrome() {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 22,
          left: 40,
          zIndex: 8,
          color: colors.gold,
          fontFamily: fonts.display,
          fontSize: 16,
          fontWeight: 800,
          letterSpacing: '-0.03em',
        }}
      >
        AI Studio
      </div>
      <div
        style={{
          position: 'absolute',
          top: 26,
          right: 40,
          zIndex: 8,
          color: colors.cream,
          fontFamily: fonts.mono,
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.08em',
        }}
      >
        Generate + Enhance
      </div>
    </>
  )
}

function SweepTicker({
  frame,
  text,
  direction,
  y,
  start = 8,
  hold = 40,
}: {
  frame: number
  text: string
  direction: 'rtl' | 'ltr'
  y: number
  start?: number
  hold?: number
}) {
  const t = interpolate(frame, [start, start + hold], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  const x =
    direction === 'rtl'
      ? interpolate(t, [0, 1], [INTRO_WIDTH * 0.08, -INTRO_WIDTH * 0.16])
      : interpolate(t, [0, 1], [-INTRO_WIDTH * 0.08, INTRO_WIDTH * 0.16])
  const opacity = interpolate(frame, [start, start + 6, start + hold - 10, start + hold], [0, 0.38, 0.38, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })

  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: 40,
        right: 40,
        overflow: 'hidden',
        height: 22,
        pointerEvents: 'none',
        zIndex: 7,
      }}
    >
      <div
        style={{
          whiteSpace: 'nowrap',
          color: colors.steel,
          fontFamily: fonts.mono,
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          opacity,
          transform: `translateX(${x}px)`,
        }}
      >
        {text}
      </div>
    </div>
  )
}

function Stage({
  children,
  frame,
  topLine,
  bottomLine,
}: {
  children: ReactNode
  frame: number
  topLine: string
  bottomLine: string
}) {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.ink,
        fontFamily: fonts.display,
        color: colors.cream,
      }}
    >
      <Chrome />
      <SweepTicker frame={frame} text={topLine} direction="rtl" y={52} />
      <SweepTicker frame={frame} text={bottomLine} direction="ltr" y={INTRO_HEIGHT - 42} />
      <div
        style={{
          position: 'absolute',
          top: 78,
          right: 36,
          bottom: 48,
          left: 36,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  )
}

function FactGrid({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        columnGap: 18,
        rowGap: 16,
        width: '100%',
      }}
    >
      {children}
    </div>
  )
}

function Split({
  frame,
  left,
  right,
}: {
  frame: number
  left: ReactNode
  right: ReactNode
}) {
  const rule = pop(frame, 8)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 28, width: '100%' }}>
      <div style={{ flex: '0 0 36%', minWidth: 0 }}>{left}</div>
      <div
        style={{
          width: 1.5,
          height: interpolate(rule, [0, 1], [0, 200]),
          background: 'rgba(253, 191, 54, 0.55)',
          flexShrink: 0,
        }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>{right}</div>
    </div>
  )
}

function Rise({
  frame,
  at,
  children,
  style,
}: {
  frame: number
  at: number
  children: ReactNode
  style?: CSSProperties
}) {
  const enter = pop(frame, at)
  return (
    <div
      style={{
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [22, 0])}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function SlideIn({
  frame,
  at,
  from = 'right',
  children,
}: {
  frame: number
  at: number
  from?: 'left' | 'right'
  children: ReactNode
}) {
  const enter = pop(frame, at)
  const x = from === 'right' ? 28 : -28
  return (
    <div
      style={{
        opacity: enter,
        transform: `translateX(${interpolate(enter, [0, 1], [x, 0])}px)`,
      }}
    >
      {children}
    </div>
  )
}

function Words({
  text,
  frame,
  at,
  gold,
  from = 'up',
}: {
  text: string
  frame: number
  at: number
  gold?: boolean
  from?: 'up' | 'left' | 'right'
}) {
  return (
    <div
      style={{
        color: gold ? colors.gold : colors.cream,
        fontSize: 46,
        fontWeight: 800,
        letterSpacing: '-0.045em',
        lineHeight: 0.98,
      }}
    >
      {text.split(' ').map((word, index) => {
        const enter = pop(frame, at + index * 5)
        const dx = from === 'left' ? -20 : from === 'right' ? 20 : 0
        const dy = from === 'up' ? 20 : 0
        return (
          <span
            key={`${word}-${index}`}
            style={{
              display: 'inline-block',
              marginRight: '0.28em',
              opacity: enter,
              transform: `translate(${interpolate(enter, [0, 1], [dx, 0])}px, ${interpolate(enter, [0, 1], [dy, 0])}px)`,
            }}
          >
            {word}
          </span>
        )
      })}
    </div>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        marginBottom: 12,
        color: colors.gold,
        fontFamily: fonts.mono,
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
      }}
    >
      {children}
    </div>
  )
}

function Support({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        marginTop: 14,
        color: 'rgba(250, 246, 237, 0.78)',
        fontFamily: fonts.body,
        fontSize: 18,
        fontWeight: 500,
        lineHeight: 1.35,
      }}
    >
      {children}
    </div>
  )
}

function AsideItem({ num, title, body }: { num?: string; title: string; body?: string }) {
  return (
    <div>
      {num ? (
        <div
          style={{
            marginBottom: 4,
            color: colors.gold,
            fontFamily: fonts.mono,
            fontSize: 11,
            letterSpacing: '0.14em',
          }}
        >
          {num}
        </div>
      ) : null}
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.15,
        }}
      >
        {title}
      </div>
      {body ? (
        <div
          style={{
            marginTop: 4,
            color: 'rgba(250, 246, 237, 0.68)',
            fontFamily: fonts.body,
            fontSize: 15,
            lineHeight: 1.35,
          }}
        >
          {body}
        </div>
      ) : null}
    </div>
  )
}

const titleAside = [
  ['01', 'Generate', 'Change the look.'],
  ['02', 'Enhance', 'Keep the people.'],
  ['03', 'Delivery', 'Same day, in the event.'],
  ['04', 'Preview', 'See it before you send.'],
  ['05', 'Prompt → frame', 'One studio, one pass.'],
  ['06', 'No new tab', 'Stay in the workflow.'],
]

function TitleCard({ frame }: { frame: number }) {
  const scale = interpolate(pop(frame, 4), [0, 1], [0.94, 1])
  const rule = clamp(frame, 16, 28)
  const typed = typeOut('Turn a prompt into a finished visual.', frame, 26, 1.1)
  const caretOn = frame >= 26 && Math.floor(frame / 7) % 2 === 0

  return (
    <Stage
      frame={frame}
      topLine="Imagine it. Render it."
      bottomLine="FotoOwl AI Studio"
    >
      <Split
        frame={frame}
        left={
          <div style={{ transform: `scale(${scale})`, transformOrigin: 'left center' }}>
            <Eyebrow>FotoOwl</Eyebrow>
            <Words text="AI Studio" frame={frame} at={6} gold from="left" />
            <div
              style={{
                width: interpolate(rule, [0, 1], [0, 180]),
                height: 3,
                marginTop: 16,
                background: colors.gold,
              }}
            />
            <Support>
              {typed}
              <span style={{ color: colors.gold, opacity: caretOn ? 1 : 0 }}>|</span>
            </Support>
          </div>
        }
        right={
          <FactGrid>
            {titleAside.map(([num, title, body], index) => (
              <SlideIn key={title} frame={frame} at={16 + index * 6}>
                <AsideItem num={num} title={title} body={body} />
              </SlideIn>
            ))}
          </FactGrid>
        }
      />
    </Stage>
  )
}

function ManifestoCard({ frame }: { frame: number }) {
  const second = clamp(frame, 22, 28)

  return (
    <Stage
      frame={frame}
      topLine="From the gallery"
      bottomLine="Stay in the event"
    >
      <Split
        frame={frame}
        left={
          <>
            <Words text="Imagine it." frame={frame} at={2} from="up" />
            <Words text="Render it." frame={frame} at={16} gold from="up" />
          </>
        }
        right={
          <FactGrid>
            {[
              ['01', 'Gallery to frame', 'Pick a still. Open Studio. Finish in place.'],
              ['02', second > 0.5 ? 'Stay in the event' : 'From the gallery', second > 0.5 ? 'Without leaving your event workflow.' : 'From the gallery to a finished frame.'],
              ['03', 'No export', 'The work never leaves the day.'],
              ['04', 'Same-day', 'Deliver before the event ends.'],
              ['05', 'One studio', 'Generate and Enhance together.'],
              ['06', 'In the event', 'No new tab. No handoff.'],
            ].map(([num, title, body], index) => (
              <SlideIn key={num} frame={frame} at={18 + index * 7}>
                <AsideItem num={num} title={title} body={body} />
              </SlideIn>
            ))}
          </FactGrid>
        }
      />
    </Stage>
  )
}

const generateLooks = ['Watercolor', 'Royal', 'Film', 'Floral', 'Custom', 'Editorial']

function GenerateCard({ frame }: { frame: number }) {
  return (
    <Stage
      frame={frame}
      topLine="Pick a look"
      bottomLine="Change the frame"
    >
      <Split
        frame={frame}
        left={
          <>
            <Rise frame={frame} at={0}>
              <Eyebrow>01  /  Generate</Eyebrow>
            </Rise>
            <Words text="Pick a look." frame={frame} at={6} from="left" />
            <Words text="Change the frame." frame={frame} at={16} gold from="left" />
          </>
        }
        right={
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 10,
              width: '100%',
            }}
          >
            {generateLooks.map((look, index) => {
              const enter = pop(frame, 18 + index * 5)
              return (
                <div
                  key={look}
                  style={{
                    padding: '11px 8px',
                    border: `1.5px solid ${colors.gold}`,
                    borderRadius: 999,
                    color: colors.gold,
                    fontFamily: fonts.mono,
                    fontSize: 13,
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textAlign: 'center',
                    opacity: enter,
                    transform: `translateX(${interpolate(enter, [0, 1], [18, 0])}px) scale(${interpolate(enter, [0, 1], [0.94, 1])})`,
                  }}
                >
                  {look}
                </div>
              )
            })}
          </div>
        }
      />
    </Stage>
  )
}

function EnhanceCard({ frame }: { frame: number }) {
  const points = [
    ['01', 'Keep the people', 'Faces and pose stay true.'],
    ['02', 'Clean the frame', 'Light and noise get lifted.'],
    ['03', 'Same photo, lifted', 'No new look. Just better.'],
    ['04', 'Event-ready', 'Concert, travel, fashion, cafe.'],
    ['05', 'Natural light', 'Skin and slides stay true.'],
    ['06', 'One click', 'Lift the photo, keep the people.'],
  ]

  return (
    <Stage
      frame={frame}
      topLine="Keep the people"
      bottomLine="Lift the photo"
    >
      <Split
        frame={frame}
        left={
          <>
            <Rise frame={frame} at={0}>
              <Eyebrow>02  /  Enhance</Eyebrow>
            </Rise>
            <Words text="Keep the photo." frame={frame} at={6} from="up" />
            <Words text="Lift it." frame={frame} at={16} gold from="right" />
          </>
        }
        right={
          <FactGrid>
            {points.map(([num, title, body], index) => (
              <SlideIn key={title} frame={frame} at={18 + index * 7}>
                <AsideItem num={num} title={title} body={body} />
              </SlideIn>
            ))}
          </FactGrid>
        }
      />
    </Stage>
  )
}

const values = [
  ['01', 'Faster workflow', 'Stay in the gallery.'],
  ['02', 'One-click editing', 'Generate or Enhance.'],
  ['03', 'Custom styles', 'Looks that match the event.'],
  ['04', 'On-brand looks', 'Royal to film, in one pass.'],
  ['05', 'Same-day', 'Deliver before the event ends.'],
  ['06', 'In the gallery', 'The work never leaves the day.'],
]

function ValuesCard({ frame }: { frame: number }) {
  return (
    <Stage
      frame={frame}
      topLine="Built for the day"
      bottomLine="Gallery to delivery"
    >
      <Split
        frame={frame}
        left={
          <>
            <Rise frame={frame} at={0}>
              <Eyebrow>Why it stays in the event</Eyebrow>
            </Rise>
            <Words text="Built for the day." frame={frame} at={6} from="up" />
            <Rise frame={frame} at={22}>
              <Support>Six reasons the work never leaves the gallery.</Support>
            </Rise>
          </>
        }
        right={
          <FactGrid>
            {values.map(([num, title, body], index) => (
              <SlideIn key={title} frame={frame} at={10 + index * 7}>
                <AsideItem num={num} title={title} body={body} />
              </SlideIn>
            ))}
          </FactGrid>
        }
      />
    </Stage>
  )
}

function PathsCard({ frame }: { frame: number }) {
  const left = pop(frame, 4)
  const right = pop(frame, 14)
  const mid = pop(frame, 28)

  return (
    <Stage
      frame={frame}
      topLine="Generate changes the look"
      bottomLine="Enhance keeps the people"
    >
      <Split
        frame={frame}
        left={
          <>
            <Rise frame={frame} at={0}>
              <Eyebrow>Two paths. One studio.</Eyebrow>
            </Rise>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, marginTop: 4 }}>
              <div
                style={{
                  color: colors.gold,
                  fontSize: 36,
                  fontWeight: 800,
                  letterSpacing: '-0.045em',
                  opacity: left,
                  transform: `translateX(${interpolate(left, [0, 1], [-22, 0])}px)`,
                }}
              >
                Generate
              </div>
              <div
                style={{
                  color: 'rgba(250, 246, 237, 0.35)',
                  fontSize: 28,
                  fontWeight: 700,
                  opacity: mid,
                }}
              >
                /
              </div>
              <div
                style={{
                  color: colors.cream,
                  fontSize: 36,
                  fontWeight: 800,
                  letterSpacing: '-0.045em',
                  opacity: right,
                  transform: `translateX(${interpolate(right, [0, 1], [22, 0])}px)`,
                }}
              >
                Enhance
              </div>
            </div>
          </>
        }
        right={
          <FactGrid>
            <SlideIn frame={frame} at={18}>
              <AsideItem num="01" title="Generate" body="Change the look. Watercolor to royal in one click." />
            </SlideIn>
            <SlideIn frame={frame} at={24}>
              <AsideItem num="02" title="Enhance" body="Keep the people and clean the frame." />
            </SlideIn>
            <SlideIn frame={frame} at={30}>
              <AsideItem num="03" title="Templates" body="Preview the look before you deliver." />
            </SlideIn>
            <SlideIn frame={frame} at={36}>
              <AsideItem num="04" title="Same photo" body="Lift the frame without a new style." />
            </SlideIn>
            <SlideIn frame={frame} at={40}>
              <AsideItem num="05" title="One studio" body="Two paths. The same event workflow." />
            </SlideIn>
            <SlideIn frame={frame} at={44}>
              <AsideItem num="06" title="Same day" body="Preview, finish, and deliver in place." />
            </SlideIn>
          </FactGrid>
        }
      />
    </Stage>
  )
}

function CloseCard({ frame }: { frame: number }) {
  const { fps } = useVideoConfig()
  const enter = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 140 },
  })

  return (
    <Stage
      frame={frame}
      topLine="Start creating"
      bottomLine="Deliver the same day"
    >
      <Split
        frame={frame}
        left={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: 12,
              opacity: enter,
              transform: `translateY(${interpolate(enter, [0, 1], [18, 0])}px)`,
            }}
          >
            <Img src={media.logo} style={{ height: 24, width: 'auto' }} />
            <Words text="Start creating." frame={frame} at={8} gold from="up" />
          </div>
        }
        right={
          <FactGrid>
            <SlideIn frame={frame} at={14}>
              <AsideItem num="01" title="Open Studio" body="Pick a still from the gallery." />
            </SlideIn>
            <SlideIn frame={frame} at={20}>
              <AsideItem num="02" title="Generate or Enhance" body="Change the look, or lift the photo." />
            </SlideIn>
            <SlideIn frame={frame} at={26}>
              <AsideItem num="03" title="Preview" body="See the finished frame in place." />
            </SlideIn>
            <SlideIn frame={frame} at={32}>
              <AsideItem num="04" title="Deliver the same day" body="Stay in the event workflow." />
            </SlideIn>
            <SlideIn frame={frame} at={36}>
              <AsideItem num="05" title="Keep the people" body="Enhance lifts the frame, not the look." />
            </SlideIn>
            <SlideIn frame={frame} at={40}>
              <AsideItem num="06" title="Change the look" body="Generate takes the still somewhere new." />
            </SlideIn>
          </FactGrid>
        }
      />
    </Stage>
  )
}

export function AiStudioIntro() {
  const frame = useCurrentFrame()

  const scenes = [
    { start: 0, end: 78, node: <TitleCard frame={frame} /> },
    { start: 72, end: 162, node: <ManifestoCard frame={frame - 72} /> },
    { start: 156, end: 258, node: <GenerateCard frame={frame - 156} /> },
    { start: 252, end: 354, node: <EnhanceCard frame={frame - 252} /> },
    { start: 348, end: 438, node: <ValuesCard frame={frame - 348} /> },
    { start: 432, end: 516, node: <PathsCard frame={frame - 432} /> },
    { start: 510, end: INTRO_DURATION, node: <CloseCard frame={frame - 510} /> },
  ] as const

  return (
    <AbsoluteFill style={{ backgroundColor: colors.ink }}>
      <Audio src={media.introBeat} loop volume={0.52} />
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

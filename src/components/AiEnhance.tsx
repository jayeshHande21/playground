import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { motion, useReducedMotion } from 'motion/react'

const looks = [
  {
    id: 'concert',
    label: 'Concert',
    src: '/ai-generate/enhance-concert.jpg',
    position: 'center 42%',
    copy: 'Open the pit and punch the stage lights. The crowd stays the crowd.',
    beforeFilter: 'brightness(0.42) contrast(0.82) saturate(0.55) hue-rotate(-14deg)',
    afterFilter: 'brightness(1.16) contrast(1.28) saturate(1.55) hue-rotate(10deg)',
  },
  {
    id: 'corporate',
    label: 'Corporate',
    src: '/ai-generate/enhance-corporate.jpg',
    position: 'center 30%',
    copy: 'Even the fluorescents. Skin and slides stay natural — no new look.',
    beforeFilter: 'brightness(0.72) contrast(0.78) saturate(0.45) grayscale(0.28)',
    afterFilter: 'brightness(1.1) contrast(1.14) saturate(1.02)',
  },
  {
    id: 'travel',
    label: 'Travel',
    src: '/ai-generate/enhance-travel.jpg',
    position: 'center 38%',
    copy: 'Clear the haze and warm the road. The place stays the place.',
    beforeFilter: 'brightness(0.7) contrast(0.72) saturate(0.5) sepia(0.22)',
    afterFilter: 'brightness(1.18) contrast(1.16) saturate(1.4) sepia(0.04)',
  },
  {
    id: 'cafe',
    label: 'Cafe',
    src: '/ai-generate/enhance-cafe.jpg',
    position: 'center 32%',
    copy: 'Lift the counter without killing the tungsten. Faces stay in the room.',
    beforeFilter: 'brightness(0.5) contrast(0.86) saturate(0.7) sepia(0.28)',
    afterFilter: 'brightness(1.14) contrast(1.1) saturate(1.2) sepia(0.12) hue-rotate(-6deg)',
  },
  {
    id: 'stadium',
    label: 'Sports',
    src: '/ai-generate/enhance-stadium.jpg',
    position: 'center 55%',
    copy: 'Sharpen the pitch. Grass and leather stay real.',
    beforeFilter: 'brightness(0.55) contrast(0.76) saturate(0.42)',
    afterFilter: 'brightness(1.22) contrast(1.3) saturate(1.28)',
  },
  {
    id: 'fashion',
    label: 'Fashion',
    src: '/ai-generate/enhance-fashion.jpg',
    position: 'center 22%',
    copy: 'Clean skin and fabric. The pose stays the pose.',
    beforeFilter: 'brightness(0.68) contrast(0.8) saturate(0.52) grayscale(0.12)',
    afterFilter: 'brightness(1.12) contrast(1.18) saturate(1.15)',
  },
  {
    id: 'city',
    label: 'City night',
    src: '/ai-generate/enhance-city.jpg',
    position: 'center 40%',
    copy: 'Pull detail out of the dark. Neon stays neon.',
    beforeFilter: 'brightness(0.4) contrast(0.88) saturate(0.6) hue-rotate(8deg)',
    afterFilter: 'brightness(1.2) contrast(1.26) saturate(1.45) hue-rotate(-4deg)',
  },
  {
    id: 'kitchen',
    label: 'Dining',
    src: '/ai-generate/enhance-kitchen.jpg',
    position: 'center 35%',
    copy: 'Warm plates and glass. The room does not become a studio.',
    beforeFilter: 'brightness(0.58) contrast(0.84) saturate(0.62) sepia(0.16)',
    afterFilter: 'brightness(1.16) contrast(1.12) saturate(1.25) sepia(0.08)',
  },
]

const easeOut = [0.22, 1, 0.36, 1] as const

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function CompareSlider({
  src,
  position,
  title,
  copy,
  beforeFilter,
  afterFilter,
}: {
  src: string
  position: string
  title: string
  copy: string
  beforeFilter: string
  afterFilter: string
}) {
  const reduceMotion = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const [split, setSplit] = useState(42)

  const moveTo = useCallback((clientX: number) => {
    const node = stageRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    setSplit(clamp(((clientX - rect.left) / rect.width) * 100, 6, 94))
  }, [])

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return
      moveTo(event.clientX)
    }
    const onUp = () => {
      dragging.current = false
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [moveTo])

  return (
    <Compare
      ref={stageRef}
      onPointerDown={(event) => {
        dragging.current = true
        moveTo(event.clientX)
      }}
    >
      <Layer
        src={src}
        $position={position}
        $filter={afterFilter}
        alt=""
        decoding="async"
      />
      <Layer
        src={src}
        $position={position}
        $filter={beforeFilter}
        alt=""
        decoding="async"
        style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
      />

      <Tag $side="left">Before</Tag>
      <Tag $side="right">After</Tag>

      <Handle
        role="slider"
        aria-label="Compare before and after"
        aria-valuemin={6}
        aria-valuemax={94}
        aria-valuenow={Math.round(split)}
        tabIndex={0}
        style={{ left: `${split}%` }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') setSplit((value) => clamp(value - 4, 6, 94))
          if (event.key === 'ArrowRight') setSplit((value) => clamp(value + 4, 6, 94))
          if (event.key === 'Home') setSplit(6)
          if (event.key === 'End') setSplit(94)
        }}
      >
        <Grip />
      </Handle>

      <Shade />
      <Overlay>
        <OverlayTitle>{title}</OverlayTitle>
        <OverlayCopy>{copy}</OverlayCopy>
        <OverlayLink
          href="#studio"
          data-cursor="action"
          whileHover={reduceMotion ? undefined : { x: 3 }}
        >
          Try Enhance
        </OverlayLink>
      </Overlay>
    </Compare>
  )
}

const Section = styled.section`
  position: relative;
  overflow: clip;
  padding: clamp(2.5rem, 6vw, 4rem) 0 0;

  @media (min-width: 1800px) {
    padding-top: clamp(3.5rem, 5vw, 5.5rem);
  }
  background: var(--color-cream);
  color: var(--color-foreground);
`

const Arch = styled.div`
  padding: clamp(4.75rem, 11vw, 7.25rem) 0 clamp(3.5rem, 7vw, 5rem);
  background: var(--color-card);
  border-radius: 50% 50% 0 0 / clamp(4.5rem, 16vw, 9.5rem) clamp(4.5rem, 16vw, 9.5rem) 0 0;

  @media (min-width: 1800px) {
    padding: clamp(6rem, 8vw, 9rem) 0 clamp(4.5rem, 6vw, 6.5rem);
    border-radius: 50% 50% 0 0 / clamp(7rem, 12vw, 12rem) clamp(7rem, 12vw, 12rem) 0 0;
  }
`

const Intro = styled(motion.div)`
  display: grid;
  justify-items: center;
  gap: 0.45rem;
  margin: 0 auto 1.35rem;
  padding: 0 var(--page-gutter);
  text-align: center;
`

const Badge = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0 0 0.35rem;
  padding: 0.28rem 0.7rem 0.28rem 0.85rem;
  border-radius: 999px;
  background: var(--color-cream);
  font-size: 0.75rem;
  font-weight: 600;
`

const BadgeMark = styled.span`
  width: 1.15rem;
  height: 1.15rem;
  border-radius: 50%;
  background: var(--color-accent);
`

const Rail = styled.div`
  width: 0;
  height: 2.25rem;
  margin: 0.85rem auto 0;
  border-left: 1.5px dashed color-mix(in srgb, var(--color-accent) 70%, var(--color-border));
`

const RailDot = styled.span`
  display: block;
  width: 0.65rem;
  height: 0.65rem;
  margin: -0.2rem 0 0 -0.42rem;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-accent) 22%, transparent);
`

const Title = styled.h2`
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.85rem);
  font-weight: 700;
  letter-spacing: -0.035em;

  @media (min-width: 1800px) {
    font-size: clamp(3rem, 2.6vw, 3.75rem);
  }
`

const Lede = styled.p`
  max-width: 40ch;
  margin: 0.35rem auto 0;
  color: var(--color-muted-foreground);
  font-size: 1rem;
  line-height: 1.5;
`

const Tabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.55rem;
  margin: 0 auto 1.5rem;
  padding: 0 var(--page-gutter);
`

const Tab = styled.button<{ $active: boolean }>`
  min-height: 40px;
  padding: 0.45rem 1.05rem;
  border: 1px solid
    ${(props) =>
      props.$active ? 'var(--color-primary)' : 'transparent'};
  border-radius: 999px;
  background: ${(props) =>
    props.$active ? 'var(--color-card)' : 'color-mix(in srgb, var(--color-primary) 6%, var(--color-cream))'};
  color: var(--color-primary);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    border-color: var(--color-primary);
  }
`

const Carousel = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(18rem, 68rem) minmax(0, 1fr);
  align-items: center;
  gap: 0.75rem;
  min-height: min(64vw, 38rem);

  @media (min-width: 1800px) {
    grid-template-columns: minmax(0, 1fr) minmax(40rem, 92rem) minmax(0, 1fr);
    gap: 1rem;
    min-height: min(46vw, 48rem);
  }

  @media (min-width: 2400px) {
    grid-template-columns: minmax(0, 1fr) minmax(48rem, 110rem) minmax(0, 1fr);
    min-height: min(40vw, 56rem);
  }
`

const Peek = styled.button<{ $side: 'left' | 'right' }>`
  overflow: hidden;
  height: min(48vw, 26rem);

  @media (min-width: 1800px) {
    height: min(34vw, 34rem);
  }

  @media (min-width: 2400px) {
    height: min(28vw, 40rem);
  }
  margin-inline: ${(props) => (props.$side === 'left' ? '0 0' : '0 0')};
  padding: 0;
  border: 0;
  border-radius: ${(props) =>
    props.$side === 'left' ? '0 18px 18px 0' : '18px 0 0 18px'};
  background: var(--color-primary);
  cursor: pointer;

  img {
    width: 140%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.55) saturate(0.85);
    transform: ${(props) =>
      props.$side === 'left' ? 'translateX(-18%)' : 'translateX(-8%)'};
  }

  @media (max-width: 720px) {
    display: none;
  }
`

const Stage = styled(motion.div)`
  min-width: 0;
`

const Compare = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border-radius: 20px;
  background: var(--color-primary);
  cursor: ew-resize;
  user-select: none;
  touch-action: none;
`

const Layer = styled.img<{ $position: string; $filter: string }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${(props) => props.$position};
  image-rendering: high-quality;
  filter: ${(props) => props.$filter};
  pointer-events: none;
`

const Tag = styled.span<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 0.85rem;
  ${(props) => (props.$side === 'left' ? 'left: 0.85rem;' : 'right: 0.85rem;')}
  z-index: 3;
  padding: 0.28rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.94);
  color: var(--color-primary);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`

const Handle = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 4;
  width: 2px;
  margin-left: -1px;
  background: #ffffff;
  cursor: ew-resize;
`

const Grip = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1.35rem;
  height: 1.35rem;
  border: 2px solid #ffffff;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-primary) 55%, transparent);
  transform: translate(-50%, -50%);
`

const Shade = styled.div`
  position: absolute;
  inset: auto 0 0;
  z-index: 2;
  height: 42%;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(20, 22, 26, 0.72) 100%
  );
  pointer-events: none;
`

const Overlay = styled.div`
  position: absolute;
  right: 1.25rem;
  bottom: 1.15rem;
  left: 1.25rem;
  z-index: 3;
  max-width: 28rem;
  color: #ffffff;
  pointer-events: none;
`

const OverlayTitle = styled.p`
  margin: 0;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`

const OverlayCopy = styled.p`
  margin: 0.3rem 0 0;
  font-size: 0.9rem;
  line-height: 1.45;
  color: rgba(255, 255, 255, 0.86);
`

const OverlayLink = styled(motion.a)`
  display: inline-flex;
  margin-top: 0.55rem;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 700;
  text-decoration: none;
  pointer-events: auto;
  cursor: pointer;
`

export default function AiEnhance() {
  const reduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)
  const look = looks[index]
  const prev = looks[(index - 1 + looks.length) % looks.length]
  const next = looks[(index + 1) % looks.length]

  return (
    <Section id="enhance" aria-labelledby="enhance-title">
      <Arch>
      <Intro
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, ease: easeOut }}
      >
        <Badge>
          AI Enhance
          <BadgeMark aria-hidden="true" />
        </Badge>
        <Title id="enhance-title">Keep the photo. Lift it.</Title>
        <Lede>
          Drag to compare. Generate changes the look. Enhance keeps the people
          and cleans the frame.
        </Lede>
        <Rail aria-hidden="true">
          <RailDot />
        </Rail>
      </Intro>

      <Tabs role="tablist" aria-label="Enhance examples">
        {looks.map((item, itemIndex) => (
          <Tab
            key={item.id}
            type="button"
            role="tab"
            aria-selected={itemIndex === index}
            $active={itemIndex === index}
            data-cursor="action"
            onClick={() => setIndex(itemIndex)}
          >
            {item.label}
          </Tab>
        ))}
      </Tabs>

      <Carousel>
        <Peek
          type="button"
          $side="left"
          aria-label={`Show ${prev.label}`}
          onClick={() => setIndex((index - 1 + looks.length) % looks.length)}
        >
          <img src={prev.src} alt="" style={{ objectPosition: prev.position }} />
        </Peek>

        <Stage
          key={look.id}
          initial={reduceMotion ? false : { opacity: 0.72, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: easeOut }}
        >
          <CompareSlider
            src={look.src}
            position={look.position}
            title={look.label}
            copy={look.copy}
            beforeFilter={look.beforeFilter}
            afterFilter={look.afterFilter}
          />
        </Stage>

        <Peek
          type="button"
          $side="right"
          aria-label={`Show ${next.label}`}
          onClick={() => setIndex((index + 1) % looks.length)}
        >
          <img src={next.src} alt="" style={{ objectPosition: next.position }} />
        </Peek>
      </Carousel>
      </Arch>
    </Section>
  )
}

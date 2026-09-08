import styled from 'styled-components'
import { motion, useReducedMotion } from 'motion/react'

const tabs = [
  { id: 'guests', label: 'Gallery', src: '/ai-generate/event-guests.jpg', position: 'center 38%' },
  { id: 'watercolor', label: 'Generate', src: '/ai-generate/template-watercolor.jpg', position: 'center top' },
  { id: 'concert', label: 'Enhance', src: '/ai-generate/enhance-concert.jpg', position: 'center 42%' },
  { id: 'preview', label: 'Preview', src: '/ai-generate/preview-result.jpg', position: 'center 28%' },
  { id: 'ceremony', label: 'Event', src: '/ai-generate/event-ceremony.jpg', position: 'center 30%' },
  { id: 'film', label: 'Generate', src: '/ai-generate/template-film.jpg', position: 'center 20%' },
  { id: 'travel', label: 'Enhance', src: '/ai-generate/enhance-travel.jpg', position: 'center 38%' },
  { id: 'dance', label: 'Gallery', src: '/ai-generate/event-dance.jpg', position: 'center 40%' },
  { id: 'fashion', label: 'Enhance', src: '/ai-generate/enhance-fashion.jpg', position: 'center 22%' },
  { id: 'floral', label: 'Generate', src: '/ai-generate/template-floral.jpg', position: 'center top' },
  { id: 'family', label: 'Same-day', src: '/ai-generate/event-family.jpg', position: 'center 32%' },
  { id: 'city', label: 'Enhance', src: '/ai-generate/enhance-city.jpg', position: 'center 40%' },
  { id: 'walk', label: 'Event', src: '/ai-generate/event-walk.jpg', position: 'center 35%' },
  { id: 'royal', label: 'Generate', src: '/ai-generate/template-royal.jpg', position: 'center 18%' },
  { id: 'cafe', label: 'Enhance', src: '/ai-generate/enhance-cafe.jpg', position: 'center 32%' },
  { id: 'couple', label: 'Gallery', src: '/ai-generate/before-couple.jpg', position: 'center 12%' },
  { id: 'corporate', label: 'Enhance', src: '/ai-generate/enhance-corporate.jpg', position: 'center 30%' },
  { id: 'stadium', label: 'Event', src: '/ai-generate/enhance-stadium.jpg', position: 'center 55%' },
]

function rotate(list: typeof tabs, offset: number) {
  return list.slice(offset).concat(list.slice(0, offset))
}

const columns = [
  { id: 'a', items: rotate(tabs, 0), duration: 56, reverse: false },
  { id: 'b', items: rotate(tabs, 6), duration: 64, reverse: true },
  { id: 'c', items: rotate(tabs, 12), duration: 60, reverse: false },
]

const titleWords = ['From', 'gallery', 'to', 'delivery']
const easeOut = [0.22, 1, 0.36, 1] as const
const springUi = { type: 'spring', stiffness: 305, damping: 33 } as const

const ink = '#2e3a50'
const gold = '#f4ba44'
const pupilInk = '#1c2028'

function OwlMark() {
  return (
    <MarkSvg viewBox="470 0 420 255" aria-hidden="true">
      <path
        fill={ink}
        d="m596.6 48.1-72.4-48.1s27.3-.6 44.4 10.7c17.1 11.3 28 37.4 28 37.4z"
      />
      <path
        fill={ink}
        d="m715.4 48.1 72.4-48.1s-27.3-.6-44.4 10.7c-17.1 11.3-28 37.4-28 37.4z"
      />
      <circle cx="547.1" cy="139.3" r="70" fill={ink} />
      <circle cx="547.1" cy="139.3" r="55.9" fill={gold} />
      <circle cx="547.7" cy="139.9" r="18.85" fill={pupilInk} />
      <circle cx="560.4" cy="128.2" r="5.4" fill="#ffffff" />
      <circle cx="757.6" cy="138.8" r="74" fill={gold} />
      <circle cx="757.6" cy="138.8" r="59.7" fill={ink} />
      <circle cx="778.8" cy="118.4" r="8.2" fill="#ffffff" />
      <path fill={ink} d="m624.6 208.8h55.9l-28.8 43z" />
    </MarkSvg>
  )
}

const Section = styled.section`
  position: relative;
  overflow: clip;
  padding: var(--section-pad-y) var(--page-gutter);
  background: var(--color-cream);
  color: var(--color-foreground);
`

const Inner = styled.div`
  max-width: var(--page-max);
  margin: 0 auto;
`

const Board = styled.div`
  display: grid;
  gap: 1.75rem;
  overflow: hidden;
  padding: clamp(1.35rem, 3vw, 1.85rem);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  background: var(--color-card);
  box-shadow: var(--shadow-md);

  @media (min-width: 880px) {
    grid-template-columns: minmax(16rem, 1fr) auto;
    align-items: center;
    gap: 1.75rem;
    padding: 1.75rem 1.5rem 1.75rem 2rem;
  }

  @media (min-width: 1800px) {
    gap: 3rem;
    padding: 2.5rem 2.25rem 2.5rem 3rem;
  }

  @media (min-width: 2400px) {
    gap: 4rem;
    padding: 3rem 2.75rem 3rem 3.5rem;
  }
`

const Copy = styled.div`
  min-width: 0;
`

const Eyebrow = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  margin: 0 0 0.75rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-accent-dark);

  &::before {
    content: '';
    width: 1.65rem;
    height: 1px;
    background: var(--color-accent);
  }
`

const Title = styled(motion.h2)`
  display: flex;
  flex-wrap: wrap;
  max-width: 11ch;
  margin: 0;
  font-size: clamp(2.35rem, 5vw, 3.75rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.92;

  @media (min-width: 1800px) {
    font-size: clamp(3.6rem, 3.4vw, 5rem);
  }
`

const Word = styled(motion.span)<{ $gold?: boolean }>`
  display: inline-block;
  margin-right: 0.28em;
  color: ${(props) => (props.$gold ? 'var(--color-accent-dark)' : 'inherit')};
`

const Lede = styled.p`
  max-width: 38ch;
  margin: 0.85rem 0 0;
  color: var(--color-muted-foreground);
  font-size: 1rem;
  line-height: 1.55;
`

const MarkWrap = styled(motion.div)`
  margin-top: 1.35rem;
`

const MarkSvg = styled.svg`
  width: 6.25rem;
  height: auto;

  @media (min-width: 1800px) {
    width: 7.5rem;
  }
`

const Track = styled.div<{ $static?: boolean; $reverse?: boolean; $duration: number }>`
  display: flex;
  flex-direction: column;
  animation: ${(props) =>
    props.$static ? 'none' : `workflow-tabs ${props.$duration}s linear infinite`};
  animation-direction: ${(props) => (props.$reverse ? 'reverse' : 'normal')};

  @keyframes workflow-tabs {
    from {
      transform: translateY(-50%);
    }
    to {
      transform: translateY(0);
    }
  }
`

const Rails = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.65rem;
  min-width: 0;

  @media (min-width: 880px) {
    justify-content: end;
  }

  @media (min-width: 1800px) {
    gap: 0.9rem;
  }

  &:hover ${Track},
  &:focus-within ${Track} {
    animation-play-state: paused;
  }
`

const Viewport = styled.div<{ $static?: boolean }>`
  width: 6.1rem;
  height: 18.5rem;
  overflow: ${(props) => (props.$static ? 'auto' : 'hidden')};
  mask-image: linear-gradient(
    to bottom,
    transparent,
    #000 12%,
    #000 88%,
    transparent
  );

  @media (min-width: 880px) {
    width: 7.2rem;
    height: 24rem;
  }

  @media (min-width: 1800px) {
    width: 8.75rem;
    height: 30rem;
  }

  @media (min-width: 2400px) {
    width: 10.25rem;
    height: 36rem;
  }
`

const Group = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin: 0;
  padding: 0.15rem 0.15rem 0.7rem;
  list-style: none;
`

const Tab = styled.li`
  flex: none;
`

const Frame = styled.figure`
  margin: 0;
`

const Photo = styled.img`
  width: 5.65rem;
  height: 7rem;
  object-fit: cover;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-cream);
  box-shadow: var(--shadow-sm);

  @media (min-width: 880px) {
    width: 6.75rem;
    height: 8.35rem;
  }

  @media (min-width: 1800px) {
    width: 8.25rem;
    height: 10.2rem;
  }

  @media (min-width: 2400px) {
    width: 9.75rem;
    height: 12rem;
  }
`

const Label = styled.figcaption`
  margin-top: 0.4rem;
  color: var(--color-muted-foreground);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`

const wordList = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
}

const wordItem = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
}

function TabList({
  items,
  hidden,
}: {
  items: typeof tabs
  hidden?: boolean
}) {
  return (
    <Group aria-hidden={hidden ? true : undefined}>
      {items.map((tab) => (
        <Tab key={`${hidden ? 'loop' : 'live'}-${tab.id}`}>
          <Frame>
            <Photo
              src={tab.src}
              alt=""
              style={{ objectPosition: tab.position }}
            />
            <Label>{tab.label}</Label>
          </Frame>
        </Tab>
      ))}
    </Group>
  )
}

export default function WorkflowClose() {
  const reduceMotion = useReducedMotion()

  return (
    <Section id="studio" aria-labelledby="studio-title">
      <Inner>
        <Board>
          <Copy>
            <Eyebrow>Workflow</Eyebrow>
            <Title
              id="studio-title"
              initial={reduceMotion ? false : 'hidden'}
              whileInView={reduceMotion ? undefined : 'show'}
              viewport={{ once: true, amount: 0.7 }}
              variants={wordList}
            >
              {titleWords.map((word) => (
                <Word
                  key={word}
                  variants={reduceMotion ? undefined : wordItem}
                  $gold={word === 'to'}
                >
                  {word}
                </Word>
              ))}
            </Title>
            <Lede>
              One path on the light table: the gallery, the studio pass, then
              same-day delivery.
            </Lede>
            <MarkWrap
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={springUi}
            >
              <OwlMark />
            </MarkWrap>
          </Copy>

          <Rails aria-label="Workflow stills">
            {columns.map((column) => (
              <Viewport key={column.id} $static={!!reduceMotion}>
                <Track
                  $static={!!reduceMotion}
                  $reverse={column.reverse}
                  $duration={column.duration}
                >
                  {reduceMotion ? null : (
                    <TabList items={column.items} hidden />
                  )}
                  <TabList items={column.items} />
                </Track>
              </Viewport>
            ))}
          </Rails>
        </Board>
      </Inner>
    </Section>
  )
}

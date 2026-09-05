import { useRef, type PointerEvent, type ReactNode } from 'react'
import styled from 'styled-components'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react'
import {
  Lightning,
  MagicWand,
  Palette,
  Sparkle,
} from '@phosphor-icons/react'

const headline = ['Imagine it.', 'Render it.']

const looks = [
  'Royal',
  'Editorial',
  'Festival',
  'Film',
  'Portrait',
  'Red carpet',
  'Destination',
  'Candid',
]

const points = [
  { label: 'Faster workflow', Icon: Lightning },
  { label: 'One-click editing', Icon: MagicWand },
  { label: 'Custom styles', Icon: Sparkle },
  { label: 'On-brand looks', Icon: Palette },
]

const easeOut = [0.22, 1, 0.36, 1] as const

const contentVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.04 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeOut },
  },
}

const headlineVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
}

const lineVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.028 } },
}

const letterVariants = {
  hidden: { opacity: 0, y: '0.55em', rotateX: -42 },
  show: {
    opacity: 1,
    y: '0em',
    rotateX: 0,
    transition: { duration: 0.52, ease: easeOut },
  },
}

const HeroContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100svh;
  overflow-x: clip;
  --spot-x: 18%;
  --spot-y: 22%;
  background:
    radial-gradient(
      ellipse 42% 34% at var(--spot-x) var(--spot-y),
      var(--color-gold-wash) 0%,
      transparent 62%
    ),
    radial-gradient(
      ellipse 45% 35% at 96% 0%,
      var(--color-cream) 0%,
      transparent 55%
    ),
    var(--color-background);
  color: var(--color-foreground);
`

const Texture = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.1;
  background-image: radial-gradient(
    color-mix(in srgb, var(--color-primary) 20%, transparent) 0.6px,
    transparent 0.7px
  );
  background-size: 5px 5px;
`

const Top = styled.header`
  position: relative;
  z-index: 1;
  padding: 1.35rem clamp(1.5rem, 5vw, 2.75rem) 0;
`

const Wordmark = styled(motion.p)`
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(3.25rem, 14.5vw, 10.5rem);
  font-weight: 700;
  line-height: 0.82;
  letter-spacing: -0.055em;
  text-align: center;
  color: var(--color-primary);
`

const Nav = styled(motion.nav)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  padding: 0.85rem clamp(1.5rem, 5vw, 2.75rem);
  background: color-mix(in srgb, var(--color-background) 78%, transparent);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--color-border);
`

const NavLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.15rem 1.75rem;
`

const NavLink = styled.a`
  position: relative;
  font-size: 0.875rem;
  color: var(--color-muted-foreground);
  text-decoration: none;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0.55rem;
    height: 1.5px;
    background: var(--color-accent);
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover,
  &:focus-visible {
    color: var(--color-primary);
  }

  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      transition: none;
    }
  }
`

const NavCta = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  padding: 0.55rem 1.2rem;
  border-radius: 999px;
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 8px 18px color-mix(in srgb, var(--color-primary) 18%, transparent);
  transition: box-shadow 0.2s ease;

  &:hover,
  &:focus-visible {
    box-shadow:
      0 0 0 2px var(--color-accent),
      0 12px 24px color-mix(in srgb, var(--color-primary) 22%, transparent);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Main = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2.25rem clamp(1.25rem, 4vw, 3rem) 1.5rem;
  text-align: center;
`

const Headline = styled(motion.h1)`
  max-inline-size: 12ch;
  color: var(--color-primary);
  font-size: clamp(2.75rem, 6vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  text-wrap: balance;
`

const Line = styled(motion.span)`
  display: block;
  overflow: hidden;
  perspective: 420px;
`

const Letter = styled(motion.span)`
  display: inline-block;
  transform-origin: 50% 100%;
  white-space: pre;
`

const AccentLetter = styled(Letter)`
  color: var(--color-accent);
  transition: text-shadow 0.25s ease;

  &:hover {
    text-shadow: 0 0 18px color-mix(in srgb, var(--color-accent) 60%, transparent);
  }
`

const Lede = styled(motion.p)`
  max-width: 36ch;
  margin-top: 1.15rem;
  font-size: 1.0625rem;
  line-height: 1.6;
  color: var(--color-muted-foreground);
`

const Actions = styled(motion.div)`
  margin-top: 1.5rem;
`

const CtaLabel = styled.span`
  display: grid;
  overflow: hidden;
  height: 1.2em;
`

const CtaWord = styled.span`
  grid-area: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);

  &:last-child {
    transform: translateY(110%);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:last-child {
      display: none;
    }
  }
`

const CtaIcon = styled(Sparkle)`
  flex-shrink: 0;
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const PrimaryCta = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 52px;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  background: var(--color-action);
  color: var(--color-on-action);
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 12px 24px color-mix(in srgb, var(--color-action) 28%, transparent);

  &:hover {
    background: color-mix(in srgb, var(--color-action) 82%, var(--color-primary));
  }

  &:hover ${CtaWord}:first-child {
    transform: translateY(-110%);
  }

  &:hover ${CtaWord}:last-child {
    transform: translateY(0);
  }

  &:hover ${CtaIcon} {
    transform: rotate(18deg) scale(1.08);
  }
`

const Points = styled(motion.ul)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem 1.25rem;
  margin: 1.75rem 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.8125rem;
  color: var(--color-muted-foreground);
`

const Point = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: color 0.2s ease;

  svg {
    color: var(--color-primary);
    transition:
      color 0.2s ease,
      transform 0.2s ease;
  }

  &:hover {
    color: var(--color-primary);
  }

  &:hover svg {
    color: var(--color-accent-dark);
    transform: scale(1.12);
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover svg {
      transform: none;
    }
  }
`

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: looks-marquee 36s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @keyframes looks-marquee {
    to {
      transform: translateX(-50%);
    }
  }
`

const Marquee = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  background: var(--color-primary);
  color: var(--color-on-primary);

  &:hover ${Track},
  &:focus-within ${Track} {
    animation-play-state: paused;
  }
`

const Group = styled.ul`
  display: flex;
  align-items: center;
  gap: 4.75rem;
  margin: 0;
  padding: 0.75rem 2.375rem;
  list-style: none;
`

const Look = styled.li`
  font-family: var(--font-heading);
  font-size: clamp(1.05rem, 1.7vw, 1.35rem);
  font-weight: 500;
  letter-spacing: 0.01em;
  white-space: nowrap;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-accent);
  }
`

const MagneticWrap = styled(motion.div)`
  display: inline-block;
  will-change: transform;
`

function Magnetic({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 })

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const node = ref.current
    if (!node) return
    const box = node.getBoundingClientRect()
    x.set((event.clientX - box.left - box.width / 2) * 0.28)
    y.set((event.clientY - box.top - box.height / 2) * 0.28)
  }

  const onPointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <MagneticWrap
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={reduceMotion ? undefined : { x: springX, y: springY }}
    >
      {children}
    </MagneticWrap>
  )
}

function moveHeroWash(
  event: PointerEvent<HTMLElement>,
  reduceMotion: boolean | null,
) {
  if (reduceMotion || event.pointerType !== 'mouse') return
  const box = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty(
    '--spot-x',
    `${((event.clientX - box.left) / box.width) * 100}%`,
  )
  event.currentTarget.style.setProperty(
    '--spot-y',
    `${((event.clientY - box.top) / box.height) * 100}%`,
  )
}

export default function HeroSection() {
  const reduceMotion = useReducedMotion()

  return (
    <HeroContainer
      id="top"
      onPointerMove={(event) => moveHeroWash(event, reduceMotion)}
    >
      <Texture aria-hidden="true" />

      <Top>
        <Wordmark
          initial={reduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: easeOut }}
        >
          AI Studio
        </Wordmark>
      </Top>

      <Nav
        aria-label="AI Studio"
        initial={reduceMotion ? false : { opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.45,
          ease: easeOut,
          delay: 0.06,
        }}
      >
        <NavLinks>
          <NavLink href="#how-it-works">AI Generate</NavLink>
          <NavLink href="#enhance">AI Enhance</NavLink>
          <NavLink href="#studio">Workflow</NavLink>
        </NavLinks>
        <Magnetic>
          <NavCta
            href="#studio"
            data-cursor="action"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Start Creating
          </NavCta>
        </Magnetic>
      </Nav>

      <Main
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
        variants={contentVariants}
      >
        <Headline
          aria-label={headline.join(' ')}
          variants={reduceMotion ? undefined : headlineVariants}
        >
          {headline.map((text, index) => (
            <Line
              key={text}
              aria-hidden="true"
              variants={reduceMotion ? undefined : lineVariants}
            >
              {reduceMotion
                ? index === 1
                  ? <AccentLetter>{text}</AccentLetter>
                  : text
                : Array.from(text).map((char, charIndex) => {
                    const LetterTag = index === 1 ? AccentLetter : Letter
                    return (
                      <LetterTag
                        key={`${text}-${charIndex}`}
                        variants={letterVariants}
                      >
                        {char}
                      </LetterTag>
                    )
                  })}
            </Line>
          ))}
        </Headline>

        <Lede variants={reduceMotion ? undefined : itemVariants}>
          Turn a prompt into a finished visual — without leaving your event
          workflow.
        </Lede>

        <Actions variants={reduceMotion ? undefined : itemVariants}>
          <Magnetic>
            <PrimaryCta
              href="#studio"
              data-cursor="action"
              aria-label="Start Creating"
              whileHover={reduceMotion ? undefined : { scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <CtaLabel aria-hidden="true">
                <CtaWord>Start Creating</CtaWord>
                <CtaWord>Open Studio</CtaWord>
              </CtaLabel>
              <CtaIcon size={16} weight="fill" aria-hidden="true" />
            </PrimaryCta>
          </Magnetic>
        </Actions>

        <Points variants={reduceMotion ? undefined : itemVariants}>
          {points.map(({ label, Icon }) => (
            <Point key={label}>
              <Icon size={15} weight="regular" aria-hidden="true" />
              {label}
            </Point>
          ))}
        </Points>
      </Main>

      <Marquee id="styles" aria-label="Studio looks" data-cursor="dark">
        <Track>
          <Group>
            {looks.map((look) => (
              <Look key={`a-${look}`}>{look}</Look>
            ))}
          </Group>
          <Group aria-hidden="true">
            {looks.map((look) => (
              <Look key={`b-${look}`}>{look}</Look>
            ))}
          </Group>
        </Track>
      </Marquee>
    </HeroContainer>
  )
}

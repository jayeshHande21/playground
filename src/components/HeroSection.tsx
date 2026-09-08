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

const points = [
  { label: 'Faster workflow', Icon: Lightning },
  { label: 'One-click editing', Icon: MagicWand },
  { label: 'Custom styles', Icon: Sparkle },
  { label: 'On-brand looks', Icon: Palette },
]

const stills = [
  {
    src: '/ai-generate/enhance-concert.jpg',
    position: 'center 42%',
    height: '64%',
    flex: '0.58',
    hideMobile: true,
  },
  {
    src: '/ai-generate/event-guests.jpg',
    position: 'center 38%',
    height: '82%',
    flex: '0.82',
    hideMobile: false,
  },
  {
    src: '/ai-generate/preview-result.jpg',
    position: 'center 22%',
    height: '100%',
    flex: '1.05',
    hideMobile: false,
  },
  {
    src: '/ai-generate/event-ceremony.jpg',
    position: 'center 30%',
    height: '82%',
    flex: '0.82',
    hideMobile: false,
  },
  {
    src: '/ai-generate/event-walk.jpg',
    position: 'center 35%',
    height: '64%',
    flex: '0.58',
    hideMobile: true,
  },
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

const mountainVariants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.28 },
  },
}

const frameVariants = {
  hidden: { opacity: 0, y: 36 },
  show: (distance: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easeOut,
      delay: distance * 0.08,
    },
  }),
}

const HeroContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100svh;
  overflow: clip;
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

const Header = styled(motion.header)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  max-width: var(--page-max);
  width: 100%;
  margin: 0 auto;
  padding: 0.85rem var(--hero-gutter);
  border-bottom: 1px solid var(--color-border);

  @media (min-width: 1600px) {
    padding-top: 1.05rem;
    padding-bottom: 1.05rem;
  }
`

const Wordmark = styled(motion.a)`
  margin: 0;
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-family: var(--font-heading);
  font-size: clamp(1.4rem, 2.2vw, 1.8rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--color-primary);
  text-decoration: none;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    color: var(--color-accent-dark);
  }
`

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.15rem 1.5rem;

  @media (max-width: 767px) {
    order: 3;
    flex-basis: 100%;
  }

  @media (min-width: 768px) {
    margin-left: auto;
    margin-right: 1.75rem;
    gap: 0.15rem 1.75rem;
  }
`

const NavEnd = styled.div`
  margin-left: auto;

  @media (min-width: 768px) {
    margin-left: 0;
  }
`

const NavLink = styled.a`
  position: relative;
  font-size: 0.875rem;

  @media (min-width: 1600px) {
    font-size: 1.05rem;
  }
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

  @media (min-width: 1600px) {
    min-height: 48px;
    padding: 0.65rem 1.4rem;
    font-size: 1rem;
  }
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
  justify-content: center;
  max-width: var(--page-max);
  width: 100%;
  margin: 0 auto;
  padding: 1.75rem var(--hero-gutter) 1.25rem;
  text-align: center;
`

const Copy = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
`

const Headline = styled(motion.h1)`
  max-inline-size: 12ch;
  color: var(--color-primary);
  font-size: clamp(2.5rem, 5.6vw, 4.75rem);
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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
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

const SecondaryCta = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 52px;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  background: var(--color-primary);
  color: var(--color-on-primary);
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 8px 18px color-mix(in srgb, var(--color-primary) 18%, transparent);

  &:hover,
  &:focus-visible {
    box-shadow:
      0 0 0 2px var(--color-accent),
      0 12px 24px color-mix(in srgb, var(--color-primary) 22%, transparent);
  }
`

const Points = styled(motion.ul)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem 1.25rem;
  margin: 1.5rem 0 0;
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

const Mountain = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 0.55rem;
  width: 100%;
  height: clamp(13.5rem, 38vh, 26rem);
  padding: 0.75rem var(--hero-gutter) 0;
  overflow: hidden;
`

const Frame = styled(motion.figure)<{
  $height: string
  $flex: string
  $hideMobile: boolean
}>`
  position: relative;
  flex: ${(props) => props.$flex} 1 0;
  height: calc(${(props) => props.$height} * 1.22);
  margin: 0;
  overflow: hidden;
  border-radius: 16px 16px 8px 8px;
  background: var(--color-cream);
  box-shadow: var(--shadow-md);

  @media (max-width: 767px) {
    display: ${(props) => (props.$hideMobile ? 'none' : 'block')};
  }

  @media (prefers-reduced-motion: reduce) {
    img {
      transition: none;
    }
  }
`

const Still = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);

  ${Frame}:hover & {
    transform: scale(1.04);
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

      <Header
        initial={reduceMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.45, ease: easeOut }}
      >
        <Wordmark href="#top">AI Studio</Wordmark>
        <Nav aria-label="AI Studio">
          <NavLink href="#how-it-works">AI Generate</NavLink>
          <NavLink href="#enhance">AI Enhance</NavLink>
          <NavLink href="#studio">Workflow</NavLink>
        </Nav>
        <NavEnd>
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
        </NavEnd>
      </Header>

      <Main
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
        variants={contentVariants}
      >
        <Copy variants={reduceMotion ? undefined : contentVariants}>
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
            <Magnetic>
              <SecondaryCta
                href="#how-it-works"
                data-cursor="link"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Explore Features
              </SecondaryCta>
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
        </Copy>

      </Main>

      <Mountain
        aria-hidden="true"
        initial={reduceMotion ? false : 'hidden'}
        animate="show"
        variants={reduceMotion ? undefined : mountainVariants}
      >
        {stills.map((still, index) => (
          <Frame
            key={still.src}
            $height={still.height}
            $flex={still.flex}
            $hideMobile={still.hideMobile}
            custom={Math.abs(index - 2)}
            variants={reduceMotion ? undefined : frameVariants}
            whileHover={
              reduceMotion ? undefined : { y: -6, transition: { duration: 0.28 } }
            }
          >
            <Still
              src={still.src}
              alt=""
              style={{ objectPosition: still.position }}
            />
          </Frame>
        ))}
      </Mountain>
    </HeroContainer>
  )
}

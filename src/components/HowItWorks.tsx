import { useRef } from 'react'
import styled from 'styled-components'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { Eye, SquaresFour, SlidersHorizontal } from '@phosphor-icons/react'
import GenerateStepsPlayer from './GenerateStepsPlayer'

const steps = [
  {
    title: 'Select a photo',
    copy: 'Pick a frame from the event gallery.',
    Icon: SquaresFour,
  },
  {
    title: 'Click Generate',
    copy: 'Open AI Studio from the selection bar.',
    Icon: SlidersHorizontal,
  },
  {
    title: 'Preview a template',
    copy: 'The result matches the look you chose.',
    Icon: Eye,
  },
]

const looks = [
  {
    src: '/ai-generate/before-couple.jpg',
    label: 'Event',
  },
  {
    src: '/ai-generate/template-watercolor.jpg',
    label: 'Template',
  },
  {
    src: '/ai-generate/template-watercolor.jpg',
    label: 'Preview',
  },
]

const easeOut = [0.22, 1, 0.36, 1] as const

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: clamp(4rem, 8vw, 6.5rem) clamp(1.25rem, 4vw, 2.5rem);
  background: var(--color-cream);
  color: var(--color-foreground);
`

const ParallaxWash = styled(motion.div)`
  position: absolute;
  width: min(34rem, 70vw);
  height: min(34rem, 70vw);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--color-gold-wash) 0%,
    transparent 68%
  );
  pointer-events: none;
  will-change: transform;
`

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 76rem;
  margin: 0 auto;
`

const Panel = styled.div`
  display: grid;
  gap: 1.75rem;
  padding: clamp(1.35rem, 3vw, 2rem);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  background: var(--color-card);
  box-shadow: var(--shadow-md);

  @media (min-width: 960px) {
    grid-template-columns: minmax(18rem, 26rem) minmax(0, 1fr);
    align-items: center;
    gap: 2.25rem;
    padding: 1.75rem 1.75rem 1.75rem 2rem;
  }
`

const Copy = styled(motion.div)`
  display: flex;
  flex-direction: column;
  min-width: 0;
`

const Eyebrow = styled.p`
  margin: 0 0 0.65rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-accent-dark);
`

const Title = styled.h2`
  margin: 0;
  max-width: 10ch;
  font-size: clamp(2.15rem, 4vw, 3.15rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.02;
`

const Lede = styled.p`
  max-width: 30ch;
  margin: 0.85rem 0 0;
  color: var(--color-muted-foreground);
  font-size: 1rem;
  line-height: 1.55;
`

const StepList = styled(motion.ul)`
  display: grid;
  gap: 0.85rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
`

const StepItem = styled(motion.li)`
  display: grid;
  grid-template-columns: 2.25rem minmax(0, 1fr);
  gap: 0.85rem;
  align-items: start;
`

const IconWell = styled.div`
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 10px;
  background: var(--color-gold-wash);
  color: var(--color-primary);
`

const StepTitle = styled.p`
  margin: 0;
  font-size: 0.975rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`

const StepCopy = styled.p`
  margin: 0.15rem 0 0;
  color: var(--color-muted-foreground);
  font-size: 0.875rem;
  line-height: 1.4;
`

const Looks = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 1.25rem;
`

const Look = styled.figure`
  margin: 0;
`

const LookImage = styled.img`
  display: block;
  width: 3.5rem;
  height: 3.5rem;
  object-fit: cover;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-muted);
`

const CustomLook = styled.div`
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 3.5rem;
  border: 1px dashed var(--color-border);
  border-radius: 10px;
  background: #f3f4f6;
  color: var(--color-muted-foreground);
  font-size: 0.6875rem;
  font-weight: 700;
`

const LookLabel = styled.figcaption`
  margin-top: 0.3rem;
  color: var(--color-hint);
  font-size: 0.6875rem;
  font-weight: 600;
  text-align: center;
`

const Actions = styled(motion.div)`
  margin-top: 1.6rem;
`

const Cta = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  min-height: 48px;
  padding: 0.75rem 1.45rem;
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
`

const VideoCol = styled(motion.div)`
  min-width: 0;

  @media (min-width: 960px) {
    position: sticky;
    top: 5.5rem;
  }
`

const introVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
}

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeOut },
  },
}

export default function HowItWorks() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const washY = useTransform(scrollYProgress, [0, 1], [48, -64])
  const washYSlow = useTransform(scrollYProgress, [0, 1], [24, -36])

  return (
    <Section id="how-it-works" ref={sectionRef}>
      <ParallaxWash
        aria-hidden="true"
        style={
          reduceMotion
            ? { top: '-12%', right: '-8%' }
            : { top: '-12%', right: '-8%', y: washY }
        }
      />
      <ParallaxWash
        aria-hidden="true"
        style={
          reduceMotion
            ? { bottom: '-18%', left: '-12%', opacity: 0.7 }
            : { bottom: '-18%', left: '-12%', opacity: 0.7, y: washYSlow }
        }
      />

      <Inner>
        <Panel>
          <Copy
            initial={reduceMotion ? false : 'hidden'}
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={reduceMotion ? undefined : introVariants}
          >
            <Eyebrow>AI Generate</Eyebrow>
            <Title>Pick a look. Preview it.</Title>
            <Lede>
              Select a photo in the event, click Generate, then choose a
              template. The preview matches that look.
            </Lede>

            <StepList
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={reduceMotion ? undefined : listVariants}
            >
              {steps.map(({ title, copy, Icon }) => (
                <StepItem
                  key={title}
                  variants={reduceMotion ? undefined : itemVariants}
                >
                  <IconWell>
                    <Icon size={18} weight="regular" aria-hidden="true" />
                  </IconWell>
                  <div>
                    <StepTitle>{title}</StepTitle>
                    <StepCopy>{copy}</StepCopy>
                  </div>
                </StepItem>
              ))}
            </StepList>

            <Looks aria-label="Looks in the walkthrough">
              <Look>
                <CustomLook aria-hidden="true">Custom</CustomLook>
                <LookLabel>Custom</LookLabel>
              </Look>
              {looks.map(({ src, label }) => (
                <Look key={label}>
                  <LookImage src={src} alt="" />
                  <LookLabel>{label}</LookLabel>
                </Look>
              ))}
            </Looks>

            <Actions
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.35, ease: easeOut }}
            >
              <Cta
                href="#studio"
                data-cursor="action"
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                Start Creating
              </Cta>
            </Actions>
          </Copy>

          <VideoCol
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.06 }}
          >
            <GenerateStepsPlayer />
          </VideoCol>
        </Panel>
      </Inner>
    </Section>
  )
}

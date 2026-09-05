import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Player, type PlayerRef } from '@remotion/player'
import { useReducedMotion } from 'motion/react'
import {
  AiGenerateSteps,
  DURATION_IN_FRAMES,
  FPS,
  HEIGHT,
  WIDTH,
} from '../../remotion/src/AiGenerateSteps'

const durationLabel = `${Math.round(DURATION_IN_FRAMES / FPS)}s`

const Shell = styled.div`
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 18px;
  background: var(--color-card);
  box-shadow: var(--shadow-lg);
`

const Chrome = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.7rem 0.9rem;
  border-bottom: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-cream) 70%, var(--color-card));
`

const ChromeTitle = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`

const Duration = styled.span`
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: var(--color-gold-wash);
  color: var(--color-accent-dark);
  font-size: 0.6875rem;
  font-weight: 700;
`

const Stage = styled.div`
  .remotion-player {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    background: var(--color-cream);
  }
`

export default function GenerateStepsPlayer() {
  const reduceMotion = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<PlayerRef>(null)

  useEffect(() => {
    const node = wrapRef.current
    const player = playerRef.current
    if (!node || !player || reduceMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          player.play()
        } else {
          player.pause()
        }
      },
      { threshold: 0.45 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <div ref={wrapRef}>
      <Shell>
        <Chrome>
          <ChromeTitle>AI Studio walkthrough</ChromeTitle>
          <Duration>{durationLabel}</Duration>
        </Chrome>
        <Stage>
          <Player
            ref={playerRef}
            className="remotion-player"
            aria-label="AI Generate walkthrough"
            component={AiGenerateSteps}
            durationInFrames={DURATION_IN_FRAMES}
            compositionWidth={WIDTH}
            compositionHeight={HEIGHT}
            fps={FPS}
            style={{ width: '100%' }}
            controls
            loop={!reduceMotion}
            autoPlay={false}
            clickToPlay
            showVolumeControls={false}
            acknowledgeRemotionLicense
            initiallyMuted
            numberOfSharedAudioTags={0}
            initialFrame={reduceMotion ? DURATION_IN_FRAMES - 1 : 0}
          />
        </Stage>
      </Shell>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Player, type PlayerRef } from '@remotion/player'
import { useReducedMotion } from 'motion/react'
import {
  AiStudioIntro,
  INTRO_DURATION,
  INTRO_FPS,
  INTRO_HEIGHT,
  INTRO_WIDTH,
} from '../../remotion/src/AiStudioIntro'

const Section = styled.section`
  overflow: hidden;
  background: #0d0f12;
`

const Stage = styled.div`
  .remotion-player {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    background: #0d0f12;
  }
`

export default function StudioIntro() {
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
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <Section id="film" aria-label="AI Studio film" ref={wrapRef}>
      <Stage>
        <Player
          ref={playerRef}
          className="remotion-player"
          aria-label="AI Studio generate and enhance film"
          component={AiStudioIntro}
          durationInFrames={INTRO_DURATION}
          compositionWidth={INTRO_WIDTH}
          compositionHeight={INTRO_HEIGHT}
          fps={INTRO_FPS}
          style={{ width: '100%' }}
          controls
          loop={!reduceMotion}
          autoPlay={false}
          clickToPlay
          showVolumeControls={false}
          acknowledgeRemotionLicense
          initiallyMuted
          numberOfSharedAudioTags={0}
          initialFrame={reduceMotion ? INTRO_DURATION - 1 : 0}
        />
      </Stage>
    </Section>
  )
}

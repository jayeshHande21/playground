import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { Player, type PlayerRef } from '@remotion/player'
import { useReducedMotion } from 'motion/react'
import { SpeakerHigh, SpeakerSlash } from '@phosphor-icons/react'
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
  position: relative;

  .remotion-player {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1280 / 500;
    background: #0d0f12;
  }
`

const Mute = styled.button`
  position: absolute;
  right: 12px;
  bottom: 52px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(253, 191, 54, 0.45);
  border-radius: 999px;
  background: rgba(13, 15, 18, 0.78);
  color: #fdbf36;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background: rgba(13, 15, 18, 0.94);
    border-color: #fdbf36;
  }

  &:focus-visible {
    outline: 2px solid #fdbf36;
    outline-offset: 2px;
  }
`

export default function StudioIntro() {
  const reduceMotion = useReducedMotion()
  const wrapRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<PlayerRef>(null)
  const userMuted = useRef(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const player = playerRef.current
    if (!player) return

    const syncMute = () => setMuted(player.isMuted())
    player.addEventListener('mutechange', syncMute)
    syncMute()
    return () => player.removeEventListener('mutechange', syncMute)
  }, [])

  useEffect(() => {
    const node = wrapRef.current
    const player = playerRef.current
    if (!node || !player || reduceMotion) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          player.play()
          if (!userMuted.current) player.unmute()
        } else {
          player.pause()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion])

  function toggleMute() {
    const player = playerRef.current
    if (!player) return

    if (player.isMuted()) {
      userMuted.current = false
      player.unmute()
      if (!player.isPlaying()) player.play()
    } else {
      userMuted.current = true
      player.mute()
    }
  }

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
          initiallyMuted={Boolean(reduceMotion)}
          initialFrame={reduceMotion ? INTRO_DURATION - 1 : 0}
        />
        <Mute
          type="button"
          aria-label={muted ? 'Unmute film sound' : 'Mute film sound'}
          aria-pressed={muted}
          onClick={(event) => {
            event.stopPropagation()
            toggleMute()
          }}
        >
          {muted ? (
            <SpeakerSlash size={18} weight="regular" aria-hidden="true" />
          ) : (
            <SpeakerHigh size={18} weight="regular" aria-hidden="true" />
          )}
        </Mute>
      </Stage>
    </Section>
  )
}

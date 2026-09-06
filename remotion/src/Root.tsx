import { Composition } from 'remotion'
import {
  AiGenerateSteps,
  DURATION_IN_FRAMES,
  FPS,
  HEIGHT,
  WIDTH,
} from './AiGenerateSteps'
import {
  AiStudioIntro,
  INTRO_DURATION,
  INTRO_FPS,
  INTRO_HEIGHT,
  INTRO_WIDTH,
} from './AiStudioIntro'
import './index.css'

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="AiStudioIntro"
        component={AiStudioIntro}
        durationInFrames={INTRO_DURATION}
        fps={INTRO_FPS}
        width={INTRO_WIDTH}
        height={INTRO_HEIGHT}
      />
      <Composition
        id="AiGenerateSteps"
        component={AiGenerateSteps}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  )
}

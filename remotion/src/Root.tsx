import { Composition } from 'remotion'
import {
  AiGenerateSteps,
  DURATION_IN_FRAMES,
  FPS,
  HEIGHT,
  WIDTH,
} from './AiGenerateSteps'
import './index.css'

export function RemotionRoot() {
  return (
    <Composition
      id="AiGenerateSteps"
      component={AiGenerateSteps}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  )
}

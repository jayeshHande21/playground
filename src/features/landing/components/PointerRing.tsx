import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'

type Zone = 'default' | 'link' | 'action' | 'dark'

const Layer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  pointer-events: none;
`

const Ring = styled(Layer)`
  width: 28px;
  height: 28px;
  margin: -14px 0 0 -14px;
  border: 1.5px solid var(--color-accent);
  border-radius: 50%;
`

const Dot = styled(Layer)`
  width: 6px;
  height: 6px;
  margin: -3px 0 0 -3px;
  border-radius: 50%;
  background: var(--color-accent);
`

function isFinePointer() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

function getZone(target: EventTarget | null): Zone {
  if (!(target instanceof Element)) return 'default'
  if (target.closest('[data-cursor="action"]')) return 'action'
  if (target.closest('[data-cursor="dark"]')) return 'dark'
  if (target.closest('a, button, [role="button"]')) return 'link'
  return 'default'
}

const ringLook: Record<
  Zone,
  { scale: number; background: string; border: string }
> = {
  default: {
    scale: 1,
    background: 'transparent',
    border: 'var(--color-accent)',
  },
  link: {
    scale: 1.35,
    background: 'color-mix(in srgb, var(--color-gold-wash) 55%, transparent)',
    border: 'var(--color-accent)',
  },
  action: {
    scale: 1.7,
    background: 'color-mix(in srgb, var(--color-accent) 22%, transparent)',
    border: 'var(--color-accent-dark)',
  },
  dark: {
    scale: 1.15,
    background: 'transparent',
    border: 'var(--color-cream)',
  },
}

const dotLook: Record<Zone, string> = {
  default: 'var(--color-accent)',
  link: 'var(--color-accent-dark)',
  action: 'var(--color-accent-dark)',
  dark: 'var(--color-cream)',
}

export default function PointerRing() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [zone, setZone] = useState<Zone>('default')
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const ringX = useSpring(x, { stiffness: 240, damping: 26, mass: 0.45 })
  const ringY = useSpring(y, { stiffness: 240, damping: 26, mass: 0.45 })
  const dotX = useSpring(x, { stiffness: 500, damping: 32, mass: 0.2 })
  const dotY = useSpring(y, { stiffness: 500, damping: 32, mass: 0.2 })

  useEffect(() => {
    if (reduceMotion) {
      setEnabled(false)
      return
    }

    const media = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setEnabled(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [reduceMotion])

  useEffect(() => {
    if (!enabled) return

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || !isFinePointer()) return
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
      setZone(getZone(event.target))
    }

    const hide = () => {
      setVisible(false)
      setZone('default')
    }

    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('pointerleave', hide)
    window.addEventListener('blur', hide)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', hide)
      window.removeEventListener('blur', hide)
    }
  }, [enabled, x, y])

  if (reduceMotion || !enabled) return null

  const ring = ringLook[zone]

  return (
    <>
      <Dot
        aria-hidden="true"
        style={{ x: dotX, y: dotY, backgroundColor: dotLook[zone] }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.18 }}
      />
      <Ring
        aria-hidden="true"
        style={{ x: ringX, y: ringY }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: ring.scale,
          backgroundColor: ring.background,
          borderColor: ring.border,
        }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </>
  )
}

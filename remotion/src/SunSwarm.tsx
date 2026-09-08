// @ts-nocheck — Three example modules are resolved by Vite.
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const PARAMS = {
  radiusOuter: 30,
  radiusInner: 15,
  neuroActivity: 0,
  chaosFactor: 0.5,
  pulseSpeed: 1,
} as const

class ParticlesSwarm {
  count: number
  container: HTMLElement
  speedMult = 1
  running = true
  raf = 0
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  composer: EffectComposer
  bloomPass: UnrealBloomPass
  dummy = new THREE.Object3D()
  target = new THREE.Vector3()
  pColor = new THREE.Color()
  geometry: THREE.TetrahedronGeometry
  material: THREE.MeshBasicMaterial
  mesh: THREE.InstancedMesh
  positions: THREE.Vector3[]
  clock = new THREE.Clock()
  observer: ResizeObserver

  constructor(container: HTMLElement, count = 20000) {
    this.count = count
    this.container = container

    this.scene = new THREE.Scene()
    this.scene.fog = new THREE.FogExp2(0x000000, 0.01)
    this.camera = new THREE.PerspectiveCamera(60, 1, 0.1, 2000)
    this.camera.position.set(0, 0, 100)

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor(0x000000, 1)
    this.renderer.domElement.style.display = 'block'
    this.renderer.domElement.style.width = '100%'
    this.renderer.domElement.style.height = '100%'
    this.container.appendChild(this.renderer.domElement)

    this.composer = new EffectComposer(this.renderer)
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.5, 0.4, 0.85)
    this.bloomPass.strength = 1.8
    this.bloomPass.radius = 0.4
    this.bloomPass.threshold = 0
    this.composer.addPass(this.bloomPass)

    this.geometry = new THREE.TetrahedronGeometry(0.25)
    this.material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    this.mesh = new THREE.InstancedMesh(this.geometry, this.material, this.count)
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    this.scene.add(this.mesh)

    const color = new THREE.Color()
    this.positions = []
    for (let i = 0; i < this.count; i++) {
      this.positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
        ),
      )
      this.mesh.setColorAt(i, color.setHex(0x00ff88))
    }

    this.observer = new ResizeObserver(() => this.resize())
    this.observer.observe(this.container)
    this.resize()
    this.animate = this.animate.bind(this)
    this.animate()
  }

  setRunning(next: boolean) {
    this.running = next
    if (next && this.raf === 0) this.animate()
  }

  resize() {
    const width = this.container.clientWidth
    const height = this.container.clientHeight
    if (width < 2 || height < 2) return

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height, false)
    this.composer.setSize(width, height)
  }

  animate() {
    if (!this.running) {
      this.raf = 0
      return
    }

    this.raf = requestAnimationFrame(this.animate)
    const time = this.clock.getElapsedTime() * this.speedMult
    const count = this.count
    const radiusOuter = PARAMS.radiusOuter
    const radiusInner = PARAMS.radiusInner
    const neuroActivity = PARAMS.neuroActivity
    const chaosFactor = PARAMS.chaosFactor
    const pulseSpeed = PARAMS.pulseSpeed
    const t = time * pulseSpeed
    const half = count / 2

    for (let i = 0; i < count; i++) {
      const iNorm = i / count
      const layer = iNorm < 0.5 ? 0 : 1
      const localI = layer === 0 ? i : i - half
      const phi = Math.acos(1 - 2 * (localI + 0.5) / half)
      const theta = Math.sqrt(half * Math.PI) * (localI + 0.5)
      const r = layer === 0 ? radiusOuter : radiusInner

      let x = r * Math.sin(phi) * Math.cos(theta)
      let y = r * Math.sin(phi) * Math.sin(theta)
      let z = r * Math.cos(phi)

      const noiseX = Math.sin(t * 0.5 + phi * 3) * Math.cos(t * 0.3 + theta * 2)
      const noiseY = Math.cos(t * 0.4 + phi * 2) * Math.sin(t * 0.6 + theta * 3)
      const noiseZ = Math.sin(t * 0.7 + phi + theta)
      const moveAmt = layer === 0 ? chaosFactor * 1.5 : chaosFactor * 0.5
      x += noiseX * moveAmt
      y += noiseY * moveAmt
      z += noiseZ * moveAmt

      const pulse = Math.sin(t * 2 + i * 0.01) * 0.05 + 1
      x *= pulse
      y *= pulse
      z *= pulse

      this.target.set(x, y, z)

      const hFinal = 0.6 * (1 - neuroActivity) + 0 * neuroActivity
      const lVar = layer === 0 ? 0.5 : 0.3 + neuroActivity * 0.4
      const sVar = layer === 0 ? 0.8 : 0.6 + neuroActivity * 0.3
      this.pColor.setHSL(hFinal, sVar, lVar)

      this.positions[i].lerp(this.target, 0.1)
      this.dummy.position.copy(this.positions[i])
      this.dummy.updateMatrix()
      this.mesh.setMatrixAt(i, this.dummy.matrix)
      this.mesh.setColorAt(i, this.pColor)
    }

    this.mesh.instanceMatrix.needsUpdate = true
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true
    this.composer.render()
  }

  dispose() {
    this.running = false
    cancelAnimationFrame(this.raf)
    this.raf = 0
    this.observer.disconnect()
    this.geometry.dispose()
    this.material.dispose()
    this.scene.remove(this.mesh)
    this.mesh.dispose()
    this.composer.dispose()
    this.renderer.dispose()
    this.renderer.domElement.remove()
  }
}

export function SunSwarm({ running = true }: { running?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const swarmRef = useRef<ParticlesSwarm | null>(null)
  const runningRef = useRef(running)
  runningRef.current = running

  useEffect(() => {
    const node = wrapRef.current
    if (!node) return

    const swarm = new ParticlesSwarm(node)
    swarmRef.current = swarm
    swarm.setRunning(runningRef.current)

    return () => {
      swarm.dispose()
      swarmRef.current = null
    }
  }, [])

  useEffect(() => {
    swarmRef.current?.setRunning(running)
  }, [running])

  return (
    <div
      ref={wrapRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}

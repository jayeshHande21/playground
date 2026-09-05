import { Img } from 'remotion'

export function Cover({
  src,
  radius = 0,
  position = 'center',
}: {
  src: string
  radius?: number
  position?: string
}) {
  return (
    <Img
      src={src}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: position,
        borderRadius: radius,
      }}
    />
  )
}

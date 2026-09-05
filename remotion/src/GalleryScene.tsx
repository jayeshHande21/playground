import { Img } from 'remotion'
import { Cover } from './Cover'
import { media } from './media'
import { colors, fonts } from './theme'

const galleryPhotos = [
  { src: media.eventGuests, name: '1000223641.jpg', size: '412.2 KB', dim: '1600 × 1066', position: 'center 22%' },
  { src: media.before, name: '1000223659.jpg', size: '556.7 KB', dim: '1600 × 1066', pick: true, position: 'center 12%' },
  { src: media.eventWalk, name: '1000223672.jpg', size: '488.1 KB', dim: '1600 × 1066', position: 'center 18%' },
  { src: media.eventCeremony, name: '1000223688.jpg', size: '501.4 KB', dim: '1600 × 1066', position: 'center 20%' },
  { src: media.eventFamily, name: '1000223701.jpg', size: '394.8 KB', dim: '1600 × 1066', position: 'center 16%' },
  { src: media.eventDance, name: '1000223714.jpg', size: '620.0 KB', dim: '1600 × 1066', position: 'center 24%' },
]

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path
        d="M3 7.2 L5.8 10 L11 3.8"
        fill="none"
        stroke={colors.white}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Wand() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M2 14 L9 7 M10.5 3.5 L12.5 5.5 M11 2 V3.4 M14 5 H12.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function Spark() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 1.5 L9.1 6.2 L13.8 7.4 L9.1 8.6 L8 13.3 L6.9 8.6 L2.2 7.4 L6.9 6.2 Z"
        fill="currentColor"
      />
    </svg>
  )
}

export function GalleryScene({
  selected,
  showBar,
}: {
  selected: boolean
  showBar: boolean
}) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#f4f5f7',
        fontFamily: fonts.body,
        color: colors.primary,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 48,
          padding: '0 16px',
          background: colors.white,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Img src={media.logo} style={{ height: 20, width: 'auto' }} />
          <div style={{ fontSize: 13, fontWeight: 600 }}>Imagen-Edits testing</div>
          <div style={{ fontSize: 11, color: colors.hint }}>186.04MB</div>
          <div
            style={{
              padding: '2px 8px',
              borderRadius: 999,
              background: '#dcfce7',
              color: colors.action,
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            Published
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, fontSize: 12, fontWeight: 600 }}>
          <span>Share</span>
          <span>Upload</span>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div
          style={{
            width: 52,
            padding: '12px 0',
            background: colors.white,
            borderRight: `1px solid ${colors.border}`,
          }}
        />
        <div
          style={{
            width: 196,
            padding: 12,
            background: colors.white,
            borderRight: `1px solid ${colors.border}`,
          }}
        >
          <div
            style={{
              overflow: 'hidden',
              height: 92,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <Cover src={media.before} position="center 12%" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
            <span>
              <strong>82</strong> Photos
            </span>
            <span style={{ color: colors.hint }}>0 Videos</span>
          </div>
          <div
            style={{
              margin: '14px 0 8px',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: colors.hint,
            }}
          >
            COLLECTIONS
          </div>
          {['All', 'Highlights', 'Stories', 'Capture'].map((item, index) => (
            <div
              key={item}
              style={{
                padding: '6px 8px',
                borderRadius: 8,
                background: index === 0 ? colors.cream : 'transparent',
                fontSize: 12,
                fontWeight: index === 0 ? 700 : 500,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minWidth: 0,
            padding: '12px 14px 70px',
          }}
        >
          <div
            style={{
              marginBottom: 10,
              padding: '8px 12px',
              borderRadius: 10,
              background: colors.white,
              color: colors.hint,
              fontSize: 12,
            }}
          >
            Search photos
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 10,
              flex: 1,
              minHeight: 0,
            }}
          >
            {galleryPhotos.map((photo) => {
              const isPick = Boolean(photo.pick && selected)
              return (
                <div
                  key={photo.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    minHeight: 0,
                    borderRadius: 10,
                    background: colors.white,
                    border: isPick ? '2px solid #2563eb' : `1px solid ${colors.border}`,
                    boxShadow: isPick ? '0 0 0 3px rgba(37, 99, 235, 0.2)' : 'none',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      flex: 1,
                      minHeight: 0,
                      overflow: 'hidden',
                    }}
                  >
                    <Cover src={photo.src} position={photo.position} />
                    {isPick ? (
                      <div
                        style={{
                          position: 'absolute',
                          top: 8,
                          left: 8,
                          display: 'grid',
                          placeItems: 'center',
                          width: 22,
                          height: 22,
                          borderRadius: 6,
                          background: '#2563eb',
                        }}
                      >
                        <Check />
                      </div>
                    ) : null}
                  </div>
                  <div style={{ padding: '6px 8px 8px' }}>
                    <div style={{ fontSize: 11, fontWeight: 600 }}>{photo.name}</div>
                    <div style={{ marginTop: 2, fontSize: 10, color: colors.hint }}>
                      {photo.size} · {photo.dim}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {showBar ? (
        <div
          style={{
            position: 'absolute',
            right: 18,
            bottom: 14,
            left: 18,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 52,
            padding: '0 14px',
            borderRadius: 12,
            background: colors.primary,
            color: colors.white,
            boxShadow: '0 12px 28px rgba(43, 49, 57, 0.28)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12 }}>
            <strong>1 select</strong>
            <span style={{ opacity: 0.7 }}>Delete</span>
            <span style={{ opacity: 0.7 }}>Add to</span>
            <span style={{ opacity: 0.7 }}>Tag</span>
            <span style={{ opacity: 0.7 }}>Cover</span>
            <span style={{ opacity: 0.7 }}>Download</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                minHeight: 34,
                padding: '0 14px',
                borderRadius: 8,
                background: colors.gold,
                color: colors.primary,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <Wand />
              Generate
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                minHeight: 34,
                padding: '0 14px',
                borderRadius: 8,
                background: colors.gold,
                color: colors.primary,
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              <Spark />
              Enhance
            </div>
            <div style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>1/74</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

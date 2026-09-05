import { Img, interpolate } from 'remotion'
import { Cover } from './Cover'
import { media, templates } from './media'
import { colors, fonts } from './theme'

const FILTERS = ['All templates', 'Wedding', 'Cover', 'Portrait'] as const

function Field({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <div
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: colors.hint,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: 32,
          padding: '0 10px',
          borderRadius: 8,
          border: `1px solid ${colors.border}`,
          background: colors.white,
          fontSize: 12,
          color: colors.primary,
        }}
      >
        <span>{value}</span>
        {accent ? (
          <svg width="11" height="11" viewBox="0 0 12 12" aria-hidden="true">
            <path
              d="M6 1 L7.3 4.4 L11 4.8 L8.2 7.2 L9 11 L6 9.1 L3 11 L3.8 7.2 L1 4.8 L4.7 4.4 Z"
              fill={colors.action}
            />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M2 3.4 L5 6.6 L8 3.4" fill="none" stroke={colors.hint} strokeWidth="1.3" />
          </svg>
        )}
      </div>
    </div>
  )
}

function TemplateCard({
  src,
  title,
  copy,
  credits,
  position,
  selected,
  press,
}: {
  src: string
  title: string
  copy: string
  credits: string
  position?: string
  selected?: boolean
  press?: number
}) {
  const scale = press == null ? 1 : interpolate(press, [0, 1], [1, 1.03])
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 0,
        borderRadius: 12,
        border: `1.5px solid ${selected ? colors.gold : colors.border}`,
        boxShadow: selected ? '0 0 0 4px rgba(253, 191, 54, 0.28)' : 'none',
        transform: `scale(${scale})`,
      }}
    >
      <Cover src={src} position={position ?? 'center top'} />
      <div
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          padding: '3px 7px',
          borderRadius: 999,
          background: 'rgba(255,255,255,0.92)',
          fontSize: 9,
          fontWeight: 700,
          color: colors.slate,
        }}
      >
        {credits}
      </div>
      <div
        style={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          left: 0,
          padding: '28px 10px 10px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(20, 22, 26, 0.82) 70%)',
          color: colors.white,
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.2 }}>{title}</div>
        <div
          style={{
            marginTop: 3,
            fontSize: 10,
            lineHeight: 1.35,
            color: 'rgba(255,255,255,0.82)',
          }}
        >
          {copy}
        </div>
      </div>
    </div>
  )
}

export function StudioScene({
  templateSelected,
  templatePress,
  typed,
  caretOn,
  settingsIn,
  progress,
  previewPress,
  showResult,
  resultIn,
}: {
  templateSelected: boolean
  templatePress: number
  typed: string
  caretOn: boolean
  settingsIn: number
  progress: number
  previewPress: number
  showResult: boolean
  resultIn: number
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#f3f4f6',
        fontFamily: fonts.body,
        color: colors.primary,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 52,
          padding: '0 18px',
          background: colors.white,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <Img src={media.logo} style={{ height: 22, width: 'auto' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12 }}>
          <span
            style={{
              padding: '5px 10px',
              borderRadius: 999,
              background: colors.cream,
              color: colors.slate,
            }}
          >
            1 selected
          </span>
          <span style={{ color: colors.action, fontWeight: 600 }}>Change selection</span>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <div
          style={{
            width: 56,
            padding: '16px 0',
            background: '#eef0f3',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minWidth: 0,
            padding: '12px 14px 10px',
            gap: 10,
          }}
        >
          <div
            style={{
              position: 'relative',
              overflow: 'hidden',
              height: 300,
              flexShrink: 0,
              borderRadius: 14,
            }}
          >
            <Cover src={media.trending} position="center 28%" />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(20,22,26,0.72) 0%, rgba(20,22,26,0.18) 52%, transparent 78%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 18,
                bottom: 16,
                maxWidth: 280,
                color: colors.white,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                }}
              >
                AI Studio
              </div>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 12,
                  fontWeight: 700,
                  color: colors.gold,
                }}
              >
                Trending now
              </div>
              <div style={{ marginTop: 3, fontSize: 13, lineHeight: 1.35 }}>
                Floral Magazine Cover — editorial poppies, charcoal studio light.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {FILTERS.map((filter, index) => (
              <div
                key={filter}
                style={{
                  padding: '5px 10px',
                  borderRadius: 999,
                  background: index === 0 ? colors.primary : colors.white,
                  color: index === 0 ? colors.white : colors.slate,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {filter}
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
              gap: 10,
              flex: 1,
              minHeight: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                minHeight: 0,
                borderRadius: 12,
                border: `1px dashed ${colors.border}`,
                background: '#eceff3',
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700 }}>Custom Template</div>
              <div
                style={{
                  padding: '0 10px',
                  color: colors.slate,
                  fontSize: 10,
                  lineHeight: 1.35,
                  textAlign: 'center',
                }}
              >
                Write your own prompt and skip the preset looks.
              </div>
            </div>
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                src={template.src}
                title={template.title}
                copy={template.copy}
                credits={template.credits}
                position={template.position}
                selected={templateSelected && template.id === 'watercolor'}
                press={template.id === 'watercolor' ? templatePress : undefined}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            width: 228,
            padding: '14px 12px',
            background: colors.white,
            borderLeft: `1px solid ${colors.border}`,
            opacity: interpolate(settingsIn, [0, 1], [0.6, 1]),
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 700 }}>Generate settings</div>
          <Field label="Model" value="Nano Banana Pro" />
          <Field label="Output format" value="jpeg" />
          <Field label="Resolution" value="1K" accent />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flex: 1 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: colors.hint,
              }}
            >
              Prompt
            </div>
            <div
              style={{
                flex: 1,
                minHeight: 72,
                padding: 8,
                borderRadius: 8,
                border: `1px solid ${colors.border}`,
                background: colors.cream,
                fontSize: 11,
                lineHeight: 1.45,
              }}
            >
              {typed}
              <span
                style={{
                  display: 'inline-block',
                  width: 1,
                  height: 12,
                  marginLeft: 1,
                  background: caretOn ? colors.gold : 'transparent',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 56,
          padding: '0 16px',
          background: colors.white,
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Img src={media.logo} style={{ height: 18, width: 'auto' }} />
          <div style={{ width: 1, height: 18, background: colors.border }} />
          <div style={{ fontSize: 13, fontWeight: 600 }}>
            {templateSelected ? 'South Indian Watercolor' : 'Choose a template'}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 120,
              height: 6,
              overflow: 'hidden',
              borderRadius: 999,
              background: colors.cream,
            }}
          >
            <div
              style={{
                width: `${progress * 100}%`,
                height: '100%',
                background: colors.gold,
              }}
            />
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              minHeight: 36,
              padding: '0 16px',
              borderRadius: 999,
              background: colors.action,
              color: colors.white,
              fontSize: 13,
              fontWeight: 700,
              transform: `scale(${interpolate(previewPress, [0, 1], [1, 0.96])})`,
            }}
          >
            Preview
          </div>
        </div>
      </div>

      {showResult ? (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `rgba(43, 49, 57, ${interpolate(resultIn, [0, 1], [0, 0.52])})`,
            opacity: resultIn,
          }}
        >
          <div
            style={{
              overflow: 'hidden',
              width: 320,
              height: 428,
              borderRadius: 16,
              background: colors.white,
              boxShadow: '0 24px 48px rgba(0,0,0,0.28)',
              transform: `translateY(${interpolate(resultIn, [0, 1], [20, 0])}px)`,
            }}
          >
            <Cover src={media.watercolor} position="center 16%" />
          </div>
        </div>
      ) : null}
    </div>
  )
}

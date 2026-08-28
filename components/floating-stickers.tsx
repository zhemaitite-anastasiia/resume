'use client'

import Image from 'next/image'
import { profile } from '@/lib/resume-data'
import { useEffect, useRef, useState } from 'react'
import { playPop } from '@/components/contact-modal'
import { NoteBubble } from '@/components/note-bubble'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

type Sticker = {
  src: string
  alt: string
  className: string
  size: number
  mobileSize?: number
  mobileOnly?: boolean
  drift?: boolean
  rot: number
  delay: number
  variant?: 'logo' | 'photo' | 'cutout'
  href?: string
  action?: 'contact'
  note?: string
}

const stickers: Sticker[] = [
  {
    src: '/stickers/headshot-circle.png',
    alt: 'Portrait of the candidate',
    drift: true,
    note: 'That\'s me. Platform engineer, Chicago. I spend my days making sure other engineers never have to think about the platform.',
    className: 'left-[4%] top-[3dvh] xl:left-[0%] xl:top-[3%]',
    size: 190,
    mobileSize: 150,
    rot: -4,
    delay: 0,
    variant: 'cutout',
  },
]

export function FloatingStickers() {
  const [openNote, setOpenNote] = useState<string | null>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const noteRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // click anywhere else, or press Escape, to dismiss
  useEffect(() => {
    if (!openNote) return
    const onDown = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      if (!el.closest('[data-note-root]')) setOpenNote(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenNote(null)
    }
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [openNote])

  return (
    <div ref={layerRef} className="pointer-events-none absolute inset-0 z-0">
      <div className="relative mx-auto h-full w-full max-w-[96vw]">
      {stickers.map((s) => {
        const isPhoto = s.variant === 'photo'
        const isCutout = s.variant === 'cutout'
        const vis = s.mobileOnly ? 'xl:hidden' : s.mobileSize ? '' : 'hidden xl:block'
        const interactive =
          'pointer-events-auto block cursor-pointer transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'
        const Frame = s.action || s.note ? 'button' : s.href ? 'a' : 'div'
        const frameProps = s.action
          ? {
              type: 'button' as const,
              'aria-label': s.alt,
              onClick: () => {
                playPop()
                window.dispatchEvent(new Event('open-contact'))
              },
              className: interactive,
            }
          : s.note
            ? {
                type: 'button' as const,
                'aria-label': s.alt,
                'aria-expanded': openNote === s.alt,
                onClick: () => {
                  playPop()
                  setOpenNote((cur) => (cur === s.alt ? null : s.alt))
                },
                className: interactive,
              }
            : s.href
              ? {
                  href: s.href,
                  target: s.href.startsWith('http') ? '_blank' : undefined,
                  rel: s.href.startsWith('http') ? 'noreferrer' : undefined,
                  'aria-label': s.alt,
                  className: interactive,
                }
              : { 'aria-hidden': true, className: 'block' }

        return (
          <div
            key={s.alt}
            ref={(el) => {
              noteRefs.current[s.alt] = el
            }}
            data-note-root={s.note ? '' : undefined}
            onMouseEnter={s.note ? () => setOpenNote(s.alt) : undefined}
            onMouseLeave={s.note ? () => setOpenNote((cur) => (cur === s.alt ? null : cur)) : undefined}
            className={`absolute ${vis} ${s.note ? 'pointer-events-auto' : ''} ${s.className}`}
            style={
              {
                '--w-sm': `${s.mobileSize ?? s.size}px`,
                '--w-lg': `clamp(${s.size}px, ${((s.size / 1050) * 100).toFixed(2)}vw, ${Math.round(s.size * 2.5)}px)`,
              } as React.CSSProperties
            }
          >
            <Frame
              {...frameProps}
              style={
                {
                  '--rot': `${s.rot}deg`,
                  animation: s.drift
                    ? `sticker-drift 22s ease-in-out ${s.delay}s infinite`
                    : `sticker-float ${isPhoto ? 7.5 : 6}s ease-in-out ${s.delay}s infinite`,
                } as React.CSSProperties
              }
            >
              <div
                className={
                  isPhoto
                    ? 'overflow-hidden rounded-full bg-white p-[10px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] ring-1 ring-black/10'
                    : isCutout
                      ? 'drop-shadow-[0_14px_28px_rgba(0,0,0,0.7)]'
                      : 'rounded-2xl bg-white p-2.5 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)] ring-1 ring-black/5'
                }
              >
                <Image
                  src={`${basePath}${s.src || '/placeholder.svg'}`}
                  alt={s.alt}
                  width={s.size}
                  height={s.size}
                  unoptimized
                  className={`${isPhoto ? 'block rounded-full object-cover' : ''} sticker-img`}
                />
              </div>
            </Frame>

            {s.note && openNote === s.alt && (
              <NoteBubble text={s.note} anchor={{ current: noteRefs.current[s.alt] ?? null }} />
            )}
          </div>
        )
      })}
      </div>
    </div>
  )
}

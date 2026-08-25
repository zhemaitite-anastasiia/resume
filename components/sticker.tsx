'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useTypewriter } from '@/hooks/use-typewriter'
import { playPop } from '@/components/contact-modal'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export type StickerSpec = {
  src: string
  alt: string
  size: number
  smallSize?: number
  rot: number
  delay: number
  note?: string
  href?: string
  action?: 'contact'
  drift?: boolean
}

/**
 * One sticker plus its hover note. Positioning is left to the caller so a
 * sticker can be anchored to a section (reliable at every width) or floated
 * against the viewport.
 */
export function Sticker({ spec, className = '' }: { spec: StickerSpec; className?: string }) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const inner =
    'pointer-events-auto block cursor-pointer transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

  const Frame = spec.action || spec.note ? 'button' : spec.href ? 'a' : 'div'
  const frameProps = spec.action
    ? {
        type: 'button' as const,
        'aria-label': spec.alt,
        onClick: () => {
          playPop()
          window.dispatchEvent(new Event('open-contact'))
        },
        className: inner,
      }
    : spec.note
      ? {
          type: 'button' as const,
          'aria-label': spec.alt,
          'aria-expanded': open,
          onClick: () => {
            playPop()
            setOpen((v) => !v)
          },
          className: inner,
        }
      : spec.href
        ? {
            href: spec.href,
            target: spec.href.startsWith('http') ? '_blank' : undefined,
            rel: spec.href.startsWith('http') ? 'noreferrer' : undefined,
            'aria-label': spec.alt,
            className: inner,
          }
        : { 'aria-hidden': true, className: 'block' }

  return (
    <div
      ref={rootRef}
      onMouseEnter={spec.note ? () => setOpen(true) : undefined}
      onMouseLeave={spec.note ? () => setOpen(false) : undefined}
      className={`absolute ${spec.note ? 'pointer-events-auto' : ''} ${className}`}
      style={
        {
          '--sz': `${spec.smallSize ?? spec.size}px`,
          '--sz-lg': `clamp(${spec.size}px, ${((spec.size / 1150) * 100).toFixed(2)}vw, ${Math.round(spec.size * 1.45)}px)`,
        } as React.CSSProperties
      }
    >
      <Frame
        {...frameProps}
        style={
          {
            '--rot': `${spec.rot}deg`,
            animation: spec.drift
              ? `sticker-drift 22s ease-in-out ${spec.delay}s infinite`
              : `sticker-float 6s ease-in-out ${spec.delay}s infinite`,
          } as React.CSSProperties
        }
      >
        <div className="drop-shadow-[0_14px_28px_rgba(0,0,0,0.7)]">
          <Image
            src={`${basePath}${spec.src}`}
            alt={spec.alt}
            width={spec.size}
            height={spec.size}
            unoptimized
            className="h-auto w-[var(--sz)] xl:w-[var(--sz-lg)]"
          />
        </div>
      </Frame>

      {spec.note && open && <NoteBubble text={spec.note} />}
    </div>
  )
}

function NoteBubble({ text }: { text: string }) {
  const { text: typed, done } = useTypewriter(text, text, 15)
  return (
    <div className="animate-slide-in pointer-events-auto absolute left-1/2 top-[calc(100%+14px)] z-30 w-[248px] -translate-x-1/2">
      <div
        aria-hidden
        className="absolute -top-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-foreground/70 bg-card"
      />
      <div className="relative rounded-xl border border-foreground/70 bg-card px-4 py-3 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.9)]">
        <p className={`text-[13px] leading-relaxed text-foreground ${done ? '' : 'caret'}`}>{typed}</p>
      </div>
    </div>
  )
}

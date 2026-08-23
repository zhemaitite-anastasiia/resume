'use client'

import Image from 'next/image'
import { profile } from '@/lib/resume-data'
import { useEffect, useRef, useState } from 'react'
import { playPop } from '@/components/contact-modal'
import { useTypewriter } from '@/hooks/use-typewriter'

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
    className: 'left-[9%] top-[6%] md:left-[7%] md:top-[3%]',
    size: 232,
    mobileSize: 104,
    rot: -4,
    delay: 0,
    variant: 'cutout',
  },
  {
    src: '/stickers/call-me.png',
    alt: 'Call me',
    href: `tel:+1${profile.phone.replace(/\D/g, '')}`,
    className: 'bottom-[3%] right-[5%] md:bottom-auto md:left-[4%] md:right-auto md:top-[13%]',
    size: 148,
    mobileSize: 84,
    rot: -13,
    delay: 1.6,
    variant: 'cutout',
  },
  {
    src: '/stickers/email-me.png',
    alt: 'Email me',
    action: 'contact',
    className: 'right-[3%] top-[2%] md:left-auto md:right-[5%] md:top-[5%]',
    size: 112,
    mobileSize: 66,
    rot: 10,
    delay: 0.6,
    variant: 'cutout',
  },
  {
    src: '/stickers/laptop.png',
    alt: 'Laptop',
    note: 'Where most of it happens. Terraform on one side, a cluster on the other, and Claude Code somewhere in between.',
    className: 'right-[7%] top-[20%]',
    size: 168,
    rot: 13,
    delay: 1.1,
    variant: 'cutout',
  },
  {
    src: '/stickers/dog.png',
    alt: 'Dog',
    note: 'This is my cocker spaniel. She supervises every deploy and has never once approved a Friday release.',
    className: 'left-[7%] top-[30%]',
    size: 138,
    rot: -9,
    delay: 1.8,
    variant: 'cutout',
  },
  {
    src: '/stickers/cka-badge.png',
    alt: 'Certified Kubernetes Administrator',
    note: 'Certified Kubernetes Administrator, May 2026. The one that actually made me read the control plane docs properly.',
    className: 'left-[7%] top-[48%]',
    size: 140,
    rot: 8,
    delay: 0.9,
    variant: 'cutout',
  },
  {
    src: '/stickers/plane.png',
    alt: 'Airplane',
    note: 'I keep a running list of places I haven\'t flown to yet. It gets longer faster than it gets shorter.',
    className: 'right-[7%] top-[39%]',
    size: 158,
    rot: 15,
    delay: 2.1,
    variant: 'cutout',
  },
  {
    src: '/stickers/linkedin.png',
    alt: 'LinkedIn',
    href: profile.linkedinUrl,
    className: 'bottom-[3%] left-[5%] md:bottom-auto md:left-[6%] md:top-[66%]',
    size: 104,
    mobileSize: 54,
    rot: -16,
    delay: 2.4,
    variant: 'cutout',
  },
  {
    src: '/stickers/aws-saa.png',
    alt: 'AWS Certified Solutions Architect – Associate',
    note: 'AWS Solutions Architect – Associate, May 2026. Same month as the CKA, which I do not recommend.',
    className: 'right-[7%] top-[57%]',
    size: 142,
    rot: -11,
    delay: 1.4,
    variant: 'cutout',
  },
  {
    src: '/stickers/cap-point.png',
    alt: 'Hand pointing at a cap',
    note: 'Action always. It\'s the thing I fall back on when a problem is big enough that planning starts to feel like avoiding it.',
    className: 'right-[7%] top-[76%]',
    size: 176,
    rot: -7,
    delay: 0.3,
    variant: 'cutout',
  },
]

export function FloatingStickers() {
  const [openNote, setOpenNote] = useState<string | null>(null)
  const layerRef = useRef<HTMLDivElement>(null)

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
      {stickers.map((s) => {
        const isPhoto = s.variant === 'photo'
        const isCutout = s.variant === 'cutout'
        const vis = s.mobileOnly ? 'md:hidden' : s.mobileSize ? '' : 'hidden md:block'
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
            data-note-root={s.note ? '' : undefined}
            className={`absolute ${vis} ${s.className}`}
            style={
              {
                '--sz': `${s.mobileSize ?? s.size}px`,
                '--sz-md': `${s.size}px`,
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
                  className={`${isPhoto ? 'block rounded-full object-cover' : ''} h-auto w-[var(--sz)] md:w-[var(--sz-md)]`}
                />
              </div>
            </Frame>

            {s.note && openNote === s.alt && <NoteBubble text={s.note} />}
          </div>
        )
      })}
    </div>
  )
}

function NoteBubble({ text }: { text: string }) {
  const { text: typed, done } = useTypewriter(text, text, 15)
  return (
    <div className="pointer-events-auto absolute left-1/2 top-[calc(100%+14px)] z-30 w-[248px] -translate-x-1/2 animate-slide-in">
      <div
        aria-hidden
        className="absolute -top-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-foreground/70 bg-card"
      />
      <div className="relative rounded-xl border border-foreground/70 bg-card px-4 py-3 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.9)]">
        <p className={`text-[13px] leading-relaxed text-foreground ${done ? '' : 'caret'}`}>
          {typed}
        </p>
      </div>
    </div>
  )
}

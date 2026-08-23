'use client'

import Image from 'next/image'
import { profile } from '@/lib/resume-data'
import { playPop } from '@/components/contact-modal'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

type Sticker = {
  src: string
  alt: string
  className: string
  size: number
  mobileSize?: number
  mobileOnly?: boolean
  rot: number
  delay: number
  variant?: 'logo' | 'photo' | 'cutout'
  href?: string
  action?: 'contact'
  note?: string
}

const stickers: Sticker[] = [
  {
    src: '/stickers/headshot.png',
    alt: 'Portrait of the candidate',
    note: 'That\'s me. Platform engineer, Chicago. I spend my days making sure other engineers never have to think about the platform.',
    className: 'left-[0%] top-[1%]',
    size: 236,
    mobileSize: 112,
    mobileOnly: true,
    rot: -4,
    delay: 0,
    variant: 'cutout',
  },
  {
    src: '/stickers/call-me.png',
    alt: 'Call me',
    href: `tel:+1${profile.phone.replace(/\D/g, '')}`,
    className: 'bottom-[3%] right-[5%] md:bottom-auto md:left-[3%] md:right-auto md:top-[7%]',
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
    className: 'right-[4%] top-[17%]',
    size: 168,
    rot: 13,
    delay: 1.1,
    variant: 'cutout',
  },
  {
    src: '/stickers/dog.png',
    alt: 'Dog',
    note: 'This is my cocker spaniel. She supervises every deploy and has never once approved a Friday release.',
    className: 'left-[4%] top-[23%]',
    size: 138,
    rot: -9,
    delay: 1.8,
    variant: 'cutout',
  },
  {
    src: '/stickers/cka-badge.png',
    alt: 'Certified Kubernetes Administrator',
    note: 'Certified Kubernetes Administrator, May 2026. The one that actually made me read the control plane docs properly.',
    className: 'left-[3%] top-[38%]',
    size: 140,
    rot: 8,
    delay: 0.9,
    variant: 'cutout',
  },
  {
    src: '/stickers/plane.png',
    alt: 'Airplane',
    note: 'I keep a running list of places I haven\'t flown to yet. It gets longer faster than it gets shorter.',
    className: 'right-[4%] top-[45%]',
    size: 158,
    rot: 15,
    delay: 2.1,
    variant: 'cutout',
  },
  {
    src: '/stickers/linkedin.png',
    alt: 'LinkedIn',
    href: profile.linkedinUrl,
    className: 'bottom-[3%] left-[5%] md:bottom-auto md:left-[5%] md:top-[58%]',
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
    className: 'right-[5%] top-[70%]',
    size: 142,
    rot: -11,
    delay: 1.4,
    variant: 'cutout',
  },
  {
    src: '/stickers/cap-point.png',
    alt: 'Hand pointing at a cap',
    note: 'Action always. It\'s the thing I fall back on when a problem is big enough that planning starts to feel like avoiding it.',
    className: 'left-[4%] top-[84%]',
    size: 176,
    rot: -7,
    delay: 0.3,
    variant: 'cutout',
  },
]

export function FloatingStickers() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {stickers.map((s) => {
        const isPhoto = s.variant === 'photo'
        const isCutout = s.variant === 'cutout'
        const vis = s.mobileOnly ? 'md:hidden' : s.mobileSize ? '' : 'hidden md:block'
        const interactive = `absolute ${vis} pointer-events-auto cursor-pointer transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${s.className}`
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
              onClick: () => {
                playPop()
                window.dispatchEvent(
                  new CustomEvent('open-note', {
                    detail: { src: s.src, alt: s.alt, text: s.note },
                  }),
                )
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
          : { 'aria-hidden': true, className: `absolute ${vis} ${s.className}` }
        return (
          <Frame
            key={s.alt}
            {...frameProps}
            style={
              {
                '--rot': `${s.rot}deg`,
                '--sz': `${s.mobileSize ?? s.size}px`,
                '--sz-md': `${s.size}px`,
                animation: `sticker-float ${isPhoto ? 7.5 : 6}s ease-in-out ${s.delay}s infinite`,
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
        )
      })}
    </div>
  )
}

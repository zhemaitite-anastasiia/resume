import Image from 'next/image'
import { profile } from '@/lib/resume-data'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

type Sticker = {
  src: string
  alt: string
  className: string
  size: number
  mobileSize?: number
  rot: number
  delay: number
  variant?: 'logo' | 'photo' | 'cutout'
  href?: string
}

const stickers: Sticker[] = [
  {
    src: '/stickers/headshot.png',
    alt: 'Portrait of the candidate',
    className: 'left-[-2%] top-[1%] md:left-[3%] md:top-[20%]',
    size: 268,
    mobileSize: 112,
    rot: -6,
    delay: 0,
    variant: 'cutout',
  },
  {
    src: '/stickers/email-me.png',
    alt: 'Email me',
    href: `mailto:${profile.email}`,
    className: 'right-[3%] top-[2%] md:left-[8%] md:right-auto md:top-[3%]',
    size: 104,
    mobileSize: 66,
    rot: -8,
    delay: 0.6,
    variant: 'cutout',
  },
  {
    src: '/stickers/linkedin.png',
    alt: 'LinkedIn',
    href: profile.linkedinUrl,
    className: 'bottom-[3%] left-[5%] md:bottom-auto md:left-[17%] md:top-[54%]',
    size: 92,
    mobileSize: 54,
    rot: -11,
    delay: 2.4,
    variant: 'cutout',
  },
  {
    src: '/stickers/cka-badge.png',
    alt: 'Certified Kubernetes Administrator',
    className: 'bottom-[3%] right-[5%] md:bottom-auto md:left-[3%] md:right-auto md:top-[64%]',
    size: 124,
    mobileSize: 68,
    rot: 8,
    delay: 0.9,
    variant: 'cutout',
  },
  {
    src: '/stickers/laptop.png',
    alt: 'Laptop',
    className: 'right-[6%] top-[16%]',
    size: 168,
    rot: 7,
    delay: 1.1,
    variant: 'cutout',
  },
  {
    src: '/stickers/dog.png',
    alt: 'Dog',
    className: 'right-[10%] top-[35%]',
    size: 132,
    rot: 6,
    delay: 1.8,
    variant: 'cutout',
  },
  {
    src: '/stickers/plane.png',
    alt: 'Airplane',
    className: 'left-[13%] top-[78%]',
    size: 152,
    rot: 11,
    delay: 2.1,
    variant: 'cutout',
  },
  {
    src: '/stickers/aws-saa.png',
    alt: 'AWS Certified Solutions Architect – Associate',
    className: 'right-[7%] top-[58%]',
    size: 128,
    rot: -7,
    delay: 1.4,
    variant: 'cutout',
  },
  {
    src: '/stickers/cap-point.png',
    alt: 'Hand pointing at a cap',
    className: 'right-[2%] top-[80%]',
    size: 176,
    rot: -6,
    delay: 0.3,
    variant: 'cutout',
  },
]

export function FloatingStickers() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {stickers.map((s) => {
        const isPhoto = s.variant === 'photo'
        const isCutout = s.variant === 'cutout'
        const vis = s.mobileSize ? '' : 'hidden md:block'
        const Frame = s.href ? 'a' : 'div'
        const frameProps = s.href
          ? {
              href: s.href,
              target: s.href.startsWith('http') ? '_blank' : undefined,
              rel: s.href.startsWith('http') ? 'noreferrer' : undefined,
              'aria-label': s.alt,
              className: `absolute ${vis} pointer-events-auto cursor-pointer transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${s.className}`,
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

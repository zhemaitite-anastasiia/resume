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
    className: 'left-[0%] top-[1%] md:left-[37%] md:top-[0%]',
    size: 252,
    mobileSize: 112,
    rot: -4,
    delay: 0,
    variant: 'cutout',
  },
  {
    src: '/stickers/call-me.png',
    alt: 'Call me',
    href: `tel:+1${profile.phone.replace(/\D/g, '')}`,
    className: 'bottom-[3%] right-[5%] md:bottom-auto md:left-[3%] md:right-auto md:top-[9%]',
    size: 148,
    mobileSize: 84,
    rot: -13,
    delay: 1.6,
    variant: 'cutout',
  },
  {
    src: '/stickers/email-me.png',
    alt: 'Email me',
    href: `mailto:${profile.email}`,
    className: 'right-[3%] top-[2%] md:left-auto md:right-[4%] md:top-[4%]',
    size: 112,
    mobileSize: 66,
    rot: 10,
    delay: 0.6,
    variant: 'cutout',
  },
  {
    src: '/stickers/linkedin.png',
    alt: 'LinkedIn',
    href: profile.linkedinUrl,
    className: 'bottom-[3%] left-[5%] md:bottom-auto md:left-[8%] md:top-[46%]',
    size: 100,
    mobileSize: 54,
    rot: -16,
    delay: 2.4,
    variant: 'cutout',
  },
  {
    src: '/stickers/laptop.png',
    alt: 'Laptop',
    className: 'right-[2%] top-[24%]',
    size: 172,
    rot: 13,
    delay: 1.1,
    variant: 'cutout',
  },
  {
    src: '/stickers/dog.png',
    alt: 'Dog',
    className: 'left-[13%] top-[28%]',
    size: 132,
    rot: -9,
    delay: 1.8,
    variant: 'cutout',
  },
  {
    src: '/stickers/plane.png',
    alt: 'Airplane',
    className: 'right-[9%] top-[46%]',
    size: 150,
    rot: 15,
    delay: 2.1,
    variant: 'cutout',
  },
  {
    src: '/stickers/cka-badge.png',
    alt: 'Certified Kubernetes Administrator',
    className: 'left-[2%] top-[70%]',
    size: 136,
    rot: 8,
    delay: 0.9,
    variant: 'cutout',
  },
  {
    src: '/stickers/aws-saa.png',
    alt: 'AWS Certified Solutions Architect – Associate',
    className: 'right-[4%] top-[66%]',
    size: 138,
    rot: -11,
    delay: 1.4,
    variant: 'cutout',
  },
  {
    src: '/stickers/cap-point.png',
    alt: 'Hand pointing at a cap',
    className: 'left-[17%] top-[84%]',
    size: 178,
    rot: -7,
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

import Image from 'next/image'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

type Sticker = {
  src: string
  alt: string
  className: string
  size: number
  rot: number
  delay: number
  variant?: 'logo' | 'photo' | 'cutout'
}

// Positioned around the deck, avoiding the center column where the card sits.
const stickers: Sticker[] = [
  {
    src: '/stickers/headshot.png',
    alt: 'Portrait of the candidate',
    className: 'left-[2%] top-[28%]',
    size: 210,
    rot: -7,
    delay: 0,
    variant: 'cutout',
  },
  {
    src: '/stickers/email-me.png',
    alt: 'Email me',
    className: 'left-[5%] top-[8%]',
    size: 128,
    rot: -8,
    delay: 0.6,
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
    src: '/stickers/cka-badge.png',
    alt: 'Certified Kubernetes Administrator',
    className: 'left-[5%] top-[60%]',
    size: 156,
    rot: 8,
    delay: 0.9,
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
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block">
      {stickers.map((s) => {
        const isPhoto = s.variant === 'photo'
        const isCutout = s.variant === 'cutout'
        return (
          <div
            key={s.alt}
            className={`absolute ${s.className}`}
            style={
              {
                '--rot': `${s.rot}deg`,
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
                className={isPhoto ? 'block rounded-full object-cover' : 'h-auto w-auto'}
                style={isCutout ? { width: s.size, height: 'auto' } : { width: s.size, height: s.size }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

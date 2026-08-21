import Image from 'next/image'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

type Sticker = {
  src: string
  alt: string
  className: string
  size: number
  rot: number
  delay: number
  variant?: 'logo' | 'photo'
}

// Positioned around the deck, avoiding the center column where the card sits.
const stickers: Sticker[] = [
  {
    src: '/stickers/headshot.png',
    alt: 'Portrait of the candidate',
    className: 'left-[2%] top-[30%]',
    size: 168,
    rot: -7,
    delay: 0,
    variant: 'photo',
  },
]

export function FloatingStickers() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block">
      {stickers.map((s) => {
        const isPhoto = s.variant === 'photo'
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
                  ? 'overflow-hidden rounded-[26px] bg-white p-2 shadow-[0_18px_44px_-10px_rgba(0,0,0,0.85)] ring-1 ring-black/5'
                  : 'rounded-2xl bg-white p-2.5 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)] ring-1 ring-black/5'
              }
            >
              <Image
                src={`${basePath}${s.src || '/placeholder.svg'}`}
                alt={s.alt}
                width={s.size}
                height={s.size}
                unoptimized
                className={isPhoto ? 'block rounded-[18px] object-cover' : 'h-auto w-auto'}
                style={{ width: s.size, height: s.size }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

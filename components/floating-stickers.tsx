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
  { src: '/logos/kubernetes.svg', alt: 'Kubernetes', className: 'left-[6%] top-[10%]', size: 66, rot: -12, delay: 0.5 },
  { src: '/logos/aws.svg', alt: 'Amazon Web Services', className: 'left-[19%] top-[72%]', size: 62, rot: 8, delay: 0.6 },
  { src: '/logos/terraform.svg', alt: 'Terraform', className: 'left-[21%] top-[16%]', size: 56, rot: 14, delay: 1.1 },
  { src: '/logos/docker.svg', alt: 'Docker', className: 'left-[3%] top-[80%]', size: 58, rot: 10, delay: 0.9 },
  { src: '/logos/datadog.svg', alt: 'Datadog', className: 'right-[6%] top-[12%]', size: 64, rot: 12, delay: 0.4 },
  { src: '/logos/grafana.svg', alt: 'Grafana', className: 'right-[3%] top-[40%]', size: 60, rot: -10, delay: 1.3 },
  { src: '/logos/prometheus.svg', alt: 'Prometheus', className: 'right-[11%] top-[68%]', size: 62, rot: 9, delay: 0.7 },
  { src: '/logos/kafka.svg', alt: 'Apache Kafka', className: 'right-[19%] top-[82%]', size: 54, rot: -14, delay: 0.2 },
  { src: '/logos/github.svg', alt: 'GitHub', className: 'right-[19%] top-[6%]', size: 58, rot: -6, delay: 1.0 },
  { src: '/logos/argocd.svg', alt: 'Argo CD', className: 'right-[13%] top-[26%]', size: 52, rot: -16, delay: 1.5 },
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

'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { slides, profile } from '@/lib/resume-data'
import { SlideContent } from '@/components/slide-content'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export function ResumeDeck() {
  const [active, setActive] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean) as HTMLElement[]

    // Reveal anything at or above the fold. Runs on mount and on scroll, so a
    // refresh mid-page or a jump via the rail can never leave a section stuck
    // at opacity 0.
    const revealPassed = () => {
      els.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
          el.classList.add('is-revealed')
        }
      })
    }
    revealPassed()
    window.addEventListener('scroll', revealPassed, { passive: true })
    window.addEventListener('resize', revealPassed)

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.index)
            if (!Number.isNaN(i)) setActive(i)
          }
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )

    els.forEach((el) => spy.observe(el))
    return () => {
      window.removeEventListener('scroll', revealPassed)
      window.removeEventListener('resize', revealPassed)
      spy.disconnect()
    }
  }, [])

  const goTo = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <>
      {/* progress rail */}
      <nav
        aria-label="Sections"
        className="fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-2.5 lg:flex"
      >
        {slides.map((s, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to section ${i + 1}`}
            aria-current={i === active}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active
                ? 'h-6 w-1.5 bg-accent'
                : 'h-1.5 w-1.5 bg-border hover:bg-muted-foreground'
            }`}
          />
        ))}
      </nav>

      <div className="pointer-events-none relative z-10 w-full">
        {slides.map((slide, i) => {
          const isHero = i === 0
          return (
            <section
              key={i}
              data-index={i}
              ref={(el) => {
                sectionRefs.current[i] = el
              }}
              className={`reveal pointer-events-auto mx-auto flex w-full max-w-2xl flex-col justify-center px-1 ${
                isHero ? 'min-h-[92dvh] pt-[14vh] md:pt-[19vh]' : 'min-h-[62vh] py-16 md:py-10'
              }`}
            >
              <div className="relative">

                <div
                  aria-hidden
                  className="absolute inset-x-3 top-3 -z-10 h-full rounded-3xl border border-[color-mix(in_srgb,var(--brand-navy)_70%,white_10%)] bg-[color-mix(in_srgb,var(--brand-navy)_45%,var(--card))]"
                />
                <div
                  aria-hidden
                  className="absolute inset-x-6 top-6 -z-20 h-full rounded-3xl border border-[color-mix(in_srgb,var(--brand-navy)_55%,transparent)] bg-[color-mix(in_srgb,var(--brand-navy)_28%,var(--card))]"
                />

                <article className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] sm:p-8">
                  <header className="mb-5 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground">{profile.name}</span>
                    </p>
                    <span className="text-sm tabular-nums">
                      <span className="font-bold text-foreground">{i + 1}</span>
                      <span className="mx-1 text-muted-foreground">/</span>
                      <span className="text-muted-foreground">{slides.length}</span>
                    </span>
                  </header>

                  <div className="flex flex-1 flex-col">
                    <SlideContent slide={slide} index={i} />
                  </div>
                </article>
              </div>

              {isHero && (
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  className="group mx-auto mt-10 flex flex-col items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="tracking-widest uppercase">Scroll</span>
                  <ChevronDown className="h-4 w-4 animate-bounce transition-transform group-hover:translate-y-0.5" />
                </button>
              )}
            </section>
          )
        })}
      </div>
    </>
  )
}

'use client'

import { useCallback, useEffect, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { slides, profile } from '@/lib/resume-data'
import { SlideContent } from '@/components/slide-content'

export function ResumeDeck() {
  const [index, setIndex] = useState(0)
  const total = slides.length

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((prev) => Math.min(Math.max(prev + dir, 0), total - 1))
    },
    [total],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const slide = slides[index]

  return (
    <div className="relative z-10 w-full max-w-xl">
      {/* Stacked cards behind the active one */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute inset-x-3 top-3 -z-10 h-full rounded-3xl border border-border bg-card/60"
        />
        <div
          aria-hidden
          className="absolute inset-x-6 top-6 -z-20 h-full rounded-3xl border border-border bg-card/30"
        />

        <article className="flex min-h-[460px] flex-col rounded-3xl border border-border bg-card p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] sm:p-9">
          <header className="mb-7 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground">{profile.name}</span>
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm tabular-nums">
                <span className="font-bold text-foreground">{index + 1}</span>
                <span className="mx-1 text-muted-foreground">/</span>
                <span className="text-muted-foreground">{total}</span>
              </span>
              <div className="flex items-center gap-1.5">
                <NavButton
                  label="Previous slide"
                  onClick={() => go(-1)}
                  disabled={index === 0}
                >
                  <ChevronUp className="h-4 w-4" />
                </NavButton>
                <NavButton
                  label="Next slide"
                  onClick={() => go(1)}
                  disabled={index === total - 1}
                >
                  <ChevronDown className="h-4 w-4" />
                </NavButton>
              </div>
            </div>
          </header>

          <div key={index} className="flex flex-1 flex-col">
            <SlideContent slide={slide} index={index} />
          </div>
        </article>
      </div>

      {/* Progress dots */}
      <div className="mt-6 flex items-center justify-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-accent' : 'w-1.5 bg-border hover:bg-muted-foreground'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function NavButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground"
    >
      {children}
    </button>
  )
}

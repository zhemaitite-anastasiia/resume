'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTypewriter } from '@/hooks/use-typewriter'

/**
 * The hover note for a sticker.
 *
 * On wide screens it's anchored under the sticker. On narrow screens a bubble
 * centred on a sticker near the edge would run off-screen, so it switches to a
 * fixed, viewport-width strip positioned just below the sticker instead.
 */
export function NoteBubble({ text, anchor }: { text: string; anchor: React.RefObject<HTMLElement | null> }) {
  const { text: typed, done } = useTypewriter(text, text, 15)
  const [fixedTop, setFixedTop] = useState<number | null>(null)
  const boxRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const narrow = window.matchMedia('(max-width: 1279px)').matches
    if (!narrow || !anchor.current) {
      setFixedTop(null)
      return
    }
    const place = () => {
      const r = anchor.current?.getBoundingClientRect()
      if (!r) return
      // keep it on screen even when the sticker sits near the bottom
      const h = boxRef.current?.offsetHeight ?? 120
      const below = r.bottom + 12
      setFixedTop(below + h > window.innerHeight - 12 ? Math.max(12, r.top - h - 12) : below)
    }
    place()
    window.addEventListener('scroll', place, { passive: true })
    window.addEventListener('resize', place)
    return () => {
      window.removeEventListener('scroll', place)
      window.removeEventListener('resize', place)
    }
  }, [anchor, typed])

  const isFixed = fixedTop !== null

  const node = (
    <div
      ref={boxRef}
      style={isFixed ? { top: fixedTop } : undefined}
      className={
        isFixed
          ? 'pointer-events-auto fixed inset-x-4 z-50 animate-slide-in'
          : 'pointer-events-auto absolute left-1/2 top-[calc(100%+14px)] z-50 w-[248px] -translate-x-1/2 animate-slide-in'
      }
    >
      {!isFixed && (
        <div
          aria-hidden
          className="absolute -top-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-foreground/70 bg-card"
        />
      )}
      <div className="relative rounded-xl border border-foreground/70 bg-card px-4 py-3 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.9)]">
        <p className={`text-[13px] leading-relaxed text-foreground ${done ? '' : 'caret'}`}>{typed}</p>
      </div>
    </div>
  )

  // A transformed ancestor would make `fixed` resolve against the sticker
  // rather than the viewport, so the mobile bubble goes through a portal.
  return isFixed && typeof document !== 'undefined' ? createPortal(node, document.body) : node
}

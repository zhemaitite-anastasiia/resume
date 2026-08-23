'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { useTypewriter } from '@/hooks/use-typewriter'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export type NoteDetail = { src: string; alt: string; text: string }

export function StickerNote() {
  const [note, setNote] = useState<NoteDetail | null>(null)
  const [seq, setSeq] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<NoteDetail>).detail
      if (!detail) return
      setNote(detail)
      setSeq((n) => n + 1)
    }
    window.addEventListener('open-note', onOpen)
    return () => window.removeEventListener('open-note', onOpen)
  }, [])

  useEffect(() => {
    if (!note) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNote(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [note])

  if (!note) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={note.alt}
      onMouseDown={(e) => {
        if (!panelRef.current?.contains(e.target as Node)) setNote(null)
      }}
    >
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />
      <div
        ref={panelRef}
        className="animate-slide-in relative w-full max-w-sm rounded-2xl border border-border bg-card p-5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => setNote(null)}
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <img
          src={`${basePath}${note.src}`}
          alt=""
          aria-hidden
          className="mx-auto -mt-14 mb-4 w-[104px] drop-shadow-[0_14px_28px_rgba(0,0,0,0.7)]"
        />

        <NoteBody text={note.text} seq={seq} />
      </div>
    </div>
  )
}

function NoteBody({ text, seq }: { text: string; seq: number }) {
  const { text: typed, done } = useTypewriter(text, seq, 16)
  return (
    <p className={`min-h-[4.5rem] text-sm leading-relaxed text-muted-foreground ${done ? '' : 'caret'}`}>
      {typed}
    </p>
  )
}

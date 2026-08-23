'use client'

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { profile } from '@/lib/resume-data'

// Set this to a form endpoint (e.g. https://formspree.io/f/xxxxxxx) to send
// straight from the page. Left empty, the form opens a pre-filled email instead.
const FORM_ENDPOINT = ''

export function playPop() {
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(760, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(190, ctx.currentTime + 0.085)
    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.13)
    osc.start()
    osc.stop(ctx.currentTime + 0.14)
    setTimeout(() => void ctx.close(), 400)
  } catch {
    /* audio is a nicety — never let it break the click */
  }
}

export function ContactModal() {
  const [open, setOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onOpen = () => {
      setSent(false)
      setError('')
      setOpen(true)
    }
    window.addEventListener('open-contact', onOpen)
    return () => window.removeEventListener('open-contact', onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => emailRef.current?.focus(), 60)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      clearTimeout(t)
    }
  }, [open])

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const from = String(data.get('email') || '')
    const message = String(data.get('message') || '')
    if (!from || !message) {
      setError('Both fields are needed.')
      return
    }
    setError('')

    if (!FORM_ENDPOINT) {
      const subject = encodeURIComponent(`Website enquiry from ${from}`)
      const body = encodeURIComponent(`${message}\n\n— ${from}`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setSent(true)
      return
    }

    setSending(true)
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!res.ok) throw new Error('bad response')
      setSent(true)
      form.reset()
    } catch {
      setError(`Something went wrong — email me directly at ${profile.email}.`)
    } finally {
      setSending(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Contact form"
      onMouseDown={(e) => {
        if (!panelRef.current?.contains(e.target as Node)) setOpen(false)
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        ref={panelRef}
        className="animate-slide-in relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)] sm:p-8"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute right-5 top-5 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-bold tracking-tight">Drop me a line</h2>
        <p className="mt-1 text-sm text-muted-foreground">I usually reply within 24 hours.</p>

        {sent ? (
          <div className="mt-8 mb-2">
            <p className="text-accent">Thanks — that&apos;s on its way.</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-6 rounded-full bg-foreground px-6 py-2.5 text-sm font-bold text-background transition-opacity hover:opacity-90"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="contact-email" className="text-sm font-bold">
                Email
              </label>
              <input
                ref={emailRef}
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="text-sm font-bold">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                placeholder="What's on your mind?"
                className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={sending}
                className="rounded-full bg-foreground px-7 py-2.5 text-sm font-bold text-background transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {sending ? 'Sending…' : 'Send'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

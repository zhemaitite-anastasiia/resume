'use client'

import type { Slide } from '@/lib/resume-data'
import { playPop } from '@/components/contact-modal'
import { useTypewriter } from '@/hooks/use-typewriter'

export function SlideContent({ slide, index }: { slide: Slide; index: number }) {
  switch (slide.kind) {
    case 'intro':
      return <IntroSlide slide={slide} index={index} />
    case 'text':
      return <TextSlide slide={slide} index={index} />
    case 'role':
      return <RoleSlide slide={slide} />
    case 'skills':
      return <SkillsSlide slide={slide} />
    case 'education':
      return <EducationSlide slide={slide} />
    case 'contact':
      return <ContactSlide slide={slide} />
    default:
      return null
  }
}

function CtaButton({ label, href }: { label: string; href: string }) {
  const cls =
    'mt-8 inline-flex w-fit items-center rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'

  // mailto CTAs open the contact form instead of the visitor's mail client
  if (href.startsWith('mailto:')) {
    return (
      <button
        type="button"
        className={cls}
        onClick={() => {
          playPop()
          window.dispatchEvent(new Event('open-contact'))
        }}
      >
        {label}
      </button>
    )
  }

  return (
    <a href={href} className={cls}>
      {label}
    </a>
  )
}

function IntroSlide({ slide, index }: { slide: Extract<Slide, { kind: 'intro' }>; index: number }) {
  const { text, done } = useTypewriter(slide.title, index, 22)
  return (
    <div className="flex flex-col">
      <h1 className="text-balance text-2xl leading-relaxed sm:text-3xl">
        <span>{text}</span>
        {!done && <span className="caret" aria-hidden />}
      </h1>
      {done && (
        <div className="animate-slide-in">
          <ul className="mt-6 space-y-1 text-sm text-muted-foreground">
            {slide.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <CtaButton label={slide.cta.label} href={slide.cta.href} />
        </div>
      )}
    </div>
  )
}

function TextSlide({ slide, index }: { slide: Extract<Slide, { kind: 'text' }>; index: number }) {
  const first = slide.lines[0]?.text ?? ''
  const { text, done } = useTypewriter(first, index, 12)
  return (
    <div className="flex flex-col">
      {slide.heading && <p className="mb-5 text-sm text-accent">{slide.heading}</p>}
      <p className="text-balance text-lg leading-relaxed sm:text-xl">
        <span>{text}</span>
        {!done && <span className="caret" aria-hidden />}
      </p>
      {done && (
        <div className="mt-4 animate-slide-in space-y-4">
          {slide.lines.slice(1).map((l) => (
            <p key={l.text} className="text-balance leading-relaxed text-muted-foreground">
              {l.text}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

function RoleSlide({ slide }: { slide: Extract<Slide, { kind: 'role' }> }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="text-2xl font-bold">{slide.company}</h2>
        <span className="text-xs text-muted-foreground">{slide.companyLocation}</span>
      </div>
      <div className="mt-1 space-y-0.5">
        {slide.titles.map((t) => (
          <p key={t.title} className="text-sm text-accent">
            {t.title}
            {t.range && <span className="ml-2 text-muted-foreground">· {t.range}</span>}
          </p>
        ))}
        <p className="pt-1 text-xs text-muted-foreground">{slide.period}</p>
      </div>

      <div className="mt-5 space-y-2.5 overflow-y-auto pr-1">
        {slide.lines.map((l) =>
          l.indent ? (
            <p key={l.text} className="pl-4 text-sm leading-relaxed text-muted-foreground">
              <span className="mr-2 text-accent">→</span>
              {l.text}
            </p>
          ) : (
            <p key={l.text} className="text-sm font-semibold text-foreground">
              {l.text}
            </p>
          ),
        )}
      </div>
    </div>
  )
}

function SkillsSlide({ slide }: { slide: Extract<Slide, { kind: 'skills' }> }) {
  return (
    <div className="flex flex-col">
      <p className="mb-5 text-sm text-accent">{slide.heading}</p>
      <div className="grid gap-x-6 gap-y-4 overflow-y-auto pr-1 sm:grid-cols-2">
        {slide.groups.map((g) => (
          <div key={g.label}>
            <p className="mb-1.5 text-xs uppercase tracking-wide text-muted-foreground">{g.label}</p>
            <div className="flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border bg-background/40 px-2 py-0.5 text-xs text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EducationSlide({ slide }: { slide: Extract<Slide, { kind: 'education' }> }) {
  return (
    <div className="flex flex-col">
      <p className="mb-5 text-sm text-accent">{slide.heading}</p>
      <div className="space-y-6 overflow-y-auto pr-1">
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Certifications</p>
          <div className="flex flex-wrap gap-1.5">
            {slide.certifications.map((c) => (
              <span
                key={c}
                className="rounded-md border border-accent/40 bg-accent/10 px-2 py-0.5 text-xs text-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">Education</p>
          <div className="space-y-3">
            {slide.education.map((e) => (
              <div key={e.degree}>
                <p className="text-sm font-semibold text-foreground">{e.degree}</p>
                <p className="text-xs text-muted-foreground">
                  {e.org} · {e.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactSlide({ slide }: { slide: Extract<Slide, { kind: 'contact' }> }) {
  return (
    <div className="flex flex-col">
      <p className="mb-5 text-sm text-accent">{slide.heading}</p>
      <div className="space-y-2">
        {slide.lines.map((l) => (
          <p key={l.text} className="text-sm leading-relaxed">
            <span className="text-muted-foreground">$ </span>
            {l.text}
          </p>
        ))}
      </div>
      <CtaButton label={slide.cta.label} href={slide.cta.href} />
    </div>
  )
}

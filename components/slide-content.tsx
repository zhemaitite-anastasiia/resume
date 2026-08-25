'use client'

import type { Slide } from '@/lib/resume-data'
import { playPop } from '@/components/contact-modal'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
import { useTypewriter } from '@/hooks/use-typewriter'

// Terms worth a reader's eye. Longest first so "Argo CD" wins over "Argo",
// and "SSM Session Manager" over "Secrets Manager".
const KEYWORDS = [
  'SSM Session Manager', 'AWS Secrets Manager', 'Secrets Store CSI', 'Secrets Manager',
  'Model Context Protocol', 'Solutions Architect', 'GitHub Actions', 'DNS64/NAT64',
  'zero standing', 'Claude Code', 'sync waves', 'Kubernetes', 'PostgreSQL', 'Prometheus',
  'zero-trust', 'Terraform', 'PagerDuty', 'Kubecost', 'Teleport', 'Datadog', 'Grafana',
  'IPv6-only', 'Strimzi', 'FluxCD', 'ArgoCD', 'Argo CD', 'GitOps', 'Velero', 'Istio',
  'Kafka', 'Helm', 'IRSA', 'OIDC', 'mTLS', 'CKAD', 'MCP', 'CSI', 'SLO', 'IAM', 'PCI',
  'CKA', 'EKS', 'AWS', 'p99', 'IPv6', 'IPv4',
]
const KEYWORD_RE = new RegExp(
  `\\b(${KEYWORDS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
  'g',
)

/** Splits text so recognised technologies render in the accent colour. */
function hl(text: string) {
  const out: (string | React.ReactElement)[] = []
  let last = 0
  for (const m of text.matchAll(KEYWORD_RE)) {
    const i = m.index ?? 0
    if (i > last) out.push(text.slice(last, i))
    out.push(
      <span key={`${i}-${m[0]}`} className="text-accent">
        {m[0]}
      </span>,
    )
    last = i + m[0].length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

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

function ResumeButton() {
  return (
    <a
      href={`${basePath}/Anastasiia_Zhemaitite_Platform_Engineer.pdf`}
      target="_blank"
      rel="noreferrer"
      className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/70 bg-accent/10 px-5 py-2 text-sm font-semibold text-accent shadow-[0_0_18px_-2px_var(--accent)] transition-all hover:border-accent hover:bg-accent/20 hover:shadow-[0_0_26px_0px_var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      Download résumé
      <span aria-hidden>↓</span>
    </a>
  )
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
          <ul className="mt-6 space-y-1.5 text-base text-foreground/90 xl:text-[clamp(1rem,0.85rem+0.28vw,1.3rem)]">
            {slide.lines.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-3">
            <CtaButton label={slide.cta.label} href={slide.cta.href} />
            <ResumeButton />
          </div>
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
      <p className="text-balance text-xl leading-relaxed sm:text-2xl xl:text-[clamp(1.5rem,0.9rem+0.7vw,2.1rem)]">
        <span>{text}</span>
        {!done && <span className="caret" aria-hidden />}
      </p>
      {done && (
        <div className="mt-4 animate-slide-in space-y-4">
          {slide.lines.slice(1).map((l) => (
            <p key={l.text} className="text-balance text-base leading-relaxed text-foreground/90 xl:text-[clamp(1rem,0.85rem+0.28vw,1.3rem)]">
              {hl(l.text)}
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
            <p key={l.text} className="pl-4 text-base leading-relaxed text-foreground/90 xl:text-[clamp(1rem,0.85rem+0.28vw,1.3rem)]">
              <span className="mr-2 text-accent">→</span>
              {hl(l.text)}
            </p>
          ) : (
            <p key={l.text} className="text-[15px] font-semibold text-foreground">
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
                <p className="text-[15px] font-semibold text-foreground">{e.degree}</p>
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
      <div className="flex flex-wrap items-center gap-3">
        <CtaButton label={slide.cta.label} href={slide.cta.href} />
        <ResumeButton />
      </div>
    </div>
  )
}

export const profile = {
  name: 'Anastasiia Zhemaitite',
  role: 'Platform / DevOps Engineer',
  location: 'Chicago, IL',
  email: 'a.zhemaitite@gmail.com',
  phone: '843-446-5792',
  linkedin: 'linkedin.com/in/anastasiia-zhemaitite',
  linkedinUrl: 'https://linkedin.com/in/anastasiia-zhemaitite',
}

export type BulletLine = { text: string; indent?: boolean; muted?: boolean }

export type Slide =
  | {
      kind: 'intro'
      title: string
      lines: string[]
      cta: { label: string; href: string }
    }
  | {
      kind: 'text'
      heading?: string
      lines: BulletLine[]
    }
  | {
      kind: 'role'
      company: string
      companyLocation: string
      period: string
      titles: { title: string; range?: string }[]
      lines: BulletLine[]
    }
  | {
      kind: 'skills'
      heading: string
      groups: { label: string; items: string[] }[]
    }
  | {
      kind: 'education'
      heading: string
      certifications: string[]
      education: { degree: string; org: string; year: string }[]
    }
  | {
      kind: 'contact'
      heading: string
      lines: BulletLine[]
      cta: { label: string; href: string }
    }

export const slides: Slide[] = [
  {
    kind: 'intro',
    title: "Hi, I'm Anastasiia — a Platform / DevOps Engineer in Chicago, IL with 5+ years of experience.",
    lines: [
      'Production EKS on AWS across fintech and healthcare.',
      'GitOps delivery, zero-trust access, SLO-based alerting, and cost attribution.',
    ],
    cta: { label: 'Get in touch ↗', href: `mailto:${profile.email}` },
  },
  {
    kind: 'text',
    heading: '// summary',
    lines: [
      {
        text: 'Platform / DevOps Engineer with 5+ years building production EKS platforms on AWS across fintech and healthcare.',
      },
      {
        text: 'Core focus: GitOps delivery, zero-trust security, SLO-based alerting, and cost attribution.',
      },
      {
        text: 'Integrates Claude Code and read-only MCP tooling so teams self-serve secrets and on-call responders get instant root-cause context in Slack.',
      },
    ],
  },
  {
    kind: 'role',
    company: 'Tempus',
    companyLocation: 'Chicago, IL',
    period: 'Sep 2023 – Present',
    titles: [{ title: 'Platform Engineer' }],
    lines: [
      { text: 'Developer Platform & GitOps' },
      {
        text: 'Multi-account AWS EKS with ArgoCD + GitHub Actions for 20+ services, sequencing releases through sync waves so apps never start against a lagging migration.',
        indent: true,
        muted: true,
      },
      {
        text: 'Killed the Slack-ping-to-rollback loop — 70+ engineers now deploy by merging a PR.',
        indent: true,
        muted: true,
      },
      { text: 'Secrets Automation & Compliance' },
      {
        text: 'Built a Claude Code skill generating least-privilege IRSA policies, Secrets Manager entries, and CSI manifests — teams self-serve in ~3 min, nothing in Git.',
        indent: true,
        muted: true,
      },
      { text: 'Networking & Migration' },
      {
        text: 'Led EKS migration to IPv6-only to fix VPC IPv4 exhaustion; DNS64/NAT64 path bridged IPv4-only registries with 0 app code changes.',
        indent: true,
        muted: true,
      },
    ],
  },
  {
    kind: 'role',
    company: 'Tempus',
    companyLocation: 'Chicago, IL',
    period: 'Sep 2023 – Present',
    titles: [{ title: 'Platform Engineer', range: '(continued)' }],
    lines: [
      { text: 'Streaming Data Infrastructure' },
      {
        text: 'Strimzi Kafka on EKS for cold-chain vaccine telemetry, partitioned by container ID. Load-tested to 2M+ daily events with zero message loss.',
        indent: true,
        muted: true,
      },
      { text: 'Observability & Reliability' },
      {
        text: 'Replaced static alerts with Datadog APM, Prometheus, and Grafana p99 SLO dashboards across 20+ services — on-call dropped from ~35 to ~4 pages/week.',
        indent: true,
        muted: true,
      },
      { text: 'AI-Assisted Incident Response' },
      {
        text: 'Read-only MCP skill correlates Datadog APM spikes with GitHub deploy diffs to surface breaking PRs and suspect authors directly in Slack.',
        indent: true,
        muted: true,
      },
    ],
  },
  {
    kind: 'role',
    company: 'Braintree',
    companyLocation: 'Chicago, IL',
    period: 'Mar 2021 – Jul 2023',
    titles: [
      { title: 'DevOps Engineer', range: 'Sep 2022 – Jul 2023' },
      { title: 'Junior Cloud Engineer', range: 'Mar 2021 – Sep 2022' },
    ],
    lines: [
      { text: 'Zero Trust Access' },
      {
        text: 'Replaced static SSH keys and legacy VPNs with Teleport Cloud across AWS + EKS, eliminating standing prod privileges with full command audit logs.',
        indent: true,
        muted: true,
      },
      { text: 'FinOps & Cost Visibility' },
      {
        text: 'Kubecost + daily per-namespace Slack digests let teams right-size Helm requests — cut non-prod compute spend 30% over two quarters.',
        indent: true,
        muted: true,
      },
      { text: 'Disaster Recovery' },
      {
        text: 'Velero daily EKS snapshots to cross-region S3, with quarterly restore drills proving a sub-15-minute RTO for production.',
        indent: true,
        muted: true,
      },
      { text: 'Delivery Automation' },
      {
        text: 'Refactored ad-hoc Python/Bash into modular Terraform + FluxCD with nightly drift checks surfacing manual changes before they compounded.',
        indent: true,
        muted: true,
      },
    ],
  },
  {
    kind: 'skills',
    heading: '// skills',
    groups: [
      {
        label: 'Container & Orchestration',
        items: ['Kubernetes (EKS)', 'Strimzi', 'Secrets Store CSI', 'Velero'],
      },
      {
        label: 'Cloud & Infrastructure (AWS)',
        items: ['Multi-Account Orgs', 'IAM / IRSA', 'Secrets Manager'],
      },
      {
        label: 'IaC, CI/CD & Delivery',
        items: ['Terraform', 'GitOps', 'ArgoCD', 'FluxCD', 'GitHub Actions', 'Bash', 'Python'],
      },
      {
        label: 'Networking & Security',
        items: ['IPv6-only Clusters', 'DNS64/NAT64', 'Teleport', 'Zero Trust', 'Short-Lived Certs'],
      },
      {
        label: 'Observability & Incident Response',
        items: ['Datadog APM', 'Prometheus', 'Grafana', 'Kubecost'],
      },
      {
        label: 'Data & AI Automation',
        items: ['Kafka', 'PostgreSQL', 'Claude Code', 'MCP', 'Custom Agent Skills'],
      },
    ],
  },
  {
    kind: 'education',
    heading: '// education & certs',
    certifications: [
      'Certified Kubernetes Administrator (CKA)',
      'CKAD',
      'HashiCorp Terraform Associate',
      'AWS Solutions Architect – Associate',
    ],
    education: [
      {
        degree: 'Full Stack Web Development Certificate',
        org: 'Northwestern University, Chicago, IL',
        year: '2018',
      },
      {
        degree: 'B.A. in Finance',
        org: 'Ivan Franko National University of Lviv, Ukraine',
        year: '2013',
      },
    ],
  },
  {
    kind: 'contact',
    heading: '// contact',
    lines: [
      { text: `email    ${profile.email}` },
      { text: `phone    ${profile.phone}` },
      { text: `linkedin ${profile.linkedin}` },
      { text: `where    ${profile.location}` },
    ],
    cta: { label: 'Email me ↗', href: `mailto:${profile.email}` },
  },
]

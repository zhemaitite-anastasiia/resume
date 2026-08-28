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
    title: "Hi, I'm Anastasiia — a Platform and DevOps Engineer in Chicago.",
    lines: [
      '5+ years building production EKS on AWS.',
      'Platforms serving 40+ engineers across 20+ microservices.',
      'CKA · CKAD · Terraform Associate · AWS Solutions Architect.',
    ],
    cta: { label: 'Get in touch ↗', href: `mailto:${profile.email}` },
  },
  {
    kind: 'text',
    heading: '// summary',
    lines: [
      {
        text: 'I build the delivery, access, and cost layers a platform team owns.',
      },
      {
        text: 'GitOps delivery with Terraform and ArgoCD. Zero-trust access with Teleport, SSO, and IRSA. SLO-based alerting on Datadog, Prometheus, and Grafana. Namespace-level cost attribution with Kubecost.',
      },
      {
        text: 'Mostly in fintech and healthcare — regulated environments where who can reach what, and the evidence of it, is part of the design.',
      },
      {
        text: 'Claude Code and MCP in production for secrets provisioning, Kubernetes triage, and documentation search — taking routine toil off engineering teams.',
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
        text: 'Multi-account AWS EKS with ArgoCD and GitHub Actions for 20+ microservices — 40+ engineers get a self-service path to deploy by merging a PR.',
        indent: true,
        muted: true,
      },
      { text: 'Secrets Automation' },
      {
        text: 'AI secrets-provisioning workflow built with Security: scoped IRSA policies and Secrets Store CSI manifests, so teams self-serve secrets in minutes with no secret material in Git.',
        indent: true,
        muted: true,
      },
      { text: 'Networking & Migration' },
      {
        text: 'Led the EKS migration to IPv6-only clusters, removing subnet-size limits on pod density and eliminating per-address IPv4 charges — a DNS64/NAT64 path kept IPv4-only registries and GitHub working with zero application changes.',
        indent: true,
        muted: true,
      },
      { text: 'Observability & Reliability' },
      {
        text: 'Replaced static CPU/memory alerts with Datadog APM, Prometheus, and Grafana SLO dashboards, paging only on real latency and error issues — cutting alert noise from ~35 to ~4 actionable pages a week.',
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
        text: 'Strimzi Kafka on EKS for cold-chain vaccine telemetry, partitioned across brokers for scale — load-tested to 2M+ daily events with no message loss observed.',
        indent: true,
        muted: true,
      },
      { text: 'Traffic Management' },
      {
        text: 'Deployed the Kubernetes Gateway API on EKS to separate network management from app routing, letting developers safely update their own routes.',
        indent: true,
        muted: true,
      },
      { text: 'AI-Assisted Platform Work' },
      {
        text: 'Claude Code skills that summarize failing pods, plus a Confluence MCP integration serving runbooks from the terminal — cutting repeat questions to the platform team.',
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
        text: 'Replaced static SSH keys and legacy VPNs with zero-trust access via Teleport across AWS and EKS, removing always-on production access and capturing full command audit logs, with an emergency access fallback.',
        indent: true,
        muted: true,
      },
      { text: 'FinOps & Cost Visibility' },
      {
        text: 'Kubecost with Slack reports showing each team\'s spend — cutting non-production compute spend 30% over two quarters.',
        indent: true,
        muted: true,
      },
      { text: 'Disaster Recovery' },
      {
        text: 'Velero daily EKS snapshots to cross-region S3, tested quarterly for under-15-minute production recovery.',
        indent: true,
        muted: true,
      },
      { text: 'Delivery Automation' },
      {
        text: 'Replaced ad-hoc Python/Bash provisioning with Terraform and FluxCD, adding nightly drift detection so manual changes surfaced as alerts instead of outages.',
        indent: true,
        muted: true,
      },
      { text: 'CI at Scale' },
      {
        text: 'GitLab CI pipelines with auto-scaling Kubernetes runners on AWS, giving developers self-service test and build workflows on every pull request.',
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
        items: ['Kubernetes (EKS)', 'Helm', 'Strimzi', 'Secrets Store CSI', 'Velero'],
      },
      {
        label: 'Cloud & Infrastructure (AWS)',
        items: ['Multi-Account Orgs', 'IAM / IRSA', 'Secrets Manager'],
      },
      {
        label: 'IaC, CI/CD & Delivery',
        items: ['Terraform', 'GitOps', 'ArgoCD', 'FluxCD', 'GitHub Actions', 'GitLab CI', 'Bash', 'Python'],
      },
      {
        label: 'Networking & Security',
        items: ['Gateway API', 'IPv6-only Clusters', 'DNS64/NAT64', 'Teleport', 'Zero Trust', 'Short-Lived Certs'],
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

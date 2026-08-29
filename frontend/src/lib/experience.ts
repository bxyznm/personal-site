export interface ExperienceEntry {
  title: string
  company: string
  period: string
  description: string
  current?: boolean
}

export const experience: ExperienceEntry[] = [
  {
    title: 'Site Reliability Engineer',
    company: 'Thomson Reuters',
    period: 'Feb 2025 - Present',
    description: 'Speeding up CI/CD builds, cutting infrastructure costs, and making sure deployments do not break things. Basically keeping the systems happy.',
    current: true,
  },
  {
    title: 'Site Reliability Engineer',
    company: 'OCC',
    period: 'Oct 2022 - Sep 2024',
    description: 'Optimized K8s clusters and saved cloud costs. Built observability for microservices with Prometheus and Grafana. Helped migrate legacy stuff to containers.',
  },
  {
    title: 'Freelance Software Engineer',
    company: 'Self-employed',
    period: 'Apr 2021 - Jun 2022',
    description: 'Built a Windows app for small businesses to manage inventory and transactions. Full stack with .NET Core and WPF, from client meetings to deployment.',
  },
]

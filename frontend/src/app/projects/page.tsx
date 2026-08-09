import ProjectCard from '@/components/ProjectCard'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'

const projects = [
  {
    title: 'Kubernetes Cluster Autoscaler',
    description:
      'Custom Kubernetes autoscaler that optimizes pod scheduling based on workload patterns and cost efficiency.',
    tags: ['Kubernetes', 'Go', 'AWS'],
    githubUrl: 'https://github.com/bxyznm',
  },
  {
    title: 'Terraform AWS Modules',
    description:
      'Collection of production-ready Terraform modules for AWS infrastructure. Includes VPC, EKS, RDS, and more with best practices.',
    tags: ['Terraform', 'AWS', 'HCL'],
    githubUrl: 'https://github.com/bxyznm',
  },
  {
    title: 'CI/CD Pipeline Generator',
    description:
      'CLI tool that generates GitHub Actions workflows based on project type. Supports Node.js, Python, Go, and containerized apps.',
    tags: ['Python', 'GitHub Actions', 'CLI'],
    githubUrl: 'https://github.com/bxyznm',
  },
  {
    title: 'Prometheus Alerting Rules',
    description:
      'Comprehensive set of Prometheus alerting rules for Kubernetes workloads. Includes runbooks and Grafana dashboards.',
    tags: ['Prometheus', 'Grafana', 'YAML'],
    githubUrl: 'https://github.com/bxyznm',
  },
  {
    title: 'Docker Image Optimizer',
    description: 'Tool to analyze and optimize Docker images for size and security.',
    tags: ['Docker', 'Python', 'Security'],
    githubUrl: 'https://github.com/bxyznm',
  },
  {
    title: 'Infrastructure Dashboard',
    description:
      'Dashboard concept for surfacing infrastructure health, cost, and performance signals across multiple cloud providers.',
    tags: ['React', 'Node.js', 'AWS'],
    githubUrl: 'https://github.com/bxyznm',
  },
]

const featuredProject = {
  title: 'Cloud Cost Optimizer',
  description:
    'An open-source tool that analyzes cloud infrastructure and provides actionable recommendations to reduce costs. Supports AWS, GCP, and Azure.',
  tags: ['Python', 'AWS', 'GCP', 'Azure'],
  githubUrl: 'https://github.com/bxyznm',
  highlights: [
    'Surfaces cost-saving opportunities across cloud accounts',
    'Automated resource rightsizing recommendations',
    'Multi-cloud support with a unified dashboard',
    'Integration with Slack and PagerDuty',
  ],
}

export default function Projects() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mb-16">
          <h1 className="font-display uppercase leading-[0.9] tracking-tightest text-[clamp(2.25rem,5vw,4rem)] mb-4">
            PROJECTS
          </h1>
          <p className="text-fg-secondary font-mono text-sm uppercase tracking-data">
            A collection of projects built to solve real infrastructure challenges
          </p>
        </Reveal>

        {/* Featured Project */}
        <Reveal>
          <section className="mb-16">
            <h2 className="font-mono text-xs tracking-data text-fg-secondary uppercase mb-6 pb-2 border-b border-line">
              [ CAT FEATURED_PROJECT.MD ]
            </h2>
            <div className="crosshair bg-bg-panel border border-accent p-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {featuredProject.tags.map((tag) => (
                  <kbd key={tag} className="px-2 py-1 text-fg-secondary text-xs font-mono border border-line">
                    {tag}
                  </kbd>
                ))}
              </div>
              <h3 className="font-mono text-xl font-bold tracking-data text-fg-primary uppercase mb-4">
                {featuredProject.title}
              </h3>
              <p className="text-fg-secondary mb-6 leading-relaxed">{featuredProject.description}</p>

              <ul className="space-y-2 mb-8">
                {featuredProject.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start space-x-2 text-fg-secondary text-sm">
                    <span className="text-accent shrink-0">&gt;&gt;&gt;</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <a
                href={featuredProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 bg-accent text-bg-primary font-mono font-semibold tracking-data uppercase text-sm hover:bg-fg-primary transition-colors"
              >
                View on GitHub
              </a>
            </div>
          </section>
        </Reveal>

        {/* All Projects Grid */}
        <section>
          <Reveal>
            <h2 className="font-mono text-xs tracking-data text-fg-secondary uppercase mb-6 pb-2 border-b border-line">
              [ LS -LA ./PROJECTS/ ]
            </h2>
          </Reveal>
          <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <RevealItem key={project.title}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  tags={project.tags}
                  githubUrl={project.githubUrl}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* GitHub CTA */}
        <Reveal>
          <section className="mt-16 text-center border border-line p-8">
            <p className="text-fg-secondary mb-4">
              Want to see more? Check out my GitHub for additional projects and contributions.
            </p>
            <a
              href="https://github.com/bxyznm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 border border-accent text-accent font-mono font-semibold tracking-data uppercase text-sm hover:bg-accent hover:text-bg-primary transition-colors"
            >
              <span>View GitHub Profile</span>
            </a>
          </section>
        </Reveal>
      </div>
    </div>
  )
}

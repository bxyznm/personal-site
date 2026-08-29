import { ArrowSquareOut } from '@phosphor-icons/react/dist/ssr'
import ProjectCard from '@/components/ProjectCard'
import MagneticButton from '@/components/MagneticButton'
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
    <div className="min-h-screen py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mb-16 max-w-2xl">
          <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tightest mb-4">Projects</h1>
          <p className="text-fg-secondary text-lg leading-relaxed">
            A collection of projects built to solve real infrastructure challenges.
          </p>
        </Reveal>

        {/* Featured Project */}
        <Reveal>
          <section className="mb-16">
            <p className="text-sm text-fg-secondary mb-4">Featured</p>
            <div className="bg-bg-panel border border-accent/40 rounded-2xl p-8 lg:p-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {featuredProject.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 text-fg-secondary text-xs bg-bg-secondary rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="font-display font-bold text-xl text-fg-primary mb-3 tracking-tightest">
                {featuredProject.title}
              </h3>
              <p className="text-fg-secondary mb-6 leading-relaxed max-w-2xl">{featuredProject.description}</p>

              <ul className="grid sm:grid-cols-2 gap-3 mb-8 max-w-2xl">
                {featuredProject.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-fg-secondary text-sm">
                    <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <MagneticButton href={featuredProject.githubUrl} variant="primary" external>
                View on GitHub
              </MagneticButton>
            </div>
          </section>
        </Reveal>

        {/* All Projects */}
        <section>
          <Reveal className="mb-6">
            <h2 className="font-display font-bold text-2xl tracking-tightest">All projects</h2>
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
          <section className="mt-16 text-center border border-line rounded-2xl p-8">
            <p className="text-fg-secondary mb-4">
              Want to see more? Check out my GitHub for additional projects and contributions.
            </p>
            <a
              href="https://github.com/bxyznm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-line rounded-full text-fg-primary font-medium text-sm hover:bg-bg-panel transition-colors"
            >
              View GitHub profile
              <ArrowSquareOut size={16} />
            </a>
          </section>
        </Reveal>
      </div>
    </div>
  )
}

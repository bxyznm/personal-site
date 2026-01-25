import ProjectCard from '@/components/ProjectCard'

const projects = [
  {
    title: 'Kubernetes Cluster Autoscaler',
    description: 'Custom Kubernetes autoscaler that optimizes pod scheduling based on workload patterns and cost efficiency. Reduced cloud costs by 40%.',
    tags: ['Kubernetes', 'Go', 'AWS'],
    githubUrl: 'https://github.com',
  },
  {
    title: 'Terraform AWS Modules',
    description: 'Collection of production-ready Terraform modules for AWS infrastructure. Includes VPC, EKS, RDS, and more with best practices.',
    tags: ['Terraform', 'AWS', 'HCL'],
    githubUrl: 'https://github.com',
  },
  {
    title: 'CI/CD Pipeline Generator',
    description: 'CLI tool that generates GitHub Actions workflows based on project type. Supports Node.js, Python, Go, and containerized apps.',
    tags: ['Python', 'GitHub Actions', 'CLI'],
    githubUrl: 'https://github.com',
  },
  {
    title: 'Prometheus Alerting Rules',
    description: 'Comprehensive set of Prometheus alerting rules for Kubernetes workloads. Includes runbooks and Grafana dashboards.',
    tags: ['Prometheus', 'Grafana', 'YAML'],
    githubUrl: 'https://github.com',
  },
  {
    title: 'Docker Image Optimizer',
    description: 'Tool to analyze and optimize Docker images for size and security. Reduces image sizes by up to 60% on average.',
    tags: ['Docker', 'Python', 'Security'],
    githubUrl: 'https://github.com',
  },
  {
    title: 'Infrastructure Dashboard',
    description: 'Real-time dashboard showing infrastructure health, costs, and performance metrics across multiple cloud providers.',
    tags: ['React', 'Node.js', 'AWS'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
]

const featuredProject = {
  title: 'Cloud Cost Optimizer',
  description: 'An open-source tool that analyzes cloud infrastructure and provides actionable recommendations to reduce costs. Supports AWS, GCP, and Azure. Uses machine learning to predict usage patterns and suggest rightsizing opportunities.',
  tags: ['Python', 'AWS', 'GCP', 'Azure', 'ML'],
  githubUrl: 'https://github.com',
  liveUrl: 'https://example.com',
  highlights: [
    'Saved $100K+ annually for multiple organizations',
    'Automated resource rightsizing recommendations',
    'Multi-cloud support with unified dashboard',
    'Integration with Slack and PagerDuty',
  ],
}

export default function Projects() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-accent-primary">#</span> Projects
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            A collection of projects I&apos;ve built to solve real infrastructure challenges
          </p>
        </div>

        {/* Featured Project */}
        <section className="mb-16">
          <h2 className="text-xl font-mono text-text-muted mb-6">
            <span className="text-accent-primary">$</span> cat featured_project.md
          </h2>
          <div className="bg-bg-card border border-accent-primary/30 rounded-lg p-8 glow-effect">
            <div className="lg:flex lg:items-start lg:space-x-8">
              <div className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-sm font-mono rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-mono font-bold text-text-primary mb-4">
                  {featuredProject.title}
                </h3>
                <p className="text-text-secondary mb-6">{featuredProject.description}</p>

                <ul className="space-y-2 mb-6">
                  {featuredProject.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-2 text-text-secondary">
                      <span className="text-accent-primary">-&gt;</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex space-x-4">
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-accent-primary text-bg-primary font-mono font-semibold rounded-lg hover:bg-accent-secondary transition-colors"
                  >
                    View on GitHub
                  </a>
                  {featuredProject.liveUrl && (
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 border border-accent-primary text-accent-primary font-mono font-semibold rounded-lg hover:bg-accent-primary/10 transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* All Projects Grid */}
        <section>
          <h2 className="text-xl font-mono text-text-muted mb-6">
            <span className="text-accent-primary">$</span> ls -la ./projects/
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                tags={project.tags}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
              />
            ))}
          </div>
        </section>

        {/* GitHub CTA */}
        <section className="mt-16 text-center">
          <div className="bg-bg-secondary border border-bg-card rounded-lg p-8">
            <p className="text-text-secondary mb-4">
              Want to see more? Check out my GitHub for additional projects and contributions.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-bg-card text-accent-primary font-mono font-semibold rounded-lg border border-accent-primary/30 hover:border-accent-primary hover:bg-accent-primary/10 transition-colors"
            >
              <span>View GitHub Profile</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

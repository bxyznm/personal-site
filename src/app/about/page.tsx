import {
  FiCloud,
  FiBox,
  FiCode,
  FiActivity,
  FiGitBranch,
  FiDatabase
} from 'react-icons/fi'
import SkillCard from '@/components/SkillCard'

const skillCategories = [
  {
    title: 'Cloud & Infra',
    icon: FiCloud,
    skills: [
      { name: 'AWS' },
      { name: 'Linux' },
      { name: 'Kubernetes' },
      { name: 'Docker' },
    ],
  },
  {
    title: 'Infrastructure as Code',
    icon: FiCode,
    skills: [
      { name: 'Terraform' },
      { name: 'CloudFormation' },
      { name: 'Ansible' },
    ],
  },
  {
    title: 'CI/CD & DevOps',
    icon: FiGitBranch,
    skills: [
      { name: 'GitHub Actions' },
      { name: 'Jenkins' },
      { name: 'Git' },
    ],
  },
  {
    title: 'Monitoring & Observability',
    icon: FiActivity,
    skills: [
      { name: 'Prometheus' },
      { name: 'Grafana' },
      { name: 'CloudWatch' },
      { name: 'SLI/SLO/SLA' },
    ],
  },
  {
    title: 'Databases',
    icon: FiDatabase,
    skills: [
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'DynamoDB' },
    ],
  },
  {
    title: 'Languages',
    icon: FiBox,
    skills: [
      { name: 'Python' },
      { name: 'Bash' },
      { name: 'C# / .NET' },
    ],
  },
]

const experience = [
  {
    title: 'Site Reliability Engineer',
    company: 'Thomson Reuters',
    period: 'Feb 2025 - Present',
    description: 'Speeding up CI/CD builds, cutting infrastructure costs, and making sure deployments don\'t break things. Basically keeping the systems happy.',
  },
  {
    title: 'Site Reliability Engineer',
    company: 'OCC',
    period: 'Oct 2022 - Sep 2024',
    description: 'Optimized K8s clusters and saved cloud costs. Built observability for microservices with Prometheus & Grafana. Helped migrate legacy stuff to containers.',
  },
  {
    title: 'Freelance Software Engineer',
    company: 'Self-employed',
    period: 'Apr 2021 - Jun 2022',
    description: 'Built a Windows app for small businesses to manage inventory and transactions. Full stack with .NET Core and WPF - from client meetings to deployment.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-accent-primary">#</span> About Me
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            SRE based in Mexico who likes keeping systems alive and automating the boring stuff
          </p>
        </div>

        {/* Bio Section */}
        <section className="mb-20">
          <div className="bg-bg-card border border-bg-card rounded-lg p-8 lg:p-12">
            <div className="lg:flex lg:items-start lg:space-x-12">
              {/* Avatar placeholder */}
              <div className="flex-shrink-0 mb-8 lg:mb-0">
                <div className="w-48 h-48 mx-auto lg:mx-0 bg-bg-secondary rounded-lg border border-accent-primary/30 flex items-center justify-center">
                  <span className="text-6xl font-mono text-accent-primary">{'</>'}</span>
                </div>
              </div>

              {/* Bio text */}
              <div>
                <h2 className="text-2xl font-mono font-semibold mb-4 text-text-primary">
                  Hey, I&apos;m Bryan!
                </h2>
                <div className="space-y-4 text-text-secondary">
                  <p>
                    I&apos;m a Site Reliability Engineer from Mexico. I studied Computer Systems
                    Engineering and somehow ended up really enjoying the whole &quot;keeping systems
                    running&quot; thing. Go figure.
                  </p>
                  <p>
                    Most of my day involves working with AWS, Github Actions, and making sure things
                    don&apos;t catch fire. I&apos;m big on automation - if I have to do something more
                    than twice, I&apos;m writing a script for it. CloudFormation, Terraform, Ansible, Python... whatever
                    gets the job done.
                  </p>
                  <p>
                    Outside of SRE work, I like building random stuff in Python and occasionally
                    diving into web dev just for fun (just like this page). I also built a Windows app for small businesses
                    back in the day, so I&apos;m not afraid of switching things up.
                  </p>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4 bg-bg-secondary rounded-lg">
                    <div className="text-2xl font-bold text-accent-primary">3+</div>
                    <div className="text-sm text-text-muted font-mono">Years in SRE</div>
                  </div>
                  <div className="text-center p-4 bg-bg-secondary rounded-lg">
                    <div className="text-2xl font-bold text-accent-primary">BSc</div>
                    <div className="text-sm text-text-muted font-mono">CS Engineering</div>
                  </div>
                  <div className="text-center p-4 bg-bg-secondary rounded-lg">
                    <div className="text-2xl font-bold text-accent-primary">MX</div>
                    <div className="text-sm text-text-muted font-mono">Based in Mexico</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-accent-primary">#</span> Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category) => (
              <SkillCard
                key={category.title}
                title={category.title}
                skills={category.skills}
                icon={category.icon}
              />
            ))}
          </div>
        </section>

        {/* Experience Timeline */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="text-accent-primary">#</span> Experience
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-accent-primary/30"></div>

            <div className="space-y-12">
              {experience.map((job, index) => (
                <div
                  key={job.title}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent-primary rounded-full border-4 border-bg-primary"></div>

                  {/* Content */}
                  <div className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-bg-card border border-bg-card hover:border-accent-primary/50 rounded-lg p-6 card-hover">
                      <span className="inline-block px-3 py-1 bg-accent-primary/10 text-accent-primary text-sm font-mono rounded-full mb-3">
                        {job.period}
                      </span>
                      <h3 className="font-mono font-semibold text-xl text-text-primary mb-1">
                        {job.title}
                      </h3>
                      <p className="text-accent-secondary text-sm mb-3">{job.company}</p>
                      <p className="text-text-secondary text-sm">{job.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

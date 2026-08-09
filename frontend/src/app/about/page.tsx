import {
  FiCloud,
  FiBox,
  FiCode,
  FiActivity,
  FiGitBranch,
  FiDatabase
} from 'react-icons/fi'
import SkillCard from '@/components/SkillCard'
import TelemetryBar from '@/components/TelemetryBar'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'

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
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mb-16">
          <h1 className="font-display uppercase leading-[0.9] tracking-tightest text-[clamp(2.25rem,5vw,4rem)] mb-4">
            ABOUT ME
          </h1>
          <p className="text-fg-secondary font-mono text-sm uppercase tracking-data">
            SRE based in Mexico &mdash; keeping systems alive, automating the boring stuff
          </p>
        </Reveal>

        {/* Bio Section */}
        <section className="mb-16">
          <Reveal>
            <div className="bg-bg-panel border border-line p-8 lg:p-12">
              <div className="lg:flex lg:items-start lg:space-x-12">
                {/* Avatar placeholder */}
                <div className="flex-shrink-0 mb-8 lg:mb-0">
                  <div className="crosshair w-40 h-40 mx-auto lg:mx-0 bg-bg-secondary border border-line flex items-center justify-center">
                    <span className="text-5xl font-mono text-accent">{'</>'}</span>
                  </div>
                </div>

                {/* Bio text */}
                <div className="flex-1">
                  <h2 className="text-xl font-mono font-semibold tracking-data uppercase mb-4 text-fg-primary">
                    HEY, I&apos;M BRYAN!
                  </h2>
                  <div className="space-y-4 text-fg-secondary leading-relaxed">
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
                  <div className="grid grid-cols-3 border border-line divide-x divide-line mt-8">
                    <div className="text-center p-4">
                      <data value="3" className="block text-2xl font-mono font-bold text-accent">3+</data>
                      <div className="text-xs text-fg-secondary font-mono tracking-data uppercase mt-1">Years SRE</div>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-2xl font-mono font-bold text-fg-primary">BSC</div>
                      <div className="text-xs text-fg-secondary font-mono tracking-data uppercase mt-1">CS Eng.</div>
                    </div>
                    <div className="text-center p-4">
                      <div className="text-2xl font-mono font-bold text-fg-primary">MX</div>
                      <div className="text-xs text-fg-secondary font-mono tracking-data uppercase mt-1">Location</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Skill Focus Section */}
        <section className="mb-16">
          <Reveal>
            <h2 className="font-mono text-xs tracking-data text-fg-secondary uppercase mb-6 pb-2 border-b border-line">
              [ SKILL_FOCUS --BY-CATEGORY ]
            </h2>
            <div className="bg-bg-panel border border-line p-6 sm:p-8 max-w-3xl space-y-4">
              {skillCategories.map((category) => (
                <TelemetryBar
                  key={category.title}
                  label={category.title}
                  value={category.skills.length}
                  max={Math.max(...skillCategories.map((c) => c.skills.length))}
                />
              ))}
            </div>
          </Reveal>
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <Reveal>
            <h2 className="font-mono text-xs tracking-data text-fg-secondary uppercase mb-6 pb-2 border-b border-line">
              [ TECHNICAL SKILLS ]
            </h2>
          </Reveal>
          <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories.map((category) => (
              <RevealItem key={category.title}>
                <SkillCard
                  title={category.title}
                  skills={category.skills}
                  icon={category.icon}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* Experience Log */}
        <section>
          <Reveal>
            <h2 className="font-mono text-xs tracking-data text-fg-secondary uppercase mb-6 pb-2 border-b border-line">
              [ EXPERIENCE_LOG ]
            </h2>
          </Reveal>
          <RevealGroup className="space-y-px bg-line border border-line">
            {experience.map((job) => (
              <RevealItem key={job.title} className="bg-bg-panel border-l-2 border-l-accent p-6">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-2">
                  <span className="font-mono text-xs tracking-data text-accent uppercase">{job.period}</span>
                  <h3 className="font-mono font-semibold text-sm tracking-data text-fg-primary uppercase">
                    {job.title}
                  </h3>
                  <span className="font-mono text-xs text-fg-secondary uppercase">{'// '}{job.company}</span>
                </div>
                <p className="text-fg-secondary text-sm leading-relaxed">{job.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      </div>
    </div>
  )
}

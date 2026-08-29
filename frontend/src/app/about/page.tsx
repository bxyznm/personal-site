import {
  CloudArrowUp,
  Code,
  GitBranch,
  ChartLineUp,
  Database,
  Package,
} from '@phosphor-icons/react/dist/ssr'
import SkillCard from '@/components/SkillCard'
import SkillsChart from '@/components/SkillsChart'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import { experience } from '@/lib/experience'

const skillCategories = [
  {
    title: 'Cloud & Infra',
    icon: CloudArrowUp,
    skills: [{ name: 'AWS' }, { name: 'Linux' }, { name: 'Kubernetes' }, { name: 'Docker' }],
  },
  {
    title: 'Infrastructure as Code',
    icon: Code,
    skills: [{ name: 'Terraform' }, { name: 'CloudFormation' }, { name: 'Ansible' }],
  },
  {
    title: 'CI/CD & DevOps',
    icon: GitBranch,
    skills: [{ name: 'GitHub Actions' }, { name: 'Jenkins' }, { name: 'Git' }],
  },
  {
    title: 'Monitoring & Observability',
    icon: ChartLineUp,
    skills: [{ name: 'Prometheus' }, { name: 'Grafana' }, { name: 'CloudWatch' }, { name: 'SLI/SLO/SLA' }],
  },
  {
    title: 'Databases',
    icon: Database,
    skills: [{ name: 'PostgreSQL' }, { name: 'MySQL' }, { name: 'DynamoDB' }],
  },
  {
    title: 'Languages',
    icon: Package,
    skills: [{ name: 'Python' }, { name: 'Bash' }, { name: 'C# / .NET' }],
  },
]

export default function About() {
  return (
    <div className="min-h-screen py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mb-16 max-w-2xl">
          <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tightest mb-4">About me</h1>
          <p className="text-fg-secondary text-lg leading-relaxed">
            DevSecOps engineer based in Mexico, with an SRE background. Keeping systems secure, alive, and automated.
          </p>
        </Reveal>

        {/* Bio */}
        <section className="mb-16">
          <Reveal>
            <div className="bg-bg-panel border border-line rounded-2xl p-8 lg:p-12">
              <div className="lg:flex lg:items-start lg:gap-12">
                <div className="flex-shrink-0 mb-8 lg:mb-0">
                  <div className="w-32 h-32 mx-auto lg:mx-0 rounded-2xl bg-accent/10 border border-line flex items-center justify-center">
                    <span className="font-display font-black text-4xl text-accent">BM</span>
                  </div>
                </div>

                <div className="flex-1">
                  <h2 className="font-display font-bold text-xl text-fg-primary mb-4 tracking-tightest">Hey, I&apos;m Bryan!</h2>
                  <div className="space-y-4 text-fg-secondary leading-relaxed">
                    <p>
                      I&apos;m a DevSecOps engineer from Mexico. I studied Computer Systems
                      Engineering and started out as an SRE, which is how I ended up really
                      enjoying the whole &quot;keeping systems running&quot; thing. Go figure.
                    </p>
                    <p>
                      Most of my day involves building secure CI/CD pipelines on Azure DevOps
                      and GitHub Actions, integrating security tools into the delivery lifecycle,
                      and making sure things do not catch fire. I am big on automation. If I have
                      to do something more than twice, I am writing a script for it: Terraform,
                      Ansible, Python, whatever gets the job done.
                    </p>
                    <p>
                      Outside of security and SRE work, I like building random stuff in Python and occasionally
                      diving into web dev just for fun (like this page). I also built a Windows app
                      for small businesses back in the day, so I am not afraid of switching things up.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-line">
                    <div>
                      <data value="3" className="block font-display font-bold text-2xl text-accent tabular-nums">3+</data>
                      <div className="text-xs text-fg-secondary mt-1">Years Experience</div>
                    </div>
                    <div>
                      <div className="font-display font-bold text-2xl text-fg-primary">BSc</div>
                      <div className="text-xs text-fg-secondary mt-1">CS Engineering</div>
                    </div>
                    <div>
                      <div className="font-display font-bold text-2xl text-fg-primary">MX</div>
                      <div className="text-xs text-fg-secondary mt-1">Location</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <Reveal className="mb-6">
            <h2 className="font-display font-bold text-2xl tracking-tightest">Technical skills</h2>
          </Reveal>

          <Reveal className="mb-6">
            <SkillsChart categories={skillCategories.map((c) => ({ title: c.title, count: c.skills.length }))} />
          </Reveal>

          <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillCategories.map((category) => (
              <RevealItem key={category.title}>
                <SkillCard title={category.title} skills={category.skills} icon={category.icon} />
              </RevealItem>
            ))}
          </RevealGroup>
        </section>

        {/* Experience */}
        <section>
          <Reveal className="mb-6">
            <h2 className="font-display font-bold text-2xl tracking-tightest">Experience</h2>
          </Reveal>
          <RevealGroup className="relative pl-6 border-l-2 border-line space-y-8">
            {experience.map((job) => (
              <RevealItem key={`${job.title}-${job.company}`} className="relative">
                <span className="absolute -left-[1.65rem] top-1.5 w-3 h-3 rounded-full bg-accent ring-4 ring-bg-primary" />
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="font-display font-bold text-fg-primary tracking-tightest">{job.title}</h3>
                  <span className="text-fg-secondary text-sm">{job.company}</span>
                  <span className="text-fg-secondary text-xs font-mono ml-auto">{job.period}</span>
                </div>
                <p className="text-fg-secondary text-sm leading-relaxed max-w-2xl">{job.description}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      </div>
    </div>
  )
}

import Link from 'next/link'
import { GithubLogo, LinkedinLogo, CloudArrowUp, Cube, Robot, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'
import MagneticButton from '@/components/MagneticButton'
import ExperienceCarousel from '@/components/ExperienceCarousel'
import { experience } from '@/lib/experience'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:items-center">
          <Reveal>
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tightest leading-[1.05] mb-6">
              I build systems that
              <br />
              <span className="text-accent">don&apos;t page you at 3am.</span>
            </h1>

            <p className="text-fg-secondary text-lg max-w-xl mb-8 leading-relaxed">
              DevSecOps engineer with an SRE background, automating secure cloud infrastructure,
              Kubernetes, and CI/CD across AWS and GCP so things stay online without anyone noticing.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <MagneticButton href="/projects" variant="primary">
                View projects
                <ArrowUpRight size={16} />
              </MagneticButton>
              <MagneticButton href="/contact" variant="secondary">
                Get in touch
              </MagneticButton>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/bxyznm"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full text-fg-secondary hover:text-fg-primary hover:bg-bg-panel transition-colors"
                aria-label="GitHub"
              >
                <GithubLogo size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/brxvn"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full text-fg-secondary hover:text-fg-primary hover:bg-bg-panel transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinLogo size={20} />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 lg:mt-0 lg:rotate-1">
            <p className="text-sm text-fg-secondary mb-3">Where I&apos;ve worked</p>
            <ExperienceCarousel entries={experience} />
          </Reveal>
        </div>
      </section>

      {/* What I Do */}
      <section className="border-t border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <Reveal className="mb-10 max-w-lg">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tightest">What I do</h2>
          </Reveal>

          <RevealGroup className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <RevealItem className="lg:col-span-2 bg-bg-panel border border-line rounded-2xl p-8 lg:flex lg:items-center lg:gap-8">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mb-4 lg:mb-0">
                <CloudArrowUp size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-fg-primary mb-2 tracking-tightest">Cloud infrastructure</h3>
                <p className="text-fg-secondary leading-relaxed">
                  Setting up cloud infrastructure that actually makes sense across AWS and GCP,
                  with AWS as my primary cloud, all defined as code with Terraform.
                </p>
              </div>
            </RevealItem>

            <RevealItem className="bg-bg-panel border border-line rounded-2xl p-8">
              <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Cube size={22} className="text-accent" />
              </div>
              <h3 className="font-display font-bold text-lg text-fg-primary mb-2 tracking-tightest">Containers &amp; Kubernetes</h3>
              <p className="text-fg-secondary text-sm leading-relaxed">
                Running clusters and containers, keeping microservices talking to each
                other reliably.
              </p>
            </RevealItem>

            <RevealItem className="lg:col-span-3 bg-bg-panel border border-line rounded-2xl p-8 lg:flex lg:items-center lg:gap-8">
              <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mb-4 lg:mb-0">
                <Robot size={22} className="text-accent" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-fg-primary mb-2 tracking-tightest">Automation &amp; CI/CD</h3>
                <p className="text-fg-secondary text-sm leading-relaxed max-w-2xl">
                  If I have to do something twice, I write a script for it. GitHub Actions
                  pipelines included.
                </p>
              </div>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* Featured project spotlight */}
      <section className="border-t border-line">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <Reveal>
            <div className="bg-bg-panel border border-line rounded-2xl p-8 lg:p-12 lg:grid lg:grid-cols-[1fr_auto] lg:gap-12 lg:items-center">
              <div>
                <p className="text-sm text-fg-secondary mb-3">Selected work</p>
                <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tightest mb-4">
                  Projects in progress
                </h3>
                <p className="text-fg-secondary leading-relaxed max-w-xl mb-6">
                  I am building out a portfolio of security and infrastructure projects — cloud
                  cost optimization, DevSecOps pipelines, and observability tooling. Full details
                  are on the way.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['DevSecOps', 'Cloud', 'Kubernetes', 'Automation'].map((tag) => (
                    <span key={tag} className="text-xs text-fg-secondary bg-bg-secondary rounded-full px-2.5 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-8 lg:mt-0 shrink-0">
                <MagneticButton href="/projects" variant="primary">
                  View projects
                  <ArrowUpRight size={16} />
                </MagneticButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line">
        <Reveal className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tightest mb-5">
            Want to work together?
          </h2>
          <p className="text-fg-secondary mb-8 max-w-xl mx-auto">
            Whether it is a project, a role, or just talking shop about infrastructure,
            I am happy to chat.
          </p>
          <MagneticButton href="/contact" variant="primary">
            Get in touch
            <ArrowUpRight size={16} />
          </MagneticButton>
        </Reveal>
      </section>
    </div>
  )
}

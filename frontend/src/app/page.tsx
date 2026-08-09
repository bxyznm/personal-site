import Link from 'next/link'
import { FiGithub, FiLinkedin, FiArrowRight, FiTerminal, FiServer, FiCloud } from 'react-icons/fi'
import { Reveal, RevealGroup, RevealItem } from '@/components/Reveal'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="lg:flex lg:items-start lg:justify-between lg:gap-12">
            <Reveal className="lg:max-w-2xl">
              {/* Status line */}
              <div className="inline-flex items-center space-x-2 border border-line px-3 py-1.5 mb-8">
                <span className="w-1.5 h-1.5 bg-accent" />
                <span className="font-mono text-xs tracking-data text-fg-secondary uppercase">
                  STATUS: ONLINE <span className="cursor-blink">_</span>
                </span>
              </div>

              {/* Name and Title */}
              <h1 className="font-display uppercase leading-[0.9] tracking-tightest text-[clamp(2.75rem,7vw,6rem)] mb-6">
                <span className="text-fg-primary">HI, I&apos;M</span>
                <br />
                <span className="text-accent">BRYAN MENDOZA</span>
              </h1>

              <h2 className="text-lg sm:text-xl font-mono tracking-data text-fg-secondary mb-8 uppercase">
                &gt; SRE / DEVOPS ENGINEER
              </h2>

              <p className="text-fg-secondary max-w-xl mb-10 leading-relaxed">
                I like breaking things to understand how they work, automating
                everything I can, and occasionally building random Python projects
                or exploring web dev just for fun.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-0 sm:gap-0 border border-line w-fit mb-10">
                <Link
                  href="/projects"
                  className="px-6 py-3 bg-accent text-bg-primary font-mono font-semibold tracking-data uppercase text-sm hover:bg-fg-primary transition-colors flex items-center justify-center space-x-2"
                >
                  <span>View Projects</span>
                  <FiArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 text-fg-primary font-mono font-semibold tracking-data uppercase text-sm hover:bg-bg-panel transition-colors border-t sm:border-t-0 sm:border-l border-line flex items-center justify-center"
                >
                  Get in Touch
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex items-stretch border border-line w-fit">
                <a
                  href="https://github.com/bxyznm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-fg-secondary hover:text-accent hover:bg-bg-panel transition-colors"
                  aria-label="GitHub"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/brxvn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-fg-secondary hover:text-accent hover:bg-bg-panel transition-colors border-l border-line"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="w-5 h-5" />
                </a>
              </div>
            </Reveal>

            {/* Terminal Panel */}
            <Reveal delay={0.1} className="hidden lg:block lg:ml-12 mt-12 lg:mt-0 shrink-0">
              <div className="crosshair bg-bg-panel border border-line w-96 font-mono text-sm">
                <div className="flex items-center px-4 py-2 border-b border-line">
                  <span className="text-fg-secondary text-xs tracking-data uppercase">{'/// TERMINAL'}</span>
                </div>
                <div className="p-4 space-y-2">
                  <samp className="block"><span className="text-accent">$</span> kubectl get pods</samp>
                  <samp className="block text-fg-secondary">All pods running</samp>
                  <samp className="block"><span className="text-accent">$</span> terraform plan</samp>
                  <samp className="block text-fg-secondary">No changes. Infrastructure up-to-date.</samp>
                  <samp className="block"><span className="text-accent">$</span> <span className="cursor-blink">_</span></samp>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Reveal className="mb-10">
            <h2 className="font-mono text-xs tracking-data text-fg-secondary uppercase pb-2 border-b border-line">
              [ WHAT I DO ]
            </h2>
          </Reveal>

          <RevealGroup className="grid md:grid-cols-3 border border-line divide-y md:divide-y-0 md:divide-x divide-line">
            <RevealItem className="p-8">
              <FiCloud className="w-6 h-6 text-accent mb-4" />
              <h3 className="font-mono font-semibold text-sm tracking-data uppercase mb-3">Cloud Stuff</h3>
              <p className="text-fg-secondary text-sm leading-relaxed">
                Setting up cloud infrastructure that actually makes sense. AWS, GCP, Azure -
                and yes, everything as code with Terraform because clicking buttons is boring.
              </p>
            </RevealItem>

            <RevealItem className="p-8">
              <FiServer className="w-6 h-6 text-accent mb-4" />
              <h3 className="font-mono font-semibold text-sm tracking-data uppercase mb-3">Containers &amp; K8s</h3>
              <p className="text-fg-secondary text-sm leading-relaxed">
                Wrangling Kubernetes clusters and Docker containers. Making sure
                microservices play nice with each other.
              </p>
            </RevealItem>

            <RevealItem className="p-8">
              <FiTerminal className="w-6 h-6 text-accent mb-4" />
              <h3 className="font-mono font-semibold text-sm tracking-data uppercase mb-3">Automation Nerd</h3>
              <p className="text-fg-secondary text-sm leading-relaxed">
                If I have to do something twice, I&apos;m writing a script for it.
                CI/CD pipelines, GitHub Actions, you name it.
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <Reveal className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="font-display uppercase leading-[0.9] tracking-tightest text-[clamp(2rem,5vw,3.5rem)] mb-6">
            WANT TO <span className="text-accent">WORK TOGETHER</span>?
          </h2>
          <p className="text-fg-secondary mb-10 max-w-xl mx-auto">
            Whether you have a cool project in mind, a job opportunity,
            or just want to geek out about tech - I&apos;m down to chat.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-accent text-bg-primary font-mono font-semibold tracking-data uppercase text-sm hover:bg-fg-primary transition-colors"
          >
            <span>Let&apos;s Connect</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </section>
    </div>
  )
}

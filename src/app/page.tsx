import Link from 'next/link'
import { FiGithub, FiLinkedin, FiTwitter, FiArrowRight, FiTerminal, FiServer, FiCloud } from 'react-icons/fi'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="lg:max-w-2xl">
              {/* Terminal-style greeting */}
              <div className="inline-flex items-center space-x-2 bg-bg-card px-4 py-2 rounded-full border border-accent-primary/30 mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="font-mono text-sm text-text-secondary">
                  <span className="text-accent-primary">$</span> whoami
                </span>
              </div>

              {/* Name and Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                <span className="text-text-primary">Hi, I&apos;m </span>
                <span className="gradient-text">Bryan Mendoza</span>
              </h1>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-mono text-text-secondary mb-6">
                <span className="text-accent-primary">&gt;</span> SRE / DevOps Engineer
              </h2>

              <p className="text-lg text-text-secondary max-w-xl mx-auto lg:mx-0 mb-8">
                I like breaking things to understand how they work, automating
                everything I can, and occasionally building random Python projects
                or exploring web dev just for fun.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
                <Link
                  href="/projects"
                  className="w-full sm:w-auto px-6 py-3 bg-accent-primary text-bg-primary font-mono font-semibold rounded-lg hover:bg-accent-secondary transition-colors glow-effect flex items-center justify-center space-x-2"
                >
                  <span>View Projects</span>
                  <FiArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-6 py-3 border border-accent-primary text-accent-primary font-mono font-semibold rounded-lg hover:bg-accent-primary/10 transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Get in Touch</span>
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center lg:justify-start space-x-4">
                <a
                  href="https://github.com/bxyznm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-bg-card text-text-secondary hover:text-accent-primary hover:border-accent-primary border border-bg-card rounded-lg transition-colors"
                  aria-label="GitHub"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/bxyzn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-bg-card text-text-secondary hover:text-accent-primary hover:border-accent-primary border border-bg-card rounded-lg transition-colors"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Terminal Animation */}
            <div className="hidden lg:block lg:ml-12 mt-12 lg:mt-0">
              <div className="bg-bg-card border border-bg-card rounded-lg p-4 w-96 font-mono text-sm">
                <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-bg-secondary">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-text-muted ml-2">terminal</span>
                </div>
                <div className="space-y-2">
                  <p><span className="text-accent-primary">$</span> kubectl get pods</p>
                  <p className="text-green-400">All pods running</p>
                  <p><span className="text-accent-primary">$</span> terraform plan</p>
                  <p className="text-text-secondary">No changes. Infrastructure up-to-date.</p>
                  <p><span className="text-accent-primary">$</span> <span className="cursor-blink">_</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-accent-primary">#</span> What I Do
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Basically, I keep things running smoothly and make life easier for dev teams.
              Here&apos;s what I spend most of my time on:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-bg-card border border-bg-card hover:border-accent-primary/50 rounded-lg p-6 card-hover">
              <div className="p-3 bg-accent-primary/10 rounded-lg w-fit mb-4">
                <FiCloud className="w-8 h-8 text-accent-primary" />
              </div>
              <h3 className="font-mono font-semibold text-xl mb-2">Cloud Stuff</h3>
              <p className="text-text-secondary">
                Setting up cloud infrastructure that actually makes sense. AWS, GCP, Azure -
                and yes, everything as code with Terraform because clicking buttons is boring.
              </p>
            </div>

            <div className="bg-bg-card border border-bg-card hover:border-accent-primary/50 rounded-lg p-6 card-hover">
              <div className="p-3 bg-accent-primary/10 rounded-lg w-fit mb-4">
                <FiServer className="w-8 h-8 text-accent-primary" />
              </div>
              <h3 className="font-mono font-semibold text-xl mb-2">Containers & K8s</h3>
              <p className="text-text-secondary">
                Wrangling Kubernetes clusters and Docker containers. Making sure
                microservices play nice with each other.
              </p>
            </div>

            <div className="bg-bg-card border border-bg-card hover:border-accent-primary/50 rounded-lg p-6 card-hover">
              <div className="p-3 bg-accent-primary/10 rounded-lg w-fit mb-4">
                <FiTerminal className="w-8 h-8 text-accent-primary" />
              </div>
              <h3 className="font-mono font-semibold text-xl mb-2">Automation Nerd</h3>
              <p className="text-text-secondary">
                If I have to do something twice, I&apos;m writing a script for it.
                CI/CD pipelines, GitHub Actions, you name it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want to <span className="gradient-text">work together</span>?
          </h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Whether you have a cool project in mind, a job opportunity,
            or just want to geek out about tech - I&apos;m down to chat.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-accent-primary text-bg-primary font-mono font-semibold rounded-lg hover:bg-accent-secondary transition-colors glow-effect"
          >
            <span>Let&apos;s Connect</span>
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

import { FiTool } from 'react-icons/fi'

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
            Cool stuff I&apos;ve built along the way
          </p>
        </div>

        {/* Work in Progress */}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-bg-card border border-accent-primary/30 rounded-lg p-12 text-center max-w-lg">
            <div className="p-4 bg-accent-primary/10 rounded-full w-fit mx-auto mb-6">
              <FiTool className="w-12 h-12 text-accent-primary" />
            </div>
            <div className="font-mono text-text-muted mb-4">
              <span className="text-accent-primary">$</span> ls ./projects/
            </div>
            <h2 className="text-2xl font-mono font-bold text-text-primary mb-4">
              Work in Progress
            </h2>
            <p className="text-text-secondary mb-2">
              I&apos;m currently putting together some projects to show here.
            </p>
            <p className="text-text-muted text-sm">
              Check back soon or take a look at my GitHub in the meantime.
            </p>
            <a
              href="https://github.com/bxyznm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 mt-6 px-6 py-3 bg-accent-primary text-bg-primary font-mono font-semibold rounded-lg hover:bg-accent-secondary transition-colors"
            >
              <span>View GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

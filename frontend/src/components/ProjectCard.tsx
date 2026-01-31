import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi'

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
}

export default function ProjectCard({
  title,
  description,
  tags,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <div className="bg-bg-card border border-bg-card hover:border-accent-primary/50 rounded-lg p-6 card-hover flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-accent-primary/10 rounded-lg">
          <FiFolder className="w-6 h-6 text-accent-primary" />
        </div>
        <div className="flex items-center space-x-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-primary transition-colors"
              aria-label="View on GitHub"
            >
              <FiGithub className="w-5 h-5" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-primary transition-colors"
              aria-label="View live demo"
            >
              <FiExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="font-mono font-semibold text-lg text-text-primary mb-2 hover:text-accent-primary transition-colors">
        {title}
      </h3>
      <p className="text-text-secondary text-sm flex-grow mb-4">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono text-accent-secondary"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

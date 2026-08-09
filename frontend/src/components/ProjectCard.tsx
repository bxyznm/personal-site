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
    <div className="bg-bg-panel border border-line panel-hover p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 pb-4 border-b border-line">
        <FiFolder className="w-5 h-5 text-accent" />
        <div className="flex items-center space-x-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-secondary hover:text-accent transition-colors"
              aria-label="View on GitHub"
            >
              <FiGithub className="w-4 h-4" />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-secondary hover:text-accent transition-colors"
              aria-label="View live demo"
            >
              <FiExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <h3 className="font-mono font-semibold text-sm tracking-data text-fg-primary uppercase mb-2">
        {title}
      </h3>
      <p className="text-fg-secondary text-sm flex-grow mb-4">{description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-line">
        {tags.map((tag) => (
          <kbd key={tag} className="text-xs font-mono text-fg-secondary border border-line px-1.5 py-0.5">
            {tag}
          </kbd>
        ))}
      </div>
    </div>
  )
}

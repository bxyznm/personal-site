import { GithubLogo, ArrowUpRight, FolderSimple } from '@phosphor-icons/react/dist/ssr'

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
    <div className="bg-bg-panel border border-line rounded-2xl panel-hover p-6 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
          <FolderSimple size={18} className="text-accent" />
        </div>
        <div className="flex items-center gap-3">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-secondary hover:text-fg-primary transition-colors"
              aria-label="View on GitHub"
            >
              <GithubLogo size={18} />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-secondary hover:text-fg-primary transition-colors"
              aria-label="View live demo"
            >
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </div>

      <h3 className="font-display font-bold text-lg text-fg-primary mb-2 tracking-tightest">
        {title}
      </h3>
      <p className="text-fg-secondary text-sm leading-relaxed flex-grow mb-4">{description}</p>

      <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-line">
        {tags.map((tag) => (
          <span key={tag} className="text-xs text-fg-secondary bg-bg-secondary rounded-full px-2.5 py-1">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

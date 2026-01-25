import Link from 'next/link'
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi'

interface BlogPostCardProps {
  title: string
  excerpt: string
  date: string
  readTime: string
  slug: string
  tags: string[]
}

export default function BlogPostCard({
  title,
  excerpt,
  date,
  readTime,
  slug,
  tags,
}: BlogPostCardProps) {
  return (
    <article className="bg-bg-card border border-bg-card hover:border-accent-primary/50 rounded-lg p-6 card-hover">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 bg-accent-primary/10 text-accent-primary text-xs font-mono rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <Link href={`/blog/${slug}`}>
        <h3 className="font-mono font-semibold text-xl text-text-primary hover:text-accent-primary transition-colors mb-2">
          {title}
        </h3>
      </Link>

      {/* Excerpt */}
      <p className="text-text-secondary text-sm mb-4 line-clamp-3">{excerpt}</p>

      {/* Meta */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-text-muted text-xs font-mono">
          <span className="flex items-center space-x-1">
            <FiCalendar className="w-4 h-4" />
            <span>{date}</span>
          </span>
          <span className="flex items-center space-x-1">
            <FiClock className="w-4 h-4" />
            <span>{readTime}</span>
          </span>
        </div>

        <Link
          href={`/blog/${slug}`}
          className="flex items-center space-x-1 text-accent-primary hover:text-accent-glow text-sm font-mono transition-colors group"
        >
          <span>Read more</span>
          <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}

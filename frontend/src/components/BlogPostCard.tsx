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
    <article className="bg-bg-panel border border-line panel-hover p-6">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <kbd key={tag} className="px-1.5 py-0.5 text-fg-secondary text-xs font-mono border border-line">
            {tag}
          </kbd>
        ))}
      </div>

      {/* Title */}
      <Link href={`/blog/${slug}`}>
        <h3 className="font-mono font-semibold text-lg tracking-data text-fg-primary hover:text-accent transition-colors mb-2 uppercase">
          {title}
        </h3>
      </Link>

      {/* Excerpt */}
      <p className="text-fg-secondary text-sm mb-4 line-clamp-3">{excerpt}</p>

      {/* Meta */}
      <div className="flex items-center justify-between pt-4 border-t border-line">
        <div className="flex items-center space-x-4 text-fg-secondary text-xs font-mono tracking-data">
          <span className="flex items-center space-x-1">
            <FiCalendar className="w-3.5 h-3.5" />
            <data value={date}>{date}</data>
          </span>
          <span className="flex items-center space-x-1">
            <FiClock className="w-3.5 h-3.5" />
            <span>{readTime}</span>
          </span>
        </div>

        <Link
          href={`/blog/${slug}`}
          className="flex items-center space-x-1 text-accent hover:text-fg-primary text-xs font-mono tracking-data transition-colors group uppercase"
        >
          <span>READ &gt;&gt;&gt;</span>
          <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}

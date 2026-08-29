import Link from 'next/link'
import { CalendarBlank, Clock, ArrowRight } from '@phosphor-icons/react/dist/ssr'

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
    <article className="bg-bg-panel border border-line rounded-2xl panel-hover p-6">
      <div className="flex flex-wrap gap-1.5 mb-3">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 text-fg-secondary text-xs bg-bg-secondary rounded-full">
            {tag}
          </span>
        ))}
      </div>

      <Link href={`/blog/${slug}`}>
        <h3 className="font-display font-bold text-lg text-fg-primary hover:text-accent transition-colors mb-2 tracking-tightest">
          {title}
        </h3>
      </Link>

      <p className="text-fg-secondary text-sm mb-4 line-clamp-3 leading-relaxed">{excerpt}</p>

      <div className="flex items-center justify-between pt-4 border-t border-line">
        <div className="flex items-center gap-4 text-fg-secondary text-xs">
          <span className="flex items-center gap-1.5">
            <CalendarBlank size={14} />
            <data value={date}>{date}</data>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{readTime}</span>
          </span>
        </div>

        <Link
          href={`/blog/${slug}`}
          className="flex items-center gap-1 text-accent hover:text-fg-primary text-sm transition-colors group"
        >
          <span>Read</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  )
}

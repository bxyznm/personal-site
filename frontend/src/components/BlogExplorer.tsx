'use client'

import { useMemo, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import BlogPostCard from '@/components/BlogPostCard'
import NewsletterSubscribe from '@/components/NewsletterSubscribe'
import { RevealGroup, RevealItem } from '@/components/Reveal'
import { BlogPostMeta } from '@/lib/mdx'

interface BlogExplorerProps {
  posts: BlogPostMeta[]
  tags: string[]
}

export default function BlogExplorer({ posts, tags }: BlogExplorerProps) {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesQuery =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
      const matchesTag = !activeTag || post.tags.includes(activeTag)
      return matchesQuery && matchesTag
    })
  }, [posts, search, activeTag])

  return (
    <div className="lg:flex lg:space-x-12">
      {/* Main content */}
      <div className="lg:flex-grow">
        <h2 className="text-sm font-mono tracking-data text-fg-secondary uppercase mb-6 pb-2 border-b border-line">
          [ LS -LA ./POSTS/ ]
        </h2>

        {filteredPosts.length > 0 ? (
          <RevealGroup className="space-y-6">
            {filteredPosts.map((post) => (
              <RevealItem key={post.slug}>
                <BlogPostCard
                  title={post.title}
                  excerpt={post.excerpt}
                  date={post.date}
                  readTime={post.readTime}
                  slug={post.slug}
                  tags={post.tags}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <div className="bg-bg-panel border border-line p-12 text-center">
            <div className="font-mono text-fg-secondary text-xs tracking-data mb-4 uppercase">
              <span className="text-accent">$</span> grep -r &quot;{search || activeTag}&quot; ./posts/ &mdash; NO MATCH
            </div>
            <button
              onClick={() => {
                setSearch('')
                setActiveTag(null)
              }}
              className="text-accent hover:text-fg-primary text-xs font-mono tracking-data uppercase transition-colors"
            >
              [ CLEAR FILTERS ]
            </button>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="lg:w-80 mt-12 lg:mt-0 space-y-6">
        {/* Search */}
        <div className="bg-bg-panel border border-line p-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-fg-secondary w-4 h-4" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="SEARCH..."
              className="w-full pl-10 pr-4 py-2 bg-bg-secondary border border-line text-fg-primary placeholder-fg-secondary focus:border-accent focus:outline-none transition-colors font-mono text-xs tracking-data uppercase"
            />
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="bg-bg-panel border border-line p-4">
            <h3 className="font-mono font-semibold text-xs tracking-data text-fg-primary uppercase mb-4 pb-2 border-b border-line">
              [ TAGS ]
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-2 py-1 text-xs font-mono border transition-colors ${
                    activeTag === tag
                      ? 'border-accent text-accent'
                      : 'border-line text-fg-secondary hover:border-accent hover:text-accent'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Newsletter */}
        <NewsletterSubscribe
          title="STAY UPDATED"
          description="Subscribe to get notified about new posts on DevOps and SRE."
          compact
        />
      </div>
    </div>
  )
}

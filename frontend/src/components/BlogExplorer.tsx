'use client'

import { useMemo, useState } from 'react'
import { MagnifyingGlass } from '@phosphor-icons/react'
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
    <div className="lg:flex lg:gap-12">
      {/* Main content */}
      <div className="lg:flex-grow">
        {filteredPosts.length > 0 ? (
          <RevealGroup className="space-y-4">
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
          <div className="bg-bg-panel border border-line rounded-2xl p-12 text-center">
            <p className="text-fg-secondary text-sm mb-4">
              No posts match your search.
            </p>
            <button
              onClick={() => {
                setSearch('')
                setActiveTag(null)
              }}
              className="text-accent hover:text-fg-primary text-sm transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="lg:w-80 mt-12 lg:mt-0 space-y-4">
        <div className="bg-bg-panel border border-line rounded-2xl p-4">
          <div className="relative">
            <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-secondary" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts"
              className="w-full pl-9 pr-3 py-2 bg-bg-secondary border border-line rounded-xl text-fg-primary placeholder-fg-secondary/60 focus:border-accent focus:outline-none transition-colors text-sm"
            />
          </div>
        </div>

        {tags.length > 0 && (
          <div className="bg-bg-panel border border-line rounded-2xl p-4">
            <h3 className="text-sm font-medium text-fg-primary mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-2.5 py-1 text-xs rounded-full transition-colors ${
                    activeTag === tag
                      ? 'bg-accent text-bg-primary'
                      : 'bg-bg-secondary text-fg-secondary hover:text-fg-primary'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        <NewsletterSubscribe
          title="Stay updated"
          description="Subscribe to get notified about new posts on DevOps and SRE."
          compact
        />
      </div>
    </div>
  )
}

import { getAllPosts } from '@/lib/mdx'
import BlogPostCard from '@/components/BlogPostCard'
import { FiRss, FiSearch } from 'react-icons/fi'

export default function Blog() {
  const posts = getAllPosts()

  // Get all unique tags
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)))

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-accent-primary">#</span> Blog
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Thoughts on SRE, DevOps, cloud infrastructure, and everything in between
          </p>
        </div>

        <div className="lg:flex lg:space-x-12">
          {/* Main content */}
          <div className="lg:flex-grow">
            {/* Terminal header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-mono text-text-muted">
                <span className="text-accent-primary">$</span> ls -la ./posts/
              </h2>
              <button className="p-2 text-text-muted hover:text-accent-primary transition-colors">
                <FiRss className="w-5 h-5" />
              </button>
            </div>

            {/* Posts grid */}
            {posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
                  <BlogPostCard
                    key={post.slug}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    readTime={post.readTime}
                    slug={post.slug}
                    tags={post.tags}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-bg-card border border-bg-card rounded-lg p-12 text-center">
                <div className="font-mono text-text-muted mb-4">
                  <span className="text-accent-primary">$</span> ls ./posts/
                </div>
                <p className="text-text-secondary mb-2">No posts found.</p>
                <p className="text-text-muted text-sm">
                  Blog posts will appear here once MDX files are added to /content/blog/
                </p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 mt-12 lg:mt-0">
            {/* Search */}
            <div className="bg-bg-card border border-bg-card rounded-lg p-4 mb-6">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2 bg-bg-secondary border border-bg-card rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors font-mono text-sm"
                />
              </div>
            </div>

            {/* Tags */}
            {allTags.length > 0 && (
              <div className="bg-bg-card border border-bg-card rounded-lg p-4 mb-6">
                <h3 className="font-mono font-semibold text-text-primary mb-4">
                  <span className="text-accent-primary">#</span> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-bg-secondary text-text-secondary text-sm font-mono rounded-full border border-bg-card hover:border-accent-primary/30 hover:text-accent-secondary transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter */}
            <div className="bg-bg-card border border-accent-primary/30 rounded-lg p-4">
              <h3 className="font-mono font-semibold text-text-primary mb-2">
                Stay Updated
              </h3>
              <p className="text-text-secondary text-sm mb-4">
                Subscribe to get notified about new posts on DevOps and SRE.
              </p>
              <div className="space-y-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 bg-bg-secondary border border-bg-card rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors font-mono text-sm"
                />
                <button className="w-full px-4 py-2 bg-accent-primary text-bg-primary font-mono font-semibold rounded-lg hover:bg-accent-secondary transition-colors text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { getAllPosts } from '@/lib/mdx'
import BlogExplorer from '@/components/BlogExplorer'
import { Reveal } from '@/components/Reveal'

export default function Blog() {
  const posts = getAllPosts()
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)))

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mb-16">
          <h1 className="font-display uppercase leading-[0.9] tracking-tightest text-[clamp(2.25rem,5vw,4rem)] mb-4">
            BLOG
          </h1>
          <p className="text-fg-secondary font-mono text-sm uppercase tracking-data">
            Thoughts on SRE, DevOps, cloud infrastructure, and everything in between
          </p>
        </Reveal>

        <BlogExplorer posts={posts} tags={allTags} />
      </div>
    </div>
  )
}

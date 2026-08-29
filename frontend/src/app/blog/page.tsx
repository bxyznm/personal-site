import { getAllPosts } from '@/lib/mdx'
import BlogExplorer from '@/components/BlogExplorer'
import { Reveal } from '@/components/Reveal'

export default function Blog() {
  const posts = getAllPosts()
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)))

  return (
    <div className="min-h-screen py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-16 max-w-2xl">
          <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tightest mb-4">Blog</h1>
          <p className="text-fg-secondary text-lg leading-relaxed">
            Thoughts on SRE, DevOps, cloud infrastructure, and everything in between.
          </p>
        </Reveal>

        <BlogExplorer posts={posts} tags={allTags} />
      </div>
    </div>
  )
}

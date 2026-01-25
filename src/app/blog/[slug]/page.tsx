import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllSlugs, getPostBySlug } from '@/lib/mdx'
import { FiCalendar, FiClock, FiArrowLeft, FiShare2 } from 'react-icons/fi'
import NewsletterSubscribe from '@/components/NewsletterSubscribe'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
  }
}

// Custom MDX components
const components = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold text-text-primary mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl font-bold text-text-primary mt-6 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-text-secondary mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside text-text-secondary mb-4 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-text-secondary mb-4 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-text-secondary" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-accent-primary hover:text-accent-glow underline" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-accent-primary pl-4 my-4 italic text-text-muted" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-bg-card px-2 py-1 rounded text-accent-secondary font-mono text-sm" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-bg-card border border-accent-primary/30 rounded-lg p-4 overflow-x-auto my-4" {...props} />
  ),
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-text-muted hover:text-accent-primary transition-colors mb-8 font-mono text-sm"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>

        {/* Article header */}
        <header className="mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-accent-primary/10 text-accent-primary text-sm font-mono rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-6 text-text-muted font-mono text-sm">
              <span className="flex items-center space-x-2">
                <FiCalendar className="w-4 h-4" />
                <span>{post.date}</span>
              </span>
              <span className="flex items-center space-x-2">
                <FiClock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </span>
            </div>

            <button className="flex items-center space-x-2 text-text-muted hover:text-accent-primary transition-colors font-mono text-sm">
              <FiShare2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </header>

        {/* Article content */}
        <article className="prose prose-invert max-w-none">
          <MDXRemote source={post.content} components={components} />
        </article>

        {/* Newsletter Subscription */}
        <div className="mt-12">
          <NewsletterSubscribe
            title="Enjoyed this post?"
            description="Subscribe to get notified when I publish new content about SRE, DevOps, and tech."
            compact={true}
          />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-bg-card">
          <div className="bg-bg-card border border-bg-card rounded-lg p-6">
            <h3 className="font-mono font-semibold text-text-primary mb-2">
              Thanks for reading!
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              If you found this post helpful, feel free to share it or reach out with questions.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/contact"
                className="px-4 py-2 bg-accent-primary text-bg-primary font-mono font-semibold rounded-lg hover:bg-accent-secondary transition-colors text-sm"
              >
                Get in Touch
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 border border-accent-primary text-accent-primary font-mono font-semibold rounded-lg hover:bg-accent-primary/10 transition-colors text-sm"
              >
                More Posts
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

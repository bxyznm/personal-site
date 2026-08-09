import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllSlugs, getPostBySlug } from '@/lib/mdx'
import { FiCalendar, FiClock, FiArrowLeft } from 'react-icons/fi'
import NewsletterSubscribe from '@/components/NewsletterSubscribe'
import ShareButton from '@/components/ShareButton'
import { Reveal } from '@/components/Reveal'

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
    <h1 className="font-mono text-2xl font-bold tracking-data text-fg-primary uppercase mt-8 mb-4" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-mono text-xl font-bold tracking-data text-fg-primary uppercase mt-8 mb-4" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-mono text-lg font-bold tracking-data text-fg-primary uppercase mt-6 mb-3" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-fg-secondary mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-none text-fg-secondary mb-4 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside text-fg-secondary mb-4 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-fg-secondary before:content-['>_'] before:text-accent before:mr-2 before:font-mono" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-accent hover:text-fg-primary underline underline-offset-4" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-2 border-accent pl-4 my-4 text-fg-secondary" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-bg-panel px-2 py-1 border border-line text-fg-primary font-mono text-sm" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-bg-panel border border-line p-4 overflow-x-auto my-4" {...props} />
  ),
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-fg-secondary hover:text-accent transition-colors mb-8 font-mono text-xs tracking-data uppercase"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>

        {/* Article header */}
        <Reveal>
          <header className="mb-12 pb-8 border-b border-line">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <kbd
                  key={tag}
                  className="px-2 py-1 text-fg-secondary text-xs font-mono border border-line"
                >
                  {tag}
                </kbd>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display uppercase leading-[0.95] tracking-tightest text-[clamp(1.75rem,4vw,3rem)] mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-6 text-fg-secondary font-mono text-xs tracking-data uppercase">
                <span className="flex items-center space-x-2">
                  <FiCalendar className="w-3.5 h-3.5" />
                  <data value={post.date}>{post.date}</data>
                </span>
                <span className="flex items-center space-x-2">
                  <FiClock className="w-3.5 h-3.5" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <ShareButton title={post.title} />
            </div>
          </header>
        </Reveal>

        {/* Article content */}
        <article className="max-w-none">
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
        <footer className="mt-16 pt-8 border-t border-line">
          <div className="bg-bg-panel border border-line p-6">
            <h3 className="font-mono font-semibold tracking-data text-fg-primary uppercase mb-2">
              Thanks for reading!
            </h3>
            <p className="text-fg-secondary text-sm mb-4">
              If you found this post helpful, feel free to share it or reach out with questions.
            </p>
            <div className="flex border border-line w-fit">
              <Link
                href="/contact"
                className="px-4 py-2 bg-accent text-bg-primary font-mono font-semibold tracking-data uppercase text-xs hover:bg-fg-primary transition-colors"
              >
                Get in Touch
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 text-fg-primary font-mono font-semibold tracking-data uppercase text-xs hover:bg-bg-secondary transition-colors border-l border-line"
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

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllSlugs, getPostBySlug } from '@/lib/mdx'
import { CalendarBlank, Clock, ArrowLeft } from '@phosphor-icons/react/dist/ssr'
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
    <h1 className="font-display font-bold text-2xl text-fg-primary mt-10 mb-4 tracking-tightest" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="font-display font-bold text-xl text-fg-primary mt-10 mb-4 tracking-tightest" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-display font-bold text-lg text-fg-primary mt-8 mb-3 tracking-tightest" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-fg-secondary mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-outside pl-5 text-fg-secondary mb-4 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-outside pl-5 text-fg-secondary mb-4 space-y-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-fg-secondary" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-accent hover:text-fg-primary underline underline-offset-4" {...props} />
  ),
  blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-2 border-accent pl-4 my-4 text-fg-secondary" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-bg-panel px-1.5 py-0.5 rounded-md border border-line text-fg-primary text-sm" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-bg-panel border border-line rounded-2xl p-4 overflow-x-auto my-4" {...props} />
  ),
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen py-16 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-fg-secondary hover:text-fg-primary transition-colors mb-8 text-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to blog</span>
        </Link>

        <Reveal>
          <header className="mb-12 pb-8 border-b border-line">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 text-fg-secondary text-xs bg-bg-secondary rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="font-display font-black text-2xl sm:text-3xl tracking-tightest mb-6">
              {post.title}
            </h1>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-6 text-fg-secondary text-sm">
                <span className="flex items-center gap-2">
                  <CalendarBlank size={16} />
                  <data value={post.date}>{post.date}</data>
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <ShareButton title={post.title} />
            </div>
          </header>
        </Reveal>

        <article className="max-w-none">
          <MDXRemote source={post.content} components={components} />
        </article>

        <div className="mt-12">
          <NewsletterSubscribe
            title="Enjoyed this post?"
            description="Subscribe to get notified when I publish new content about SRE, DevOps, and tech."
            compact={true}
          />
        </div>

        <footer className="mt-16 pt-8 border-t border-line">
          <div className="bg-bg-panel border border-line rounded-2xl p-6">
            <h3 className="font-display font-bold text-fg-primary mb-2 tracking-tightest">
              Thanks for reading
            </h3>
            <p className="text-fg-secondary text-sm mb-4">
              If you found this post helpful, feel free to share it or reach out with questions.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="px-4 py-2 bg-accent text-bg-primary rounded-full font-medium text-sm hover:bg-accent-dim transition-colors"
              >
                Get in touch
              </Link>
              <Link
                href="/blog"
                className="px-4 py-2 border border-line rounded-full text-fg-primary font-medium text-sm hover:bg-bg-secondary transition-colors"
              >
                More posts
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

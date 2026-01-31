import { FiEdit3 } from 'react-icons/fi'
import NewsletterSubscribe from '@/components/NewsletterSubscribe'

export default function Blog() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-accent-primary">#</span> Blog
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Thoughts, tutorials, and random things I find interesting
          </p>
        </div>

        {/* Work in Progress */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="bg-bg-card border border-accent-primary/30 rounded-lg p-8 text-center max-w-lg mb-8">
            <div className="p-3 bg-accent-primary/10 rounded-full w-fit mx-auto mb-4">
              <FiEdit3 className="w-10 h-10 text-accent-primary" />
            </div>
            <div className="font-mono text-text-muted mb-3 text-sm">
              <span className="text-accent-primary">$</span> cat ./drafts/*
            </div>
            <h2 className="text-2xl font-mono font-bold text-text-primary mb-3">
              Coming Soon
            </h2>
            <p className="text-text-secondary text-sm mb-2">
              I&apos;m working on some posts about SRE, automation, and random tech stuff.
            </p>
            <p className="text-text-muted text-sm">
              Stay tuned - first posts dropping soon.
            </p>
          </div>

          {/* Newsletter Subscription */}
          <div className="w-full max-w-lg">
            <NewsletterSubscribe />
          </div>
        </div>
      </div>
    </div>
  )
}

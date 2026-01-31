'use client'

import { useState, FormEvent } from 'react'
import { FiMail, FiSend, FiCheck } from 'react-icons/fi'

interface NewsletterSubscribeProps {
  title?: string
  description?: string
  compact?: boolean
}

export default function NewsletterSubscribe({
  title = 'Subscribe to the Newsletter',
  description = 'Get notified when new blog posts are published. No spam, unsubscribe anytime.',
  compact = false,
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Simulación de envío (backend se implementará después)
    if (email) {
      setIsSubmitted(true)
      // TODO: Integrar con API backend cuando esté disponible
      console.log('Email suscrito:', email)
    }
  }

  if (isSubmitted) {
    return (
      <div className={`bg-bg-card border border-accent-primary/30 rounded-lg ${compact ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center justify-center space-x-3">
          <div className="p-2 bg-green-500/10 rounded-full">
            <FiCheck className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h3 className={`font-mono font-semibold text-green-400 ${compact ? 'text-base' : 'text-lg'}`}>
              Thanks for subscribing!
            </h3>
            <p className="text-text-muted text-sm">
              You&apos;ll be notified about new posts soon.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-bg-card border border-accent-primary/30 rounded-lg ${compact ? 'p-4' : 'p-6'}`}>
      <div className="flex items-start space-x-4 mb-4">
        <div className="p-2 bg-accent-primary/10 rounded-lg">
          <FiMail className="w-5 h-5 text-accent-primary" />
        </div>
        <div className="flex-1">
          <h3 className={`font-mono font-semibold text-text-primary ${compact ? 'text-base' : 'text-lg'} mb-1`}>
            {title}
          </h3>
          <p className={`text-text-secondary ${compact ? 'text-xs' : 'text-sm'}`}>
            {description}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="newsletter-email" className="block text-sm font-mono text-text-secondary mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="newsletter-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-bg-secondary border border-bg-card rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors font-mono"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          className={`w-full flex items-center justify-center space-x-2 px-6 ${compact ? 'py-2' : 'py-3'} bg-accent-primary text-bg-primary font-mono font-semibold rounded-lg hover:bg-accent-secondary transition-colors glow-effect`}
        >
          <FiSend className="w-4 h-4" />
          <span>Subscribe</span>
        </button>

        <p className="text-xs text-text-muted text-center">
          Backend integration coming soon. Your subscription will be saved.
        </p>
      </form>
    </div>
  )
}

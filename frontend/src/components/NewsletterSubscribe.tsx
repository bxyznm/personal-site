'use client'

import { useState, FormEvent } from 'react'
import { FiMail, FiSend, FiCheck } from 'react-icons/fi'

interface NewsletterSubscribeProps {
  title?: string
  description?: string
  compact?: boolean
}

export default function NewsletterSubscribe({
  title = 'SUBSCRIBE TO FEED',
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
      <div className={`bg-bg-panel border border-line ${compact ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center space-x-3">
          <FiCheck className="w-5 h-5 text-signal shrink-0" />
          <div>
            <h3 className={`font-mono font-semibold tracking-data text-fg-primary uppercase ${compact ? 'text-xs' : 'text-sm'}`}>
              SUBSCRIBED
            </h3>
            <p className="text-fg-secondary text-xs">
              You&apos;ll be notified about new posts.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-bg-panel border border-line ${compact ? 'p-4' : 'p-6'}`}>
      <div className="flex items-start space-x-3 mb-4 pb-4 border-b border-line">
        <FiMail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className={`font-mono font-semibold tracking-data text-fg-primary uppercase ${compact ? 'text-xs' : 'text-sm'} mb-1`}>
            {title}
          </h3>
          <p className={`text-fg-secondary ${compact ? 'text-xs' : 'text-sm'}`}>
            {description}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          id="newsletter-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email address"
          className="w-full px-3 py-2.5 bg-bg-secondary border border-line text-fg-primary placeholder-fg-secondary focus:border-accent focus:outline-none transition-colors font-mono text-sm"
          placeholder="you@example.com"
        />

        <button
          type="submit"
          className={`w-full flex items-center justify-center space-x-2 px-4 ${compact ? 'py-2' : 'py-2.5'} bg-accent text-bg-primary font-mono font-semibold tracking-data uppercase text-xs hover:bg-fg-primary transition-colors`}
        >
          <FiSend className="w-3.5 h-3.5" />
          <span>Subscribe</span>
        </button>
      </form>
    </div>
  )
}

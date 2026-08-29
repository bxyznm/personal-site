'use client'

import { useState, FormEvent } from 'react'
import { EnvelopeSimple, PaperPlaneTilt, Check } from '@phosphor-icons/react'

interface NewsletterSubscribeProps {
  title?: string
  description?: string
  compact?: boolean
}

export default function NewsletterSubscribe({
  title = 'Subscribe to updates',
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
      <div className={`bg-bg-panel border border-line rounded-2xl ${compact ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-signal/10 flex items-center justify-center shrink-0">
            <Check size={18} className="text-signal" />
          </div>
          <div>
            <h3 className={`font-semibold text-fg-primary ${compact ? 'text-sm' : 'text-base'}`}>
              Subscribed
            </h3>
            <p className="text-fg-secondary text-xs">
              You will be notified about new posts.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-bg-panel border border-line rounded-2xl ${compact ? 'p-4' : 'p-6'}`}>
      <div className="flex items-start gap-3 mb-4">
        <EnvelopeSimple size={18} className="text-accent shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className={`font-semibold text-fg-primary ${compact ? 'text-sm' : 'text-base'} mb-1`}>
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
          className="w-full px-3.5 py-2.5 bg-bg-secondary border border-line rounded-xl text-fg-primary placeholder-fg-secondary/60 focus:border-accent focus:outline-none transition-colors text-sm"
          placeholder="you@example.com"
        />

        <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 px-4 ${compact ? 'py-2' : 'py-2.5'} bg-accent text-bg-primary rounded-full font-medium text-sm hover:bg-accent-dim transition-colors`}
        >
          <PaperPlaneTilt size={16} />
          <span>Subscribe</span>
        </button>
      </form>
    </div>
  )
}

'use client'

import { useState, FormEvent } from 'react'
import {
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  MapPin,
  PaperPlaneTilt,
  Check,
  WarningCircle,
} from '@phosphor-icons/react'
import { Reveal } from '@/components/Reveal'

const contactMethods = [
  {
    name: 'Email',
    value: 'bryangonzalezm@outlook.com',
    href: 'mailto:bryangonzalezm@outlook.com',
    icon: EnvelopeSimple,
    description: 'Best for detailed inquiries',
  },
  {
    name: 'LinkedIn',
    value: '/in/brxvn',
    href: 'https://www.linkedin.com/in/brxvn',
    icon: LinkedinLogo,
    description: 'Connect professionally',
  },
  {
    name: 'GitHub',
    value: '@bxyznm',
    href: 'https://github.com/bxyznm',
    icon: GithubLogo,
    description: 'Check out my code',
  },
]

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const [formState, setFormState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormState('loading')
    setErrorMessage('')

    const apiUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL
    if (!apiUrl) {
      setErrorMessage('Contact form is not configured. Please reach out directly by email.')
      setFormState('error')
      return
    }

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setFormState('success')
        form.reset()
      } else {
        const body = await res.json().catch(() => ({}))
        setErrorMessage(body.error || 'Something went wrong. Please try again.')
        setFormState('error')
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.')
      setFormState('error')
    }
  }

  return (
    <div className="min-h-screen py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mb-16 max-w-2xl">
          <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tightest mb-4">Get in touch</h1>
          <p className="text-fg-secondary text-lg leading-relaxed">
            Have a project in mind or want to discuss opportunities? I would love to hear from you.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Reveal className="bg-bg-panel border border-line rounded-2xl p-8">
            {formState === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-signal/10 flex items-center justify-center">
                  <Check size={24} className="text-signal" />
                </div>
                <p className="text-fg-primary font-semibold">Message sent</p>
                <p className="text-fg-secondary text-sm">
                  I will get back to you within 24-48 hours.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-2 text-sm text-accent hover:text-fg-primary underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm text-fg-secondary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3.5 py-2.5 bg-bg-secondary border border-line rounded-xl text-fg-primary placeholder-fg-secondary/60 focus:border-accent focus:outline-none transition-colors text-sm"
                    placeholder="Alex Rivera"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-fg-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3.5 py-2.5 bg-bg-secondary border border-line rounded-xl text-fg-primary placeholder-fg-secondary/60 focus:border-accent focus:outline-none transition-colors text-sm"
                    placeholder="alex@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm text-fg-secondary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3.5 py-2.5 bg-bg-secondary border border-line rounded-xl text-fg-primary placeholder-fg-secondary/60 focus:border-accent focus:outline-none transition-colors text-sm"
                    placeholder="Project collaboration"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-fg-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-3.5 py-2.5 bg-bg-secondary border border-line rounded-xl text-fg-primary placeholder-fg-secondary/60 focus:border-accent focus:outline-none transition-colors text-sm resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                {formState === 'error' && (
                  <div className="flex items-start gap-2 p-3 bg-bg-secondary border border-accent/40 rounded-xl text-sm text-fg-primary">
                    <WarningCircle size={18} className="text-accent mt-0.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-accent text-bg-primary rounded-full font-medium text-sm hover:bg-accent-dim transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <PaperPlaneTilt size={16} />
                  <span>{formState === 'loading' ? 'Sending...' : 'Send message'}</span>
                </button>
              </form>
            )}
          </Reveal>

          {/* Contact Info */}
          <Reveal delay={0.1} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-3">
              {contactMethods.map((method) => (
                <a
                  key={method.name}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-bg-panel border border-line rounded-2xl panel-hover p-4 block"
                >
                  <div className="flex items-start gap-3">
                    <method.icon size={18} className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-sm text-fg-primary">
                        {method.name}
                      </div>
                      <div className="text-sm text-fg-secondary">{method.value}</div>
                      <div className="text-xs text-fg-secondary mt-1">{method.description}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-bg-panel border border-line rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <MapPin size={18} className="text-accent" />
                <h3 className="font-medium text-sm text-fg-primary">Location</h3>
              </div>
              <p className="text-fg-secondary text-sm">
                Based in Mexico City, Mexico.
              </p>
              <p className="text-fg-secondary text-xs mt-2">
                Available for remote work worldwide.
              </p>
            </div>

            <div className="bg-bg-panel border border-accent/40 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-sm text-fg-primary font-medium">Currently employed</span>
              </div>
              <p className="text-fg-secondary text-sm">
                I have got a gig and I am loving it, but I am always curious about interesting
                opportunities. Feel free to reach out if you have something cool in mind.
              </p>
              <p className="text-fg-secondary text-xs mt-2">
                Response time: typically within 24-48 hours.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

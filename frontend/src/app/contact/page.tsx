'use client'

import { useState, FormEvent } from 'react'
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { Reveal } from '@/components/Reveal'

const contactMethods = [
  {
    name: 'Email',
    value: 'bryangonzalezm@outlook.com',
    href: 'mailto:bryangonzalezm@outlook.com',
    icon: FiMail,
    description: 'Best for detailed inquiries',
  },
  {
    name: 'LinkedIn',
    value: '/in/brxvn',
    href: 'https://www.linkedin.com/in/brxvn',
    icon: FiLinkedin,
    description: 'Connect professionally',
  },
  {
    name: 'GitHub',
    value: '@bxyznm',
    href: 'https://github.com/bxyznm',
    icon: FiGithub,
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
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal className="mb-16">
          <h1 className="font-display uppercase leading-[0.9] tracking-tightest text-[clamp(2.25rem,5vw,4rem)] mb-4">
            GET IN TOUCH
          </h1>
          <p className="text-fg-secondary font-mono text-sm uppercase tracking-data">
            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Reveal className="bg-bg-panel border border-line p-8">
            <h2 className="font-mono text-xs tracking-data text-fg-secondary uppercase mb-6 pb-4 border-b border-line">
              [ SEND_MESSAGE ]
            </h2>

            {formState === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                <FiCheck className="w-8 h-8 text-signal" />
                <p className="text-fg-primary font-mono font-semibold tracking-data uppercase text-sm">Message sent!</p>
                <p className="text-fg-secondary text-sm">
                  I&apos;ll get back to you within 24&ndash;48 hours.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-4 text-xs text-accent hover:text-fg-primary font-mono tracking-data uppercase underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-xs font-mono tracking-data text-fg-secondary uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2.5 bg-bg-secondary border border-line text-fg-primary placeholder-fg-secondary focus:border-accent focus:outline-none transition-colors font-mono text-sm"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono tracking-data text-fg-secondary uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2.5 bg-bg-secondary border border-line text-fg-primary placeholder-fg-secondary focus:border-accent focus:outline-none transition-colors font-mono text-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono tracking-data text-fg-secondary uppercase mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3 py-2.5 bg-bg-secondary border border-line text-fg-primary placeholder-fg-secondary focus:border-accent focus:outline-none transition-colors font-mono text-sm"
                    placeholder="Project Collaboration"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono tracking-data text-fg-secondary uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-3 py-2.5 bg-bg-secondary border border-line text-fg-primary placeholder-fg-secondary focus:border-accent focus:outline-none transition-colors font-mono text-sm resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                {formState === 'error' && (
                  <div className="flex items-start space-x-2 p-3 bg-bg-secondary border border-accent text-sm text-accent">
                    <FiAlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-accent text-bg-primary font-mono font-semibold tracking-data uppercase text-sm hover:bg-fg-primary transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FiSend className="w-4 h-4" />
                  <span>{formState === 'loading' ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </Reveal>

          {/* Contact Info */}
          <Reveal delay={0.1} className="space-y-6">
            {/* Quick Contact Cards */}
            <div>
              <h2 className="font-mono text-xs tracking-data text-fg-secondary uppercase mb-4 pb-2 border-b border-line">
                [ CONTACT_INFO ]
              </h2>
              <dl className="grid sm:grid-cols-2 gap-px bg-line border border-line">
                {contactMethods.map((method) => (
                  <a
                    key={method.name}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-bg-panel panel-hover p-4 block"
                  >
                    <div className="flex items-start space-x-3">
                      <method.icon className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      <div>
                        <dt className="font-mono font-semibold text-xs tracking-data text-fg-primary uppercase">
                          {method.name}
                        </dt>
                        <dd className="text-sm text-fg-secondary font-mono">{method.value}</dd>
                        <dd className="text-xs text-fg-secondary mt-1">{method.description}</dd>
                      </div>
                    </div>
                  </a>
                ))}
              </dl>
            </div>

            {/* Location */}
            <div className="bg-bg-panel border border-line p-6">
              <div className="flex items-center space-x-3 mb-3 pb-3 border-b border-line">
                <FiMapPin className="w-4 h-4 text-accent" />
                <h3 className="font-mono font-semibold text-xs tracking-data text-fg-primary uppercase">Location</h3>
              </div>
              <p className="text-fg-secondary text-sm">
                Based in Mexico City, Mexico
              </p>
              <p className="text-fg-secondary text-xs mt-2">
                Available for remote work worldwide
              </p>
            </div>

            {/* Availability */}
            <div className="bg-bg-panel border border-accent p-6">
              <div className="flex items-center space-x-2 mb-3">
                <span className="w-2 h-2 bg-accent" />
                <span className="font-mono text-xs tracking-data text-accent uppercase">Status: Currently Employed</span>
              </div>
              <p className="text-fg-secondary text-sm">
                I&apos;ve got a gig and loving it, but I&apos;m always curious about interesting opportunities.
                Feel free to reach out if you&apos;ve got something cool in mind!
              </p>
              <p className="text-fg-secondary text-xs mt-2">
                Response time: typically within 24-48 hours
              </p>
            </div>

            {/* Terminal style fun */}
            <div className="crosshair bg-bg-panel border border-line p-4 font-mono text-sm">
              <div className="pb-2 mb-3 border-b border-line">
                <span className="text-fg-secondary text-xs tracking-data uppercase">{'/// PING'}</span>
              </div>
              <div className="space-y-1">
                <samp className="block"><span className="text-accent">$</span> ping sre-engineer</samp>
                <samp className="block text-fg-secondary">PONG! Ready to collaborate.</samp>
                <samp className="block"><span className="text-accent">$</span> uptime</samp>
                <samp className="block text-fg-secondary">Available 9 AM - 6 PM UTC</samp>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}

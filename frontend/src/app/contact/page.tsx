'use client'

import { useState, FormEvent } from 'react'
import { FiMail, FiGithub, FiLinkedin, FiMapPin, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'

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
    value: '/in/brxyzn',
    href: 'https://linkedin.com/in/brxyzn',
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
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-accent-primary">#</span> Get in Touch
          </h1>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-bg-card border border-bg-card rounded-lg p-8">
            <h2 className="text-xl font-mono font-semibold mb-6">
              <span className="text-accent-primary">$</span> send_message
            </h2>

            {formState === 'success' ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                <div className="p-4 bg-green-500/10 rounded-full">
                  <FiCheck className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-text-primary font-mono font-semibold">Message sent!</p>
                <p className="text-text-secondary text-sm">
                  I&apos;ll get back to you within 24–48 hours.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-4 text-sm text-accent-primary hover:text-accent-secondary font-mono underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-mono text-text-secondary mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-bg-secondary border border-bg-card rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors font-mono"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-mono text-text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-bg-secondary border border-bg-card rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors font-mono"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-mono text-text-secondary mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 bg-bg-secondary border border-bg-card rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors font-mono"
                    placeholder="Project Collaboration"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-mono text-text-secondary mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-bg-secondary border border-bg-card rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors font-mono resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                {formState === 'error' && (
                  <div className="flex items-start space-x-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400">
                    <FiAlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-accent-primary text-bg-primary font-mono font-semibold rounded-lg hover:bg-accent-secondary transition-colors glow-effect disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <FiSend className="w-5 h-5" />
                  <span>{formState === 'loading' ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Quick Contact Cards */}
            <div>
              <h2 className="text-xl font-mono font-semibold mb-6">
                <span className="text-accent-primary">$</span> contact_info
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactMethods.map((method) => (
                  <a
                    key={method.name}
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-bg-card border border-bg-card hover:border-accent-primary/50 rounded-lg p-4 card-hover block"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-accent-primary/10 rounded-lg">
                        <method.icon className="w-5 h-5 text-accent-primary" />
                      </div>
                      <div>
                        <h3 className="font-mono font-semibold text-text-primary">
                          {method.name}
                        </h3>
                        <p className="text-sm text-accent-secondary">{method.value}</p>
                        <p className="text-xs text-text-muted mt-1">{method.description}</p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="bg-bg-card border border-bg-card rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-accent-primary/10 rounded-lg">
                  <FiMapPin className="w-5 h-5 text-accent-primary" />
                </div>
                <h3 className="font-mono font-semibold text-text-primary">Location</h3>
              </div>
              <p className="text-text-secondary">
                Based in <span className="text-accent-secondary">Mexico City, Mexico</span>
              </p>
              <p className="text-text-muted text-sm mt-2">
                Available for remote work worldwide
              </p>
            </div>

            {/* Availability */}
            <div className="bg-bg-card border border-accent-primary/30 rounded-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <span className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></span>
                <span className="font-mono text-cyan-400">Status: Currently Employed</span>
              </div>
              <p className="text-text-secondary text-sm">
                I&apos;ve got a gig and loving it, but I&apos;m always curious about interesting opportunities.
                Feel free to reach out if you&apos;ve got something cool in mind!
              </p>
              <p className="text-text-muted text-xs mt-2">
                Response time: typically within 24-48 hours
              </p>
            </div>

            {/* Terminal style fun */}
            <div className="bg-bg-card border border-bg-card rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center space-x-2 mb-3 pb-2 border-b border-bg-secondary">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="space-y-1">
                <p><span className="text-accent-primary">$</span> ping sre-engineer</p>
                <p className="text-green-400">PONG! Ready to collaborate.</p>
                <p><span className="text-accent-primary">$</span> uptime</p>
                <p className="text-text-secondary">Available 9 AM - 6 PM UTC</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

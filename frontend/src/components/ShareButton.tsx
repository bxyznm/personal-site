'use client'

import { useState } from 'react'
import { FiShare2, FiCheck } from 'react-icons/fi'

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // user cancelled or share failed — fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center space-x-2 text-fg-secondary hover:text-accent transition-colors font-mono text-xs tracking-data uppercase"
    >
      {copied ? <FiCheck className="w-3.5 h-3.5 text-signal" /> : <FiShare2 className="w-3.5 h-3.5" />}
      <span>{copied ? 'Link copied' : 'Share'}</span>
    </button>
  )
}

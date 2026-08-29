'use client'

import { useState } from 'react'
import { ShareNetwork, Check } from '@phosphor-icons/react'

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    const url = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // user cancelled or share failed, fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-fg-secondary hover:text-fg-primary transition-colors text-sm"
    >
      {copied ? <Check size={16} className="text-signal" /> : <ShareNetwork size={16} />}
      <span>{copied ? 'Link copied' : 'Share'}</span>
    </button>
  )
}

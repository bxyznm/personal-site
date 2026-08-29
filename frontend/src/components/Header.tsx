'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { List, X } from '@phosphor-icons/react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/90 backdrop-blur-md border-b border-line">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-display font-bold text-lg tracking-tightest text-fg-primary">
            Bryan Mendoza
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-bg-panel border border-line rounded-full p-1">
            {navigation.map((item) => {
              const active =
                pathname === item.href || pathname === item.href.replace(/\/?$/, '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-1.5 rounded-full text-sm transition-colors ${
                    active ? 'text-bg-primary' : 'text-fg-secondary hover:text-fg-primary'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-accent rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              )
            })}
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-fg-secondary hover:text-fg-primary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden border-t border-line"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col py-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-2.5 rounded-lg text-sm text-fg-secondary hover:text-fg-primary hover:bg-bg-panel transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

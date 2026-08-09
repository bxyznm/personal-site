'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX, FiTerminal } from 'react-icons/fi'

const navigation = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'PROJECTS', href: '/projects' },
  { name: 'BLOG', href: '/blog' },
  { name: 'CONTACT', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-bg-primary/95 border-b border-line">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <FiTerminal className="w-5 h-5 text-accent" />
            <span className="font-mono font-bold text-sm tracking-data text-fg-primary uppercase">
              UNIT / BRXVN-01
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-stretch">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 border-l border-line text-fg-secondary hover:text-accent hover:bg-bg-panel font-mono text-xs tracking-data transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 text-fg-secondary hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden border-t border-line"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
            >
              <div className="flex flex-col">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-4 py-3 border-t border-line first:border-t-0 text-fg-secondary hover:text-accent hover:bg-bg-panel font-mono text-xs tracking-data transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {'>>> '}
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

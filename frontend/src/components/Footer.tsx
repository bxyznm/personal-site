import { GithubLogo, LinkedinLogo, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/bxyznm', icon: GithubLogo },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/brxvn', icon: LinkedinLogo },
  { name: 'Email', href: 'mailto:bryangonzalezm@outlook.com', icon: EnvelopeSimple },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-fg-secondary">
            &copy; {currentYear} Bryan Mendoza.
          </p>

          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full text-fg-secondary hover:text-fg-primary hover:bg-bg-panel transition-colors"
                aria-label={link.name}
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

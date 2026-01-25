import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiHeart } from 'react-icons/fi'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: FiGithub },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: FiLinkedin },
  // { name: 'Twitter', href: 'https://twitter.com', icon: FiTwitter },
  { name: 'Email', href: 'mailto:bryangonzalezm@outlook.com', icon: FiMail },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg-secondary border-t border-bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center space-x-1 text-text-muted text-sm font-mono">
            <span>&copy; {currentYear}</span>
            <span className="text-accent-primary">|</span>
            <span>Built with</span>
            <FiHeart className="w-4 h-4 text-accent-primary" />
            <span>by brxvn</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-text-muted hover:text-accent-primary transition-colors"
                aria-label={link.name}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Terminal-style status */}
        <div className="mt-6 pt-6 border-t border-bg-card">
          <div className="flex items-center justify-center space-x-2 text-xs font-mono text-text-muted">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>System Status: <span className="text-green-400">Operational</span></span>
            <span className="text-accent-primary">|</span>
            <span>Hosted on <span className="text-accent-secondary">AWS</span></span>
            <span className="text-accent-primary">|</span>
            <span>v{process.env.APP_VERSION}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

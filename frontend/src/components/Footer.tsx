import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/bxyznm', icon: FiGithub },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/brxvn', icon: FiLinkedin },
  { name: 'Email', href: 'mailto:bryangonzalezm@outlook.com', icon: FiMail },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg-secondary border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="font-mono text-xs tracking-data text-fg-secondary uppercase">
            {'// '}&copy; {currentYear} &mdash; BRXVN
          </div>

          {/* Social Links */}
          <div className="flex items-stretch border border-line">
            {socialLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 text-fg-secondary hover:text-accent hover:bg-bg-panel transition-colors ${
                  index > 0 ? 'border-l border-line' : ''
                }`}
                aria-label={link.name}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Terminal-style status */}
        <div className="mt-4 pt-4 border-t border-line">
          <div className="flex items-center justify-center space-x-2 text-xs font-mono tracking-data text-fg-secondary uppercase">
            <span className="w-2 h-2 bg-signal animate-pulse" />
            <span>SYS.STATUS: OPERATIONAL</span>
            <span className="text-line-bright">|</span>
            <span>HOST: AWS</span>
            <span className="text-line-bright">|</span>
            <span>REV {process.env.APP_VERSION}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter_Tight, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const cabinetGrotesk = localFont({
  src: [
    { path: '../fonts/cabinet-grotesk/CabinetGrotesk-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../fonts/cabinet-grotesk/CabinetGrotesk-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../fonts/cabinet-grotesk/CabinetGrotesk-Extrabold.woff2', weight: '800', style: 'normal' },
    { path: '../fonts/cabinet-grotesk/CabinetGrotesk-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-cabinet-grotesk',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://bxyzn.com'),
  title: {
    default: 'Bryan Mendoza | DevSecOps & SRE Engineer',
    template: '%s | Bryan Mendoza',
  },
  description: 'Portfolio of Bryan Mendoza, a DevSecOps engineer with an SRE background building secure, reliable cloud infrastructure across AWS, GCP, Kubernetes, and CI/CD.',
  keywords: ['SRE', 'DevOps', 'DevSecOps', 'Cloud', 'AWS', 'GCP', 'Azure', 'Kubernetes', 'Terraform', 'CI/CD', 'Snyk', 'Security'],
  authors: [{ name: 'Bryan Mendoza' }],
  creator: 'Bryan Mendoza',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bryan Mendoza | DevSecOps & SRE Engineer',
    description: 'Portfolio of Bryan Mendoza, a DevSecOps engineer with an SRE background building secure, reliable cloud infrastructure.',
    type: 'website',
    url: 'https://bxyzn.com',
    siteName: 'Bryan Mendoza',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bryan Mendoza | DevSecOps & SRE Engineer',
    description: 'Portfolio of Bryan Mendoza, a DevSecOps engineer with an SRE background building secure, reliable cloud infrastructure.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cabinetGrotesk.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-bg-primary text-fg-primary antialiased">
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

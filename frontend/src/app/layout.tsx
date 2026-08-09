import type { Metadata } from 'next'
import { Archivo_Black, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-archivo-black',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SRE/DevOps Engineer | Portfolio',
  description: 'Personal portfolio showcasing SRE/DevOps expertise in cloud infrastructure, Kubernetes, CI/CD, and infrastructure as code.',
  keywords: ['SRE', 'DevOps', 'Cloud', 'AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
  authors: [{ name: 'SRE Engineer' }],
  openGraph: {
    title: 'SRE/DevOps Engineer | Portfolio',
    description: 'Personal portfolio showcasing SRE/DevOps expertise',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${archivoBlack.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-bg-primary text-fg-primary antialiased">
        <div aria-hidden="true" className="crt-overlay" />
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

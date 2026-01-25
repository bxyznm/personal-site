import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-primary antialiased">
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

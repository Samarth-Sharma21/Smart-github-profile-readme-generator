import './globals.css'
import 'github-markdown-css/github-markdown-light.css'
import { Toaster } from '@/components/ui/sonner'
import Script from 'next/script'

export const metadata = {
  metadataBase: new URL('https://github-profile-readme-generator.vercel.app'),
  title: 'Smart GitHub Profile README Generator | Create Beautiful GitHub READMEs',
  description: 'Create beautiful GitHub profile README files with interactive forms and live preview. Customize your GitHub profile with technologies, stats, projects and more.',
  keywords: ['github profile', 'readme generator', 'github readme', 'profile generator', 'markdown generator', 'github stats', 'developer profile', 'github bio'],
  authors: [{ name: 'Smart GitHub Profile README Generator' }],
  creator: 'Smart GitHub Profile README Generator',
  publisher: 'Smart GitHub Profile README Generator',
  openGraph: {
    title: 'Smart GitHub Profile README Generator | Create Beautiful GitHub READMEs',
    description: 'Create beautiful GitHub profile README files with interactive forms and live preview. Customize your GitHub profile with technologies, stats, projects and more.',
    url: 'https://github-profile-readme-generator.vercel.app/',
    siteName: 'Smart GitHub Profile README Generator',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Smart GitHub Profile README Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smart GitHub Profile README Generator | Create Beautiful GitHub READMEs',
    description: 'Create beautiful GitHub profile README files with interactive forms and live preview. Customize your GitHub profile with technologies, stats, projects and more.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://github-profile-readme-generator.vercel.app/',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="README Generator" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {/* Removed undefined components:
        <PerformanceOptimizer />
        <PerformanceBooster />
        <MediaOptimizer />
        */}
        {children}
        {/* Removed undefined component: <FeedbackButton /> */}
        <Toaster />
        <Script
          src="/js/analytics.js"
          strategy="afterInteractive"
        />
        <Script
          src="/js/sw-register.js"
          strategy="afterInteractive"
        />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js" strategy="afterInteractive" integrity="sha512-yFjZbTYRCJodnuyGlsKamNE/LlEaEAxSUDe5+u61mV8zzqJVFOH7TnULE2/PP/l5vKWpUNnF4VGVkXh3MjgLsg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </body>
    </html>
  )
}
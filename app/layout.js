import './globals.css'
import 'github-markdown-css/github-markdown-light.css'
import { Toaster } from '@/components/ui/sonner'
import Script from 'next/script'

export const metadata = {
  metadataBase: new URL('https://github-profile-readme-generator.vercel.app'),
  title: 'Smart GitHub Profile README Generator | Create Stunning GitHub Profile Pages',
  description: 'Free Smart GitHub Profile README Generator to create beautiful, customized GitHub profile pages with technologies, stats, projects, social links, and more. Stand out with a professional GitHub presence.',
  keywords: ['github profile', 'readme generator', 'github readme', 'profile generator', 'markdown generator', 'github stats', 'developer profile', 'github bio', 'github profile readme', 'github profile readme generator', 'github profile markdown', 'github profile template', 'github profile page', 'github profile badges', 'github profile stats', 'github profile customization', 'github profile design', 'github profile layout', 'github profile showcase'],
  authors: [{ name: 'Smart GitHub Profile README Generator' }],
  creator: 'Smart GitHub Profile README Generator',
  publisher: 'Smart GitHub Profile README Generator',
  openGraph: {
    title: 'Smart GitHub Profile README Generator | Create Stunning GitHub Profile Pages',
    description: 'Free Smart GitHub Profile README Generator to create beautiful, customized GitHub profile pages with technologies, stats, projects, social links, and more. Stand out with a professional GitHub presence.',
    url: 'https://github-profile-readme-generator.vercel.app',
    siteName: 'Smart GitHub Profile README Generator',
    images: [
      {
        url: '/og-image.svg',
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
    title: 'Smart GitHub Profile README Generator | Create Stunning GitHub Profile Pages',
    description: 'Free Smart GitHub Profile README Generator to create beautiful, customized GitHub profile pages with technologies, stats, projects, social links, and more. Stand out with a professional GitHub presence.',
    creator: '@github',
    images: ['/og-image.svg'],
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
        <meta name="apple-mobile-web-app-title" content="Smart GitHub Profile README Generator" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <link rel="canonical" href="https://github-profile-readme-generator.vercel.app/" />
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
        {/* Structured data for better SEO */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Smart GitHub Profile README Generator",
          "alternateName": "Smart GitHub Profile Generator",
          "url": "https://github-profile-readme-generator.vercel.app/",
          "logo": "https://github-profile-readme-generator.vercel.app/favicon.svg",
          "description": "Free Smart GitHub Profile README Generator to create beautiful, customized GitHub profile pages with technologies, stats, projects, social links, and more. Stand out with a professional GitHub presence.",
          "applicationCategory": "DeveloperApplication",
          "applicationSubCategory": "ProfileGenerator",
          "operatingSystem": "Any",
          "keywords": "github profile, readme generator, github readme, profile generator, markdown generator, github stats, developer profile, github bio, github profile readme, github profile template, github profile customization",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "120",
            "bestRating": "5",
            "worstRating": "1"
          },
          "author": {
            "@type": "Organization",
            "name": "Smart GitHub Profile README Generator",
            "url": "https://github-profile-readme-generator.vercel.app/"
          },
          "datePublished": "2023-01-01",
          "dateModified": "2023-11-01"
        })}}></script>
        {/* Google Tag Manager */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script
          src="/js/analytics.js"
          strategy="afterInteractive"
        />
        <Script
          src="/js/sw-register.js"
          strategy="afterInteractive"
        />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/js/all.min.js" strategy="afterInteractive" integrity="sha512-yFjZbTYRCJodnuyGlsKamNE/LlEaEAxSUDe5+u61mV8zzqJVFOH7TnULE2/PP/l5vKWpUNnF4VGVkXh3MjgLsg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <Script src="/js/schema.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
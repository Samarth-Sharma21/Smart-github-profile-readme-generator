'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, GitFork, Coffee, Eye, Github, ArrowRight, FileText } from 'lucide-react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Lenis from 'lenis'
import CreateReadmeForm from '@/components/CreateReadmeForm'
import PreviewReadme from '@/components/PreviewReadme'
import Script from 'next/script'
import { Toaster } from '@/components/ui/toaster'


export default function App() {
  const [currentView, setCurrentView] = useState('create')
  const [readmeData, setReadmeData] = useState({
    profile: {
      name: '',
      subtitle: '',
      welcomeMessage: '',
      showNameAsHeading: false
    },
    technologies: [],
    socialLinks: [],
    githubStats: {
      showProfileViews: false,
      showGithubStats: false,
      showStreakStats: false,
      showTopLanguages: false,
      showActivityGraph: false,
      username: ''
    },
    projects: [],
    support: {
      buyMeCoffee: '',
      kofi: ''
    },
    contact: {
      email: ''
    },
    sectionHeadings: {
      technologies: '🛠️ Technologies & Skills',
      socialLinks: '🌐 Social Links', 
      githubStats: '📊 GitHub Stats',
      projects: '🚀 Featured Projects',
      support: '☕ Support Me',
      contact: '📫 Contact Me'
    }
  })

  const starRef = useRef(null)
  const forkRef = useRef(null)
  const mainContentRef = useRef(null)

  const handleDataChange = (newData) => {
    setReadmeData(prev => ({ ...prev, ...newData }))
  }

  const switchToPreview = () => {
    // Animate page transition
    gsap.to(mainContentRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        setCurrentView('preview')
        gsap.fromTo(mainContentRef.current, 
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
        )
      }
    })
    
    // Smooth scroll to top
    if (typeof window !== 'undefined' && window.lenis) {
      window.lenis.scrollTo(0)
    }
  }

  const switchToCreate = () => {
    // Animate page transition
    gsap.to(mainContentRef.current, {
      x: 50,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: () => {
        setCurrentView('create')
        gsap.fromTo(mainContentRef.current, 
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
        )
      }
    })
  }

  const handleToggleChange = (view) => {
    if (view !== currentView) {
      if (view === 'preview') {
        switchToPreview()
      } else {
        switchToCreate()
      }
    }
  }

  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Initialize Lenis smooth scroll with faster settings
    const lenis = new Lenis({
      duration: 0.5,  // Reduced for faster scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false, // Disable on touch devices for better performance
      touchMultiplier: 2
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Make lenis available globally
    window.lenis = lenis

    // GSAP animations for buttons
    const starIcon = starRef.current?.querySelector('svg')
    const forkIcon = forkRef.current?.querySelector('svg')

    if (starIcon) {
      gsap.set(starIcon, { transformOrigin: 'center' })
      starRef.current.addEventListener('mouseenter', () => {
        gsap.to(starIcon, {
          rotation: 360,
          scale: 1.1,
          duration: 0.6,
          ease: 'back.out(1.7)'
        })
      })
      starRef.current.addEventListener('mouseleave', () => {
        gsap.to(starIcon, {
          rotation: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        })
      })
    }

    if (forkIcon) {
      gsap.set(forkIcon, { transformOrigin: 'center' })
      forkRef.current.addEventListener('mouseenter', () => {
        gsap.to(forkIcon, {
          rotation: -15,
          scale: 1.1,
          duration: 0.3,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        })
      })
      forkRef.current.addEventListener('mouseleave', () => {
        gsap.to(forkIcon, {
          rotation: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out'
        })
      })
    }

    return () => {
      lenis.destroy()
      if (window.lenis) delete window.lenis
    }
  }, [])

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "GitHub Profile README Generator",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Create beautiful, customized GitHub profile READMEs with ease. This tool helps developers showcase their skills, projects, and stats with a professional README.",
    "keywords": "github profile, readme generator, github readme, profile generator, github profile readme, markdown generator, developer profile",
    "screenshot": "https://github-profile-readme-generator.vercel.app/images/og-image.svg",
    "softwareHelp": "https://github.com/Samarth-Sharma21/Smart-github-profile-readme-generator",
    "author": {
      "@type": "Person",
      "name": "GitHub Profile README Generator Team"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:outline-none focus:shadow-lg"
      >
        Skip to content
      </a>
      
      {/* JSON-LD structured data */}
      <Script id="schema-script" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "GitHub Profile README Generator",
          "alternateName": "GitHub Profile Generator",
          "applicationCategory": "DeveloperApplication",
          "applicationSubCategory": "Markdown Generator",
          "operatingSystem": "Web",
          "description": "Customize your GitHub profile with various components, preview in real-time, and generate markdown code to showcase your skills, projects, and achievements.",
          "keywords": "github, readme, profile, markdown, generator, developer tools, github profile, github readme, github profile readme, readme generator, profile generator, github profile generator",
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
          "url": "https://github-profile-readme-generator.vercel.app/",
          "sameAs": [
            "https://github.com/Samarth-Sharma21/Smart-github-profile-readme-generator"
          ],
          "author": {
            "@type": "Person",
            "name": "GitHub Profile README Generator Team"
          },
          "datePublished": "2023-11-01",
          "dateModified": new Date().toISOString().split('T')[0]
        })}
      </Script>
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50" role="banner">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2" id="main-heading">
                <Github className="w-6 h-6" aria-hidden="true" />
                <span>Smart GitHub Profile README Generator</span>
              </h1>
              {/* Removed the tagline as requested */}
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                 variant="ghost" 
                 size="sm"
                 className="flex items-center gap-2"
                 asChild
               >
                 <Link href="/how-to-create">
                   <FileText className="mr-1 h-4 w-4" />
                   How to Create
                 </Link>
               </Button>
              <Button 
                 ref={starRef}
                 variant="outline" 
                 size="sm"
                 className="flex items-center gap-2 hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
                 onClick={() => window.open('https://github.com/samarthsharma21/Smart-github-profile-readme-generator/stargazers', '_blank')}
                 aria-label="Star this repository on GitHub"
               >
                 <Star className="w-4 h-4 text-yellow-500" aria-hidden="true" />
                 <span>Star Repo</span>
               </Button>
              <Button 
                ref={forkRef}
                variant="outline" 
                size="sm"
                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                onClick={() => window.open('https://github.com/Samarth-Sharma21/Smart-github-profile-readme-generator/fork', '_blank')}
                aria-label="Fork this repository on GitHub"
              >
                <GitFork className="w-4 h-4 text-blue-500" aria-hidden="true" />
                <span>Fork Repo</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Toggle Section */}
      <nav className="border-b bg-muted/30" aria-label="View selection">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex justify-center">
            <div 
              className="relative flex border border-gray-300 rounded-md overflow-hidden"
              role="tablist"
              aria-orientation="horizontal"
              style={{ width: '320px', display: 'inline-flex', height: '40px' }}
            >
              {/* Sliding background */}
              <div 
                className="absolute bg-black h-full transition-all duration-300 ease-in-out rounded-sm" 
                style={{ 
                  width: '50%', 
                  left: currentView === 'create' ? '0%' : '50%',
                  zIndex: 1
                }}
              />
              <button
                onClick={() => handleToggleChange('create')}
                className={`flex-1 px-3 py-0 transition-colors duration-300 z-10 ${currentView === 'create' ? 'text-white' : 'text-foreground'}`}
                style={{ 
                  fontWeight: currentView === 'create' ? '500' : '400',
                  fontSize: '0.875rem'
                }}
                role="tab"
                id="tab-create"
                aria-selected={currentView === 'create'}
                aria-controls="panel-create"
              >
                Create README
              </button>
              <button
                onClick={() => handleToggleChange('preview')}
                className={`flex-1 px-3 py-0 transition-colors duration-300 z-10 ${currentView === 'preview' ? 'text-white' : 'text-foreground'}`}
                style={{ 
                  fontWeight: currentView === 'preview' ? '500' : '400',
                  fontSize: '0.875rem'
                }}
                role="tab"
                id="tab-preview"
                aria-selected={currentView === 'preview'}
                aria-controls="panel-preview"
              >
                Preview README
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main ref={mainContentRef} className="container mx-auto px-4 py-8 max-w-6xl custom-scrollbar" id="main-content" role="main" aria-labelledby="main-heading">
        {currentView === 'create' ? (
          <div 
            role="tabpanel" 
            id="panel-create" 
            aria-labelledby="tab-create"
          >
            <CreateReadmeForm 
              data={readmeData} 
              onChange={handleDataChange}
            />
            
            {/* Preview Redirect Button */}
            <div className="flex justify-center mt-12 pt-8 border-t">
              <Button
                onClick={switchToPreview}
                size="lg"
                className="flex items-center gap-3 px-8 py-4 text-lg font-semibold bg-black hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg"
                aria-label="Switch to preview mode"
              >
                <Eye className="w-5 h-5" aria-hidden="true" />
                Preview My README
              </Button>
            </div>
          </div>
        ) : (
          <div 
            role="tabpanel" 
            id="panel-preview" 
            aria-labelledby="tab-preview"
          >
            <PreviewReadme 
              data={readmeData}
            />
          </div>
        )}
      </main>

      {/* FAQ Section */}
      <section className="py-12 bg-muted/20 custom-scrollbar" aria-labelledby="faq-heading">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 id="faq-heading" className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="max-w-5xl mx-auto" itemScope itemType="https://schema.org/FAQPage">
            <div className="mb-6" itemScope itemType="https://schema.org/Question">
              <h3 itemProp="name" className="text-lg font-semibold mb-2">What is a GitHub Profile README?</h3>
              <div itemScope itemType="https://schema.org/Answer">
                <div itemProp="text" className="text-muted-foreground">
                  <p>A GitHub Profile README is a special repository that appears on your GitHub profile page. It allows you to showcase your skills, projects, and personality directly on your profile. It's a great way to make a strong first impression and highlight your work to potential employers or collaborators.</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6" itemScope itemType="https://schema.org/Question">
              <h3 itemProp="name" className="text-lg font-semibold mb-2">How do I create a GitHub Profile README?</h3>
              <div itemScope itemType="https://schema.org/Answer">
                <div itemProp="text" className="text-muted-foreground">
                  <p>To create a GitHub Profile README, you need to create a new repository with the same name as your GitHub username. Inside this repository, create a README.md file. Our generator helps you create the content for this file with a user-friendly interface, allowing you to customize various sections and preview the result before copying the markdown code.</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6" itemScope itemType="https://schema.org/Question">
              <h3 itemProp="name" className="text-lg font-semibold mb-2">Is this tool free to use?</h3>
              <div itemScope itemType="https://schema.org/Answer">
                <div itemProp="text" className="text-muted-foreground">
                  <p>Yes, the GitHub Profile README Generator is completely free to use. We believe in supporting the developer community by providing useful tools that help showcase your skills and projects.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      {/* Related Links Section */}
      <section className="py-8 bg-muted/10 custom-scrollbar" aria-labelledby="related-links-heading">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 id="related-links-heading" className="text-xl font-bold mb-6 text-center">Related Resources</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
              <h3 className="font-semibold mb-2">GitHub Profile Tips</h3>
              <p className="text-sm text-muted-foreground mb-3">Learn how to make your GitHub profile stand out with these expert tips and best practices.</p>
              <a href="/tips" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                Read more <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
              <h3 className="font-semibold mb-2">Markdown Cheat Sheet</h3>
              <p className="text-sm text-muted-foreground mb-3">Master markdown syntax with our comprehensive cheat sheet for creating beautiful documentation.</p>
              <a href="/markdown-guide" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                Read more <ArrowRight className="w-3 h-3" />
              </a>
            </div>
            
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
              <h3 className="font-semibold mb-2">GitHub Profile Examples</h3>
              <p className="text-sm text-muted-foreground mb-3">Get inspired by exploring our collection of outstanding GitHub profile README examples.</p>
              <a href="/examples" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
                Read more <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="border-t bg-muted/30 py-8 custom-scrollbar" role="contentinfo">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
            <span>Built with ❤️ by developers, for developers</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-orange-50 hover:border-orange-300 transition-colors"
              onClick={() => window.open('https://www.buymeacoffee.com/yourusername', '_blank')}
              aria-label="Support the developer with a coffee donation"
            >
              <Coffee className="w-4 h-4 text-orange-500" aria-hidden="true" />
              Buy me a coffee
            </Button>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            <p>© {new Date().getFullYear()} GitHub Profile README Generator. All rights reserved.</p>
            <div className="mt-2 flex items-center justify-center gap-4">
              <a href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</a>
              <span>|</span>
              <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <span>|</span>
              <a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a>
              <span>|</span>
              <a href="https://github.com/Samarth-Sharma21/Smart-github-profile-readme-generator/issues/new" className="hover:text-primary transition-colors" target="_blank" rel="noopener noreferrer">Report Bug</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Toggle } from '@/components/ui/toggle'
import { Star, GitFork, Coffee, Eye, Github } from 'lucide-react'
import { gsap } from 'gsap'
import Lenis from 'lenis'
import CreateReadmeForm from '@/components/CreateReadmeForm'
import PreviewReadme from '@/components/PreviewReadme'


export default function App() {
  const [currentView, setCurrentView] = useState('create')
  const [readmeData, setReadmeData] = useState({
    profile: {
      name: '',
      subtitle: '',
      welcomeMessage: ''
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
    },
    sectionOrder: {
      profile: 0,
      technologies: 1,
      socialLinks: 2,
      githubStats: 3,
      projects: 4,
      support: 5,
      contact: 6
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
    // Initialize Lenis smooth scroll with faster settings
    const lenis = new Lenis({
      duration: 0.5,  // Reduced for faster scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false // Disable on touch devices for better performance
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                <Github className="w-6 h-6" />
                Smart GitHub Profile README Generator
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                ref={starRef}
                variant="outline" 
                size="sm"
                className="flex items-center gap-2 hover:bg-yellow-50 hover:border-yellow-300 transition-colors"
                onClick={() => window.open('https://github.com/Samarth-Sharma21/Smart-github-profile-readme-generator/stargazers', '_blank')}
              >
                <Star className="w-4 h-4 text-yellow-500" />
                Star Repo
              </Button>
              <Button 
                ref={forkRef}
                variant="outline" 
                size="sm"
                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                onClick={() => window.open('https://github.com/Samarth-Sharma21/Smart-github-profile-readme-generator/fork', '_blank')}
              >
                <GitFork className="w-4 h-4 text-blue-500" />
                Fork Repo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Toggle Section */}
      <div className="border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-center">
            <div className="relative flex items-center justify-center bg-white dark:bg-gray-900 rounded-full p-1.5 border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden w-80">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/30 dark:to-purple-900/30 blur-md opacity-70" />
              
              {/* Animated slider pill */}
              <div 
                className="absolute h-full w-1/2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500 ease-out-expo z-0"
                style={{
                  left: currentView === 'create' ? '0%' : '50%',
                  boxShadow: '0 0 15px rgba(120, 120, 255, 0.5)',
                }}
              >
                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm" />
              </div>
              
              {/* Create Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggleChange('create')}
                className={`relative px-8 py-5 rounded-full transition-all duration-300 z-10 ${currentView === 'create' 
                  ? 'text-white font-medium' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
              >
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Create
                </span>
              </Button>
              
              {/* Preview Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleToggleChange('preview')}
                className={`relative px-8 py-5 rounded-full transition-all duration-300 z-10 ${currentView === 'preview' 
                  ? 'text-white font-medium' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
              >
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  Preview
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main ref={mainContentRef} className="container mx-auto px-4 py-8">
        {currentView === 'create' ? (
          <>
            <CreateReadmeForm 
              data={readmeData} 
              onChange={handleDataChange}
            />
            
            {/* Preview Redirect Button */}
            <div className="flex justify-center mt-12 pt-8 border-t">
              <Button
                onClick={switchToPreview}
                size="lg"
                className="flex items-center gap-3 px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                <Eye className="w-5 h-5" />
                Preview My README
              </Button>
            </div>
          </>
        ) : (
          <PreviewReadme 
            data={readmeData}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
            <span>Built with ❤️ by developers, for developers</span>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 hover:bg-orange-50 hover:border-orange-300 transition-colors"
              onClick={() => window.open('https://www.buymeacoffee.com/yourusername', '_blank')}
            >
              <Coffee className="w-4 h-4 text-orange-500" />
              Buy me a coffee
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
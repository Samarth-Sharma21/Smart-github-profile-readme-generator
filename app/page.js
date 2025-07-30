'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Toggle } from '@/components/ui/toggle'
import { Star, GitFork, Coffee } from 'lucide-react'
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
    }
  })

  const handleDataChange = (newData) => {
    setReadmeData(prev => ({ ...prev, ...newData }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">
              Smart GitHub Profile README Generator
            </h1>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
                onClick={() => window.open('https://github.com/Samarth-Sharma21/Smart-gh-profile-readme-generator', '_blank')}
              >
                <Star className="w-4 h-4" />
                Star Repo
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
                onClick={() => window.open('https://github.com/Samarth-Sharma21/Smart-gh-profile-readme-generator', '_blank')}
              >
                <GitFork className="w-4 h-4" />
                Fork Repo
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Toggle Section */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center">
            <div className="flex items-center bg-background rounded-lg p-1 border">
              <Button
                variant={currentView === 'create' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('create')}
                className="px-6"
              >
                Create README
              </Button>
              <Button
                variant={currentView === 'preview' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setCurrentView('preview')}
                className="px-6"
              >
                Preview README
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {currentView === 'create' ? (
          <CreateReadmeForm 
            data={readmeData} 
            onChange={handleDataChange}
          />
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
              className="flex items-center gap-2"
              onClick={() => window.open('https://www.buymeacoffee.com/yourusername', '_blank')}
            >
              <Coffee className="w-4 h-4" />
              Buy me a coffee
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
'use client'

import { useState, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search } from 'lucide-react'

// Popular technologies with their Devicon classes
const TECHNOLOGIES = [
  { name: 'JavaScript', icon: 'devicon-javascript-plain', category: 'Language' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain', category: 'Language' },
  { name: 'React', icon: 'devicon-react-original', category: 'Framework' },
  { name: 'Next.js', icon: 'devicon-nextjs-original', category: 'Framework' },
  { name: 'Vue.js', icon: 'devicon-vuejs-plain', category: 'Framework' },
  { name: 'Angular', icon: 'devicon-angularjs-plain', category: 'Framework' },
  { name: 'Svelte', icon: 'devicon-svelte-plain', category: 'Framework' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain', category: 'Runtime' },
  { name: 'Python', icon: 'devicon-python-plain', category: 'Language' },
  { name: 'Java', icon: 'devicon-java-plain', category: 'Language' },
  { name: 'C++', icon: 'devicon-cplusplus-plain', category: 'Language' },
  { name: 'C#', icon: 'devicon-csharp-plain', category: 'Language' },
  { name: 'PHP', icon: 'devicon-php-plain', category: 'Language' },
  { name: 'Ruby', icon: 'devicon-ruby-plain', category: 'Language' },
  { name: 'Go', icon: 'devicon-go-plain', category: 'Language' },
  { name: 'Rust', icon: 'devicon-rust-plain', category: 'Language' },
  { name: 'Swift', icon: 'devicon-swift-plain', category: 'Language' },
  { name: 'Kotlin', icon: 'devicon-kotlin-plain', category: 'Language' },
  { name: 'Dart', icon: 'devicon-dart-plain', category: 'Language' },
  { name: 'HTML5', icon: 'devicon-html5-plain', category: 'Markup' },
  { name: 'CSS3', icon: 'devicon-css3-plain', category: 'Styling' },
  { name: 'Sass', icon: 'devicon-sass-original', category: 'Styling' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain', category: 'Styling' },
  { name: 'Bootstrap', icon: 'devicon-bootstrap-plain', category: 'Styling' },
  { name: 'Express.js', icon: 'devicon-express-original', category: 'Backend' },
  { name: 'Django', icon: 'devicon-django-plain', category: 'Backend' },
  { name: 'Flask', icon: 'devicon-flask-original', category: 'Backend' },
  { name: 'Spring', icon: 'devicon-spring-plain', category: 'Backend' },
  { name: 'Laravel', icon: 'devicon-laravel-plain', category: 'Backend' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain', category: 'Database' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain', category: 'Database' },
  { name: 'MySQL', icon: 'devicon-mysql-plain', category: 'Database' },
  { name: 'Redis', icon: 'devicon-redis-plain', category: 'Database' },
  { name: 'SQLite', icon: 'devicon-sqlite-plain', category: 'Database' },
  { name: 'Firebase', icon: 'devicon-firebase-plain', category: 'Backend' },
  { name: 'AWS', icon: 'devicon-amazonwebservices-original', category: 'Cloud' },
  { name: 'Google Cloud', icon: 'devicon-googlecloud-plain', category: 'Cloud' },
  { name: 'Azure', icon: 'devicon-azure-plain', category: 'Cloud' },
  { name: 'Docker', icon: 'devicon-docker-plain', category: 'DevOps' },
  { name: 'Kubernetes', icon: 'devicon-kubernetes-plain', category: 'DevOps' },
  { name: 'Git', icon: 'devicon-git-plain', category: 'Tools' },
  { name: 'GitHub', icon: 'devicon-github-original', category: 'Tools' },
  { name: 'GitLab', icon: 'devicon-gitlab-plain', category: 'Tools' },
  { name: 'VS Code', icon: 'devicon-vscode-plain', category: 'Tools' },
  { name: 'Figma', icon: 'devicon-figma-plain', category: 'Design' },
  { name: 'Adobe XD', icon: 'devicon-xd-plain', category: 'Design' },
  { name: 'Photoshop', icon: 'devicon-photoshop-plain', category: 'Design' },
  { name: 'Linux', icon: 'devicon-linux-plain', category: 'OS' },
  { name: 'Ubuntu', icon: 'devicon-ubuntu-plain', category: 'OS' },
  { name: 'Windows', icon: 'devicon-windows8-original', category: 'OS' },
  { name: 'macOS', icon: 'devicon-apple-original', category: 'OS' },
  { name: 'Android', icon: 'devicon-android-plain', category: 'Mobile' },
  { name: 'iOS', icon: 'devicon-apple-original', category: 'Mobile' },
  { name: 'Flutter', icon: 'devicon-flutter-plain', category: 'Mobile' },
  { name: 'React Native', icon: 'devicon-react-original', category: 'Mobile' },
  { name: 'Unity', icon: 'devicon-unity-original', category: 'Game Dev' },
  { name: 'Unreal Engine', icon: 'devicon-unrealengine-original', category: 'Game Dev' },
  { name: 'Blender', icon: 'devicon-blender-original', category: '3D' },
  { name: 'TensorFlow', icon: 'devicon-tensorflow-original', category: 'ML/AI' },
  { name: 'PyTorch', icon: 'devicon-pytorch-original', category: 'ML/AI' },
  { name: 'OpenCV', icon: 'devicon-opencv-plain', category: 'ML/AI' },
  { name: 'Pandas', icon: 'devicon-pandas-original', category: 'Data Science' },
  { name: 'NumPy', icon: 'devicon-numpy-original', category: 'Data Science' },
  { name: 'Jupyter', icon: 'devicon-jupyter-plain', category: 'Data Science' },
  { name: 'R', icon: 'devicon-r-original', category: 'Data Science' },
  { name: 'GraphQL', icon: 'devicon-graphql-plain', category: 'API' },
  { name: 'REST API', icon: 'devicon-fastapi-plain', category: 'API' },
  { name: 'Postman', icon: 'devicon-postman-plain', category: 'API' },
  { name: 'Webpack', icon: 'devicon-webpack-plain', category: 'Build Tools' },
  { name: 'Vite', icon: 'devicon-vitejs-plain', category: 'Build Tools' },
  { name: 'Babel', icon: 'devicon-babel-plain', category: 'Build Tools' },
  { name: 'ESLint', icon: 'devicon-eslint-original', category: 'Tools' },
  { name: 'Prettier', icon: 'devicon-prettier-plain', category: 'Tools' },
  { name: 'Jest', icon: 'devicon-jest-plain', category: 'Testing' },
  { name: 'Cypress', icon: 'devicon-cypress-plain', category: 'Testing' },
  { name: 'Selenium', icon: 'devicon-selenium-original', category: 'Testing' }
]

const CATEGORIES = [...new Set(TECHNOLOGIES.map(tech => tech.category))]

export default function TechSearch({ open, onOpenChange, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredTechnologies = useMemo(() => {
    return TECHNOLOGIES.filter(tech => {
      const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || tech.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  const handleSelect = (tech) => {
    onSelect(tech)
    setSearchTerm('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Add Technology</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'All' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('All')}
            >
              All
            </Button>
            {CATEGORIES.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Technology Grid */}
          <ScrollArea className="h-96">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {filteredTechnologies.map(tech => (
                <Button
                  key={tech.name}
                  variant="outline"
                  className="flex items-center gap-2 h-12 justify-start"
                  onClick={() => handleSelect(tech)}
                >
                  <i className={`${tech.icon} text-xl`}></i>
                  <span className="text-sm">{tech.name}</span>
                </Button>
              ))}
            </div>
            
            {filteredTechnologies.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No technologies found matching your search.
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
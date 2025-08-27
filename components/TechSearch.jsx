'use client'

import { useState, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, X } from 'lucide-react'
import { Toggle } from '@/components/ui/toggle'

// Icon libraries with their display names
const ICON_LIBRARIES = {
  devicon: 'Devicon',
  simpleicons: 'Simple Icons',
  reacticons: 'React Icons'
}

// Enhanced technology list with new CDN format
const TECHNOLOGIES = [
  // Devicon technologies with new CDN format
  { name: 'JavaScript', icon: 'devicon-javascript-plain', category: 'Language', color: '#F7DF1E', bg: '#F7DF1E20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', icon: 'devicon-typescript-plain', category: 'Language', color: '#3178C6', bg: '#3178C620', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', icon: 'devicon-react-original', category: 'Framework', color: '#61DAFB', bg: '#61DAFB20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'devicon-nextjs-original', category: 'Framework', color: '#000000', bg: '#00000020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Vue.js', icon: 'devicon-vuejs-plain', category: 'Framework', color: '#4FC08D', bg: '#4FC08D20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Angular', icon: 'devicon-angularjs-plain', category: 'Framework', color: '#DD0031', bg: '#DD003120', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { name: 'Svelte', icon: 'devicon-svelte-plain', category: 'Framework', color: '#FF3E00', bg: '#FF3E0020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg' },
  { name: 'Node.js', icon: 'devicon-nodejs-plain', category: 'Runtime', color: '#339933', bg: '#33993320', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', icon: 'devicon-python-plain', category: 'Language', color: '#3776AB', bg: '#3776AB20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Java', icon: 'devicon-java-plain', category: 'Language', color: '#ED8B00', bg: '#ED8B0020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
  { name: 'C++', icon: 'devicon-cplusplus-plain', category: 'Language', color: '#00599C', bg: '#00599C20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'C#', icon: 'devicon-csharp-plain', category: 'Language', color: '#239120', bg: '#23912020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: 'PHP', icon: 'devicon-php-plain', category: 'Language', color: '#777BB4', bg: '#777BB420', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Ruby', icon: 'devicon-ruby-plain', category: 'Language', color: '#CC342D', bg: '#CC342D20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg' },
  { name: 'Go', icon: 'devicon-go-plain', category: 'Language', color: '#00ADD8', bg: '#00ADD820', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
  { name: 'Rust', icon: 'devicon-rust-plain', category: 'Language', color: '#000000', bg: '#00000020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
  { name: 'Swift', icon: 'devicon-swift-plain', category: 'Language', color: '#FA7343', bg: '#FA734320', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' },
  { name: 'Kotlin', icon: 'devicon-kotlin-plain', category: 'Language', color: '#0095D5', bg: '#0095D520', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg' },
  { name: 'Dart', icon: 'devicon-dart-plain', category: 'Language', color: '#0175C2', bg: '#0175C220', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
  { name: 'HTML5', icon: 'devicon-html5-plain', category: 'Markup', color: '#E34F26', bg: '#E34F2620', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', icon: 'devicon-css3-plain', category: 'Styling', color: '#1572B6', bg: '#1572B620', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'Sass', icon: 'devicon-sass-original', category: 'Styling', color: '#CC6699', bg: '#CC669920', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain', category: 'Styling', color: '#38B2AC', bg: '#38B2AC20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Bootstrap', icon: 'devicon-bootstrap-plain', category: 'Styling', color: '#7952B3', bg: '#7952B320', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'Express.js', icon: 'devicon-express-original', category: 'Backend', color: '#000000', bg: '#00000020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'Django', icon: 'devicon-django-plain', category: 'Backend', color: '#092E20', bg: '#092E2020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-original.svg' },
  { name: 'Flask', icon: 'devicon-flask-original', category: 'Backend', color: '#000000', bg: '#00000020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' },
  { name: 'Spring', icon: 'devicon-spring-plain', category: 'Backend', color: '#6DB33F', bg: '#6DB33F20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
  { name: 'Laravel', icon: 'devicon-laravel-plain', category: 'Backend', color: '#FF2D20', bg: '#FF2D2020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
  { name: 'MongoDB', icon: 'devicon-mongodb-plain', category: 'Database', color: '#47A248', bg: '#47A24820', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', icon: 'devicon-postgresql-plain', category: 'Database', color: '#4169E1', bg: '#4169E120', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL', icon: 'devicon-mysql-plain', category: 'Database', color: '#4479A1', bg: '#4479A120', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Redis', icon: 'devicon-redis-plain', category: 'Database', color: '#DC382D', bg: '#DC382D20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
  { name: 'SQLite', icon: 'devicon-sqlite-plain', category: 'Database', color: '#003B57', bg: '#003B5720', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg' },
  { name: 'Firebase', icon: 'devicon-firebase-plain', category: 'Backend', color: '#FFCA28', bg: '#FFCA2820', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg' },
  { name: 'AWS', icon: 'devicon-amazonwebservices-original', category: 'Cloud', color: '#FF9900', bg: '#FF990020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg' },
  { name: 'Google Cloud', icon: 'devicon-googlecloud-plain', category: 'Cloud', color: '#4285F4', bg: '#4285F420', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
  { name: 'Azure', icon: 'devicon-azure-plain', category: 'Cloud', color: '#0078D4', bg: '#0078D420', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'Docker', icon: 'devicon-docker-plain', category: 'DevOps', color: '#2496ED', bg: '#2496ED20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Podman', icon: 'devicon-podman-plain', category: 'DevOps', color: '#892CA0', bg: '#892CA020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/podman/podman-original.svg' },
  { name: 'Kubernetes', icon: 'devicon-kubernetes-plain', category: 'DevOps', color: '#326CE5', bg: '#326CE520', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg' },
  { name: 'Jenkins', icon: 'devicon-jenkins-plain', category: 'DevOps', color: '#D33833', bg: '#D3383320', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
  { name: 'Kafka', icon: 'devicon-kafka-plain', category: 'DevOps', color: '#231F20', bg: '#231F2020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg' },
  { name: 'Prometheus', icon: 'devicon-prometheus-plain', category: 'DevOps', color: '#E6522C', bg: '#E6522C20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg' },
  { name: 'Grafana', icon: 'devicon-grafana-plain', category: 'DevOps', color: '#F46800', bg: '#F4680020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg' },
  { name: 'Elasticsearch', icon: 'devicon-elasticsearch-plain', category: 'DevOps', color: '#005571', bg: '#00557120', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg' },
  { name: 'Ansible', icon: 'devicon-ansible-plain', category: 'DevOps', color: '#EE0000', bg: '#EE000020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg' },
  { name: 'Terraform', icon: 'devicon-terraform-plain', category: 'DevOps', color: '#623CE4', bg: '#623CE420', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg' },
  { name: 'Git', icon: 'devicon-git-plain', category: 'Tools', color: '#F05032', bg: '#F0503220', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', icon: 'devicon-github-original', category: 'Tools', color: '#181717', bg: '#18171720', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'GitLab', icon: 'devicon-gitlab-plain', category: 'Tools', color: '#FC6D26', bg: '#FC6D2620', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
  { name: 'VS Code', icon: 'devicon-vscode-plain', category: 'Tools', color: '#007ACC', bg: '#007ACC20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'Figma', icon: 'devicon-figma-plain', category: 'Design', color: '#F24E1E', bg: '#F24E1E20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Linux', icon: 'devicon-linux-plain', category: 'OS', color: '#FCC624', bg: '#FCC62420', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Ubuntu', icon: 'devicon-ubuntu-plain', category: 'OS', color: '#E95420', bg: '#E9542020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg' },
  { name: 'Android', icon: 'devicon-android-plain', category: 'Mobile', color: '#3DDC84', bg: '#3DDC8420', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
  { name: 'Flutter', icon: 'devicon-flutter-plain', category: 'Mobile', color: '#02569B', bg: '#02569B20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
  { name: 'React Native', icon: 'devicon-react-original', category: 'Mobile', color: '#61DAFB', bg: '#61DAFB20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Unity', icon: 'devicon-unity-original', category: 'Game Dev', color: '#000000', bg: '#00000020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg' },
  { name: 'TensorFlow', icon: 'devicon-tensorflow-original', category: 'ML/AI', color: '#FF6F00', bg: '#FF6F0020', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'PyTorch', icon: 'devicon-pytorch-original', category: 'ML/AI', color: '#EE4C2C', bg: '#EE4C2C20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'GraphQL', icon: 'devicon-graphql-plain', category: 'API', color: '#E10098', bg: '#E1009820', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-original.svg' },
  { name: 'Webpack', icon: 'devicon-webpack-plain', category: 'Build Tools', color: '#8DD6F9', bg: '#8DD6F920', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg' },
  { name: 'Vite', icon: 'devicon-vitejs-plain', category: 'Build Tools', color: '#646CFF', bg: '#646CFF20', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  { name: 'Jest', icon: 'devicon-jest-plain', category: 'Testing', color: '#C21325', bg: '#C2132520', library: 'devicon', imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-original.svg' },
  
  // Simple Icons technologies
  { name: 'Vercel', icon: 'si-vercel', category: 'Cloud', color: '#000000', bg: '#00000020', library: 'simpleicons' },
  { name: 'Netlify', icon: 'si-netlify', category: 'Cloud', color: '#00C7B7', bg: '#00C7B720', library: 'simpleicons' },
  { name: 'Heroku', icon: 'si-heroku', category: 'Cloud', color: '#430098', bg: '#43009820', library: 'simpleicons' },
  { name: 'Cloudflare', icon: 'si-cloudflare', category: 'Cloud', color: '#F38020', bg: '#F3802020', library: 'simpleicons' },
  { name: 'Supabase', icon: 'si-supabase', category: 'Backend', color: '#3ECF8E', bg: '#3ECF8E20', library: 'simpleicons' },
  { name: 'Prisma', icon: 'si-prisma', category: 'Database', color: '#2D3748', bg: '#2D374820', library: 'simpleicons' },
  { name: 'Astro', icon: 'si-astro', category: 'Framework', color: '#FF5D01', bg: '#FF5D0120', library: 'simpleicons' },
  { name: 'Remix', icon: 'si-remix', category: 'Framework', color: '#000000', bg: '#00000020', library: 'simpleicons' },
  { name: 'Solid.js', icon: 'si-solid', category: 'Framework', color: '#2C4F7C', bg: '#2C4F7C20', library: 'simpleicons' },
  { name: 'Deno', icon: 'si-deno', category: 'Runtime', color: '#000000', bg: '#00000020', library: 'simpleicons' },
  
  // React Icons technologies
  { name: 'Bun', icon: 'ri-bun', category: 'Runtime', color: '#FBF0DF', bg: '#FBF0DF20', library: 'reacticons' },
  { name: 'Tauri', icon: 'ri-tauri', category: 'Framework', color: '#FFC131', bg: '#FFC13120', library: 'reacticons' },
  { name: 'Electron', icon: 'ri-electron', category: 'Framework', color: '#47848F', bg: '#47848F20', library: 'reacticons' }
]

const CATEGORIES = [...new Set(TECHNOLOGIES.map(tech => tech.category))]

export default function TechSearch({ open, onOpenChange, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTechs, setSelectedTechs] = useState([])
  const [activeLibrary, setActiveLibrary] = useState('devicon')

  const filteredTechnologies = useMemo(() => {
    return TECHNOLOGIES.filter(tech => {
      const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || tech.category === selectedCategory
      const matchesLibrary = tech.library === activeLibrary
      return matchesSearch && matchesCategory && matchesLibrary
    })
  }, [searchTerm, selectedCategory, activeLibrary])

  const handleSelect = (tech) => {
    // Toggle selection
    if (selectedTechs.some(t => t.name === tech.name)) {
      setSelectedTechs(selectedTechs.filter(t => t.name !== tech.name))
    } else {
      setSelectedTechs([...selectedTechs, tech])
    }
  }
  
  const handleDone = () => {
    // Send all selected technologies to parent component at once
    if (selectedTechs.length > 0) {
      // Call onSelect with all selected technologies as an array
      onSelect(selectedTechs)
      setSelectedTechs([])
      setSearchTerm('')
      onOpenChange(false)
    }
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

          {/* Icon Library Toggle */}
          <div className="flex items-center space-x-2">
            <div className="text-sm font-medium whitespace-nowrap">Icon Library:</div>
            <div className="flex gap-1">
              {Object.entries(ICON_LIBRARIES).map(([key, label]) => (
                <Toggle
                  key={key}
                  pressed={activeLibrary === key}
                  onPressedChange={() => setActiveLibrary(key)}
                  variant="outline"
                  size="sm"
                  className={`px-2 py-0.5 text-xs ${activeLibrary === key ? 'bg-primary/10 border-primary/30' : ''}`}
                >
                  {label}
                </Toggle>
              ))}
            </div>
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

          {/* Selected Technologies */}
          {selectedTechs.length > 0 && (
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Selected ({selectedTechs.length}):</div>
              <div className="flex flex-wrap gap-2">
                {selectedTechs.map(tech => (
                  <Badge 
                    key={tech.name} 
                    variant="outline"
                    className="flex items-center gap-1 px-2 py-1"
                    style={{ 
                      backgroundColor: tech.bg,
                      borderColor: tech.color + '30'
                    }}
                  >
                    <img 
                      src={tech.imageUrl || `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.name.toLowerCase()}/${tech.name.toLowerCase()}-original.svg`}
                      alt={tech.name}
                      width="16"
                      height="16"
                      className="object-contain"
                      onError={(e) => {
                        // Fallback to icon class if image fails
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'inline-block';
                      }}
                    />
                    <i 
                      className={`${tech.icon} text-sm`}
                      style={{ color: tech.color, display: 'none' }}
                    ></i>
                    <span>{tech.name}</span>
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTechs(selectedTechs.filter(t => t.name !== tech.name));
                      }}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Technology Grid */}
          <ScrollArea className="h-96 custom-scrollbar pr-2">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2">
              {filteredTechnologies.map(tech => {
                const isSelected = selectedTechs.some(t => t.name === tech.name);
                return (
                  <Button
                    key={tech.name}
                    variant={isSelected ? "default" : "outline"}
                    className={`flex items-center gap-2 h-12 justify-start hover:shadow-md transition-all duration-200 ${isSelected ? 'border-2' : ''}`}
                    style={{ 
                      backgroundColor: isSelected ? tech.color + '30' : tech.bg,
                      borderColor: tech.color + (isSelected ? '60' : '30')
                    }}
                    onClick={() => handleSelect(tech)}
                  >
                    <img 
                      src={tech.imageUrl || `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.name.toLowerCase()}/${tech.name.toLowerCase()}-original.svg`}
                      alt={tech.name}
                      width="24"
                      height="24"
                      className="object-contain"
                      onError={(e) => {
                        // Fallback to icon class if image fails
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'inline-block';
                      }}
                    />
                    <i 
                      className={`${tech.icon} text-xl`}
                      style={{ color: tech.color, display: 'none' }}
                    ></i>
                    <span className="text-sm font-medium">{tech.name}</span>
                  </Button>
                );
              })}
            </div>
            
            {filteredTechnologies.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No technologies found matching your search.
              </div>
            )}
          </ScrollArea>
          
          {/* Done Button */}
          <div className="flex justify-end mt-4">
            <Button 
              onClick={handleDone}
              disabled={selectedTechs.length === 0}
              className="px-6"
            >
              Add Selected ({selectedTechs.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
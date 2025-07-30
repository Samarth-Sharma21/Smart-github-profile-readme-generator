'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Search, Plus, X, Coffee, Heart, Edit2 } from 'lucide-react'
import TechSearch from '@/components/TechSearch'
import SocialSearch from '@/components/SocialSearch'

export default function CreateReadmeForm({ data, onChange }) {
  const [techSearchOpen, setTechSearchOpen] = useState(false)
  const [socialSearchOpen, setSocialSearchOpen] = useState(false)
  const [editingHeading, setEditingHeading] = useState(null)

  const handleProfileChange = (field, value) => {
    onChange({
      profile: {
        ...data.profile,
        [field]: value
      }
    })
  }

  const handleHeadingChange = (headingKey, value) => {
    onChange({
      sectionHeadings: {
        ...data.sectionHeadings,
        [headingKey]: value
      }
    })
  }

  const handleGithubStatsChange = (field, value) => {
    onChange({
      githubStats: {
        ...data.githubStats,
        [field]: value
      }
    })
  }

  const addTechnology = (tech) => {
    if (!data.technologies.find(t => t.name === tech.name)) {
      onChange({
        technologies: [...data.technologies, tech]
      })
    }
  }

  const removeTechnology = (techName) => {
    onChange({
      technologies: data.technologies.filter(t => t.name !== techName)
    })
  }

  const addSocialLink = (social) => {
    if (!data.socialLinks.find(s => s.platform === social.platform)) {
      onChange({
        socialLinks: [...data.socialLinks, social]
      })
    }
  }

  const removeSocialLink = (platform) => {
    onChange({
      socialLinks: data.socialLinks.filter(s => s.platform !== platform)
    })
  }

  const updateSocialLink = (platform, field, value) => {
    onChange({
      socialLinks: data.socialLinks.map(s => 
        s.platform === platform ? { ...s, [field]: value } : s
      )
    })
  }

  const addProject = () => {
    onChange({
      projects: [...data.projects, { title: '', description: '', link: '', repo: '' }]
    })
  }

  const updateProject = (index, field, value) => {
    const newProjects = [...data.projects]
    newProjects[index][field] = value
    onChange({ projects: newProjects })
  }

  const removeProject = (index) => {
    onChange({
      projects: data.projects.filter((_, i) => i !== index)
    })
  }

  const handleSupportChange = (field, value) => {
    onChange({
      support: {
        ...data.support,
        [field]: value
      }
    })
  }

  const handleContactChange = (field, value) => {
    onChange({
      contact: {
        ...data.contact,
        [field]: value
      }
    })
  }

  const EditableHeading = ({ headingKey, defaultText, className = "" }) => {
    const isEditing = editingHeading === headingKey
    const currentText = data.sectionHeadings[headingKey] || defaultText

    if (isEditing) {
      return (
        <Input
          value={currentText}
          onChange={(e) => handleHeadingChange(headingKey, e.target.value)}
          onBlur={() => setEditingHeading(null)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEditingHeading(null)
            }
          }}
          className={`font-semibold text-lg bg-transparent border-dashed ${className}`}
          autoFocus
        />
      )
    }

    return (
      <div 
        className={`flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1 rounded ${className}`}
        onClick={() => setEditingHeading(headingKey)}
      >
        <span className="font-semibold text-lg">{currentText}</span>
        <Edit2 className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Profile Introduction */}
      <Card className="group transform hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            👋 Profile Introduction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name/Title</Label>
              <Input
                id="name"
                placeholder="Hi 👋, I'm Samarth"
                value={data.profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                placeholder="A passionate developer from India"
                value={data.profile.subtitle}
                onChange={(e) => handleProfileChange('subtitle', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="welcome">Custom Welcome Message</Label>
            <Textarea
              id="welcome"
              placeholder="I'm currently working on amazing projects..."
              rows={3}
              value={data.profile.welcomeMessage}
              onChange={(e) => handleProfileChange('welcomeMessage', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Technologies */}
      <Card className="group transform hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>
            <EditableHeading headingKey="technologies" defaultText="🛠️ Technologies & Skills" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setTechSearchOpen(true)}
              className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Technology
            </Button>
          </div>
          
          {data.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.technologies.map((tech) => (
                <Badge 
                  key={tech.name} 
                  variant="secondary" 
                  className="flex items-center gap-2 px-3 py-1.5 hover:shadow-md transition-all duration-200"
                  style={{ 
                    backgroundColor: tech.bg || '#f1f5f9',
                    borderColor: tech.color + '40' || '#cbd5e1'
                  }}
                >
                  <i 
                    className={`${tech.icon} text-lg`}
                    style={{ color: tech.color || '#64748b' }}
                  ></i>
                  <span className="font-medium">{tech.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-destructive hover:text-destructive-foreground ml-1"
                    onClick={() => removeTechnology(tech.name)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          <TechSearch 
            open={techSearchOpen}
            onOpenChange={setTechSearchOpen}
            onSelect={addTechnology}
          />
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="group transform hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>
            <EditableHeading headingKey="socialLinks" defaultText="🌐 Social Links" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSocialSearchOpen(true)}
              className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Social Link
            </Button>
          </div>

          {data.socialLinks.length > 0 && (
            <div className="space-y-3">
              {data.socialLinks.map((social) => (
                <div key={social.platform} className="flex items-center gap-3 p-3 border rounded-lg hover:shadow-md transition-shadow duration-200">
                  <i className={social.icon} style={{ color: social.color }}></i>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Username/Handle"
                      value={social.username || ''}
                      onChange={(e) => updateSocialLink(social.platform, 'username', e.target.value)}
                    />
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={social.showIcon}
                        onCheckedChange={(checked) => updateSocialLink(social.platform, 'showIcon', checked)}
                      />
                      <span className="text-sm">Show icon only</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSocialLink(social.platform)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <SocialSearch 
            open={socialSearchOpen}
            onOpenChange={setSocialSearchOpen}
            onSelect={addSocialLink}
          />
        </CardContent>
      </Card>

      {/* GitHub Stats */}
      <Card className="group transform hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>
            <EditableHeading headingKey="githubStats" defaultText="📊 GitHub Stats" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github-username">GitHub Username</Label>
            <Input
              id="github-username"
              placeholder="your-github-username"
              value={data.githubStats.username}
              onChange={(e) => handleGithubStatsChange('username', e.target.value)}
            />
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="profile-views"
                checked={data.githubStats.showProfileViews}
                onCheckedChange={(checked) => handleGithubStatsChange('showProfileViews', checked)}
              />
              <Label htmlFor="profile-views">Show Profile Views Badge</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="github-stats"
                checked={data.githubStats.showGithubStats}
                onCheckedChange={(checked) => handleGithubStatsChange('showGithubStats', checked)}
              />
              <Label htmlFor="github-stats">Show GitHub Stats Card</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="streak-stats"
                checked={data.githubStats.showStreakStats}
                onCheckedChange={(checked) => handleGithubStatsChange('showStreakStats', checked)}
              />
              <Label htmlFor="streak-stats">Show Streak Stats</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="top-languages"
                checked={data.githubStats.showTopLanguages}
                onCheckedChange={(checked) => handleGithubStatsChange('showTopLanguages', checked)}
              />
              <Label htmlFor="top-languages">Show Top Languages</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="activity-graph"
                checked={data.githubStats.showActivityGraph}
                onCheckedChange={(checked) => handleGithubStatsChange('showActivityGraph', checked)}
              />
              <Label htmlFor="activity-graph">Show Activity Graph</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects */}
      <Card className="group transform hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>
            <EditableHeading headingKey="projects" defaultText="🚀 Featured Projects" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={addProject}
            className="flex items-center gap-2 hover:bg-purple-50 hover:border-purple-300 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Button>

          {data.projects.length > 0 && (
            <div className="space-y-4">
              {data.projects.map((project, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Project {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Project Title"
                      value={project.title}
                      onChange={(e) => updateProject(index, 'title', e.target.value)}
                    />
                    <Input
                      placeholder="Project Link"
                      value={project.link}
                      onChange={(e) => updateProject(index, 'link', e.target.value)}
                    />
                  </div>
                  
                  <Textarea
                    placeholder="Project Description"
                    rows={2}
                    value={project.description}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                  />
                  
                  <Input
                    placeholder="Repository Link (optional)"
                    value={project.repo}
                    onChange={(e) => updateProject(index, 'repo', e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Support Me */}
      <Card className="group transform hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>
            <EditableHeading headingKey="support" defaultText="☕ Support Me" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="buymeacoffee">Buy Me a Coffee Username</Label>
              <Input
                id="buymeacoffee"
                placeholder="yourusername"
                value={data.support.buyMeCoffee}
                onChange={(e) => handleSupportChange('buyMeCoffee', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="kofi">Ko-fi Username</Label>
              <Input
                id="kofi"
                placeholder="yourusername"
                value={data.support.kofi}
                onChange={(e) => handleSupportChange('kofi', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="group transform hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>
            <EditableHeading headingKey="contact" defaultText="📫 Contact Me" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="your.email@example.com"
              type="email"
              value={data.contact.email}
              onChange={(e) => handleContactChange('email', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
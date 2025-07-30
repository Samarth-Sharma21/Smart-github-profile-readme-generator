'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Copy, Download, Eye } from 'lucide-react'
import { toast } from 'sonner'

export default function PreviewReadme({ data }) {
  const [copied, setCopied] = useState(false)

  const generateMarkdown = useMemo(() => {
    let markdown = ''

    // Profile Introduction
    if (data.profile.name) {
      markdown += `# ${data.profile.name}\n\n`
    }
    
    if (data.profile.subtitle) {
      markdown += `### ${data.profile.subtitle}\n\n`
    }

    if (data.profile.welcomeMessage) {
      markdown += `${data.profile.welcomeMessage}\n\n`
    }

    // Profile Views Badge
    if (data.githubStats.showProfileViews && data.githubStats.username) {
      markdown += `<p align="left"> <img src="https://komarev.com/ghpvc/?username=${data.githubStats.username}&label=Profile%20views&color=0e75b6&style=flat" alt="${data.githubStats.username}" /> </p>\n\n`
    }

    // Social Links
    if (data.socialLinks.length > 0) {
      markdown += `## 🌐 Connect with me:\n`
      markdown += `<p align="left">\n`
      data.socialLinks.forEach(social => {
        if (social.username) {
          const url = social.urlTemplate.replace('{username}', social.username)
          if (social.showIcon) {
            markdown += `<a href="${url}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/${social.platform}.svg" alt="${social.username}" height="30" width="40" /></a>\n`
          } else {
            markdown += `<a href="${url}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/${social.platform}.svg" alt="${social.username}" height="30" width="40" /></a>\n`
          }
        }
      })
      markdown += `</p>\n\n`
    }

    // Technologies
    if (data.technologies.length > 0) {
      markdown += `## 🛠️ Languages and Tools:\n`
      markdown += `<p align="left"> `
      data.technologies.forEach(tech => {
        markdown += `<a href="#" target="_blank" rel="noreferrer"> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon.replace('devicon-', '').replace('-plain', '')}.svg" alt="${tech.name}" width="40" height="40"/> </a> `
      })
      markdown += `</p>\n\n`
    }

    // GitHub Stats
    if (data.githubStats.username) {
      if (data.githubStats.showGithubStats) {
        markdown += `<p><img align="left" src="https://github-readme-stats.vercel.app/api?username=${data.githubStats.username}&show_icons=true&locale=en" alt="${data.githubStats.username}" /></p>\n\n`
      }

      if (data.githubStats.showStreakStats) {
        markdown += `<p><img align="center" src="https://github-readme-streak-stats.herokuapp.com/?user=${data.githubStats.username}&" alt="${data.githubStats.username}" /></p>\n\n`
      }

      if (data.githubStats.showTopLanguages) {
        markdown += `<p><img align="left" src="https://github-readme-stats.vercel.app/api/top-langs?username=${data.githubStats.username}&show_icons=true&locale=en&layout=compact" alt="${data.githubStats.username}" /></p>\n\n`
      }

      if (data.githubStats.showActivityGraph) {
        markdown += `<p><img src="https://github-readme-activity-graph.vercel.app/graph?username=${data.githubStats.username}&theme=github-compact" alt="${data.githubStats.username}" /></p>\n\n`
      }
    }

    // Projects
    if (data.projects.length > 0) {
      markdown += `## 🚀 Featured Projects:\n\n`
      data.projects.forEach(project => {
        if (project.title) {
          markdown += `### [${project.title}](${project.link || '#'})\n`
          if (project.description) {
            markdown += `${project.description}\n`
          }
          if (project.repo) {
            markdown += `**Repository:** [${project.repo}](${project.repo})\n`
          }
          markdown += `\n`
        }
      })
    }

    // Support
    if (data.support.buyMeCoffee || data.support.kofi) {
      markdown += `## ☕ Support Me:\n\n`
      if (data.support.buyMeCoffee) {
        markdown += `<p><a href="https://www.buymeacoffee.com/${data.support.buyMeCoffee}"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="${data.support.buyMeCoffee}" /></a></p><br><br>\n\n`
      }
      if (data.support.kofi) {
        markdown += `<p><a href="https://ko-fi.com/${data.support.kofi}"> <img align="left" src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height="50" width="210" alt="${data.support.kofi}" /></a></p><br><br>\n\n`
      }
    }

    // Contact
    if (data.contact.email) {
      markdown += `## 📫 How to reach me:\n\n`
      markdown += `**Email:** ${data.contact.email}\n\n`
    }

    return markdown
  }, [data])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateMarkdown)
      setCopied(true)
      toast.success('README copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const downloadMarkdown = () => {
    const blob = new Blob([generateMarkdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'README.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('README.md downloaded!')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-muted-foreground" />
          <span className="text-lg font-semibold">README Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={downloadMarkdown}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>

      {/* Preview Card */}
      <Card>
        <CardHeader>
          <CardTitle>README.md Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <div 
              className="markdown-body bg-white p-6 rounded-lg border"
              dangerouslySetInnerHTML={{
                __html: generateMarkdown
                  .replace(/\n/g, '<br/>')
                  .replace(/#{1,6}\s(.+)/g, (match, title) => {
                    const level = match.indexOf(' ') - 1
                    return `<h${level} class="text-${4-level}xl font-bold mb-4">${title}</h${level}>`
                  })
                  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                  .replace(/\*(.+?)\*/g, '<em>$1</em>')
                  .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank">$1</a>')
                  .replace(/<img([^>]*?)>/g, '<img$1 class="inline-block" />')
                  .replace(/<p><img align="left"([^>]*?)><\/p>/g, '<div class="flex justify-start mb-4"><img$1></div>')
                  .replace(/<p><img align="center"([^>]*?)><\/p>/g, '<div class="flex justify-center mb-4"><img$1></div>')
                  .replace(/<p><img([^>]*?)><\/p>/g, '<div class="flex justify-center mb-4"><img$1></div>')
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Raw Markdown */}
      <Card>
        <CardHeader>
          <CardTitle>Raw Markdown</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
            {generateMarkdown}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Copy, Download, Eye } from 'lucide-react'
import { toast } from 'sonner'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
          markdown += `<a href="${url}" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/${social.platform.toLowerCase()}.svg" alt="${social.username}" height="30" width="40" /></a>\n`
        }
      })
      markdown += `</p>\n\n`
    }

    // Technologies
    if (data.technologies.length > 0) {
      markdown += `## 🛠️ Languages and Tools:\n`
      markdown += `<p align="left"> `
      data.technologies.forEach(tech => {
        const iconName = tech.icon.replace('devicon-', '').replace('-plain', '').replace('-original', '')
        markdown += `<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/${iconName}/${tech.icon.replace('devicon-', '')}.svg" alt="${tech.name}" width="40" height="40"/> </a> `
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
            <div className="markdown-body bg-white p-6 rounded-lg border min-h-[400px]">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({children}) => <h1 className="text-3xl font-bold mb-4 border-b pb-2">{children}</h1>,
                  h2: ({children}) => <h2 className="text-2xl font-semibold mb-3 mt-6 border-b pb-1">{children}</h2>,
                  h3: ({children}) => <h3 className="text-xl font-semibold mb-2 mt-4">{children}</h3>,
                  p: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
                  a: ({href, children}) => <a href={href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                  img: ({src, alt, ...props}) => <img src={src} alt={alt} className="inline-block max-w-full h-auto" {...props} />,
                  ul: ({children}) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
                  li: ({children}) => <li className="mb-1">{children}</li>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4">{children}</blockquote>,
                  code: ({children, className}) => {
                    const isInline = !className;
                    return isInline ? 
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code> :
                      <code className={className}>{children}</code>
                  },
                  pre: ({children}) => <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
                }}
              >
                {generateMarkdown}
              </ReactMarkdown>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Raw Markdown */}
      <Card>
        <CardHeader>
          <CardTitle>Raw Markdown</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap max-h-96">
            {generateMarkdown}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
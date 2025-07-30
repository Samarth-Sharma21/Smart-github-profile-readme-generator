'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Copy, Download, Eye, Code2, X } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'

export default function PreviewReadme({ data }) {
  const [copied, setCopied] = useState(false)
  const [showRawCode, setShowRawCode] = useState(false)

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
      const socialHeading = data.sectionHeadings?.socialLinks || '🌐 Connect with me:'
      markdown += `## ${socialHeading}\n`
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
      const techHeading = data.sectionHeadings?.technologies || '🛠️ Languages and Tools:'
      markdown += `## ${techHeading}\n`
      markdown += `<p align="left"> `
      data.technologies.forEach(tech => {
        const iconName = tech.icon.replace('devicon-', '').replace('-plain', '').replace('-original', '')
        markdown += `<a href="#" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/${iconName}/${tech.icon.replace('devicon-', '')}.svg" alt="${tech.name}" width="40" height="40"/> </a> `
      })
      markdown += `</p>\n\n`
    }

    // GitHub Stats
    if (data.githubStats.username) {
      const statsHeading = data.sectionHeadings?.githubStats || '📊 GitHub Stats'
      let hasStats = false
      
      if (data.githubStats.showGithubStats || data.githubStats.showStreakStats || data.githubStats.showTopLanguages || data.githubStats.showActivityGraph) {
        markdown += `## ${statsHeading}\n\n`
        hasStats = true
      }

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
      const projectsHeading = data.sectionHeadings?.projects || '🚀 Featured Projects:'
      markdown += `## ${projectsHeading}\n\n`
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
      const supportHeading = data.sectionHeadings?.support || '☕ Support Me:'
      markdown += `## ${supportHeading}\n\n`
      if (data.support.buyMeCoffee) {
        markdown += `<p><a href="https://www.buymeacoffee.com/${data.support.buyMeCoffee}"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="${data.support.buyMeCoffee}" /></a></p><br><br>\n\n`
      }
      if (data.support.kofi) {
        markdown += `<p><a href="https://ko-fi.com/${data.support.kofi}"> <img align="left" src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height="50" width="210" alt="${data.support.kofi}" /></a></p><br><br>\n\n`
      }
    }

    // Contact
    if (data.contact.email) {
      const contactHeading = data.sectionHeadings?.contact || '📫 How to reach me:'
      markdown += `## ${contactHeading}\n\n`
      markdown += `**Email:** ${data.contact.email}\n\n`
    }

    return markdown
  }, [data])

  const generateHTML = useMemo(() => {
    let html = ''

    // Profile Introduction
    if (data.profile.name) {
      html += `<h1 class="text-3xl font-bold mb-4 border-b pb-2">${data.profile.name}</h1>\n`
    }
    
    if (data.profile.subtitle) {
      html += `<h3 class="text-xl font-semibold mb-4 text-gray-600">${data.profile.subtitle}</h3>\n`
    }

    if (data.profile.welcomeMessage) {
      html += `<p class="mb-6 text-gray-700 leading-relaxed">${data.profile.welcomeMessage}</p>\n`
    }

    // Profile Views Badge
    if (data.githubStats.showProfileViews && data.githubStats.username) {
      html += `<p class="mb-6"><img src="https://komarev.com/ghpvc/?username=${data.githubStats.username}&label=Profile%20views&color=0e75b6&style=flat" alt="${data.githubStats.username}" /></p>\n`
    }

    // Social Links
    if (data.socialLinks.length > 0) {
      const socialHeading = data.sectionHeadings?.socialLinks || '🌐 Connect with me:'
      html += `<h2 class="text-2xl font-semibold mb-3 mt-6 border-b pb-1">${socialHeading}</h2>\n`
      html += `<div class="flex flex-wrap gap-2 mb-6">\n`
      data.socialLinks.forEach(social => {
        if (social.username) {
          const url = social.urlTemplate.replace('{username}', social.username)
          html += `<a href="${url}" target="_blank" class="hover:scale-110 transition-transform"><img src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/${social.platform.toLowerCase()}.svg" alt="${social.username}" height="30" width="40" /></a>\n`
        }
      })
      html += `</div>\n`
    }

    // Technologies
    if (data.technologies.length > 0) {
      const techHeading = data.sectionHeadings?.technologies || '🛠️ Languages and Tools:'
      html += `<h2 class="text-2xl font-semibold mb-3 mt-6 border-b pb-1">${techHeading}</h2>\n`
      html += `<div class="flex flex-wrap gap-3 mb-6">\n`
      data.technologies.forEach(tech => {
        const iconName = tech.icon.replace('devicon-', '').replace('-plain', '').replace('-original', '')
        html += `<div class="flex items-center gap-2 px-3 py-2 rounded-lg border" style="background-color: ${tech.bg || '#f1f5f9'}; border-color: ${tech.color}40">
          <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/${iconName}/${tech.icon.replace('devicon-', '')}.svg" alt="${tech.name}" width="24" height="24" />
          <span class="text-sm font-medium">${tech.name}</span>
        </div>\n`
      })
      html += `</div>\n`
    }

    // GitHub Stats
    if (data.githubStats.username) {
      const statsHeading = data.sectionHeadings?.githubStats || '📊 GitHub Stats'
      let hasStats = false
      
      if (data.githubStats.showGithubStats || data.githubStats.showStreakStats || data.githubStats.showTopLanguages || data.githubStats.showActivityGraph) {
        html += `<h2 class="text-2xl font-semibold mb-4 mt-6 border-b pb-1">${statsHeading}</h2>\n`
        html += `<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">\n`
        hasStats = true
      }

      if (data.githubStats.showGithubStats) {
        html += `<div class="flex justify-center"><img src="https://github-readme-stats.vercel.app/api?username=${data.githubStats.username}&show_icons=true&locale=en" alt="${data.githubStats.username}" /></div>\n`
      }

      if (data.githubStats.showStreakStats) {
        html += `<div class="flex justify-center"><img src="https://github-readme-streak-stats.herokuapp.com/?user=${data.githubStats.username}&" alt="${data.githubStats.username}" /></div>\n`
      }

      if (data.githubStats.showTopLanguages) {
        html += `<div class="flex justify-center"><img src="https://github-readme-stats.vercel.app/api/top-langs?username=${data.githubStats.username}&show_icons=true&locale=en&layout=compact" alt="${data.githubStats.username}" /></div>\n`
      }

      if (hasStats) {
        html += `</div>\n`
      }

      if (data.githubStats.showActivityGraph) {
        html += `<div class="flex justify-center mb-6"><img src="https://github-readme-activity-graph.vercel.app/graph?username=${data.githubStats.username}&theme=github-compact" alt="${data.githubStats.username}" class="max-w-full" /></div>\n`
      }
    }

    // Projects
    if (data.projects.length > 0) {
      const projectsHeading = data.sectionHeadings?.projects || '🚀 Featured Projects:'
      html += `<h2 class="text-2xl font-semibold mb-4 mt-6 border-b pb-1">${projectsHeading}</h2>\n`
      data.projects.forEach(project => {
        if (project.title) {
          html += `<div class="mb-4 p-4 border rounded-lg">\n`
          html += `<h3 class="text-lg font-semibold mb-2"><a href="${project.link || '#'}" class="text-blue-600 hover:underline" target="_blank">${project.title}</a></h3>\n`
          if (project.description) {
            html += `<p class="text-gray-700 mb-2">${project.description}</p>\n`
          }
          if (project.repo) {
            html += `<p class="text-sm"><strong>Repository:</strong> <a href="${project.repo}" class="text-blue-600 hover:underline" target="_blank">${project.repo}</a></p>\n`
          }
          html += `</div>\n`
        }
      })
    }

    // Support
    if (data.support.buyMeCoffee || data.support.kofi) {
      const supportHeading = data.sectionHeadings?.support || '☕ Support Me:'
      html += `<h2 class="text-2xl font-semibold mb-4 mt-6 border-b pb-1">${supportHeading}</h2>\n`
      html += `<div class="flex flex-wrap gap-4 mb-6">\n`
      if (data.support.buyMeCoffee) {
        html += `<a href="https://www.buymeacoffee.com/${data.support.buyMeCoffee}" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="${data.support.buyMeCoffee}" /></a>\n`
      }
      if (data.support.kofi) {
        html += `<a href="https://ko-fi.com/${data.support.kofi}" target="_blank"><img src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height="50" width="210" alt="${data.support.kofi}" /></a>\n`
      }
      html += `</div>\n`
    }

    // Contact
    if (data.contact.email) {
      const contactHeading = data.sectionHeadings?.contact || '📫 How to reach me:'
      html += `<h2 class="text-2xl font-semibold mb-4 mt-6 border-b pb-1">${contactHeading}</h2>\n`
      html += `<p class="mb-4"><strong>Email:</strong> <a href="mailto:${data.contact.email}" class="text-blue-600 hover:underline">${data.contact.email}</a></p>\n`
    }

    return html
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
            onClick={() => setShowRawCode(true)}
            className="flex items-center gap-2"
          >
            <Code2 className="w-4 h-4" />
            Show Code
          </Button>
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
            Download README
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
              className="bg-white p-6 rounded-lg border min-h-[400px]"
              dangerouslySetInnerHTML={{ __html: generateHTML }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Raw Code Modal */}
      <Dialog open={showRawCode} onOpenChange={setShowRawCode}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Raw Markdown Code
              </span>
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
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-auto max-h-96">
            <pre className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap">
              {generateMarkdown}
            </pre>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
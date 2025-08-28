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

    // About Me section
    if (data.profile.showNameAsHeading !== false && data.profile.name) {
      // Show name as heading (default behavior)
      markdown += `<div style="font-size: 26px; font-weight: bold;">\n  ${data.profile.name} <img src="https://emojis.slackmojis.com/emojis/images/1536351075/4594/blob-wave.gif" width="25" style="vertical-align: middle;" />\n</div>\n\n###\n\n`
      
      if (data.profile.subtitle) {
        markdown += `## ${data.profile.subtitle}\n\n`
      }

      if (data.profile.welcomeMessage) {
        markdown += `<p align="left">\n${data.profile.welcomeMessage}\n</p>\n\n###\n\n`
      }
    } else {
      // Show About Me as heading
      const aboutMeHeading = data.sectionHeadings?.profile || '👋 About Me'
      markdown += `<div style="font-size: 26px; font-weight: bold;">\n  ${aboutMeHeading} <img src="https://emojis.slackmojis.com/emojis/images/1536351075/4594/blob-wave.gif" width="25" style="vertical-align: middle;" />\n</div>\n\n###\n\n`
      
      if (data.profile.name) {
        markdown += `**${data.profile.name}**\n\n`
      }
      
      if (data.profile.subtitle) {
        markdown += `*${data.profile.subtitle}*\n\n`
      }

      if (data.profile.welcomeMessage) {
        markdown += `<p align="left">\n${data.profile.welcomeMessage}\n</p>\n\n###\n\n`
      }
    }

    // Profile Views Badge
    if (data.githubStats.showProfileViews && data.githubStats.username) {
      markdown += `<p align="left"> <img src="https://komarev.com/ghpvc/?username=${data.githubStats.username}&label=Profile%20views&color=0e75b6&style=flat&base=1000" alt="${data.githubStats.username}" /> </p>\n\n`
    }

    // Social Links
    if (data.socialLinks.length > 0) {
      const socialHeading = data.sectionHeadings?.socialLinks || '🌐 Connect with me:'
      markdown += `<div align="left">\n`
      data.socialLinks.forEach(social => {
        if (social.username) {
          const url = social.urlTemplate.replace('{username}', social.username)
          if (social.showIcon) {
            // Show icon only
            markdown += `  <a href="${url}" target="_blank">\n    <img src="https://img.shields.io/static/v1?message=${social.platform}&logo=${social.platform.toLowerCase()}&label=&color=${social.color.replace('#', '')}&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="${social.platform.toLowerCase()} logo" />\n  </a>\n`
          } else {
            // Show icon with platform name
            markdown += `  <a href="${url}" target="_blank">\n    <img src="https://img.shields.io/static/v1?message=${social.platform}&logo=${social.platform.toLowerCase()}&label=&color=${social.color.replace('#', '')}&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="${social.platform.toLowerCase()} logo" />\n  </a>\n`
          }
        }
      })
      markdown += `</div>\n\n###\n\n`
    }

    // Technologies
    if (data.technologies.length > 0) {
      const techHeading = data.sectionHeadings?.technologies || '🛠 Language and tools'
      markdown += `<h3 align="left">${techHeading}</h3>\n\n###\n\n`
      markdown += `<div align="left">\n`
      data.technologies.forEach((tech, index) => {
        // Use the imageUrl from the tech object if available, otherwise generate fallback
        let iconUrl = tech.imageUrl || ''
        if (!iconUrl && tech.icon.includes('devicon-')) {
          const iconName = tech.icon.replace('devicon-', '').replace('-plain', '').replace('-original', '')
          iconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`
        } else if (!iconUrl) {
          // Fallback to original URL for other icon types
          const iconName = tech.icon.replace('devicon-', '').replace('-plain', '').replace('-original', '')
          iconUrl = `https://raw.githubusercontent.com/devicons/devicon/master/icons/${iconName}/${tech.icon.replace('devicon-', '')}.svg`
        }
        
        if (tech.showName) {
          // Show with name in alt text and tooltip
          markdown += `  <img src="${iconUrl}" height="40" alt="${tech.name} logo" title="${tech.name}" />\n`
        } else {
          // Show only icon
          markdown += `  <img src="${iconUrl}" height="40" alt="${tech.name} logo" title="${tech.name}" />\n`
        }
        
        // Add spacing between icons
        if (index < data.technologies.length - 1) {
          markdown += `  <img width="12" />\n`
        }
      })
      markdown += `</div>\n\n###\n\n`
    }

    // GitHub Stats
    if (data.githubStats.username) {
      const statsHeading = data.sectionHeadings?.githubStats || '🔥 My Stats :'
      let hasStats = false
      
      if (data.githubStats.showGithubStats || data.githubStats.showStreakStats || data.githubStats.showTopLanguages || data.githubStats.showActivityGraph) {
        markdown += `<h3 align="left">${statsHeading}</h3>\n\n###\n\n`
        hasStats = true
      }

      if (data.githubStats.showGithubStats) {
        markdown += `<div align="center">\n  <img src="https://github-readme-stats.vercel.app/api?username=${data.githubStats.username}&locale=en&mode=daily&theme=dark&hide_border=false&border_radius=5&order=3" height="220" alt="stats graph" />\n</div>\n\n`
      }

      if (data.githubStats.showStreakStats) {
        markdown += `<div align="center">\n  <img src="https://streak-stats.demolab.com?user=${data.githubStats.username}&locale=en&mode=daily&theme=dark&hide_border=false&border_radius=5&order=3" height="220" alt="streak graph" />\n</div>\n\n`
      }

      if (data.githubStats.showTopLanguages) {
        markdown += `<div align="center">\n  <img src="https://github-readme-stats.vercel.app/api/top-langs?username=${data.githubStats.username}&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=dark&hide_border=false&border_radius=5&order=2" height="150" alt="languages graph" />\n</div>\n\n`
      }

      if (data.githubStats.showActivityGraph) {
        markdown += `<div align="center">\n  <img width="100%" src="https://github-readme-activity-graph.vercel.app/graph?username=${data.githubStats.username}&theme=minimal" alt="${data.githubStats.username}" />\n</div>\n\n`
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

    // About Me section
    if (data.profile.showNameAsHeading !== false && data.profile.name) {
      // Show name as heading (default behavior)
      html += `<div class="text-2xl font-bold mb-4 flex items-center gap-2">${data.profile.name} <img src="https://emojis.slackmojis.com/emojis/images/1536351075/4594/blob-wave.gif" width="25" class="inline" /></div>\n`
      
      if (data.profile.subtitle) {
        html += `<p class="text-lg font-medium mb-4 text-gray-600">${data.profile.subtitle}</p>\n`
      }

      if (data.profile.welcomeMessage) {
        html += `<div class="mb-6 text-gray-700 leading-relaxed text-left">${data.profile.welcomeMessage}</div>\n`
      }
    } else {
      // Show About Me as heading
      const aboutMeHeading = data.sectionHeadings?.profile || '👋 About Me'
      html += `<div class="text-2xl font-bold mb-4 flex items-center gap-2">${aboutMeHeading} <img src="https://emojis.slackmojis.com/emojis/images/1536351075/4594/blob-wave.gif" width="25" class="inline" /></div>\n`
      
      if (data.profile.name) {
        html += `<p class="mb-6 text-gray-700 leading-relaxed"><strong>${data.profile.name}</strong></p>\n`
      }
      
      if (data.profile.subtitle) {
        html += `<p class="text-lg font-medium mb-4 text-gray-600">${data.profile.subtitle}</p>\n`
      }

      if (data.profile.welcomeMessage) {
        html += `<div class="mb-6 text-gray-700 leading-relaxed text-left">${data.profile.welcomeMessage}</div>\n`
      }
    }

    // Profile Views Badge
    if (data.githubStats.showProfileViews && data.githubStats.username) {
      html += `<p class="mb-6"><img src="https://komarev.com/ghpvc/?username=${data.githubStats.username}&label=Profile%20views&color=0e75b6&style=flat&base=1000" alt="${data.githubStats.username}" /></p>\n`
    }

    // Social Links
    if (data.socialLinks.length > 0) {
      const socialHeading = data.sectionHeadings?.socialLinks || '🌐 Connect with me:'
      html += `<div class="mb-6">\n`
      data.socialLinks.forEach(social => {
        if (social.username) {
          const url = social.urlTemplate.replace('{username}', social.username)
          html += `<a href="${url}" target="_blank" class="inline-block mr-2 mb-2">\n`
          html += `  <img src="https://img.shields.io/static/v1?message=${social.platform}&logo=${social.platform.toLowerCase()}&label=&color=${social.color.replace('#', '')}&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="${social.platform.toLowerCase()} logo" />\n`
          html += `</a>\n`
        }
      })
      html += `</div>\n`
    }

    // Technologies
    if (data.technologies.length > 0) {
      const techHeading = data.sectionHeadings?.technologies || '🛠 Language and tools'
      html += `<h3 class="text-xl font-semibold mb-3 mt-6">${techHeading}</h3>\n`
      html += `<div class="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-3 mb-6 items-center">\n`
      data.technologies.forEach(tech => {
        // Use the imageUrl from the tech object if available, otherwise generate fallback
        let iconUrl = tech.imageUrl || ''
        if (!iconUrl && tech.icon.includes('devicon-')) {
          const iconName = tech.icon.replace('devicon-', '').replace('-plain', '').replace('-original', '')
          iconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`
        } else if (!iconUrl) {
          // Fallback to original URL for other icon types
          const iconName = tech.icon.replace('devicon-', '').replace('-plain', '').replace('-original', '')
          iconUrl = `https://raw.githubusercontent.com/devicons/devicon/master/icons/${iconName}/${tech.icon.replace('devicon-', '')}.svg`
        }
        
        html += `<div class="flex flex-col items-center p-2 hover:scale-110 transition-transform" title="${tech.name}">\n`
        html += `  <img src="${iconUrl}" alt="${tech.name}" width="40" height="40" class="object-contain" />\n`
        if (tech.showName) {
          html += `  <span class="text-xs mt-1 text-center">${tech.name}</span>\n`
        }
        html += `</div>\n`
      })
      html += `</div>\n`
    }

    // GitHub Stats
    if (data.githubStats.username) {
      const statsHeading = data.sectionHeadings?.githubStats || '🔥 My Stats :'
      let hasStats = false
      
      if (data.githubStats.showGithubStats || data.githubStats.showStreakStats || data.githubStats.showTopLanguages || data.githubStats.showActivityGraph) {
        html += `<h3 class="text-xl font-semibold mb-4 mt-6">${statsHeading}</h3>\n`
        html += `<div class="flex justify-center mb-6">\n`
        hasStats = true
      }

      if (data.githubStats.showGithubStats) {
        html += `<div class="flex justify-center mb-4"><img src="https://github-readme-stats.vercel.app/api?username=${data.githubStats.username}&locale=en&mode=daily&theme=dark&hide_border=false&border_radius=5&order=3" height="220" alt="stats graph" class="max-w-full" /></div>\n`
      }

      if (data.githubStats.showStreakStats) {
        html += `<div class="flex justify-center mb-4"><img src="https://streak-stats.demolab.com?user=${data.githubStats.username}&locale=en&mode=daily&theme=dark&hide_border=false&border_radius=5&order=3" height="220" alt="streak graph" class="max-w-full" /></div>\n`
      }

      if (data.githubStats.showTopLanguages) {
        html += `<div class="flex justify-center mb-4"><img src="https://github-readme-stats.vercel.app/api/top-langs?username=${data.githubStats.username}&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=dark&hide_border=false&border_radius=5&order=2" height="150" alt="languages graph" class="max-w-full" /></div>\n`
      }

      if (hasStats) {
        html += `</div>\n`
      }

      if (data.githubStats.showActivityGraph) {
        html += `<div class="flex justify-center mb-6 overflow-hidden"><img src="https://github-readme-activity-graph.vercel.app/graph?username=${data.githubStats.username}&theme=minimal" alt="${data.githubStats.username}" class="max-w-full w-full" /></div>\n`
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
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-5 h-5 text-muted-foreground" />
          <span className="text-lg font-semibold">README Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowRawCode(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            <Code2 className="w-4 h-4" />
            View Markdown
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

      {/* Enhanced Markdown Code Modal with Better Scrolling */}
      <Dialog open={showRawCode} onOpenChange={setShowRawCode}>
        <DialogContent className="max-w-6xl max-h-[95vh] flex flex-col overflow-hidden">
          <DialogHeader className="flex-shrink-0 pb-4 border-b">
            <DialogTitle className="flex items-center justify-between pr-8">
              <span className="flex items-center gap-2">
                <Code2 className="w-5 h-5" />
                Markdown Code
              </span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 min-h-0 overflow-hidden relative">
            {/* Enhanced scrollable content container */}
            <div 
              className="h-full overflow-auto markdown-code-scroll bg-gray-50 rounded-lg border-2 border-gray-200 relative"
              style={{ 
                scrollBehavior: 'smooth'
              }}
            >
              {/* Copy button positioned over the content */}
              <div className="sticky top-0 right-0 z-20 flex justify-end p-3 bg-gradient-to-b from-gray-50 via-gray-50 to-transparent">
                <Button
                  variant="default"
                  size="sm"
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 shadow-lg"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy Code'}
                </Button>
              </div>
              
              {/* Code content */}
              <div className="px-6 pb-6 pt-0">
                <pre 
                  className="text-sm whitespace-pre-wrap break-words font-mono leading-relaxed text-gray-800 select-text" 
                  style={{ 
                    margin: 0, 
                    userSelect: 'text',
                    WebkitUserSelect: 'text',
                    MozUserSelect: 'text',
                    msUserSelect: 'text',
                    minHeight: '400px',
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                    fontSize: '13px',
                    lineHeight: '1.5'
                  }}
                >
                  {generateMarkdown}
                </pre>
              </div>
            </div>
          </div>

          {/* Enhanced scrollbar styles */}
          <style jsx>{`
            .markdown-code-scroll {
              scrollbar-width: auto;
              scrollbar-color: #4B5563 #F9FAFB;
            }
            
            .markdown-code-scroll::-webkit-scrollbar {
              width: 18px;
              height: 18px;
              background-color: #F9FAFB;
            }
            
            .markdown-code-scroll::-webkit-scrollbar-track {
              background: #F3F4F6;
              border-radius: 10px;
              border: 2px solid #E5E7EB;
              margin: 4px;
            }
            
            .markdown-code-scroll::-webkit-scrollbar-thumb {
              background: linear-gradient(180deg, #6B7280 0%, #4B5563 50%, #374151 100%);
              border-radius: 10px;
              border: 3px solid #F9FAFB;
              min-height: 50px;
              box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
            }
            
            .markdown-code-scroll::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(180deg, #4B5563 0%, #374151 50%, #1F2937 100%);
              box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
            }
            
            .markdown-code-scroll::-webkit-scrollbar-thumb:active {
              background: linear-gradient(180deg, #374151 0%, #1F2937 50%, #111827 100%);
            }

            .markdown-code-scroll::-webkit-scrollbar-corner {
              background: #F9FAFB;
              border-radius: 8px;
            }

            /* Enhanced scroll buttons */
            .markdown-code-scroll::-webkit-scrollbar-button:vertical:start:decrement {
              display: block;
              height: 24px;
              background: linear-gradient(180deg, #D1D5DB 0%, #9CA3AF 100%);
              border-radius: 10px 10px 5px 5px;
              border: 2px solid #E5E7EB;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2'%3E%3Cpath d='m18 15-6-6-6 6'/%3E%3C/svg%3E");
              background-repeat: no-repeat;
              background-position: center;
            }

            .markdown-code-scroll::-webkit-scrollbar-button:vertical:end:increment {
              display: block;
              height: 24px;
              background: linear-gradient(180deg, #9CA3AF 0%, #D1D5DB 100%);
              border-radius: 5px 5px 10px 10px;
              border: 2px solid #E5E7EB;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
              background-repeat: no-repeat;
              background-position: center;
            }

            .markdown-code-scroll::-webkit-scrollbar-button:hover {
              background: linear-gradient(180deg, #6B7280 0%, #4B5563 100%);
            }

            .markdown-code-scroll::-webkit-scrollbar-button:active {
              background: linear-gradient(180deg, #4B5563 0%, #374151 100%);
            }

            /* Horizontal scrollbar styling */
            .markdown-code-scroll::-webkit-scrollbar-button:horizontal:start:decrement {
              display: block;
              width: 24px;
              background: linear-gradient(90deg, #D1D5DB 0%, #9CA3AF 100%);
              border-radius: 10px 5px 5px 10px;
              border: 2px solid #E5E7EB;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2'%3E%3Cpath d='m15 18-6-6 6-6'/%3E%3C/svg%3E");
              background-repeat: no-repeat;
              background-position: center;
            }

            .markdown-code-scroll::-webkit-scrollbar-button:horizontal:end:increment {
              display: block;
              width: 24px;
              background: linear-gradient(90deg, #9CA3AF 0%, #D1D5DB 100%);
              border-radius: 5px 10px 10px 5px;
              border: 2px solid #E5E7EB;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23374151' stroke-width='2'%3E%3Cpath d='m9 18 6-6-6-6'/%3E%3C/svg%3E");
              background-repeat: no-repeat;
              background-position: center;
            }
          `}</style>
        </DialogContent>
      </Dialog>
    </div>
  )
}
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

  // Section generators
  const generateSectionContent = (sectionType) => {
    switch (sectionType) {
      case 'profile':
        return generateProfileSection();
      case 'technologies':
        return generateTechnologiesSection();
      case 'socialLinks':
        return generateSocialLinksSection();
      case 'githubStats':
        return generateGithubStatsSection();
      case 'projects':
        return generateProjectsSection();
      case 'support':
        return generateSupportSection();
      case 'contact':
        return generateContactSection();
      default:
        return { markdown: '', html: '' };
    }
  };

  const generateProfileSection = () => {
    let markdown = '';
    let html = '';

    // About Me section
    if (data.profile.showNameAsHeading !== false && data.profile.name) {
      // Show name as heading (default behavior)
      markdown += `<div style="font-size: 26px; font-weight: bold;">\n  ${data.profile.name} <img src="https://emojis.slackmojis.com/emojis/images/1536351075/4594/blob-wave.gif" width="25" style="vertical-align: middle;" />\n</div>\n\n###\n\n`;
      html += `<div class="text-2xl font-bold mb-4 flex items-center gap-2">${data.profile.name} <img src="https://emojis.slackmojis.com/emojis/images/1536351075/4594/blob-wave.gif" width="25" class="inline" /></div>\n`;
      
      if (data.profile.subtitle) {
        markdown += `## ${data.profile.subtitle}\n\n`;
        html += `<p class="text-lg font-medium mb-4 text-gray-600">${data.profile.subtitle}</p>\n`;
      }

      if (data.profile.welcomeMessage) {
        markdown += `<p align="left">\n${data.profile.welcomeMessage}\n</p>\n\n###\n\n`;
        html += `<div class="mb-6 text-gray-700 leading-relaxed text-left">${data.profile.welcomeMessage}</div>\n`;
      }
    } else {
      // Show About Me as heading
      const aboutMeHeading = data.sectionHeadings?.profile || '👋 About Me';
      markdown += `<div style="font-size: 26px; font-weight: bold;">\n  ${aboutMeHeading} <img src="https://emojis.slackmojis.com/emojis/images/1536351075/4594/blob-wave.gif" width="25" style="vertical-align: middle;" />\n</div>\n\n###\n\n`;
      html += `<div class="text-2xl font-bold mb-4 flex items-center gap-2">${aboutMeHeading} <img src="https://emojis.slackmojis.com/emojis/images/1536351075/4594/blob-wave.gif" width="25" class="inline" /></div>\n`;
      
      if (data.profile.name) {
        markdown += `**${data.profile.name}**\n\n`;
        html += `<p class="mb-6 text-gray-700 leading-relaxed"><strong>${data.profile.name}</strong></p>\n`;
      }
      
      if (data.profile.subtitle) {
        markdown += `*${data.profile.subtitle}*\n\n`;
        html += `<p class="text-lg font-medium mb-4 text-gray-600">${data.profile.subtitle}</p>\n`;
      }

      if (data.profile.welcomeMessage) {
        markdown += `<p align="left">\n${data.profile.welcomeMessage}\n</p>\n\n###\n\n`;
        html += `<div class="mb-6 text-gray-700 leading-relaxed text-left">${data.profile.welcomeMessage}</div>\n`;
      }
    }

    return { markdown, html };
  };

  const generateTechnologiesSection = () => {
    let markdown = '';
    let html = '';

    // Technologies
    if (data.technologies.length > 0) {
      const techHeading = data.sectionHeadings?.technologies || '🛠 Language and tools';
      markdown += `<h3 align="left">${techHeading}</h3>\n\n###\n\n`;
      html += `<h3 class="text-xl font-semibold mb-3 mt-6">${techHeading}</h3>\n`;
      
      markdown += `<div align="left">\n`;
      html += `<div class="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-3 mb-6 items-center">\n`;
      
      data.technologies.forEach((tech, index) => {
        // Use the imageUrl from the tech object if available, otherwise generate fallback
        let iconUrl = tech.imageUrl || '';
        if (!iconUrl && tech.icon.includes('devicon-')) {
          const iconName = tech.icon.replace('devicon-', '').replace('-plain', '').replace('-original', '');
          iconUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`;
        } else if (!iconUrl) {
          // Fallback to original URL for other icon types
          const iconName = tech.icon.replace('devicon-', '').replace('-plain', '').replace('-original', '');
          iconUrl = `https://raw.githubusercontent.com/devicons/devicon/master/icons/${iconName}/${tech.icon.replace('devicon-', '')}.svg`;
        }
        
        if (tech.showName) {
          // Show with name in alt text and tooltip
          markdown += `  <img src="${iconUrl}" height="40" alt="${tech.name} logo" title="${tech.name}" />\n`;
        } else {
          // Show only icon
          markdown += `  <img src="${iconUrl}" height="40" alt="${tech.name} logo" title="${tech.name}" />\n`;
        }
        
        // Add spacing between icons
        if (index < data.technologies.length - 1) {
          markdown += `  <img width="12" />\n`;
        }

        // HTML version
        html += `<div class="flex flex-col items-center p-2 hover:scale-110 transition-transform" title="${tech.name}">\n`;
        html += `  <img src="${iconUrl}" alt="${tech.name}" width="40" height="40" class="object-contain" />\n`;
        if (tech.showName) {
          html += `  <span class="text-xs mt-1 text-center">${tech.name}</span>\n`;
        }
        html += `</div>\n`;
      });
      
      markdown += `</div>\n\n###\n\n`;
      html += `</div>\n`;
    }

    return { markdown, html };
  };

  const generateSocialLinksSection = () => {
    let markdown = '';
    let html = '';

    // Social Links
    if (data.socialLinks.length > 0) {
      const socialHeading = data.sectionHeadings?.socialLinks || '🌐 Connect with me:';
      markdown += `<div align="left">\n`;
      html += `<div class="mb-6">\n`;
      
      data.socialLinks.forEach(social => {
        if (social.username) {
          const url = social.urlTemplate.replace('{username}', social.username);
          if (social.showIcon) {
            // Show icon only
            markdown += `  <a href="${url}" target="_blank">\n    <img src="https://img.shields.io/static/v1?message=${social.platform}&logo=${social.platform.toLowerCase()}&label=&color=${social.color.replace('#', '')}&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="${social.platform.toLowerCase()} logo" />\n  </a>\n`;
          } else {
            // Show icon with platform name
            markdown += `  <a href="${url}" target="_blank">\n    <img src="https://img.shields.io/static/v1?message=${social.platform}&logo=${social.platform.toLowerCase()}&label=&color=${social.color.replace('#', '')}&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="${social.platform.toLowerCase()} logo" />\n  </a>\n`;
          }

          html += `<a href="${url}" target="_blank" class="inline-block mr-2 mb-2">\n`;
          html += `  <img src="https://img.shields.io/static/v1?message=${social.platform}&logo=${social.platform.toLowerCase()}&label=&color=${social.color.replace('#', '')}&logoColor=white&labelColor=&style=for-the-badge" height="25" alt="${social.platform.toLowerCase()} logo" />\n`;
          html += `</a>\n`;
        }
      });
      
      markdown += `</div>\n\n###\n\n`;
      html += `</div>\n`;
    }

    return { markdown, html };
  };

  const generateGithubStatsSection = () => {
    let markdown = '';
    let html = '';

    // Profile Views Badge (handled separately to appear early)
    if (data.githubStats.showProfileViews && data.githubStats.username) {
      markdown += `<p align="left"> <img src="https://komarev.com/ghpvc/?username=${data.githubStats.username}&label=Profile%20views&color=0e75b6&style=flat&base=1000" alt="${data.githubStats.username}" /> </p>\n\n`;
      html += `<p class="mb-6"><img src="https://komarev.com/ghpvc/?username=${data.githubStats.username}&label=Profile%20views&color=0e75b6&style=flat&base=1000" alt="${data.githubStats.username}" /></p>\n`;
    }

    // GitHub Stats
    if (data.githubStats.username) {
      const statsHeading = data.sectionHeadings?.githubStats || '🔥 My Stats :';
      let hasStats = false;
      
      if (data.githubStats.showGithubStats || data.githubStats.showStreakStats || data.githubStats.showTopLanguages || data.githubStats.showActivityGraph) {
        markdown += `<h3 align="left">${statsHeading}</h3>\n\n###\n\n`;
        html += `<h3 class="text-xl font-semibold mb-4 mt-6">${statsHeading}</h3>\n`;
        html += `<div class="flex justify-center mb-6">\n`;
        hasStats = true;
      }

      if (data.githubStats.showGithubStats) {
        markdown += `<div align="center">\n  <img src="https://github-readme-stats.vercel.app/api?username=${data.githubStats.username}&locale=en&mode=daily&theme=dark&hide_border=false&border_radius=5&order=3" height="220" alt="stats graph" />\n</div>\n\n`;
        html += `<div class="flex justify-center mb-4"><img src="https://github-readme-stats.vercel.app/api?username=${data.githubStats.username}&locale=en&mode=daily&theme=dark&hide_border=false&border_radius=5&order=3" height="220" alt="stats graph" class="max-w-full" /></div>\n`;
      }

      if (data.githubStats.showStreakStats) {
        markdown += `<div align="center">\n  <img src="https://streak-stats.demolab.com?user=${data.githubStats.username}&locale=en&mode=daily&theme=dark&hide_border=false&border_radius=5&order=3" height="220" alt="streak graph" />\n</div>\n\n`;
        html += `<div class="flex justify-center mb-4"><img src="https://streak-stats.demolab.com?user=${data.githubStats.username}&locale=en&mode=daily&theme=dark&hide_border=false&border_radius=5&order=3" height="220" alt="streak graph" class="max-w-full" /></div>\n`;
      }

      if (data.githubStats.showTopLanguages) {
        markdown += `<div align="center">\n  <img src="https://github-readme-stats.vercel.app/api/top-langs?username=${data.githubStats.username}&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=dark&hide_border=false&border_radius=5&order=2" height="150" alt="languages graph" />\n</div>\n\n`;
        html += `<div class="flex justify-center mb-4"><img src="https://github-readme-stats.vercel.app/api/top-langs?username=${data.githubStats.username}&locale=en&hide_title=false&layout=compact&card_width=320&langs_count=5&theme=dark&hide_border=false&border_radius=5&order=2" height="150" alt="languages graph" class="max-w-full" /></div>\n`;
      }

      if (hasStats) {
        html += `</div>\n`;
      }

      if (data.githubStats.showActivityGraph) {
        markdown += `<div align="center">\n  <img width="100%" src="https://github-readme-activity-graph.vercel.app/graph?username=${data.githubStats.username}&theme=minimal" alt="${data.githubStats.username}" />\n</div>\n\n`;
        html += `<div class="flex justify-center mb-6 overflow-hidden"><img src="https://github-readme-activity-graph.vercel.app/graph?username=${data.githubStats.username}&theme=minimal" alt="${data.githubStats.username}" class="max-w-full w-full" /></div>\n`;
      }
    }

    return { markdown, html };
  };

  const generateProjectsSection = () => {
    let markdown = '';
    let html = '';

    // Projects
    if (data.projects.length > 0) {
      const projectsHeading = data.sectionHeadings?.projects || '🚀 Featured Projects:';
      markdown += `## ${projectsHeading}\n\n`;
      html += `<h2 class="text-2xl font-semibold mb-4 mt-6 border-b pb-1">${projectsHeading}</h2>\n`;
      
      data.projects.forEach(project => {
        if (project.title) {
          markdown += `### [${project.title}](${project.link || '#'})\n`;
          html += `<div class="mb-4 p-4 border rounded-lg">\n`;
          html += `<h3 class="text-lg font-semibold mb-2"><a href="${project.link || '#'}" class="text-blue-600 hover:underline" target="_blank">${project.title}</a></h3>\n`;
          
          if (project.description) {
            markdown += `${project.description}\n`;
            html += `<p class="text-gray-700 mb-2">${project.description}</p>\n`;
          }
          if (project.repo) {
            markdown += `**Repository:** [${project.repo}](${project.repo})\n`;
            html += `<p class="text-sm"><strong>Repository:</strong> <a href="${project.repo}" class="text-blue-600 hover:underline" target="_blank">${project.repo}</a></p>\n`;
          }
          markdown += `\n`;
          html += `</div>\n`;
        }
      });
    }

    return { markdown, html };
  };

  const generateSupportSection = () => {
    let markdown = '';
    let html = '';

    // Support
    if (data.support.buyMeCoffee || data.support.kofi) {
      const supportHeading = data.sectionHeadings?.support || '☕ Support Me:';
      markdown += `## ${supportHeading}\n\n`;
      html += `<h2 class="text-2xl font-semibold mb-4 mt-6 border-b pb-1">${supportHeading}</h2>\n`;
      html += `<div class="flex flex-wrap gap-4 mb-6">\n`;
      
      if (data.support.buyMeCoffee) {
        markdown += `<p><a href="https://www.buymeacoffee.com/${data.support.buyMeCoffee}"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="${data.support.buyMeCoffee}" /></a></p><br><br>\n\n`;
        html += `<a href="https://www.buymeacoffee.com/${data.support.buyMeCoffee}" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="${data.support.buyMeCoffee}" /></a>\n`;
      }
      if (data.support.kofi) {
        markdown += `<p><a href="https://ko-fi.com/${data.support.kofi}"> <img align="left" src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height="50" width="210" alt="${data.support.kofi}" /></a></p><br><br>\n\n`;
        html += `<a href="https://ko-fi.com/${data.support.kofi}" target="_blank"><img src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height="50" width="210" alt="${data.support.kofi}" /></a>\n`;
      }
      
      html += `</div>\n`;
    }

    return { markdown, html };
  };

  const generateContactSection = () => {
    let markdown = '';
    let html = '';

    // Contact
    if (data.contact.email) {
      const contactHeading = data.sectionHeadings?.contact || '📫 How to reach me:';
      markdown += `## ${contactHeading}\n\n`;
      html += `<h2 class="text-2xl font-semibold mb-4 mt-6 border-b pb-1">${contactHeading}</h2>\n`;
      markdown += `**Email:** ${data.contact.email}\n\n`;
      html += `<p class="mb-4"><strong>Email:</strong> <a href="mailto:${data.contact.email}" class="text-blue-600 hover:underline">${data.contact.email}</a></p>\n`;
    }

    return { markdown, html };
  };

  const generateMarkdown = useMemo(() => {
    let markdown = '';
    
    // Use section order if available, otherwise use default order
    const sectionOrder = data.sectionOrder || ['profile', 'technologies', 'socialLinks', 'githubStats', 'projects', 'support', 'contact'];
    
    sectionOrder.forEach(sectionType => {
      const sectionContent = generateSectionContent(sectionType);
      markdown += sectionContent.markdown;
    });

    return markdown;
  }, [data]);

  const generateHTML = useMemo(() => {
    let html = '';
    
    // Use section order if available, otherwise use default order
    const sectionOrder = data.sectionOrder || ['profile', 'technologies', 'socialLinks', 'githubStats', 'projects', 'support', 'contact'];
    
    sectionOrder.forEach(sectionType => {
      const sectionContent = generateSectionContent(sectionType);
      html += sectionContent.html;
    });

    return html;
  }, [data]);

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
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105"
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

      {/* Redesigned Markdown Code Modal with Hover-Only Scrollbar */}
      <Dialog open={showRawCode} onOpenChange={setShowRawCode}>
        <DialogContent className="max-w-6xl max-h-[95vh] flex flex-col overflow-hidden">
          <DialogHeader className="flex-shrink-0 pb-6 border-b border-gray-200">
            <DialogTitle className="flex items-center justify-between pr-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Code2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Markdown Code</h3>
                  <p className="text-sm text-gray-500 mt-1">Ready to copy to your GitHub profile</p>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 min-h-0 overflow-hidden">
            {/* Main content area with hover scrollbar */}
            <div className="h-full relative bg-slate-50 rounded-xl border border-gray-200 overflow-hidden">
              {/* Header with copy button */}
              <div className="sticky top-0 z-10 bg-gradient-to-b from-slate-50 via-slate-50 to-slate-50/80 backdrop-blur-sm border-b border-gray-200">
                <div className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="ml-3 text-sm font-medium text-gray-600">README.md</span>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-200"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? 'Copied!' : 'Copy All'}
                  </Button>
                </div>
              </div>
              
              {/* Scrollable code container */}
              <div 
                className="markdown-viewer-scroll overflow-auto"
                style={{ 
                  maxHeight: '500px',
                  scrollBehavior: 'smooth'
                }}
              >
                <div className="p-6 pb-8">
                  <pre 
                    className="text-sm font-mono leading-7 text-gray-800 whitespace-pre-wrap break-words select-text"
                    style={{ 
                      fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Menlo, Consolas, "Liberation Mono", "Courier New", monospace',
                      fontSize: '14px',
                      lineHeight: '1.7',
                      margin: 0,
                      userSelect: 'text',
                      WebkitUserSelect: 'text',
                      MozUserSelect: 'text',
                      msUserSelect: 'text'
                    }}
                  >
                    {generateMarkdown}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Hover-only scrollbar styles */}
          <style jsx>{`
            .markdown-viewer-scroll {
              scrollbar-width: none; /* Firefox - hide by default */
              -ms-overflow-style: none; /* IE and Edge - hide by default */
            }
            
            .markdown-viewer-scroll::-webkit-scrollbar {
              width: 0px;
              background: transparent;
              transition: width 0.3s ease;
            }
            
            .markdown-viewer-scroll:hover {
              scrollbar-width: thin; /* Firefox - show on hover */
              scrollbar-color: #6B7280 #F1F5F9;
            }
            
            .markdown-viewer-scroll:hover::-webkit-scrollbar {
              width: 16px;
              background: #F1F5F9;
            }
            
            .markdown-viewer-scroll::-webkit-scrollbar-track {
              background: transparent;
              border-radius: 8px;
            }
            
            .markdown-viewer-scroll:hover::-webkit-scrollbar-track {
              background: #F1F5F9;
              border: 1px solid #E2E8F0;
              border-radius: 8px;
              margin: 4px;
            }
            
            .markdown-viewer-scroll::-webkit-scrollbar-thumb {
              background: transparent;
              border-radius: 8px;
              transition: all 0.3s ease;
            }
            
            .markdown-viewer-scroll:hover::-webkit-scrollbar-thumb {
              background: linear-gradient(180deg, #9CA3AF 0%, #6B7280 50%, #4B5563 100%);
              border: 3px solid #F1F5F9;
              border-radius: 8px;
              min-height: 40px;
              box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
            }
            
            .markdown-viewer-scroll::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(180deg, #6B7280 0%, #4B5563 50%, #374151 100%) !important;
              box-shadow: inset 0 1px 4px rgba(0,0,0,0.15);
            }
            
            .markdown-viewer-scroll::-webkit-scrollbar-thumb:active {
              background: linear-gradient(180deg, #4B5563 0%, #374151 50%, #1F2937 100%) !important;
              box-shadow: inset 0 2px 6px rgba(0,0,0,0.2);
            }

            .markdown-viewer-scroll::-webkit-scrollbar-corner {
              background: transparent;
            }
            
            .markdown-viewer-scroll:hover::-webkit-scrollbar-corner {
              background: #F1F5F9;
              border-radius: 4px;
            }

            /* Visual indicator for scrollable content */
            .markdown-viewer-scroll {
              position: relative;
            }
            
            .markdown-viewer-scroll::after {
              content: '';
              position: absolute;
              top: 0;
              right: 0;
              width: 4px;
              height: 100%;
              background: linear-gradient(180deg, transparent 0%, rgba(107,114,128,0.1) 50%, transparent 100%);
              opacity: 0;
              transition: opacity 0.3s ease;
              pointer-events: none;
              border-radius: 2px;
            }
            
            .markdown-viewer-scroll:hover::after {
              opacity: 0; /* Hide when actual scrollbar shows */
            }
          `}</style>
        </DialogContent>
      </Dialog>
    </div>
  )
}
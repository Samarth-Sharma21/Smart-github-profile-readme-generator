'use client'

import { useState, useMemo } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search, X } from 'lucide-react'

// Popular social platforms with their details
const SOCIAL_PLATFORMS = [
  {
    platform: 'GitHub',
    icon: 'fab fa-github',
    color: '#333',
    urlTemplate: 'https://github.com/{username}',
    placeholder: 'GitHub username'
  },
  {
    platform: 'LinkedIn',
    icon: 'fab fa-linkedin-in',
    color: '#0077B5',
    urlTemplate: 'https://linkedin.com/in/{username}',
    placeholder: 'LinkedIn username'
  },
  {
    platform: 'Twitter',
    icon: 'fab fa-twitter',
    color: '#1DA1F2',
    urlTemplate: 'https://twitter.com/{username}',
    placeholder: 'Twitter handle'
  },
  {
    platform: 'Instagram',
    icon: 'fab fa-instagram',
    color: '#E4405F',
    urlTemplate: 'https://instagram.com/{username}',
    placeholder: 'Instagram username'
  },
  {
    platform: 'YouTube',
    icon: 'fab fa-youtube',
    color: '#FF0000',
    urlTemplate: 'https://youtube.com/@{username}',
    placeholder: 'YouTube channel name'
  },
  {
    platform: 'Dev.to',
    icon: 'fab fa-dev',
    color: '#0A0A0A',
    urlTemplate: 'https://dev.to/{username}',
    placeholder: 'Dev.to username'
  },
  {
    platform: 'Medium',
    icon: 'fab fa-medium',
    color: '#12100E',
    urlTemplate: 'https://medium.com/@{username}',
    placeholder: 'Medium username'
  },
  {
    platform: 'Stack Overflow',
    icon: 'fab fa-stack-overflow',
    color: '#FF9900',
    urlTemplate: 'https://stackoverflow.com/users/{username}',
    placeholder: 'Stack Overflow user ID'
  },
  {
    platform: 'CodePen',
    icon: 'fab fa-codepen',
    color: '#000000',
    urlTemplate: 'https://codepen.io/{username}',
    placeholder: 'CodePen username'
  },
  {
    platform: 'Dribbble',
    icon: 'fab fa-dribbble',
    color: '#EA4C89',
    urlTemplate: 'https://dribbble.com/{username}',
    placeholder: 'Dribbble username'
  },
  {
    platform: 'Behance',
    icon: 'fab fa-behance',
    color: '#1769FF',
    urlTemplate: 'https://behance.net/{username}',
    placeholder: 'Behance username'
  },
  {
    platform: 'Discord',
    icon: 'fab fa-discord',
    color: '#7289DA',
    urlTemplate: 'https://discord.gg/{username}',
    placeholder: 'Discord server invite'
  },
  {
    platform: 'Telegram',
    icon: 'fab fa-telegram-plane',
    color: '#0088CC',
    urlTemplate: 'https://t.me/{username}',
    placeholder: 'Telegram username'
  },
  {
    platform: 'WhatsApp',
    icon: 'fab fa-whatsapp',
    color: '#25D366',
    urlTemplate: 'https://wa.me/{username}',
    placeholder: 'WhatsApp number'
  },
  {
    platform: 'Reddit',
    icon: 'fab fa-reddit',
    color: '#FF4500',
    urlTemplate: 'https://reddit.com/user/{username}',
    placeholder: 'Reddit username'
  },
  {
    platform: 'TikTok',
    icon: 'fab fa-tiktok',
    color: '#000000',
    urlTemplate: 'https://tiktok.com/@{username}',
    placeholder: 'TikTok username'
  },
  {
    platform: 'Twitch',
    icon: 'fab fa-twitch',
    color: '#9146FF',
    urlTemplate: 'https://twitch.tv/{username}',
    placeholder: 'Twitch username'
  },
  {
    platform: 'Facebook',
    icon: 'fab fa-facebook-f',
    color: '#1877F2',
    urlTemplate: 'https://facebook.com/{username}',
    placeholder: 'Facebook username'
  },
  {
    platform: 'Skype',
    icon: 'fab fa-skype',
    color: '#00AFF0',
    urlTemplate: 'skype:{username}?chat',
    placeholder: 'Skype username'
  },
  {
    platform: 'Slack',
    icon: 'fab fa-slack',
    color: '#4A154B',
    urlTemplate: 'https://{username}.slack.com',
    placeholder: 'Slack workspace'
  },
  {
    platform: 'Spotify',
    icon: 'fab fa-spotify',
    color: '#1DB954',
    urlTemplate: 'https://open.spotify.com/user/{username}',
    placeholder: 'Spotify username'
  },
  {
    platform: 'SoundCloud',
    icon: 'fab fa-soundcloud',
    color: '#FF3300',
    urlTemplate: 'https://soundcloud.com/{username}',
    placeholder: 'SoundCloud username'
  },
  {
    platform: 'Pinterest',
    icon: 'fab fa-pinterest',
    color: '#BD081C',
    urlTemplate: 'https://pinterest.com/{username}',
    placeholder: 'Pinterest username'
  },
  {
    platform: 'Tumblr',
    icon: 'fab fa-tumblr',
    color: '#001935',
    urlTemplate: 'https://{username}.tumblr.com',
    placeholder: 'Tumblr username'
  },
  {
    platform: 'Snapchat',
    icon: 'fab fa-snapchat',
    color: '#FFFC00',
    urlTemplate: 'https://snapchat.com/add/{username}',
    placeholder: 'Snapchat username'
  }
]

export default function SocialSearch({ open, onOpenChange, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPlatforms, setSelectedPlatforms] = useState([])

  const filteredPlatforms = useMemo(() => {
    return SOCIAL_PLATFORMS.filter(platform =>
      platform.platform.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const handleSelect = (platform) => {
    // Check if platform is already selected
    const isSelected = selectedPlatforms.some(p => p.platform === platform.platform)
    
    if (isSelected) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p.platform !== platform.platform))
    } else {
      setSelectedPlatforms([...selectedPlatforms, {
        ...platform,
        username: '',
        showIcon: true
      }])
    }
  }
  
  const handleDone = () => {
    // Send all selected platforms to parent component at once
    if (selectedPlatforms.length > 0) {
      // Call onSelect with all selected platforms as an array
      onSelect(selectedPlatforms)
      setSelectedPlatforms([])
      setSearchTerm('')
      onOpenChange(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Add Social Link</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search social platforms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Selected Platforms */}
          {selectedPlatforms.length > 0 && (
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Selected ({selectedPlatforms.length}):</div>
              <div className="flex flex-wrap gap-2">
                {selectedPlatforms.map(platform => (
                  <div 
                    key={platform.platform}
                    className="flex items-center gap-2 bg-muted rounded-full pl-3 pr-2 py-1"
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full" style={{ backgroundColor: `${platform.color}20` }}>
                      <i className={platform.icon} style={{ color: platform.color }}></i>
                    </div>
                    <span className="text-sm">{platform.platform}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-5 w-5 p-0 rounded-full"
                      onClick={() => handleSelect(platform)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Platform Grid */}
          <ScrollArea className="h-72 custom-scrollbar pr-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-1">
              {filteredPlatforms.map(platform => {
                const isSelected = selectedPlatforms.some(p => p.platform === platform.platform);
                return (
                  <Button
                    key={platform.platform}
                    variant={isSelected ? "default" : "outline"}
                    className={`flex items-center gap-3 h-12 justify-start ${isSelected ? 'bg-primary/10 border-primary' : ''}`}
                    onClick={() => handleSelect(platform)}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: `${platform.color}20` }}>
                      <i 
                        className={platform.icon} 
                        style={{ color: platform.color, fontSize: '1.2rem' }}
                      ></i>
                    </div>
                    <span>{platform.platform}</span>
                  </Button>
                );
              })}
            </div>
            
            {filteredPlatforms.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No platforms found matching your search.
              </div>
            )}
          </ScrollArea>

          {/* Done Button */}
          {selectedPlatforms.length > 0 && (
            <div className="flex justify-end">
              <Button onClick={handleDone}>
                Add {selectedPlatforms.length} {selectedPlatforms.length === 1 ? 'Platform' : 'Platforms'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, X, Coffee, Heart, Edit2 } from "lucide-react";
import TechSearch from "@/components/TechSearch";
import SocialSearch from "@/components/SocialSearch";
// Drag and drop functionality removed

export default function CreateReadmeForm({ data, onChange }) {
  const [techSearchOpen, setTechSearchOpen] = useState(false);
  const [socialSearchOpen, setSocialSearchOpen] = useState(false);
  const [editingHeading, setEditingHeading] = useState(null);
  const [sections, setSections] = useState([
    { id: "profile", title: "👋 About Me" },
    { id: "technologies", title: "🛠️ Technologies & Skills" },
    { id: "socialLinks", title: "🌐 Social Links" },
    { id: "githubStats", title: "📊 GitHub Stats" },
    { id: "projects", title: "🚀 Featured Projects" },
    { id: "support", title: "☕ Support Me" },
    { id: "contact", title: "📫 Contact Me" },
  ]);

  // Initialize default values
  useEffect(() => {
    // Only set default greeting if name is completely empty
    if (!data.profile.name) {
      // Set default greeting if name is empty
      handleProfileChange("name", "Hi 👋, I'm ");
    }
  }, []); // Empty dependency array to run only once on mount

  const handleProfileChange = (field, value) => {
    onChange({
      profile: {
        ...data.profile,
        [field]: value,
      },
    });
  };

  const handleHeadingChange = (headingKey, value) => {
    onChange({
      sectionHeadings: {
        ...data.sectionHeadings,
        [headingKey]: value,
      },
    });
  };

  const handleGithubStatsChange = (field, value) => {
    onChange({
      githubStats: {
        ...data.githubStats,
        [field]: value,
      },
    });
  };

  const addTechnology = (techsToAdd) => {
    // Handle both single tech object and array of techs
    const techArray = Array.isArray(techsToAdd) ? techsToAdd : [techsToAdd];

    // Filter out techs that already exist
    const newTechs = techArray
      .filter((tech) => !data.technologies.find((t) => t.name === tech.name))
      .map((tech) => ({ 
        ...tech, 
        showName: true, // Default to showing name
        selectedProvider: tech.selectedProvider || 'devicons', // Ensure provider is set
        imageUrl: tech.imageUrl || getIconUrl(tech, tech.selectedProvider || 'devicons') // Ensure imageUrl is set
      }));

    if (newTechs.length > 0) {
      onChange({
        technologies: [...data.technologies, ...newTechs],
      });
    }
  };

  const updateTechnology = (techName, field, value) => {
    onChange({
      technologies: data.technologies.map((t) =>
        t.name === techName ? { ...t, [field]: value } : t
      ),
    });
  };

  // Icon provider libraries
  const ICON_LIBRARIES = {
    devicons: {
      name: "Devicons",
      getUrl: (tech) => `https://raw.githubusercontent.com/devicons/devicon/master/icons/${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '')}/${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '')}-original.svg`
    },
    skillicons: {
      name: "Skill Icons", 
      getUrl: (tech) => `https://skillicons.dev/icons?i=${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`
    },
    simpleicons: {
      name: "Simple Icons",
      getUrl: (tech) => `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.svg`
    },
    shields: {
      name: "Shields.io",
      getUrl: (tech) => `https://img.shields.io/badge/${tech.name.replace(/\s+/g, '%20')}-${tech.color?.replace('#', '') || '000000'}?style=for-the-badge&logo=${tech.name.toLowerCase().replace(/[^a-z0-9]/g, '')}&logoColor=white`
    }
  };

  // Helper function to get icon URL based on provider
  const getIconUrl = (tech, provider = 'devicons') => {
    const library = ICON_LIBRARIES[provider];
    if (library && library.getUrl) {
      return library.getUrl(tech);
    }
    return tech.imageUrl || ICON_LIBRARIES.devicons.getUrl(tech);
  };

  const handleProviderChange = (techName, provider) => {
    const tech = data.technologies.find(t => t.name === techName);
    if (tech) {
      // Update both provider and imageUrl in a single call to avoid multiple re-renders
      const newImageUrl = getIconUrl(tech, provider);
      onChange({
        technologies: data.technologies.map((t) =>
          t.name === techName 
            ? { ...t, selectedProvider: provider, imageUrl: newImageUrl } 
            : t
        ),
      });
    }
  };

  const removeTechnology = (techName) => {
    onChange({
      technologies: data.technologies.filter((t) => t.name !== techName),
    });
  };

  const addSocialLink = (social) => {
    // Check if social is an array or a single object
    if (Array.isArray(social)) {
      // Filter out platforms that already exist
      const newSocialLinks = social.filter(
        (s) =>
          !data.socialLinks.find((existing) => existing.platform === s.platform)
      );
      if (newSocialLinks.length > 0) {
        onChange({
          socialLinks: [...data.socialLinks, ...newSocialLinks],
        });
      }
    } else {
      // Handle single social link (for backward compatibility)
      if (!data.socialLinks.find((s) => s.platform === social.platform)) {
        onChange({
          socialLinks: [...data.socialLinks, social],
        });
      }
    }
  };

  const removeSocialLink = (platform) => {
    onChange({
      socialLinks: data.socialLinks.filter((s) => s.platform !== platform),
    });
  };

  const updateSocialLink = (platform, field, value) => {
    onChange({
      socialLinks: data.socialLinks.map((s) =>
        s.platform === platform ? { ...s, [field]: value } : s
      ),
    });
  };

  const addProject = () => {
    onChange({
      projects: [
        ...data.projects,
        { title: "", description: "", link: "", repo: "" },
      ],
    });
  };

  const updateProject = (index, field, value) => {
    const newProjects = [...data.projects];
    newProjects[index][field] = value;
    onChange({ projects: newProjects });
  };

  const removeProject = (index) => {
    onChange({
      projects: data.projects.filter((_, i) => i !== index),
    });
  };

  const handleSupportChange = (field, value) => {
    onChange({
      support: {
        ...data.support,
        [field]: value,
      },
    });
  };

  const handleContactChange = (field, value) => {
    onChange({
      contact: {
        ...data.contact,
        [field]: value,
      },
    });
  };

  // Drag and drop functionality removed

  const EditableHeading = ({ headingKey, defaultText, className = "" }) => {
    const isEditing = editingHeading === headingKey;
    const currentText = data.sectionHeadings[headingKey] || defaultText;

    if (isEditing) {
      return (
        <Input
          value={currentText}
          onChange={(e) => handleHeadingChange(headingKey, e.target.value)}
          onBlur={() => setEditingHeading(null)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setEditingHeading(null);
            }
          }}
          className={`font-semibold text-lg bg-transparent border-dashed ${className}`}
          autoFocus
        />
      );
    }

    return (
      <div
        className={`flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1 rounded ${className}`}
        onClick={() => setEditingHeading(headingKey)}
      >
        <span className="font-semibold text-lg">{currentText}</span>
        <Edit2 className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-8">
        {sections.map((section, index) => (
          <div key={section.id} className="relative">
            {/* About Me */}
            {section.id === "profile" && (
              <Card className="group transform hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center">
                  <CardTitle className="flex items-center gap-2">
                    <EditableHeading
                      headingKey="profile"
                      defaultText={section.title}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Hi 👋, I'm"
                        value={data.profile.name}
                        onChange={(e) =>
                          handleProfileChange("name", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subtitle">Subtitle</Label>
                      <Input
                        id="subtitle"
                        placeholder="A passionate developer from India"
                        value={data.profile.subtitle}
                        onChange={(e) =>
                          handleProfileChange("subtitle", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="welcome">About Me</Label>
                    <Textarea
                      id="welcome"
                      placeholder="I'm currently working on amazing projects..."
                      rows={3}
                      value={data.profile.welcomeMessage}
                      onChange={(e) =>
                        handleProfileChange("welcomeMessage", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="showNameAsHeading"
                      checked={data.profile.showNameAsHeading}
                      onCheckedChange={(checked) =>
                        handleProfileChange("showNameAsHeading", checked)
                      }
                    />
                    <Label
                      htmlFor="showNameAsHeading"
                      className="cursor-pointer"
                    >
                      Use name as heading
                    </Label>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Enhanced Technologies Section with Improved Display */}
            {section.id === "technologies" && (
              <Card className="group transform hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center">
                  <CardTitle>
                    <EditableHeading
                      headingKey="technologies"
                      defaultText={section.title}
                    />
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
                    <div className="space-y-4">
                      <div className="text-sm font-medium text-gray-600">
                        Selected Technologies ({data.technologies.length}):
                      </div>

                      {/* Disclaimer message - moved here */}
                      <div className="text-sm text-muted-foreground bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <i className="fas fa-info-circle mr-2 text-blue-500"></i>
                        If an icon is not visible, please try selecting a different provider from the dropdown.
                      </div>

                      {/* Enhanced Technologies Display with Full Scrolling Support */}
                      <div className="border rounded-lg bg-gray-50/30">
                        <ScrollArea className="h-80 w-full p-4">
                          <div className="space-y-3 pr-4">
                            {data.technologies.map((tech, techIndex) => (
                              <div
                                key={tech.name}
                                className="flex items-center gap-3 p-4 bg-white border rounded-lg hover:shadow-md transition-all duration-200"
                              >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                  {/* Enhanced Icon Display */}
                                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg"
                                    style={{ backgroundColor: tech.bg || `${tech.color}15` }}>
                                    <img
                                      key={`${tech.name}-${tech.selectedProvider || 'devicons'}`}
                                      src={
                                        tech.imageUrl || getIconUrl(tech, tech.selectedProvider || 'devicons')
                                      }
                                      alt={tech.name}
                                      width="28"
                                      height="28"
                                      className="object-contain"
                                      onError={(e) => {
                                        // Fallback to icon class if image fails
                                        e.target.style.display = "none";
                                        const iconEl = e.target.nextElementSibling;
                                        if (iconEl) iconEl.style.display = "inline-block";
                                      }}
                                    />
                                    <i
                                      className={`${tech.icon} text-2xl`}
                                      style={{ 
                                        color: tech.color || "#64748b",
                                        display: "none"
                                      }}
                                    ></i>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                                      <span className="font-medium text-base truncate">
                                        {tech.name}
                                      </span>
                                      <Badge
                                        variant="outline"
                                        className="text-xs px-2 py-1"
                                        style={{
                                          backgroundColor: tech.bg || `${tech.color}15`,
                                          borderColor: (tech.color || "#64748b") + "30",
                                          color: tech.color || "#64748b",
                                        }}
                                      >
                                        {tech.category}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 mb-2">
                                      <div className="flex items-center gap-1">
                                        <Checkbox
                                          checked={tech.showName}
                                          onCheckedChange={(checked) =>
                                            updateTechnology(
                                              tech.name,
                                              "showName",
                                              checked
                                            )
                                          }
                                          id={`show-name-${techIndex}`}
                                        />
                                        <Label
                                          htmlFor={`show-name-${techIndex}`}
                                          className="text-sm text-gray-600 cursor-pointer"
                                        >
                                          Show name
                                        </Label>
                                      </div>
                                      {/* Change Provider Dropdown */}
                                      <div className="flex items-center gap-1">
                                        <Label className="text-sm text-gray-600">
                                          Provider:
                                        </Label>
                                        <Select 
                                          key={`${tech.name}-${tech.selectedProvider || 'devicons'}`}
                                          value={tech.selectedProvider || 'devicons'} 
                                          onValueChange={(value) => handleProviderChange(tech.name, value)}
                                        >
                                          <SelectTrigger className="w-32 h-7 text-xs border border-gray-300 rounded">
                                            <SelectValue placeholder="Select provider" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {Object.entries(ICON_LIBRARIES).map(([key, library]) => (
                                              <SelectItem key={key} value={key}>
                                                {library.name}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeTechnology(tech.name)}
                                  className="flex-shrink-0 hover:bg-red-50 hover:text-red-600 transition-colors"
                                >
                                  <X className="w-5 h-5" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    </div>
                  )}

                  <TechSearch
                    open={techSearchOpen}
                    onOpenChange={setTechSearchOpen}
                    onSelect={addTechnology}
                  />
                </CardContent>
              </Card>
            )}

            {/* Social Links */}
            {section.id === "socialLinks" && (
              <Card className="group transform hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center">
                  <CardTitle>
                    <EditableHeading
                      headingKey="socialLinks"
                      defaultText={section.title}
                    />
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
                        <div
                          key={social.platform}
                          className="flex items-center gap-3 p-3 border rounded-lg hover:shadow-md transition-shadow duration-200"
                        >
                          <div
                            className="flex items-center justify-center w-10 h-10 rounded-full"
                            style={{ backgroundColor: `${social.color}20` }}
                          >
                            <i
                              className={social.icon}
                              style={{
                                color: social.color,
                                fontSize: "1.5rem",
                              }}
                            ></i>
                          </div>
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Input
                              placeholder="Username/Handle"
                              value={social.username || ""}
                              onChange={(e) =>
                                updateSocialLink(
                                  social.platform,
                                  "username",
                                  e.target.value
                                )
                              }
                            />
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={social.showIcon}
                                onCheckedChange={(checked) =>
                                  updateSocialLink(
                                    social.platform,
                                    "showIcon",
                                    checked
                                  )
                                }
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
            )}

            {/* GitHub Stats */}
            {section.id === "githubStats" && (
              <Card className="group transform hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center">
                  <CardTitle>
                    <EditableHeading
                      headingKey="githubStats"
                      defaultText={section.title}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="github-username">GitHub Username</Label>
                    <Input
                      id="github-username"
                      placeholder="your-github-username"
                      value={data.githubStats.username}
                      onChange={(e) =>
                        handleGithubStatsChange("username", e.target.value)
                      }
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="profile-views"
                        checked={data.githubStats.showProfileViews}
                        onCheckedChange={(checked) =>
                          handleGithubStatsChange("showProfileViews", checked)
                        }
                      />
                      <Label htmlFor="profile-views">
                        Show Profile Views Badge
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="github-stats"
                        checked={data.githubStats.showGithubStats}
                        onCheckedChange={(checked) =>
                          handleGithubStatsChange("showGithubStats", checked)
                        }
                      />
                      <Label htmlFor="github-stats">
                        Show GitHub Stats Card
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="streak-stats"
                        checked={data.githubStats.showStreakStats}
                        onCheckedChange={(checked) =>
                          handleGithubStatsChange("showStreakStats", checked)
                        }
                      />
                      <Label htmlFor="streak-stats">Show Streak Stats</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="top-languages"
                        checked={data.githubStats.showTopLanguages}
                        onCheckedChange={(checked) =>
                          handleGithubStatsChange("showTopLanguages", checked)
                        }
                      />
                      <Label htmlFor="top-languages">Show Top Languages</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="activity-graph"
                        checked={data.githubStats.showActivityGraph}
                        onCheckedChange={(checked) =>
                          handleGithubStatsChange("showActivityGraph", checked)
                        }
                      />
                      <Label htmlFor="activity-graph">
                        Show Activity Graph
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Projects */}
            {section.id === "projects" && (
              <Card className="group transform hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center">
                  <CardTitle>
                    <EditableHeading
                      headingKey="projects"
                      defaultText={section.title}
                    />
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
                        <div
                          key={index}
                          className="p-4 border rounded-lg space-y-3 hover:shadow-md transition-shadow duration-200"
                        >
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
                              onChange={(e) =>
                                updateProject(index, "title", e.target.value)
                              }
                            />
                            <Input
                              placeholder="Project Link"
                              value={project.link}
                              onChange={(e) =>
                                updateProject(index, "link", e.target.value)
                              }
                            />
                          </div>

                          <Textarea
                            placeholder="Project Description"
                            rows={2}
                            value={project.description}
                            onChange={(e) =>
                              updateProject(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                          />

                          <Input
                            placeholder="Repository Link (optional)"
                            value={project.repo}
                            onChange={(e) =>
                              updateProject(index, "repo", e.target.value)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Support Me */}
            {section.id === "support" && (
              <Card className="group transform hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center">
                  <CardTitle>
                    <EditableHeading
                      headingKey="support"
                      defaultText={section.title}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="buymeacoffee">
                        Buy Me a Coffee Username
                      </Label>
                      <Input
                        id="buymeacoffee"
                        placeholder="yourusername"
                        value={data.support.buyMeCoffee}
                        onChange={(e) =>
                          handleSupportChange("buyMeCoffee", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="kofi">Ko-fi Username</Label>
                      <Input
                        id="kofi"
                        placeholder="yourusername"
                        value={data.support.kofi}
                        onChange={(e) =>
                          handleSupportChange("kofi", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact */}
            {section.id === "contact" && (
              <Card className="group transform hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="flex flex-row items-center">
                  <CardTitle>
                    <EditableHeading
                      headingKey="contact"
                      defaultText={section.title}
                    />
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
                      onChange={(e) =>
                        handleContactChange("email", e.target.value)
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced scrollbar styles */}
      <style jsx>{`
        [data-radix-scroll-area-viewport] {
          scrollbar-width: auto;
          scrollbar-color: #cbd5e0 #f7fafc;
        }
        
        [data-radix-scroll-area-viewport]::-webkit-scrollbar {
          width: 14px;
          height: 14px;
          background-color: #f7fafc;
        }
        
        [data-radix-scroll-area-viewport]::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 8px;
          border: 2px solid #e2e8f0;
          margin: 2px;
        }
        
        [data-radix-scroll-area-viewport]::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #cbd5e0 0%, #94a3b8 50%, #64748b 100%);
          border-radius: 8px;
          border: 2px solid #f7fafc;
          min-height: 40px;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
        }
        
        [data-radix-scroll-area-viewport]::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #94a3b8 0%, #64748b 50%, #475569 100%);
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.15);
        }
        
        [data-radix-scroll-area-viewport]::-webkit-scrollbar-thumb:active {
          background: linear-gradient(180deg, #64748b 0%, #475569 50%, #334155 100%);
        }

        [data-radix-scroll-area-viewport]::-webkit-scrollbar-corner {
          background: #f7fafc;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
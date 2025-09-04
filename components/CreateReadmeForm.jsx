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
import { Search, Plus, X, Coffee, Heart, Edit2, GripVertical } from "lucide-react";
import TechSearch from "@/components/TechSearch";
import SocialSearch from "@/components/SocialSearch";

// Drag and drop imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Section Component
function SortableSection({ id, children, isDragging }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div className="absolute -left-4 top-4 z-10">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab hover:cursor-grabbing p-2 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Drag to reorder section"
        >
          <GripVertical className="w-4 h-4 text-gray-400 hover:text-gray-600" />
        </div>
      </div>
      {children}
    </div>
  );
}

// Section overlay component for drag preview
function SectionOverlay({ section }) {
  return (
    <Card className="w-80 opacity-90 shadow-lg border-2 border-blue-300 bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{section.title}</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default function CreateReadmeForm({ data, onChange }) {
  const [techSearchOpen, setTechSearchOpen] = useState(false);
  const [socialSearchOpen, setSocialSearchOpen] = useState(false);
  const [editingHeading, setEditingHeading] = useState(null);
  const [activeId, setActiveId] = useState(null);
  
  // Default section data - order will come from parent component
  const defaultSections = [
    { id: "profile", title: "👋 About Me", order: 0 },
    { id: "technologies", title: "🛠️ Technologies & Skills", order: 1 },
    { id: "socialLinks", title: "🌐 Social Links", order: 2 },
    { id: "githubStats", title: "📊 GitHub Stats", order: 3 },
    { id: "projects", title: "🚀 Featured Projects", order: 4 },
    { id: "support", title: "☕ Support Me", order: 5 },
    { id: "contact", title: "📫 Contact Me", order: 6 },
  ];
  
  // Initialize sections based on the section order from parent component
  const [sections, setSections] = useState(() => {
    if (data.sectionOrder && Array.isArray(data.sectionOrder)) {
      return data.sectionOrder.map((id, index) => {
        const defaultSection = defaultSections.find(s => s.id === id);
        return defaultSection ? { ...defaultSection, order: index } : null;
      }).filter(Boolean);
    }
    return defaultSections;
  });

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Update sections when section order changes from parent
  useEffect(() => {
    if (data.sectionOrder && Array.isArray(data.sectionOrder)) {
      // Check if the current sections order is different from parent order
      const currentOrder = sections.map(s => s.id);
      const parentOrder = data.sectionOrder;
      
      // Only update if the orders are actually different
      if (JSON.stringify(currentOrder) !== JSON.stringify(parentOrder)) {
        const newSections = data.sectionOrder.map((id, index) => {
          const defaultSection = defaultSections.find(s => s.id === id);
          return defaultSection ? { ...defaultSection, order: index } : null;
        }).filter(Boolean);
        setSections(newSections);
      }
    }
  }, [data.sectionOrder]);

  // Initialize default values
  useEffect(() => {
    // Only set default greeting if name is completely empty
    if (!data.profile.name) {
      // Set default greeting if name is empty
      handleProfileChange("name", "Hi 👋, I'm ");
    }
  }, []); // Empty dependency array to run only once on mount

  // Update parent component with section order when sections change
  useEffect(() => {
    onChange({
      sectionOrder: sections.map(s => s.id)
    });
  }, [sections]);

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

  // Drag and drop handlers
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over?.id) {
      const oldIndex = sections.findIndex((item) => item.id === active.id);
      const newIndex = sections.findIndex((item) => item.id === over.id);
      
      const newItems = arrayMove(sections, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index
      }));
      
      // Update local state
      setSections(newItems);
      
      // Immediately update parent component with new section order
      onChange({
        sectionOrder: newItems.map(item => item.id)
      });
    }
  };

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

  const renderSectionContent = (section) => {
    switch (section.id) {
      case "profile":
        return (
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
        );

      case "technologies":
        return (
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTechSearchOpen(true)}
                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Technology
              </Button>

              {data.technologies.length > 0 && (
                <ScrollArea className="max-h-80">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-3 p-3 border rounded-lg hover:shadow-md transition-shadow duration-200"
                      >
                        <img
                          src={tech.imageUrl}
                          alt={tech.name}
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            e.target.src = getIconUrl(tech, 'devicons');
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium text-sm truncate">
                              {tech.name}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeTechnology(tech.name)}
                              className="h-6 w-6 p-0 hover:bg-red-100"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={`show-name-${tech.name}`}
                                checked={tech.showName}
                                onCheckedChange={(checked) =>
                                  updateTechnology(tech.name, "showName", checked)
                                }
                              />
                              <Label htmlFor={`show-name-${tech.name}`} className="text-xs">
                                Show name
                              </Label>
                            </div>
                            
                            <Select
                              value={tech.selectedProvider || 'devicons'}
                              onValueChange={(provider) => handleProviderChange(tech.name, provider)}
                            >
                              <SelectTrigger className="h-7 text-xs">
                                <SelectValue placeholder="Icon provider" />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(ICON_LIBRARIES).map(([key, library]) => (
                                  <SelectItem key={key} value={key} className="text-xs">
                                    {library.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}

              <TechSearch
                open={techSearchOpen}
                onOpenChange={setTechSearchOpen}
                onSelect={addTechnology}
              />
            </CardContent>
          </Card>
        );

      case "socialLinks":
        return (
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
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSocialSearchOpen(true)}
                className="flex items-center gap-2 hover:bg-green-50 hover:border-green-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Social Link
              </Button>

              {data.socialLinks.length > 0 && (
                <div className="space-y-3">
                  {data.socialLinks.map((social) => (
                    <div
                      key={social.platform}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:shadow-md transition-shadow duration-200"
                    >
                      <div
                        className="w-8 h-8 rounded flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: social.color }}
                      >
                        {social.platform.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{social.platform}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSocialLink(social.platform)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Username"
                            value={social.username}
                            onChange={(e) =>
                              updateSocialLink(
                                social.platform,
                                "username",
                                e.target.value
                              )
                            }
                            className="h-8"
                          />
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id={`show-icon-${social.platform}`}
                              checked={social.showIcon}
                              onCheckedChange={(checked) =>
                                updateSocialLink(
                                  social.platform,
                                  "showIcon",
                                  checked
                                )
                              }
                            />
                            <Label htmlFor={`show-icon-${social.platform}`} className="text-sm">
                              Icon only
                            </Label>
                          </div>
                        </div>
                      </div>
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
        );

      case "githubStats":
        return (
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
                  placeholder="yourusername"
                  value={data.githubStats.username}
                  onChange={(e) =>
                    handleGithubStatsChange("username", e.target.value)
                  }
                />
              </div>

              <Separator />

              <div className="space-y-3">
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
        );

      case "projects":
        return (
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
        );

      case "support":
        return (
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
        );

      case "contact":
        return (
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
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-8 pl-8">
          <SortableContext 
            items={sections.map(s => s.id)} 
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section) => (
              <SortableSection 
                key={section.id} 
                id={section.id}
                isDragging={activeId === section.id}
              >
                {renderSectionContent(section)}
              </SortableSection>
            ))}
          </SortableContext>
        </div>

        <DragOverlay>
          {activeId ? (
            <SectionOverlay 
              section={sections.find(s => s.id === activeId)} 
            />
          ) : null}
        </DragOverlay>
      </DndContext>

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
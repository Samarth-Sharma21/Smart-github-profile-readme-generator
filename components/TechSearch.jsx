"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, X } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

// Icon libraries with their display names (removed simple icons and react icons)
const ICON_LIBRARIES = {
  devicon: "Devicon",
};

// Enhanced technology list (removed simple icons and react icons entries)
const TECHNOLOGIES = [
  // Devicon technologies with fixed URLs
  {
    name: "JavaScript",
    icon: "devicon-javascript-plain",
    category: "Language",
    color: "#F7DF1E",
    bg: "#F7DF1E20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    icon: "devicon-typescript-plain",
    category: "Language",
    color: "#3178C6",
    bg: "#3178C620",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    icon: "devicon-react-original",
    category: "Framework",
    color: "#61DAFB",
    bg: "#61DAFB20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "devicon-nextjs-original",
    category: "Framework",
    color: "#000000",
    bg: "#00000020",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Vue.js",
    icon: "devicon-vuejs-plain",
    category: "Framework",
    color: "#4FC08D",
    bg: "#4FC08D20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  {
    name: "Angular",
    icon: "devicon-angularjs-plain",
    category: "Framework",
    color: "#DD0031",
    bg: "#DD003120",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  },
  {
    name: "Svelte",
    icon: "devicon-svelte-plain",
    category: "Framework",
    color: "#FF3E00",
    bg: "#FF3E0020",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
  },
  {
    name: "Node.js",
    icon: "devicon-nodejs-plain",
    category: "Runtime",
    color: "#339933",
    bg: "#33993320",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Python",
    icon: "devicon-python-plain",
    category: "Language",
    color: "#3776AB",
    bg: "#3776AB20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Java",
    icon: "devicon-java-plain",
    category: "Language",
    color: "#ED8B00",
    bg: "#ED8B0020",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "C++",
    icon: "devicon-cplusplus-plain",
    category: "Language",
    color: "#00599C",
    bg: "#00599C20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "C#",
    icon: "devicon-csharp-plain",
    category: "Language",
    color: "#239120",
    bg: "#23912020",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  {
    name: "PHP",
    icon: "devicon-php-plain",
    category: "Language",
    color: "#777BB4",
    bg: "#777BB420",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  {
    name: "Ruby",
    icon: "devicon-ruby-plain",
    category: "Language",
    color: "#CC342D",
    bg: "#CC342D20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  },
  {
    name: "Go",
    icon: "devicon-go-plain",
    category: "Language",
    color: "#00ADD8",
    bg: "#00ADD820",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  },
  {
    name: "Rust",
    icon: "devicon-rust-plain",
    category: "Language",
    color: "#000000",
    bg: "#00000020",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  },
  {
    name: "Swift",
    icon: "devicon-swift-plain",
    category: "Language",
    color: "#FA7343",
    bg: "#FA734320",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  },
  {
    name: "Kotlin",
    icon: "devicon-kotlin-plain",
    category: "Language",
    color: "#0095D5",
    bg: "#0095D520",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  },
  {
    name: "Dart",
    icon: "devicon-dart-plain",
    category: "Language",
    color: "#0175C2",
    bg: "#0175C220",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  },
  {
    name: "HTML5",
    icon: "devicon-html5-plain",
    category: "Markup",
    color: "#E34F26",
    bg: "#E34F2620",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "devicon-css3-plain",
    category: "Styling",
    color: "#1572B6",
    bg: "#1572B620",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "Sass",
    icon: "devicon-sass-original",
    category: "Styling",
    color: "#CC6699",
    bg: "#CC669920",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "devicon-tailwindcss-plain",
    category: "Styling",
    color: "#38B2AC",
    bg: "#38B2AC20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Bootstrap",
    icon: "devicon-bootstrap-plain",
    category: "Styling",
    color: "#7952B3",
    bg: "#7952B320",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "Express.js",
    icon: "devicon-express-original",
    category: "Backend",
    color: "#000000",
    bg: "#00000020",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "Django",
    icon: "devicon-django-plain",
    category: "Backend",
    color: "#092E20",
    bg: "#092E2020",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  },
  {
    name: "Flask",
    icon: "devicon-flask-original",
    category: "Backend",
    color: "#000000",
    bg: "#00000020",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  },
  {
    name: "Spring",
    icon: "devicon-spring-plain",
    category: "Backend",
    color: "#6DB33F",
    bg: "#6DB33F20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
  {
    name: "Laravel",
    icon: "devicon-laravel-plain",
    category: "Backend",
    color: "#FF2D20",
    bg: "#FF2D2020",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  },
  {
    name: "MongoDB",
    icon: "devicon-mongodb-plain",
    category: "Database",
    color: "#47A248",
    bg: "#47A24820",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "devicon-postgresql-plain",
    category: "Database",
    color: "#4169E1",
    bg: "#4169E120",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MySQL",
    icon: "devicon-mysql-plain",
    category: "Database",
    color: "#4479A1",
    bg: "#4479A120",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "Redis",
    icon: "devicon-redis-plain",
    category: "Database",
    color: "#DC382D",
    bg: "#DC382D20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "SQLite",
    icon: "devicon-sqlite-plain",
    category: "Database",
    color: "#003B57",
    bg: "#003B5720",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  },
  {
    name: "Firebase",
    icon: "devicon-firebase-plain",
    category: "Backend",
    color: "#FFCA28",
    bg: "#FFCA2820",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",
  },
  {
    name: "AWS",
    icon: "devicon-amazonwebservices-original",
    category: "Cloud",
    color: "#FF9900",
    bg: "#FF990020",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  },
  {
    name: "Google Cloud",
    icon: "devicon-googlecloud-plain",
    category: "Cloud",
    color: "#4285F4",
    bg: "#4285F420",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  },
  {
    name: "Azure",
    icon: "devicon-azure-plain",
    category: "Cloud",
    color: "#0078D4",
    bg: "#0078D420",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  },
  {
    name: "Docker",
    icon: "devicon-docker-plain",
    category: "DevOps",
    color: "#2496ED",
    bg: "#2496ED20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Podman",
    icon: "devicon-podman-plain",
    category: "DevOps",
    color: "#892CA0",
    bg: "#892CA020",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/podman/podman-original.svg",
  },
  {
    name: "Kubernetes",
    icon: "devicon-kubernetes-plain",
    category: "DevOps",
    color: "#326CE5",
    bg: "#326CE520",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg",
  },
  {
    name: "Jenkins",
    icon: "devicon-jenkins-line",
    category: "DevOps",
    color: "#D24939",
    bg: "#D2493920",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  },
  {
    name: "Git",
    icon: "devicon-git-plain",
    category: "Version Control",
    color: "#F05032",
    bg: "#F0503220",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    icon: "devicon-github-original",
    category: "Version Control",
    color: "#181717",
    bg: "#18171720",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "GitLab",
    icon: "devicon-gitlab-plain",
    category: "Version Control",
    color: "#FCA326",
    bg: "#FCA32620",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
  },
  {
    name: "Nginx",
    icon: "devicon-nginx-original",
    category: "Web Server",
    color: "#009639",
    bg: "#00963920",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  },
  {
    name: "Apache",
    icon: "devicon-apache-plain",
    category: "Web Server",
    color: "#D22128",
    bg: "#D2212820",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
  },
  {
    name: "VS Code",
    icon: "devicon-vscode-plain",
    category: "Editor",
    color: "#007ACC",
    bg: "#007ACC20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  {
    name: "Vim",
    icon: "devicon-vim-plain",
    category: "Editor",
    color: "#019733",
    bg: "#01973320",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg",
  },
  {
    name: "Webpack",
    icon: "devicon-webpack-plain",
    category: "Build Tool",
    color: "#8DD6F9",
    bg: "#8DD6F920",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
  },
  {
    name: "Vite",
    icon: "devicon-vite-original",
    category: "Build Tool",
    color: "#646CFF",
    bg: "#646CFF20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  },
  {
    name: "Babel",
    icon: "devicon-babel-plain",
    category: "Build Tool",
    color: "#F9DC3E",
    bg: "#F9DC3E20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg",
  },
  {
    name: "ESLint",
    icon: "devicon-eslint-original",
    category: "Linting",
    color: "#4B32C3",
    bg: "#4B32C320",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg",
  },
  {
    name: "Prettier",
    icon: "devicon-prettier-plain",
    category: "Formatting",
    color: "#F7B93E",
    bg: "#F7B93E20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prettier/prettier-original.svg",
  },
  {
    name: "Jest",
    icon: "devicon-jest-plain",
    category: "Testing",
    color: "#C21325",
    bg: "#C2132520",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  },
  {
    name: "Cypress",
    icon: "devicon-cypress-plain",
    category: "Testing",
    color: "#17202C",
    bg: "#17202C20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg",
  },
  {
    name: "Flutter",
    icon: "devicon-flutter-plain",
    category: "Mobile Framework",
    color: "#02569B",
    bg: "#02569B20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  {
    name: "React Native",
    icon: "devicon-react-original",
    category: "Mobile Framework",
    color: "#61DAFB",
    bg: "#61DAFB20",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Android",
    icon: "devicon-android-plain",
    category: "Mobile",
    color: "#3DDC84",
    bg: "#3DDC8420",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
  },
  {
    name: "iOS",
    icon: "devicon-apple-original",
    category: "Mobile",
    color: "#000000",
    bg: "#00000020",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
  },
  {
    name: "Linux",
    icon: "devicon-linux-plain",
    category: "Operating System",
    color: "#FCC624",
    bg: "#FCC62420",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  {
    name: "Ubuntu",
    icon: "devicon-ubuntu-plain",
    category: "Operating System",
    color: "#E95420",
    bg: "#E9542020",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg",
  },
  {
    name: "Windows",
    icon: "devicon-windows8-original",
    category: "Operating System",
    color: "#0078D6",
    bg: "#0078D620",
    library: "devicon",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
  },
];

// Categories for filtering
const CATEGORIES = [
  "Language",
  "Framework",
  "Database",
  "Cloud",
  "DevOps",
  "Version Control",
  "Styling",
  "Backend",
  "Runtime",
  "Markup",
  "Web Server",
  "Editor",
  "Build Tool",
  "Linting",
  "Formatting",
  "Testing",
  "Mobile Framework",
  "Mobile",
  "Operating System",
];

export default function TechSearch({ open, onOpenChange, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTechs, setSelectedTechs] = useState([]);

  const filteredTechnologies = useMemo(() => {
    return TECHNOLOGIES.filter((tech) => {
      const matchesSearch = tech.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || tech.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleSelect = (tech) => {
    // Toggle selection
    if (selectedTechs.some((t) => t.name === tech.name)) {
      setSelectedTechs(selectedTechs.filter((t) => t.name !== tech.name));
    } else {
      setSelectedTechs([...selectedTechs, tech]);
    }
  };

  const handleDone = () => {
    // Send all selected technologies to parent component at once
    if (selectedTechs.length > 0) {
      // Call onSelect with all selected technologies as an array
      onSelect(selectedTechs);
      setSelectedTechs([]);
      setSearchTerm("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Add Technology</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col flex-1 min-h-0 space-y-4 overflow-hidden">
          {/* Search Input */}
          <div className="relative flex-shrink-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 flex-shrink-0">
            <Button
              variant={selectedCategory === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("All")}
            >
              All
            </Button>
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Enhanced Selected Technologies Section with Better Scrolling */}
          {selectedTechs.length > 0 && (
            <div className="flex-shrink-0 border rounded-lg p-4 bg-gray-50/50">
              <div className="text-sm font-medium mb-3 text-gray-700">
                Selected Technologies ({selectedTechs.length}):
              </div>
              {/* Enhanced ScrollArea with custom scrollbar styling */}
              <ScrollArea className="max-h-32 w-full rounded-md">
                <div className="flex flex-wrap gap-2 pb-2 pr-4">
                  {selectedTechs.map((tech) => (
                    <Badge
                      key={tech.name}
                      variant="outline"
                      className="flex items-center gap-2 px-3 py-2 flex-shrink-0 bg-white hover:bg-gray-50 transition-colors"
                      style={{
                        backgroundColor: tech.bg || `${tech.color}10`,
                        borderColor: tech.color + "40",
                        color: tech.color,
                      }}
                    >
                      <img
                        src={
                          tech.imageUrl ||
                          `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.name.toLowerCase()}/${tech.name.toLowerCase()}-original.svg`
                        }
                        alt={tech.name}
                        width="18"
                        height="18"
                        className="object-contain flex-shrink-0"
                        onError={(e) => {
                          // Fallback to icon class if image fails
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "inline-block";
                        }}
                      />
                      <i
                        className={`${tech.icon} text-lg flex-shrink-0`}
                        style={{ color: tech.color, display: "none" }}
                      ></i>
                      <span className="text-sm font-medium">{tech.name}</span>
                      <X
                        className="w-4 h-4 ml-1 cursor-pointer flex-shrink-0 hover:text-red-500 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTechs(
                            selectedTechs.filter((t) => t.name !== tech.name)
                          );
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Technology Grid - Improved Scrolling */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <ScrollArea className="h-full w-full rounded-lg border bg-white">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4 max-h-96">
                {filteredTechnologies.map((tech) => {
                  const isSelected = selectedTechs.some(
                    (t) => t.name === tech.name
                  );
                  return (
                    <Button
                      key={tech.name}
                      variant={isSelected ? "default" : "outline"}
                      className={`flex items-center gap-2 h-12 justify-start hover:shadow-md transition-all duration-200 ${
                        isSelected ? "border-2 shadow-lg" : ""
                      }`}
                      style={{
                        backgroundColor: isSelected
                          ? tech.color + "30"
                          : tech.bg,
                        borderColor: tech.color + (isSelected ? "60" : "30"),
                      }}
                      onClick={() => handleSelect(tech)}
                    >
                      <img
                        src={
                          tech.imageUrl ||
                          `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.name.toLowerCase()}/${tech.name.toLowerCase()}-original.svg`
                        }
                        alt={tech.name}
                        width="24"
                        height="24"
                        className="object-contain flex-shrink-0"
                        onError={(e) => {
                          // Fallback to icon class if image fails
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "inline-block";
                        }}
                      />
                      <i
                        className={`${tech.icon} text-xl flex-shrink-0`}
                        style={{ color: tech.color, display: "none" }}
                      ></i>
                      <span className="text-sm font-medium truncate">
                        {tech.name}
                      </span>
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
          </div>

          {/* Fixed Done Button - Always Visible */}
          <div className="flex justify-end pt-4 border-t flex-shrink-0 bg-white sticky bottom-0">
            <Button
              onClick={handleDone}
              disabled={selectedTechs.length === 0}
              className="px-6 py-2 font-semibold"
              size="lg"
            >
              Add Selected ({selectedTechs.length})
            </Button>
          </div>
        </div>

        {/* Enhanced custom scrollbar styles */}
        <style jsx>{`
          .scroll-area-viewport {
            scrollbar-width: thin;
            scrollbar-color: #cbd5e0 #f7fafc;
          }
          
          .scroll-area-viewport::-webkit-scrollbar {
            width: 12px;
            height: 12px;
          }
          
          .scroll-area-viewport::-webkit-scrollbar-track {
            background: #f7fafc;
            border-radius: 6px;
          }
          
          .scroll-area-viewport::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #e2e8f0 0%, #cbd5e0 100%);
            border-radius: 6px;
            border: 2px solid #f7fafc;
          }
          
          .scroll-area-viewport::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #cbd5e0 0%, #a0aec0 100%);
          }
          
          .scroll-area-viewport::-webkit-scrollbar-thumb:active {
            background: linear-gradient(180deg, #a0aec0 0%, #718096 100%);
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
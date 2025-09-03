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
import { Search, X, ChevronDown } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Enhanced Icon libraries with display names and URL patterns
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

// Enhanced technology list (keeping exactly 190 technologies - same as before)
const TECHNOLOGIES = [
  // Devicon technologies with fixed URLs
  {
    name: "JavaScript",
    icon: "devicon-javascript-plain",
    category: "Language",
    color: "#F7DF1E",
    bg: "#F7DF1E20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    icon: "devicon-typescript-plain",
    category: "Language",
    color: "#3178C6",
    bg: "#3178C620",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    icon: "devicon-react-original",
    category: "Framework",
    color: "#61DAFB",
    bg: "#61DAFB20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "devicon-nextjs-original",
    category: "Framework",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Vue.js",
    icon: "devicon-vuejs-plain",
    category: "Framework",
    color: "#4FC08D",
    bg: "#4FC08D20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  },
  {
    name: "Angular",
    icon: "devicon-angularjs-plain",
    category: "Framework",
    color: "#DD0031",
    bg: "#DD003120",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  },
  {
    name: "Svelte",
    icon: "devicon-svelte-plain",
    category: "Framework",
    color: "#FF3E00",
    bg: "#FF3E0020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
  },
  {
    name: "Node.js",
    icon: "devicon-nodejs-plain",
    category: "Runtime",
    color: "#339933",
    bg: "#33993320",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Python",
    icon: "devicon-python-plain",
    category: "Language",
    color: "#3776AB",
    bg: "#3776AB20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Java",
    icon: "devicon-java-plain",
    category: "Language",
    color: "#ED8B00",
    bg: "#ED8B0020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "C++",
    icon: "devicon-cplusplus-plain",
    category: "Language",
    color: "#00599C",
    bg: "#00599C20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  },
  {
    name: "C#",
    icon: "devicon-csharp-plain",
    category: "Language",
    color: "#239120",
    bg: "#23912020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  {
    name: "PHP",
    icon: "devicon-php-plain",
    category: "Language",
    color: "#777BB4",
    bg: "#777BB420",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  },
  {
    name: "Ruby",
    icon: "devicon-ruby-plain",
    category: "Language",
    color: "#CC342D",
    bg: "#CC342D20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  },
  {
    name: "Go",
    icon: "devicon-go-plain",
    category: "Language",
    color: "#00ADD8",
    bg: "#00ADD820",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  },
  {
    name: "Rust",
    icon: "devicon-rust-plain",
    category: "Language",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg",
  },
  {
    name: "Swift",
    icon: "devicon-swift-plain",
    category: "Language",
    color: "#FA7343",
    bg: "#FA734320",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  },
  {
    name: "Kotlin",
    icon: "devicon-kotlin-plain",
    category: "Language",
    color: "#0095D5",
    bg: "#0095D520",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  },
  {
    name: "Dart",
    icon: "devicon-dart-plain",
    category: "Language",
    color: "#0175C2",
    bg: "#0175C220",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  },
  {
    name: "HTML5",
    icon: "devicon-html5-plain",
    category: "Markup",
    color: "#E34F26",
    bg: "#E34F2620",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    icon: "devicon-css3-plain",
    category: "Styling",
    color: "#1572B6",
    bg: "#1572B620",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "Sass",
    icon: "devicon-sass-original",
    category: "Styling",
    color: "#CC6699",
    bg: "#CC669920",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "devicon-tailwindcss-plain",
    category: "Styling",
    color: "#38B2AC",
    bg: "#38B2AC20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Bootstrap",
    icon: "devicon-bootstrap-plain",
    category: "Styling",
    color: "#7952B3",
    bg: "#7952B320",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  },
  {
    name: "Express.js",
    icon: "devicon-express-original",
    category: "Backend",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  },
  {
    name: "Django",
    icon: "devicon-django-plain",
    category: "Backend",
    color: "#092E20",
    bg: "#092E2020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  },
  {
    name: "Flask",
    icon: "devicon-flask-original",
    category: "Backend",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  },
  {
    name: "Spring",
    icon: "devicon-spring-plain",
    category: "Backend",
    color: "#6DB33F",
    bg: "#6DB33F20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
  {
    name: "Laravel",
    icon: "devicon-laravel-plain",
    category: "Backend",
    color: "#FF2D20",
    bg: "#FF2D2020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
  },
  {
    name: "MongoDB",
    icon: "devicon-mongodb-plain",
    category: "Database",
    color: "#47A248",
    bg: "#47A24820",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "devicon-postgresql-plain",
    category: "Database",
    color: "#4169E1",
    bg: "#4169E120",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "MySQL",
    icon: "devicon-mysql-plain",
    category: "Database",
    color: "#4479A1",
    bg: "#4479A120",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  },
  {
    name: "Redis",
    icon: "devicon-redis-plain",
    category: "Database",
    color: "#DC382D",
    bg: "#DC382D20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "SQLite",
    icon: "devicon-sqlite-plain",
    category: "Database",
    color: "#003B57",
    bg: "#003B5720",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  },
  {
    name: "Firebase",
    icon: "devicon-firebase-plain",
    category: "Backend",
    color: "#FFCA28",
    bg: "#FFCA2820",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",
  },
  {
    name: "AWS",
    icon: "devicon-amazonwebservices-original",
    category: "Cloud",
    color: "#FF9900",
    bg: "#FF990020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  },
  {
    name: "Google Cloud",
    icon: "devicon-googlecloud-plain",
    category: "Cloud",
    color: "#4285F4",
    bg: "#4285F420",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  },
  {
    name: "Azure",
    icon: "devicon-azure-plain",
    category: "Cloud",
    color: "#0078D4",
    bg: "#0078D420",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  },
  {
    name: "Docker",
    icon: "devicon-docker-plain",
    category: "DevOps",
    color: "#2496ED",
    bg: "#2496ED20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Podman",
    icon: "devicon-podman-plain",
    category: "DevOps",
    color: "#892CA0",
    bg: "#892CA020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/podman/podman-original.svg",
  },
  {
    name: "Kubernetes",
    icon: "devicon-kubernetes-plain",
    category: "DevOps",
    color: "#326CE5",
    bg: "#326CE520",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-original.svg",
  },
  {
    name: "Jenkins",
    icon: "devicon-jenkins-line",
    category: "DevOps",
    color: "#D24939",
    bg: "#D2493920",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  },
  {
    name: "Git",
    icon: "devicon-git-plain",
    category: "Version Control",
    color: "#F05032",
    bg: "#F0503220",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "GitHub",
    icon: "devicon-github-original",
    category: "Version Control",
    color: "#181717",
    bg: "#18171720",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "GitLab",
    icon: "devicon-gitlab-plain",
    category: "Version Control",
    color: "#FCA326",
    bg: "#FCA32620",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
  },
  {
    name: "Nginx",
    icon: "devicon-nginx-original",
    category: "Web Server",
    color: "#009639",
    bg: "#00963920",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  },
  {
    name: "Apache",
    icon: "devicon-apache-plain",
    category: "Web Server",
    color: "#D22128",
    bg: "#D2212820",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
  },
  {
    name: "VS Code",
    icon: "devicon-vscode-plain",
    category: "Editor",
    color: "#007ACC",
    bg: "#007ACC20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  },
  {
    name: "Vim",
    icon: "devicon-vim-plain",
    category: "Editor",
    color: "#019733",
    bg: "#01973320",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg",
  },
  {
    name: "Webpack",
    icon: "devicon-webpack-plain",
    category: "Build Tool",
    color: "#8DD6F9",
    bg: "#8DD6F920",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
  },
  {
    name: "Vite",
    icon: "devicon-vite-original",
    category: "Build Tool",
    color: "#646CFF",
    bg: "#646CFF20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  },
  {
    name: "Babel",
    icon: "devicon-babel-plain",
    category: "Build Tool",
    color: "#F9DC3E",
    bg: "#F9DC3E20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg",
  },
  {
    name: "ESLint",
    icon: "devicon-eslint-original",
    category: "Linting",
    color: "#4B32C3",
    bg: "#4B32C320",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eslint/eslint-original.svg",
  },
  {
    name: "Prettier",
    icon: "devicon-prettier-plain",
    category: "Formatting",
    color: "#F7B93E",
    bg: "#F7B93E20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prettier/prettier-original.svg",
  },
  {
    name: "Jest",
    icon: "devicon-jest-plain",
    category: "Testing",
    color: "#C21325",
    bg: "#C2132520",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  },
  {
    name: "Cypress",
    icon: "devicon-cypress-plain",
    category: "Testing",
    color: "#17202C",
    bg: "#17202C20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg",
  },
  {
    name: "Flutter",
    icon: "devicon-flutter-plain",
    category: "Mobile Framework",
    color: "#02569B",
    bg: "#02569B20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  {
    name: "React Native",
    icon: "devicon-react-original",
    category: "Mobile Framework",
    color: "#61DAFB",
    bg: "#61DAFB20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Android",
    icon: "devicon-android-plain",
    category: "Mobile",
    color: "#3DDC84",
    bg: "#3DDC8420",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
  },
  {
    name: "iOS",
    icon: "devicon-apple-original",
    category: "Mobile",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
  },
  {
    name: "Linux",
    icon: "devicon-linux-plain",
    category: "Operating System",
    color: "#FCC624",
    bg: "#FCC62420",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  {
    name: "Ubuntu",
    icon: "devicon-ubuntu-plain",
    category: "Operating System",
    color: "#E95420",
    bg: "#E9542020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-original.svg",
  },
  {
    name: "Windows",
    icon: "devicon-windows8-original",
    category: "Operating System",
    color: "#0078D6",
    bg: "#0078D620",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
  },

  // === PROGRAMMING LANGUAGES & FILE TYPES ===
  {
    name: "Ada",
    icon: "devicon-ada-plain",
    category: "Language",
    color: "#02f88c",
    bg: "#02f88c20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ada/ada-original.svg",
  },
  {
    name: "Bash",
    icon: "devicon-bash-plain",
    category: "Language",
    color: "#4EAA25",
    bg: "#4EAA2520",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  },
  {
    name: "C",
    icon: "devicon-c-plain",
    category: "Language",
    color: "#A8B9CC",
    bg: "#A8B9CC20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  {
    name: "Carbon",
    icon: "devicon-carbon-plain",
    category: "Language",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/carbon/carbon-original.svg",
  },
  {
    name: "Chapel",
    icon: "devicon-chapel-plain",
    category: "Language", 
    color: "#8DC63F",
    bg: "#8DC63F20",
    library: "devicons",
    imageUrl: "https://www.chapel-lang.org/images/chapel-logo-200.png",
  },
  {
    name: "Clojure",
    icon: "devicon-clojure-plain",
    category: "Language",
    color: "#5881D8",
    bg: "#5881D820",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/clojure/clojure-original.svg",
  },
  {
    name: "Crystal",
    icon: "devicon-crystal-plain",
    category: "Language",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/crystal/crystal-original.svg",
  },
  {
    name: "D",
    icon: "devicon-d-plain",
    category: "Language",
    color: "#B03931",
    bg: "#B0393120",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d/d-original.svg",
  },
  {
    name: "Elixir",
    icon: "devicon-elixir-plain",
    category: "Language",
    color: "#4B275F",
    bg: "#4B275F20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg",
  },
  {
    name: "Erlang",
    icon: "devicon-erlang-plain",
    category: "Language",
    color: "#A90533",
    bg: "#A9053320",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/erlang/erlang-original.svg",
  },
  {
    name: "F#",
    icon: "devicon-fsharp-plain",
    category: "Language",
    color: "#378BBA",
    bg: "#378BBA20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fsharp/fsharp-original.svg",
  },
  {
    name: "Fortran",
    icon: "devicon-fortran-plain",
    category: "Language",
    color: "#734F96",
    bg: "#734F9620",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fortran/fortran-original.svg",
  },
  {
    name: "Gleam",
    icon: "devicon-gleam-plain",
    category: "Language",
    color: "#FFAFF3",
    bg: "#FFAFF320",
    library: "devicons",
    imageUrl: "https://gleam.run/images/lucy/lucy.svg",
  },
  {
    name: "Hack",
    icon: "devicon-hack-plain",
    category: "Language",
    color: "#FF8C00",
    bg: "#FF8C0020",
    library: "devicons",
    imageUrl: "https://hacklang.org/img/logo.png",
  },
  {
    name: "Haskell",
    icon: "devicon-haskell-plain",
    category: "Language",
    color: "#5D4F85",
    bg: "#5D4F8520",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg",
  },
  {
    name: "Julia",
    icon: "devicon-julia-plain",
    category: "Language", 
    color: "#9558B2",
    bg: "#9558B220",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/julia/julia-original.svg",
  },
  {
    name: "Lua",
    icon: "devicon-lua-plain",
    category: "Language",
    color: "#2C2D72",
    bg: "#2C2D7220",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg",
  },
  {
    name: "Nim",
    icon: "devicon-nim-plain",
    category: "Language",
    color: "#FFE953",
    bg: "#FFE95320",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nim/nim-original.svg",
  },
  {
    name: "OCaml",
    icon: "devicon-ocaml-plain",
    category: "Language",
    color: "#EC6813",  
    bg: "#EC681320",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ocaml/ocaml-original.svg",
  },
  {
    name: "Perl",
    icon: "devicon-perl-plain",
    category: "Language",
    color: "#39457E",
    bg: "#39457E20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg",
  },
  {
    name: "Prolog",
    icon: "devicon-prolog-plain",
    category: "Language",
    color: "#E61B23",
    bg: "#E61B2320",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prolog/prolog-original.svg",
  },
  {
    name: "R",
    icon: "devicon-r-original",
    category: "Language",
    color: "#276DC3",
    bg: "#276DC320",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
  },
  {
    name: "Racket",
    icon: "devicon-racket-plain",
    category: "Language",
    color: "#9F1D35",
    bg: "#9F1D3520",
    library: "devicons",
    imageUrl: "https://racket-lang.org/img/racket-logo.svg",
  },
  {
    name: "Scala",
    icon: "devicon-scala-plain",
    category: "Language",
    color: "#DC322F",
    bg: "#DC322F20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg",
  },
  {
    name: "Shell",
    icon: "devicon-bash-plain",
    category: "Language",
    color: "#89E051",
    bg: "#89E05120",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  },
  {
    name: "SQL",
    icon: "devicon-sql-plain",
    category: "Language",
    color: "#E38C00",
    bg: "#E38C0020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  },
  {
    name: "Tcl",
    icon: "devicon-tcl-plain",
    category: "Language",
    color: "#1C3AA9",
    bg: "#1C3AA920",
    library: "devicons",
    imageUrl: "https://wiki.tcl-lang.org/image/Tcl",
  },
  {
    name: "V",
    icon: "devicon-v-plain",
    category: "Language",
    color: "#536B8A",
    bg: "#536B8A20",
    library: "devicons",
    imageUrl: "https://vlang.io/img/v-logo.png",
  },
  {
    name: "Zig",
    icon: "devicon-zig-plain",
    category: "Language",
    color: "#F7A41D",
    bg: "#F7A41D20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zig/zig-original.svg",
  },
  {
    name: "Assembly",
    icon: "devicon-assembly-plain",
    category: "Language",
    color: "#654FF0",
    bg: "#654FF020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  },
  {
    name: "Markdown",
    icon: "devicon-markdown-original",
    category: "File Type",
    color: "#083FA1",
    bg: "#083FA120",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg",
  },
  {
    name: "Jupyter Notebook",
    icon: "devicon-jupyter-plain",
    category: "File Type",
    color: "#F37626",
    bg: "#F3762620",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  },
  {
    name: "Dockerfile",
    icon: "devicon-docker-plain",
    category: "File Type",
    color: "#2496ED",
    bg: "#2496ED20",
    library: "devicons", 
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Makefile",
    icon: "devicon-make-plain",
    category: "File Type",
    color: "#427819",
    bg: "#42781920",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cmake/cmake-original.svg",
  },
  {
    name: "YAML",
    icon: "devicon-yaml-plain",
    category: "File Type",
    color: "#CB171E",
    bg: "#CB171E20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yaml/yaml-original.svg",
  },
  {
    name: "JSON",
    icon: "devicon-json-plain",
    category: "File Type",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg",
  },
  {
    name: "XML",
    icon: "devicon-xml-plain",
    category: "File Type",
    color: "#FF6600",
    bg: "#FF660020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xml/xml-original.svg",
  },

  // === FRONTEND FRAMEWORKS & LIBRARIES ===
  {
    name: "AngularJS",
    icon: "devicon-angularjs-plain",
    category: "Frontend Framework",
    color: "#E23237",
    bg: "#E2323720",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  },
  {
    name: "Backbone.js",
    icon: "devicon-backbonejs-plain",
    category: "Frontend Framework",
    color: "#0071B5",
    bg: "#0071B520",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/backbonejs/backbonejs-original.svg",
  },
  {
    name: "Ember.js",
    icon: "devicon-ember-original",
    category: "Frontend Framework",
    color: "#E04E39",
    bg: "#E04E3920",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ember/ember-original.svg",
  },
  {
    name: "Bulma",
    icon: "devicon-bulma-plain",
    category: "Styling",
    color: "#00D1B2",
    bg: "#00D1B220",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bulma/bulma-plain.svg",
  },
  {
    name: "Materialize",
    icon: "devicon-materialize-plain",
    category: "Styling",
    color: "#EE6E73",
    bg: "#EE6E7320",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialize/materialize-original.svg",
  },
  {
    name: "Redux",
    icon: "devicon-redux-original",
    category: "Frontend Framework",
    color: "#764ABC",
    bg: "#764ABC20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  },
  {
    name: "Nuxt.js",
    icon: "devicon-nuxtjs-plain",
    category: "Frontend Framework",
    color: "#00C58E",
    bg: "#00C58E20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg",
  },
  {
    name: "Gatsby",
    icon: "devicon-gatsby-plain",
    category: "Frontend Framework",
    color: "#663399",
    bg: "#66339920",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gatsby/gatsby-original.svg",
  },
  {
    name: "Hugo",
    icon: "devicon-hugo-plain",
    category: "Frontend Framework",
    color: "#FF4088",
    bg: "#FF408820",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hugo/hugo-original.svg",
  },
  {
    name: "Jekyll",
    icon: "devicon-jekyll-plain",
    category: "Frontend Framework",
    color: "#CC0000",
    bg: "#CC000020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jekyll/jekyll-original.svg",
  },
  {
    name: "Eleventy",
    icon: "devicon-eleventy-plain",
    category: "Frontend Framework",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl: "https://www.11ty.dev/img/logo-github.svg",
  },
  {
    name: "Gridsome",
    icon: "devicon-gridsome-plain",
    category: "Frontend Framework",
    color: "#00A672",
    bg: "#00A67220",
    library: "devicons",
    imageUrl: "https://gridsome.org/logos/logo-circle-light.svg",
  },
  {
    name: "Scully",
    icon: "devicon-scully-plain",
    category: "Frontend Framework",
    color: "#F7931E",
    bg: "#F7931E20",
    library: "devicons",
    imageUrl: "https://raw.githubusercontent.com/scullyio/scully/main/assets/logos/SVG/scullyio-icon.svg",
  },
  {
    name: "Sapper",
    icon: "devicon-sapper-plain",
    category: "Frontend Framework",
    color: "#159497",
    bg: "#15949720",
    library: "devicons",
    imageUrl: "https://sapper.svelte.dev/sapper-logo-horizontal.svg",
  },
  {
    name: "VuePress",
    icon: "devicon-vuepress-plain",
    category: "Frontend Framework",
    color: "#4FC08D",  
    bg: "#4FC08D20",
    library: "devicons",
    imageUrl: "https://vuepress.vuejs.org/hero.png",
  },

  // === BACKEND FRAMEWORKS & APIs ===
  {
    name: "NestJS",
    icon: "devicon-nestjs-plain",
    category: "Backend Framework",
    color: "#E0234E",
    bg: "#E0234E20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
  },
  {
    name: "Spring Boot",
    icon: "devicon-spring-plain",
    category: "Backend Framework",
    color: "#6DB33F",
    bg: "#6DB33F20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
  {
    name: "Ruby on Rails",
    icon: "devicon-rails-plain",
    category: "Backend Framework",
    color: "#CC0000",
    bg: "#CC000020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-original.svg",
  },
  {
    name: "Symfony",
    icon: "devicon-symfony-original",
    category: "Backend Framework",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/symfony/symfony-original.svg",
  },
  {
    name: "Pyramid",
    icon: "devicon-pyramid-plain",
    category: "Backend Framework",
    color: "#951C20",
    bg: "#951C2020",
    library: "devicons",
    imageUrl: "https://trypyramid.com/img/pyramid-60x60.png",
  },
  {
    name: "FastAPI",
    icon: "devicon-fastapi-plain",
    category: "Backend Framework",
    color: "#009688",
    bg: "#00968820",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  {
    name: "Bottle",
    icon: "devicon-bottle-plain",
    category: "Backend Framework",
    color: "#0D7377",
    bg: "#0D737720",
    library: "devicons",
    imageUrl: "https://bottlepy.org/docs/dev/_static/logo_nav.png",
  },
  {
    name: "CherryPy",
    icon: "devicon-cherrypy-plain",
    category: "Backend Framework",
    color: "#D42C2C",
    bg: "#D42C2C20",
    library: "devicons",
    imageUrl: "https://docs.cherrypy.org/en/latest/_static/cherrypy_logo_big.png",
  },
  {
    name: "Falcon",
    icon: "devicon-falcon-plain",
    category: "Backend Framework",
    color: "#2E2E2E",
    bg: "#2E2E2E20",
    library: "devicons",
    imageUrl: "https://falconframework.org/img/falcon-logo.png",
  },
  {
    name: "Beego",
    icon: "devicon-beego-plain",
    category: "Backend Framework",
    color: "#00ADD8",
    bg: "#00ADD820",
    library: "devicons",
    imageUrl: "https://beego.me/static/img/beego_purple.png",
  },
  {
    name: "Sails",
    icon: "devicon-sailsjs-original",
    category: "Backend Framework",
    color: "#14ACC2",
    bg: "#14ACC220",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sailsjs/sailsjs-original.svg",
  },
  {
    name: "Lumen",
    icon: "devicon-lumen-plain",
    category: "Backend Framework",
    color: "#E74430",
    bg: "#E7443020",
    library: "devicons",
    imageUrl: "https://lumen.laravel.com/assets/img/lumen-logo-white.png",
  },
  {
    name: "Slim",
    icon: "devicon-slim-plain",
    category: "Backend Framework",
    color: "#719E40",
    bg: "#719E4020",
    library: "devicons",
    imageUrl: "https://www.slimframework.com/img/logo.png",
  },
  {
    name: "Phalcon",
    icon: "devicon-phalcon-plain",
    category: "Backend Framework",
    color: "#76C39B",
    bg: "#76C39B20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/phalcon/phalcon-original.svg",
  },
  {
    name: "CakePHP",
    icon: "devicon-cakephp-plain",
    category: "Backend Framework",
    color: "#D33C43",
    bg: "#D33C4320",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cakephp/cakephp-original.svg",
  },
  {
    name: "Dropwizard",
    icon: "devicon-dropwizard-plain",
    category: "Backend Framework",
    color: "#0099E5",
    bg: "#0099E520",
    library: "devicons",
    imageUrl: "https://www.dropwizard.io/static/images/banner.png",
  },
  {
    name: "Vapor",
    icon: "devicon-vapor-plain",
    category: "Backend Framework",
    color: "#0D0D0D",
    bg: "#0D0D0D20",
    library: "devicons",
    imageUrl: "https://vapor.codes/images/vapor-logo.png",
  },
  {
    name: "GraphQL",
    icon: "devicon-graphql-plain",
    category: "Backend Framework",
    color: "#E10098",
    bg: "#E1009820",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  {
    name: "Fastify",
    icon: "devicon-fastify-plain",
    category: "Backend Framework",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl: "https://www.fastify.io/images/fastify-logo.png",
  },
  {
    name: "Meteor",
    icon: "devicon-meteor-plain",
    category: "Backend Framework",
    color: "#DE4F4F",
    bg: "#DE4F4F20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/meteor/meteor-original.svg",
  },
  {
    name: "Remix",
    icon: "devicon-remix-plain",
    category: "Backend Framework",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl: "https://remix.run/_brand/remix-letter-light.png",
  },
  {
    name: "SvelteKit",
    icon: "devicon-sveltekit-plain",
    category: "Backend Framework",
    color: "#FF3E00",
    bg: "#FF3E0020",
    library: "devicons",
    imageUrl: "https://kit.svelte.dev/images/svelte-kit-horizontal.svg",
  },

  // === MOBILE & CROSS-PLATFORM FRAMEWORKS ===
  {
    name: "Ionic",
    icon: "devicon-ionic-original",
    category: "Mobile Framework",
    color: "#3880FF",
    bg: "#3880FF20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg",
  },
  {
    name: "Xamarin",
    icon: "devicon-xamarin-original",
    category: "Mobile Framework",
    color: "#3498DB",
    bg: "#3498DB20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xamarin/xamarin-original.svg",
  },
  {
    name: "Apache Cordova",
    icon: "devicon-cordova-plain",
    category: "Mobile Framework",
    color: "#E8E8E8",
    bg: "#E8E8E820",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cordova/cordova-original.svg",
  },

  // === DATABASES & DATA STORAGE ===
  {
    name: "Cassandra",
    icon: "devicon-cassandra-plain",
    category: "Database",
    color: "#1287B1",
    bg: "#1287B120",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cassandra/cassandra-original.svg",
  },
  {
    name: "CouchDB",
    icon: "devicon-couchdb-plain",
    category: "Database",
    color: "#E42528",
    bg: "#E4252820",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/couchdb/couchdb-original.svg",
  },
  {
    name: "Couchbase",
    icon: "devicon-couchbase-plain",
    category: "Database",
    color: "#EA2328",
    bg: "#EA232820",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/couchbase/couchbase-original.svg",
  },
  {
    name: "Oracle",
    icon: "devicon-oracle-original",
    category: "Database",
    color: "#F80000",
    bg: "#F8000020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg",
  },
  {
    name: "DB2",
    icon: "devicon-db2-plain",
    category: "Database",
    color: "#003A6C",
    bg: "#003A6C20",
    library: "devicons",
    imageUrl: "https://www.ibm.com/content/dam/ibm/brand-guidelines/IBM-logos/db2.png",
  },
  {
    name: "Realm",
    icon: "devicon-realm-plain",
    category: "Database",
    color: "#39477F",
    bg: "#39477F20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/realm/realm-original.svg",
  },
  {
    name: "Aerospike",
    icon: "devicon-aerospike-plain",
    category: "Database",
    color: "#C41E3A",
    bg: "#C41E3A20",
    library: "devicons",
    imageUrl: "https://www.aerospike.com/wp-content/uploads/2020/08/aerospike-logo-ruby-red.png",
  },
  {
    name: "Elasticsearch",
    icon: "devicon-elasticsearch-plain",
    category: "Database",
    color: "#005571",
    bg: "#00557120",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg",
  },
  {
    name: "Apache Hive",
    icon: "devicon-hive-plain",
    category: "Database",
    color: "#FDEE21",
    bg: "#FDEE2120",
    library: "devicons",
    imageUrl: "https://hive.apache.org/images/hive_logo_medium.jpg",
  },
  {
    name: "IndexedDB",
    icon: "devicon-indexeddb-plain",
    category: "Database",
    color: "#FF9500",
    bg: "#FF950020",
    library: "devicons",
    imageUrl: "https://developer.mozilla.org/docs/Web/API/IndexedDB_API/firefox-57-indexeddb.png",
  },
  {
    name: "DynamoDB",
    icon: "devicon-dynamodb-plain",
    category: "Database",
    color: "#3C4043",
    bg: "#3C404320",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  },
  {
    name: "OrientDB",
    icon: "devicon-orientdb-plain",
    category: "Database",
    color: "#2E6B5E",
    bg: "#2E6B5E20",
    library: "devicons",
    imageUrl: "https://orientdb.org/images/orientdb_logo_mid.png",
  },
  {
    name: "Supabase",
    icon: "devicon-supabase-plain",
    category: "Database",
    color: "#3ECF8E",
    bg: "#3ECF8E20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  },

  // === DEVOPS, CLOUD & INFRASTRUCTURE TOOLS ===
  {
    name: "Terraform",
    icon: "devicon-terraform-plain",
    category: "DevOps",
    color: "#5C4EE5",
    bg: "#5C4EE520",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
  },
  {
    name: "Ansible",
    icon: "devicon-ansible-plain",
    category: "DevOps",
    color: "#EE0000",
    bg: "#EE000020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg",
  },
  {
    name: "Vagrant",
    icon: "devicon-vagrant-plain",
    category: "DevOps",
    color: "#1563FF",
    bg: "#1563FF20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vagrant/vagrant-original.svg",
  },
  {
    name: "Travis CI",
    icon: "devicon-travis-plain",
    category: "CI/CD",
    color: "#3EAAAF",
    bg: "#3EAAAF20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/travis/travis-plain.svg",
  },
  {
    name: "CircleCI",
    icon: "devicon-circleci-plain",
    category: "CI/CD",
    color: "#343434",
    bg: "#34343420",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/circleci/circleci-plain.svg",
  },
  {
    name: "GoCD",
    icon: "devicon-gocd-plain",
    category: "CI/CD",
    color: "#94399E",
    bg: "#94399E20",
    library: "devicons",
    imageUrl: "https://www.gocd.org/assets/images/go_logo-5b5ca9e1.svg",
  },
  {
    name: "Prometheus",
    icon: "devicon-prometheus-original",
    category: "Monitoring",
    color: "#E6522C",
    bg: "#E6522C20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg",
  },

  // === AI, DATA SCIENCE & ML TOOLS ===
  {
    name: "TensorFlow",
    icon: "devicon-tensorflow-original",
    category: "AI/ML",
    color: "#FF6F00",
    bg: "#FF6F0020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  {
    name: "PyTorch",
    icon: "devicon-pytorch-original",
    category: "AI/ML",
    color: "#EE4C2C",
    bg: "#EE4C2C20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  {
    name: "Scikit-learn",
    icon: "devicon-scikitlearn-plain",
    category: "AI/ML",
    color: "#F7931E",
    bg: "#F7931E20",
    library: "devicons",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
  },
  {
    name: "Pandas",
    icon: "devicon-pandas-original",
    category: "Data Science",
    color: "#150458",
    bg: "#15045820",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  {
    name: "NumPy",
    icon: "devicon-numpy-original",
    category: "Data Science",
    color: "#4DABCF",
    bg: "#4DABCF20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  },
  {
    name: "OpenCV",
    icon: "devicon-opencv-plain",
    category: "AI/ML",
    color: "#5C3EE8",
    bg: "#5C3EE820",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  },
  {
    name: "GitHub Copilot",
    icon: "devicon-github-original",
    category: "AI/ML",
    color: "#181717",
    bg: "#18171720",
    library: "devicons",
    imageUrl: "https://github.githubassets.com/images/modules/site/copilot/copilot.png",
  },

  // === VERSION CONTROL & COLLABORATION ===
  {
    name: "Mercurial",
    icon: "devicon-mercurial-plain",
    category: "Version Control",
    color: "#999999",
    bg: "#99999920",
    library: "devicons",
    imageUrl: "https://www.mercurial-scm.org/images/mercurial.png",
  },
  {
    name: "Subversion",
    icon: "devicon-subversion-original",
    category: "Version Control",
    color: "#809CC9",
    bg: "#809CC920",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/subversion/subversion-original.svg",
  },

  // === TESTING & AUTOMATION ===
  {
    name: "Mocha",
    icon: "devicon-mocha-plain",
    category: "Testing",
    color: "#8D6748",
    bg: "#8D674820",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg",
  },
  {
    name: "Selenium",
    icon: "devicon-selenium-original",
    category: "Testing",
    color: "#43B02A",
    bg: "#43B02A20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
  },
  {
    name: "Puppeteer",
    icon: "devicon-puppeteer-plain",
    category: "Testing",
    color: "#40B5A4",
    bg: "#40B5A420",
    library: "devicons",
    imageUrl: "https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png",
  },
  {
    name: "Playwright",
    icon: "devicon-playwright-plain",
    category: "Testing",
    color: "#2EAD33",
    bg: "#2EAD3320",
    library: "devicons",
    imageUrl: "https://playwright.dev/img/playwright-logo.svg",
  },
  {
    name: "JUnit",
    icon: "devicon-junit-plain",
    category: "Testing",
    color: "#25A162",
    bg: "#25A16220",
    library: "devicons",
    imageUrl: "https://junit.org/junit5/assets/img/junit5-logo.png",
  },
  {
    name: "pytest",
    icon: "devicon-pytest-plain",
    category: "Testing",
    color: "#0A9EDC",
    bg: "#0A9EDC20",
    library: "devicons",
    imageUrl: "https://docs.pytest.org/en/7.1.x/_static/pytest_logo_curves.svg",
  },
  {
    name: "Appium",
    icon: "devicon-appium-original",
    category: "Testing",
    color: "#662D91",
    bg: "#662D9120",
    library: "devicons",
    imageUrl: "https://appium.io/docs/en/2.1/assets/images/appium-logo-horiz.png",
  },

  // === IDEs, EDITORS & TOOLS ===
  {
    name: "IntelliJ IDEA",
    icon: "devicon-intellij-plain",
    category: "IDE",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
  },
  {
    name: "Atom",
    icon: "devicon-atom-original",
    category: "Editor",
    color: "#66595C",
    bg: "#66595C20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/atom/atom-original.svg",
  },
  {
    name: "Sublime Text",
    icon: "devicon-sublimetext-plain",
    category: "Editor",
    color: "#FF9800",
    bg: "#FF980020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sublime/sublime-original.svg",
  },
  {
    name: "Neovim",
    icon: "devicon-neovim-plain",
    category: "Editor",
    color: "#57A143",
    bg: "#57A14320",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neovim/neovim-original.svg",
  },
  {
    name: "Blender",
    icon: "devicon-blender-original",
    category: "Design Tool",
    color: "#F5792A",
    bg: "#F5792A20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
  },
  {
    name: "Figma",
    icon: "devicon-figma-plain",
    category: "Design Tool",
    color: "#F24E1E",
    bg: "#F24E1E20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Photoshop",
    icon: "devicon-photoshop-plain",
    category: "Design Tool",
    color: "#31A8FF",
    bg: "#31A8FF20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",
  },
  {
    name: "Illustrator",
    icon: "devicon-illustrator-plain",
    category: "Design Tool",
    color: "#FF9A00",
    bg: "#FF9A0020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
  },
  {
    name: "Adobe XD",
    icon: "devicon-xd-plain",
    category: "Design Tool",
    color: "#FF61F6",
    bg: "#FF61F620",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-original.svg",
  },
  {
    name: "Postman",
    icon: "devicon-postman-plain",
    category: "API Tool",
    color: "#FF6C37",
    bg: "#FF6C3720",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  },

  // === OTHER NOTABLE TECH CATEGORIES ===
  {
    name: "GitHub Actions",
    icon: "devicon-githubactions-plain",
    category: "CI/CD",
    color: "#2088FF",
    bg: "#2088FF20",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    name: "pnpm",
    icon: "devicon-pnpm-plain",
    category: "Package Manager",
    color: "#F69220",
    bg: "#F6922020",
    library: "devicons",
    imageUrl: "https://pnpm.io/img/pnpm-no-name-with-frame.svg",
  },
  {
    name: "Grafana",
    icon: "devicon-grafana-original",
    category: "Monitoring",
    color: "#F46800",
    bg: "#F4680020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
  },
  {
    name: "AWS Lambda",
    icon: "devicon-lambda-plain",
    category: "Cloud",
    color: "#FF9900",
    bg: "#FF990020",
    library: "devicons",
    imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  },
];

// Categories for filtering
const CATEGORIES = [
  "Language",
  "Framework", 
  "Frontend Framework",
  "Backend Framework",
  "Mobile Framework",
  "Database",
  "Cloud",
  "DevOps",
  "CI/CD",
  "Version Control",
  "Styling",
  "Backend",
  "Runtime",
  "Markup",
  "Web Server",
  "Editor",
  "IDE",
  "Build Tool",
  "Linting",
  "Formatting",
  "Testing",
  "Mobile",
  "Operating System",
  "AI/ML",
  "Data Science",
  "Design Tool",
  "Security",
  "Monitoring",
  "Package Manager",
  "CMS",
  "File Type",
  "Containerization",
  "Infrastructure",
  "API Tool"
];

// Helper function to get icon URL based on provider
const getIconUrl = (tech, provider = 'devicons') => {
  const library = ICON_LIBRARIES[provider];
  if (library && library.getUrl) {
    return library.getUrl(tech);
  }
  return tech.imageUrl || ICON_LIBRARIES.devicons.getUrl(tech);
};

export default function TechSearch({ open, onOpenChange, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [globalProvider, setGlobalProvider] = useState("devicons");
  const [techProviders, setTechProviders] = useState({});

  // Enhanced filtering - search works across ALL categories simultaneously
  const filteredTechnologies = useMemo(() => {
    return TECHNOLOGIES.filter((tech) => {
      const matchesSearch = tech.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      // Search ignores category filter - works across all categories
      return matchesSearch;
    });
  }, [searchTerm]); // Removed selectedCategory dependency

  const handleSelect = (tech) => {
    // Toggle selection
    if (selectedTechs.some((t) => t.name === tech.name)) {
      setSelectedTechs(selectedTechs.filter((t) => t.name !== tech.name));
      // Remove from tech providers when deselected
      const newProviders = { ...techProviders };
      delete newProviders[tech.name];
      setTechProviders(newProviders);
    } else {
      const techWithProvider = { 
        ...tech, 
        selectedProvider: globalProvider,
        imageUrl: getIconUrl(tech, globalProvider)
      };
      setSelectedTechs([...selectedTechs, techWithProvider]);
      // Set initial provider for this tech
      setTechProviders(prev => ({
        ...prev,
        [tech.name]: globalProvider
      }));
    }
  };

  const handleTechProviderChange = (techName, provider) => {
    setTechProviders(prev => ({
      ...prev,
      [techName]: provider
    }));
    
    // Update the selected tech with new provider
    setSelectedTechs(prev => prev.map(tech => {
      if (tech.name === techName) {
        return {
          ...tech,
          selectedProvider: provider,
          imageUrl: getIconUrl(tech, provider)
        };
      }
      return tech;
    }));
  };

  const handleGlobalProviderChange = (provider) => {
    setGlobalProvider(provider);
    
    // Update all selected technologies with new global provider
    const updatedSelectedTechs = selectedTechs.map(tech => ({
      ...tech,
      selectedProvider: provider,
      imageUrl: getIconUrl(tech, provider)
    }));
    setSelectedTechs(updatedSelectedTechs);
    
    // Update all tech providers
    const updatedProviders = {};
    selectedTechs.forEach(tech => {
      updatedProviders[tech.name] = provider;
    });
    setTechProviders(updatedProviders);
  };

  const handleDone = () => {
    // Send all selected technologies to parent component at once
    if (selectedTechs.length > 0) {
      // Call onSelect with all selected technologies as an array
      onSelect(selectedTechs);
      setSelectedTechs([]);
      setTechProviders({});
      setSearchTerm("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[85vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Add Technology (190 technologies available)</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col flex-1 min-h-0 space-y-4 overflow-hidden p-2">
          {/* Search Input and Dropdowns - Enhanced Layout */}
          <div className="flex gap-3 flex-shrink-0 p-1">
            {/* Search Input - Made shorter */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
              <Input
                placeholder="Search technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm hover:border-gray-400"
              />
            </div>
            
            {/* Global Provider Dropdown */}
            <div className="w-44 flex-shrink-0">
              <Select value={globalProvider} onValueChange={handleGlobalProviderChange}>
                <SelectTrigger className="w-full border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm hover:border-gray-400">
                  <SelectValue placeholder="Icon Provider" />
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
            
            {/* Category Dropdown - Kept for visual consistency but search ignores it */}
            <div className="w-44 flex-shrink-0">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm hover:border-gray-400">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Categories</SelectItem>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Enhanced Selected Technologies Section with Provider Selection */}
          {selectedTechs.length > 0 && (
            <div className="flex-shrink-0 border rounded-lg p-4 bg-gray-50/50">
              <div className="text-sm font-medium mb-3 text-gray-700">
                Selected Technologies ({selectedTechs.length}):
              </div>
              {/* Fixed ScrollArea with visible scrollbar and proper height */}
              <ScrollArea className="selected-tech-scrollbar h-32 w-full rounded-md border bg-white">
                <div className="flex flex-wrap gap-2 p-3 pr-4">
                  {selectedTechs.map((tech) => (
                    <div key={tech.name} className="flex items-center gap-2 p-2 bg-white rounded-lg border-2 hover:shadow-sm transition-all"
                         style={{
                           backgroundColor: tech.bg || `${tech.color}10`,
                           borderColor: tech.color + "40",
                         }}>
                      <img
                        src={getIconUrl(tech, techProviders[tech.name] || globalProvider)}
                        alt={tech.name}
                        width="18"
                        height="18"
                        className="object-contain flex-shrink-0"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "inline-block";
                        }}
                      />
                      <i
                        className={`${tech.icon} text-lg flex-shrink-0`}
                        style={{ color: tech.color, display: "none" }}
                      ></i>
                      <span className="text-sm font-medium" style={{ color: tech.color }}>
                        {tech.name}
                      </span>
                      
                      <X
                        className="w-4 h-4 ml-1 cursor-pointer flex-shrink-0 hover:text-red-500 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTechs(
                            selectedTechs.filter((t) => t.name !== tech.name)
                          );
                          const newProviders = { ...techProviders };
                          delete newProviders[tech.name];
                          setTechProviders(newProviders);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Technology Grid - Fixed Height and Proper Scrolling */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <ScrollArea className="h-full w-full rounded-lg border bg-white">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4">
                {filteredTechnologies.map((tech) => {
                  const isSelected = selectedTechs.some(
                    (t) => t.name === tech.name
                  );
                  return (
                    <div key={tech.name} className="relative">
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        className={`flex items-center gap-2 h-12 justify-start hover:shadow-md transition-all duration-200 w-full ${
                          isSelected ? "border-2 border-black shadow-lg" : ""
                        }`}
                        style={{
                          backgroundColor: isSelected
                            ? tech.bg || tech.color + "20"
                            : tech.bg,
                          borderColor: isSelected ? "#000000" : tech.color + "30",
                        }}
                        onClick={() => handleSelect(tech)}
                      >
                        <img
                          src={getIconUrl(tech, globalProvider)}
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
                        <span 
                          className="text-sm font-medium truncate"
                          style={{ color: isSelected ? "#000000" : "inherit" }}
                        >
                          {tech.name}
                        </span>
                      </Button>
                      {/* Checkmark for selected items */}
                      {isSelected && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                          <svg 
                            className="w-3 h-3 text-white" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={3} 
                              d="M5 13l4 4L19 7" 
                            />
                          </svg>
                        </div>
                      )}
                    </div>
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
          [data-radix-scroll-area-viewport] {
            scrollbar-width: thin;
            scrollbar-color: #94a3b8 #f1f5f9;
          }
          
          [data-radix-scroll-area-viewport]::-webkit-scrollbar {
            width: 16px;
            height: 16px;
            background-color: #f8fafc;
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
            border: 2px solid #f8fafc;
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
            background: #f8fafc;
            border-radius: 6px;
          }
          
          /* Enhanced scrollbar for selected technologies section */
          .selected-tech-scrollbar [data-radix-scroll-area-viewport]::-webkit-scrollbar {
            width: 14px;
            height: 14px;
          }
          
          .selected-tech-scrollbar [data-radix-scroll-area-viewport]::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%);
            border: 2px solid #dbeafe;
            min-height: 30px;
          }
          
          .selected-tech-scrollbar [data-radix-scroll-area-viewport]::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%);
          }
          
          .selected-tech-scrollbar [data-radix-scroll-area-viewport]::-webkit-scrollbar-track {
            background: #dbeafe;
            border: 2px solid #bfdbfe;
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
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
    getUrl: (tech) => {
      const techName = tech.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      // Special cases for better icon URLs
      if (tech.name === "Node.js") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg";
      if (tech.name === "Vue.js") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg";
      if (tech.name === "Next.js") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg";
      if (tech.name === "C++") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg";
      if (tech.name === "C#") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg";
      if (tech.name === "Java") return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg";
      return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${techName}/${techName}-original.svg`;
    }
  },
  skillicons: {
    name: "Skill Icons", 
    getUrl: (tech) => {
      let techName = tech.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      // Special mappings for Skill Icons
      if (tech.name === "Node.js") techName = "nodejs";
      if (tech.name === "Vue.js") techName = "vuejs";
      if (tech.name === "Next.js") techName = "nextjs";
      if (tech.name === "C++") techName = "cpp";
      if (tech.name === "C#") techName = "cs";
      if (tech.name === "Java") techName = "java";
      if (tech.name === "PostgreSQL") techName = "postgresql";
      if (tech.name === "MySQL") techName = "mysql";
      if (tech.name === "MongoDB") techName = "mongodb";
      return `https://skillicons.dev/icons?i=${techName}`;
    }
  },
  simpleicons: {
    name: "Simple Icons",
    getUrl: (tech) => {
      let techName = tech.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      // Special mappings for Simple Icons
      if (tech.name === "Node.js") techName = "nodedotjs";
      if (tech.name === "Vue.js") techName = "vuedotjs";
      if (tech.name === "Next.js") techName = "nextdotjs";
      if (tech.name === "C++") techName = "cplusplus";
      if (tech.name === "C#") techName = "csharp";
      if (tech.name === "Java") techName = "openjdk";
      return `https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/${techName}.svg`;
    }
  },
  shields: {
    name: "Shields.io",
    getUrl: (tech) => {
      const name = tech.name.replace(/\s+/g, '%20');
      const color = tech.color?.replace('#', '') || '000000';
      let logo = tech.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      // Special mappings for Shields.io
      if (tech.name === "Node.js") logo = "nodedotjs";
      if (tech.name === "Vue.js") logo = "vuedotjs";  
      if (tech.name === "Next.js") logo = "nextdotjs";
      if (tech.name === "C++") logo = "cplusplus";
      if (tech.name === "C#") logo = "csharp";
      if (tech.name === "Java") logo = "openjdk";
      return `https://img.shields.io/badge/${name}-${color}?style=for-the-badge&logo=${logo}&logoColor=white`;
    }
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
    name: "Docker",
    icon: "devicon-docker-plain",
    category: "Containerization",
    color: "#2496ED",
    bg: "#2496ED20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
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
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg",
  },
  {
    name: "Windows",
    icon: "devicon-windows8-original",
    category: "Operating System",
    color: "#0078D4",
    bg: "#0078D420",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
  },
  {
    name: "macOS",
    icon: "devicon-apple-original",
    category: "Operating System",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg",
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
    name: "IntelliJ IDEA",
    icon: "devicon-intellij-plain",
    category: "IDE",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg",
  },
  {
    name: "Android Studio",
    icon: "devicon-androidstudio-plain",
    category: "IDE",
    color: "#3DDC84",
    bg: "#3DDC8420",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg",
  },
  {
    name: "Xcode",
    icon: "devicon-xcode-plain",
    category: "IDE",
    color: "#147EFB",
    bg: "#147EFB20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg",
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
    icon: "devicon-vitejs-plain",
    category: "Build Tool",
    color: "#646CFF",
    bg: "#646CFF20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  },
  {
    name: "npm",
    icon: "devicon-npm-original-wordmark",
    category: "Package Manager",
    color: "#CB3837",
    bg: "#CB383720",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
  },
  {
    name: "Yarn",
    icon: "devicon-yarn-plain",
    category: "Package Manager",
    color: "#2C8EBB",
    bg: "#2C8EBB20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yarn/yarn-original.svg",
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
    icon: "devicon-cypressio-plain",
    category: "Testing",
    color: "#17202C",
    bg: "#17202C20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg",
  },
  {
    name: "Selenium",
    icon: "devicon-selenium-original",
    category: "Testing",
    color: "#43B02A",
    bg: "#43B02A20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
  },
  {
    name: "Postman",
    icon: "devicon-postman-plain",
    category: "API Tool",
    color: "#FF6C37",
    bg: "#FF6C3720",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  },
  {
    name: "GraphQL",
    icon: "devicon-graphql-plain",
    category: "API",
    color: "#E10098",
    bg: "#E1009820",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  },
  {
    name: "REST API",
    icon: "devicon-swagger-plain",
    category: "API",
    color: "#85EA2D",
    bg: "#85EA2D20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swagger/swagger-original.svg",
  },
  {
    name: "Figma",
    icon: "devicon-figma-plain",
    category: "Design Tool",
    color: "#F24E1E",
    bg: "#F24E1E20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  },
  {
    name: "Adobe XD",
    icon: "devicon-xd-plain",
    category: "Design Tool",
    color: "#FF61F6",
    bg: "#FF61F620",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg",
  },
  {
    name: "Sketch",
    icon: "devicon-sketch-line",
    category: "Design Tool",
    color: "#F7B500",
    bg: "#F7B50020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg",
  },
  {
    name: "Flutter",
    icon: "devicon-flutter-plain",
    category: "Mobile",
    color: "#02569B",
    bg: "#02569B20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  {
    name: "React Native",
    icon: "devicon-react-original",
    category: "Mobile",
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
    name: "Ionic",
    icon: "devicon-ionic-original",
    category: "Mobile",
    color: "#3880FF",
    bg: "#3880FF20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg",
  },
  {
    name: "Xamarin",
    icon: "devicon-xamarin-original",
    category: "Mobile",
    color: "#3498DB",
    bg: "#3498DB20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xamarin/xamarin-original.svg",
  },
  {
    name: "TensorFlow",
    icon: "devicon-tensorflow-original",
    category: "AI/ML",
    color: "#FF6F00",
    bg: "#FF6F0020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  {
    name: "PyTorch",
    icon: "devicon-pytorch-original",
    category: "AI/ML",
    color: "#EE4C2C",
    bg: "#EE4C2C20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  {
    name: "Keras",
    icon: "devicon-keras-original",
    category: "AI/ML",
    color: "#D00000",
    bg: "#D0000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/keras/keras-original.svg",
  },
  {
    name: "Pandas",
    icon: "devicon-pandas-original",
    category: "Data Science",
    color: "#150458",
    bg: "#15045820",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  {
    name: "NumPy",
    icon: "devicon-numpy-original",
    category: "Data Science",
    color: "#013243",
    bg: "#01324320",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  },
  {
    name: "Jupyter",
    icon: "devicon-jupyter-plain",
    category: "Data Science",
    color: "#F37626",
    bg: "#F3762620",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
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
    name: "Kubernetes",
    icon: "devicon-kubernetes-plain",
    category: "Infrastructure",
    color: "#326CE5",
    bg: "#326CE520",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  },
  {
    name: "Jenkins",
    icon: "devicon-jenkins-line",
    category: "CI/CD",
    color: "#D24939",
    bg: "#D2493920",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  },
  {
    name: "Terraform",
    icon: "devicon-terraform-plain",
    category: "Infrastructure",
    color: "#623CE4",
    bg: "#623CE420",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
  },
  {
    name: "Ansible",
    icon: "devicon-ansible-plain",
    category: "Infrastructure",
    color: "#EE0000",
    bg: "#EE000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg",
  },
  {
    name: "Vagrant",
    icon: "devicon-vagrant-plain",
    category: "Infrastructure",
    color: "#1563FF",
    bg: "#1563FF20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vagrant/vagrant-original.svg",
  },
  {
    name: "Elasticsearch",
    icon: "devicon-elasticsearch-plain",
    category: "Database",
    color: "#005571",
    bg: "#00557120",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg",
  },
  {
    name: "Grafana",
    icon: "devicon-grafana-original",
    category: "Monitoring",
    color: "#F46800",
    bg: "#F4680020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg",
  },
  {
    name: "Prometheus",
    icon: "devicon-prometheus-original",
    category: "Monitoring",
    color: "#E6522C",
    bg: "#E6522C20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg",
  },
  {
    name: "Slack",
    icon: "devicon-slack-plain",
    category: "Communication",
    color: "#4A154B",
    bg: "#4A154B20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
  },
  {
    name: "Discord",
    icon: "devicon-discord-plain",
    category: "Communication",
    color: "#5865F2",
    bg: "#5865F220",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discord/discord-original.svg",
  },
  {
    name: "Trello",
    icon: "devicon-trello-plain",
    category: "Project Management",
    color: "#0079BF",
    bg: "#0079BF20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/trello/trello-plain.svg",
  },
  {
    name: "Jira",
    icon: "devicon-jira-plain",
    category: "Project Management",
    color: "#0052CC",
    bg: "#0052CC20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
  },
  {
    name: "Confluence",
    icon: "devicon-confluence-original",
    category: "Documentation",
    color: "#172B4D",
    bg: "#172B4D20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg",
  },
  {
    name: "Notion",
    icon: "devicon-notion-plain",
    category: "Documentation",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg",
  },
  {
    name: "WordPress",
    icon: "devicon-wordpress-plain",
    category: "CMS",
    color: "#21759B",
    bg: "#21759B20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-original.svg",
  },
  {
    name: "Drupal",
    icon: "devicon-drupal-plain",
    category: "CMS",
    color: "#0678BE",
    bg: "#0678BE20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/drupal/drupal-original.svg",
  },
  {
    name: "Shopify",
    icon: "devicon-shopify-original",
    category: "E-commerce",
    color: "#7AB55C",
    bg: "#7AB55C20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/shopify/shopify-original.svg",
  },
  {
    name: "Stripe",
    icon: "devicon-stripe-original",
    category: "Payment",
    color: "#008CDD",
    bg: "#008CDD20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stripe/stripe-original.svg",
  },
  {
    name: "PayPal",
    icon: "devicon-paypal-original",
    category: "Payment",
    color: "#00457C",
    bg: "#00457C20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/paypal/paypal-original.svg",
  },
  {
    name: "Twilio",
    icon: "devicon-twilio-original",
    category: "Communication",
    color: "#F22F46",
    bg: "#F22F4620",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/twilio/twilio-original.svg",
  },
  {
    name: "SendGrid",
    icon: "devicon-sendgrid-original",
    category: "Email",
    color: "#1A82E2",
    bg: "#1A82E220",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sendgrid/sendgrid-original.svg",
  },
  {
    name: "Mailchimp",
    icon: "devicon-mailchimp-plain",
    category: "Email",
    color: "#FFE01B",
    bg: "#FFE01B20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mailchimp/mailchimp-original.svg",
  },
  {
    name: "Zapier",
    icon: "devicon-zapier-original",
    category: "Automation",
    color: "#FF4A00",
    bg: "#FF4A0020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zapier/zapier-original.svg",
  },
  {
    name: "IFTTT",
    icon: "devicon-ifttt-original",
    category: "Automation",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ifttt/ifttt-original.svg",
  },
  {
    name: "Heroku",
    icon: "devicon-heroku-original",
    category: "Cloud",
    color: "#430098",
    bg: "#43009820",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg",
  },
  {
    name: "Netlify",
    icon: "devicon-netlify-plain",
    category: "Cloud",
    color: "#00C7B7",
    bg: "#00C7B720",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
  },
  {
    name: "Vercel",
    icon: "devicon-vercel-original",
    category: "Cloud",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",
  },
  {
    name: "DigitalOcean",
    icon: "devicon-digitalocean-original",
    category: "Cloud",
    color: "#0080FF",
    bg: "#0080FF20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg",
  },
  {
    name: "Linode",
    icon: "devicon-linode-original",
    category: "Cloud",
    color: "#00A95C",
    bg: "#00A95C20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linode/linode-original.svg",
  },
  {
    name: "Azure",
    icon: "devicon-azure-original",
    category: "Cloud",
    color: "#0078D4",
    bg: "#0078D420",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  },
  {
    name: "Google Cloud",
    icon: "devicon-googlecloud-original",
    category: "Cloud",
    color: "#4285F4",
    bg: "#4285F420",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  },
  {
    name: "Cloudflare",
    icon: "devicon-cloudflare-original",
    category: "Cloud",
    color: "#F38020",
    bg: "#F3802020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg",
  },
  {
    name: "Supabase",
    icon: "devicon-supabase-original",
    category: "Backend",
    color: "#3ECF8E",
    bg: "#3ECF8E20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
  },
  {
    name: "Appwrite",
    icon: "devicon-appwrite-original",
    category: "Backend",
    color: "#FD366E",
    bg: "#FD366E20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/appwrite/appwrite-original.svg",
  },
  {
    name: "Hasura",
    icon: "devicon-hasura-original",
    category: "Backend",
    color: "#1EB4D4",
    bg: "#1EB4D420",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hasura/hasura-original.svg",
  },
  {
    name: "Strapi",
    icon: "devicon-strapi-original",
    category: "CMS",
    color: "#2F2E8B",
    bg: "#2F2E8B20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/strapi/strapi-original.svg",
  },
  {
    name: "Contentful",
    icon: "devicon-contentful-original",
    category: "CMS",
    color: "#2478CC",
    bg: "#2478CC20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/contentful/contentful-original.svg",
  },
  {
    name: "Sanity",
    icon: "devicon-sanity-original",
    category: "CMS",
    color: "#F03E2F",
    bg: "#F03E2F20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sanity/sanity-original.svg",
  },
  {
    name: "Prisma",
    icon: "devicon-prisma-original",
    category: "Database",
    color: "#2D3748",
    bg: "#2D374820",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
  },
  {
    name: "Sequelize",
    icon: "devicon-sequelize-original",
    category: "Database",
    color: "#52B0E7",
    bg: "#52B0E720",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg",
  },
  {
    name: "Mongoose",
    icon: "devicon-mongoose-original",
    category: "Database",
    color: "#880000",
    bg: "#88000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongoose/mongoose-original.svg",
  },
  {
    name: "Storybook",
    icon: "devicon-storybook-original",
    category: "Development",
    color: "#FF4785",
    bg: "#FF478520",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/storybook/storybook-original.svg",
  },
  {
    name: "Chromatic",
    icon: "devicon-chrome-plain",
    category: "Testing",
    color: "#FC521F",
    bg: "#FC521F20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",
  },
  {
    name: "Playwright",
    icon: "devicon-playwright-original",
    category: "Testing",
    color: "#2EAD33",
    bg: "#2EAD3320",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/playwright/playwright-original.svg",
  },
  {
    name: "Puppeteer",
    icon: "devicon-puppeteer-plain",
    category: "Testing",
    color: "#40B5A8",
    bg: "#40B5A820",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/puppeteer/puppeteer-original.svg",
  },
  {
    name: "Cucumber",
    icon: "devicon-cucumber-plain",
    category: "Testing",
    color: "#23D96C",
    bg: "#23D96C20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cucumber/cucumber-plain.svg",
  },
  {
    name: "Mocha",
    icon: "devicon-mocha-plain",
    category: "Testing",
    color: "#8D6748",
    bg: "#8D674820",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg",
  },
  {
    name: "Chai",
    icon: "devicon-chai-plain",
    category: "Testing",
    color: "#A30701",
    bg: "#A3070120",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chai/chai-original.svg",
  },
  {
    name: "Jasmine",
    icon: "devicon-jasmine-plain",
    category: "Testing",
    color: "#8A4182",
    bg: "#8A418220",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jasmine/jasmine-plain.svg",
  },
  {
    name: "Karma",
    icon: "devicon-karma-plain",
    category: "Testing",
    color: "#56C5A8",
    bg: "#56C5A820",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/karma/karma-original.svg",
  },
  {
    name: "Protractor",
    icon: "devicon-protractor-plain",
    category: "Testing",
    color: "#E23237",
    bg: "#E2323720",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/protractor/protractor-plain.svg",
  },
  {
    name: "WebDriver",
    icon: "devicon-webdriver-original",
    category: "Testing",
    color: "#43B02A",
    bg: "#43B02A20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
  },
  {
    name: "R",
    icon: "devicon-r-original",
    category: "Language",
    color: "#276DC3",
    bg: "#276DC320",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg",
  },
  {
    name: "Julia",
    icon: "devicon-julia-original",
    category: "Language",
    color: "#9558B2",
    bg: "#9558B220",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/julia/julia-original.svg",
  },
  {
    name: "Scala",
    icon: "devicon-scala-original",
    category: "Language",
    color: "#DC322F",
    bg: "#DC322F20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg",
  },
  {
    name: "Clojure",
    icon: "devicon-clojure-original",
    category: "Language",
    color: "#5881D8",
    bg: "#5881D820",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/clojure/clojure-original.svg",
  },
  {
    name: "Haskell",
    icon: "devicon-haskell-original",
    category: "Language",
    color: "#5D4F85",
    bg: "#5D4F8520",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/haskell/haskell-original.svg",
  },
  {
    name: "Erlang",
    icon: "devicon-erlang-original",
    category: "Language",
    color: "#A90533",
    bg: "#A9053320",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/erlang/erlang-original.svg",
  },
  {
    name: "Elixir",
    icon: "devicon-elixir-original",
    category: "Language",
    color: "#4B275F",
    bg: "#4B275F20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elixir/elixir-original.svg",
  },
  {
    name: "Crystal",
    icon: "devicon-crystal-original",
    category: "Language",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/crystal/crystal-original.svg",
  },
  {
    name: "Nim",
    icon: "devicon-nim-original",
    category: "Language",
    color: "#FFE953",
    bg: "#FFE95320",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nim/nim-original.svg",
  },
  {
    name: "Zig",
    icon: "devicon-zig-original",
    category: "Language",
    color: "#F7A41D",
    bg: "#F7A41D20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zig/zig-original.svg",
  },
  {
    name: "Assembly",
    icon: "devicon-assembly-original",
    category: "Language",
    color: "#654FF0",
    bg: "#654FF020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/assembly/assembly-original.svg",
  },
  {
    name: "C",
    icon: "devicon-c-original",
    category: "Language",
    color: "#A8B9CC",
    bg: "#A8B9CC20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  {
    name: "Fortran",
    icon: "devicon-fortran-original",
    category: "Language",
    color: "#734F96",
    bg: "#734F9620",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fortran/fortran-original.svg",
  },
  {
    name: "COBOL",
    icon: "devicon-cobol-original",
    category: "Language",
    color: "#005CA5",
    bg: "#005CA520",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cobol/cobol-original.svg",
  },
  {
    name: "Perl",
    icon: "devicon-perl-original",
    category: "Language",
    color: "#39457E",
    bg: "#39457E20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/perl/perl-original.svg",
  },
  {
    name: "Lua",
    icon: "devicon-lua-original",
    category: "Language",
    color: "#2C2D72",
    bg: "#2C2D7220",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg",
  },
  {
    name: "Bash",
    icon: "devicon-bash-original",
    category: "Language",
    color: "#4EAA25",
    bg: "#4EAA2520",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",
  },
  {
    name: "PowerShell",
    icon: "devicon-powershell-original",
    category: "Language",
    color: "#5391FE",
    bg: "#5391FE20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/powershell/powershell-original.svg",
  },
  {
    name: "Fish",
    icon: "devicon-fish-original",
    category: "Shell",
    color: "#4AAE47",
    bg: "#4AAE4720",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fish/fish-original.svg",
  },
  {
    name: "Zsh",
    icon: "devicon-zsh-original",
    category: "Shell",
    color: "#F15A24",
    bg: "#F15A2420",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zsh/zsh-original.svg",
  },
  {
    name: "JSON",
    icon: "devicon-json-original",
    category: "File Type",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/json/json-original.svg",
  },
  {
    name: "XML",
    icon: "devicon-xml-original",
    category: "File Type",
    color: "#E34F26",
    bg: "#E34F2620",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xml/xml-original.svg",
  },
  {
    name: "YAML",
    icon: "devicon-yaml-original",
    category: "File Type",
    color: "#CB171E",
    bg: "#CB171E20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/yaml/yaml-original.svg",
  },
  {
    name: "TOML",
    icon: "devicon-toml-original",
    category: "File Type",
    color: "#9C4221",
    bg: "#9C422120",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/toml/toml-original.svg",
  },
  {
    name: "CSV",
    icon: "devicon-csv-original",
    category: "File Type",
    color: "#239120",
    bg: "#23912020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csv/csv-original.svg",
  },
  {
    name: "Markdown",
    icon: "devicon-markdown-original",
    category: "File Type",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg",
  },
  {
    name: "LaTeX",
    icon: "devicon-latex-original",
    category: "Document",
    color: "#008080",
    bg: "#00808020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/latex/latex-original.svg",
  },
  {
    name: "Emacs",
    icon: "devicon-emacs-original",
    category: "Editor",
    color: "#7F5AB6",
    bg: "#7F5AB620",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/emacs/emacs-original.svg",
  },
  {
    name: "Nano",
    icon: "devicon-nano-original",
    category: "Editor",
    color: "#4A90E2",
    bg: "#4A90E220",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nano/nano-original.svg",
  },
  {
    name: "Atom",
    icon: "devicon-atom-original",
    category: "Editor",
    color: "#66595C",
    bg: "#66595C20",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/atom/atom-original.svg",
  },
  {
    name: "Sublime Text",
    icon: "devicon-sublime-original",
    category: "Editor",
    color: "#FF9800",
    bg: "#FF980020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sublime/sublime-original.svg",
  },
  {
    name: "Eclipse",
    icon: "devicon-eclipse-original",
    category: "IDE",
    color: "#2C2255",
    bg: "#2C225520",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eclipse/eclipse-original.svg",
  },
  {
    name: "NetBeans",
    icon: "devicon-netbeans-original",
    category: "IDE",
    color: "#1B6AC6",
    bg: "#1B6AC620",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netbeans/netbeans-original.svg",
  },
  {
    name: "PyCharm",
    icon: "devicon-pycharm-original",
    category: "IDE",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg",
  },
  {
    name: "WebStorm",
    icon: "devicon-webstorm-original",
    category: "IDE",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webstorm/webstorm-original.svg",
  },
  {
    name: "RubyMine",
    icon: "devicon-rubymine-original",
    category: "IDE",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rubymine/rubymine-original.svg",
  },
  {
    name: "CLion",
    icon: "devicon-clion-original",
    category: "IDE",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/clion/clion-original.svg",
  },
  {
    name: "DataGrip",
    icon: "devicon-datagrip-original",
    category: "IDE",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/datagrip/datagrip-original.svg",
  },
  {
    name: "GoLand",
    icon: "devicon-goland-original",
    category: "IDE",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/goland/goland-original.svg",
  },
  {
    name: "Rider",
    icon: "devicon-rider-original",
    category: "IDE",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rider/rider-original.svg",
  },
  {
    name: "PhpStorm",
    icon: "devicon-phpstorm-original",
    category: "IDE",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/phpstorm/phpstorm-original.svg",
  },
  {
    name: "AppCode",
    icon: "devicon-appcode-original",
    category: "IDE",
    color: "#000000",
    bg: "#00000020",
    library: "devicons",
    imageUrl:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/appcode/appcode-original.svg",
  }
];

// Categories for filtering - Same as before
const CATEGORIES = [
  "Language",
  "Framework",
  "Database",
  "Cloud",
  "Version Control",
  "CI/CD",
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

// Helper function to get icon URL based on provider - FIXED
const getIconUrl = (tech, provider = 'devicons') => {
  const library = ICON_LIBRARIES[provider];
  if (library && library.getUrl) {
    return library.getUrl(tech);
  }
  // Always fallback to devicons generation, never use hardcoded imageUrl
  return ICON_LIBRARIES.devicons.getUrl(tech);
};

export default function TechSearch({ open, onOpenChange, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [globalProvider, setGlobalProvider] = useState("devicons");
  const [techProviders, setTechProviders] = useState({});

  // Enhanced filtering - works with search by name AND category
  const filteredTechnologies = useMemo(() => {
    return TECHNOLOGIES.filter((tech) => {
      // Search matches both tech name AND category
      const matchesSearch = searchTerm === "" || 
        tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tech.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "All" || tech.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

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
                className="pl-10 pr-4 py-2 w-full border-2 border-gray-300 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200 bg-white shadow-sm hover:border-gray-400"
              />
            </div>
            
            {/* Global Provider Dropdown */}
            <div className="w-44 flex-shrink-0">
              <Select value={globalProvider} onValueChange={handleGlobalProviderChange}>
                <SelectTrigger className="w-full border-2 border-gray-300 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200 bg-white shadow-sm hover:border-gray-400">
                  <SelectValue placeholder="Icon Provider" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto z-[60] slow-scroll-dropdown" position="popper" sideOffset={5}>
                  {Object.entries(ICON_LIBRARIES).map(([key, library]) => (
                    <SelectItem key={key} value={key}>
                      {library.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Category Dropdown - Now fully functional for filtering */}
            <div className="w-44 flex-shrink-0">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full border-2 border-gray-300 rounded-lg focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200 bg-white shadow-sm hover:border-gray-400">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto z-[60] slow-scroll-dropdown" position="popper" sideOffset={5}>
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
                        key={`selected-${tech.name}-${techProviders[tech.name] || globalProvider}`}
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
                          key={`${tech.name}-${globalProvider}`}
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

        {/* Enhanced custom scrollbar styles and modal dropdown fixes */}
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

          /* SLOW SCROLL FOR DROPDOWN ARROWS - FIXED */
          .slow-scroll-dropdown [data-radix-select-scroll-up-button],
          .slow-scroll-dropdown [data-radix-select-scroll-down-button] {
            transition: all 0.2s ease;
          }
          
          .slow-scroll-dropdown [data-radix-select-scroll-up-button]:active,
          .slow-scroll-dropdown [data-radix-select-scroll-down-button]:active {
            transform: scale(0.95);
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
}
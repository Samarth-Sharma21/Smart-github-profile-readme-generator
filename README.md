<div align="center">
  <img src="public/og-image.svg" alt="GitHub Profile README Generator" width="600" />
  <h1>GitHub Profile README Generator</h1>
  <p>Create stunning GitHub profile pages in minutes</p>
  
  [![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-id/deploy-status)](https://app.netlify.com/sites/github-profile-readme-generator/deploys)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Next.js](https://img.shields.io/badge/built%20with-Next.js-000000?style=flat&logo=nextdotjs)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/styled%20with-Tailwind-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
</div>

## 📋 Overview

A powerful tool to create beautiful, customized GitHub profile READMEs with an interactive form and live preview. Stand out in the GitHub community with a professional profile page that showcases your skills, projects, and personality.

### [✨ Live Demo](https://smart-github-profile-readme-generator.netlify.app/)

![Screenshot](public/screenshot.svg)

## 📑 Table of Contents

- [Features](#-features)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Project Structure](#project-structure)
- [Deployment](#-deployment)
  - [Netlify Deployment](#netlify-deployment)
  - [Vercel Deployment](#vercel-deployment)
  - [Manual Deployment](#manual-deployment)
- [SEO Features](#-seo-features)
- [Browser Compatibility](#-browser-compatibility)
- [Progressive Web App](#-progressive-web-app)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)
- [Contact](#-contact)

## ✨ Features

### Content Creation
- 👤 **Profile Introduction** - Create a personalized welcome section with your name, role, and bio
- 🛠️ **Technologies & Skills** - Showcase your technical expertise with auto-generated badges
- 🌐 **Social Links** - Connect visitors to all your online profiles with custom icons
- 📊 **GitHub Stats** - Display dynamic statistics about your GitHub activity and contributions
- 🚀 **Featured Projects** - Highlight your best repositories with descriptions and links
- 📝 **Blog Posts** - Automatically display your latest articles from dev.to, Medium, or other platforms
- 🏆 **Achievements** - Showcase certifications, awards, and recognition
- ☕ **Support Section** - Add Ko-fi, Buy Me a Coffee, or other support platform links
- 📫 **Contact Information** - Make it easy for collaborators and recruiters to reach you

### User Experience
- 🎨 **Live Preview** - See your README update in real-time as you make changes
- 📋 **One-click Copy** - Copy your markdown with a single click
- 💾 **Templates** - Choose from various pre-designed templates to get started quickly
- 🎭 **Themes** - Select from light, dark, and custom color schemes
- 🧩 **Drag-and-Drop Sections** - Rearrange sections to create your perfect layout
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- 🔄 **Import Existing** - Upload your current README to edit and enhance it

### Technical
- ⚡ **Fast Performance** - Built with Next.js for optimal speed and SEO
- 🔒 **No Login Required** - Create your README without creating an account
- 🌐 **PWA Support** - Install as a Progressive Web App for offline use
- 🌙 **Dark Mode** - Easy on the eyes with automatic dark/light theme switching

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- Yarn or npm
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/github-profile-readme-generator.git
cd github-profile-readme-generator

# Install dependencies
yarn install
# or
npm install

# Start the development server
yarn dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Google Analytics Measurement ID
```

### Project Structure

```
├── app/                # Next.js app directory
│   ├── components/     # Reusable UI components
│   ├── examples/       # GitHub README examples
│   ├── markdown-guide/ # Markdown syntax guide
│   ├── privacy-policy/ # Privacy policy page
│   ├── terms/          # Terms of service page
│   ├── tips/           # GitHub profile tips
│   ├── layout.js       # Root layout component
│   └── page.js         # Home page component
├── public/             # Static assets
│   ├── js/             # JavaScript files
│   ├── favicon.svg     # Site favicon
│   ├── manifest.json   # PWA manifest
│   ├── robots.txt      # Robots file for SEO
│   ├── sitemap.xml     # XML sitemap
│   └── sw.js           # Service worker
└── next.config.js      # Next.js configuration
```

## 🚢 Deployment

This project is configured for deployment on Netlify or Vercel.

### Netlify Deployment

1. Push your code to GitHub
2. Log in to Netlify
3. Click "New site from Git"
4. Select your repository
5. Build command: `yarn build` or `npm run build`
6. Publish directory: `out`
7. Add the following environment variables:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Your Google Analytics Measurement ID
8. Click "Deploy site"

### Vercel Deployment

1. Push your code to GitHub
2. Log in to Vercel
3. Click "New Project"
4. Import your repository
5. Add the following environment variables:
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`: Your Google Analytics Measurement ID
6. Keep the default settings (Vercel detects Next.js automatically)
7. Click "Deploy"

### Manual Deployment

```bash
# Build the project
yarn build
# or
npm run build

# The static files will be generated in the 'out' directory
```

## 🔍 SEO Features

This project includes several SEO optimizations:

- **Metadata**: Comprehensive title, description, and keywords
- **Structured Data**: JSON-LD implementation for rich search results
- **Sitemap**: XML sitemap for all pages
- **Robots.txt**: Configured for optimal crawling
- **Performance**: Optimized for Core Web Vitals
- **Accessibility**: ARIA attributes and semantic HTML
- **Open Graph**: Meta tags for social media sharing
- **Analytics**: Google Analytics 4 integration

See the [SEO-STRATEGY.md](./SEO-STRATEGY.md) file for a detailed SEO roadmap.

## 🌐 Browser Compatibility

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Opera (latest 2 versions)

## 📱 Progressive Web App

This application is configured as a Progressive Web App (PWA), allowing users to install it on their devices for offline use. Features include:

- Offline functionality
- Add to home screen
- Fast loading times
- Service worker for caching

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [GSAP](https://greensock.com/gsap/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library
- [GitHub API](https://docs.github.com/en/rest) - For fetching GitHub stats

## 📞 Contact

If you have any questions or suggestions, please open an issue or reach out to the maintainers.

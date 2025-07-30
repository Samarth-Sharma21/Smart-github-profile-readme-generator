'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Github, Star, GitFork, Code, Lightbulb, Image, Layout, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'GitHub Profile Tips | Optimize Your GitHub Profile README',
  description: 'Expert tips and best practices for creating an impressive GitHub profile README that showcases your skills and attracts more followers.',
  keywords: 'github profile tips, github readme optimization, github profile best practices, improve github profile, github readme ideas',
};

export default function GitHubProfileTips() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-4"
        >
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold mb-4">GitHub Profile README Tips</h1>
        <p className="text-muted-foreground text-lg">
          Optimize your GitHub profile with these expert tips and best practices to showcase your skills and attract more followers.
        </p>
      </div>
      
      {/* Introduction */}
      <section className="mb-12">
        <div className="bg-muted/30 p-6 rounded-lg border">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Github className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Why Your GitHub Profile README Matters</h2>
              <p className="text-muted-foreground">
                Your GitHub profile README is often the first impression developers, recruiters, and potential collaborators have of you. 
                It's a powerful tool to showcase your skills, highlight your projects, and express your personality. 
                A well-crafted README can significantly increase your visibility in the developer community and open doors to new opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tips List */}
      <div className="space-y-10">
        {/* Tip 1 */}
        <section className="border-b pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Start with a Strong Introduction</h2>
          </div>
          
          <div className="pl-10">
            <p className="text-muted-foreground mb-4">
              Begin your README with a concise and engaging introduction that immediately captures attention. 
              Include a brief greeting, your name, and a one-liner about what you do or are passionate about.
            </p>
            
            <div className="bg-muted/20 p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium mb-2">Example:</h3>
              <div className="bg-background p-3 rounded border text-sm">
                <code>{`# Hi there 👋, I'm Alex Chen

> Full-stack developer passionate about creating accessible web applications that solve real-world problems.`}</code>
              </div>
            </div>
            
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Pro tip:</strong> Consider adding a wave emoji or another friendly icon to make your greeting more personable.
              </p>
            </div>
          </div>
        </section>
        
        {/* Tip 2 */}
        <section className="border-b pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Image className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Add Visual Elements</h2>
          </div>
          
          <div className="pl-10">
            <p className="text-muted-foreground mb-4">
              Incorporate visual elements like badges, GitHub stats, and custom images to make your profile visually appealing 
              and provide quick insights into your skills and activities.
            </p>
            
            <div className="bg-muted/20 p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium mb-2">Popular Visual Elements:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>GitHub stats cards (stars, commits, contributions)</li>
                <li>Language and technology badges</li>
                <li>Contribution graphs and streaks</li>
                <li>Custom banners or headers</li>
                <li>Animated GIFs demonstrating your projects</li>
              </ul>
            </div>
            
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Pro tip:</strong> Use our GitHub Profile README Generator to easily create and customize these visual elements without writing code.
              </p>
            </div>
          </div>
        </section>
        
        {/* Tip 3 */}
        <section className="border-b pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Code className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Showcase Your Tech Stack</h2>
          </div>
          
          <div className="pl-10">
            <p className="text-muted-foreground mb-4">
              Clearly display the technologies, languages, and tools you're proficient in. This helps visitors quickly understand 
              your technical expertise and find common ground for potential collaboration.
            </p>
            
            <div className="bg-muted/20 p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium mb-2">Effective Ways to Display Your Tech Stack:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Organized sections (Frontend, Backend, DevOps, etc.)</li>
                <li>Skill badges with proficiency levels</li>
                <li>Icons representing each technology</li>
                <li>GitHub language statistics</li>
              </ul>
            </div>
            
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Pro tip:</strong> Focus on quality over quantity. Highlight technologies you're truly proficient in rather than listing everything you've ever used.
              </p>
            </div>
          </div>
        </section>
        
        {/* Tip 4 */}
        <section className="border-b pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Highlight Your Best Projects</h2>
          </div>
          
          <div className="pl-10">
            <p className="text-muted-foreground mb-4">
              Feature your most impressive or representative projects with brief descriptions, links, and visual previews. 
              This section should showcase your capabilities and the types of problems you enjoy solving.
            </p>
            
            <div className="bg-muted/20 p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium mb-2">Example Project Showcase Format:</h3>
              <div className="bg-background p-3 rounded border text-sm">
                <code>{`## 🚀 Featured Projects

### Project Name
> Brief one-line description

[![Project Preview](image_link)](project_link)

- Key technology used
- Problem solved
- Your role in the project`}</code>
              </div>
            </div>
            
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Pro tip:</strong> Pin your featured repositories on GitHub so they appear at the top of your profile, creating consistency between your README and profile page.
              </p>
            </div>
          </div>
        </section>
        
        {/* Tip 5 */}
        <section className="border-b pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Layout className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Organize with Clear Sections</h2>
          </div>
          
          <div className="pl-10">
            <p className="text-muted-foreground mb-4">
              Structure your README with clear sections and headings to make it easy to navigate and scan. 
              A well-organized profile helps visitors quickly find the information they're looking for.
            </p>
            
            <div className="bg-muted/20 p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium mb-2">Recommended Sections:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>Introduction/About Me</li>
                <li>Skills/Tech Stack</li>
                <li>Featured Projects</li>
                <li>GitHub Stats</li>
                <li>Current Learning/Goals</li>
                <li>How to Reach Me/Contact Information</li>
                <li>Fun Facts or Personal Interests (optional)</li>
              </ul>
            </div>
            
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Pro tip:</strong> Use markdown dividers (---) or emojis as section markers to create visual separation between different parts of your README.
              </p>
            </div>
          </div>
        </section>
        
        {/* Tip 6 */}
        <section className="border-b pb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <GitFork className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Include Call-to-Actions</h2>
          </div>
          
          <div className="pl-10">
            <p className="text-muted-foreground mb-4">
              Add clear calls-to-action to encourage visitors to engage with you. This could include invitations to collaborate, 
              check out specific projects, or connect on social media.
            </p>
            
            <div className="bg-muted/20 p-4 rounded-md mb-4">
              <h3 className="text-sm font-medium mb-2">Effective CTAs for GitHub Profiles:</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li>"Check out my latest project: [Project Name]"</li>
                <li>"Let's connect on [LinkedIn/Twitter]"</li>
                <li>"I'm currently looking for opportunities in [field/industry]"</li>
                <li>"Feel free to reach out if you need help with [your expertise]"</li>
                <li>"Subscribe to my newsletter/blog for [topic] updates"</li>
              </ul>
            </div>
            
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <p>
                <strong>Pro tip:</strong> Make your contact information easily accessible and provide multiple ways for people to reach you based on their preferences.
              </p>
            </div>
          </div>
        </section>
      </div>
      
      {/* Call to Action */}
      <section className="mt-12 bg-primary/5 p-6 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Ready to Create Your Optimized GitHub Profile?</h2>
        <p className="text-muted-foreground mb-6">
          Use our GitHub Profile README Generator to implement these tips and create a stunning profile that stands out to potential employers and collaborators.
        </p>
        <Button asChild>
          <Link href="/" className="flex items-center gap-2">
            Create Your README Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </section>
      
      {/* Related Resources */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Related Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/markdown-guide" className="block p-4 border rounded-lg hover:bg-muted/20 transition-colors">
            <h3 className="font-medium mb-2">Markdown Cheat Sheet</h3>
            <p className="text-sm text-muted-foreground">Master markdown syntax to create beautiful documentation and READMEs.</p>
          </Link>
          <Link href="/examples" className="block p-4 border rounded-lg hover:bg-muted/20 transition-colors">
            <h3 className="font-medium mb-2">GitHub Profile Examples</h3>
            <p className="text-sm text-muted-foreground">Get inspired by exploring our collection of outstanding GitHub profile README examples.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
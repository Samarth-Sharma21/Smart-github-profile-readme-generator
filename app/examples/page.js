'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export const metadata = {
  title: 'GitHub Profile README Examples | GitHub Profile README Generator',
  description: 'Get inspired by our collection of outstanding GitHub profile README examples. See how developers showcase their skills, projects, and personality.',
  keywords: 'github profile examples, github readme examples, github profile inspiration, github readme templates, github profile showcase',
};

export default function ExamplesPage() {
  const [activeTab, setActiveTab] = useState('minimal');
  
  const examples = {
    minimal: [
      {
        username: 'sindresorhus',
        description: 'Clean and minimal profile with emoji section dividers and concise information.',
        features: ['Emoji dividers', 'Concise bio', 'Social links', 'Support section'],
        profileUrl: 'https://github.com/sindresorhus',
        previewImage: 'https://opengraph.githubassets.com/1/sindresorhus/sindresorhus',
      },
      {
        username: 'gaearon',
        description: 'Simple profile with a brief introduction and links to blog posts.',
        features: ['Brief introduction', 'Blog links', 'Minimalist design'],
        profileUrl: 'https://github.com/gaearon',
        previewImage: 'https://opengraph.githubassets.com/1/gaearon/gaearon',
      },
      {
        username: 'kentcdodds',
        description: 'Straightforward profile with a personal introduction and key links.',
        features: ['Personal introduction', 'Key links', 'Clean layout'],
        profileUrl: 'https://github.com/kentcdodds',
        previewImage: 'https://opengraph.githubassets.com/1/kentcdodds/kentcdodds',
      },
    ],
    visual: [
      {
        username: 'anuraghazra',
        description: 'Creator of GitHub Stats cards with a visually appealing profile showcasing statistics.',
        features: ['GitHub stats', 'Top languages', 'Contribution graph', 'Repository pins'],
        profileUrl: 'https://github.com/anuraghazra',
        previewImage: 'https://opengraph.githubassets.com/1/anuraghazra/anuraghazra',
      },
      {
        username: 'abhisheknaiidu',
        description: 'Visually rich profile with custom badges, stats, and a Spotify widget.',
        features: ['Custom badges', 'GitHub stats', 'Spotify integration', 'Social links'],
        profileUrl: 'https://github.com/abhisheknaiidu',
        previewImage: 'https://opengraph.githubassets.com/1/abhisheknaiidu/abhisheknaiidu',
      },
      {
        username: 'DenverCoder1',
        description: 'Colorful profile with custom badges, project showcases, and GitHub stats.',
        features: ['Custom badges', 'Project cards', 'GitHub stats', 'Activity graph'],
        profileUrl: 'https://github.com/DenverCoder1',
        previewImage: 'https://opengraph.githubassets.com/1/DenverCoder1/DenverCoder1',
      },
    ],
    comprehensive: [
      {
        username: 'adamalston',
        description: 'Comprehensive profile with skills, projects, and a clean dark/light theme.',
        features: ['Skills section', 'Project showcase', 'Dark/light theme', 'Clean design'],
        profileUrl: 'https://github.com/adamalston',
        previewImage: 'https://opengraph.githubassets.com/1/adamalston/adamalston',
      },
      {
        username: 'thmsgbrt',
        description: 'Dynamic README with automatically updated content like weather and latest blog posts.',
        features: ['Dynamic content', 'Weather widget', 'Blog integration', 'Visitor counter'],
        profileUrl: 'https://github.com/thmsgbrt',
        previewImage: 'https://opengraph.githubassets.com/1/thmsgbrt/thmsgbrt',
      },
      {
        username: 'codeSTACKr',
        description: 'Detailed profile with YouTube videos, blog posts, and comprehensive skills section.',
        features: ['YouTube integration', 'Blog posts', 'Detailed skills', 'GitHub stats'],
        profileUrl: 'https://github.com/codeSTACKr',
        previewImage: 'https://opengraph.githubassets.com/1/codeSTACKr/codeSTACKr',
      },
    ],
    creative: [
      {
        username: 'simonw',
        description: 'Unique profile with automatically updated project releases and blog posts.',
        features: ['Auto-updated content', 'Project releases', 'Blog integration', 'TIL section'],
        profileUrl: 'https://github.com/simonw',
        previewImage: 'https://opengraph.githubassets.com/1/simonw/simonw',
      },
      {
        username: 'JessicaLim8',
        description: 'Interactive word cloud that visitors can contribute to by opening an issue.',
        features: ['Interactive elements', 'Community contribution', 'Word cloud', 'Visitor engagement'],
        profileUrl: 'https://github.com/JessicaLim8',
        previewImage: 'https://opengraph.githubassets.com/1/JessicaLim8/JessicaLim8',
      },
      {
        username: 'bdougie',
        description: 'Creative profile with custom illustrations and a unique layout.',
        features: ['Custom illustrations', 'Unique layout', 'Personal branding', 'Project highlights'],
        profileUrl: 'https://github.com/bdougie',
        previewImage: 'https://opengraph.githubassets.com/1/bdougie/bdougie',
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
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
        
        <h1 className="text-3xl font-bold mb-4">GitHub Profile README Examples</h1>
        <p className="text-muted-foreground text-lg">
          Get inspired by these outstanding GitHub profile READMEs from developers around the world.
        </p>
      </div>
      
      {/* Introduction */}
      <section className="mb-12">
        <div className="bg-muted/30 p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Why Great Examples Matter</h2>
          <p className="text-muted-foreground mb-4">
            Studying well-crafted GitHub profile READMEs can help you understand effective ways to showcase your skills, 
            projects, and personality. These examples demonstrate different styles and approaches, from minimal and clean 
            to visually rich and comprehensive.
          </p>
          <p className="text-muted-foreground">
            Browse through these examples for inspiration, then use our README Generator to create your own stunning profile.
          </p>
        </div>
      </section>
      
      {/* Category Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 border-b">
          {Object.keys(examples).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${activeTab === category ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Examples Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {examples[activeTab].map((example, index) => (
          <div key={index} className="border rounded-lg overflow-hidden flex flex-col h-full">
            <div className="aspect-video bg-muted relative overflow-hidden">
              <img 
                src={example.previewImage} 
                alt={`${example.username}'s GitHub profile`} 
                className="w-full h-full object-cover transition-transform hover:scale-105"
              />
            </div>
            
            <div className="p-4 flex-grow">
              <h3 className="text-xl font-semibold mb-2">
                @{example.username}
              </h3>
              <p className="text-muted-foreground mb-4">
                {example.description}
              </p>
              
              <h4 className="text-sm font-medium mb-2">Key Features:</h4>
              <ul className="text-sm text-muted-foreground mb-4">
                {example.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 mb-1">
                    <span className="text-primary font-bold">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 pt-0 mt-auto">
              <Button asChild variant="outline" className="w-full">
                <a 
                  href={example.profileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  View Profile
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tips Section */}
      <section className="mb-12 bg-primary/5 p-6 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">What Makes a Great GitHub Profile README?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Content Elements</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>A concise and engaging introduction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Visual elements like badges, stats, or graphics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Showcase of key projects or contributions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Skills and technologies you work with</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Contact information or social links</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">Design Principles</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Clean organization with clear sections</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Balanced visual elements (not too cluttered)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Personality that reflects your unique style</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Accessibility considerations for all users</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Regular updates to keep content fresh</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Ready to Create Your Own GitHub Profile README?</h2>
        <p className="text-muted-foreground mb-6">
          Use our GitHub Profile README Generator to create a stunning profile inspired by these examples, without having to write the markdown yourself.
        </p>
        <Button asChild>
          <Link href="/" className="flex items-center gap-2">
            Create Your README Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </section>
      
      {/* Related Resources */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Related Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/tips" className="block p-4 border rounded-lg hover:bg-muted/20 transition-colors">
            <h3 className="font-medium mb-2">GitHub Profile Tips</h3>
            <p className="text-sm text-muted-foreground">Learn best practices for creating an impressive GitHub profile that stands out.</p>
          </Link>
          <Link href="/markdown-guide" className="block p-4 border rounded-lg hover:bg-muted/20 transition-colors">
            <h3 className="font-medium mb-2">Markdown Cheat Sheet</h3>
            <p className="text-sm text-muted-foreground">Master the markdown syntax used to create beautiful GitHub profile READMEs.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
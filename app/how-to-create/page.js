'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Github, Code, FileCode, Lightbulb, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

export default function HowToCreateGithubProfile() {
  return (
    <div className="container mx-auto px-4 py-12 overflow-hidden break-words overflow-wrap-break-word">
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
        
        <h1 className="text-3xl font-bold mb-4">How to Create a GitHub Profile README</h1>
        <p className="text-muted-foreground text-lg">
          A step-by-step guide to creating your own GitHub profile README to showcase your skills, projects, and personality.
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
              <h2 className="text-xl font-semibold mb-2">What is a GitHub Profile README?</h2>
              <p className="text-muted-foreground">
                A GitHub Profile README is a special repository that appears at the top of your GitHub profile page. 
                It allows you to showcase your skills, projects, achievements, and anything else you want visitors to know about you. 
                It's a powerful way to make a great first impression and stand out in the developer community.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Step-by-Step Guide */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Step-by-Step Guide</h2>
        
        {/* Step 1 */}
        <div className="mb-8 border rounded-lg overflow-hidden">
          <div className="bg-primary/5 p-4 border-b">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
              Create a Special Repository
            </h3>
          </div>
          <div className="p-6">
            <p className="mb-4">
              To create a GitHub Profile README, you need to create a new repository with the <strong>exact same name as your GitHub username</strong>.
            </p>
            <div className="bg-muted p-4 rounded-md mb-4">
              <ol className="list-decimal list-inside space-y-2">
                <li>Log in to your GitHub account</li>
                <li>Click on the "+" icon in the top-right corner and select "New repository"</li>
                <li>Name the repository exactly the same as your GitHub username (case-sensitive)</li>
                <li>Make the repository public</li>
                <li>Check the box that says "Add a README file"</li>
                <li>Click "Create repository"</li>
              </ol>
            </div>
            <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 p-3 rounded-md">
              <AlertCircle className="w-4 h-4" />
              <p>
                <strong>Important:</strong> The repository name must match your GitHub username exactly, including capitalization.
              </p>
            </div>
          </div>
        </div>
        
        {/* Step 2 */}
        <div className="mb-8 border rounded-lg overflow-hidden">
          <div className="bg-primary/5 p-4 border-b">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
              Edit Your README File
            </h3>
          </div>
          <div className="p-6">
            <p className="mb-4">
              Once you've created the repository, you'll be taken to the README.md file where you can start editing. 
              This file supports Markdown formatting, which allows you to create rich content with headings, lists, links, images, and more.
            </p>
            <div className="bg-muted p-4 rounded-md mb-4">
              <p className="mb-2 font-medium">You can edit your README in several ways:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Directly on GitHub using the web editor</li>
                <li>Clone the repository to your local machine and edit with your preferred code editor</li>
                <li>Use our <Link href="/" className="text-primary hover:underline">Smart GitHub Profile README Generator</Link> to create a professional README without writing code</li>
              </ul>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 p-3 rounded-md">
              <Lightbulb className="w-4 h-4" />
              <p>
                <strong>Tip:</strong> Preview your changes frequently to make sure your README looks the way you want it to.
              </p>
            </div>
          </div>
        </div>
        
        {/* Step 3 */}
        <div className="mb-8 border rounded-lg overflow-hidden">
          <div className="bg-primary/5 p-4 border-b">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
              Customize Your README
            </h3>
          </div>
          <div className="p-6">
            <p className="mb-4">
              Your README is a reflection of you as a developer. Make it unique and showcase what makes you special.
            </p>
            <div className="bg-muted p-4 rounded-md mb-4">
              <p className="mb-2 font-medium">Here are some elements you might want to include:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>A brief introduction about yourself</li>
                <li>Your skills and technologies you work with</li>
                <li>Current projects you're working on</li>
                <li>GitHub stats and achievements</li>
                <li>Social media and contact links</li>
                <li>Fun facts or hobbies</li>
                <li>Badges and certifications</li>
              </ul>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 p-3 rounded-md">
              <Lightbulb className="w-4 h-4" />
              <p>
                <strong>Tip:</strong> Use our <Link href="/tips" className="text-primary hover:underline">GitHub Profile Tips</Link> page for more ideas on how to make your README stand out.
              </p>
            </div>
          </div>
        </div>
        
        {/* Step 4 */}
        <div className="mb-8 border rounded-lg overflow-hidden">
          <div className="bg-primary/5 p-4 border-b">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">4</span>
              Add Visual Elements
            </h3>
          </div>
          <div className="p-6">
            <p className="mb-4">
              Visual elements can make your README more engaging and help it stand out from the crowd.
            </p>
            <div className="bg-muted p-4 rounded-md mb-4">
              <p className="mb-2 font-medium">Consider adding these visual elements:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Header image or banner</li>
                <li>Profile picture or avatar</li>
                <li>Icons for skills and technologies</li>
                <li>GitHub stats cards and graphs</li>
                <li>Project screenshots or GIFs</li>
                <li>Custom badges and shields</li>
              </ul>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 p-3 rounded-md">
              <Lightbulb className="w-4 h-4" />
              <p>
                <strong>Tip:</strong> Use services like Shields.io for badges, GitHub Readme Stats for dynamic stats, and Canva for creating custom graphics.
              </p>
            </div>
          </div>
        </div>
        
        {/* Step 5 */}
        <div className="mb-8 border rounded-lg overflow-hidden">
          <div className="bg-primary/5 p-4 border-b">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">5</span>
              Commit and Verify
            </h3>
          </div>
          <div className="p-6">
            <p className="mb-4">
              After you've created your README, commit your changes and verify that it appears correctly on your profile.
            </p>
            <div className="bg-muted p-4 rounded-md mb-4">
              <ol className="list-decimal list-inside space-y-2">
                <li>Commit your changes with a descriptive message</li>
                <li>Push the changes to GitHub (if editing locally)</li>
                <li>Visit your GitHub profile page to see your README in action</li>
                <li>Make any necessary adjustments and commit again</li>
              </ol>
            </div>
            <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 p-3 rounded-md">
              <CheckCircle2 className="w-4 h-4" />
              <p>
                <strong>Success:</strong> Your README should now appear at the top of your GitHub profile page!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Examples Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Inspiring Examples</h2>
        <p className="mb-6">
          Looking for inspiration? Check out these impressive GitHub profile READMEs from the community:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <Button 
            variant="outline" 
            className="h-auto p-6 flex flex-col items-start gap-2 text-left break-words overflow-hidden whitespace-normal"
            onClick={() => window.open('https://github.com/abhisheknaiidu', '_blank')}
          >
            <div className="flex items-center gap-2 font-medium">
              <Github className="w-5 h-5" />
              abhisheknaiidu
              <ExternalLink className="w-4 h-4 ml-1" />
            </div>
            <p className="text-muted-foreground text-sm w-full break-words">
              Features a clean design with tech stack, GitHub stats, and blog posts.
            </p>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-6 flex flex-col items-start gap-2 text-left break-words overflow-hidden whitespace-normal"
            onClick={() => window.open('https://github.com/anuraghazra', '_blank')}
          >
            <div className="flex items-center gap-2 font-medium">
              <Github className="w-5 h-5" />
              anuraghazra
              <ExternalLink className="w-4 h-4 ml-1" />
            </div>
            <p className="text-muted-foreground text-sm w-full break-words">
              Creator of GitHub Readme Stats with an interactive and visually appealing profile.
            </p>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-6 flex flex-col items-start gap-2 text-left break-words overflow-hidden whitespace-normal"
            onClick={() => window.open('https://github.com/codeSTACKr', '_blank')}
          >
            <div className="flex items-center gap-2 font-medium">
              <Github className="w-5 h-5" />
              codeSTACKr
              <ExternalLink className="w-4 h-4 ml-1" />
            </div>
            <p className="text-muted-foreground text-sm w-full break-words">
              Includes animated GIFs, social links, and latest YouTube videos.
            </p>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto p-6 flex flex-col items-start gap-2 text-left break-words overflow-hidden whitespace-normal"
            onClick={() => window.open('https://github.com/DenverCoder1', '_blank')}
          >
            <div className="flex items-center gap-2 font-medium">
              <Github className="w-5 h-5" />
              DenverCoder1
              <ExternalLink className="w-4 h-4 ml-1" />
            </div>
            <p className="text-muted-foreground text-sm w-full break-words">
              Showcases projects with preview images and features a comprehensive skills section.
            </p>
          </Button>
        </div>
        <div className="mt-6">
          <Button asChild>
            <Link href="/examples" className="flex items-center gap-2">
              View More Examples
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="mb-12">
        <div className="bg-primary/10 p-8 rounded-lg border border-primary/20 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Create Your Own?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Use our Smart GitHub Profile README Generator to create a stunning profile without writing a single line of code.
            Customize your README with just a few clicks and stand out in the developer community.
          </p>
          <Button asChild size="lg">
            <Link href="/" className="flex items-center gap-2">
              <FileCode className="w-5 h-5" />
              Create Your README Now
            </Link>
          </Button>
        </div>
      </section>
      
      {/* Additional Resources */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Additional Resources</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Markdown Guide</h3>
            <p className="text-muted-foreground mb-4">
              Learn how to format your README with Markdown syntax for headings, lists, links, images, and more.
            </p>
            <Button asChild variant="outline">
              <Link href="/markdown-guide" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                View Markdown Guide
              </Link>
            </Button>
          </div>
          
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">GitHub Profile Tips</h3>
            <p className="text-muted-foreground mb-4">
              Discover expert tips and best practices to optimize your GitHub profile and attract more followers.
            </p>
            <Button asChild variant="outline">
              <Link href="/tips" className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4" />
                View Profile Tips
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
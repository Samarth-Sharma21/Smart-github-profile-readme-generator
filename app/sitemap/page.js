'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SitemapPage() {
  return (
    <div className="container py-12 mx-auto">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-6">Sitemap</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Main Pages</h2>
          <ul className="space-y-2 ml-6 list-disc">
            <li>
              <Link href="/" className="text-primary hover:underline">
                Home
              </Link>
              <p className="text-sm text-muted-foreground mt-1">The main page with the GitHub Profile README Generator tool.</p>
            </li>
            <li>
              <Link href="/examples" className="text-primary hover:underline">
                GitHub Profile Examples
              </Link>
              <p className="text-sm text-muted-foreground mt-1">Browse creative GitHub profile examples for inspiration.</p>
            </li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Resources</h2>
          <ul className="space-y-2 ml-6 list-disc">
            <li>
              <Link href="/tips" className="text-primary hover:underline">
                GitHub Profile Tips
              </Link>
              <p className="text-sm text-muted-foreground mt-1">Tips and best practices for creating an effective GitHub profile.</p>
            </li>
            <li>
              <Link href="/markdown-guide" className="text-primary hover:underline">
                Markdown Cheat Sheet
              </Link>
              <p className="text-sm text-muted-foreground mt-1">A guide to Markdown syntax for formatting your GitHub profile README.</p>
            </li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4">Legal Pages</h2>
          <ul className="space-y-2 ml-6 list-disc">
            <li>
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              <p className="text-sm text-muted-foreground mt-1">Our privacy policy and data handling practices.</p>
            </li>
            <li>
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>
              <p className="text-sm text-muted-foreground mt-1">Terms and conditions for using our service.</p>
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
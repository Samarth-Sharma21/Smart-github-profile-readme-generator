'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Copy } from 'lucide-react';
import { useState } from 'react';

export const metadata = {
  title: 'Markdown Cheat Sheet | GitHub Profile README Generator',
  description: 'Complete markdown guide for creating beautiful GitHub profile READMEs. Learn syntax for headers, formatting, links, images, code blocks, and more.',
  keywords: 'markdown guide, github markdown, readme markdown, markdown cheat sheet, markdown syntax, github profile markdown',
};

export default function MarkdownGuide() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const markdownExamples = [
    {
      category: 'Headers',
      examples: [
        { syntax: '# Heading 1', result: '<h1>Heading 1</h1>' },
        { syntax: '## Heading 2', result: '<h2>Heading 2</h2>' },
        { syntax: '### Heading 3', result: '<h3>Heading 3</h3>' },
        { syntax: '#### Heading 4', result: '<h4>Heading 4</h4>' },
        { syntax: '##### Heading 5', result: '<h5>Heading 5</h5>' },
        { syntax: '###### Heading 6', result: '<h6>Heading 6</h6>' },
      ]
    },
    {
      category: 'Emphasis',
      examples: [
        { syntax: '*Italic text*', result: '<em>Italic text</em>' },
        { syntax: '_Italic text_', result: '<em>Italic text</em>' },
        { syntax: '**Bold text**', result: '<strong>Bold text</strong>' },
        { syntax: '__Bold text__', result: '<strong>Bold text</strong>' },
        { syntax: '~~Strikethrough~~', result: '<del>Strikethrough</del>' },
      ]
    },
    {
      category: 'Lists',
      examples: [
        { 
          syntax: '1. First item\n2. Second item\n3. Third item', 
          result: '<ol>\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n</ol>' 
        },
        { 
          syntax: '- First item\n- Second item\n- Third item', 
          result: '<ul>\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n</ul>' 
        },
        { 
          syntax: '* First item\n* Second item\n* Third item', 
          result: '<ul>\n  <li>First item</li>\n  <li>Second item</li>\n  <li>Third item</li>\n</ul>' 
        },
        { 
          syntax: '- First item\n  - Nested item\n    - Deeply nested', 
          result: '<ul>\n  <li>First item\n    <ul>\n      <li>Nested item\n        <ul>\n          <li>Deeply nested</li>\n        </ul>\n      </li>\n    </ul>\n  </li>\n</ul>' 
        },
      ]
    },
    {
      category: 'Links',
      examples: [
        { syntax: '[Link text](https://www.example.com)', result: '<a href="https://www.example.com">Link text</a>' },
        { syntax: '[Link with title](https://www.example.com "Title")', result: '<a href="https://www.example.com" title="Title">Link with title</a>' },
        { syntax: '<https://www.example.com>', result: '<a href="https://www.example.com">https://www.example.com</a>' },
      ]
    },
    {
      category: 'Images',
      examples: [
        { syntax: '![Alt text](image.jpg)', result: '<img src="image.jpg" alt="Alt text">' },
        { syntax: '![Alt text](image.jpg "Image title")', result: '<img src="image.jpg" alt="Alt text" title="Image title">' },
        { syntax: '[![Link image](image.jpg)](https://example.com)', result: '<a href="https://example.com"><img src="image.jpg" alt="Link image"></a>' },
      ]
    },
    {
      category: 'Code',
      examples: [
        { syntax: '`inline code`', result: '<code>inline code</code>' },
        { 
          syntax: '```\ncode block\nwith multiple\nlines\n```', 
          result: '<pre><code>code block\nwith multiple\nlines</code></pre>' 
        },
        { 
          syntax: '```javascript\nconst greeting = "Hello, world!"\nconsole.log(greeting);\n```', 
          result: '<pre><code class="language-javascript">const greeting = "Hello, world!"\nconsole.log(greeting);</code></pre>' 
        },
      ]
    },
    {
      category: 'Tables',
      examples: [
        { 
          syntax: '| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |\n| Cell 3   | Cell 4   |', 
          result: '<table>\n  <thead>\n    <tr>\n      <th>Header 1</th>\n      <th>Header 2</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Cell 1</td>\n      <td>Cell 2</td>\n    </tr>\n    <tr>\n      <td>Cell 3</td>\n      <td>Cell 4</td>\n    </tr>\n  </tbody>\n</table>' 
        },
        { 
          syntax: '| Left | Center | Right |\n|:-----|:------:|------:|\n| Left | Center | Right |', 
          result: '<table>\n  <thead>\n    <tr>\n      <th align="left">Left</th>\n      <th align="center">Center</th>\n      <th align="right">Right</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td align="left">Left</td>\n      <td align="center">Center</td>\n      <td align="right">Right</td>\n    </tr>\n  </tbody>\n</table>' 
        },
      ]
    },
    {
      category: 'Blockquotes',
      examples: [
        { 
          syntax: '> This is a blockquote\n> It can span multiple lines', 
          result: '<blockquote>\n  <p>This is a blockquote\nIt can span multiple lines</p>\n</blockquote>' 
        },
        { 
          syntax: '> Blockquote\n>> Nested blockquote', 
          result: '<blockquote>\n  <p>Blockquote</p>\n  <blockquote>\n    <p>Nested blockquote</p>\n  </blockquote>\n</blockquote>' 
        },
      ]
    },
    {
      category: 'Horizontal Rules',
      examples: [
        { syntax: '---', result: '<hr>' },
        { syntax: '***', result: '<hr>' },
        { syntax: '___', result: '<hr>' },
      ]
    },
    {
      category: 'GitHub Specific',
      examples: [
        { 
          syntax: '- [x] Completed task\n- [ ] Incomplete task', 
          result: '<ul class="contains-task-list">\n  <li class="task-list-item"><input type="checkbox" checked> Completed task</li>\n  <li class="task-list-item"><input type="checkbox"> Incomplete task</li>\n</ul>' 
        },
        { syntax: ':smile: :heart: :rocket:', result: '😄 ❤️ 🚀' },
        { 
          syntax: '```mermaid\ngraph TD;\n    A-->B;\n    A-->C;\n    B-->D;\n    C-->D;\n```', 
          result: '<div class="mermaid">graph TD;\n    A-->B;\n    A-->C;\n    B-->D;\n    C-->D;</div>' 
        },
      ]
    },
    {
      category: 'Badges',
      examples: [
        { 
          syntax: '![GitHub stars](https://img.shields.io/github/stars/username/repo?style=social)', 
          result: '<img src="https://img.shields.io/github/stars/username/repo?style=social" alt="GitHub stars">' 
        },
        { 
          syntax: '![Profile views](https://komarev.com/ghpvc/?username=your-github-username)', 
          result: '<img src="https://komarev.com/ghpvc/?username=your-github-username" alt="Profile views">' 
        },
      ]
    },
  ];

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
        
        <h1 className="text-3xl font-bold mb-4">Markdown Cheat Sheet</h1>
        <p className="text-muted-foreground text-lg">
          A comprehensive guide to Markdown syntax for creating beautiful GitHub profile READMEs.
        </p>
      </div>
      
      {/* Introduction */}
      <section className="mb-12">
        <div className="bg-muted/30 p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">What is Markdown?</h2>
          <p className="text-muted-foreground mb-4">
            Markdown is a lightweight markup language with plain text formatting syntax. 
            It's designed to be easy to write and easy to read, and can be converted to HTML and many other formats. 
            GitHub uses a version of Markdown called GitHub Flavored Markdown (GFM) which includes additional features like tables, 
            task lists, and syntax highlighting for code blocks.
          </p>
          <p className="text-muted-foreground">
            This cheat sheet covers the most common Markdown syntax used in GitHub READMEs, including GitHub-specific features.
          </p>
        </div>
      </section>
      
      {/* Markdown Examples */}
      <div className="space-y-12">
        {markdownExamples.map((category, categoryIndex) => (
          <section key={categoryIndex} className="border-b pb-8">
            <h2 className="text-xl font-semibold mb-6">{category.category}</h2>
            
            <div className="space-y-6">
              {category.examples.map((example, exampleIndex) => {
                const index = `${categoryIndex}-${exampleIndex}`;
                return (
                  <div key={index} className="bg-muted/20 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">Markdown Syntax</h3>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => copyToClipboard(example.syntax, index)}
                        className="h-8 px-2"
                      >
                        {copiedIndex === index ? (
                          <span className="text-xs text-green-500">Copied!</span>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 mr-1" />
                            <span className="text-xs">Copy</span>
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="bg-background p-3 rounded border text-sm font-mono mb-4 whitespace-pre-wrap">
                      {example.syntax}
                    </div>
                    
                    <h3 className="text-sm font-medium mb-2">Rendered Result</h3>
                    <div className="bg-background p-3 rounded border text-sm">
                      <div dangerouslySetInnerHTML={{ __html: example.result }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      
      {/* Tips Section */}
      <section className="mt-12 bg-primary/5 p-6 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Markdown Tips for GitHub READMEs</h2>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Use headers to organize your README into clear sections</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Add badges to showcase project stats, build status, or version information</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Include screenshots or GIFs to demonstrate your project visually</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Use code blocks with language specification for proper syntax highlighting</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Create a table of contents for longer READMEs using anchor links</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">•</span>
            <span>Use emojis strategically to add visual interest and highlight important points</span>
          </li>
        </ul>
      </section>
      
      {/* Call to Action */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Ready to Create Your GitHub Profile README?</h2>
        <p className="text-muted-foreground mb-6">
          Use our GitHub Profile README Generator to create a stunning profile with perfect markdown formatting, without having to write the markdown yourself.
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
          <Link href="/tips" className="block p-4 border rounded-lg hover:bg-muted/20 transition-colors">
            <h3 className="font-medium mb-2">GitHub Profile Tips</h3>
            <p className="text-sm text-muted-foreground">Learn best practices for creating an impressive GitHub profile that stands out.</p>
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
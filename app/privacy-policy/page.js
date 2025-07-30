'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | GitHub Profile README Generator',
  description: 'Privacy policy for the GitHub Profile README Generator tool. Learn how we handle your data and protect your privacy.',
  keywords: 'github readme generator privacy, github profile privacy policy, readme generator data policy',
};

export default function PrivacyPolicy() {
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
        
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: {new Date().toISOString().split('T')[0]}</p>
      </div>
      
      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Introduction</h2>
          <p>
            At GitHub Profile README Generator, we respect your privacy and are committed to protecting your personal data.
            This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Information We Collect</h2>
          <p className="mb-4">
            We collect minimal information to provide and improve our service. The information we may collect includes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Usage Data:</strong> Information on how you use our website, including pages visited and actions taken.</li>
            <li><strong>Analytics Data:</strong> Anonymous data collected through Google Analytics to understand user behavior.</li>
            <li><strong>Local Storage Data:</strong> We may store your README preferences locally in your browser to improve your experience.</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">How We Use Your Information</h2>
          <p className="mb-4">We use the collected information for various purposes, including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our service</li>
            <li>To improve our website based on how visitors use it</li>
            <li>To analyze usage patterns and optimize user experience</li>
            <li>To develop new features and functionality</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Cookies and Tracking</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and store certain information.
            Cookies are files with a small amount of data that may include an anonymous unique identifier.
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Third-Party Services</h2>
          <p>
            We may employ third-party companies and individuals to facilitate our service, provide the service on our behalf,
            perform service-related tasks, or assist us in analyzing how our service is used. These third parties have
            access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose
            or use it for any other purpose.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Data Security</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet
            or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect
            your Personal Data, we cannot guarantee its absolute security.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Your Data Rights</h2>
          <p className="mb-4">
            Depending on your location, you may have certain rights regarding your personal data, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>The right to access information we have about you</li>
            <li>The right to rectification of inaccurate personal data</li>
            <li>The right to erasure of your personal data</li>
            <li>The right to restrict or object to processing of your personal data</li>
            <li>The right to data portability</li>
          </ul>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
            You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>
        
        <section>
          <h2 className="text-xl font-semibold mb-4 text-foreground">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us by creating an issue on our
            <a href="https://github.com/Samarth-Sharma21/Smart-github-profile-readme-generator" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
              GitHub repository
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
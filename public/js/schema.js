// Schema.org structured data for the GitHub Profile README Generator

const baseSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "GitHub Profile README Generator",
  "alternateName": "GitHub Profile Generator",
  "url": "https://github-profile-readme-generator.vercel.app/",
  "logo": "https://github-profile-readme-generator.vercel.app/favicon.svg",
  "description": "Create beautiful, customized GitHub profile READMEs with ease. Showcase your skills, projects, and personality with our user-friendly generator.",
  "applicationCategory": "DeveloperApplication",
  "applicationSubCategory": "ProfileGenerator",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "120",
    "bestRating": "5",
    "worstRating": "1"
  },
  "keywords": "github profile readme generator, github readme generator, github profile, readme markdown, github profile page, developer profile, github markdown, readme template, github bio",
  "author": {
    "@type": "Organization",
    "name": "GitHub Profile README Generator",
    "url": "https://github-profile-readme-generator.vercel.app/"
  },
  "datePublished": "2023-01-01",
  "dateModified": "2023-11-01"
};

// Function to generate the Organization schema
function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GitHub Profile README Generator",
    "url": "https://github-profile-readme-generator.vercel.app/",
    "logo": "https://github-profile-readme-generator.vercel.app/favicon.svg",
    "sameAs": [
      "https://github.com/",
      "https://twitter.com/",
      "https://www.linkedin.com/"
    ]
  };
}

// Function to generate the BreadcrumbList schema
function getBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

// Function to generate the FAQPage schema
function getFAQSchema(questions) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };
}

// Export the schemas for use in different pages
if (typeof window !== 'undefined') {
  window.SchemaOrg = {
    baseSchema,
    getOrganizationSchema,
    getBreadcrumbSchema,
    getFAQSchema
  };
}
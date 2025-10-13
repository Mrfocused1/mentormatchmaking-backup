import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Browse Mentors | Find Your Perfect Mentor in Any Industry - Look 4 Mentors",
  description: "Discover experienced mentors across technology, finance, marketing, design, and more. Filter by expertise, industry, availability, and experience level to find your ideal mentor match.",
  keywords: "find mentor, browse mentors, professional mentorship, career mentors, industry experts, verified mentors, mentor matching, mentorship platform, find career mentor online",
  openGraph: {
    title: "Browse Professional Mentors | Look 4 Mentors",
    description: "Connect with verified mentors in technology, business, finance, marketing and more. Find your perfect mentor match today.",
    type: "website",
    url: "https://look4mentors.com/browse-mentors",
    siteName: "Look 4 Mentors",
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Professional Mentors | Look 4 Mentors",
    description: "Connect with verified mentors across all industries",
  },
  alternates: {
    canonical: "https://look4mentors.com/browse-mentors",
  },
}

export default function BrowseMentorsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ItemList Structured Data for Mentors
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Professional Mentors",
    "description": "Browse verified professional mentors across all industries",
    "url": "https://look4mentors.com/browse-mentors"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {children}
    </>
  )
}

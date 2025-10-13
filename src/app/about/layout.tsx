import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Us - Our Mission to Democratize Mentorship | Look 4 Mentors",
  description: "Learn about Look 4 Mentors' mission to make professional mentorship accessible to everyone. Discover our story, values, and commitment to connecting ambitious individuals with experienced mentors worldwide. Join our global community of 10,000+ mentors and 50,000+ successful matches.",
  keywords: "about look 4 mentors, mentorship platform mission, professional mentorship community, mentorship values, our story, who we are, mentorship company, global mentorship network, verified mentors, career guidance platform",
  openGraph: {
    title: "About Look 4 Mentors - Connecting Ambition with Experience",
    description: "Our mission is to democratize mentorship by connecting ambitious individuals with experienced mentors. Join 10,000+ mentors and 50,000+ successful matches worldwide.",
    type: "website",
    url: "https://look4mentors.com/about",
    siteName: "Look 4 Mentors",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Look 4 Mentors",
    description: "Making mentorship accessible to everyone, everywhere",
  },
  alternates: {
    canonical: "https://look4mentors.com/about",
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // AboutPage Structured Data
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Look 4 Mentors",
      "alternateName": "Look4Mentors",
      "description": "Professional mentorship platform connecting experienced mentors with mentees across all industries for career growth and personal development.",
      "foundingDate": "2020",
      "url": "https://look4mentors.com",
      "logo": "https://look4mentors.com/logo.svg",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "support@look4mentors.com"
      },
      "areaServed": "Worldwide",
      "slogan": "Connecting Ambition with Experience"
    },
    "about": "Look 4 Mentors democratizes access to quality mentorship by connecting ambitious individuals with experienced mentors who can help them navigate their personal and professional journeys."
  };

  // CollectionPage for Organizational Values
  const valuesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Look 4 Mentors Core Values",
    "description": "The principles that guide everything we do at Look 4 Mentors",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Empowerment",
        "description": "We believe in empowering individuals to reach their full potential through meaningful mentorship connections."
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Trust & Safety",
        "description": "Creating a safe, secure environment where mentors and mentees can connect with confidence."
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Inclusivity",
        "description": "Building a diverse community that welcomes individuals from all backgrounds, industries, and life stages."
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Growth",
        "description": "Fostering continuous learning and development for both mentors and mentees."
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(valuesSchema) }}
      />
      {children}
    </>
  )
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Get Started - Become a Mentor or Find a Mentor | Look 4 Mentors",
  description: "Start your mentorship journey today. Choose to become a mentor and share your expertise, or find a mentor to guide your personal and professional growth. Free mentorship platform connecting experienced professionals with mentees worldwide.",
  keywords: "get started mentorship, become a mentor, find a mentor, mentorship sign up, mentor registration, mentee registration, start mentoring, mentorship platform, career mentor, professional mentorship, free mentorship",
  openGraph: {
    title: "Get Started with Look 4 Mentors - Choose Your Path",
    description: "Become a mentor to share your expertise or find a mentor to accelerate your growth. Join thousands in meaningful mentorship relationships.",
    type: "website",
    url: "https://look4mentors.com/get-started",
    siteName: "Look 4 Mentors",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Started with Look 4 Mentors",
    description: "Choose your mentorship path - become a mentor or find one",
  },
  alternates: {
    canonical: "https://look4mentors.com/get-started",
  },
}

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // HowTo Structured Data
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Get Started with Look 4 Mentors",
    "description": "Learn how to start your mentorship journey on Look 4 Mentors platform",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Create Your Profile",
        "text": "Tell us about yourself, your goals, and what you're looking for in a mentorship relationship.",
        "position": 1
      },
      {
        "@type": "HowToStep",
        "name": "Get Matched",
        "text": "Our smart matching algorithm connects you with the perfect mentor or mentee based on your profile.",
        "position": 2
      },
      {
        "@type": "HowToStep",
        "name": "Start Growing",
        "text": "Begin messaging your mentor or mentee and start your journey toward personal and professional growth.",
        "position": 3
      }
    ]
  };

  // Service Structured Data
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Professional Mentorship Platform",
    "provider": {
      "@type": "Organization",
      "name": "Look 4 Mentors"
    },
    "areaServed": "Worldwide",
    "offers": [
      {
        "@type": "Offer",
        "name": "Mentor Registration",
        "description": "Become a mentor and share your expertise with mentees",
        "price": "0",
        "priceCurrency": "GBP"
      },
      {
        "@type": "Offer",
        "name": "Mentee Registration",
        "description": "Find a mentor to guide your personal and professional growth",
        "price": "0",
        "priceCurrency": "GBP"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {children}
    </>
  )
}

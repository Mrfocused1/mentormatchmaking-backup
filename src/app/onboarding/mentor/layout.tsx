import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Become a Mentor - Share Your Expertise | Look 4 Mentors",
  description: "Join Look 4 Mentors as a mentor and make a meaningful impact. Share your professional expertise, guide mentees in their careers, develop leadership skills, and expand your network. Complete mentor registration in minutes and start mentoring today.",
  keywords: "become a mentor, mentor registration, mentor signup, mentor onboarding, share expertise, professional mentor, career mentor, business mentor, mentor platform, guide mentees, leadership development",
  openGraph: {
    title: "Become a Mentor on Look 4 Mentors",
    description: "Share your expertise and guide the next generation of professionals. Join 10,000+ mentors making a difference.",
    type: "website",
    url: "https://look4mentors.com/onboarding/mentor",
    siteName: "Look 4 Mentors",
  },
  twitter: {
    card: "summary_large_image",
    title: "Become a Mentor",
    description: "Share your expertise and make an impact",
  },
  alternates: {
    canonical: "https://look4mentors.com/onboarding/mentor",
  },
}

export default function MentorOnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Mentor Registration Action Schema
  const actionSchema = {
    "@context": "https://schema.org",
    "@type": "RegisterAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://look4mentors.com/onboarding/mentor",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    },
    "object": {
      "@type": "Service",
      "name": "Mentor Registration",
      "description": "Register as a mentor on Look 4 Mentors platform",
      "provider": {
        "@type": "Organization",
        "name": "Look 4 Mentors"
      }
    },
    "result": {
      "@type": "Person",
      "jobTitle": "Mentor"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(actionSchema) }}
      />
      {children}
    </>
  )
}

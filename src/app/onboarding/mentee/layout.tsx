import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Find a Mentor - Accelerate Your Career Growth | Look 4 Mentors",
  description: "Sign up as a mentee on Look 4 Mentors and connect with experienced professionals who can guide your career. Get personalized guidance, learn from experts, build valuable connections, and achieve your professional goals faster with expert mentorship.",
  keywords: "find a mentor, mentee registration, mentee signup, career guidance, professional development, get a mentor, career mentor, business guidance, mentorship program, personal growth, career acceleration",
  openGraph: {
    title: "Find Your Perfect Mentor on Look 4 Mentors",
    description: "Connect with experienced mentors who can guide your career and personal development. Join 50,000+ successful matches.",
    type: "website",
    url: "https://look4mentors.com/onboarding/mentee",
    siteName: "Look 4 Mentors",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Perfect Mentor",
    description: "Accelerate your career with expert guidance",
  },
  alternates: {
    canonical: "https://look4mentors.com/onboarding/mentee",
  },
}

export default function MenteeOnboardingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Mentee Registration Action Schema
  const actionSchema = {
    "@context": "https://schema.org",
    "@type": "RegisterAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://look4mentors.com/onboarding/mentee",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    },
    "object": {
      "@type": "Service",
      "name": "Mentee Registration",
      "description": "Register as a mentee to find and connect with professional mentors",
      "provider": {
        "@type": "Organization",
        "name": "Look 4 Mentors"
      }
    },
    "result": {
      "@type": "Person",
      "seeks": {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "serviceType": "Professional Mentorship"
        }
      }
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

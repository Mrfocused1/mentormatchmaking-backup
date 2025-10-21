import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata: Metadata = {
  title: "Look For Mentors | Find Mentors & Mentees Online | Professional Mentorship Platform",
  description: "Looking for mentors? Look 4 Mentors is the #1 platform to find mentors and mentees. Connect with experienced mentors across all industries. Looking for mentees? Join thousands of professionals seeking mentorship and career guidance today.",
  keywords: "look for mentors, looking for mentors, find mentors, mentors, looking for mentees, find mentees, mentor, mentorship, find a mentor, career mentor, professional mentoring, business mentor, mentorship platform, mentor matching, search for mentors, discover mentors, mentor network, mentee network, career guidance, professional development",
  openGraph: {
    title: "Look For Mentors | Find Mentors & Mentees Online",
    description: "Looking for mentors or mentees? Connect with experienced professionals for mentorship, career guidance, and professional development on the leading mentor matching platform.",
    type: "website",
    url: "https://look4mentors.com",
    siteName: "Look 4 Mentors - Look For Mentors",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Look For Mentors - Professional Mentorship Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Look For Mentors | Find Mentors & Mentees Online",
    description: "Looking for mentors? Find experienced mentors and connect with mentees on the leading mentorship platform.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://look4mentors.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Look 4 Mentors",
    "alternateName": ["Look4Mentors", "Look For Mentors", "Looking For Mentors Platform"],
    "url": "https://look4mentors.com",
    "logo": "https://look4mentors.com/logo.svg",
    "description": "The leading platform for people looking for mentors and mentees. Look 4 Mentors connects experienced professionals with those seeking mentorship across all industries for career growth and personal development.",
    "foundingDate": "2024",
    "slogan": "Look For Mentors, Find Your Future",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "support@look4mentors.com"
    },
    "sameAs": [
      "https://twitter.com/look4mentors",
      "https://linkedin.com/company/look4mentors",
      "https://facebook.com/look4mentors"
    ]
  };

  // WebSite Schema for Search
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Look 4 Mentors - Look For Mentors Online",
    "alternateName": "Looking For Mentors Platform",
    "url": "https://look4mentors.com",
    "description": "Looking for mentors? Find mentors and mentees on the #1 professional mentorship platform.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://look4mentors.com/browse-mentors?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Service Schema for Mentor Matching
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Mentorship Matching Platform",
    "name": "Look For Mentors - Professional Mentor Matching",
    "description": "Looking for mentors or mentees? Our platform helps professionals find mentors and mentees across all industries. Connect with experienced mentors for career guidance, business mentoring, and professional development.",
    "provider": {
      "@type": "Organization",
      "name": "Look 4 Mentors"
    },
    "areaServed": "Worldwide",
    "audience": {
      "@type": "Audience",
      "audienceType": "Professionals looking for mentors and mentees"
    },
    "offers": {
      "@type": "Offer",
      "name": "Find Mentors and Mentees",
      "description": "Connect with mentors and mentees for professional development",
      "price": "0",
      "priceCurrency": "GBP"
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* Website Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Service Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
      </head>
      <body
        className={`${montserrat.variable} antialiased bg-white text-primary-dark`}
      >
        {children}
      </body>
    </html>
  );
}

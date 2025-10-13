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
  title: "Look 4 Mentors - Find Your Perfect Mentor | Professional Mentorship Platform",
  description: "Connect with experienced mentors across industries. Find professional mentorship, career guidance, and skill development through our verified mentor matching platform at Look for Mentors.",
  keywords: "mentor, mentorship, find a mentor, career mentor, professional mentoring, business mentor, life coach, career guidance, mentorship platform, mentor matching, look for mentors",
  openGraph: {
    title: "Find Your Perfect Mentor | Look 4 Mentors",
    description: "Connect with experienced mentors for career growth and professional development",
    type: "website",
    url: "https://look4mentors.com",
    siteName: "Look 4 Mentors",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Look 4 Mentors Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Perfect Mentor | Look 4 Mentors",
    description: "Connect with experienced mentors for career growth",
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
    "alternateName": "Look4Mentors",
    "url": "https://look4mentors.com",
    "logo": "https://look4mentors.com/logo.svg",
    "description": "Professional mentorship platform connecting experienced mentors with mentees across all industries for career growth and personal development.",
    "foundingDate": "2024",
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
    "name": "Look 4 Mentors",
    "url": "https://look4mentors.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://look4mentors.com/browse-mentors?search={search_term_string}",
      "query-input": "required name=search_term_string"
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
      </head>
      <body
        className={`${montserrat.variable} antialiased bg-white text-primary-dark`}
      >
        {children}
      </body>
    </html>
  );
}

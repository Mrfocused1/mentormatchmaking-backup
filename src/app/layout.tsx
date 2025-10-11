import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MentorMatchmaking - Find Your Perfect Mentor | Professional Mentorship Platform",
  description: "Connect with experienced mentors across industries. Find professional mentorship, career guidance, and skill development through our verified mentor matching platform.",
  keywords: "mentor, mentorship, find a mentor, career mentor, professional mentoring, business mentor, life coach, career guidance, mentorship platform, mentor matching",
  openGraph: {
    title: "Find Your Perfect Mentor | MentorMatchmaking",
    description: "Connect with experienced mentors for career growth and professional development",
    type: "website",
    url: "https://mentormatchmaking.com",
    siteName: "MentorMatchmaking",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MentorMatchmaking Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Perfect Mentor | MentorMatchmaking",
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
    canonical: "https://mentormatchmaking.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased bg-white text-primary-dark`}
      >
        {children}
      </body>
    </html>
  );
}

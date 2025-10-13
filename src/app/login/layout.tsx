import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Login - Access Your Mentorship Account | Look 4 Mentors",
  description: "Log in to your Look 4 Mentors account to access your mentorship connections, messages, session schedules, and dashboard. Connect with mentors or mentees and continue your professional development journey.",
  keywords: "login, sign in, mentorship login, mentor account, mentee account, access dashboard, mentorship platform login, look 4 mentors login",
  openGraph: {
    title: "Login to Look 4 Mentors",
    description: "Access your mentorship account and connect with your mentor or mentees",
    type: "website",
    url: "https://look4mentors.com/login",
    siteName: "Look 4 Mentors",
  },
  twitter: {
    card: "summary",
    title: "Login to Look 4 Mentors",
    description: "Access your mentorship account",
  },
  alternates: {
    canonical: "https://look4mentors.com/login",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Shield,
  AlertTriangle,
  Lock,
  Eye,
  MessageCircle,
  UserX,
  Flag,
  CheckCircle,
  Phone,
  Mail,
  AlertCircle,
  FileText,
  Users,
  Heart,
  X
} from 'lucide-react'

export default function SafetyCenterPage() {
  const [reportFormOpen, setReportFormOpen] = useState(false)

  const safetyGuidelines = [
    {
      icon: Users,
      title: 'Meet in Public Spaces',
      description: 'If meeting in person, always choose public locations for your first few sessions. Coffee shops, libraries, and co-working spaces are ideal.'
    },
    {
      icon: Lock,
      title: 'Protect Personal Information',
      description: 'Don\'t share sensitive personal information like your home address, financial details, or passwords. Use the platform\'s messaging system initially.'
    },
    {
      icon: Eye,
      title: 'Trust Your Instincts',
      description: 'If something feels off or uncomfortable, trust your gut. You\'re never obligated to continue a mentorship that doesn\'t feel right.'
    },
    {
      icon: MessageCircle,
      title: 'Keep Communication Professional',
      description: 'Maintain professional boundaries. If conversations become inappropriate or make you uncomfortable, report the behavior immediately.'
    },
    {
      icon: Shield,
      title: 'Verify Identities',
      description: 'Review profiles carefully. Look for complete profiles with verified information, professional photos, and genuine recommendations.'
    },
    {
      icon: AlertTriangle,
      title: 'Watch for Red Flags',
      description: 'Be cautious of anyone asking for money, pushing for immediate in-person meetings, or being evasive about their background.'
    }
  ]

  const redFlags = [
    'Requesting money or financial assistance',
    'Pushing for personal contact information too quickly',
    'Being overly flattering or romantic in nature',
    'Refusing to verify identity or provide professional background',
    'Asking inappropriate personal questions',
    'Pressuring you to move communication off-platform',
    'Making you feel guilty or obligated',
    'Inconsistent or suspicious background information',
    'Asking you to keep communication secret from the platform',
    'Requesting access to your accounts or passwords'
  ]

  const reportingSteps = [
    {
      step: 1,
      title: 'Identify the Issue',
      description: 'Determine what type of violation occurred - harassment, inappropriate content, scam attempt, etc.'
    },
    {
      step: 2,
      title: 'Document Everything',
      description: 'Take screenshots of messages, profile information, or any evidence of the violation before reporting.'
    },
    {
      step: 3,
      title: 'Use Report Button',
      description: 'Click the report button on the user\'s profile or message. Provide detailed information about the incident.'
    },
    {
      step: 4,
      title: 'Block if Needed',
      description: 'You can immediately block the user to prevent further contact while we investigate.'
    },
    {
      step: 5,
      title: 'Our Review',
      description: 'Our safety team reviews all reports within 24 hours and takes appropriate action.'
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary-dark pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-primary-accent p-4">
                <Shield className="h-12 w-12 text-primary-dark" />
              </div>
            </div>
            <h1 className="text-4xl font-black font-montserrat text-white sm:text-5xl mb-4">
              Safety Center
            </h1>
            <p className="text-lg text-white/90 font-montserrat max-w-3xl mx-auto">
              Your safety is our top priority. Learn how to stay safe, report issues, and make the most of your mentorship experience.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-red-600 text-red-600 hover:bg-red-50 justify-center"
              onClick={() => setReportFormOpen(true)}
            >
              <Flag className="h-5 w-5 mr-2" />
              Report an Issue
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-primary-accent text-primary-dark hover:bg-primary-accent/10 justify-center"
              asChild
            >
              <Link href="/contact">
                <Mail className="h-5 w-5 mr-2" />
                Contact Support
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-neutral-400 text-neutral-700 hover:bg-neutral-100 justify-center"
              asChild
            >
              <Link href="/code-of-conduct">
                <FileText className="h-5 w-5 mr-2" />
                Code of Conduct
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black font-montserrat text-primary-dark mb-4">
              Safety Guidelines
            </h2>
            <p className="text-lg text-neutral-600 font-montserrat max-w-3xl mx-auto">
              Follow these best practices to ensure a safe and positive mentorship experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyGuidelines.map((guideline, index) => (
              <Card key={index} className="shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary-accent/10 p-3 flex-shrink-0">
                      <guideline.icon className="h-6 w-6 text-primary-dark" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                        {guideline.title}
                      </h3>
                      <p className="text-sm text-neutral-600 font-montserrat">
                        {guideline.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Red Flags */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="h-8 w-8 text-red-600" />
                <h2 className="text-3xl font-black font-montserrat text-primary-dark">
                  Red Flags to Watch For
                </h2>
              </div>
              <p className="text-neutral-600 font-montserrat mb-6">
                Be aware of these warning signs. If you encounter any of these behaviors, stop communication and report the user immediately.
              </p>
              <div className="space-y-3">
                {redFlags.map((flag, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-neutral-700 font-montserrat">
                      {flag}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="shadow-lg bg-red-50/50 border-red-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold font-montserrat text-primary-dark mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-red-600" />
                  What We Do to Protect You
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold font-montserrat text-primary-dark text-sm">Profile Verification</p>
                      <p className="text-sm text-neutral-600 font-montserrat">We verify user identities and professional backgrounds</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold font-montserrat text-primary-dark text-sm">Privacy Protection</p>
                      <p className="text-sm text-neutral-600 font-montserrat">Your personal information is protected until you choose to share it</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold font-montserrat text-primary-dark text-sm">24/7 Monitoring</p>
                      <p className="text-sm text-neutral-600 font-montserrat">Our team monitors for suspicious activity and responds to reports quickly</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold font-montserrat text-primary-dark text-sm">Zero Tolerance Policy</p>
                      <p className="text-sm text-neutral-600 font-montserrat">Harassment, scams, and inappropriate behavior result in immediate action</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold font-montserrat text-primary-dark text-sm">Secure Platform</p>
                      <p className="text-sm text-neutral-600 font-montserrat">Industry-standard encryption protects all communications and data</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reporting Process */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black font-montserrat text-primary-dark mb-4">
              How to Report an Issue
            </h2>
            <p className="text-lg text-neutral-600 font-montserrat max-w-3xl mx-auto">
              We investigate all reports within 24 hours. Your reports help keep the community safe for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {reportingSteps.map((item, index) => (
              <Card key={index} className="shadow-md relative">
                <CardContent className="p-6 text-center">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="rounded-full bg-secondary-accent text-white w-8 h-8 flex items-center justify-center font-bold font-montserrat text-sm">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2 mt-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600 font-montserrat">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              variant="primary"
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => setReportFormOpen(true)}
            >
              <Flag className="h-5 w-5 mr-2" />
              Report an Issue Now
            </Button>
          </div>
        </div>
      </section>

      {/* Blocking & Privacy Tools */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black font-montserrat text-primary-dark mb-4">
              Your Safety Tools
            </h2>
            <p className="text-lg text-neutral-600 font-montserrat max-w-3xl mx-auto">
              Take control of your experience with our built-in safety features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="shadow-lg">
              <CardHeader className="bg-primary-accent/10">
                <CardTitle className="flex items-center gap-3">
                  <UserX className="h-6 w-6 text-primary-dark" />
                  <span className="font-montserrat">Block Users</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-neutral-600 font-montserrat mb-4">
                  Immediately stop all contact with a user by blocking them. Blocked users cannot:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-600 font-montserrat">View your profile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-600 font-montserrat">Send you messages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-600 font-montserrat">Show interest in you</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-600 font-montserrat">See you in their match suggestions</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-primary-dark">
                  Learn How to Block
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-primary-accent/10">
                <CardTitle className="flex items-center gap-3">
                  <Lock className="h-6 w-6 text-primary-dark" />
                  <span className="font-montserrat">Privacy Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-neutral-600 font-montserrat mb-4">
                  Control what information is visible and who can contact you:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-600 font-montserrat">Hide profile from specific users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-600 font-montserrat">Control who can view your profile details</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-600 font-montserrat">Manage message preferences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-neutral-600 font-montserrat">Turn off profile analytics visibility</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-primary-dark" asChild>
                  <Link href="/settings">
                    Manage Privacy Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Emergency Resources */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Card className="shadow-xl bg-primary-dark border-0">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="rounded-full bg-red-600 p-4 flex-shrink-0">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold font-montserrat text-white mb-3">
                    In Case of Emergency
                  </h3>
                  <p className="text-white/90 font-montserrat mb-6">
                    If you feel you are in immediate danger or have experienced a crime, please contact local authorities immediately. Your safety comes first.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm text-white/70 font-montserrat mb-1">Emergency Services</p>
                      <p className="text-xl font-bold font-montserrat text-white">911 (US)</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm text-white/70 font-montserrat mb-1">Crisis Text Line</p>
                      <p className="text-xl font-bold font-montserrat text-white">Text HOME to 741741</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4">
                      <p className="text-sm text-white/70 font-montserrat mb-1">Our Safety Team</p>
                      <p className="text-xl font-bold font-montserrat text-white">safety@look4mentors.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black font-montserrat text-primary-dark mb-4">
              Additional Resources
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <FileText className="h-12 w-12 text-primary-accent mx-auto mb-4" />
                <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                  Code of Conduct
                </h3>
                <p className="text-sm text-neutral-600 font-montserrat mb-4">
                  Our community standards and expectations for all users
                </p>
                <Button variant="ghost" className="text-primary-accent hover:text-primary-dark" asChild>
                  <Link href="/code-of-conduct">
                    Read More →
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Lock className="h-12 w-12 text-primary-accent mx-auto mb-4" />
                <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                  Privacy Policy
                </h3>
                <p className="text-sm text-neutral-600 font-montserrat mb-4">
                  How we protect and handle your personal information
                </p>
                <Button variant="ghost" className="text-primary-accent hover:text-primary-dark" asChild>
                  <Link href="/privacy">
                    Read More →
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 text-primary-accent mx-auto mb-4" />
                <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                  Help Center
                </h3>
                <p className="text-sm text-neutral-600 font-montserrat mb-4">
                  Find answers to common questions and get support
                </p>
                <Button variant="ghost" className="text-primary-accent hover:text-primary-dark" asChild>
                  <Link href="/help">
                    Read More →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Report Modal */}
      {reportFormOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full shadow-2xl">
            <CardHeader className="bg-primary-dark text-white">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-montserrat">
                  <Flag className="h-6 w-6" />
                  Report an Issue
                </span>
                <button
                  onClick={() => setReportFormOpen(false)}
                  className="text-white hover:text-neutral-300 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-neutral-600 font-montserrat mb-6">
                Your report will be reviewed by our safety team within 24 hours. All reports are confidential.
              </p>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    What are you reporting?
                  </label>
                  <select className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent font-montserrat">
                    <option value="">Select a category</option>
                    <option value="harassment">Harassment or Bullying</option>
                    <option value="inappropriate">Inappropriate Content</option>
                    <option value="scam">Scam or Fraud</option>
                    <option value="fake">Fake Profile</option>
                    <option value="spam">Spam</option>
                    <option value="safety">Safety Concern</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    User ID or Profile URL (if applicable)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent font-montserrat"
                    placeholder="e.g., @username or profile link"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold font-montserrat text-neutral-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent font-montserrat resize-none"
                    placeholder="Please provide as much detail as possible about the issue..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setReportFormOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Submit Report
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  BookOpen,
  Users,
  MessageCircle,
  Search,
  Heart,
  Calendar,
  Shield,
  Settings,
  CheckCircle,
  Target,
  Lightbulb,
  TrendingUp,
  Bell,
  User,
  FileText,
  HelpCircle,
  ExternalLink
} from 'lucide-react'

export default function UserGuidePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600 mb-6">
            <Link href="/help" className="hover:text-primary-accent transition-colors">
              Help Center
            </Link>
            <span>/</span>
            <span className="text-primary-dark font-semibold">User Guide</span>
          </div>

          {/* Back Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Help Center
          </Button>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-primary-accent/10 rounded-xl flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-primary-accent" />
              </div>
              <div>
                <h1 className="text-4xl font-black font-montserrat text-primary-dark">
                  Look 4 Mentors User Guide
                </h1>
                <p className="text-lg text-neutral-600 font-montserrat mt-1">
                  Everything you need to know to get the most out of the platform
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="primary" className="bg-primary-accent text-primary-dark">
                100% Free
              </Badge>
              <Badge variant="primary" className="bg-secondary-accent text-white">
                Messaging Only
              </Badge>
            </div>
          </div>

          {/* Table of Contents */}
          <Card className="shadow-lg mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold font-montserrat text-primary-dark mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary-accent" />
                Table of Contents
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { title: 'Getting Started', href: '#getting-started' },
                  { title: 'Creating Your Profile', href: '#profile' },
                  { title: 'Finding Matches', href: '#finding-matches' },
                  { title: 'Messaging & Communication', href: '#messaging' },
                  { title: 'Scheduling & Availability', href: '#scheduling' },
                  { title: 'Safety & Privacy', href: '#safety' },
                  { title: 'Account Management', href: '#account' },
                  { title: 'FAQs', href: '#faqs' },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="text-sm font-montserrat text-primary-dark hover:text-primary-accent hover:underline transition-colors"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Getting Started */}
            <Card id="getting-started" className="shadow-lg scroll-mt-24">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-montserrat text-primary-dark mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-accent/10 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary-accent" />
                  </div>
                  Getting Started
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">
                      Welcome to Look 4 Mentors!
                    </h3>
                    <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
                      Look for Mentors is a 100% free platform that connects mentors and mentees through secure text messaging.
                      Whether you're seeking guidance or looking to share your expertise, we make it easy to find meaningful mentorship connections.
                    </p>
                    <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-4 rounded">
                      <p className="text-sm font-montserrat text-primary-dark">
                        <strong>Important:</strong> All communication on this platform is text-based messaging only. There are no video calls,
                        phone calls, or virtual meetings on the platform. You can share contact details privately if both parties agree.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">
                      Choosing Your Role
                    </h3>
                    <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
                      When you sign up, you'll choose to be either a <strong>Mentor</strong> or a <strong>Mentee</strong>:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-primary-accent rounded-lg p-4">
                        <h4 className="font-bold font-montserrat text-primary-dark mb-2">Mentor</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 font-montserrat">
                          <li>Share your expertise and experience</li>
                          <li>Guide others in their career or personal growth</li>
                          <li>Browse mentees seeking guidance</li>
                          <li>Offer mentorship to those you can help</li>
                        </ul>
                      </div>
                      <div className="border border-secondary-accent rounded-lg p-4">
                        <h4 className="font-bold font-montserrat text-primary-dark mb-2">Mentee</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 font-montserrat">
                          <li>Seek guidance and support</li>
                          <li>Learn from experienced professionals</li>
                          <li>Browse mentors with relevant expertise</li>
                          <li>Send interest requests to potential mentors</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">
                      Quick Start Steps
                    </h3>
                    <ol className="space-y-3">
                      {[
                        { step: 1, title: 'Sign Up', desc: 'Create your free account and choose your role (Mentor or Mentee)' },
                        { step: 2, title: 'Complete Your Profile', desc: 'Add your details, expertise, goals, and what you\'re looking for' },
                        { step: 3, title: 'Browse Matches', desc: 'Explore verified mentors or mentees that match your criteria' },
                        { step: 4, title: 'Make Connections', desc: 'Send interest requests or offers to start a mentorship relationship' },
                        { step: 5, title: 'Start Messaging', desc: 'Schedule messaging time and begin your mentorship journey' },
                      ].map((item) => (
                        <li key={item.step} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary-accent text-primary-dark rounded-full flex items-center justify-center font-bold font-montserrat">
                            {item.step}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold font-montserrat text-primary-dark">{item.title}</h4>
                            <p className="text-sm text-neutral-700 font-montserrat">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Creating Your Profile */}
            <Card id="profile" className="shadow-lg scroll-mt-24">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-montserrat text-primary-dark mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-accent/10 rounded-lg flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-accent" />
                  </div>
                  Creating Your Profile
                </h2>

                <div className="space-y-4">
                  <p className="text-neutral-700 font-montserrat leading-relaxed">
                    Your profile is your opportunity to make a great first impression. A complete, compelling profile increases
                    your chances of finding the right match.
                  </p>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Essential Information</h3>
                    <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
                      <li><strong>Full Name:</strong> Use your real name to build trust</li>
                      <li><strong>Professional Title:</strong> Your current role or aspiration</li>
                      <li><strong>Location:</strong> General area (city/region)</li>
                      <li><strong>Bio:</strong> 150-300 words about your background, experience, and what you're looking for</li>
                      <li><strong>Profile Photo:</strong> A clear, professional photo (profiles with photos get 40% more engagement)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Skills & Interests</h3>
                    <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
                      <li><strong>For Mentors:</strong> Highlight your areas of expertise and what you can teach</li>
                      <li><strong>For Mentees:</strong> Specify what you want to learn and your current level</li>
                      <li>Choose at least 3-5 skills for better matching</li>
                      <li>Be specific (e.g., "React Development" vs. just "Programming")</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Pro Tips</h3>
                    <div className="bg-primary-accent/10 border-l-4 border-primary-accent p-4 rounded">
                      <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 font-montserrat">
                        <li>Write in first person - it's more engaging</li>
                        <li>Be specific about your goals</li>
                        <li>Show personality - let your authentic self shine</li>
                        <li>Update your profile regularly to keep it current</li>
                        <li>Proofread for spelling and grammar</li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/help/create-profile"
                      className="inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-primary-accent hover:text-primary-accent/80"
                    >
                      Read detailed profile creation guide <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Finding Matches */}
            <Card id="finding-matches" className="shadow-lg scroll-mt-24">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-montserrat text-primary-dark mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-accent/10 rounded-lg flex items-center justify-center">
                    <Search className="h-6 w-6 text-primary-accent" />
                  </div>
                  Finding Matches
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Smart Matching</h3>
                    <p className="text-neutral-700 font-montserrat leading-relaxed mb-3">
                      Our intelligent algorithm considers your skills, interests, goals, and availability to suggest potential matches.
                      You'll see recommended profiles on your dashboard.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Browsing</h3>
                    <p className="text-neutral-700 font-montserrat leading-relaxed mb-2">
                      Browse all mentors or mentees using these pages:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-neutral-700 font-montserrat ml-4">
                      <li><Link href="/browse-mentors" className="text-primary-accent hover:underline">Browse Mentors</Link> - For mentees seeking guidance</li>
                      <li><Link href="/browse-mentees" className="text-primary-accent hover:underline">Browse Mentees</Link> - For mentors offering guidance</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Using Filters</h3>
                    <p className="text-neutral-700 font-montserrat leading-relaxed mb-2">
                      Narrow down your search using filters:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 font-montserrat ml-4">
                      <li><strong>Industry:</strong> Filter by specific fields or sectors</li>
                      <li><strong>Skills:</strong> Find people with specific expertise</li>
                      <li><strong>Location:</strong> Connect with people in your area or remotely</li>
                      <li><strong>Availability:</strong> Match schedules and time zones</li>
                      <li><strong>Experience Level:</strong> Find the right match for your stage</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Expandable Cards Feature</h3>
                    <p className="text-neutral-700 font-montserrat leading-relaxed mb-2">
                      Browse pages feature expandable cards:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 font-montserrat ml-4">
                      <li><strong>Desktop:</strong> Click any profile card to expand and see full details, click again to collapse</li>
                      <li><strong>Mobile:</strong> Swipe left to pass, swipe right to show interest, or tap to expand and view full profile</li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/help/finding-mentor-or-mentee"
                      className="inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-primary-accent hover:text-primary-accent/80"
                    >
                      Read detailed matching guide <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Messaging & Communication */}
            <Card id="messaging" className="shadow-lg scroll-mt-24">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-montserrat text-primary-dark mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary-accent/10 rounded-lg flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-secondary-accent" />
                  </div>
                  Messaging & Communication
                </h2>

                <div className="space-y-4">
                  <div className="bg-secondary-accent/10 border-l-4 border-secondary-accent p-4 rounded mb-4">
                    <p className="text-sm font-montserrat text-primary-dark">
                      <strong>Important:</strong> All communication on Look for Mentors is text-based messaging only.
                      There are no video calls, phone calls, or voice calls on the platform.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Starting a Conversation</h3>
                    <p className="text-neutral-700 font-montserrat leading-relaxed mb-2">
                      Once matched, you can start messaging through the Messages page:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 font-montserrat ml-4">
                      <li>Navigate to <Link href="/messages" className="text-primary-accent hover:underline">Messages</Link></li>
                      <li>Select a conversation from your list</li>
                      <li>Type your message and press Send</li>
                      <li>Messages are delivered instantly</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Message Features</h3>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 font-montserrat ml-4">
                      <li><strong>Real-time messaging:</strong> See when messages are delivered and read</li>
                      <li><strong>Typing indicators:</strong> Know when the other person is typing</li>
                      <li><strong>Message history:</strong> All conversations are saved</li>
                      <li><strong>File sharing:</strong> Share documents, images, and resources</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Communication Best Practices</h3>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 font-montserrat ml-4">
                      <li>Be clear and respectful in all communications</li>
                      <li>Respond in a timely manner (within 24-48 hours)</li>
                      <li>Use proper grammar and avoid text speak</li>
                      <li>Stay professional and on-topic</li>
                      <li>Schedule regular messaging times for consistency</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Connecting Outside the Platform</h3>
                    <p className="text-neutral-700 font-montserrat leading-relaxed">
                      You can share your own contact details (email, phone, LinkedIn, etc.) privately if both parties agree
                      to connect outside the platform. However, all initial communication should happen through our secure messaging system.
                    </p>
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/help/session-best-practices"
                      className="inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-primary-accent hover:text-primary-accent/80"
                    >
                      Read communication best practices <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scheduling & Availability */}
            <Card id="scheduling" className="shadow-lg scroll-mt-24">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-montserrat text-primary-dark mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-accent/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary-accent" />
                  </div>
                  Scheduling & Availability
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Setting Your Availability</h3>
                    <p className="text-neutral-700 font-montserrat leading-relaxed mb-2">
                      Schedule when you're available to exchange messages:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 font-montserrat ml-4">
                      <li>Go to Settings → Availability</li>
                      <li>Select your available days and times</li>
                      <li>Set your timezone</li>
                      <li>Choose your preferred messaging frequency</li>
                      <li>Set expected response times</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Scheduling Messaging Time</h3>
                    <p className="text-neutral-700 font-montserrat leading-relaxed mb-2">
                      You can schedule specific times to exchange messages with your mentor or mentee:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 font-montserrat ml-4">
                      <li>Agree on a time to both be online</li>
                      <li>Set calendar reminders</li>
                      <li>Prepare topics or questions in advance</li>
                      <li>Respect each other's time commitments</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Asynchronous Communication</h3>
                    <p className="text-neutral-700 font-montserrat leading-relaxed">
                      You don't always need to be online at the same time. Asynchronous messaging allows you to:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 font-montserrat ml-4">
                      <li>Send messages when convenient</li>
                      <li>Receive responses within agreed timeframes</li>
                      <li>Accommodate different schedules and time zones</li>
                      <li>Think through responses carefully</li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/help/schedule-session"
                      className="inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-primary-accent hover:text-primary-accent/80"
                    >
                      Read scheduling guide <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety & Privacy */}
            <Card id="safety" className="shadow-lg scroll-mt-24">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-montserrat text-primary-dark mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                    <Shield className="h-6 w-6 text-red-600" />
                  </div>
                  Safety & Privacy
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Your Safety Matters</h3>
                    <p className="text-neutral-700 font-montserrat leading-relaxed mb-2">
                      We take your safety seriously. All mentors are verified, but you should always:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 font-montserrat ml-4">
                      <li>Keep initial communication on the platform</li>
                      <li>Trust your instincts - if something feels off, it probably is</li>
                      <li>Never share sensitive personal or financial information</li>
                      <li>Report any inappropriate behavior immediately</li>
                      <li>Block users who make you uncomfortable</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Red Flags to Watch For</h3>
                    <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                      <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 font-montserrat">
                        <li>Requests for money or financial information</li>
                        <li>Inappropriate or overly personal questions</li>
                        <li>Pressure to move communication off-platform immediately</li>
                        <li>Refusing to verify identity or professional background</li>
                        <li>Making you feel uncomfortable or unsafe</li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Privacy Controls</h3>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 font-montserrat ml-4">
                      <li><strong>Profile Visibility:</strong> Control who can see your profile</li>
                      <li><strong>Blocking:</strong> Block users from contacting you</li>
                      <li><strong>Reporting:</strong> Report inappropriate behavior to our team</li>
                      <li><strong>Data Protection:</strong> Your data is encrypted and secure</li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/help/safety-guidelines"
                      className="inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-primary-accent hover:text-primary-accent/80"
                    >
                      Read full safety guidelines <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Management */}
            <Card id="account" className="shadow-lg scroll-mt-24">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-montserrat text-primary-dark mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                    <Settings className="h-6 w-6 text-purple-600" />
                  </div>
                  Account Management
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Account Settings</h3>
                    <p className="text-neutral-700 font-montserrat leading-relaxed mb-2">
                      Manage your account through the Settings page:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 font-montserrat ml-4">
                      <li><strong>Profile Settings:</strong> Update your information and photo</li>
                      <li><strong>Password:</strong> Change your password regularly for security</li>
                      <li><strong>Email Preferences:</strong> Control what notifications you receive</li>
                      <li><strong>Privacy Settings:</strong> Manage who can see your profile</li>
                      <li><strong>Availability:</strong> Update when you're available to message</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Notifications</h3>
                    <p className="text-neutral-700 font-montserrat leading-relaxed mb-2">
                      Stay updated with customizable notifications:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 font-montserrat ml-4">
                      <li>New messages</li>
                      <li>Match suggestions</li>
                      <li>Interest requests</li>
                      <li>Scheduled messaging reminders</li>
                      <li>Platform updates</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">Deactivating or Deleting Your Account</h3>
                    <p className="text-neutral-700 font-montserrat leading-relaxed mb-2">
                      Need a break or want to leave?
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-neutral-700 font-montserrat ml-4">
                      <li><strong>Deactivate:</strong> Temporarily hide your profile (you can reactivate anytime)</li>
                      <li><strong>Delete:</strong> Permanently remove your account and data</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <Link
                      href="/help/change-password"
                      className="inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-primary-accent hover:text-primary-accent/80"
                    >
                      Change password guide <ExternalLink className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/help/deactivate-account"
                      className="inline-flex items-center gap-2 text-sm font-semibold font-montserrat text-primary-accent hover:text-primary-accent/80"
                    >
                      Deactivate account guide <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQs */}
            <Card id="faqs" className="shadow-lg scroll-mt-24">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold font-montserrat text-primary-dark mb-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-accent/10 rounded-lg flex items-center justify-center">
                    <HelpCircle className="h-6 w-6 text-primary-accent" />
                  </div>
                  Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      q: 'Is Look 4 Mentors really free?',
                      a: 'Yes! Look 4 Mentors is 100% free to use. All features, including matching, messaging, profile creation, and connections, are available to everyone at no cost. There are no premium tiers, subscriptions, or hidden fees.'
                    },
                    {
                      q: 'Do you offer video or phone calls?',
                      a: 'No. All communication on Look for Mentors is text-based messaging only. There are no video calls, phone calls, or voice calls on the platform. However, you can share your own contact details privately if both parties agree to connect outside the platform.'
                    },
                    {
                      q: 'How long does it take to find a match?',
                      a: 'It varies! Some users find matches within days, while others may take a few weeks. The key is having a complete, detailed profile and being proactive in browsing and connecting.'
                    },
                    {
                      q: 'Can I have multiple mentors or mentees?',
                      a: 'Yes! You can connect with multiple mentors or mentees. There are no limits on the number of connections you can make.'
                    },
                    {
                      q: 'How do I end a mentorship relationship?',
                      a: 'Simply send a respectful message to your mentor or mentee explaining that you\'d like to conclude the mentorship. It\'s normal for mentorships to have a natural endpoint, and both parties should feel comfortable moving on when appropriate.'
                    },
                    {
                      q: 'What if I have a problem with a user?',
                      a: 'You can block any user or report inappropriate behavior to our support team. We take all reports seriously and will investigate promptly. Your safety is our priority.'
                    },
                  ].map((faq, index) => (
                    <div key={index} className="border-b border-neutral-200 last:border-b-0 pb-4 last:pb-0">
                      <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                        {faq.q}
                      </h3>
                      <p className="text-neutral-700 font-montserrat leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <p className="text-neutral-700 font-montserrat mb-3">
                    <strong>Still have questions?</strong> Visit our full <Link href="/help" className="text-primary-accent hover:underline">Help Center</Link> or{' '}
                    <Link href="/faq" className="text-primary-accent hover:underline">FAQ page</Link> for more information.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Need More Help */}
            <Card className="shadow-lg bg-primary-dark text-white">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold font-montserrat mb-3">
                  Need More Help?
                </h2>
                <p className="text-white/90 font-montserrat mb-6">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="primary"
                    size="lg"
                    asChild
                    className="bg-primary-accent text-primary-dark hover:bg-primary-accent/90"
                  >
                    <Link href="/contact">
                      Contact Support
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="border-white text-white hover:bg-white/10"
                  >
                    <Link href="/help">
                      Browse Help Articles
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Search,
  HelpCircle,
  Book,
  MessageCircle,
  Mail,
  User,
  Calendar,
  CreditCard,
  Shield,
  Settings,
  ChevronRight,
  ExternalLink
} from 'lucide-react'

// Help categories
const helpCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Book,
    color: 'text-primary-accent',
    bgColor: 'bg-primary-accent/10',
    articles: [
      { title: 'How to create your profile', url: '/help/create-profile' },
      { title: 'Finding the right mentor or mentee', url: '/help/finding-mentor-or-mentee' },
      { title: 'Making your first connection', url: '/help/first-connection' },
      { title: 'Setting up your availability', url: '/help/setup-availability' },
    ]
  },
  {
    id: 'communication',
    title: 'Communication & Availability',
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    articles: [
      { title: 'How to schedule messaging time', url: '/help/schedule-session' },
      { title: 'Setting up your availability', url: '/help/setup-availability' },
      { title: 'Cancelling or rescheduling', url: '/help/cancel-reschedule' },
      { title: 'Communication best practices', url: '/help/session-best-practices' },
    ]
  },
  {
    id: 'messaging',
    title: 'Messaging & Communication',
    icon: MessageCircle,
    color: 'text-secondary-accent',
    bgColor: 'bg-secondary-accent/10',
    articles: [
      { title: 'Sending your first message', url: '/help/send-message' },
      { title: 'Managing your conversations', url: '/help/manage-conversations' },
      { title: 'Notification settings', url: '/help/notification-settings' },
      { title: 'Communication guidelines', url: '/help/communication-guidelines' },
    ]
  },
  {
    id: 'profile',
    title: 'Profile Management',
    icon: User,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    articles: [
      { title: 'Editing your profile', url: '/help/edit-profile' },
      { title: 'Adding skills and expertise', url: '/help/add-skills' },
      { title: 'Profile visibility settings', url: '/help/profile-visibility' },
      { title: 'Getting verified', url: '/help/get-verified' },
    ]
  },
  {
    id: 'safety',
    title: 'Safety & Privacy',
    icon: Shield,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    articles: [
      { title: 'Safety guidelines', url: '/help/safety-guidelines' },
      { title: 'Reporting inappropriate behavior', url: '/help/report-behavior' },
      { title: 'Blocking users', url: '/help/block-users' },
      { title: 'Privacy settings', url: '/help/privacy-settings' },
    ]
  },
  {
    id: 'account',
    title: 'Account Settings',
    icon: Settings,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    articles: [
      { title: 'Changing your password', url: '/help/change-password' },
      { title: 'Email preferences', url: '/help/email-preferences' },
      { title: 'Deactivating your account', url: '/help/deactivate-account' },
      { title: 'Deleting your account', url: '/help/delete-account' },
    ]
  },
]

// Popular articles
const popularArticles = [
  { title: 'How to find the perfect mentor', category: 'Getting Started', views: 1234, url: '/help/finding-mentor-or-mentee' },
  { title: 'Best practices for mentorship communication', category: 'Communication', views: 1156, url: '/help/session-best-practices' },
  { title: 'How to write an effective profile', category: 'Profile', views: 1089, url: '/help/create-profile' },
  { title: 'Staying safe on the platform', category: 'Safety', views: 967, url: '/help/safety-guidelines' },
  { title: 'Setting up your availability', category: 'Communication', views: 892, url: '/help/setup-availability' },
]

// FAQs
const faqs = [
  {
    question: 'How do I get started as a mentor?',
    answer: 'To get started as a mentor, create your account, complete your profile with your expertise and experience, set your availability, and start browsing potential mentees or wait for interest requests.'
  },
  {
    question: 'How do I get started as a mentee?',
    answer: 'To get started as a mentee, create your account, complete your profile with your goals and interests, browse available mentors, and send interest requests to those who match your needs.'
  },
  {
    question: 'Is Look 4 Mentors free?',
    answer: 'Yes! Look 4 Mentors is completely free to use. All features, including matching, messaging, profile creation, and connections, are available to everyone at no cost. There are no premium tiers, subscriptions, or hidden fees.'
  },
  {
    question: 'How does the matching process work?',
    answer: 'Our platform uses an algorithm that considers skills, interests, goals, and availability to suggest potential matches. You can also manually browse and connect with mentors or mentees.'
  },
  {
    question: 'Can I be both a mentor and a mentee?',
    answer: 'No, you must choose one role when creating your account - either mentor or mentee. This helps us provide focused matching and ensures clear expectations in your mentorship relationships.'
  },
  {
    question: 'How does communication work on the platform?',
    answer: 'All communication happens through our secure messaging system. You can schedule times to exchange messages with your mentor or mentee. There are no video calls or phone calls on the platform - communication is text-based only. You can share your own contact details privately if you both agree to connect outside the platform.'
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Searching for: ${searchQuery}`)
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Page Header */}
      <section className="bg-primary-dark pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black font-montserrat text-white sm:text-5xl mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-white/80 font-montserrat mb-8">
            Search our knowledge base or browse categories below
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for help articles..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border-0 font-montserrat text-primary-dark placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-xl"
              />
            </div>
          </form>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-12 -mt-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpCategories.map((category) => (
              <Card key={category.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center`}>
                      <category.icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <h3 className="text-lg font-black font-montserrat text-primary-dark">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {category.articles.map((article, index) => (
                      <li key={index}>
                        <Link
                          href={article.url}
                          className="flex items-center justify-between text-sm font-montserrat text-neutral-700 hover:text-primary-accent transition-colors group"
                        >
                          <span>{article.title}</span>
                          <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-primary-accent transition-colors" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-black font-montserrat text-primary-dark mb-8">
            Popular Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularArticles.map((article, index) => (
              <Link
                key={index}
                href={article.url}
                className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary-accent hover:bg-primary-accent/5 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-accent/10 rounded-full flex items-center justify-center">
                    <Book className="h-4 w-4 text-primary-accent" />
                  </div>
                  <div>
                    <p className="font-semibold font-montserrat text-primary-dark group-hover:text-primary-accent">
                      {article.title}
                    </p>
                    <p className="text-xs font-montserrat text-neutral-500">
                      {article.category} • {article.views.toLocaleString()} views
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-primary-accent" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black font-montserrat text-primary-dark mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600 font-montserrat">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <Card key={index} className="shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary-accent flex-shrink-0" />
                    <h3 className="font-bold font-montserrat text-primary-dark">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 text-neutral-400 transition-transform ${
                      expandedFaq === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-neutral-700 font-montserrat pl-8">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-12 bg-primary-dark">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black font-montserrat text-white mb-4">
            Still need help?
          </h2>
          <p className="text-white/80 font-montserrat mb-8">
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
                <Mail className="h-5 w-5 mr-2" />
                Contact Support
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/faq">
                <HelpCircle className="h-5 w-5 mr-2" />
                View FAQs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-black font-montserrat text-primary-dark mb-6">
            Additional Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Book className="h-8 w-8 text-primary-accent mb-3" />
                <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                  User Guide
                </h3>
                <p className="text-sm font-montserrat text-neutral-600 mb-4">
                  Complete guide to using Look 4 Mentors
                </p>
                <Link
                  href="/help/user-guide"
                  className="flex items-center gap-2 text-sm font-semibold font-montserrat text-primary-accent hover:text-primary-accent/80"
                >
                  Read Guide <ExternalLink className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <MessageCircle className="h-8 w-8 text-secondary-accent mb-3" />
                <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                  Community Forum
                </h3>
                <p className="text-sm font-montserrat text-neutral-600 mb-4">
                  Connect with other users and share experiences
                </p>
                <Link
                  href="/forum"
                  className="flex items-center gap-2 text-sm font-semibold font-montserrat text-primary-accent hover:text-primary-accent/80"
                >
                  Visit Forum <ExternalLink className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                  Safety Center
                </h3>
                <p className="text-sm font-montserrat text-neutral-600 mb-4">
                  Learn about our safety and privacy policies
                </p>
                <Link
                  href="/safety"
                  className="flex items-center gap-2 text-sm font-semibold font-montserrat text-primary-accent hover:text-primary-accent/80"
                >
                  Learn More <ExternalLink className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

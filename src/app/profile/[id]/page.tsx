'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  GraduationCap,
  Star,
  Heart,
  MessageCircle,
  Flag,
  Ban,
  Calendar,
  Award,
  TrendingUp,
  Users,
  Clock,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  CheckCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

// Mock user data - in production this would come from API
const mockUserProfiles: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Sarah Thompson',
    role: 'mentor',
    title: 'Senior Product Manager',
    company: 'Tech Innovations Inc.',
    location: 'San Francisco, CA',
    avatar: null,
    rating: 4.9,
    reviewCount: 47,
    sessionsCompleted: 156,
    responseTime: '2 hours',
    memberSince: 'January 2023',
    isVerified: true,
    bio: "I'm a product manager with over 10 years of experience in tech. I'm passionate about helping aspiring PMs break into the industry and navigate their careers. My expertise includes product strategy, roadmap planning, stakeholder management, and team leadership.",
    expertise: ['Product Management', 'Strategy', 'Leadership', 'UX Design', 'Agile', 'Stakeholder Management', 'Data Analysis', 'Go-to-Market'],
    interests: ['Artificial Intelligence', 'SaaS Products', 'Mobile Apps', 'Career Growth', 'Startup Culture'],
    experience: [
      {
        title: 'Senior Product Manager',
        company: 'Tech Innovations Inc.',
        duration: '2020 - Present',
        description: 'Leading product strategy for AI-powered enterprise solutions'
      },
      {
        title: 'Product Manager',
        company: 'Digital Solutions Co.',
        duration: '2017 - 2020',
        description: 'Managed cross-functional teams to deliver mobile applications'
      },
      {
        title: 'Associate Product Manager',
        company: 'StartupXYZ',
        duration: '2014 - 2017',
        description: 'Launched 3 successful products from concept to market'
      }
    ],
    education: [
      {
        degree: 'MBA',
        institution: 'Stanford Graduate School of Business',
        year: '2014'
      },
      {
        degree: 'BS in Computer Science',
        institution: 'UC Berkeley',
        year: '2012'
      }
    ],
    availability: 'Available for 2-3 sessions per month',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahthompson',
      twitter: 'https://twitter.com/sarahthompson',
      website: 'https://sarahthompson.com'
    },
    reviews: [
      {
        id: 1,
        reviewer: 'Michael Chen',
        rating: 5,
        date: '2 weeks ago',
        comment: "Sarah is an incredible mentor! Her insights on product strategy helped me land my dream PM role. She's patient, knowledgeable, and truly invested in my success."
      },
      {
        id: 2,
        reviewer: 'Emily Rodriguez',
        rating: 5,
        date: '1 month ago',
        comment: 'Every session with Sarah is valuable. She provides actionable advice and concrete frameworks that I can apply immediately in my work.'
      },
      {
        id: 3,
        reviewer: 'David Kim',
        rating: 5,
        date: '2 months ago',
        comment: 'Sarah helped me transition from engineering to product management. Her guidance was instrumental in making this career change successful.'
      },
      {
        id: 4,
        reviewer: 'Jessica Liu',
        rating: 4,
        date: '3 months ago',
        comment: 'Great mentor with deep expertise in product management. Very helpful in reviewing my product roadmap and prioritization strategies.'
      }
    ]
  },
  '2': {
    id: '2',
    name: 'James Wilson',
    role: 'mentee',
    title: 'Aspiring Software Engineer',
    company: 'Currently Student',
    location: 'Boston, MA',
    avatar: null,
    rating: 0,
    reviewCount: 0,
    sessionsCompleted: 0,
    responseTime: '1 hour',
    memberSince: 'December 2024',
    isVerified: false,
    bio: "I'm a computer science student passionate about web development and machine learning. Looking to connect with experienced software engineers who can guide me in building my career in tech.",
    expertise: ['JavaScript', 'React', 'Python', 'Git'],
    interests: ['Web Development', 'Machine Learning', 'Open Source', 'Career Guidance', 'Interview Prep'],
    experience: [
      {
        title: 'Software Engineering Intern',
        company: 'Local Tech Startup',
        duration: 'Summer 2024',
        description: 'Built features for web application using React and Node.js'
      }
    ],
    education: [
      {
        degree: 'BS in Computer Science (Expected)',
        institution: 'Boston University',
        year: '2025'
      }
    ],
    availability: 'Flexible - eager to learn',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/jameswilson',
      website: 'https://jameswilson.dev'
    },
    reviews: []
  }
}

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const userId = params?.id as string

  const [showAllReviews, setShowAllReviews] = useState(false)
  const [showActionsMenu, setShowActionsMenu] = useState(false)
  const [hasShownInterest, setHasShownInterest] = useState(false)

  // Get user profile - in production this would be fetched from API
  const profile = mockUserProfiles[userId]

  if (!profile) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="pt-24 pb-12 px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold font-montserrat text-neutral-700 mb-4">
            Profile not found
          </h1>
          <Button onClick={() => router.back()} variant="primary">
            Go Back
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  const displayedReviews = showAllReviews ? profile.reviews : profile.reviews.slice(0, 3)

  const handleShowInterest = () => {
    setHasShownInterest(true)
    alert(`You've shown interest in ${profile.name}! They will be notified.`)
  }

  const handleSendMessage = () => {
    router.push('/messages')
  }

  const handleReportProfile = () => {
    if (confirm(`Are you sure you want to report ${profile.name}? This will be reviewed by our team.`)) {
      alert('Thank you for your report. Our team will review this profile.')
    }
    setShowActionsMenu(false)
  }

  const handleBlockUser = () => {
    if (confirm(`Are you sure you want to block ${profile.name}? You will no longer see their profile.`)) {
      alert('User has been blocked successfully.')
      router.back()
    }
    setShowActionsMenu(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Profile Header */}
      <section className="bg-primary-dark pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-primary-accent hover:text-primary-accent/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-semibold font-montserrat">Back</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-start">
            {/* Avatar */}
            <Avatar
              fallback={profile.name}
              size="xl"
              className="border-4 border-white shadow-lg"
            />

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-2">
                <h1 className="text-3xl font-black font-montserrat text-white sm:text-4xl">
                  {profile.name}
                </h1>
                {profile.isVerified && (
                  <CheckCircle className="h-6 w-6 text-primary-accent flex-shrink-0 mt-1" />
                )}
              </div>

              <p className="text-xl font-semibold font-montserrat text-white/90 mb-3">
                {profile.title}
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge
                  variant={profile.role === 'mentor' ? 'primary' : 'secondary'}
                  size="lg"
                  className={profile.role === 'mentor' ? 'bg-primary-accent text-primary-dark' : 'bg-secondary-accent text-white'}
                >
                  {profile.role === 'mentor' ? 'Mentor' : 'Mentee'}
                </Badge>

                {profile.role === 'mentor' && profile.rating > 0 && (
                  <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full">
                    <Star className="h-4 w-4 text-primary-accent fill-primary-accent" />
                    <span className="text-sm font-bold font-montserrat text-white">
                      {profile.rating}
                    </span>
                    <span className="text-sm font-montserrat text-white/70">
                      ({profile.reviewCount} reviews)
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span className="text-sm font-montserrat">{profile.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-montserrat">{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-montserrat">Member since {profile.memberSince}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              {profile.role === 'mentor' && (
                <>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleShowInterest}
                    disabled={hasShownInterest}
                    className="bg-primary-accent text-primary-dark hover:bg-primary-accent/90 w-full sm:w-auto"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    {hasShownInterest ? 'Interest Shown' : 'Show Interest'}
                  </Button>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={handleSendMessage}
                    className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </>
              )}

              <div className="relative">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setShowActionsMenu(!showActionsMenu)}
                  className="text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  <Flag className="h-4 w-4 mr-2" />
                  More Actions
                </Button>

                {showActionsMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-neutral-200 z-10">
                    <button
                      onClick={handleReportProfile}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm font-medium font-montserrat text-red-600 hover:bg-neutral-50 rounded-t-lg"
                    >
                      <Flag className="h-4 w-4" />
                      Report Profile
                    </button>
                    <button
                      onClick={handleBlockUser}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm font-medium font-montserrat text-red-600 hover:bg-neutral-50 rounded-b-lg"
                    >
                      <Ban className="h-4 w-4" />
                      Block User
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Stats - Only for Mentors */}
      {profile.role === 'mentor' && (
        <section className="bg-white border-b border-neutral-200 py-6">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="h-5 w-5 text-primary-accent" />
                  <p className="text-2xl font-black font-montserrat text-primary-dark">
                    {profile.sessionsCompleted}
                  </p>
                </div>
                <p className="text-sm font-montserrat text-neutral-600">Sessions Completed</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <p className="text-2xl font-black font-montserrat text-primary-dark">
                    {profile.rating}
                  </p>
                </div>
                <p className="text-sm font-montserrat text-neutral-600">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Clock className="h-5 w-5 text-secondary-accent" />
                  <p className="text-2xl font-black font-montserrat text-primary-dark">
                    {profile.responseTime}
                  </p>
                </div>
                <p className="text-sm font-montserrat text-neutral-600">Response Time</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Award className="h-5 w-5 text-green-600" />
                  <p className="text-2xl font-black font-montserrat text-primary-dark">
                    {profile.reviewCount}
                  </p>
                </div>
                <p className="text-sm font-montserrat text-neutral-600">Total Reviews</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <Card className="shadow-md">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-black font-montserrat text-primary-dark mb-4">
                    About
                  </h2>
                  <p className="text-neutral-700 font-montserrat leading-relaxed">
                    {profile.bio}
                  </p>
                </CardContent>
              </Card>

              {/* Experience */}
              {profile.experience && profile.experience.length > 0 && (
                <Card className="shadow-md">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-black font-montserrat text-primary-dark mb-4 flex items-center gap-2">
                      <Briefcase className="h-6 w-6 text-primary-accent" />
                      Experience
                    </h2>
                    <div className="space-y-4">
                      {profile.experience.map((exp: any, index: number) => (
                        <div key={index} className="border-l-2 border-primary-accent pl-4">
                          <h3 className="font-bold font-montserrat text-primary-dark">
                            {exp.title}
                          </h3>
                          <p className="text-sm font-semibold font-montserrat text-neutral-600">
                            {exp.company}
                          </p>
                          <p className="text-sm font-montserrat text-neutral-500 mb-2">
                            {exp.duration}
                          </p>
                          <p className="text-sm font-montserrat text-neutral-700">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Education */}
              {profile.education && profile.education.length > 0 && (
                <Card className="shadow-md">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-black font-montserrat text-primary-dark mb-4 flex items-center gap-2">
                      <GraduationCap className="h-6 w-6 text-secondary-accent" />
                      Education
                    </h2>
                    <div className="space-y-3">
                      {profile.education.map((edu: any, index: number) => (
                        <div key={index} className="border-l-2 border-secondary-accent pl-4">
                          <h3 className="font-bold font-montserrat text-primary-dark">
                            {edu.degree}
                          </h3>
                          <p className="text-sm font-semibold font-montserrat text-neutral-600">
                            {edu.institution}
                          </p>
                          <p className="text-sm font-montserrat text-neutral-500">
                            {edu.year}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Reviews - Only for Mentors */}
              {profile.role === 'mentor' && profile.reviews && profile.reviews.length > 0 && (
                <Card className="shadow-md">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-black font-montserrat text-primary-dark mb-4 flex items-center gap-2">
                      <Star className="h-6 w-6 text-yellow-500" />
                      Reviews ({profile.reviewCount})
                    </h2>
                    <div className="space-y-4">
                      {displayedReviews.map((review: any) => (
                        <div key={review.id} className="border-b border-neutral-100 pb-4 last:border-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-bold font-montserrat text-primary-dark">
                                {review.reviewer}
                              </p>
                              <p className="text-xs font-montserrat text-neutral-500">
                                {review.date}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? 'text-yellow-500 fill-yellow-500'
                                      : 'text-neutral-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm font-montserrat text-neutral-700">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>

                    {profile.reviews.length > 3 && (
                      <button
                        onClick={() => setShowAllReviews(!showAllReviews)}
                        className="flex items-center gap-2 text-sm font-semibold font-montserrat text-primary-accent hover:text-primary-accent/80 mt-4"
                      >
                        {showAllReviews ? (
                          <>
                            Show Less <ChevronUp className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Show All Reviews <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Skills & Expertise */}
              <Card className="shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-black font-montserrat text-primary-dark mb-3">
                    Skills & Expertise
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.expertise.map((skill: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-primary-accent/10 text-primary-dark border border-primary-accent/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Interests */}
              <Card className="shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-black font-montserrat text-primary-dark mb-3">
                    Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.interests.map((interest: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-secondary-accent/10 text-secondary-accent border border-secondary-accent/20"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Availability - Only for Mentors */}
              {profile.role === 'mentor' && (
                <Card className="shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-black font-montserrat text-primary-dark mb-3 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary-accent" />
                      Availability
                    </h3>
                    <p className="text-sm font-montserrat text-neutral-700">
                      {profile.availability}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Social Links */}
              {profile.socialLinks && (
                <Card className="shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-black font-montserrat text-primary-dark mb-3">
                      Connect
                    </h3>
                    <div className="space-y-2">
                      {profile.socialLinks.linkedin && (
                        <a
                          href={profile.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm font-montserrat text-neutral-700 hover:text-primary-accent transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                          LinkedIn
                        </a>
                      )}
                      {profile.socialLinks.twitter && (
                        <a
                          href={profile.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm font-montserrat text-neutral-700 hover:text-primary-accent transition-colors"
                        >
                          <Twitter className="h-5 w-5" />
                          Twitter
                        </a>
                      )}
                      {profile.socialLinks.website && (
                        <a
                          href={profile.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-sm font-montserrat text-neutral-700 hover:text-primary-accent transition-colors"
                        >
                          <Globe className="h-5 w-5" />
                          Website
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

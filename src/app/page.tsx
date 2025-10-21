'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ComingSoon } from '@/components/coming-soon'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { CountUp } from '@/components/ui/count-up'
import { TestimonialsColumn } from '@/components/ui/testimonials-column'
import {
  FadeIn,
  SlideUp,
  SlideInLeft,
  SlideInRight,
  ScaleUp,
  StaggerContainer,
  StaggerItem,
  ButtonHover,
  CardHover
} from '@/components/ui/animations'
import { getActiveMentors, getSuccessfulMatches } from '@/lib/stats'
import {
  Users,
  Calendar,
  Shield,
  MessageCircle,
  TrendingUp,
  Award,
  Globe,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Heart,
  X
} from 'lucide-react'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

// Success Message Component (wrapped in Suspense)
function SuccessMessage() {
  const searchParams = useSearchParams()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successType, setSuccessType] = useState<string | null>(null)

  useEffect(() => {
    // Check if we should show the success message
    const type = searchParams.get('success')
    if (type === 'mentor-signup' || type === 'mentee-signup') {
      setShowSuccessMessage(true)
      setSuccessType(type)

      // Auto-hide after 8 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false)
      }, 8000)

      return () => clearTimeout(timer)
    }
  }, [searchParams])

  const getSuccessMessage = () => {
    if (successType === 'mentor-signup') {
      return 'Thank you for signing up as a mentor. You\'ll receive a confirmation email shortly.'
    } else if (successType === 'mentee-signup') {
      return 'Thank you for signing up as a mentee. You\'ll receive a confirmation email shortly.'
    }
    return ''
  }

  if (!showSuccessMessage) return null

  return (
    <div className="fixed top-20 left-0 right-0 z-50 flex justify-center px-4 animate-in slide-in- duration-500">
      <div className="bg-white border-2 border-secondary-accent shadow-2xl rounded-lg p-6 max-w-md w-full">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="h-12 w-12 rounded-full bg-secondary-accent/10 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-secondary-accent" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-1">
              Welcome Aboard!
            </h3>
            <p className="text-sm text-neutral-700 font-montserrat leading-relaxed">
              {getSuccessMessage()}
            </p>
          </div>
          <button
            onClick={() => setShowSuccessMessage(false)}
            className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    title: 'Smart Matching',
    description: 'Our intelligent algorithm connects you with the perfect mentor based on your goals, interests, and industry.',
    icon: Target,
    color: 'text-vibrant-accent',
  },
  {
    title: 'Flexible Scheduling',
    description: 'Schedule messaging time at your convenience with integrated calendar scheduling and automated reminders.',
    icon: Calendar,
    color: 'text-primary-accent',
  },
  {
    title: 'Verified Mentors',
    description: 'All mentors are carefully vetted and verified to ensure quality guidance and professional expertise.',
    icon: Shield,
    color: 'text-success',
  },
  {
    title: 'Real-time Chat',
    description: 'Connect instantly with your mentor through our secure, real-time messaging platform.',
    icon: MessageCircle,
    color: 'text-secondary-accent',
  },
  {
    title: 'Progress Tracking',
    description: 'Monitor your growth with communication history, reviews, and milestone tracking features.',
    icon: TrendingUp,
    color: 'text-warning',
  },
  {
    title: 'Safe & Secure',
    description: 'Your data is protected with enterprise-grade security and complete privacy controls.',
    icon: Shield,
    color: 'text-info',
  },
]

const industries = [
  'Technology & IT',
  'Finance & Accounting',
  'Marketing & Advertising',
  'Healthcare & Medicine',
  'Education & Training',
  'Engineering',
  'Creative Arts & Design',
  'Sales & Business Development',
  'Human Resources',
  'Legal & Law',
  'Entrepreneurship & Startups',
  'Consulting',
  'Social Media',
  'Music',
  'Film',
]

export default function Home() {
  // Authentication state for preview access
  const [hasPreviewAccess, setHasPreviewAccess] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  // Check if user has preview access on mount
  useEffect(() => {
    const previewAccess = localStorage.getItem('preview_access')
    setHasPreviewAccess(previewAccess === 'true')
    setIsCheckingAuth(false)
  }, [])

  // Handle successful authentication
  const handleAuthenticated = () => {
    setHasPreviewAccess(true)
  }

  // Show loading state briefly while checking auth
  if (isCheckingAuth) {
    return <div className="min-h-screen bg-primary-dark" />
  }

  // Show Coming Soon page if not authenticated
  if (!hasPreviewAccess) {
    return <ComingSoon onAuthenticated={handleAuthenticated} />
  }

  const [testimonials, setTestimonials] = useState([
    {
      content: "Finding my mentor through Look 4 Mentors was a game-changer for my career. The personalized guidance helped me land my dream job!",
      author: "Sarah Chen",
      role: "Software Engineer",
      company: "Tech Startup",
      rating: 5,
      avatar: null,
    },
    {
      content: "As a mentor, this platform makes it incredibly easy to share my knowledge and give back to the community. The scheduling features are fantastic!",
      author: "Michael Rodriguez",
      role: "Senior Marketing Director",
      company: "Fortune 500",
      rating: 5,
      avatar: null,
    },
    {
      content: "The quality of mentors on this platform is exceptional. I've learned more in 3 months than I did in the previous year!",
      author: "Emily Thompson",
      role: "Product Manager",
      company: "SaaS Company",
      rating: 5,
      avatar: null,
    },
    {
      content: "The mentorship I received helped me transition into a new career field. Forever grateful for this amazing platform!",
      author: "David Kim",
      role: "Data Analyst",
      company: "FinTech Corp",
      rating: 5,
      avatar: null,
    },
    {
      content: "Being able to connect with industry experts has accelerated my professional growth beyond my expectations.",
      author: "Jessica Martinez",
      role: "UX Designer",
      company: "Design Studio",
      rating: 5,
      avatar: null,
    },
    {
      content: "This platform connected me with a mentor who truly understood my goals and challenges. Highly recommend!",
      author: "Alex Johnson",
      role: "Marketing Specialist",
      company: "E-commerce Co",
      rating: 5,
      avatar: null,
    },
  ])

  const firstColumn = testimonials.slice(0, 3)
  const secondColumn = testimonials.slice(3, 6)
  const thirdColumn = testimonials.slice(0, 3)
  const [stats, setStats] = useState([
    { label: 'Active Mentors', value: 20, suffix: '+', decimals: 0, icon: Users },
    { label: 'Successful Matches', value: 15, suffix: '+', decimals: 0, icon: Heart },
    { label: 'Industries Covered', value: 25, suffix: '+', decimals: 0, icon: Globe },
    { label: 'Average Rating', value: 4.8, suffix: '/5', decimals: 1, icon: Star },
  ])

  useEffect(() => {
    // Load stats from localStorage
    const activeMentors = getActiveMentors()
    const successfulMatches = getSuccessfulMatches()

    setStats([
      { label: 'Active Mentors', value: activeMentors, suffix: '+', decimals: 0, icon: Users },
      { label: 'Successful Matches', value: successfulMatches, suffix: '+', decimals: 0, icon: Heart },
      { label: 'Industries Covered', value: 25, suffix: '+', decimals: 0, icon: Globe },
      { label: 'Average Rating', value: 4.8, suffix: '/5', decimals: 1, icon: Star },
    ])

    // Fetch Pexels images for testimonial avatars
    const fetchTestimonialImages = async () => {
      try {
        const response = await fetch('https://api.pexels.com/v1/search?query=professional+headshot+portrait&per_page=20&orientation=square', {
          headers: {
            Authorization: '8sLoMXg5fX4DKdmX8sSFxebcYNbdcwU6VizqTp4YRdrJ7a3MVlwc9qpp'
          }
        })

        const data = await response.json()

        if (data.photos && data.photos.length >= 6) {
          setTestimonials(prevTestimonials =>
            prevTestimonials.map((testimonial, index) => ({
              ...testimonial,
              avatar: data.photos[index + 6]?.src?.medium || null // Use offset to get different images than mentors
            }))
          )
        }
      } catch (error) {
        console.error('Error fetching testimonial images:', error)
      }
    }

    fetchTestimonialImages()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Success Message */}
      <Suspense fallback={null}>
        <SuccessMessage />
      </Suspense>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-dark pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout: Title > Animation > Content */}
          <div className="flex flex-col lg:hidden items-center text-center">
            {/* Mobile: Header */}
            <FadeIn className="mb-8">
              <ScaleUp>
                <Badge variant="new" className="mb-4 bg-primary-accent/90 text-primary-dark border-primary-accent">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Connect With Verified Mentors
                </Badge>
              </ScaleUp>
              <SlideUp delay={0.2}>
                <h1 className="text-4xl font-black font-montserrat tracking-tight text-white sm:text-5xl drop-shadow-lg">
                  Find Your Perfect Mentor
                </h1>
              </SlideUp>
            </FadeIn>

            {/* Mobile: Animation (Center Focus) */}
            <div className="relative flex items-center justify-center w-full mb-8">
              <div className="relative w-full max-w-md mx-auto" style={{
                backgroundColor: '#25283D'
              }}>
                <Lottie
                  animationData={require('/public/hero-animation.json')}
                  loop={true}
                  className="w-full h-auto"
                  style={{
                    filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
                  }}
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice'
                  }}
                />

                {/* Left gradient fade */}
                <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-10" style={{
                  background: 'linear-gradient(to right, #25283D, transparent)'
                }} />

                {/* Right gradient fade */}
                <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10" style={{
                  background: 'linear-gradient(to left, #25283D, transparent)'
                }} />
              </div>
            </div>

            {/* Mobile: Description & Buttons */}
            <div className="max-w-xl">
              <SlideUp>
                <p className="text-base leading-7 text-white/90 font-montserrat">
                  Connect with verified mentors for career guidance, personal growth, and professional development.
                </p>
              </SlideUp>
              <SlideUp delay={0.2}>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
                  <ButtonHover>
                    <Button size="lg" variant="primary" asChild className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark shadow-xl w-full sm:w-auto">
                      <Link href="/onboarding/mentee" className="whitespace-nowrap">
                        Find a Mentor
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </Link>
                    </Button>
                  </ButtonHover>
                  <ButtonHover>
                    <Button size="lg" variant="primary" asChild className="bg-secondary-accent hover:bg-secondary-accent/90 text-white shadow-xl w-full sm:w-auto">
                      <Link href="/onboarding/mentor" className="whitespace-nowrap">
                        Become a Mentor
                      </Link>
                    </Button>
                  </ButtonHover>
                </div>
              </SlideUp>
            </div>
          </div>

          {/* Desktop Layout: Side by Side */}
          <div className="hidden lg:grid grid-cols-2 gap-8 items-center">
            {/* Left: Content */}
            <SlideInLeft className="max-w-2xl">
              <ScaleUp>
                <Badge variant="new" className="mb-4 bg-primary-accent/90 text-primary-dark border-primary-accent">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Connect With Verified Mentors
                </Badge>
              </ScaleUp>
              <FadeIn delay={0.2}>
                <h1 className="text-4xl font-black font-montserrat tracking-tight text-white sm:text-5xl lg:text-6xl drop-shadow-lg">
                  Find Your Perfect Mentor
                </h1>
              </FadeIn>
              <SlideUp delay={0.3}>
                <p className="mt-6 text-lg leading-8 text-white/90 font-montserrat lg:text-xl">
                  Connect with experienced mentors ready to guide your journey, wherever you are in life.
                  Whether you're navigating career transitions, seeking personal growth, or looking for
                  motivation and support, find meaningful connections through our verified mentor matching platform.
                </p>
              </SlideUp>
              <SlideUp delay={0.4}>
                <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <ButtonHover>
                    <Button size="lg" variant="primary" asChild className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark shadow-xl">
                      <Link href="/onboarding/mentee" className="whitespace-nowrap">
                        Find a Mentor
                        <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </Link>
                    </Button>
                  </ButtonHover>
                  <ButtonHover>
                    <Button size="lg" variant="primary" asChild className="bg-secondary-accent hover:bg-secondary-accent/90 text-white shadow-xl">
                      <Link href="/onboarding/mentor" className="whitespace-nowrap">
                        Become a Mentor
                      </Link>
                    </Button>
                  </ButtonHover>
                </div>
              </SlideUp>
            </SlideInLeft>

            {/* Right: Lottie Animation */}
            <SlideInRight className="relative flex items-center justify-center">
              <FadeIn delay={0.3}>
                <div className="relative w-full max-w-lg mx-auto" style={{
                  backgroundColor: '#25283D'
                }}>
                  <Lottie
                    animationData={require('/public/hero-animation.json')}
                    loop={true}
                    className="w-full h-auto"
                    style={{
                      filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))',
                    }}
                    rendererSettings={{
                      preserveAspectRatio: 'xMidYMid slice'
                    }}
                  />

                  {/* Left gradient fade */}
                  <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none z-10" style={{
                    background: 'linear-gradient(to right, #25283D, transparent)'
                  }} />

                  {/* Right gradient fade */}
                  <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none z-10" style={{
                    background: 'linear-gradient(to left, #25283D, transparent)'
                  }} />
                </div>
              </FadeIn>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 sm:py-16 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <ScaleUp className="text-center">
                  <stat.icon className="mx-auto h-8 w-8 text-secondary-accent mb-2" />
                  <p className="text-3xl font-black font-montserrat text-primary-dark">
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals}
                      duration={2000}
                    />
                  </p>
                  <p className="mt-1 text-sm font-montserrat text-neutral-600">
                    {stat.label}
                  </p>
                </ScaleUp>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-secondary-accent py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Content & Steps */}
            <SlideInLeft>
              <FadeIn>
                <h2 className="text-3xl font-bold font-montserrat tracking-tight text-white sm:text-4xl lg:text-5xl">
                  How It Works
                </h2>
                <p className="mt-4 text-lg text-white/90 font-montserrat">
                  Start your mentorship journey in three simple steps
                </p>
              </FadeIn>

              {/* Steps */}
              <StaggerContainer className="mt-12 space-y-8">
                {[
                  {
                    step: '1',
                    title: 'Create Your Profile',
                    description: 'Sign up and tell us about your goals, interests, and what you\'re looking for in a mentor.',
                    icon: Users,
                  },
                  {
                    step: '2',
                    title: 'Find Your Match',
                    description: 'Browse verified mentors or use our smart matching to find the perfect guide for your journey.',
                    icon: Target,
                  },
                  {
                    step: '3',
                    title: 'Start Growing',
                    description: 'Connect, schedule messaging time, and begin your transformative mentorship experience.',
                    icon: TrendingUp,
                  },
                ].map((item) => (
                  <StaggerItem key={item.step}>
                    <SlideUp className="flex gap-6 items-start">
                      <div className="flex-shrink-0">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-secondary-accent shadow-lg">
                          <span className="text-xl font-black font-montserrat">{item.step}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <item.icon className="h-8 w-8 text-white" />
                          <h3 className="text-xl font-bold font-montserrat text-white">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-white/80 font-montserrat leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </SlideUp>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </SlideInLeft>

            {/* Right: Lottie Animation */}
            <SlideInRight className="relative flex items-center justify-center">
              <ScaleUp delay={0.2}>
                <div className="relative w-full max-w-lg mx-auto" style={{
                  backgroundColor: '#8F3985'
                }}>
                  <div className="relative" style={{
                    mixBlendMode: 'screen',
                  }}>
                    <Lottie
                      animationData={require('/public/how-it-works-animation.json')}
                      loop={true}
                      className="w-full h-auto"
                      style={{
                        filter: 'brightness(1.3) contrast(1.2) saturate(0.8)',
                      }}
                    />
                  </div>

                  {/* Left gradient fade */}
                  <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none" style={{
                    background: 'linear-gradient(to right, #8F3985, transparent)'
                  }} />

                  {/* Right gradient fade */}
                  <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none" style={{
                    background: 'linear-gradient(to left, #8F3985, transparent)'
                  }} />
                </div>
              </ScaleUp>
            </SlideInRight>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-neutral-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <SlideUp>
              <h2 className="text-3xl font-bold font-montserrat tracking-tight text-primary-dark sm:text-4xl">
                Platform Features
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-montserrat">
                Everything you need for a successful mentorship experience
              </p>
            </SlideUp>
          </FadeIn>
          <div className="mx-auto mt-16 max-w-7xl">
            <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <CardHover>
                    <Card className="border-0 shadow-card hover:shadow-elevated transition-shadow h-full">
                      <CardHeader>
                        <feature.icon className={`h-10 w-10 ${feature.color}`} />
                        <CardTitle className="mt-4">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </CardHover>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="py-24 sm:py-32 bg-primary-dark">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <SlideUp>
              <h2 className="text-3xl font-bold font-montserrat tracking-tight text-white sm:text-4xl">
                Mentors Across All Industries
              </h2>
              <p className="mt-4 text-lg text-white/90 font-montserrat">
                Find experienced professionals in your field
              </p>
            </SlideUp>
          </FadeIn>
          <SlideUp delay={0.2} className="mx-auto mt-12 max-w-5xl">
            <StaggerContainer className="flex flex-wrap justify-center gap-3">
              {industries.map((industry, index) => (
                <StaggerItem key={industry}>
                  <ScaleUp delay={index * 0.05}>
                    <Badge
                      variant="outline"
                      size="lg"
                      className="cursor-pointer border-white/30 text-white hover:bg-primary-accent hover:text-primary-dark hover:border-primary-accent transition-all"
                    >
                      {industry}
                    </Badge>
                  </ScaleUp>
                </StaggerItem>
              ))}
              <StaggerItem>
                <ScaleUp delay={industries.length * 0.05}>
                  <Badge variant="secondary" size="lg" className="bg-secondary-accent text-white hover:bg-secondary-accent/90">
                    + 15 More Industries
                  </Badge>
                </ScaleUp>
              </StaggerItem>
            </StaggerContainer>
          </SlideUp>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-neutral-50 py-24 sm:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center mb-16">
            <SlideUp>
              <h2 className="text-3xl font-bold font-montserrat tracking-tight text-primary-dark sm:text-4xl">
                Success Stories
              </h2>
              <p className="mt-4 text-lg text-neutral-600 font-montserrat">
                Hear from our community of mentors and mentees
              </p>
            </SlideUp>
          </FadeIn>

          {/* Vertical scrolling testimonials columns */}
          <FadeIn delay={0.2}>
            <div className="relative h-[600px] flex gap-6 justify-center items-start [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
              <TestimonialsColumn testimonials={firstColumn} duration={15} className="hidden md:block" />
              <TestimonialsColumn testimonials={secondColumn} duration={19} className="" />
              <TestimonialsColumn testimonials={thirdColumn} duration={17} className="hidden lg:block" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Content */}
            <SlideInLeft className="text-center lg:text-left">
              <FadeIn>
                <h2 className="text-3xl font-bold font-montserrat tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Ready to Get Started?
                </h2>
              </FadeIn>
              <SlideUp delay={0.2}>
                <p className="mt-6 text-lg leading-8 text-white/90 font-montserrat lg:text-xl">
                  Join thousands of ambitious individuals growing and thriving through meaningful mentorship connections.
                </p>
              </SlideUp>
              <SlideUp delay={0.3}>
                <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-6">
                  <ButtonHover>
                    <Button size="lg" variant="primary" asChild className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark shadow-xl w-full sm:w-auto">
                      <Link href="/get-started" className="whitespace-nowrap">
                        Start Your Journey
                        <Zap className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </Link>
                    </Button>
                  </ButtonHover>
                  <Link href="#how-it-works" className="text-sm font-semibold font-montserrat leading-6 text-white hover:text-primary-accent transition-colors">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </SlideUp>
            </SlideInLeft>

            {/* Right: Lottie Animation */}
            <SlideInRight className="relative flex items-center justify-center">
              <ScaleUp delay={0.2}>
                <div className="relative w-full max-w-md mx-auto">
                  <Lottie
                    animationData={require('/public/cta-animation.json')}
                    loop={true}
                    className="w-full h-auto"
                  />
                </div>
              </ScaleUp>
            </SlideInRight>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  ArrowRight,
  Users,
  Target,
  CheckCircle,
  Sparkles,
  TrendingUp,
  Heart,
  Award,
  Lightbulb
} from 'lucide-react'

export default function GetStarted() {
  const mentorBenefits = [
    'Share your expertise and give back',
    'Develop leadership and coaching skills',
    'Expand your network and connections',
    'Gain fresh perspectives from mentees',
    'Make a meaningful impact on lives',
  ]

  const menteeBenefits = [
    'Accelerate your personal and professional growth',
    'Learn from experienced mentors',
    'Get personalized guidance and support',
    'Build valuable connections',
    'Achieve your goals with expert guidance',
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-dark pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center px-4 py-2 mb-6 bg-primary-accent/20 border border-primary-accent/30 rounded-full">
              <Sparkles className="mr-2 h-4 w-4 text-primary-accent" />
              <span className="text-sm font-semibold font-montserrat text-primary-accent">
                Start Your Journey Today
              </span>
            </div>
            <h1 className="text-4xl font-black font-montserrat tracking-tight text-white sm:text-5xl lg:text-6xl">
              Choose Your Path
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 font-montserrat lg:text-xl">
              Whether you're looking to guide others or seeking guidance yourself,
              we're here to help you connect and grow.
            </p>
          </div>
        </div>
      </section>

      {/* Options Section */}
      <section className="py-24 sm:py-32 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Mentor Card */}
            <Card className="relative overflow-hidden border-2 border-secondary-accent/20 hover:border-secondary-accent shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8 lg:p-12">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-secondary-accent/10 group-hover:bg-secondary-accent/20 transition-colors">
                  <Users className="h-8 w-8 text-secondary-accent" />
                </div>

                <h2 className="text-3xl font-bold font-montserrat text-primary-dark mb-3">
                  Become a Mentor
                </h2>
                <p className="text-lg text-neutral-600 font-montserrat mb-8">
                  Share your knowledge and experience to help guide others on their
                  personal and professional journeys.
                </p>

                <div className="space-y-4 mb-10">
                  <h3 className="text-sm font-semibold font-montserrat text-neutral-700 uppercase tracking-wide">
                    Benefits
                  </h3>
                  {mentorBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-secondary-accent flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700 font-montserrat">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  size="xl"
                  variant="primary"
                  asChild
                  className="w-full bg-secondary-accent hover:bg-secondary-accent/90 text-white shadow-lg group-hover:shadow-xl transition-shadow"
                >
                  <Link href="/onboarding/mentor">
                    Become a Mentor
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-500 font-montserrat">
                  <Heart className="h-4 w-4" />
                  <span>Join 10,000+ mentors making a difference</span>
                </div>
              </CardContent>
            </Card>

            {/* Mentee Card */}
            <Card className="relative overflow-hidden border-2 border-primary-accent/20 hover:border-primary-accent shadow-lg hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8 lg:p-12">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary-accent/10 group-hover:bg-primary-accent/20 transition-colors">
                  <Target className="h-8 w-8 text-primary-accent" />
                </div>

                <h2 className="text-3xl font-bold font-montserrat text-primary-dark mb-3">
                  Find a Mentor
                </h2>
                <p className="text-lg text-neutral-600 font-montserrat mb-8">
                  Connect with experienced mentors who can guide you toward
                  your personal and professional goals.
                </p>

                <div className="space-y-4 mb-10">
                  <h3 className="text-sm font-semibold font-montserrat text-neutral-700 uppercase tracking-wide">
                    Benefits
                  </h3>
                  {menteeBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary-accent flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-700 font-montserrat">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  size="xl"
                  variant="primary"
                  asChild
                  className="w-full bg-primary-accent hover:bg-primary-accent/90 text-primary-dark shadow-lg group-hover:shadow-xl transition-shadow"
                >
                  <Link href="/onboarding/mentee">
                    Find a Mentor
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-500 font-montserrat">
                  <TrendingUp className="h-4 w-4" />
                  <span>50,000+ successful mentorship matches</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 sm:py-32 bg-secondary-accent">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-montserrat tracking-tight text-white sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-white/90 font-montserrat">
              Getting started is simple and takes just a few minutes
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: '1',
                icon: Users,
                title: 'Create Your Profile',
                description: 'Tell us about yourself, your goals, and what you\'re looking for in a mentorship relationship.',
              },
              {
                step: '2',
                icon: Target,
                title: 'Get Matched',
                description: 'Our smart matching algorithm connects you with the perfect mentor or mentee based on your profile.',
              },
              {
                step: '3',
                icon: TrendingUp,
                title: 'Start Growing',
                description: 'Begin messaging your mentor or mentee and start your journey toward personal and professional growth.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 mb-6">
                    <item.icon className="h-8 w-8 text-primary-accent" />
                  </div>
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 -z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-secondary-accent font-black font-montserrat text-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold font-montserrat text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/80 font-montserrat">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-montserrat tracking-tight text-primary-dark sm:text-4xl">
              Why Choose Look 4 Mentors?
            </h2>
            <p className="mt-4 text-lg text-neutral-600 font-montserrat">
              Everything you need for a successful mentorship experience
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Award,
                title: 'Verified Mentors',
                description: 'All mentors are carefully vetted for quality and expertise',
              },
              {
                icon: Target,
                title: 'Smart Matching',
                description: 'AI-powered algorithm for perfect mentor-mentee pairs',
              },
              {
                icon: Lightbulb,
                title: 'Flexible Messaging',
                description: 'Exchange messages at times that fit your busy schedule',
              },
              {
                icon: Heart,
                title: '100% Free',
                description: 'Completely free forever - no premium features or subscriptions',
              },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-accent/10 mb-4">
                  <feature.icon className="h-7 w-7 text-primary-accent" />
                </div>
                <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-neutral-600 font-montserrat">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-accent py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-montserrat tracking-tight text-primary-dark sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary-dark/80 font-montserrat">
              Join thousands of individuals who are already growing and thriving through mentorship.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button
                size="xl"
                variant="primary"
                asChild
                className="bg-secondary-accent hover:bg-secondary-accent/90 text-white shadow-xl w-full sm:w-auto"
              >
                <Link href="/onboarding/mentor">
                  Become a Mentor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="primary"
                asChild
                className="bg-primary-dark hover:bg-primary-dark/90 text-white shadow-xl w-full sm:w-auto"
              >
                <Link href="/onboarding/mentee">
                  Find a Mentor
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

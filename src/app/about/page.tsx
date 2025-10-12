'use client'

import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Target,
  Heart,
  Users,
  Globe,
  Award,
  Lightbulb,
  TrendingUp,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Empowerment',
      description: 'We believe in empowering individuals to reach their full potential through meaningful mentorship connections.',
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Creating a safe, secure environment where mentors and mentees can connect with confidence.',
    },
    {
      icon: Globe,
      title: 'Inclusivity',
      description: 'Building a diverse community that welcomes individuals from all backgrounds, industries, and life stages.',
    },
    {
      icon: Lightbulb,
      title: 'Growth',
      description: 'Fostering continuous learning and development for both mentors and mentees.',
    },
  ]

  const milestones = [
    {
      year: '2020',
      title: 'Founded',
      description: 'Look for Mentors was born from a vision to democratize access to mentorship and guidance.',
    },
    {
      year: '2021',
      title: '1,000 Matches',
      description: 'Reached our first thousand successful mentor-mentee connections across 15 industries.',
    },
    {
      year: '2022',
      title: 'Global Expansion',
      description: 'Expanded to serve individuals seeking mentorship in over 50 countries worldwide.',
    },
    {
      year: '2023',
      title: '10,000 Mentors',
      description: 'Our community grew to include over 10,000 verified mentors ready to guide and support.',
    },
    {
      year: '2024',
      title: '50,000+ Matches',
      description: 'Celebrating over 50,000 successful mentorship connections and countless life transformations.',
    },
  ]

  const team = [
    {
      name: 'Leadership Team',
      description: 'Experienced individuals passionate about mentorship and personal growth.',
      icon: Target,
    },
    {
      name: 'Technology',
      description: 'Building cutting-edge matching algorithms and platform features.',
      icon: TrendingUp,
    },
    {
      name: 'Community',
      description: 'Dedicated to supporting our mentors and mentees every step of the way.',
      icon: Users,
    },
  ]

  const stats = [
    { value: '10,000+', label: 'Active Mentors' },
    { value: '50,000+', label: 'Successful Matches' },
    { value: '25+', label: 'Industries' },
    { value: '50+', label: 'Countries' },
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
                Our Story
              </span>
            </div>
            <h1 className="text-4xl font-black font-montserrat tracking-tight text-white sm:text-5xl lg:text-6xl">
              Connecting Ambition with Experience
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 font-montserrat lg:text-xl">
              We're on a mission to make mentorship accessible to everyone,
              everywhere. Because we believe that guidance from the right person at the
              right time can change the trajectory of your life and career.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary-accent py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-black font-montserrat text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-montserrat text-white/90">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 sm:py-32 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <h2 className="text-3xl font-bold font-montserrat tracking-tight text-primary-dark sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-6 text-lg text-neutral-700 font-montserrat leading-relaxed">
                At Look for Mentors, we believe that everyone deserves access to quality
                mentorship. Our mission is to democratize guidance and support by connecting
                ambitious individuals with experienced mentors who can help them navigate
                their journeys—wherever they are in life.
              </p>
              <p className="mt-4 text-lg text-neutral-700 font-montserrat leading-relaxed">
                We've built a platform that removes the barriers to mentorship—making it
                easy to find, connect with, and learn from people who have walked
                the path you're on. Whether you're exploring new directions, navigating transitions,
                seeking motivation, or looking to grow, we're here to help you find the guidance
                you need.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  'Make mentorship accessible to everyone',
                  'Build meaningful connections and support',
                  'Accelerate personal and professional growth',
                  'Create a supportive global community',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-primary-accent flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-700 font-montserrat">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden bg-primary-accent p-12">
                <div className="text-center">
                  <Target className="mx-auto h-24 w-24 text-white mb-6" />
                  <h3 className="text-2xl font-bold font-montserrat text-white mb-4">
                    Our Vision
                  </h3>
                  <p className="text-lg text-white/90 font-montserrat">
                    A world where everyone has access to the mentorship and guidance they need
                    to achieve their goals, unlock their full potential, and thrive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 sm:py-32 bg-primary-dark">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-montserrat tracking-tight text-white sm:text-4xl">
              Our Values
            </h2>
            <p className="mt-4 text-lg text-white/80 font-montserrat">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Card key={index} className="bg-white/95 border-2 border-white/20 hover:border-primary-accent shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                <CardContent className="p-8 text-center">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-primary-accent
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">
                    {value.title}
                  </h3>
                  <p className="text-neutral-700 font-montserrat">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 sm:py-32 bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-montserrat tracking-tight text-primary-dark sm:text-4xl">
              Our Journey
            </h2>
            <p className="mt-4 text-lg text-neutral-600 font-montserrat">
              Key milestones in our mission to transform mentorship
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-accent hidden lg:block" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? '' : 'lg:grid-flow-dense'
                  }`}
                >
                  {/* Content */}
                  <div className={index % 2 === 0 ? 'lg:text-right' : 'lg:col-start-2'}>
                    <Card className="shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-8">
                        <div className="inline-flex items-center justify-center px-4 py-2 mb-4 bg-secondary-accent/10 rounded-full">
                          <span className="text-lg font-black font-montserrat text-secondary-accent">
                            {milestone.year}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold font-montserrat text-primary-dark mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-neutral-600 font-montserrat">
                          {milestone.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Year marker (desktop) */}
                  <div className="hidden lg:block">
                    <div
                      className={`flex items-center justify-center ${
                        index % 2 === 0 ? '' : 'lg:col-start-1'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full bg-primary-accent border-4 border-white shadow-lg" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold font-montserrat tracking-tight text-primary-dark sm:text-4xl">
              Our Team
            </h2>
            <p className="mt-4 text-lg text-neutral-600 font-montserrat">
              Passionate professionals dedicated to your success
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {team.map((department, index) => (
              <Card key={index} className="border-2 border-neutral-200 hover:border-secondary-accent shadow-lg hover:shadow-xl transition-all text-center">
                <CardContent className="p-8">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-secondary-accent/10">
                    <department.icon className="h-8 w-8 text-secondary-accent" />
                  </div>
                  <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-3">
                    {department.name}
                  </h3>
                  <p className="text-neutral-600 font-montserrat">
                    {department.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-accent py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold font-montserrat tracking-tight text-primary-dark sm:text-4xl">
              Join Our Community
            </h2>
            <p className="mt-6 text-lg leading-8 text-primary-dark/80 font-montserrat">
              Become part of a global community dedicated to personal and professional growth
              through meaningful mentorship connections.
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

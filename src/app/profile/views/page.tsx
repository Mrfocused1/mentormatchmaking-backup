'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowLeft,
  Eye,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  Heart,
  MapPin,
  Filter
} from 'lucide-react'

// Mock profile views data
const mockProfileViews = [
  {
    id: 1,
    userId: '101',
    viewerName: 'Jennifer Williams',
    viewerRole: 'mentee',
    viewerTitle: 'Product Designer',
    viewerCompany: 'Design Co.',
    viewerLocation: 'London, UK',
    viewerAvatar: null,
    viewedAt: '2025-10-10T14:30:00',
    viewCount: 3,
    showedInterest: false,
    sentMessage: false,
  },
  {
    id: 2,
    userId: '102',
    viewerName: 'Thomas Anderson',
    viewerRole: 'mentee',
    viewerTitle: 'Junior Developer',
    viewerCompany: 'Tech Startup',
    viewerLocation: 'Birmingham, UK',
    viewerAvatar: null,
    viewedAt: '2025-10-10T11:15:00',
    viewCount: 1,
    showedInterest: true,
    sentMessage: false,
  },
  {
    id: 3,
    userId: '103',
    viewerName: 'Maria Garcia',
    viewerRole: 'mentor',
    viewerTitle: 'Senior Engineer',
    viewerCompany: 'BigTech Corp',
    viewerLocation: 'Manchester, UK',
    viewerAvatar: null,
    viewedAt: '2025-10-09T16:45:00',
    viewCount: 2,
    showedInterest: false,
    sentMessage: true,
  },
  {
    id: 4,
    userId: '104',
    viewerName: 'Kevin Brown',
    viewerRole: 'mentee',
    viewerTitle: 'Marketing Manager',
    viewerCompany: 'Growth Agency',
    viewerLocation: 'Edinburgh, Scotland',
    viewerAvatar: null,
    viewedAt: '2025-10-09T09:20:00',
    viewCount: 1,
    showedInterest: false,
    sentMessage: false,
  },
  {
    id: 5,
    userId: '105',
    viewerName: 'Sophie Chen',
    viewerRole: 'mentee',
    viewerTitle: 'UX Researcher',
    viewerCompany: 'Innovation Labs',
    viewerLocation: 'Bristol, UK',
    viewerAvatar: null,
    viewedAt: '2025-10-08T13:00:00',
    viewCount: 2,
    showedInterest: true,
    sentMessage: true,
  },
  {
    id: 6,
    userId: '106',
    viewerName: 'Daniel Martinez',
    viewerRole: 'mentor',
    viewerTitle: 'VP of Engineering',
    viewerCompany: 'CloudScale Inc.',
    viewerLocation: 'Leeds, UK',
    viewerAvatar: null,
    viewedAt: '2025-10-08T10:30:00',
    viewCount: 1,
    showedInterest: false,
    sentMessage: false,
  },
  {
    id: 7,
    userId: '107',
    viewerName: 'Rachel Thompson',
    viewerRole: 'mentee',
    viewerTitle: 'Data Scientist',
    viewerCompany: 'AI Solutions',
    viewerLocation: 'Cardiff, Wales',
    viewerAvatar: null,
    viewedAt: '2025-10-07T15:45:00',
    viewCount: 4,
    showedInterest: true,
    sentMessage: false,
  },
  {
    id: 8,
    userId: '108',
    viewerName: 'Andrew Lee',
    viewerRole: 'mentee',
    viewerTitle: 'Software Engineer',
    viewerCompany: 'Tech Solutions',
    viewerLocation: 'Glasgow, Scotland',
    viewerAvatar: null,
    viewedAt: '2025-10-07T08:15:00',
    viewCount: 1,
    showedInterest: false,
    sentMessage: false,
  },
]

// Mock analytics data
const viewsAnalytics = {
  total30Days: 124,
  total7Days: 42,
  totalToday: 8,
  change30Days: 15, // percentage
  change7Days: -5, // percentage
  uniqueViewers: 89,
  returningViewers: 35,
  conversionRate: 24, // percentage who showed interest or messaged
}

// Time period filter
type TimePeriod = 'today' | '7days' | '30days' | 'all'

export default function ProfileViewsPage() {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('30days')
  const [filterRole, setFilterRole] = useState<'all' | 'mentees'>('all')

  // Filter views based on time period
  const getFilteredViews = () => {
    const now = new Date()
    let filteredByTime = mockProfileViews

    if (timePeriod === 'today') {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      filteredByTime = mockProfileViews.filter(v => new Date(v.viewedAt) >= today)
    } else if (timePeriod === '7days') {
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      filteredByTime = mockProfileViews.filter(v => new Date(v.viewedAt) >= sevenDaysAgo)
    } else if (timePeriod === '30days') {
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      filteredByTime = mockProfileViews.filter(v => new Date(v.viewedAt) >= thirtyDaysAgo)
    }

    // For mentor dashboard, only show mentee views (mentors can't view other mentors)
    filteredByTime = filteredByTime.filter(v => v.viewerRole === 'mentee')

    // Filter by engagement
    if (filterRole === 'mentees') {
      return filteredByTime.filter(v => v.showedInterest || v.sentMessage)
    }

    return filteredByTime
  }

  const filteredViews = getFilteredViews()

  // Calculate demographics from filtered views
  const viewersByRole = {
    mentors: filteredViews.filter(v => v.viewerRole === 'mentor').length,
    mentees: filteredViews.filter(v => v.viewerRole === 'mentee').length,
  }

  const viewersWhoEngaged = filteredViews.filter(v => v.showedInterest || v.sentMessage).length

  // Top locations (anonymized)
  const locationCounts = filteredViews.reduce((acc, view) => {
    const location = view.viewerLocation
    acc[location] = (acc[location] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topLocations = Object.entries(locationCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([location, count]) => ({ location, count }))

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Page Header */}
      <section className="bg-primary-dark pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-primary-accent hover:text-primary-accent/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-semibold font-montserrat">Back to Dashboard</span>
            </Link>
          </div>
          <h1 className="text-3xl font-black font-montserrat text-white sm:text-4xl">
            Profile Views
          </h1>
          <p className="mt-2 text-white/80 font-montserrat">
            See who's been checking out your profile
          </p>
        </div>
      </section>

      {/* Analytics Cards */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-md border-primary-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-3 bg-primary-accent/10 rounded-full">
                    <Eye className="h-6 w-6 text-primary-accent" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold ${
                    viewsAnalytics.change30Days >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {viewsAnalytics.change30Days >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {Math.abs(viewsAnalytics.change30Days)}%
                  </div>
                </div>
                <p className="text-3xl font-black font-montserrat text-primary-dark">
                  {viewsAnalytics.total30Days}
                </p>
                <p className="text-sm text-neutral-600 font-montserrat mt-1">
                  Total Views (30 days)
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md border-secondary-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-3 bg-secondary-accent/10 rounded-full">
                    <Users className="h-6 w-6 text-secondary-accent" />
                  </div>
                </div>
                <p className="text-3xl font-black font-montserrat text-primary-dark">
                  {viewsAnalytics.uniqueViewers}
                </p>
                <p className="text-sm text-neutral-600 font-montserrat mt-1">
                  Unique Viewers
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md border-green-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-3 bg-green-100 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <p className="text-3xl font-black font-montserrat text-primary-dark">
                  {viewsAnalytics.returningViewers}
                </p>
                <p className="text-sm text-neutral-600 font-montserrat mt-1">
                  Returning Viewers
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md border-yellow-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Heart className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <p className="text-3xl font-black font-montserrat text-primary-dark">
                  {viewsAnalytics.conversionRate}%
                </p>
                <p className="text-sm text-neutral-600 font-montserrat mt-1">
                  Engagement Rate
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Time Period Filter */}
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-neutral-400 flex-shrink-0" />
              <div className="flex gap-2 overflow-x-auto">
                <Button
                  variant={timePeriod === 'today' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setTimePeriod('today')}
                  className={timePeriod === 'today' ? 'bg-primary-accent text-primary-dark' : ''}
                >
                  Today
                </Button>
                <Button
                  variant={timePeriod === '7days' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setTimePeriod('7days')}
                  className={timePeriod === '7days' ? 'bg-primary-accent text-primary-dark' : ''}
                >
                  7 Days
                </Button>
                <Button
                  variant={timePeriod === '30days' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setTimePeriod('30days')}
                  className={timePeriod === '30days' ? 'bg-primary-accent text-primary-dark' : ''}
                >
                  30 Days
                </Button>
                <Button
                  variant={timePeriod === 'all' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setTimePeriod('all')}
                  className={timePeriod === 'all' ? 'bg-primary-accent text-primary-dark' : ''}
                >
                  All Time
                </Button>
              </div>
            </div>

            {/* Role Filter - Removed for mentor dashboard as only mentees can view mentor profiles */}
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-neutral-400 flex-shrink-0" />
              <div className="flex gap-2">
                <Button
                  variant={filterRole === 'all' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterRole('all')}
                  className={filterRole === 'all' ? 'bg-secondary-accent text-white' : ''}
                >
                  All Mentee Views
                </Button>
                <Button
                  variant={filterRole === 'mentees' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterRole('mentees')}
                  className={filterRole === 'mentees' ? 'bg-secondary-accent text-white' : ''}
                >
                  Engaged Only
                </Button>
              </div>
            </div>
          </div>

          {/* Viewer Demographics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="shadow-md">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-secondary-accent" />
                  Mentee Profile Views
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {filteredViews.length > 0 ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-montserrat text-neutral-600">Total Mentee Views</span>
                        <span className="text-3xl font-bold font-montserrat text-secondary-accent">
                          {viewersByRole.mentees}
                        </span>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-secondary-accent h-3 rounded-full transition-all"
                          style={{ width: '100%' }}
                        ></div>
                      </div>
                      <p className="text-xs font-montserrat text-neutral-500 mt-2">
                        Mentees looking for guidance and mentorship
                      </p>
                    </div>
                    <div className="pt-4 border-t border-neutral-200">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-montserrat text-neutral-600">Engaged Viewers</span>
                        <span className="text-2xl font-bold font-montserrat text-green-600">
                          {viewersWhoEngaged}
                        </span>
                      </div>
                      <p className="text-xs font-montserrat text-neutral-500 mt-1">
                        Viewers who showed interest or sent a message
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-neutral-500 font-montserrat">No data available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-secondary-accent" />
                  Top Viewer Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {topLocations.length > 0 ? (
                  <div className="space-y-3">
                    {topLocations.map(({ location, count }, index) => (
                      <div key={location} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold font-montserrat text-neutral-400">
                            #{index + 1}
                          </span>
                          <span className="text-sm font-montserrat text-neutral-700">
                            {location}
                          </span>
                        </div>
                        <span className="text-sm font-bold font-montserrat text-primary-dark">
                          {count} {count === 1 ? 'view' : 'views'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-neutral-500 font-montserrat">No data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Privacy Notice */}
          <Card className="shadow-md bg-blue-50/50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Eye className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold font-montserrat text-primary-dark mb-1">
                    Privacy Protection
                  </h3>
                  <p className="text-sm font-montserrat text-neutral-700">
                    We protect viewer privacy by showing only aggregated, anonymous analytics. Individual viewer identities are kept private to maintain a comfortable browsing experience for everyone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}

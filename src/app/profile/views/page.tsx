'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import {
  ArrowLeft,
  Eye,
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  Heart,
  MapPin,
  Filter,
  Loader2,
  AlertCircle,
} from 'lucide-react'

interface ViewsAnalytics {
  total30Days: number
  total7Days: number
  totalToday: number
  change30Days: number
  change7Days: number
  uniqueViewers: number
  returningViewers: number
  totalAllTime: number
}

type TimePeriod = 'today' | '7days' | '30days' | 'all'

export default function ProfileViewsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('30days')
  const [analytics, setAnalytics] = useState<ViewsAnalytics>({
    total30Days: 0,
    total7Days: 0,
    totalToday: 0,
    change30Days: 0,
    change7Days: 0,
    uniqueViewers: 0,
    returningViewers: 0,
    totalAllTime: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfileViews = async () => {
      try {
        setLoading(true)

        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        // Calculate date boundaries
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000)

        // Fetch all views for current user
        const { data: allViews, error: viewsError } = await supabase
          .from('ProfileView')
          .select('id, viewerId, viewedAt')
          .eq('viewedId', user.id)

        if (viewsError) throw viewsError

        const views = allViews || []

        // Calculate analytics
        const viewsToday = views.filter(v => new Date(v.viewedAt) >= today)
        const views7Days = views.filter(v => new Date(v.viewedAt) >= sevenDaysAgo)
        const views30Days = views.filter(v => new Date(v.viewedAt) >= thirtyDaysAgo)
        const views30To60Days = views.filter(
          v => new Date(v.viewedAt) >= sixtyDaysAgo && new Date(v.viewedAt) < thirtyDaysAgo
        )

        // Calculate unique viewers
        const uniqueViewerIds = new Set(views30Days.filter(v => v.viewerId).map(v => v.viewerId))

        // Calculate returning viewers (viewers who viewed more than once)
        const viewerCountMap = views30Days
          .filter(v => v.viewerId)
          .reduce((acc, v) => {
            acc[v.viewerId] = (acc[v.viewerId] || 0) + 1
            return acc
          }, {} as Record<string, number>)

        const returningCount = Object.values(viewerCountMap).filter(count => count > 1).length

        // Calculate change percentages
        const change30Days = views30To60Days.length > 0
          ? Math.round(((views30Days.length - views30To60Days.length) / views30To60Days.length) * 100)
          : 0

        const views7To14Days = views.filter(
          v => {
            const viewDate = new Date(v.viewedAt)
            const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
            return viewDate >= fourteenDaysAgo && viewDate < sevenDaysAgo
          }
        )
        const change7Days = views7To14Days.length > 0
          ? Math.round(((views7Days.length - views7To14Days.length) / views7To14Days.length) * 100)
          : 0

        setAnalytics({
          total30Days: views30Days.length,
          total7Days: views7Days.length,
          totalToday: viewsToday.length,
          change30Days,
          change7Days,
          uniqueViewers: uniqueViewerIds.size,
          returningViewers: returningCount,
          totalAllTime: views.length,
        })
      } catch (err) {
        console.error('Error fetching profile views:', err)
        setError(err instanceof Error ? err.message : 'Failed to load profile views')
      } finally {
        setLoading(false)
      }
    }

    fetchProfileViews()
  }, [supabase, router])

  // Get displayed total based on time period
  const getDisplayedTotal = () => {
    switch (timePeriod) {
      case 'today':
        return analytics.totalToday
      case '7days':
        return analytics.total7Days
      case '30days':
        return analytics.total30Days
      case 'all':
        return analytics.totalAllTime
      default:
        return analytics.total30Days
    }
  }

  const engagementRate = analytics.total30Days > 0
    ? Math.round((analytics.returningViewers / analytics.uniqueViewers) * 100)
    : 0

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
            See how many people have viewed your profile
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {loading ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Loader2 className="h-12 w-12 text-vibrant-accent mx-auto mb-4 animate-spin" />
                <h3 className="text-2xl font-black font-montserrat text-primary-dark mb-3">
                  Loading analytics...
                </h3>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black font-montserrat text-primary-dark mb-3">
                  Error loading profile views
                </h3>
                <p className="text-neutral-600 font-montserrat mb-8">{error}</p>
                <Button
                  variant="primary"
                  onClick={() => window.location.reload()}
                  className="bg-vibrant-accent text-white hover:bg-vibrant-accent/90"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Time Period Filter */}
              <div className="flex items-center gap-2 mb-6">
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

              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="shadow-md border-primary-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-3 bg-primary-accent/10 rounded-full">
                        <Eye className="h-6 w-6 text-primary-accent" />
                      </div>
                      {timePeriod === '30days' && (
                        <div
                          className={`flex items-center gap-1 text-sm font-semibold ${
                            analytics.change30Days >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {analytics.change30Days >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {Math.abs(analytics.change30Days)}%
                        </div>
                      )}
                    </div>
                    <p className="text-3xl font-black font-montserrat text-primary-dark">
                      {getDisplayedTotal()}
                    </p>
                    <p className="text-sm text-neutral-600 font-montserrat mt-1">
                      Total Views ({timePeriod === 'all' ? 'All Time' : timePeriod === 'today' ? 'Today' : timePeriod === '7days' ? '7 Days' : '30 Days'})
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
                      {analytics.uniqueViewers}
                    </p>
                    <p className="text-sm text-neutral-600 font-montserrat mt-1">
                      Unique Viewers (30 days)
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
                      {analytics.returningViewers}
                    </p>
                    <p className="text-sm text-neutral-600 font-montserrat mt-1">
                      Returning Viewers (30 days)
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
                      {engagementRate}%
                    </p>
                    <p className="text-sm text-neutral-600 font-montserrat mt-1">
                      Return Rate
                    </p>
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
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

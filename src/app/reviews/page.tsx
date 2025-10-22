'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ReviewCard, Review } from '@/components/reviews/review-card'
import { createClient } from '@/lib/supabase/client'
import {
  Star,
  Filter,
  ArrowLeft,
  TrendingUp,
  Award,
  BarChart3,
  Users,
  Loader2,
  AlertCircle,
} from 'lucide-react'

// Helper function to format timestamp
const formatTimestamp = (createdAt: string): string => {
  const now = new Date()
  const created = new Date(createdAt)
  const diffMs = now.getTime() - created.getTime()
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? 's' : ''} ago`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`
  return created.toLocaleDateString()
}

// Calculate review statistics
const calculateStats = (reviews: Review[]) => {
  const total = reviews.length
  const averageRating =
    reviews.reduce((acc, r) => acc + r.overallRating, 0) / total

  const distribution = {
    5: reviews.filter(r => r.overallRating === 5).length,
    4: reviews.filter(r => r.overallRating === 4).length,
    3: reviews.filter(r => r.overallRating === 3).length,
    2: reviews.filter(r => r.overallRating === 2).length,
    1: reviews.filter(r => r.overallRating === 1).length,
  }

  const verifiedCount = reviews.filter(r => r.isVerified).length

  return {
    total,
    averageRating: averageRating.toFixed(1),
    distribution,
    verifiedCount,
  }
}

export default function ReviewsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterRating, setFilterRating] = useState<number | 'all'>('all')
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent')
  const [showCategoryRatings, setShowCategoryRatings] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true)

        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        // Fetch reviews where current user is the one being reviewed
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('Review')
          .select(`
            id,
            rating,
            comment,
            createdAt,
            User_Review_reviewerIdToUser:reviewerId (
              id,
              name,
              role,
              Profile (
                profilePicture
              )
            )
          `)
          .eq('reviewedId', user.id)
          .order('createdAt', { ascending: false })

        if (reviewsError) throw reviewsError

        // Transform data to match Review interface
        const transformedReviews: Review[] = (reviewsData || []).map(review => {
          const reviewer = review.User_Review_reviewerIdToUser as any
          const profile = Array.isArray(reviewer?.Profile) ? reviewer.Profile[0] : reviewer?.Profile

          return {
            id: review.id,
            reviewerName: reviewer?.name || 'Anonymous',
            reviewerAvatar: profile?.profilePicture || null,
            reviewerRole: reviewer?.role || '',
            isAnonymous: false,
            isVerified: true,
            overallRating: review.rating,
            categoryRatings: {
              expertise: review.rating,
              communication: review.rating,
              helpfulness: review.rating,
              professionalism: review.rating,
            },
            reviewText: review.comment || 'No comment provided',
            sessionType: 'Session',
            timestamp: formatTimestamp(review.createdAt),
            helpfulCount: 0,
            unhelpfulCount: 0,
            userVote: null,
          }
        })

        setReviews(transformedReviews)
      } catch (err) {
        console.error('Error fetching reviews:', err)
        setError(err instanceof Error ? err.message : 'Failed to load reviews')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [supabase, router])

  // Calculate statistics
  const stats = calculateStats(reviews)

  // Filter reviews
  const filteredReviews =
    filterRating === 'all'
      ? reviews
      : reviews.filter(r => r.overallRating === filterRating)

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'helpful') {
      return b.helpfulCount - a.helpfulCount
    }
    if (sortBy === 'rating') {
      return b.overallRating - a.overallRating
    }
    // Default: recent (would use actual dates in production)
    return 0
  })

  // Handle helpful/unhelpful votes
  const handleHelpfulClick = (reviewId: string) => {
    setReviews(prev =>
      prev.map(r => {
        if (r.id === reviewId) {
          if (r.userVote === 'helpful') {
            // Remove vote
            return { ...r, helpfulCount: r.helpfulCount - 1, userVote: null }
          } else if (r.userVote === 'unhelpful') {
            // Switch vote
            return {
              ...r,
              helpfulCount: r.helpfulCount + 1,
              unhelpfulCount: r.unhelpfulCount - 1,
              userVote: 'helpful' as const,
            }
          } else {
            // Add vote
            return { ...r, helpfulCount: r.helpfulCount + 1, userVote: 'helpful' as const }
          }
        }
        return r
      })
    )
  }

  const handleUnhelpfulClick = (reviewId: string) => {
    setReviews(prev =>
      prev.map(r => {
        if (r.id === reviewId) {
          if (r.userVote === 'unhelpful') {
            // Remove vote
            return { ...r, unhelpfulCount: r.unhelpfulCount - 1, userVote: null }
          } else if (r.userVote === 'helpful') {
            // Switch vote
            return {
              ...r,
              helpfulCount: r.helpfulCount - 1,
              unhelpfulCount: r.unhelpfulCount + 1,
              userVote: 'unhelpful' as const,
            }
          } else {
            // Add vote
            return { ...r, unhelpfulCount: r.unhelpfulCount + 1, userVote: 'unhelpful' as const }
          }
        }
        return r
      })
    )
  }

  const handleReportClick = (reviewId: string) => {
    alert('Review reported. Our team will review it shortly.')
  }

  // Render rating distribution bar
  const renderDistributionBar = (rating: number, count: number) => {
    const percentage = (count / stats.total) * 100
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 w-12">
          <span className="text-sm font-semibold font-montserrat text-neutral-700">
            {rating}
          </span>
          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
        </div>
        <div className="flex-1 h-2 bg-neutral-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-500 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm font-semibold font-montserrat text-neutral-600 w-8 text-right">
          {count}
        </span>
      </div>
    )
  }

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
          <h1 className="text-3xl font-black font-montserrat text-white sm:text-4xl mb-2">
            Reviews & Ratings
          </h1>
          <p className="text-white/80 font-montserrat">
            See what mentees are saying about your mentorship
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar - Statistics */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Overall Rating Card */}
                <Card className="shadow-lg">
                  <CardHeader className="bg-primary-dark text-white">
                    <CardTitle className="flex items-center gap-2 font-montserrat">
                      <Star className="h-5 w-5" />
                      Overall Rating
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-5xl font-black font-montserrat text-primary-dark mb-2">
                        {stats.averageRating}
                      </div>
                      <div className="flex justify-center mb-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`h-6 w-6 ${
                              star <= Math.round(parseFloat(stats.averageRating))
                                ? 'fill-yellow-500 text-yellow-500'
                                : 'fill-none text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-neutral-600 font-montserrat">
                        Based on {stats.total} reviews
                      </p>
                    </div>

                    {/* Rating Distribution */}
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(rating =>
                        renderDistributionBar(
                          rating,
                          stats.distribution[rating as keyof typeof stats.distribution]
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-montserrat text-primary-dark">
                      <BarChart3 className="h-5 w-5 text-secondary-accent" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-semibold font-montserrat text-green-800">
                          Verified Reviews
                        </span>
                      </div>
                      <span className="text-lg font-black font-montserrat text-green-600">
                        {stats.verifiedCount}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-semibold font-montserrat text-blue-800">
                          5-Star Reviews
                        </span>
                      </div>
                      <span className="text-lg font-black font-montserrat text-blue-600">
                        {stats.distribution[5]}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-purple-600" />
                        <span className="text-sm font-semibold font-montserrat text-purple-800">
                          Total Reviews
                        </span>
                      </div>
                      <span className="text-lg font-black font-montserrat text-purple-600">
                        {stats.total}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Main Content - Reviews List */}
            <div className="lg:col-span-2">
              {/* Filters and Sort */}
              <Card className="shadow-lg mb-6">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    {/* Filter by Rating */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <Filter className="h-5 w-5 text-neutral-400 flex-shrink-0" />
                      <Button
                        variant={filterRating === 'all' ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setFilterRating('all')}
                        className={filterRating === 'all' ? 'bg-primary-accent text-primary-dark' : ''}
                      >
                        All
                      </Button>
                      {[5, 4, 3, 2, 1].map(rating => (
                        <Button
                          key={rating}
                          variant={filterRating === rating ? 'primary' : 'ghost'}
                          size="sm"
                          onClick={() => setFilterRating(rating)}
                          className={`gap-1 ${filterRating === rating ? 'bg-yellow-500 text-white' : ''}`}
                        >
                          {rating}
                          <Star className="h-3 w-3" />
                        </Button>
                      ))}
                    </div>

                    {/* Sort Options */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-neutral-600 font-montserrat">Sort:</span>
                      <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value as any)}
                        className="text-sm border border-neutral-200 rounded-lg px-3 py-1.5 font-montserrat text-neutral-700 focus:border-primary-accent focus:outline-none"
                      >
                        <option value="recent">Most Recent</option>
                        <option value="helpful">Most Helpful</option>
                        <option value="rating">Highest Rating</option>
                      </select>
                    </div>
                  </div>

                  {/* Toggle Category Ratings */}
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={showCategoryRatings}
                        onChange={e => setShowCategoryRatings(e.target.checked)}
                        className="h-4 w-4 text-primary-accent focus:ring-primary-accent border-neutral-300 rounded"
                      />
                      <span className="text-sm font-semibold font-montserrat text-neutral-700">
                        Show detailed category ratings
                      </span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews List */}
              {loading ? (
                <Card className="shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Loader2 className="h-12 w-12 text-primary-accent mx-auto mb-4 animate-spin" />
                    <h3 className="text-xl font-bold font-montserrat text-neutral-700 mb-2">
                      Loading your reviews...
                    </h3>
                  </CardContent>
                </Card>
              ) : error ? (
                <Card className="shadow-lg">
                  <CardContent className="p-12 text-center">
                    <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold font-montserrat text-neutral-700 mb-2">
                      Error loading reviews
                    </h3>
                    <p className="text-neutral-500 font-montserrat mb-6">{error}</p>
                    <Button
                      variant="primary"
                      onClick={() => window.location.reload()}
                      className="bg-primary-accent text-primary-dark hover:bg-primary-accent/90"
                    >
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
              ) : sortedReviews.length > 0 ? (
                <div className="space-y-4">
                  {sortedReviews.map(review => (
                    <ReviewCard
                      key={review.id}
                      review={review}
                      onHelpfulClick={handleHelpfulClick}
                      onUnhelpfulClick={handleUnhelpfulClick}
                      onReportClick={handleReportClick}
                      showCategoryRatings={showCategoryRatings}
                    />
                  ))}
                </div>
              ) : (
                <Card className="shadow-lg">
                  <CardContent className="p-12 text-center">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="h-8 w-8 text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-bold font-montserrat text-neutral-700 mb-2">
                      No reviews found
                    </h3>
                    <p className="text-neutral-500 font-montserrat">
                      {filterRating === 'all'
                        ? 'You haven\'t received any reviews yet.'
                        : `No ${filterRating}-star reviews found.`}
                    </p>
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

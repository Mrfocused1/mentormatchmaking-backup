'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ReviewCard, Review } from '@/components/reviews/review-card'
import {
  Star,
  Filter,
  ArrowLeft,
  TrendingUp,
  Award,
  BarChart3,
  Users,
} from 'lucide-react'

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: '1',
    reviewerName: 'Emily Rodriguez',
    reviewerAvatar: null,
    reviewerRole: 'Product Manager at StartupCo',
    isAnonymous: false,
    isVerified: true,
    overallRating: 5,
    categoryRatings: {
      expertise: 5,
      communication: 5,
      helpfulness: 4,
      professionalism: 5,
    },
    reviewText:
      'Absolutely incredible mentor! Sarah provided actionable insights that helped me land my dream job. Her expertise in product design is unmatched, and she took the time to review my portfolio in detail. I highly recommend her to anyone looking to advance their career in design.',
    sessionType: 'Career Guidance',
    timestamp: '2 days ago',
    helpfulCount: 12,
    unhelpfulCount: 0,
    userVote: null,
  },
  {
    id: '2',
    reviewerName: 'Anonymous',
    reviewerAvatar: null,
    isAnonymous: true,
    isVerified: true,
    overallRating: 4,
    categoryRatings: {
      expertise: 5,
      communication: 4,
      helpfulness: 4,
      professionalism: 4,
    },
    reviewText:
      'Great session overall. The mentor was knowledgeable and provided useful feedback on my design portfolio. Would have appreciated more time for Q&A, but overall a valuable experience.',
    sessionType: 'Portfolio Review',
    timestamp: '1 week ago',
    helpfulCount: 8,
    unhelpfulCount: 1,
    userVote: null,
  },
  {
    id: '3',
    reviewerName: 'Michael Chen',
    reviewerAvatar: null,
    reviewerRole: 'UX Designer',
    isAnonymous: false,
    isVerified: true,
    overallRating: 5,
    categoryRatings: {
      expertise: 5,
      communication: 5,
      helpfulness: 5,
      professionalism: 5,
    },
    reviewText:
      'Sarah is an exceptional mentor. She helped me navigate a complex career transition and provided invaluable guidance on building my personal brand. Her insights on UX design trends were spot-on, and I feel much more confident in my career path now.',
    sessionType: 'Career Transition',
    timestamp: '2 weeks ago',
    helpfulCount: 15,
    unhelpfulCount: 0,
    userVote: 'helpful',
  },
  {
    id: '4',
    reviewerName: 'David Kim',
    reviewerAvatar: null,
    reviewerRole: 'Junior Designer',
    isAnonymous: false,
    isVerified: true,
    overallRating: 5,
    categoryRatings: {
      expertise: 5,
      communication: 5,
      helpfulness: 5,
      professionalism: 5,
    },
    reviewText:
      'Best mentorship session I\'ve ever had! Sarah\'s feedback on my work was detailed and constructive. She didn\'t just point out issues but also explained the "why" behind design decisions. Will definitely book again!',
    sessionType: 'Design Critique',
    timestamp: '3 weeks ago',
    helpfulCount: 9,
    unhelpfulCount: 0,
    userVote: null,
  },
  {
    id: '5',
    reviewerName: 'Lisa Anderson',
    reviewerAvatar: null,
    reviewerRole: 'Career Changer',
    isAnonymous: false,
    isVerified: true,
    overallRating: 4,
    categoryRatings: {
      expertise: 5,
      communication: 4,
      helpfulness: 4,
      professionalism: 4,
    },
    reviewText:
      'Very helpful session! Sarah provided great advice on breaking into the design industry. Her portfolio tips were especially valuable. Only minor suggestion would be to allocate more time for practical exercises.',
    sessionType: 'Career Guidance',
    timestamp: '1 month ago',
    helpfulCount: 6,
    unhelpfulCount: 0,
    userVote: null,
  },
]

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
  const [reviews, setReviews] = useState(mockReviews)
  const [filterRating, setFilterRating] = useState<number | 'all'>('all')
  const [sortBy, setSortBy] = useState<'recent' | 'helpful' | 'rating'>('recent')
  const [showCategoryRatings, setShowCategoryRatings] = useState(true)

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
              {sortedReviews.length > 0 ? (
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

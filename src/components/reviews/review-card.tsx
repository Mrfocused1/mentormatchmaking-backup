'use client'

import { useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  CheckCircle,
  MoreVertical,
  Flag,
} from 'lucide-react'

export interface Review {
  id: string
  reviewerName: string
  reviewerAvatar: string | null
  reviewerRole?: string
  isAnonymous: boolean
  isVerified: boolean
  overallRating: number
  categoryRatings?: {
    expertise: number
    communication: number
    helpfulness: number
    professionalism: number
  }
  reviewText: string
  sessionType?: string
  timestamp: string
  helpfulCount: number
  unhelpfulCount: number
  userVote?: 'helpful' | 'unhelpful' | null
}

interface ReviewCardProps {
  review: Review
  onHelpfulClick?: (reviewId: string) => void
  onUnhelpfulClick?: (reviewId: string) => void
  onReportClick?: (reviewId: string) => void
  showCategoryRatings?: boolean
  compact?: boolean
}

export function ReviewCard({
  review,
  onHelpfulClick,
  onUnhelpfulClick,
  onReportClick,
  showCategoryRatings = false,
  compact = false,
}: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  // Determine if review text should be truncated
  const shouldTruncate = review.reviewText.length > 300 && !compact
  const displayText =
    shouldTruncate && !isExpanded
      ? review.reviewText.slice(0, 300) + '...'
      : review.reviewText

  // Render star rating (read-only)
  const renderStars = (rating: number, size: 'sm' | 'xs' = 'sm') => {
    const starSize = size === 'sm' ? 'h-4 w-4' : 'h-3 w-3'
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= rating
                ? 'fill-yellow-500 text-yellow-500'
                : 'fill-none text-neutral-300'
            }`}
          />
        ))}
      </div>
    )
  }

  // Calculate average category rating
  const averageCategoryRating = review.categoryRatings
    ? (
        (review.categoryRatings.expertise +
          review.categoryRatings.communication +
          review.categoryRatings.helpfulness +
          review.categoryRatings.professionalism) /
        4
      ).toFixed(1)
    : null

  return (
    <div className={`bg-white rounded-lg border border-neutral-200 ${compact ? 'p-4' : 'p-6'} hover:shadow-md transition-shadow`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          {/* Avatar */}
          <Avatar
            fallback={review.isAnonymous ? 'Anonymous' : review.reviewerName}
            size={compact ? 'sm' : 'md'}
            className="border-2 border-primary-accent flex-shrink-0"
          />

          {/* Reviewer Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h4 className="font-bold font-montserrat text-primary-dark">
                {review.isAnonymous ? 'Anonymous User' : review.reviewerName}
              </h4>
              {review.isVerified && (
                <Badge
                  variant="success"
                  size="sm"
                  className="bg-green-100 text-green-700 border-green-300"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Verified Session
                </Badge>
              )}
            </div>
            {!review.isAnonymous && review.reviewerRole && (
              <p className="text-sm text-neutral-600 font-montserrat mb-2">
                {review.reviewerRole}
              </p>
            )}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Overall Rating */}
              <div className="flex items-center gap-2">
                {renderStars(review.overallRating)}
                <span className="text-sm font-bold font-montserrat text-primary-dark">
                  {review.overallRating}.0
                </span>
              </div>
              {/* Timestamp */}
              <span className="text-xs text-neutral-400 font-montserrat">
                {review.timestamp}
              </span>
              {/* Session Type */}
              {review.sessionType && (
                <Badge variant="outline" size="sm" className="text-neutral-600">
                  {review.sessionType}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Menu Button */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMenu(!showMenu)}
            className="text-neutral-400 hover:text-neutral-600"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
          {showMenu && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              {/* Menu */}
              <div className="absolute right-0 top-8 z-20 bg-white border border-neutral-200 rounded-lg shadow-lg py-1 w-40">
                <button
                  onClick={() => {
                    onReportClick?.(review.id)
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-2 text-left text-sm font-montserrat text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                >
                  <Flag className="h-4 w-4" />
                  Report
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Category Ratings (if enabled) */}
      {showCategoryRatings && review.categoryRatings && (
        <div className="mb-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm font-bold font-montserrat text-primary-dark">
              Detailed Ratings
            </h5>
            <span className="text-sm font-bold font-montserrat text-primary-dark">
              Avg: {averageCategoryRating}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-neutral-600 font-montserrat mb-1">Expertise</p>
              <div className="flex items-center gap-2">
                {renderStars(review.categoryRatings.expertise, 'xs')}
                <span className="text-xs font-semibold font-montserrat text-neutral-700">
                  {review.categoryRatings.expertise}.0
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-600 font-montserrat mb-1">Communication</p>
              <div className="flex items-center gap-2">
                {renderStars(review.categoryRatings.communication, 'xs')}
                <span className="text-xs font-semibold font-montserrat text-neutral-700">
                  {review.categoryRatings.communication}.0
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-600 font-montserrat mb-1">Helpfulness</p>
              <div className="flex items-center gap-2">
                {renderStars(review.categoryRatings.helpfulness, 'xs')}
                <span className="text-xs font-semibold font-montserrat text-neutral-700">
                  {review.categoryRatings.helpfulness}.0
                </span>
              </div>
            </div>
            <div>
              <p className="text-xs text-neutral-600 font-montserrat mb-1">Professionalism</p>
              <div className="flex items-center gap-2">
                {renderStars(review.categoryRatings.professionalism, 'xs')}
                <span className="text-xs font-semibold font-montserrat text-neutral-700">
                  {review.categoryRatings.professionalism}.0
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Review Text */}
      <div className="mb-4">
        <p className="text-neutral-700 font-montserrat text-sm leading-relaxed whitespace-pre-line">
          {displayText}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-semibold text-primary-accent hover:text-primary-accent/80 font-montserrat mt-2"
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>

      {/* Footer - Helpful/Unhelpful */}
      <div className="flex items-center gap-4 pt-4 border-t border-neutral-100">
        <span className="text-xs text-neutral-500 font-montserrat">Was this helpful?</span>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onHelpfulClick?.(review.id)}
            className={`gap-2 ${
              review.userVote === 'helpful'
                ? 'text-green-600 bg-green-50'
                : 'text-neutral-600 hover:text-green-600 hover:bg-green-50'
            }`}
          >
            <ThumbsUp className="h-4 w-4" />
            <span className="text-xs font-semibold font-montserrat">
              {review.helpfulCount > 0 ? review.helpfulCount : ''}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onUnhelpfulClick?.(review.id)}
            className={`gap-2 ${
              review.userVote === 'unhelpful'
                ? 'text-red-600 bg-red-50'
                : 'text-neutral-600 hover:text-red-600 hover:bg-red-50'
            }`}
          >
            <ThumbsDown className="h-4 w-4" />
            <span className="text-xs font-semibold font-montserrat">
              {review.unhelpfulCount > 0 ? review.unhelpfulCount : ''}
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}

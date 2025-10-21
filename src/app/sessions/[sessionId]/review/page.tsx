'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import {
  Star,
  Send,
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

// Mock session data
const mockSession = {
  id: '1',
  mentorName: 'Sarah Thompson',
  mentorAvatar: null,
  mentorRole: 'Senior Product Designer',
  mentorCompany: 'TechCorp',
  sessionType: 'Career Guidance',
  date: '2025-10-10',
  time: '2:00 PM - 3:00 PM',
  duration: '60 minutes',
  format: 'Video Call',
}

interface CategoryRating {
  name: string
  label: string
  description: string
  rating: number
}

export default function SessionReviewPage() {
  const router = useRouter()
  const params = useParams()
  const sessionId = params.sessionId as string

  // Review state
  const [overallRating, setOverallRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Category ratings
  const [categoryRatings, setCategoryRatings] = useState<CategoryRating[]>([
    {
      name: 'expertise',
      label: 'Expertise',
      description: 'Knowledge and experience in their field',
      rating: 0,
    },
    {
      name: 'communication',
      label: 'Communication',
      description: 'Clarity and effectiveness of communication',
      rating: 0,
    },
    {
      name: 'helpfulness',
      label: 'Helpfulness',
      description: 'Willingness to help and provide guidance',
      rating: 0,
    },
    {
      name: 'professionalism',
      label: 'Professionalism',
      description: 'Professional conduct and punctuality',
      rating: 0,
    },
  ])

  // Update category rating
  const updateCategoryRating = (name: string, rating: number) => {
    setCategoryRatings(prev =>
      prev.map(cat => (cat.name === name ? { ...cat, rating } : cat))
    )
  }

  // Calculate if form is valid
  const isFormValid =
    overallRating > 0 &&
    reviewText.trim().length >= 50 &&
    categoryRatings.every(cat => cat.rating > 0)

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isFormValid) {
      alert('Please complete all ratings and write at least 50 characters in your review.')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setShowSuccess(true)

    // Redirect after 3 seconds
    setTimeout(() => {
      router.push('/dashboard')
    }, 3000)
  }

  // Render star rating
  const renderStarRating = (
    currentRating: number,
    onRate: (rating: number) => void,
    size: 'sm' | 'lg' = 'lg',
    hovered?: number,
    onHover?: (rating: number) => void,
    onLeave?: () => void
  ) => {
    const starSize = size === 'lg' ? 'h-10 w-10' : 'h-5 w-5'
    const displayRating = hovered !== undefined && hovered > 0 ? hovered : currentRating

    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover?.(star)}
            onMouseLeave={() => onLeave?.()}
            className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-accent rounded"
          >
            <Star
              className={`${starSize} transition-colors ${
                star <= displayRating
                  ? 'fill-yellow-500 text-yellow-500'
                  : 'fill-none text-neutral-300'
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  // Success state
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-6">
        <Card className="max-w-md w-full shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-black font-montserrat text-primary-dark mb-3">
              Review Submitted!
            </h2>
            <p className="text-neutral-600 font-montserrat mb-6">
              Thank you for your feedback. Your review helps improve the mentorship experience
              for everyone.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => router.push('/dashboard')}
                variant="primary"
                className="bg-primary-accent text-primary-dark"
              >
                Back to Dashboard
              </Button>
              <Button
                onClick={() => router.push('/browse-mentors')}
                variant="outline"
              >
                Browse More Mentors
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Page Header */}
      <section className="bg-primary-dark pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
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
            Review Your Session
          </h1>
          <p className="text-white/80 font-montserrat">
            Share your experience to help others make informed decisions
          </p>
        </div>
      </section>

      {/* Review Form */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Session Details Card */}
          <Card className="shadow-lg mb-8">
            <CardHeader className="bg-primary-dark text-white">
              <CardTitle className="font-montserrat">Session Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar
                  fallback={mockSession.mentorName}
                  size="lg"
                  className="border-2 border-primary-accent"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-1">
                    {mockSession.mentorName}
                  </h3>
                  <p className="text-neutral-600 font-montserrat mb-3">
                    {mockSession.mentorRole} at {mockSession.mentorCompany}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Calendar className="h-4 w-4 text-secondary-accent" />
                      <span className="font-montserrat">{mockSession.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Clock className="h-4 w-4 text-secondary-accent" />
                      <span className="font-montserrat">{mockSession.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Video className="h-4 w-4 text-secondary-accent" />
                      <span className="font-montserrat">{mockSession.sessionType}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-600">
                      <Clock className="h-4 w-4 text-secondary-accent" />
                      <span className="font-montserrat">{mockSession.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Review Form Card */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit}>
                {/* Overall Rating */}
                <div className="mb-8">
                  <label className="block text-lg font-bold font-montserrat text-primary-dark mb-2">
                    Overall Rating <span className="text-red-600">*</span>
                  </label>
                  <p className="text-sm text-neutral-600 font-montserrat mb-4">
                    How would you rate this mentorship session overall?
                  </p>
                  <div className="flex items-center gap-4">
                    {renderStarRating(
                      overallRating,
                      setOverallRating,
                      'lg',
                      hoveredStar,
                      setHoveredStar,
                      () => setHoveredStar(0)
                    )}
                    {overallRating > 0 && (
                      <span className="text-2xl font-bold font-montserrat text-primary-dark">
                        {overallRating}.0
                      </span>
                    )}
                  </div>
                  {overallRating > 0 && (
                    <p className="mt-2 text-sm font-semibold font-montserrat text-neutral-600">
                      {overallRating === 5 && '⭐ Excellent'}
                      {overallRating === 4 && '👍 Very Good'}
                      {overallRating === 3 && '😊 Good'}
                      {overallRating === 2 && '😐 Fair'}
                      {overallRating === 1 && '👎 Poor'}
                    </p>
                  )}
                </div>

                {/* Category Ratings */}
                <div className="mb-8">
                  <label className="block text-lg font-bold font-montserrat text-primary-dark mb-4">
                    Detailed Ratings <span className="text-red-600">*</span>
                  </label>
                  <div className="space-y-6">
                    {categoryRatings.map(category => (
                      <div
                        key={category.name}
                        className="p-4 bg-neutral-50 rounded-lg border border-neutral-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-bold font-montserrat text-primary-dark mb-1">
                              {category.label}
                            </h4>
                            <p className="text-sm text-neutral-600 font-montserrat">
                              {category.description}
                            </p>
                          </div>
                          {category.rating > 0 && (
                            <span className="text-lg font-bold font-montserrat text-primary-dark ml-4">
                              {category.rating}.0
                            </span>
                          )}
                        </div>
                        {renderStarRating(
                          category.rating,
                          rating => updateCategoryRating(category.name, rating),
                          'sm'
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Written Review */}
                <div className="mb-8">
                  <label className="block text-lg font-bold font-montserrat text-primary-dark mb-2">
                    Written Review <span className="text-red-600">*</span>
                  </label>
                  <p className="text-sm text-neutral-600 font-montserrat mb-4">
                    Share your experience with others (minimum 50 characters)
                  </p>
                  <textarea
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-accent focus:outline-none font-montserrat text-neutral-800 resize-none"
                    placeholder="What did you appreciate most about this session? What did you learn? How did the mentor help you achieve your goals?"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-neutral-500 font-montserrat">
                      {reviewText.length} / 50 characters minimum
                    </p>
                    {reviewText.length > 0 && reviewText.length < 50 && (
                      <p className="text-xs text-red-600 font-montserrat flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {50 - reviewText.length} more characters needed
                      </p>
                    )}
                  </div>
                </div>

                {/* Anonymous Option */}
                <div className="mb-8">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={e => setIsAnonymous(e.target.checked)}
                      className="mt-1 h-4 w-4 text-primary-accent focus:ring-primary-accent border-neutral-300 rounded"
                    />
                    <div>
                      <span className="font-semibold font-montserrat text-primary-dark">
                        Submit anonymously
                      </span>
                      <p className="text-sm text-neutral-600 font-montserrat mt-1">
                        Your name and profile picture will not be shown with this review
                      </p>
                    </div>
                  </label>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className="flex-1 bg-primary-accent text-primary-dark hover:bg-primary-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-dark mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Submit Review
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                    className="sm:w-auto"
                  >
                    Cancel
                  </Button>
                </div>

                {!isFormValid && overallRating > 0 && (
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-montserrat text-yellow-800 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>
                        Please complete all required fields:
                        {categoryRatings.some(cat => cat.rating === 0) &&
                          ' rate all categories,'}
                        {reviewText.length < 50 && ' write at least 50 characters.'}
                      </span>
                    </p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-montserrat text-blue-800">
              💡 <strong>Tip:</strong> Honest and detailed reviews help other mentees make informed
              decisions and help mentors improve their services. Your feedback is valuable to the
              entire community.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

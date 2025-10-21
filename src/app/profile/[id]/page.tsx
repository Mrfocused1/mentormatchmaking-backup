'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ReviewModal } from '@/components/reviews/review-modal'
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Star,
  MessageCircle,
  Heart,
  Clock,
  Loader2,
  AlertCircle,
  Award,
  Users,
  Target,
  Linkedin,
  Twitter,
  Instagram
} from 'lucide-react'

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [profileData, setProfileData] = useState<any>(null)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/profile/${params.id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch profile')
      }

      setProfileData(data.profile)
    } catch (err) {
      console.error('Error fetching profile:', err)
      setError(err instanceof Error ? err.message : 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (params.id) {
      fetchProfile()
    }
  }, [params.id])

  // Track profile view
  useEffect(() => {
    if (params.id && !loading && profileData) {
      const trackView = async () => {
        try {
          await fetch('/api/profile/views', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              viewedId: params.id,
            }),
          })
        } catch (error) {
          console.error('Error tracking profile view:', error)
        }
      }

      trackView()
    }
  }, [params.id, loading, profileData])

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary-accent mx-auto mb-4" />
            <p className="text-white font-montserrat">Loading profile...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-primary-dark">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-white font-montserrat mb-4">{error || 'Profile not found'}</p>
            <Button onClick={() => router.back()} className="bg-primary-accent text-primary-dark">
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const { name, role, profile, stats, reviews } = profileData

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-6 text-neutral-600 hover:text-primary-dark"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={profile.profilePicture}
                      alt={name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary-accent"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-primary-accent text-primary-dark rounded-full px-3 py-1 text-sm font-bold font-montserrat">
                      {role}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold font-montserrat text-primary-dark mb-2">
                        {name}
                      </h1>
                      {profile.workExperience && (
                        <p className="text-lg text-neutral-700 font-montserrat flex items-center gap-2">
                          <Briefcase className="h-5 w-5" />
                          {profile.workExperience}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button className="bg-primary-accent text-primary-dark hover:bg-primary-accent/90">
                        <MessageCircle className="h-5 w-5 mr-2" />
                        Message
                      </Button>
                      <Button
                        variant="outline"
                        className="border-secondary-accent text-secondary-accent hover:bg-secondary-accent/10"
                        onClick={() => setIsReviewModalOpen(true)}
                      >
                        <Star className="h-5 w-5 mr-2" />
                        Leave Review
                      </Button>
                      <Button variant="outline" className="border-primary-accent text-primary-dark">
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 mb-4">
                    {stats.rating > 0 && (
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold font-montserrat text-primary-dark">
                          {stats.rating.toFixed(1)}
                        </span>
                        <span className="text-neutral-600 font-montserrat">
                          ({stats.reviewCount} reviews)
                        </span>
                      </div>
                    )}
                    {profile.city && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-neutral-500" />
                        <span className="font-montserrat text-neutral-700">{profile.city}</span>
                      </div>
                    )}
                  </div>

                  {(profile.linkedIn || profile.twitter || profile.instagram) && (
                    <div className="flex gap-3">
                      {profile.linkedIn && (
                        <a
                          href={profile.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-600 hover:text-primary-accent transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {profile.twitter && (
                        <a
                          href={profile.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-600 hover:text-primary-accent transition-colors"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {profile.instagram && (
                        <a
                          href={profile.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-600 hover:text-primary-accent transition-colors"
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {profile.bio && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold font-montserrat text-primary-dark mb-4">
                      About
                    </h2>
                    <p className="text-neutral-700 font-montserrat leading-relaxed">
                      {profile.bio}
                    </p>
                  </CardContent>
                </Card>
              )}

              {profile.interests && profile.interests.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold font-montserrat text-primary-dark mb-4">
                      {role === 'MENTOR' ? 'Expertise' : 'Interests'}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {profile.interests.map((interest: any) => (
                        <Badge
                          key={interest.id}
                          variant="outline"
                          className="border-primary-accent text-primary-dark"
                        >
                          {interest.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Reviews Section */}
              {reviews && reviews.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold font-montserrat text-primary-dark mb-4">
                      Reviews ({reviews.length})
                    </h2>
                    <div className="space-y-4">
                      {reviews.map((review: any) => (
                        <div key={review.id} className="border-b border-neutral-200 last:border-0 pb-4 last:pb-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div>
                                <p className="font-semibold font-montserrat text-primary-dark">
                                  {review.reviewer.name}
                                </p>
                                <div className="flex items-center gap-1 mt-1">
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
                            </div>
                            <span className="text-sm text-neutral-500 font-montserrat">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          {review.comment && (
                            <p className="text-neutral-700 font-montserrat text-sm mt-2">
                              {review.comment}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              {(profile.availableHours || profile.timezone) && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Availability
                    </h3>
                    <div className="space-y-3">
                      {profile.availableHours && (
                        <div>
                          <p className="text-sm text-neutral-600 font-montserrat">Hours per month</p>
                          <p className="font-semibold font-montserrat text-primary-dark">
                            {profile.availableHours} hours
                          </p>
                        </div>
                      )}
                      {profile.timezone && (
                        <div>
                          <p className="text-sm text-neutral-600 font-montserrat">Timezone</p>
                          <p className="font-semibold font-montserrat text-primary-dark">
                            {profile.timezone}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {profile.industries && profile.industries.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-4">
                      Industries
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.industries.map((industry: any) => (
                        <Badge
                          key={industry.id}
                          className="bg-primary-accent/10 text-primary-dark border-primary-accent/20"
                        >
                          {industry.name}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        reviewedId={params.id as string}
        reviewedName={name}
        onSuccess={fetchProfile}
      />

      <Footer />
    </div>
  )
}

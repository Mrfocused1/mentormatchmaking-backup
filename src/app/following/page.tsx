'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { FollowButton } from '@/components/ui/follow-button'
import { createClient } from '@/lib/supabase/client'
import {
  Users,
  Star,
  MapPin,
  Briefcase,
  MessageCircle,
  Calendar,
  Eye,
  TrendingUp,
  Search,
  Filter,
  SlidersHorizontal,
  UserPlus,
  ArrowLeft,
  Loader2,
  AlertCircle,
} from 'lucide-react'

interface FollowedMentor {
  id: string
  name: string
  title: string
  company: string
  location: string
  avatar: string | null
  rating: number
  reviewCount: number
  expertise: string[]
  followers: number
  isFollowing: boolean
  lastActive: string
  bio: string
}

export default function FollowingPage() {
  const router = useRouter()
  const supabase = createClient()
  const [mentors, setMentors] = useState<FollowedMentor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent') // recent, name, rating

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        setLoading(true)

        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        // Fetch users that current user is following
        const { data: followData, error: followError } = await supabase
          .from('Follow')
          .select(`
            id,
            followedAt,
            User_Follow_followingIdToUser:followingId (
              id,
              name,
              role,
              Profile (
                profilePicture,
                workExperience,
                city,
                bio
              )
            )
          `)
          .eq('followerId', user.id)
          .order('followedAt', { ascending: false })

        if (followError) throw followError

        // Get review stats and follow counts for each followed user
        const followedUserIds = (followData || []).map((f: any) => f.User_Follow_followingIdToUser?.id).filter(Boolean)

        const [reviewsData, followersData] = await Promise.all([
          supabase
            .from('Review')
            .select('reviewedId, rating')
            .in('reviewedId', followedUserIds),
          supabase
            .from('Follow')
            .select('followingId')
            .in('followingId', followedUserIds)
        ])

        // Calculate stats
        const reviewStats = (reviewsData.data || []).reduce((acc: any, r: any) => {
          if (!acc[r.reviewedId]) acc[r.reviewedId] = { total: 0, sum: 0, count: 0 }
          acc[r.reviewedId].sum += r.rating
          acc[r.reviewedId].count += 1
          acc[r.reviewedId].total = acc[r.reviewedId].sum / acc[r.reviewedId].count
          return acc
        }, {})

        const followerCounts = (followersData.data || []).reduce((acc: any, f: any) => {
          acc[f.followingId] = (acc[f.followingId] || 0) + 1
          return acc
        }, {})

        // Transform to FollowedMentor format
        const transformedMentors: FollowedMentor[] = (followData || []).map((follow: any) => {
          const user = follow.User_Follow_followingIdToUser
          const profile = Array.isArray(user?.Profile) ? user.Profile[0] : user?.Profile
          const stats = reviewStats[user?.id] || { total: 0, count: 0 }

          return {
            id: user?.id || '',
            name: user?.name || 'Unknown',
            title: profile?.workExperience || 'User',
            company: '',
            location: profile?.city || 'Location not set',
            avatar: profile?.profilePicture || null,
            rating: Number(stats.total.toFixed(1)) || 0,
            reviewCount: stats.count || 0,
            expertise: [],
            followers: followerCounts[user?.id] || 0,
            isFollowing: true,
            lastActive: 'Recently',
            bio: profile?.bio || 'No bio available',
          }
        })

        setMentors(transformedMentors)
      } catch (err) {
        console.error('Error fetching following:', err)
        setError(err instanceof Error ? err.message : 'Failed to load following')
      } finally {
        setLoading(false)
      }
    }

    fetchFollowing()
  }, [supabase, router])

  // Filter and sort mentors
  const filteredMentors = mentors
    .filter(mentor =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'rating') return b.rating - a.rating
      return 0 // recent - default order
    })

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Page Header */}
      <section className="bg-primary-dark pt-24 pb-12 sm:pt-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-primary-accent hover:text-primary-accent/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-semibold font-montserrat">Back to Dashboard</span>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black font-montserrat text-white mb-3">
                Following
              </h1>
              <p className="text-lg text-white/80 font-montserrat">
                Mentors you're following • {mentors.length} total
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              className="bg-vibrant-accent text-white hover:bg-vibrant-accent/90 shadow-lg"
              asChild
            >
              <Link href="/browse-mentors">
                <UserPlus className="mr-2 h-5 w-5" />
                Find More Mentors
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search followed mentors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-neutral-200 rounded-lg font-montserrat text-sm focus:outline-none focus:border-primary-accent"
              />
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-neutral-600 font-montserrat">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border-2 border-neutral-200 rounded-lg font-montserrat text-sm focus:outline-none focus:border-primary-accent"
              >
                <option value="recent">Recently Followed</option>
                <option value="name">Name (A-Z)</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {loading ? (
            <Card className="shadow-lg border-2 border-neutral-200">
              <CardContent className="p-12 text-center">
                <Loader2 className="h-12 w-12 text-vibrant-accent mx-auto mb-4 animate-spin" />
                <h3 className="text-2xl font-black font-montserrat text-primary-dark mb-3">
                  Loading followed mentors...
                </h3>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="shadow-lg border-2 border-neutral-200">
              <CardContent className="p-12 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-black font-montserrat text-primary-dark mb-3">
                  Error loading following
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
          ) : filteredMentors.length === 0 ? (
            <Card className="shadow-lg border-2 border-neutral-200">
              <CardContent className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-vibrant-accent/10 mb-6">
                    <Users className="h-10 w-10 text-vibrant-accent" />
                  </div>
                  <h3 className="text-2xl font-black font-montserrat text-primary-dark mb-3">
                    {searchQuery ? 'No mentors found' : 'No mentors followed yet'}
                  </h3>
                  <p className="text-neutral-600 font-montserrat mb-8 text-base">
                    {searchQuery
                      ? 'Try adjusting your search query to find the mentors you\'re looking for.'
                      : 'Start following mentors to build your network and stay updated with their availability.'}
                  </p>
                  {!searchQuery && (
                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-vibrant-accent text-white hover:bg-vibrant-accent/90 shadow-lg"
                      asChild
                    >
                      <Link href="/browse-mentors">
                        <UserPlus className="mr-2 h-5 w-5" />
                        Browse Mentors
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredMentors.map((mentor) => (
                <Card key={mentor.id} className="shadow-lg hover:shadow-xl transition-all border-neutral-200 hover:border-primary-accent">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Avatar */}
                      <div className="flex-shrink-0 mx-auto sm:mx-0">
                        <Avatar
                          src={mentor.avatar}
                          fallback={mentor.name}
                          size="xl"
                          className="shadow-md"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold font-montserrat text-primary-dark">
                              {mentor.name}
                            </h3>
                            <p className="text-sm font-semibold font-montserrat text-neutral-700 mt-1">
                              {mentor.title}
                            </p>
                            <p className="text-sm font-montserrat text-neutral-600">
                              @ {mentor.company}
                            </p>
                          </div>

                          {/* Rating */}
                          <div className="flex items-center gap-2">
                            <Star className="h-5 w-5 fill-warning text-warning" />
                            <span className="text-lg font-bold font-montserrat text-primary-dark">
                              {mentor.rating}
                            </span>
                            <span className="text-sm text-neutral-600 font-montserrat">
                              ({mentor.reviewCount})
                            </span>
                          </div>
                        </div>

                        {/* Info Tags */}
                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-neutral-600 font-montserrat">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-vibrant-accent" />
                            <span>{mentor.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="h-4 w-4 text-secondary-accent" />
                            <span>{mentor.followers} followers</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <TrendingUp className="h-4 w-4 text-success" />
                            <span className="text-success font-semibold">Active {mentor.lastActive}</span>
                          </div>
                        </div>

                        {/* Bio */}
                        <p className="text-sm text-neutral-700 font-montserrat mb-4 leading-relaxed">
                          {mentor.bio}
                        </p>

                        {/* Expertise Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {mentor.expertise.map((skill, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-vibrant-accent/10 text-vibrant-accent border-vibrant-accent/20"
                              size="sm"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3">
                          <Button
                            variant="primary"
                            size="md"
                            onClick={() => router.push(`/sessions/book/${mentor.id}`)}
                            className="bg-vibrant-accent text-white hover:bg-vibrant-accent/90"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Book Session
                          </Button>
                          <Button
                            variant="outline"
                            size="md"
                            onClick={() => router.push('/messages')}
                          >
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Message
                          </Button>
                          <FollowButton
                            mentorId={mentor.id}
                            initialIsFollowing={mentor.isFollowing}
                            initialFollowerCount={mentor.followers}
                            size="md"
                            onWhiteBackground={true}
                          />
                          <Button
                            variant="ghost"
                            size="md"
                            onClick={() => router.push(`/mentors/${mentor.id}`)}
                            className="text-neutral-600 hover:text-primary-dark hover:bg-neutral-100"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

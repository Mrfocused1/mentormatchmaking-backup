'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Search,
  MessageCircle,
  Calendar,
  Star,
  MapPin,
  Briefcase,
  Filter,
  Heart,
  UserPlus,
  Clock,
  TrendingUp,
  Users,
  Loader2,
  AlertCircle,
  Sparkles
} from 'lucide-react'

// Using real Supabase data - no mock data needed

type FilterType = 'all' | 'mentors' | 'mentees' | 'active' | 'inactive'

export default function MatchesPage() {
  const router = useRouter()
  const supabase = createClient()
  const [matches, setMatches] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [unreadMessagesBySender, setUnreadMessagesBySender] = useState<Record<string, number>>({})

  // Fetch matches from Supabase
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true)

        // Get current user
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          router.push('/login')
          return
        }

        setCurrentUserId(user.id)

        // Fetch matches where current user is either user1 or user2, and status is ACTIVE
        const { data: matchesData, error: matchesError } = await supabase
          .from('Match')
          .select('*')
          .or(`user1Id.eq.${user.id},user2Id.eq.${user.id}`)
          .eq('status', 'ACTIVE')
          .order('matchedAt', { ascending: false })

        if (matchesError) {
          console.error('Error fetching matches:', matchesError)
          throw new Error('Failed to fetch matches')
        }

        if (!matchesData || matchesData.length === 0) {
          setMatches([])
          return
        }

        // Get the IDs of all matched users (excluding current user)
        const matchedUserIds = matchesData.map(match =>
          match.user1Id === user.id ? match.user2Id : match.user1Id
        )

        // Fetch user data for all matched users
        const { data: usersData, error: usersError } = await supabase
          .from('User')
          .select(`
            id,
            name,
            role,
            Profile (
              workExperience,
              city,
              profilePicture,
              bio
            )
          `)
          .in('id', matchedUserIds)

        if (usersError) {
          console.error('Error fetching user data:', usersError)
          throw new Error('Failed to fetch user data')
        }

        // Fetch unread messages for each conversation
        const { data: unreadMessages } = await supabase
          .from('Message')
          .select('senderId')
          .eq('receiverId', user.id)
          .eq('read', false)

        // Group unread messages by sender
        const unreadBySender: Record<string, number> = {}
        if (unreadMessages) {
          unreadMessages.forEach((msg) => {
            unreadBySender[msg.senderId] = (unreadBySender[msg.senderId] || 0) + 1
          })
        }
        setUnreadMessagesBySender(unreadBySender)

        // Combine match data with user data
        const enrichedMatches = matchesData.map(match => {
          const matchedUserId = match.user1Id === user.id ? match.user2Id : match.user1Id
          const matchedUser = usersData?.find(u => u.id === matchedUserId)
          const profile = Array.isArray(matchedUser?.Profile) ? matchedUser?.Profile[0] : matchedUser?.Profile

          return {
            id: match.id,
            userId: matchedUserId,
            name: matchedUser?.name || 'Unknown User',
            role: matchedUser?.role?.toLowerCase() || 'mentee',
            title: profile?.workExperience || 'User',
            company: '', // Not available in current schema
            location: profile?.city || 'Location not set',
            avatar: profile?.profilePicture || null,
            matchedDate: match.matchedAt,
            rating: 0, // Will need to calculate from reviews if needed
            sessionsCompleted: 0, // Will need to fetch from sessions if needed
            expertise: [], // Not available in current schema
            status: match.status,
            lastMessage: '', // Will need to fetch from messages if needed
            lastMessageTime: '', // Will need to fetch from messages if needed
            unreadMessages: unreadBySender[matchedUserId] || 0,
          }
        })

        setMatches(enrichedMatches)
      } catch (err) {
        console.error('Error in fetchMatches:', err)
        setError(err instanceof Error ? err.message : 'Failed to load matches')
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [supabase, router])

  // Filter matches
  const filteredMatches = matches.filter((match) => {
    // Search filter
    const matchesSearch = searchQuery === '' ||
      match.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.title?.toLowerCase().includes(searchQuery.toLowerCase())

    // Role filter
    let matchesFilter = true
    if (activeFilter === 'mentors') matchesFilter = match.role === 'MENTOR'
    if (activeFilter === 'mentees') matchesFilter = match.role === 'MENTEE'

    return matchesSearch && matchesFilter
  })

  // Calculate stats
  const totalMatches = matches.length
  const activeMentors = matches.filter(m => m.role === 'MENTOR').length
  const activeMentees = matches.filter(m => m.role === 'MENTEE').length
  const totalUnread = matches.reduce((sum, match) => sum + (match.unreadMessages || 0), 0)

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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black font-montserrat text-white sm:text-4xl">
                My Matches
              </h1>
              <p className="mt-2 text-white/80 font-montserrat">
                Connect with your mentors and mentees
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-neutral-200 py-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="h-5 w-5 text-primary-accent" />
                <p className="text-2xl font-black font-montserrat text-primary-dark">
                  {totalMatches}
                </p>
              </div>
              <p className="text-sm font-montserrat text-neutral-600">Total Matches</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Star className="h-5 w-5 text-primary-accent" />
                <p className="text-2xl font-black font-montserrat text-primary-dark">
                  {activeMentors}
                </p>
              </div>
              <p className="text-sm font-montserrat text-neutral-600">Active Mentors</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <TrendingUp className="h-5 w-5 text-secondary-accent" />
                <p className="text-2xl font-black font-montserrat text-primary-dark">
                  {activeMentees}
                </p>
              </div>
              <p className="text-sm font-montserrat text-neutral-600">Active Mentees</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <MessageCircle className="h-5 w-5 text-green-600" />
                <p className="text-2xl font-black font-montserrat text-primary-dark">
                  {totalUnread}
                </p>
              </div>
              <p className="text-sm font-montserrat text-neutral-600">Unread Messages</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search matches by name, title, or company..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-neutral-300 font-montserrat text-primary-dark placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter className="h-5 w-5 text-neutral-400 flex-shrink-0" />
              <Button
                variant={activeFilter === 'all' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter('all')}
                className={activeFilter === 'all' ? 'bg-primary-accent text-primary-dark' : ''}
              >
                All ({matches.length})
              </Button>
              <Button
                variant={activeFilter === 'mentors' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter('mentors')}
                className={activeFilter === 'mentors' ? 'bg-primary-accent text-primary-dark' : ''}
              >
                <Star className="h-4 w-4 mr-1" />
                Mentors ({matches.filter(m => m.role === 'MENTOR').length})
              </Button>
              <Button
                variant={activeFilter === 'mentees' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter('mentees')}
                className={activeFilter === 'mentees' ? 'bg-secondary-accent text-white' : ''}
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Mentees ({matches.filter(m => m.role === 'MENTEE').length})
              </Button>
              <Button
                variant={activeFilter === 'active' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter('active')}
                className={activeFilter === 'active' ? 'bg-green-600 text-white' : ''}
              >
                Active ({matches.filter(m => m.status === 'ACTIVE').length})
              </Button>
            </div>
          </div>

          {/* Matches Grid */}
          {loading ? (
            <Card className="shadow-md">
              <CardContent className="p-12 text-center">
                <Loader2 className="h-12 w-12 text-primary-accent mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-bold font-montserrat text-neutral-700 mb-2">
                  Loading your matches...
                </h3>
                <p className="text-neutral-500 font-montserrat">
                  Please wait while we fetch your connections
                </p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="shadow-md">
              <CardContent className="p-12 text-center">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold font-montserrat text-neutral-700 mb-2">
                  Error loading matches
                </h3>
                <p className="text-neutral-500 font-montserrat mb-6">
                  {error}
                </p>
                <Button
                  variant="primary"
                  onClick={() => window.location.reload()}
                  className="bg-primary-accent text-primary-dark"
                >
                  Try Again
                </Button>
              </CardContent>
            </Card>
          ) : filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMatches.map((match) => (
                <Card key={match.id} className="shadow-md hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="cursor-pointer"
                        onClick={() => router.push(`/profile/${match.userId}`)}
                      >
                        <Avatar
                          fallback={match.name}
                          size="lg"
                          className="flex-shrink-0"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/profile/${match.userId}`}>
                          <h3 className="font-bold font-montserrat text-primary-dark hover:text-primary-accent transition-colors truncate">
                            {match.name}
                          </h3>
                        </Link>
                        <p className="text-sm font-montserrat text-neutral-600 truncate">
                          {match.title}
                        </p>
                        <Badge
                          variant="default"
                          size="sm"
                          className={`mt-2 ${
                            match.role === 'mentor'
                              ? 'bg-primary-accent/10 text-primary-accent border border-primary-accent/20'
                              : 'bg-secondary-accent/10 text-secondary-accent border border-secondary-accent/20'
                          }`}
                        >
                          {match.role === 'mentor' ? 'Mentor' : 'Mentee'}
                        </Badge>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600">
                        <Briefcase className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{match.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{match.location}</span>
                      </div>
                      {match.role === 'mentor' && (
                        <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600">
                          <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                          <span>{match.rating} • {match.sessionsCompleted} sessions</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span>Matched {new Date(match.matchedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                    </div>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {match.expertise.slice(0, 3).map((skill: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          size="sm"
                          className="bg-neutral-100 text-neutral-700 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    {/* Last Message */}
                    {match.lastMessage && (
                      <div className="bg-neutral-50 p-3 rounded-lg mb-4">
                        <p className="text-xs font-montserrat text-neutral-500 mb-1">
                          {match.lastMessageTime}
                        </p>
                        <p className="text-sm font-montserrat text-neutral-700 line-clamp-2">
                          {match.lastMessage}
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        className="bg-primary-accent text-primary-dark hover:bg-primary-accent/90 relative"
                        onClick={() => router.push('/messages')}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                        {match.unreadMessages > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {match.unreadMessages}
                          </span>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        fullWidth
                        onClick={() => router.push('/sessions')}
                      >
                        <Calendar className="h-4 w-4 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="shadow-md">
              <CardContent className="p-12 text-center">
                <Users className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold font-montserrat text-neutral-700 mb-2">
                  No matches found
                </h3>
                <p className="text-neutral-500 font-montserrat mb-6">
                  {searchQuery
                    ? "Try adjusting your search or filters"
                    : "Start browsing to find your perfect match"}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="primary" asChild className="bg-primary-accent text-primary-dark">
                    <Link href="/browse-mentors">
                      <Star className="h-4 w-4 mr-2" />
                      Browse Mentors
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/browse-mentees">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Browse Mentees
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

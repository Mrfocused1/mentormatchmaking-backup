'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  LayoutDashboard,
  MessageCircle,
  Bell,
  User,
  Settings,
  Heart,
  Users,
  TrendingUp,
  Calendar,
  Star,
  Award,
  CheckCircle,
  Edit,
  Eye,
  UserPlus,
  HelpCircle,
  AlertCircle,
  BarChart3,
  Loader2,
  Target,
  UserCheck
} from 'lucide-react'

export default function MenteeDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [matches, setMatches] = useState<any[]>([])
  const [sessions, setSessions] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [followingCount, setFollowingCount] = useState(0)

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const supabase = createClient()

        // Get authenticated user
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
          console.error('Auth error:', authError)
          router.push('/login')
          return
        }

        // Fetch user profile
        const { data: userProfile, error: profileError } = await supabase
          .from('User')
          .select('*, Profile(*)')
          .eq('id', user.id)
          .maybeSingle()

        if (profileError) {
          console.error('Profile error:', profileError)
          throw new Error('Failed to fetch profile')
        }

        if (!userProfile) {
          console.log('User not found, redirecting to onboarding')
          router.push('/onboarding/mentee')
          return
        }

        setUserData(userProfile)

        // Fetch matches
        const { data: userMatches } = await supabase
          .from('Match')
          .select(`
            *,
            user1:User!Match_user1Id_fkey(*, Profile(*)),
            user2:User!Match_user2Id_fkey(*, Profile(*))
          `)
          .or(`user1Id.eq.${user.id},user2Id.eq.${user.id}`)

        if (userMatches) {
          setMatches(userMatches)
        }

        // Fetch sessions (as mentee)
        const { data: userSessions } = await supabase
          .from('Session')
          .select('*')
          .eq('menteeId', user.id)
          .order('scheduledAt', { ascending: true })

        if (userSessions) {
          setSessions(userSessions)
        }

        // Fetch notifications
        const { data: userNotifications } = await supabase
          .from('Notification')
          .select('*')
          .eq('userId', user.id)
          .order('createdAt', { ascending: false })
          .limit(50)

        if (userNotifications) {
          setNotifications(userNotifications)
        }

        // Fetch following count (connections where user is follower)
        const { count } = await supabase
          .from('Connection')
          .select('*', { count: 'exact', head: true })
          .eq('followerId', user.id)
          .eq('status', 'ACCEPTED')

        if (count !== null) {
          setFollowingCount(count)
        }

      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [router])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-secondary-accent mx-auto mb-4" />
            <p className="text-neutral-600 font-montserrat">Loading mentee dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error || !userData) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-neutral-600 font-montserrat mb-4">{error || 'Failed to load dashboard'}</p>
            <Button onClick={() => router.push('/login')} className="bg-secondary-accent text-white">
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Calculate derived values
  const user = {
    name: userData.name || 'User',
    role: 'mentee',
    title: userData.Profile?.workExperience || 'Mentee',
    company: userData.Profile?.city || 'Location not set',
    avatar: userData.Profile?.profilePicture || null,
    joinDate: new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    totalMentors: matches.length,
    completedSessions: sessions.filter(s => s.status === 'COMPLETED').length,
    hasAvatar: !!userData.Profile?.profilePicture,
    hasBio: !!userData.Profile?.bio,
    hasSkills: true,
    hasExperience: !!userData.Profile?.workExperience,
    hasEducation: true,
    hasSocialLinks: !!(userData.Profile?.linkedIn || userData.Profile?.twitter),
    hasAvailability: !!userData.Profile?.availableHours,
  }

  // Calculate profile completeness
  const calculateProfileCompleteness = () => {
    const fields = [
      user.hasAvatar,
      user.hasBio,
      user.hasSkills,
      user.hasExperience,
      user.hasEducation,
      user.hasSocialLinks,
      user.hasAvailability,
    ]
    const completed = fields.filter(Boolean).length
    const total = fields.length
    return Math.round((completed / total) * 100)
  }

  const profileCompleteness = calculateProfileCompleteness()
  const isProfileComplete = profileCompleteness === 100

  // Calculate analytics from real data
  const unreadNotifications = notifications.filter(n => !n.isRead).length
  const upcomingSessions = sessions.filter(s => {
    const scheduledDate = new Date(s.scheduledAt)
    return scheduledDate > new Date() && s.status === 'SCHEDULED'
  }).length

  const analytics = {
    newInterests: unreadNotifications,
    totalMatches: matches.length,
    unreadMessages: 0,  // TODO: Calculate from messages
    followingCount: followingCount,
    upcomingSessions: upcomingSessions,
    completedSessions: user.completedSessions,
  }

  // Generate recent activity from notifications
  const recentActivity = notifications.slice(0, 4).map((notif) => {
    const timeAgo = Math.floor((Date.now() - new Date(notif.createdAt).getTime()) / 1000 / 60)
    const timeString = timeAgo < 60
      ? `${timeAgo} min ago`
      : timeAgo < 1440
        ? `${Math.floor(timeAgo / 60)} hours ago`
        : `${Math.floor(timeAgo / 1440)} days ago`

    return {
      id: notif.id,
      type: notif.type?.toLowerCase() || 'message',
      user: notif.content?.split(' ')[0] || 'Someone',
      action: notif.content || 'performed an action',
      time: timeString,
      unread: !notif.isRead,
    }
  })

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'messages', label: 'Messages', icon: MessageCircle, badge: analytics.unreadMessages },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Dashboard Header */}
      <section className="bg-primary-dark pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar fallback={user.name} size="xl" className="border-4 border-white shadow-xl" />
              <div>
                <h1 className="text-3xl font-black font-montserrat text-white">
                  Welcome back, {user.name.split(' ')[0]}!
                </h1>
                <p className="text-white/80 font-montserrat mt-1">
                  {user.title}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="border-secondary-accent text-secondary-accent bg-secondary-accent/10">
                    Mentee
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              variant="primary"
              className="bg-secondary-accent hover:bg-secondary-accent/90 text-white"
              asChild
            >
              <Link href="/browse-mentors">
                <Eye className="mr-2 h-5 w-5" />
                Browse Mentors
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-semibold font-montserrat text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-secondary-accent text-secondary-accent'
                    : 'border-transparent text-neutral-600 hover:text-primary-dark'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
                {tab.badge && tab.badge > 0 && (
                  <span className="ml-1 bg-secondary-accent text-white rounded-full px-2 py-0.5 text-xs font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-secondary-accent/20 hover:border-secondary-accent hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-secondary-accent/10 rounded-full">
                        <Heart className="h-6 w-6 text-secondary-accent" />
                      </div>
                      {analytics.newInterests > 0 && <Badge variant="secondary" size="sm">New</Badge>}
                    </div>
                    <p className="text-3xl font-black font-montserrat text-primary-dark">
                      {analytics.newInterests}
                    </p>
                    <p className="text-sm text-neutral-600 font-montserrat mt-1">
                      New Interest Requests
                    </p>
                    <Link
                      href="/notifications"
                      className="text-xs text-secondary-accent hover:underline font-semibold font-montserrat mt-2 inline-block"
                    >
                      View all →
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-secondary-accent/20 hover:border-secondary-accent hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-primary-accent/10 rounded-full">
                        <MessageCircle className="h-6 w-6 text-primary-accent" />
                      </div>
                      {analytics.unreadMessages > 0 && (
                        <Badge className="bg-secondary-accent" size="sm">{analytics.unreadMessages}</Badge>
                      )}
                    </div>
                    <p className="text-3xl font-black font-montserrat text-primary-dark">
                      {analytics.unreadMessages}
                    </p>
                    <p className="text-sm text-neutral-600 font-montserrat mt-1">
                      Unread Messages
                    </p>
                    <Link
                      href="/messages"
                      className="text-xs text-secondary-accent hover:underline font-semibold font-montserrat mt-2 inline-block"
                    >
                      View inbox →
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-secondary-accent/20 hover:border-secondary-accent hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-success/10 rounded-full">
                        <Users className="h-6 w-6 text-success" />
                      </div>
                    </div>
                    <p className="text-3xl font-black font-montserrat text-primary-dark">
                      {analytics.totalMatches}
                    </p>
                    <p className="text-sm text-neutral-600 font-montserrat mt-1">
                      Total Matches
                    </p>
                    <Link
                      href="/matches"
                      className="text-xs text-secondary-accent hover:underline font-semibold font-montserrat mt-2 inline-block"
                    >
                      View matches →
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-secondary-accent/20 hover:border-secondary-accent hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-vibrant-accent/10 rounded-full">
                        <UserCheck className="h-6 w-6 text-vibrant-accent" />
                      </div>
                    </div>
                    <p className="text-3xl font-black font-montserrat text-primary-dark">
                      {analytics.followingCount}
                    </p>
                    <p className="text-sm text-neutral-600 font-montserrat mt-1">
                      Mentors Following
                    </p>
                    <Link
                      href="/following"
                      className="text-xs text-secondary-accent hover:underline font-semibold font-montserrat mt-2 inline-block"
                    >
                      View all →
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Analytics Overview Banner */}
              <Card className="shadow-xl bg-secondary-accent/10 border-2 border-secondary-accent/30">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-secondary-accent rounded-full">
                        <BarChart3 className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black font-montserrat text-primary-dark mb-1">
                          View Learning Analytics
                        </h3>
                        <p className="text-sm font-montserrat text-neutral-700 mb-3">
                          Track your mentorship journey, goals, learning topics, and growth
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm font-montserrat">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-secondary-accent" />
                            <span className="text-neutral-700"><span className="font-bold">{analytics.completedSessions}</span> sessions attended</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary-accent" />
                            <span className="text-neutral-700"><span className="font-bold">{analytics.totalMatches}</span> mentors</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-green-600" />
                            <span className="text-neutral-700"><span className="font-bold">8/12</span> goals completed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      size="lg"
                      className="bg-secondary-accent text-white hover:bg-secondary-accent/90 shadow-lg whitespace-nowrap"
                      asChild
                    >
                      <Link href="/analytics/mentee">
                        <TrendingUp className="mr-2 h-5 w-5" />
                        View Analytics
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                  <Card className="shadow-lg">
                    <CardHeader className="border-b border-neutral-200">
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Bell className="h-5 w-5 text-secondary-accent" />
                          Recent Activity
                        </span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/notifications">View All</Link>
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      {recentActivity.length > 0 ? (
                        <div className="divide-y divide-neutral-100">
                          {recentActivity.map((activity) => (
                            <div
                              key={activity.id}
                              className={`p-6 hover:bg-neutral-50 transition-colors ${
                                activity.unread ? 'bg-secondary-accent/5' : ''
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                  {activity.type === 'interest' && (
                                    <div className="p-2 bg-secondary-accent/10 rounded-full">
                                      <Heart className="h-5 w-5 text-secondary-accent" />
                                    </div>
                                  )}
                                  {activity.type === 'message' && (
                                    <div className="p-2 bg-primary-accent/10 rounded-full">
                                      <MessageCircle className="h-5 w-5 text-primary-accent" />
                                    </div>
                                  )}
                                  {activity.type === 'match' && (
                                    <div className="p-2 bg-success/10 rounded-full">
                                      <UserPlus className="h-5 w-5 text-success" />
                                    </div>
                                  )}
                                  {activity.type === 'session' && (
                                    <div className="p-2 bg-warning/10 rounded-full">
                                      <CheckCircle className="h-5 w-5 text-warning" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-montserrat text-primary-dark">
                                    {activity.action}
                                  </p>
                                  <p className="text-xs text-neutral-500 font-montserrat mt-1">
                                    {activity.time}
                                  </p>
                                </div>
                                {activity.unread && (
                                  <div className="w-2 h-2 bg-secondary-accent rounded-full flex-shrink-0 mt-2"></div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                          <p className="text-neutral-500 font-montserrat">No recent activity</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions & Stats */}
                <div className="space-y-6">
                  {/* Profile Completeness */}
                  {!isProfileComplete && (
                    <Card className="shadow-lg border-yellow-500/20 bg-yellow-50/50">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-yellow-600" />
                          Complete Your Profile
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold font-montserrat text-primary-dark">
                                {profileCompleteness}% Complete
                              </span>
                            </div>
                            <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-yellow-600 h-2 rounded-full transition-all"
                                style={{ width: `${profileCompleteness}%` }}
                              ></div>
                            </div>
                          </div>
                          <p className="text-sm font-montserrat text-neutral-600">
                            Complete profiles get 3x more matches!
                          </p>
                          <Button variant="primary" size="sm" fullWidth asChild className="bg-yellow-600 text-white hover:bg-yellow-700">
                            <Link href="/profile/edit">
                              Complete Profile
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Quick Actions */}
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button variant="outline" size="md" fullWidth asChild>
                        <Link href="/messages">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          View Messages
                        </Link>
                      </Button>
                      <Button variant="outline" size="md" fullWidth asChild>
                        <Link href="/sessions">
                          <Calendar className="mr-2 h-4 w-4" />
                          My Sessions
                        </Link>
                      </Button>
                      <Button variant="outline" size="md" fullWidth asChild>
                        <Link href="/profile/edit">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Link>
                      </Button>
                      <Button variant="outline" size="md" fullWidth asChild>
                        <Link href="/browse-mentors">
                          <Users className="mr-2 h-4 w-4" />
                          Find Mentors
                        </Link>
                      </Button>
                      <Button variant="outline" size="md" fullWidth asChild>
                        <Link href="/following">
                          <UserCheck className="mr-2 h-4 w-4" />
                          Following ({analytics.followingCount})
                        </Link>
                      </Button>
                      <Button variant="ghost" size="md" fullWidth asChild className="text-neutral-600">
                        <Link href="/help">
                          <HelpCircle className="mr-2 h-4 w-4" />
                          Help Center
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Your Stats */}
                  <Card className="shadow-lg border-secondary-accent/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="h-5 w-5 text-secondary-accent" />
                        Your Stats
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600 font-montserrat">Member Since</span>
                        <span className="text-sm font-bold font-montserrat text-primary-dark">
                          {user.joinDate}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600 font-montserrat">Total Matches</span>
                        <span className="text-sm font-bold font-montserrat text-primary-dark">
                          {user.totalMentors}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600 font-montserrat">Sessions Completed</span>
                        <span className="text-sm font-bold font-montserrat text-primary-dark">
                          {user.completedSessions}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <Card className="shadow-lg">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-neutral-600 font-montserrat mb-6">
                  View and manage your conversations with your mentors.
                </p>
                <Button variant="primary" size="lg" asChild className="bg-secondary-accent hover:bg-secondary-accent/90 text-white">
                  <Link href="/messages">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Open Messages
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'profile' && (
            <Card className="shadow-lg">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-neutral-600 font-montserrat mb-6">
                  View and edit your profile information.
                </p>
                <Button variant="primary" size="lg" asChild className="bg-secondary-accent hover:bg-secondary-accent/90 text-white">
                  <Link href="/profile/edit">
                    <Edit className="mr-2 h-5 w-5" />
                    Edit Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === 'settings' && (
            <Card className="shadow-lg">
              <CardHeader className="border-b border-neutral-200">
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-neutral-600 font-montserrat mb-6">
                  Manage your account settings and preferences.
                </p>
                <Button variant="primary" size="lg" asChild className="bg-secondary-accent hover:bg-secondary-accent/90 text-white">
                  <Link href="/settings">
                    <Settings className="mr-2 h-5 w-5" />
                    Go to Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

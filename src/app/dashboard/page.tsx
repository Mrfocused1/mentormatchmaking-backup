'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  Mail,
  Calendar,
  Star,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  Edit,
  Eye,
  ThumbsUp,
  UserPlus,
  HelpCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [matches, setMatches] = useState<any[]>([])
  const [sessions, setSessions] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [profileViews, setProfileViews] = useState(0)

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch user profile, matches, sessions, and notifications in parallel
        const [profileRes, matchesRes, sessionsRes, notificationsRes] = await Promise.all([
          fetch('/api/profile/me'),
          fetch('/api/matches'),
          fetch('/api/sessions'),
          fetch('/api/notifications'),
        ])

        const profileData = await profileRes.json()
        const matchesData = await matchesRes.json()
        const sessionsData = await sessionsRes.json()
        const notificationsData = await notificationsRes.json()

        if (!profileRes.ok) {
          throw new Error(profileData.error || 'Failed to fetch profile')
        }

        setUserData(profileData.user)
        setMatches(matchesData.success ? matchesData.matches : [])
        setSessions(sessionsData.success ? sessionsData.sessions : [])
        setNotifications(notificationsData.success ? notificationsData.notifications : [])

        // Fetch profile views count for the current user
        if (profileData.user?.id) {
          const viewsRes = await fetch(`/api/profile/views?userId=${profileData.user.id}&period=30d`)
          const viewsData = await viewsRes.json()
          if (viewsData.success) {
            setProfileViews(viewsData.viewCount || 0)
          }
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-primary-dark">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary-accent mx-auto mb-4" />
            <p className="text-white font-montserrat">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error || !userData) {
    return (
      <div className="min-h-screen bg-primary-dark">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <p className="text-white font-montserrat mb-4">{error || 'Failed to load profile'}</p>
            <Button onClick={() => window.location.reload()} className="bg-primary-accent text-primary-dark">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Extract user data
  const user = {
    name: userData.name || 'User',
    role: userData.role?.toLowerCase() || 'mentee',
    title: userData.profile?.workExperience || 'No title set',
    company: userData.profile?.city || 'Not specified',
    avatar: userData.profile?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=A3F3C4&color=1B4332&size=400`,
    joinDate: new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    rating: 4.9, // TODO: Calculate from reviews
    totalMentees: 0, // TODO: Count from matches
    completedSessions: 0, // TODO: Count from sessions
    // Profile completeness fields
    hasAvatar: !!userData.profile?.profilePicture,
    hasBio: !!userData.profile?.bio,
    hasSkills: userData.profile?.interests && userData.profile.interests.length > 0,
    hasExperience: !!userData.profile?.workExperience,
    hasEducation: !!userData.profile?.yearsOfExperience,
    hasSocialLinks: !!(userData.profile?.linkedIn || userData.profile?.twitter),
    hasAvailability: !!userData.profile?.availableHours,
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
  const analytics = {
    newInterests: matches.filter(m => m.status === 'PENDING').length,
    totalMatches: matches.filter(m => m.status === 'ACTIVE').length,
    unreadMessages: matches.reduce((sum, match) => sum + (match.unreadMessages || 0), 0),
    profileViews: profileViews,
    upcomingSessions: sessions.filter(s => s.status === 'SCHEDULED' && new Date(s.scheduledAt) > new Date()).length,
    completedSessions: sessions.filter(s => s.status === 'COMPLETED').length,
  }

  // Convert notifications to activity feed
  const recentActivity = notifications.slice(0, 4).map(notification => {
    let type = 'notification'
    if (notification.type === 'CONNECTION_REQUEST') type = 'interest'
    if (notification.type === 'MESSAGE') type = 'message'
    if (notification.type === 'SESSION_SCHEDULED') type = 'session'
    if (notification.type === 'MATCH_ACCEPTED') type = 'match'

    return {
      id: notification.id,
      type,
      user: notification.title,
      action: notification.message,
      time: new Date(notification.createdAt).toLocaleDateString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      unread: !notification.read,
    }
  })

  // Get recent matches for display
  const recentMatches = matches.filter(m => m.status === 'ACTIVE').slice(0, 3).map(match => {
    const otherUser = match.user1Id === userData?.id ? match.user2 : match.user1
    return {
      id: match.id,
      name: otherUser?.name || 'Unknown User',
      title: otherUser?.profile?.workExperience || 'No title',
      matchDate: new Date(match.matchedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }),
      lastMessage: '',
      unread: match.unreadMessages > 0,
      avatar: otherUser?.profile?.profilePicture || null,
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
                  {user.title} at {user.company}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className="border-primary-accent text-primary-accent bg-primary-accent/10">
                    {user.role === 'mentor' ? 'Mentor' : 'Mentee'}
                  </Badge>
                  {user.role === 'mentor' && (
                    <div className="flex items-center gap-1 text-white/90">
                      <Star className="h-4 w-4 fill-primary-accent text-primary-accent" />
                      <span className="text-sm font-semibold font-montserrat">{user.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {user.role === 'mentee' && (
              <Button
                size="lg"
                variant="primary"
                className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark"
                asChild
              >
                <Link href="/browse-mentors">
                  <Eye className="mr-2 h-5 w-5" />
                  Browse Mentors
                </Link>
              </Button>
            )}
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
                    ? 'border-primary-accent text-primary-accent'
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
                <Card className="border-primary-accent/20 hover:border-primary-accent hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-secondary-accent/10 rounded-full">
                        <Heart className="h-6 w-6 text-secondary-accent" />
                      </div>
                      <Badge variant="secondary" size="sm">New</Badge>
                    </div>
                    <p className="text-3xl font-black font-montserrat text-primary-dark">
                      {analytics.newInterests}
                    </p>
                    <p className="text-sm text-neutral-600 font-montserrat mt-1">
                      New Interest Requests
                    </p>
                    <Link
                      href="/notifications"
                      className="text-xs text-primary-accent hover:underline font-semibold font-montserrat mt-2 inline-block"
                    >
                      View all →
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-primary-accent/20 hover:border-primary-accent hover:shadow-lg transition-all">
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
                      className="text-xs text-primary-accent hover:underline font-semibold font-montserrat mt-2 inline-block"
                    >
                      View inbox →
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-primary-accent/20 hover:border-primary-accent hover:shadow-lg transition-all">
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
                      className="text-xs text-primary-accent hover:underline font-semibold font-montserrat mt-2 inline-block"
                    >
                      View matches →
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-primary-accent/20 hover:border-primary-accent hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-warning/10 rounded-full">
                        <Eye className="h-6 w-6 text-warning" />
                      </div>
                    </div>
                    <p className="text-3xl font-black font-montserrat text-primary-dark">
                      {analytics.profileViews}
                    </p>
                    <p className="text-sm text-neutral-600 font-montserrat mt-1">
                      Profile Views (30 days)
                    </p>
                    <Link
                      href="/profile/views"
                      className="text-xs text-primary-accent hover:underline font-semibold font-montserrat mt-2 inline-block"
                    >
                      View analytics →
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                  <Card className="shadow-lg">
                    <CardHeader className="border-b border-neutral-200">
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Bell className="h-5 w-5 text-primary-accent" />
                          Recent Activity
                        </span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href="/notifications">View All</Link>
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-neutral-100">
                        {recentActivity.map((activity) => (
                          <div
                            key={activity.id}
                            className={`p-6 hover:bg-neutral-50 transition-colors ${
                              activity.unread ? 'bg-primary-accent/5' : ''
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
                                  <span className="font-bold">{activity.user}</span> {activity.action}
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
                      {user.role === 'mentee' && (
                        <Button variant="outline" size="md" fullWidth asChild>
                          <Link href="/browse-mentors">
                            <Users className="mr-2 h-4 w-4" />
                            Find Mentors
                          </Link>
                        </Button>
                      )}
                      <Button variant="ghost" size="md" fullWidth asChild className="text-neutral-600">
                        <Link href="/help">
                          <HelpCircle className="mr-2 h-4 w-4" />
                          Help Center
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Your Stats */}
                  <Card className="shadow-lg border-primary-accent/20">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary-accent" />
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
                          {user.totalMentees}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-neutral-600 font-montserrat">Sessions Completed</span>
                        <span className="text-sm font-bold font-montserrat text-primary-dark">
                          {user.completedSessions}
                        </span>
                      </div>
                      {user.role === 'mentor' && (
                        <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                          <span className="text-sm text-neutral-600 font-montserrat">Average Rating</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="text-sm font-bold font-montserrat text-primary-dark">
                              {user.rating}
                            </span>
                          </div>
                        </div>
                      )}
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
                  View and manage your conversations with your matches.
                </p>
                <Button variant="primary" size="lg" asChild className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark">
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
                <Button variant="primary" size="lg" asChild className="bg-primary-accent hover:bg-primary-accent/90 text-primary-dark">
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
                <p className="text-neutral-600 font-montserrat">
                  Manage your account settings and preferences.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

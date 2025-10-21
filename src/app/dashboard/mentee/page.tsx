'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
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
  BarChart3,
  Target,
  UserCheck
} from 'lucide-react'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock user data - in production this would come from auth/API
  const user = {
    name: 'Sarah Johnson',
    role: 'mentee', // Testing mentee view
    title: 'Senior Software Engineer',
    company: 'Google',
    avatar: null,
    joinDate: 'January 2024',
    rating: 4.9,
    totalMentees: 12,
    completedSessions: 45,
    // Profile completeness fields
    hasAvatar: false,
    hasBio: true,
    hasSkills: true,
    hasExperience: true,
    hasEducation: true,
    hasSocialLinks: false,
    hasAvailability: true,
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

  // Mock analytics data
  const analytics = {
    newInterests: 8,
    totalMatches: 12,
    unreadMessages: 5,
    profileViews: 124,
    upcomingSessions: 3,
    completedSessions: 45,
    followingCount: 15,
  }

  // Mock recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'interest',
      user: 'Alex Thompson',
      action: 'showed interest in your profile',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 2,
      type: 'message',
      user: 'Emily Rodriguez',
      action: 'sent you a message',
      time: '5 hours ago',
      unread: true,
    },
    {
      id: 3,
      type: 'match',
      user: 'Michael Chen',
      action: 'You matched with',
      time: '1 day ago',
      unread: false,
    },
    {
      id: 4,
      type: 'session',
      user: 'Jessica Taylor',
      action: 'completed a session with you',
      time: '2 days ago',
      unread: false,
    },
  ]

  // Mock matches
  const matches = [
    {
      id: 1,
      name: 'Alex Thompson',
      title: 'Software Developer',
      matchDate: '2 days ago',
      lastMessage: 'Thank you for accepting! Looking forward to our first session.',
      unread: true,
      avatar: null,
    },
    {
      id: 2,
      name: 'Emily Rodriguez',
      title: 'Product Manager',
      matchDate: '5 days ago',
      lastMessage: 'Great session today! See you next week.',
      unread: false,
      avatar: null,
    },
    {
      id: 3,
      name: 'Michael Chen',
      title: 'Marketing Specialist',
      matchDate: '1 week ago',
      lastMessage: 'Can we schedule a call for next Tuesday?',
      unread: true,
      avatar: null,
    },
  ]

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
                      className="text-xs text-primary-accent hover:underline font-semibold font-montserrat mt-2 inline-block"
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
                        <>
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
                        </>
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

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Calendar,
  CheckCircle,
  Star,
  Award,
  TrendingUp,
  Users,
  Filter,
  Check,
  Trash2,
  Settings,
  ArrowLeft
} from 'lucide-react'

// Notification types
type NotificationType = 'interest' | 'match' | 'message' | 'session' | 'review' | 'milestone' | 'system'

interface Notification {
  id: number
  type: NotificationType
  title: string
  description: string
  timestamp: string
  isRead: boolean
  actionUrl?: string
  user?: {
    name: string
    avatar: string | null
    role: 'mentor' | 'mentee'
  }
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'interest',
    title: 'New Interest Request',
    description: 'Michael Chen has shown interest in connecting with you',
    timestamp: '5 minutes ago',
    isRead: false,
    actionUrl: '/dashboard',
    user: {
      name: 'Michael Chen',
      avatar: null,
      role: 'mentee',
    },
  },
  {
    id: 2,
    type: 'message',
    title: 'New Message',
    description: 'Emily Rodriguez sent you a message',
    timestamp: '1 hour ago',
    isRead: false,
    actionUrl: '/messages',
    user: {
      name: 'Emily Rodriguez',
      avatar: null,
      role: 'mentor',
    },
  },
  {
    id: 3,
    type: 'match',
    title: 'New Match!',
    description: 'You and David Kim have been matched! Start your mentorship journey.',
    timestamp: '3 hours ago',
    isRead: true,
    actionUrl: '/messages',
    user: {
      name: 'David Kim',
      avatar: null,
      role: 'mentee',
    },
  },
  {
    id: 4,
    type: 'session',
    title: 'Session Reminder',
    description: 'Your session with Sarah Thompson starts in 24 hours',
    timestamp: '5 hours ago',
    isRead: true,
    actionUrl: '/dashboard',
    user: {
      name: 'Sarah Thompson',
      avatar: null,
      role: 'mentee',
    },
  },
  {
    id: 5,
    type: 'review',
    title: 'New Review Received',
    description: 'James Wilson left you a 5-star review',
    timestamp: 'Yesterday',
    isRead: true,
    actionUrl: '/profile',
    user: {
      name: 'James Wilson',
      avatar: null,
      role: 'mentee',
    },
  },
  {
    id: 6,
    type: 'milestone',
    title: 'Milestone Achieved!',
    description: 'Congratulations! You\'ve completed 50 mentorship sessions.',
    timestamp: 'Yesterday',
    isRead: true,
    actionUrl: '/dashboard',
  },
  {
    id: 7,
    type: 'interest',
    title: 'New Interest Request',
    description: 'Lisa Anderson wants to connect with you',
    timestamp: '2 days ago',
    isRead: true,
    actionUrl: '/dashboard',
    user: {
      name: 'Lisa Anderson',
      avatar: null,
      role: 'mentee',
    },
  },
  {
    id: 8,
    type: 'message',
    title: 'New Message',
    description: 'Robert Taylor replied to your message',
    timestamp: '2 days ago',
    isRead: true,
    actionUrl: '/messages',
    user: {
      name: 'Robert Taylor',
      avatar: null,
      role: 'mentor',
    },
  },
  {
    id: 9,
    type: 'system',
    title: 'Profile Update Reminder',
    description: 'Keep your profile up to date to attract more matches',
    timestamp: '3 days ago',
    isRead: true,
    actionUrl: '/profile',
  },
  {
    id: 10,
    type: 'session',
    title: 'Session Completed',
    description: 'Your session with Alex Martinez has been marked as complete',
    timestamp: '4 days ago',
    isRead: true,
    actionUrl: '/dashboard',
    user: {
      name: 'Alex Martinez',
      avatar: null,
      role: 'mentee',
    },
  },
]

// Notification type config
const notificationConfig: Record<NotificationType, { icon: any; color: string; bgColor: string }> = {
  interest: {
    icon: Heart,
    color: 'text-secondary-accent',
    bgColor: 'bg-secondary-accent/10',
  },
  match: {
    icon: UserPlus,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  message: {
    icon: MessageCircle,
    color: 'text-primary-accent',
    bgColor: 'bg-primary-accent/10',
  },
  session: {
    icon: Calendar,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  review: {
    icon: Star,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  milestone: {
    icon: Award,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  system: {
    icon: Bell,
    color: 'text-neutral-600',
    bgColor: 'bg-neutral-100',
  },
}

// Time grouping helper
const groupNotificationsByTime = (notifications: Notification[]) => {
  const today: Notification[] = []
  const yesterday: Notification[] = []
  const thisWeek: Notification[] = []
  const older: Notification[] = []

  notifications.forEach((notification) => {
    const time = notification.timestamp.toLowerCase()
    if (time.includes('min') || time.includes('hour') || time === 'today') {
      today.push(notification)
    } else if (time === 'yesterday') {
      yesterday.push(notification)
    } else if (time.includes('day') && !time.includes('yesterday')) {
      thisWeek.push(notification)
    } else {
      older.push(notification)
    }
  })

  return { today, yesterday, thisWeek, older }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [filterType, setFilterType] = useState<NotificationType | 'all'>('all')

  // Filter notifications by type
  const filteredNotifications = filterType === 'all'
    ? notifications
    : notifications.filter(n => n.type === filterType)

  // Group filtered notifications by time
  const groupedNotifications = groupNotificationsByTime(filteredNotifications)

  // Count unread notifications
  const unreadCount = notifications.filter(n => !n.isRead).length

  // Mark single notification as read
  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    )
  }

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))
  }

  // Delete notification
  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  // Render notification item
  const renderNotification = (notification: Notification) => {
    const config = notificationConfig[notification.type]
    const Icon = config.icon

    const handleCardClick = () => {
      if (notification.actionUrl) {
        // Mark as read when navigating
        if (!notification.isRead) {
          markAsRead(notification.id)
        }
      }
    }

    return (
      <div
        key={notification.id}
        className={`relative p-4 border-b border-neutral-100 hover:bg-neutral-50 transition-colors ${
          !notification.isRead ? 'bg-primary-accent/5' : ''
        } ${notification.actionUrl ? 'cursor-pointer' : ''}`}
      >
        {/* Clickable overlay for the entire card */}
        {notification.actionUrl && (
          <Link
            href={notification.actionUrl}
            onClick={handleCardClick}
            className="absolute inset-0 z-0"
          />
        )}

        <div className="flex items-start gap-4 relative z-10">
          {/* Icon */}
          <div className={`flex-shrink-0 w-12 h-12 ${config.bgColor} rounded-full flex items-center justify-center`}>
            {notification.user ? (
              <Avatar
                fallback={notification.user.name}
                size="md"
                className="border-2 border-white"
              />
            ) : (
              <Icon className={`h-6 w-6 ${config.color}`} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className={`font-semibold font-montserrat text-sm ${
                !notification.isRead ? 'text-primary-dark' : 'text-neutral-700'
              }`}>
                {notification.title}
              </h3>
              {!notification.isRead && (
                <span className="w-2 h-2 bg-secondary-accent rounded-full flex-shrink-0 mt-1" />
              )}
            </div>
            <p className="text-sm text-neutral-600 font-montserrat mb-2">
              {notification.description}
            </p>
            <span className="text-xs text-neutral-400 font-montserrat">
              {notification.timestamp}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 relative z-20">
            {!notification.isRead && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  markAsRead(notification.id)
                }}
                className="text-neutral-500 hover:text-primary-accent"
                title="Mark as read"
              >
                <Check className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                deleteNotification(notification.id)
              }}
              className="text-neutral-500 hover:text-red-600"
              title="Delete notification"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Render notification group
  const renderGroup = (title: string, notificationsList: Notification[]) => {
    if (notificationsList.length === 0) return null

    return (
      <div className="mb-8">
        <h2 className="text-sm font-bold font-montserrat text-neutral-500 uppercase tracking-wide mb-3 px-4">
          {title}
        </h2>
        <div>
          {notificationsList.map(renderNotification)}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Page Header */}
      <section className="bg-primary-dark pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-primary-accent hover:text-primary-accent/80 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span className="text-sm font-semibold font-montserrat">Back to Dashboard</span>
                </Link>
              </div>
              <h1 className="text-3xl font-black font-montserrat text-white sm:text-4xl">
                Notifications
              </h1>
              <p className="mt-2 text-white/80 font-montserrat">
                Stay updated with your mentorship activities
              </p>
            </div>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <>
                  <Badge variant="secondary" size="lg" className="bg-red-600 text-white">
                    {unreadCount} unread
                  </Badge>
                  <Button
                    onClick={markAllAsRead}
                    variant="primary"
                    size="sm"
                    className="bg-primary-accent text-primary-dark hover:bg-primary-accent/90"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark all as read
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Notifications Content */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <Card className="shadow-xl overflow-hidden">
            {/* Filter Bar */}
            <div className="p-4 border-b border-neutral-200 bg-white">
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <Filter className="h-5 w-5 text-neutral-400 flex-shrink-0" />
                <Button
                  variant={filterType === 'all' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterType('all')}
                  className={filterType === 'all' ? 'bg-primary-accent text-primary-dark' : ''}
                >
                  All
                </Button>
                <Button
                  variant={filterType === 'interest' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterType('interest')}
                  className={filterType === 'interest' ? 'bg-secondary-accent text-white' : ''}
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Interests
                </Button>
                <Button
                  variant={filterType === 'match' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterType('match')}
                  className={filterType === 'match' ? 'bg-green-600 text-white' : ''}
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Matches
                </Button>
                <Button
                  variant={filterType === 'message' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterType('message')}
                  className={filterType === 'message' ? 'bg-primary-accent text-primary-dark' : ''}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Messages
                </Button>
                <Button
                  variant={filterType === 'session' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilterType('session')}
                  className={filterType === 'session' ? 'bg-blue-600 text-white' : ''}
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Sessions
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="bg-white">
              {filteredNotifications.length > 0 ? (
                <>
                  {renderGroup('Today', groupedNotifications.today)}
                  {renderGroup('Yesterday', groupedNotifications.yesterday)}
                  {renderGroup('This Week', groupedNotifications.thisWeek)}
                  {renderGroup('Older', groupedNotifications.older)}
                </>
              ) : (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-8 w-8 text-neutral-400" />
                  </div>
                  <h3 className="text-xl font-bold font-montserrat text-neutral-700 mb-2">
                    No notifications
                  </h3>
                  <p className="text-neutral-500 font-montserrat">
                    {filterType === 'all'
                      ? "You're all caught up! Check back later for new updates."
                      : `No ${filterType} notifications at this time.`}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Notification Settings Link */}
          <div className="mt-6 text-center">
            <Link
              href="/settings"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-accent hover:text-primary-accent/80 font-montserrat"
            >
              <Settings className="h-4 w-4" />
              Manage notification preferences
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

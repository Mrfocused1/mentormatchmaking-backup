'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  MessageCircle,
  TrendingUp,
  Users,
  Search,
  Plus,
  Pin,
  ThumbsUp,
  Eye,
  Clock,
  ChevronRight,
} from 'lucide-react'

// Mock forum categories
const forumCategories = [
  {
    id: 1,
    name: 'General Discussion',
    description: 'General topics about mentorship and career development',
    icon: MessageCircle,
    topics: 1234,
    posts: 5678,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    id: 2,
    name: 'Success Stories',
    description: 'Share your mentorship success stories and milestones',
    icon: TrendingUp,
    topics: 456,
    posts: 2345,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    id: 3,
    name: 'Tips & Advice',
    description: 'Share and receive mentorship tips and best practices',
    icon: Users,
    topics: 789,
    posts: 3456,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
]

// Mock recent discussions
const recentDiscussions = [
  {
    id: 1,
    title: 'How to make the most of your first mentorship session?',
    category: 'Tips & Advice',
    author: {
      name: 'Sarah Johnson',
      avatar: 'SJ',
      role: 'Mentor',
    },
    isPinned: true,
    replies: 24,
    views: 456,
    likes: 18,
    lastActivity: '2 hours ago',
    lastUser: 'Mike Chen',
    excerpt: 'I wanted to share some tips that have helped me and my mentees...',
  },
  {
    id: 2,
    title: 'Celebrating 6 months of successful mentorship!',
    category: 'Success Stories',
    author: {
      name: 'David Martinez',
      avatar: 'DM',
      role: 'Mentee',
    },
    isPinned: false,
    replies: 12,
    views: 234,
    likes: 45,
    lastActivity: '4 hours ago',
    lastUser: 'Emma Wilson',
    excerpt: 'Just wanted to share my journey over the past 6 months...',
  },
  {
    id: 3,
    title: 'Best practices for remote mentorship sessions',
    category: 'Tips & Advice',
    author: {
      name: 'Lisa Anderson',
      avatar: 'LA',
      role: 'Mentor',
    },
    isPinned: false,
    replies: 18,
    views: 389,
    likes: 22,
    lastActivity: '5 hours ago',
    lastUser: 'John Smith',
    excerpt: 'With many of us working remotely, I thought it would be helpful...',
  },
  {
    id: 4,
    title: 'How do you handle time zone differences?',
    category: 'General Discussion',
    author: {
      name: 'Carlos Rodriguez',
      avatar: 'CR',
      role: 'Mentee',
    },
    isPinned: false,
    replies: 31,
    views: 567,
    likes: 15,
    lastActivity: '6 hours ago',
    lastUser: 'Anna Lee',
    excerpt: 'My mentor and I are in very different time zones...',
  },
  {
    id: 5,
    title: 'Resources for career transition into tech',
    category: 'Tips & Advice',
    author: {
      name: 'Michelle Thompson',
      avatar: 'MT',
      role: 'Mentor',
    },
    isPinned: false,
    replies: 44,
    views: 892,
    likes: 67,
    lastActivity: '8 hours ago',
    lastUser: 'Tom Harris',
    excerpt: 'I\'ve compiled a list of resources that might help...',
  },
  {
    id: 6,
    title: 'My journey from mentee to mentor',
    category: 'Success Stories',
    author: {
      name: 'James Wilson',
      avatar: 'JW',
      role: 'Mentor',
    },
    isPinned: false,
    replies: 28,
    views: 645,
    likes: 89,
    lastActivity: '1 day ago',
    lastUser: 'Rachel Green',
    excerpt: 'Three years ago, I joined this platform as a mentee...',
  },
]

// Mock popular tags
const popularTags = [
  { name: 'career-advice', count: 234 },
  { name: 'remote-work', count: 189 },
  { name: 'tech-careers', count: 156 },
  { name: 'first-session', count: 145 },
  { name: 'goal-setting', count: 123 },
  { name: 'networking', count: 98 },
]

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'recent' | 'popular' | 'trending'>('recent')

  // TODO: Replace with actual authentication check
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true'

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      alert('Please log in to create a post')
      return
    }
    // TODO: Implement post creation modal/page
    alert('Post creation coming soon!')
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/help">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Help
              </Link>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-montserrat text-primary-dark mb-2">
                Community Forum
              </h1>
              <p className="text-neutral-600 font-montserrat">
                Connect with mentors and mentees, share experiences, and learn from the community
              </p>
            </div>

            <Button variant="primary" size="md" onClick={handleCreatePost}>
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Forum Categories */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold font-montserrat text-primary-dark">
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {forumCategories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/forum/category/${category.id}`}
                      className="block p-4 rounded-lg border border-neutral-200 hover:border-primary-accent hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${category.bgColor}`}>
                          <category.icon className={`h-6 w-6 ${category.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold font-montserrat text-primary-dark mb-1">
                            {category.name}
                          </h3>
                          <p className="text-sm text-neutral-600 font-montserrat mb-2">
                            {category.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-neutral-500 font-montserrat">
                            <span>{category.topics.toLocaleString()} topics</span>
                            <span>•</span>
                            <span>{category.posts.toLocaleString()} posts</span>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-neutral-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Discussions */}
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold font-montserrat text-primary-dark">
                    Discussions
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={activeTab === 'recent' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('recent')}
                    >
                      Recent
                    </Button>
                    <Button
                      variant={activeTab === 'popular' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('popular')}
                    >
                      Popular
                    </Button>
                    <Button
                      variant={activeTab === 'trending' ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => setActiveTab('trending')}
                    >
                      Trending
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentDiscussions.map((discussion) => (
                    <Link
                      key={discussion.id}
                      href={`/forum/discussion/${discussion.id}`}
                      className="block p-4 rounded-lg border border-neutral-200 hover:border-primary-accent hover:shadow-md transition-all"
                    >
                      <div className="flex items-start gap-4">
                        {/* Author Avatar */}
                        <Avatar
                          src=""
                          alt={discussion.author.name}
                          fallback={discussion.author.avatar}
                          size="md"
                        />

                        {/* Discussion Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 mb-2">
                            {discussion.isPinned && (
                              <Pin className="h-4 w-4 text-secondary-accent flex-shrink-0 mt-1" />
                            )}
                            <h3 className="font-semibold font-montserrat text-primary-dark hover:text-primary-accent">
                              {discussion.title}
                            </h3>
                          </div>

                          <p className="text-sm text-neutral-600 font-montserrat mb-3 line-clamp-2">
                            {discussion.excerpt}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-500 font-montserrat">
                            <Badge variant="outline" size="sm">
                              {discussion.category}
                            </Badge>
                            <span className="flex items-center gap-1">
                              {discussion.author.name}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {discussion.replies}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {discussion.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              {discussion.likes}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {discussion.lastActivity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Load More */}
                <div className="mt-6 text-center">
                  <Button variant="outline" size="md">
                    Load More Discussions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Forum Stats */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold font-montserrat text-primary-dark">
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-montserrat text-neutral-600">Total Topics</span>
                      <span className="text-lg font-bold font-montserrat text-primary-dark">
                        2,479
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-montserrat text-neutral-600">Total Posts</span>
                      <span className="text-lg font-bold font-montserrat text-primary-dark">
                        11,479
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-montserrat text-neutral-600">Active Members</span>
                      <span className="text-lg font-bold font-montserrat text-primary-dark">
                        5,234
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold font-montserrat text-primary-dark">
                  Popular Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Link
                      key={tag.name}
                      href={`/forum/tag/${tag.name}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-primary-accent hover:text-white text-sm font-montserrat text-neutral-700 transition-colors"
                    >
                      #{tag.name}
                      <span className="text-xs opacity-70">({tag.count})</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="shadow-md bg-blue-50/50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg font-bold font-montserrat text-primary-dark">
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm font-montserrat text-neutral-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-accent mt-1">•</span>
                    <span>Be respectful and supportive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-accent mt-1">•</span>
                    <span>Stay on topic and relevant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-accent mt-1">•</span>
                    <span>No spam or self-promotion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-accent mt-1">•</span>
                    <span>Protect privacy and confidentiality</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-accent mt-1">•</span>
                    <span>Report inappropriate content</span>
                  </li>
                </ul>
                <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                  <Link href="/code-of-conduct">Read Full Guidelines</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

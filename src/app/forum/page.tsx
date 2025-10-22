'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
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
  Loader2,
  AlertCircle,
} from 'lucide-react'

interface CategoryData {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  color: string | null
  topics: number
  posts: number
}

interface DiscussionData {
  id: string
  title: string
  content: string
  categoryName: string
  authorName: string
  authorRole: string
  isPinned: boolean
  replies: number
  views: number
  likes: number
  lastActivity: string
  excerpt: string
}

interface TagData {
  name: string
  count: number
}

export default function ForumPage() {
  const router = useRouter()
  const supabase = createClient()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'recent' | 'popular' | 'trending'>('recent')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [forumCategories, setForumCategories] = useState<CategoryData[]>([])
  const [recentDiscussions, setRecentDiscussions] = useState<DiscussionData[]>([])
  const [popularTags, setPopularTags] = useState<TagData[]>([])
  const [stats, setStats] = useState({ totalTopics: 0, totalPosts: 0, activeMembers: 0 })

  // TODO: Replace with actual authentication check
  const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true'

  // Fetch forum data
  useEffect(() => {
    const fetchForumData = async () => {
      try {
        setLoading(true)

        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('ForumCategory')
          .select('*')
          .order('name')

        if (categoriesError) throw categoriesError

        // Calculate topics and posts for each category
        const categoriesWithCounts = await Promise.all(
          (categoriesData || []).map(async (cat: any) => {
            const { count: postsCount } = await supabase
              .from('ForumPost')
              .select('*', { count: 'exact', head: true })
              .eq('categoryId', cat.id)

            const { count: repliesCount } = await supabase
              .from('ForumReply')
              .select('forumReply.*, forumPost!inner(categoryId)', { count: 'exact', head: true })
              .eq('forumPost.categoryId', cat.id)

            return {
              id: cat.id,
              name: cat.name,
              slug: cat.slug,
              description: cat.description,
              icon: cat.icon,
              color: cat.color,
              topics: postsCount || 0,
              posts: (postsCount || 0) + (repliesCount || 0)
            }
          })
        )

        setForumCategories(categoriesWithCounts)

        // Fetch recent discussions
        const { data: postsData, error: postsError } = await supabase
          .from('ForumPost')
          .select(`
            id,
            title,
            content,
            isPinned,
            views,
            likes,
            createdAt,
            updatedAt,
            ForumCategory(name),
            User(name, role)
          `)
          .order('createdAt', { ascending: false })
          .limit(10)

        if (postsError) throw postsError

        // Get reply counts for each post
        const discussionsWithReplies = await Promise.all(
          (postsData || []).map(async (post: any) => {
            const { count: replyCount } = await supabase
              .from('ForumReply')
              .select('*', { count: 'exact', head: true })
              .eq('postId', post.id)

            return {
              id: post.id,
              title: post.title,
              content: post.content,
              excerpt: post.content.substring(0, 150) + '...',
              categoryName: post.ForumCategory?.name || 'General',
              authorName: post.User?.name || 'Anonymous',
              authorRole: post.User?.role || 'MENTEE',
              isPinned: post.isPinned,
              replies: replyCount || 0,
              views: post.views,
              likes: post.likes,
              lastActivity: new Date(post.updatedAt).toLocaleDateString()
            }
          })
        )

        setRecentDiscussions(discussionsWithReplies)

        // Calculate stats
        const { count: topicsCount } = await supabase
          .from('ForumPost')
          .select('*', { count: 'exact', head: true })

        const { count: repliesCount } = await supabase
          .from('ForumReply')
          .select('*', { count: 'exact', head: true })

        const { count: usersCount } = await supabase
          .from('User')
          .select('*', { count: 'exact', head: true })

        setStats({
          totalTopics: topicsCount || 0,
          totalPosts: (topicsCount || 0) + (repliesCount || 0),
          activeMembers: usersCount || 0
        })

        // Extract popular tags from posts
        const allTags: { [key: string]: number } = {}
        postsData?.forEach((post: any) => {
          post.tags?.forEach((tag: string) => {
            allTags[tag] = (allTags[tag] || 0) + 1
          })
        })

        const tagsArray = Object.entries(allTags)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 15)

        setPopularTags(tagsArray)

        setLoading(false)
      } catch (err: any) {
        console.error('Error fetching forum data:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchForumData()
  }, [])

  const handleCreatePost = () => {
    if (!isAuthenticated) {
      alert('Please log in to create a post')
      return
    }
    // TODO: Implement post creation modal/page
    alert('Post creation coming soon!')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary-accent mx-auto mb-4" />
          <p className="text-neutral-600 font-montserrat">Loading forum...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-red-500" />
              <CardTitle className="text-xl font-bold text-primary-dark">Error Loading Forum</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-neutral-600 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="primary" className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
                        <div className={`p-3 rounded-lg bg-primary-accent/10`}>
                          <MessageCircle className={`h-6 w-6 text-primary-accent`} />
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
                          alt={discussion.authorName}
                          fallback={discussion.authorName.substring(0, 2).toUpperCase()}
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
                              {discussion.categoryName}
                            </Badge>
                            <span className="flex items-center gap-1">
                              {discussion.authorName}
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
                        {loading ? '...' : stats.totalTopics.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-montserrat text-neutral-600">Total Posts</span>
                      <span className="text-lg font-bold font-montserrat text-primary-dark">
                        {loading ? '...' : stats.totalPosts.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-montserrat text-neutral-600">Active Members</span>
                      <span className="text-lg font-bold font-montserrat text-primary-dark">
                        {loading ? '...' : stats.activeMembers.toLocaleString()}
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

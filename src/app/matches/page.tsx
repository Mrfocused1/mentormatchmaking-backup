'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  Users
} from 'lucide-react'

// Mock matches data
const mockMatches = [
  {
    id: 1,
    userId: '1',
    name: 'Sarah Thompson',
    role: 'mentor',
    title: 'Senior Product Manager',
    company: 'Tech Innovations Inc.',
    location: 'London, UK',
    avatar: null,
    matchedDate: '2025-10-01',
    rating: 4.9,
    sessionsCompleted: 156,
    expertise: ['Product Management', 'Strategy', 'Leadership'],
    status: 'active',
    lastMessage: 'Looking forward to our session tomorrow!',
    lastMessageTime: '2 hours ago',
    unreadMessages: 2,
  },
  {
    id: 2,
    userId: '2',
    name: 'Michael Chen',
    role: 'mentee',
    title: 'Software Developer',
    company: 'StartupXYZ',
    location: 'Birmingham, UK',
    avatar: null,
    matchedDate: '2025-09-28',
    rating: 0,
    sessionsCompleted: 0,
    expertise: ['JavaScript', 'React', 'Node.js'],
    status: 'active',
    lastMessage: 'Thank you for accepting! Looking forward to our first session.',
    lastMessageTime: '1 day ago',
    unreadMessages: 0,
  },
  {
    id: 3,
    userId: '3',
    name: 'Emily Rodriguez',
    role: 'mentor',
    title: 'Senior UX Designer',
    company: 'Design Studio Co.',
    location: 'Manchester, UK',
    avatar: null,
    matchedDate: '2025-09-25',
    rating: 4.8,
    sessionsCompleted: 89,
    expertise: ['UX Design', 'User Research', 'Prototyping'],
    status: 'active',
    lastMessage: 'Great session today! See you next week.',
    lastMessageTime: '3 days ago',
    unreadMessages: 0,
  },
  {
    id: 4,
    userId: '4',
    name: 'David Kim',
    role: 'mentee',
    title: 'Marketing Specialist',
    company: 'Growth Agency',
    location: 'Bristol, UK',
    avatar: null,
    matchedDate: '2025-09-20',
    rating: 0,
    sessionsCompleted: 0,
    expertise: ['Digital Marketing', 'SEO', 'Content Strategy'],
    status: 'active',
    lastMessage: 'Can we schedule a call for next Tuesday?',
    lastMessageTime: '5 days ago',
    unreadMessages: 1,
  },
  {
    id: 5,
    userId: '5',
    name: 'Jessica Liu',
    role: 'mentor',
    title: 'Engineering Manager',
    company: 'CloudTech Inc.',
    location: 'Edinburgh, Scotland',
    avatar: null,
    matchedDate: '2025-09-15',
    rating: 4.7,
    sessionsCompleted: 124,
    expertise: ['Engineering Leadership', 'System Design', 'Team Building'],
    status: 'active',
    lastMessage: 'Let me know if you need help with that project.',
    lastMessageTime: '1 week ago',
    unreadMessages: 0,
  },
  {
    id: 6,
    userId: '6',
    name: 'Alex Martinez',
    role: 'mentee',
    title: 'Data Analyst',
    company: 'Analytics Co.',
    location: 'Glasgow, Scotland',
    avatar: null,
    matchedDate: '2025-09-10',
    rating: 0,
    sessionsCompleted: 0,
    expertise: ['Data Analysis', 'SQL', 'Python'],
    status: 'active',
    lastMessage: 'Thanks for all your help!',
    lastMessageTime: '2 weeks ago',
    unreadMessages: 0,
  },
  {
    id: 7,
    userId: '7',
    name: 'Lisa Anderson',
    role: 'mentor',
    title: 'VP of Sales',
    company: 'SaaS Solutions',
    location: 'Cardiff, Wales',
    avatar: null,
    matchedDate: '2025-09-05',
    rating: 4.9,
    sessionsCompleted: 203,
    expertise: ['Sales Strategy', 'Business Development', 'Negotiation'],
    status: 'active',
    lastMessage: 'Great progress on your pitch deck!',
    lastMessageTime: '3 weeks ago',
    unreadMessages: 0,
  },
  {
    id: 8,
    userId: '8',
    name: 'Robert Taylor',
    role: 'mentee',
    title: 'Junior Developer',
    company: 'Tech Startup',
    location: 'Leeds, UK',
    avatar: null,
    matchedDate: '2025-08-28',
    rating: 0,
    sessionsCompleted: 0,
    expertise: ['Python', 'Django', 'REST APIs'],
    status: 'inactive',
    lastMessage: 'I appreciate all your guidance.',
    lastMessageTime: '1 month ago',
    unreadMessages: 0,
  },
]

type FilterType = 'all' | 'mentors' | 'mentees' | 'active' | 'inactive'

export default function MatchesPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('all')

  // Filter matches
  const filteredMatches = mockMatches.filter((match) => {
    // Search filter
    const matchesSearch = searchQuery === '' ||
      match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      match.company.toLowerCase().includes(searchQuery.toLowerCase())

    // Role/status filter
    let matchesFilter = true
    if (activeFilter === 'mentors') matchesFilter = match.role === 'mentor'
    if (activeFilter === 'mentees') matchesFilter = match.role === 'mentee'
    if (activeFilter === 'active') matchesFilter = match.status === 'active'
    if (activeFilter === 'inactive') matchesFilter = match.status === 'inactive'

    return matchesSearch && matchesFilter
  })

  // Calculate stats
  const totalMatches = mockMatches.length
  const activeMentors = mockMatches.filter(m => m.role === 'mentor' && m.status === 'active').length
  const activeMentees = mockMatches.filter(m => m.role === 'mentee' && m.status === 'active').length
  const totalUnread = mockMatches.reduce((sum, m) => sum + m.unreadMessages, 0)

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
                All ({mockMatches.length})
              </Button>
              <Button
                variant={activeFilter === 'mentors' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter('mentors')}
                className={activeFilter === 'mentors' ? 'bg-primary-accent text-primary-dark' : ''}
              >
                <Star className="h-4 w-4 mr-1" />
                Mentors ({mockMatches.filter(m => m.role === 'mentor').length})
              </Button>
              <Button
                variant={activeFilter === 'mentees' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter('mentees')}
                className={activeFilter === 'mentees' ? 'bg-secondary-accent text-white' : ''}
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                Mentees ({mockMatches.filter(m => m.role === 'mentee').length})
              </Button>
              <Button
                variant={activeFilter === 'active' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setActiveFilter('active')}
                className={activeFilter === 'active' ? 'bg-green-600 text-white' : ''}
              >
                Active ({mockMatches.filter(m => m.status === 'active').length})
              </Button>
            </div>
          </div>

          {/* Matches Grid */}
          {filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMatches.map((match) => (
                <Card key={match.id} className="shadow-md hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar
                        fallback={match.name}
                        size="lg"
                        className="flex-shrink-0 cursor-pointer"
                        onClick={() => router.push(`/profile/${match.userId}`)}
                      />
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
                          variant={match.role === 'mentor' ? 'primary' : 'secondary'}
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
                      {match.expertise.slice(0, 3).map((skill, index) => (
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

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  UserCheck,
  UserX,
  MessageSquare,
  TrendingUp,
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  Mail,
  Phone,
  Clock,
  Star,
  Activity,
  Calendar,
  BarChart3,
  Search,
  Filter,
  Download,
  AlertCircle,
  ExternalLink,
  Linkedin,
  Twitter,
  Instagram,
  Globe,
  Bell,
  Settings,
  Home
} from 'lucide-react'

// Mock data for pending approvals
const mockPendingApprovals = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+44 7700 900123',
    role: 'mentor',
    appliedDate: '2025-10-13',
    jobTitle: 'Senior Product Manager',
    company: 'Amazon',
    yearsExperience: '10-15',
    expertise: ['Product Strategy', 'Leadership', 'User Research'],
    hasConnectedSocial: false,
    socialMedia: {
      linkedin: 'https://linkedin.com/in/alexjohnson',
      twitter: null,
      instagram: null,
    },
    preferredNotification: 'email',
    avatar: null,
  },
  {
    id: 2,
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+44 7700 900456',
    role: 'mentor',
    appliedDate: '2025-10-13',
    jobTitle: 'Tech Lead',
    company: 'Google',
    yearsExperience: '10-15',
    expertise: ['React', 'Node.js', 'System Design', 'Team Management'],
    hasConnectedSocial: true,
    socialMedia: {
      linkedin: 'https://linkedin.com/in/mariagarcia',
      twitter: 'https://twitter.com/mariagarcia',
      instagram: 'https://instagram.com/mariagarcia',
    },
    preferredNotification: 'sms',
    avatar: null,
  },
  {
    id: 3,
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    phone: null,
    role: 'mentee',
    appliedDate: '2025-10-12',
    jobTitle: 'Junior Developer',
    company: 'Startup Inc',
    yearsExperience: '0-3',
    expertise: ['JavaScript', 'Career Development'],
    hasConnectedSocial: false,
    socialMedia: {
      linkedin: null,
      twitter: null,
      instagram: null,
    },
    preferredNotification: 'email',
    avatar: null,
  },
]

// Mock data for all users
const mockAllUsers = [
  {
    id: 1,
    name: 'Sarah Chen',
    email: 'sarah.chen@email.com',
    role: 'mentor',
    status: 'active',
    verified: true,
    joinedDate: '2025-09-15',
    lastActive: '2 hours ago',
    totalSessions: 24,
    rating: 4.9,
    avatar: null,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    email: 'michael.r@email.com',
    role: 'mentor',
    status: 'active',
    verified: true,
    joinedDate: '2025-09-20',
    lastActive: '1 day ago',
    totalSessions: 18,
    rating: 5.0,
    avatar: null,
  },
  {
    id: 3,
    name: 'Emily Thompson',
    email: 'emily.t@email.com',
    role: 'mentee',
    status: 'active',
    verified: false,
    joinedDate: '2025-10-01',
    lastActive: '5 hours ago',
    totalSessions: 8,
    rating: 4.8,
    avatar: null,
  },
]

// Mock analytics data
const analyticsData = {
  totalUsers: 1247,
  totalMentors: 428,
  totalMentees: 819,
  pendingApprovals: 3,
  activeSessions: 156,
  completedSessions: 3542,
  averageRating: 4.8,
  messagesExchanged: 28934,
}

// Mock message data for conversations
const mockConversations = [
  {
    id: 1,
    mentor: 'Sarah Chen',
    mentee: 'Michael Rodriguez',
    lastMessage: 'Thank you for the career advice!',
    timestamp: '2 min ago',
    messageCount: 24,
    messages: [
      {
        id: 1,
        sender: 'Michael Rodriguez',
        senderRole: 'mentee',
        content: 'Hi Sarah! Thanks for accepting my connection request. I\'m really excited to learn from you.',
        timestamp: '2025-10-12 09:00 AM',
        avatar: null,
      },
      {
        id: 2,
        sender: 'Sarah Chen',
        senderRole: 'mentor',
        content: 'Hi Michael! I\'m happy to help. Tell me a bit about your career goals and what you\'re hoping to achieve.',
        timestamp: '2025-10-12 09:15 AM',
        avatar: null,
      },
      {
        id: 3,
        sender: 'Michael Rodriguez',
        senderRole: 'mentee',
        content: 'I\'m currently a junior developer and I want to transition into a senior role within the next 2 years. I\'m particularly interested in improving my system design skills.',
        timestamp: '2025-10-12 09:30 AM',
        avatar: null,
      },
      {
        id: 4,
        sender: 'Sarah Chen',
        senderRole: 'mentor',
        content: 'That\'s a great goal! System design is crucial for senior roles. I recommend starting with understanding distributed systems fundamentals. Have you worked with microservices before?',
        timestamp: '2025-10-12 10:00 AM',
        avatar: null,
      },
      {
        id: 5,
        sender: 'Michael Rodriguez',
        senderRole: 'mentee',
        content: 'I\'ve read about them but haven\'t implemented any real projects yet. Do you have any resources you\'d recommend?',
        timestamp: '2025-10-12 10:15 AM',
        avatar: null,
      },
      {
        id: 6,
        sender: 'Sarah Chen',
        senderRole: 'mentor',
        content: 'Absolutely! I\'ll send you a list of books and online courses. Also, I think we should schedule a session to discuss your learning roadmap in detail.',
        timestamp: '2025-10-12 11:00 AM',
        avatar: null,
      },
      {
        id: 7,
        sender: 'Michael Rodriguez',
        senderRole: 'mentee',
        content: 'That would be amazing! When are you available next week?',
        timestamp: '2025-10-12 02:00 PM',
        avatar: null,
      },
      {
        id: 8,
        sender: 'Sarah Chen',
        senderRole: 'mentor',
        content: 'I\'m free Tuesday afternoon or Thursday morning. Which works better for you?',
        timestamp: '2025-10-12 03:30 PM',
        avatar: null,
      },
      {
        id: 9,
        sender: 'Michael Rodriguez',
        senderRole: 'mentee',
        content: 'Tuesday afternoon would be perfect! Looking forward to it.',
        timestamp: '2025-10-12 04:00 PM',
        avatar: null,
      },
      {
        id: 10,
        sender: 'Sarah Chen',
        senderRole: 'mentor',
        content: 'Great! I\'ve sent you a calendar invite for Tuesday at 2 PM. In the meantime, check out "Designing Data-Intensive Applications" by Martin Kleppmann.',
        timestamp: '2025-10-13 09:00 AM',
        avatar: null,
      },
      {
        id: 11,
        sender: 'Michael Rodriguez',
        senderRole: 'mentee',
        content: 'Thank you for the career advice!',
        timestamp: '2025-10-13 09:02 AM',
        avatar: null,
      },
    ],
  },
  {
    id: 2,
    mentor: 'Emily Thompson',
    mentee: 'David Kim',
    lastMessage: 'I appreciate your guidance on the project.',
    timestamp: '1 hour ago',
    messageCount: 15,
    messages: [
      {
        id: 1,
        sender: 'David Kim',
        senderRole: 'mentee',
        content: 'Hi Emily! I\'m working on a React project and running into some performance issues. Would you have time to help?',
        timestamp: '2025-10-12 02:00 PM',
        avatar: null,
      },
      {
        id: 2,
        sender: 'Emily Thompson',
        senderRole: 'mentor',
        content: 'Of course! Can you describe what kind of performance issues you\'re experiencing?',
        timestamp: '2025-10-12 02:15 PM',
        avatar: null,
      },
      {
        id: 3,
        sender: 'David Kim',
        senderRole: 'mentee',
        content: 'The app is really slow when rendering large lists. I\'m using map() to render about 1000 items.',
        timestamp: '2025-10-12 02:20 PM',
        avatar: null,
      },
      {
        id: 4,
        sender: 'Emily Thompson',
        senderRole: 'mentor',
        content: 'Ah, that\'s a common issue! You should implement virtualization. Have you heard of react-window or react-virtualized?',
        timestamp: '2025-10-12 02:30 PM',
        avatar: null,
      },
      {
        id: 5,
        sender: 'David Kim',
        senderRole: 'mentee',
        content: 'I\'ve heard of them but never used them. How do they work?',
        timestamp: '2025-10-12 02:45 PM',
        avatar: null,
      },
      {
        id: 6,
        sender: 'Emily Thompson',
        senderRole: 'mentor',
        content: 'They only render the items that are currently visible in the viewport, which drastically improves performance. Let me share some code examples with you.',
        timestamp: '2025-10-12 03:00 PM',
        avatar: null,
      },
      {
        id: 7,
        sender: 'David Kim',
        senderRole: 'mentee',
        content: 'That would be super helpful! Thank you so much.',
        timestamp: '2025-10-12 03:15 PM',
        avatar: null,
      },
      {
        id: 8,
        sender: 'Emily Thompson',
        senderRole: 'mentor',
        content: 'I\'ve sent you a CodeSandbox link with a working example. Try implementing it in your project and let me know how it goes!',
        timestamp: '2025-10-13 10:00 AM',
        avatar: null,
      },
      {
        id: 9,
        sender: 'David Kim',
        senderRole: 'mentee',
        content: 'I appreciate your guidance on the project.',
        timestamp: '2025-10-13 11:00 AM',
        avatar: null,
      },
    ],
  },
  {
    id: 3,
    mentor: 'Alex Johnson',
    mentee: 'Maria Garcia',
    lastMessage: 'Looking forward to our next session!',
    timestamp: '3 hours ago',
    messageCount: 8,
    messages: [
      {
        id: 1,
        sender: 'Maria Garcia',
        senderRole: 'mentee',
        content: 'Hi Alex! I just finished the product strategy course you recommended. It was incredibly insightful!',
        timestamp: '2025-10-11 03:00 PM',
        avatar: null,
      },
      {
        id: 2,
        sender: 'Alex Johnson',
        senderRole: 'mentor',
        content: 'That\'s wonderful to hear! What were your key takeaways from the course?',
        timestamp: '2025-10-11 04:00 PM',
        avatar: null,
      },
      {
        id: 3,
        sender: 'Maria Garcia',
        senderRole: 'mentee',
        content: 'I learned a lot about user research methodologies and how to validate product ideas before building them. I want to apply this to my current project.',
        timestamp: '2025-10-11 04:30 PM',
        avatar: null,
      },
      {
        id: 4,
        sender: 'Alex Johnson',
        senderRole: 'mentor',
        content: 'Excellent! User research is so important. What\'s your current project about?',
        timestamp: '2025-10-11 05:00 PM',
        avatar: null,
      },
      {
        id: 5,
        sender: 'Maria Garcia',
        senderRole: 'mentee',
        content: 'We\'re building a productivity app for remote teams. I want to make sure we\'re solving real problems, not just building features.',
        timestamp: '2025-10-12 09:00 AM',
        avatar: null,
      },
      {
        id: 6,
        sender: 'Alex Johnson',
        senderRole: 'mentor',
        content: 'Smart approach! Let\'s schedule a session to discuss your research plan. I can share some frameworks I\'ve used at Amazon.',
        timestamp: '2025-10-12 10:00 AM',
        avatar: null,
      },
      {
        id: 7,
        sender: 'Maria Garcia',
        senderRole: 'mentee',
        content: 'That would be amazing! How about next Wednesday?',
        timestamp: '2025-10-12 11:00 AM',
        avatar: null,
      },
      {
        id: 8,
        sender: 'Alex Johnson',
        senderRole: 'mentor',
        content: 'Wednesday works great! I\'ll send you a meeting invite.',
        timestamp: '2025-10-13 08:00 AM',
        avatar: null,
      },
      {
        id: 9,
        sender: 'Maria Garcia',
        senderRole: 'mentee',
        content: 'Looking forward to our next session!',
        timestamp: '2025-10-13 09:00 AM',
        avatar: null,
      },
    ],
  },
]

// Mock data for admin-user conversations
const mockAdminConversations = [
  {
    id: 1,
    userId: 1,
    userName: 'Sarah Chen',
    userRole: 'mentor',
    userEmail: 'sarah.chen@email.com',
    lastMessage: 'Thank you for approving my account!',
    timestamp: '1 hour ago',
    unread: false,
    messages: [
      {
        id: 1,
        sender: 'Sarah Chen',
        senderType: 'user',
        content: 'Hi Admin, I just signed up as a mentor. When will my account be approved?',
        timestamp: '2025-10-12 10:00 AM',
      },
      {
        id: 2,
        sender: 'Admin',
        senderType: 'admin',
        content: 'Hello Sarah! Thank you for signing up. I\'m reviewing your application now. I can see you have connected your LinkedIn profile, which is great!',
        timestamp: '2025-10-12 10:15 AM',
      },
      {
        id: 3,
        sender: 'Sarah Chen',
        senderType: 'user',
        content: 'Great! I\'m excited to start mentoring. I have over 10 years of experience in product management.',
        timestamp: '2025-10-12 10:20 AM',
      },
      {
        id: 4,
        sender: 'Admin',
        senderType: 'admin',
        content: 'That\'s fantastic! Your profile looks excellent. I\'ve just approved your account. You should receive an email confirmation shortly and can now start connecting with mentees.',
        timestamp: '2025-10-12 10:25 AM',
      },
      {
        id: 5,
        sender: 'Sarah Chen',
        senderType: 'user',
        content: 'Thank you for approving my account!',
        timestamp: '2025-10-12 11:00 AM',
      },
    ],
  },
  {
    id: 2,
    userId: 2,
    userName: 'Michael Rodriguez',
    userRole: 'mentee',
    userEmail: 'michael.r@email.com',
    lastMessage: 'Can you help me with a technical issue?',
    timestamp: '30 min ago',
    unread: true,
    messages: [
      {
        id: 1,
        sender: 'Michael Rodriguez',
        senderType: 'user',
        content: 'Hi Admin, I\'m having trouble uploading my profile picture. The upload button doesn\'t seem to work.',
        timestamp: '2025-10-13 09:00 AM',
      },
      {
        id: 2,
        sender: 'Admin',
        senderType: 'admin',
        content: 'Hi Michael, I\'m sorry to hear that. What file format are you trying to upload? We support JPG, PNG, and WEBP files up to 5MB.',
        timestamp: '2025-10-13 09:10 AM',
      },
      {
        id: 3,
        sender: 'Michael Rodriguez',
        senderType: 'user',
        content: 'I\'m trying to upload a PNG file that\'s about 2MB. It just shows a loading spinner and never completes.',
        timestamp: '2025-10-13 09:15 AM',
      },
      {
        id: 4,
        sender: 'Admin',
        senderType: 'admin',
        content: 'Let me check on this for you. It might be a temporary server issue. Can you try again in a few minutes? If it still doesn\'t work, I can manually upload it for you if you email it to support@look4mentors.com',
        timestamp: '2025-10-13 09:20 AM',
      },
      {
        id: 5,
        sender: 'Michael Rodriguez',
        senderType: 'user',
        content: 'Can you help me with a technical issue?',
        timestamp: '2025-10-13 09:30 AM',
      },
    ],
  },
  {
    id: 3,
    userId: 3,
    userName: 'Emily Thompson',
    userRole: 'mentee',
    userEmail: 'emily.t@email.com',
    lastMessage: 'I have a question about session scheduling',
    timestamp: '2 days ago',
    unread: false,
    messages: [
      {
        id: 1,
        sender: 'Emily Thompson',
        senderType: 'user',
        content: 'Hello! I\'m new to the platform. How do I schedule a session with a mentor?',
        timestamp: '2025-10-11 02:00 PM',
      },
      {
        id: 2,
        sender: 'Admin',
        senderType: 'admin',
        content: 'Welcome Emily! To schedule a session, first browse mentors and send a connection request. Once accepted, you can view their availability and book a time slot that works for both of you.',
        timestamp: '2025-10-11 02:15 PM',
      },
      {
        id: 3,
        sender: 'Emily Thompson',
        senderType: 'user',
        content: 'That makes sense! Do I need to pay for sessions?',
        timestamp: '2025-10-11 02:20 PM',
      },
      {
        id: 4,
        sender: 'Admin',
        senderType: 'admin',
        content: 'Our platform is completely free to use! Both mentors and mentees can connect and schedule sessions at no cost. We believe in making mentorship accessible to everyone.',
        timestamp: '2025-10-11 02:25 PM',
      },
      {
        id: 5,
        sender: 'Emily Thompson',
        senderType: 'user',
        content: 'I have a question about session scheduling',
        timestamp: '2025-10-11 03:00 PM',
      },
    ],
  },
  {
    id: 4,
    userName: 'Alex Johnson',
    userRole: 'mentor',
    userEmail: 'alex.johnson@email.com',
    lastMessage: 'I need to report inappropriate behavior',
    timestamp: '5 min ago',
    unread: true,
    messages: [
      {
        id: 1,
        sender: 'Alex Johnson',
        senderType: 'user',
        content: 'Hi Admin, I need to report a mentee who sent me inappropriate messages. This is serious and I\'m uncomfortable continuing our mentorship.',
        timestamp: '2025-10-13 11:00 AM',
      },
      {
        id: 2,
        sender: 'Admin',
        senderType: 'admin',
        content: 'Thank you for bringing this to my attention, Alex. This is very serious and I\'m sorry you experienced this. Can you please provide me with the mentee\'s name and any screenshots of the messages?',
        timestamp: '2025-10-13 11:05 AM',
      },
      {
        id: 3,
        sender: 'Alex Johnson',
        senderType: 'user',
        content: 'The mentee\'s name is John Doe. I have screenshots that I can email to you. This happened during our second session.',
        timestamp: '2025-10-13 11:10 AM',
      },
      {
        id: 4,
        sender: 'Admin',
        senderType: 'admin',
        content: 'Thank you. Please email the screenshots to safety@look4mentors.com immediately. I will investigate this and take appropriate action. Your safety is our top priority. I\'m suspending this user\'s account pending investigation.',
        timestamp: '2025-10-13 11:15 AM',
      },
      {
        id: 5,
        sender: 'Alex Johnson',
        senderType: 'user',
        content: 'I need to report inappropriate behavior',
        timestamp: '2025-10-13 11:20 AM',
      },
    ],
  },
]

type Tab = 'overview' | 'pending' | 'users' | 'messages' | 'admin-messages' | 'analytics' | 'settings'

export default function AdministrationPage() {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [showConversationModal, setShowConversationModal] = useState(false)
  const [selectedAdminConversation, setSelectedAdminConversation] = useState<any>(null)
  const [adminMessageText, setAdminMessageText] = useState('')

  const handleApproveUser = (userId: number, userName: string, preferredNotification: string) => {
    if (confirm(`Approve ${userName}? They will receive a ${preferredNotification === 'email' ? 'email' : 'SMS'} notification and be able to log in.`)) {
      // In production, this would call the backend API
      console.log('Approving user:', userId)
      alert(`✓ ${userName} has been approved! ${preferredNotification === 'email' ? 'Email' : 'SMS'} notification sent.`)
      // Remove from pending list (in production, refetch data)
    }
  }

  const handleDenyUser = (userId: number, userName: string) => {
    const reason = prompt(`Deny ${userName}'s application? Please provide a reason (optional):`)
    if (reason !== null) {
      // In production, this would call the backend API
      console.log('Denying user:', userId, 'Reason:', reason)
      alert(`✗ ${userName}'s application has been denied.`)
      // Remove from pending list (in production, refetch data)
    }
  }

  const handleViewProfile = (user: any) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const handleToggleVerification = (userId: number, userName: string, currentStatus: boolean) => {
    if (confirm(`${currentStatus ? 'Remove' : 'Grant'} verification badge for ${userName}?`)) {
      console.log('Toggle verification for user:', userId)
      alert(`${currentStatus ? '✗ Removed' : '✓ Granted'} verification badge for ${userName}`)
    }
  }

  const handleSuspendUser = (userId: number, userName: string) => {
    if (confirm(`Suspend ${userName}'s account? They will not be able to log in until reactivated.`)) {
      console.log('Suspending user:', userId)
      alert(`${userName}'s account has been suspended.`)
    }
  }

  const handleViewConversation = (conversation: any) => {
    setSelectedConversation(conversation)
    setShowConversationModal(true)
  }

  const handleSendAdminMessage = () => {
    if (!adminMessageText.trim() || !selectedAdminConversation) return

    // In production, this would call the backend API
    console.log('Sending admin message:', adminMessageText, 'to:', selectedAdminConversation.userName)
    alert(`Message sent to ${selectedAdminConversation.userName}: "${adminMessageText}"`)
    setAdminMessageText('')
  }

  const handleStartConversationWithUser = (user: any) => {
    // Find existing conversation or create new one
    const existingConv = mockAdminConversations.find(
      (conv) => conv.userName === user.name
    )

    if (existingConv) {
      setSelectedAdminConversation(existingConv)
    } else {
      // Create new conversation object
      const newConv = {
        id: mockAdminConversations.length + 1,
        userId: user.id,
        userName: user.name,
        userRole: user.role,
        userEmail: user.email,
        lastMessage: '',
        timestamp: 'Now',
        unread: false,
        messages: [],
      }
      setSelectedAdminConversation(newConv)
    }

    setActiveTab('admin-messages')
    setShowUserModal(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Admin Header */}
      <section className="bg-primary-dark pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="default" className="bg-red-600 text-white border-red-600">
                  <Shield className="mr-1 h-3 w-3" />
                  Admin Access
                </Badge>
                <Badge variant="outline" className="border-primary-accent text-primary-accent">
                  {mockPendingApprovals.length} Pending Approvals
                </Badge>
              </div>
              <h1 className="text-3xl font-black font-montserrat text-white sm:text-4xl">
                Administration Dashboard
              </h1>
              <p className="mt-2 text-white/80 font-montserrat">
                Manage users, approvals, and platform analytics
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                <Home className="mr-2 h-4 w-4" />
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0">
            <Button
              variant={activeTab === 'overview' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('overview')}
              className={`snap-start flex-shrink-0 min-h-[44px] ${activeTab === 'overview' ? 'bg-primary-accent text-primary-dark' : ''}`}
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Overview
            </Button>
            <Button
              variant={activeTab === 'pending' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('pending')}
              className={`snap-start flex-shrink-0 min-h-[44px] ${activeTab === 'pending' ? 'bg-secondary-accent text-white' : ''}`}
            >
              <Bell className="h-4 w-4 mr-1" />
              Pending ({mockPendingApprovals.length})
            </Button>
            <Button
              variant={activeTab === 'users' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('users')}
              className={`snap-start flex-shrink-0 min-h-[44px] ${activeTab === 'users' ? 'bg-primary-accent text-primary-dark' : ''}`}
            >
              <Users className="h-4 w-4 mr-1" />
              All Users
            </Button>
            <Button
              variant={activeTab === 'messages' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('messages')}
              className={`snap-start flex-shrink-0 min-h-[44px] ${activeTab === 'messages' ? 'bg-primary-accent text-primary-dark' : ''}`}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Messages
            </Button>
            <Button
              variant={activeTab === 'admin-messages' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('admin-messages')}
              className={`snap-start flex-shrink-0 min-h-[44px] ${activeTab === 'admin-messages' ? 'bg-vibrant-accent text-white' : ''}`}
            >
              <Mail className="h-4 w-4 mr-1" />
              Admin Messages
              {mockAdminConversations.filter(c => c.unread).length > 0 && (
                <Badge variant="secondary" size="sm" className="ml-1 bg-red-600 text-white">
                  {mockAdminConversations.filter(c => c.unread).length}
                </Badge>
              )}
            </Button>
            <Button
              variant={activeTab === 'analytics' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('analytics')}
              className={`snap-start flex-shrink-0 min-h-[44px] ${activeTab === 'analytics' ? 'bg-primary-accent text-primary-dark' : ''}`}
            >
              <TrendingUp className="h-4 w-4 mr-1" />
              Analytics
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('settings')}
              className={`snap-start flex-shrink-0 min-h-[44px] ${activeTab === 'settings' ? 'bg-primary-accent text-primary-dark' : ''}`}
            >
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-montserrat text-neutral-600 mb-1">Total Users</p>
                        <p className="text-3xl font-black font-montserrat text-primary-dark">
                          {analyticsData.totalUsers.toLocaleString()}
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-primary-accent/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-montserrat text-neutral-600 mb-1">Mentors</p>
                        <p className="text-3xl font-black font-montserrat text-secondary-accent">
                          {analyticsData.totalMentors}
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-secondary-accent/10 rounded-full flex items-center justify-center">
                        <UserCheck className="h-6 w-6 text-secondary-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-montserrat text-neutral-600 mb-1">Pending Approvals</p>
                        <p className="text-3xl font-black font-montserrat text-warning">
                          {analyticsData.pendingApprovals}
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-warning/10 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-warning" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-montserrat text-neutral-600 mb-1">Mentees</p>
                        <p className="text-3xl font-black font-montserrat text-primary-accent">
                          {analyticsData.totalMentees}
                        </p>
                      </div>
                      <div className="h-12 w-12 bg-primary-accent/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary-accent" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-primary-accent" />
                      Recent Signups
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockPendingApprovals.slice(0, 3).map((user) => (
                        <div key={user.id} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                          <Avatar fallback={user.name} size="sm" />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold font-montserrat text-primary-dark text-sm">
                              {user.name}
                            </p>
                            <p className="text-xs text-neutral-600 font-montserrat">
                              {user.role === 'mentor' ? 'Mentor' : 'Mentee'} • {user.appliedDate}
                            </p>
                          </div>
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                            Pending
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-secondary-accent" />
                      Platform Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-montserrat text-neutral-600">Active Sessions</span>
                        <span className="text-lg font-black font-montserrat text-primary-dark">
                          {analyticsData.activeSessions}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-montserrat text-neutral-600">Completed Sessions</span>
                        <span className="text-lg font-black font-montserrat text-primary-dark">
                          {analyticsData.completedSessions.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-montserrat text-neutral-600">Messages Exchanged</span>
                        <span className="text-lg font-black font-montserrat text-primary-dark">
                          {analyticsData.messagesExchanged.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Pending Approvals Tab */}
          {activeTab === 'pending' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                    Pending Approvals
                  </h2>
                  <p className="text-neutral-600 font-montserrat mt-1">
                    Review and approve new mentor and mentee applications
                  </p>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  {mockPendingApprovals.length} Pending
                </Badge>
              </div>

              <div className="space-y-4">
                {mockPendingApprovals.map((user) => (
                  <Card key={user.id} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        {/* Avatar */}
                        <Avatar fallback={user.name} size="lg" className="flex-shrink-0" />

                        {/* User Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-bold font-montserrat text-primary-dark">
                                  {user.name}
                                </h3>
                                <Badge
                                  variant="secondary"
                                  className={user.role === 'mentor' ? 'bg-secondary-accent text-white' : 'bg-primary-accent text-primary-dark'}
                                >
                                  {user.role === 'mentor' ? 'Mentor' : 'Mentee'}
                                </Badge>
                                {user.hasConnectedSocial && (
                                  <Badge variant="default" className="bg-green-100 text-green-700 border-green-300">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Social Connected
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm font-semibold text-neutral-700 font-montserrat">
                                {user.jobTitle} at {user.company}
                              </p>
                              <p className="text-xs text-neutral-500 font-montserrat mt-1">
                                Applied: {new Date(user.appliedDate).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center gap-2 text-sm text-neutral-600 font-montserrat">
                              <Mail className="h-4 w-4 text-primary-accent" />
                              {user.email}
                            </div>
                            {user.phone && (
                              <div className="flex items-center gap-2 text-sm text-neutral-600 font-montserrat">
                                <Phone className="h-4 w-4 text-primary-accent" />
                                {user.phone}
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm text-neutral-600 font-montserrat">
                              <Bell className="h-4 w-4 text-primary-accent" />
                              Prefers {user.preferredNotification === 'email' ? 'Email' : 'SMS'}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-600 font-montserrat">
                              <Clock className="h-4 w-4 text-primary-accent" />
                              {user.yearsExperience} years experience
                            </div>
                          </div>

                          {/* Expertise */}
                          <div className="mb-4">
                            <p className="text-xs font-semibold text-neutral-500 font-montserrat mb-2 uppercase">
                              Expertise
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {user.expertise.map((skill, idx) => (
                                <Badge key={idx} variant="outline" className="border-primary-accent/30 text-primary-accent">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Social Media */}
                          {(user.socialMedia.linkedin || user.socialMedia.twitter || user.socialMedia.instagram) && (
                            <div className="mb-4">
                              <p className="text-xs font-semibold text-neutral-500 font-montserrat mb-2 uppercase">
                                Social Media
                              </p>
                              <div className="flex items-center gap-3">
                                {user.socialMedia.linkedin && (
                                  <a
                                    href={user.socialMedia.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-accent hover:text-primary-accent/80"
                                  >
                                    <Linkedin className="h-5 w-5" />
                                  </a>
                                )}
                                {user.socialMedia.twitter && (
                                  <a
                                    href={user.socialMedia.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-accent hover:text-primary-accent/80"
                                  >
                                    <Twitter className="h-5 w-5" />
                                  </a>
                                )}
                                {user.socialMedia.instagram && (
                                  <a
                                    href={user.socialMedia.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary-accent hover:text-primary-accent/80"
                                  >
                                    <Instagram className="h-5 w-5" />
                                  </a>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Auto-Approval Notice */}
                          {user.hasConnectedSocial && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                              <div className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <p className="text-sm font-semibold text-green-800 font-montserrat">
                                    Eligible for Auto-Approval
                                  </p>
                                  <p className="text-xs text-green-700 font-montserrat mt-1">
                                    This user has connected their social media accounts and can be auto-approved for immediate access.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Action Buttons */}
                          <div className="flex flex-wrap gap-3">
                            <Button
                              variant="primary"
                              onClick={() => handleApproveUser(user.id, user.name, user.preferredNotification)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve & Notify
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleDenyUser(user.id, user.name)}
                              className="border-red-600 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Deny Application
                            </Button>
                            <Button
                              variant="ghost"
                              onClick={() => handleViewProfile(user)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Full Profile
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {mockPendingApprovals.length === 0 && (
                  <Card className="shadow-lg">
                    <CardContent className="p-12 text-center">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-bold font-montserrat text-neutral-700 mb-2">
                        All Caught Up!
                      </h3>
                      <p className="text-neutral-500 font-montserrat">
                        There are no pending approvals at this time.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* All Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                    All Users
                  </h2>
                  <p className="text-neutral-600 font-montserrat mt-1">
                    Manage user accounts and verification status
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border-2 border-neutral-200 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {mockAllUsers.map((user) => (
                  <Card key={user.id} className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <Avatar fallback={user.name} size="md" className="flex-shrink-0" />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold font-montserrat text-primary-dark">
                              {user.name}
                            </h3>
                            {user.verified && (
                              <Badge variant="default" className="bg-primary-accent text-primary-dark">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <Badge
                              variant="secondary"
                              className={user.role === 'mentor' ? 'bg-secondary-accent text-white' : 'bg-neutral-200 text-neutral-700'}
                            >
                              {user.role === 'mentor' ? 'Mentor' : 'Mentee'}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className={user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                            >
                              {user.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-neutral-600 font-montserrat">
                            {user.email}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-neutral-500 font-montserrat">
                            <span>Joined {user.joinedDate}</span>
                            <span>•</span>
                            <span>Last active {user.lastActive}</span>
                            <span>•</span>
                            <span>{user.totalSessions} sessions</span>
                            {user.rating && (
                              <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                                  <span>{user.rating}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleVerification(user.id, user.name, user.verified)}
                          >
                            <Shield className="h-4 w-4 mr-1" />
                            {user.verified ? 'Remove Badge' : 'Verify'}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewProfile(user)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSuspendUser(user.id, user.name)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Suspend
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Messages Tab */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                    Platform Messages
                  </h2>
                  <p className="text-neutral-600 font-montserrat mt-1">
                    Monitor all platform conversations for safety and compliance
                  </p>
                </div>
                <Badge variant="secondary" className="bg-primary-accent/10 text-primary-accent">
                  {analyticsData.messagesExchanged.toLocaleString()} total messages
                </Badge>
              </div>

              {/* Mock Conversations */}
              <div className="space-y-4">
                {mockConversations.map((conversation) => (
                  <Card key={conversation.id} className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="flex -space-x-2">
                          <Avatar fallback={conversation.mentor} size="sm" className="border-2 border-white" />
                          <Avatar fallback={conversation.mentee} size="sm" className="border-2 border-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold font-montserrat text-primary-dark text-sm">
                              {conversation.mentor} <span className="text-neutral-500">↔</span> {conversation.mentee}
                            </p>
                            <Badge variant="outline" size="sm">
                              {conversation.messages.length} messages
                            </Badge>
                          </div>
                          <p className="text-sm text-neutral-600 font-montserrat truncate">
                            {conversation.lastMessage}
                          </p>
                          <p className="text-xs text-neutral-400 font-montserrat mt-1">
                            {conversation.timestamp}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewConversation(conversation)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Admin Messages Tab */}
          {activeTab === 'admin-messages' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[calc(100vh-280px)]">
              {/* Conversations List */}
              <div className={`lg:col-span-1 lg:border-r border-neutral-200 ${selectedAdminConversation ? 'hidden lg:block' : 'block'}`}>
                <div className="space-y-2 pr-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold font-montserrat text-primary-dark">
                      Conversations
                    </h2>
                    <Badge variant="secondary" className="bg-red-600 text-white">
                      {mockAdminConversations.filter(c => c.unread).length} Unread
                    </Badge>
                  </div>
                  <div className="space-y-2 max-h-[calc(100vh-350px)] overflow-y-auto">
                    {mockAdminConversations.map((conversation) => (
                      <Card
                        key={conversation.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedAdminConversation?.id === conversation.id
                            ? 'ring-2 ring-vibrant-accent shadow-md'
                            : conversation.unread
                            ? 'bg-blue-50'
                            : ''
                        }`}
                        onClick={() => setSelectedAdminConversation(conversation)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Avatar fallback={conversation.userName} size="sm" className="flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <p className={`text-sm font-montserrat ${conversation.unread ? 'font-bold' : 'font-semibold'} text-primary-dark truncate`}>
                                  {conversation.userName}
                                </p>
                                {conversation.unread && (
                                  <div className="h-2 w-2 bg-red-600 rounded-full flex-shrink-0" />
                                )}
                              </div>
                              <Badge variant="outline" size="sm" className={conversation.userRole === 'mentor' ? 'bg-secondary-accent/10 text-secondary-accent border-secondary-accent/30' : 'bg-primary-accent/10 text-primary-accent border-primary-accent/30'}>
                                {conversation.userRole === 'mentor' ? 'Mentor' : 'Mentee'}
                              </Badge>
                              <p className="text-xs text-neutral-600 font-montserrat truncate mt-1">
                                {conversation.lastMessage}
                              </p>
                              <p className="text-xs text-neutral-400 font-montserrat mt-1">
                                {conversation.timestamp}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message Thread & Composer */}
              <div className={`lg:col-span-2 flex flex-col ${selectedAdminConversation ? 'block' : 'hidden lg:block'}`}>
                {selectedAdminConversation ? (
                  <>
                    {/* Conversation Header */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-neutral-200">
                      <div className="flex items-center gap-3">
                        {/* Back button for mobile */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedAdminConversation(null)}
                          className="lg:hidden"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                        <Avatar fallback={selectedAdminConversation.userName} size="md" />
                        <div>
                          <h3 className="text-lg font-bold font-montserrat text-primary-dark">
                            {selectedAdminConversation.userName}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" size="sm" className={selectedAdminConversation.userRole === 'mentor' ? 'bg-secondary-accent/10 text-secondary-accent' : 'bg-primary-accent/10 text-primary-accent'}>
                              {selectedAdminConversation.userRole === 'mentor' ? 'Mentor' : 'Mentee'}
                            </Badge>
                            <span className="text-xs text-neutral-600 font-montserrat">
                              {selectedAdminConversation.userEmail}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 max-h-[calc(100vh-550px)]">
                      {selectedAdminConversation.messages.length > 0 ? (
                        selectedAdminConversation.messages.map((message: any) => {
                          const isAdmin = message.senderType === 'admin'
                          return (
                            <div
                              key={message.id}
                              className={`flex gap-3 ${isAdmin ? 'flex-row-reverse' : 'flex-row'}`}
                            >
                              <Avatar
                                fallback={message.sender}
                                size="sm"
                                className="flex-shrink-0"
                              />
                              <div className={`flex-1 max-w-[75%] ${isAdmin ? 'flex flex-col items-end' : ''}`}>
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="text-sm font-semibold font-montserrat text-primary-dark">
                                    {message.sender}
                                  </p>
                                  <Badge
                                    variant="secondary"
                                    size="sm"
                                    className={isAdmin ? 'bg-vibrant-accent text-white' : 'bg-neutral-200 text-neutral-700'}
                                  >
                                    {isAdmin ? 'Admin' : selectedAdminConversation.userRole}
                                  </Badge>
                                </div>
                                <div
                                  className={`rounded-2xl p-4 ${
                                    isAdmin
                                      ? 'bg-vibrant-accent text-white rounded-tr-none'
                                      : 'bg-neutral-100 rounded-tl-none'
                                  }`}
                                >
                                  <p className={`text-sm font-montserrat ${isAdmin ? 'text-white' : 'text-neutral-800'}`}>
                                    {message.content}
                                  </p>
                                </div>
                                <p className="text-xs text-neutral-400 font-montserrat mt-1">
                                  {message.timestamp}
                                </p>
                              </div>
                            </div>
                          )
                        })
                      ) : (
                        <div className="flex items-center justify-center h-full text-center">
                          <div>
                            <Mail className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                            <p className="text-neutral-500 font-montserrat">
                              No messages yet. Start the conversation below.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Message Composer */}
                    <div className="border-t border-neutral-200 pt-4">
                      <div className="flex gap-3">
                        <textarea
                          value={adminMessageText}
                          onChange={(e) => setAdminMessageText(e.target.value)}
                          placeholder={`Send a message to ${selectedAdminConversation.userName}...`}
                          className="flex-1 p-3 border-2 border-neutral-200 rounded-lg font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-vibrant-accent focus:border-vibrant-accent resize-none"
                          rows={3}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault()
                              handleSendAdminMessage()
                            }
                          }}
                        />
                        <Button
                          variant="primary"
                          className="bg-vibrant-accent hover:bg-vibrant-accent/90 text-white self-end"
                          onClick={handleSendAdminMessage}
                          disabled={!adminMessageText.trim()}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Send
                        </Button>
                      </div>
                      <p className="text-xs text-neutral-500 font-montserrat mt-2">
                        Press Enter to send, Shift+Enter for new line
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-center">
                    <div>
                      <MessageSquare className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold font-montserrat text-neutral-600 mb-2">
                        Select a Conversation
                      </h3>
                      <p className="text-neutral-500 font-montserrat">
                        Choose a conversation from the list to view and respond to messages
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                Platform Analytics
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-lg">
                      <p className="text-neutral-500 font-montserrat">Chart placeholder - integrate analytics library</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Session Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-lg">
                      <p className="text-neutral-500 font-montserrat">Chart placeholder - integrate analytics library</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                Admin Settings
              </h2>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Approval Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="font-semibold font-montserrat text-primary-dark">
                        Auto-approve users with social media
                      </p>
                      <p className="text-sm text-neutral-600 font-montserrat mt-1">
                        Automatically approve users who connect their social media accounts during signup
                      </p>
                    </div>
                    <input type="checkbox" className="h-5 w-5 cursor-pointer" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <p className="font-semibold font-montserrat text-primary-dark">
                        Email notifications for new signups
                      </p>
                      <p className="text-sm text-neutral-600 font-montserrat mt-1">
                        Receive email notifications when new users sign up
                      </p>
                    </div>
                    <input type="checkbox" className="h-5 w-5 cursor-pointer" defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Profile View Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-none md:rounded-3xl shadow-2xl max-w-3xl w-full h-full md:h-auto md:max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 p-4 md:p-6 rounded-none md:rounded-t-3xl z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold font-montserrat text-primary-dark">
                  User Profile
                </h2>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <XCircle className="h-6 w-6 text-neutral-600" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* User Header */}
              <div className="flex items-start gap-6">
                <Avatar
                  fallback={selectedUser.name}
                  size="lg"
                  className="flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="text-2xl font-bold font-montserrat text-primary-dark">
                      {selectedUser.name}
                    </h3>
                    {selectedUser.verified !== undefined && selectedUser.verified && (
                      <Badge variant="default" className="bg-primary-accent text-primary-dark">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    <Badge
                      variant="secondary"
                      className={selectedUser.role === 'mentor' ? 'bg-secondary-accent text-white' : 'bg-primary-accent text-primary-dark'}
                    >
                      {selectedUser.role === 'mentor' ? 'Mentor' : 'Mentee'}
                    </Badge>
                    {selectedUser.status && (
                      <Badge
                        variant="secondary"
                        className={selectedUser.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                      >
                        {selectedUser.status}
                      </Badge>
                    )}
                    {selectedUser.hasConnectedSocial && (
                      <Badge variant="default" className="bg-green-100 text-green-700 border-green-300">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Social Connected
                      </Badge>
                    )}
                  </div>
                  {selectedUser.jobTitle && selectedUser.company && (
                    <p className="text-base font-semibold text-neutral-700 font-montserrat">
                      {selectedUser.jobTitle} at {selectedUser.company}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-primary-accent" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 font-montserrat">Email</p>
                      <p className="text-sm font-semibold text-primary-dark font-montserrat">
                        {selectedUser.email}
                      </p>
                    </div>
                  </div>
                  {selectedUser.phone && (
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 font-montserrat">Phone</p>
                        <p className="text-sm font-semibold text-primary-dark font-montserrat">
                          {selectedUser.phone}
                        </p>
                      </div>
                    </div>
                  )}
                  {selectedUser.preferredNotification && (
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bell className="h-5 w-5 text-primary-accent" />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-500 font-montserrat">Preferred Notification</p>
                        <p className="text-sm font-semibold text-primary-dark font-montserrat">
                          {selectedUser.preferredNotification === 'email' ? 'Email' : 'SMS'}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Experience & Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedUser.yearsExperience && (
                  <Card className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-secondary-accent" />
                        <div>
                          <p className="text-xs text-neutral-500 font-montserrat">Experience</p>
                          <p className="text-sm font-semibold text-primary-dark font-montserrat">
                            {selectedUser.yearsExperience} years
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {selectedUser.totalSessions !== undefined && (
                  <Card className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-secondary-accent" />
                        <div>
                          <p className="text-xs text-neutral-500 font-montserrat">Total Sessions</p>
                          <p className="text-sm font-semibold text-primary-dark font-montserrat">
                            {selectedUser.totalSessions}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {selectedUser.rating && (
                  <Card className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Star className="h-5 w-5 text-warning fill-warning" />
                        <div>
                          <p className="text-xs text-neutral-500 font-montserrat">Rating</p>
                          <p className="text-sm font-semibold text-primary-dark font-montserrat">
                            {selectedUser.rating} / 5.0
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {selectedUser.appliedDate && (
                  <Card className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-secondary-accent" />
                        <div>
                          <p className="text-xs text-neutral-500 font-montserrat">Applied Date</p>
                          <p className="text-sm font-semibold text-primary-dark font-montserrat">
                            {new Date(selectedUser.appliedDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {selectedUser.joinedDate && (
                  <Card className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-secondary-accent" />
                        <div>
                          <p className="text-xs text-neutral-500 font-montserrat">Joined Date</p>
                          <p className="text-sm font-semibold text-primary-dark font-montserrat">
                            {selectedUser.joinedDate}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                {selectedUser.lastActive && (
                  <Card className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-xs text-neutral-500 font-montserrat">Last Active</p>
                          <p className="text-sm font-semibold text-primary-dark font-montserrat">
                            {selectedUser.lastActive}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Expertise */}
              {selectedUser.expertise && selectedUser.expertise.length > 0 && (
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedUser.expertise.map((skill: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="border-primary-accent/30 text-primary-accent">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Social Media */}
              {selectedUser.socialMedia && (selectedUser.socialMedia.linkedin || selectedUser.socialMedia.twitter || selectedUser.socialMedia.instagram) && (
                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Social Media</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      {selectedUser.socialMedia.linkedin && (
                        <a
                          href={selectedUser.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-primary-accent/10 rounded-lg hover:bg-primary-accent/20 transition-colors"
                        >
                          <Linkedin className="h-5 w-5 text-primary-accent" />
                          <span className="text-sm font-semibold text-primary-accent font-montserrat">LinkedIn</span>
                          <ExternalLink className="h-3 w-3 text-primary-accent" />
                        </a>
                      )}
                      {selectedUser.socialMedia.twitter && (
                        <a
                          href={selectedUser.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-primary-accent/10 rounded-lg hover:bg-primary-accent/20 transition-colors"
                        >
                          <Twitter className="h-5 w-5 text-primary-accent" />
                          <span className="text-sm font-semibold text-primary-accent font-montserrat">Twitter</span>
                          <ExternalLink className="h-3 w-3 text-primary-accent" />
                        </a>
                      )}
                      {selectedUser.socialMedia.instagram && (
                        <a
                          href={selectedUser.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-primary-accent/10 rounded-lg hover:bg-primary-accent/20 transition-colors"
                        >
                          <Instagram className="h-5 w-5 text-primary-accent" />
                          <span className="text-sm font-semibold text-primary-accent font-montserrat">Instagram</span>
                          <ExternalLink className="h-3 w-3 text-primary-accent" />
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Auto-Approval Notice */}
              {selectedUser.hasConnectedSocial && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-800 font-montserrat">
                        Eligible for Auto-Approval
                      </p>
                      <p className="text-xs text-green-700 font-montserrat mt-1">
                        This user has connected their social media accounts and can be auto-approved for immediate access.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-neutral-200">
                {selectedUser.appliedDate && (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleApproveUser(selectedUser.id, selectedUser.name, selectedUser.preferredNotification)
                        setShowUserModal(false)
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve & Notify
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleDenyUser(selectedUser.id, selectedUser.name)
                        setShowUserModal(false)
                      }}
                      className="border-red-600 text-red-600 hover:bg-red-50"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Deny Application
                    </Button>
                  </>
                )}
                {selectedUser.verified !== undefined && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleToggleVerification(selectedUser.id, selectedUser.name, selectedUser.verified)
                      setShowUserModal(false)
                    }}
                    className="border-primary-accent text-primary-accent hover:bg-primary-accent/10"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    {selectedUser.verified ? 'Remove Verification' : 'Grant Verification'}
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => {
                    handleSuspendUser(selectedUser.id, selectedUser.name)
                    setShowUserModal(false)
                  }}
                  className="border-red-600 text-red-600 hover:bg-red-50"
                >
                  <UserX className="mr-2 h-4 w-4" />
                  Suspend Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conversation View Modal */}
      {showConversationModal && selectedConversation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-none md:rounded-3xl shadow-2xl max-w-4xl w-full h-full md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-neutral-200 p-4 md:p-6 rounded-none md:rounded-t-3xl flex-shrink-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <Avatar fallback={selectedConversation.mentor} size="md" className="border-2 border-white" />
                    <Avatar fallback={selectedConversation.mentee} size="md" className="border-2 border-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-montserrat text-primary-dark">
                      {selectedConversation.mentor} <span className="text-neutral-400">↔</span> {selectedConversation.mentee}
                    </h2>
                    <p className="text-sm text-neutral-600 font-montserrat">
                      {selectedConversation.messages.length} messages • Last: {selectedConversation.timestamp}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowConversationModal(false)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <XCircle className="h-6 w-6 text-neutral-600" />
                </button>
              </div>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {selectedConversation.messages.map((message: any) => {
                const isMentor = message.senderRole === 'mentor'
                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${isMentor ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <Avatar
                      fallback={message.sender}
                      size="sm"
                      className="flex-shrink-0"
                    />
                    <div className={`flex-1 max-w-[70%] ${isMentor ? '' : 'flex flex-col items-end'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold font-montserrat text-primary-dark">
                          {message.sender}
                        </p>
                        <Badge
                          variant="secondary"
                          size="sm"
                          className={isMentor ? 'bg-secondary-accent text-white' : 'bg-primary-accent text-primary-dark'}
                        >
                          {isMentor ? 'Mentor' : 'Mentee'}
                        </Badge>
                      </div>
                      <div
                        className={`rounded-2xl p-4 ${
                          isMentor
                            ? 'bg-neutral-100 rounded-tl-none'
                            : 'bg-primary-accent text-primary-dark rounded-tr-none'
                        }`}
                      >
                        <p className={`text-sm font-montserrat ${isMentor ? 'text-neutral-800' : 'text-primary-dark'}`}>
                          {message.content}
                        </p>
                      </div>
                      <p className="text-xs text-neutral-400 font-montserrat mt-1">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Modal Footer - Admin Actions */}
            <div className="border-t border-neutral-200 p-4 md:p-6 bg-neutral-50 rounded-none md:rounded-b-3xl flex-shrink-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-neutral-600 font-montserrat">
                  <AlertCircle className="h-4 w-4" />
                  <span>Monitor for policy violations, inappropriate content, or safety concerns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Flag
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

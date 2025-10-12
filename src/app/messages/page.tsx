'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  ArrowLeft,
  Star,
  Archive,
  Trash2,
  CheckCheck,
  Check,
  Info,
  Flag,
  Ban
} from 'lucide-react'

// Mock conversations data
const conversations = [
  {
    id: 1,
    user: {
      name: 'Michael Chen',
      role: 'mentee',
      title: 'Aspiring UX Designer',
      avatar: null,
      rating: 4.8,
    },
    lastMessage: 'Thank you so much for the advice on portfolio building! I\'ve started implementing your suggestions.',
    timestamp: '2 min ago',
    unread: 3,
    isOnline: true,
  },
  {
    id: 2,
    user: {
      name: 'Emily Rodriguez',
      role: 'mentor',
      title: 'Product Manager at Amazon',
      avatar: null,
      rating: 4.9,
    },
    lastMessage: 'I\'d love to schedule our next session. Are you available next Tuesday?',
    timestamp: '1 hour ago',
    unread: 1,
    isOnline: false,
  },
  {
    id: 3,
    user: {
      name: 'David Kim',
      role: 'mentee',
      title: 'Career Changer',
      avatar: null,
      rating: 4.7,
    },
    lastMessage: 'Perfect! I\'ll prepare some questions for our call tomorrow.',
    timestamp: '3 hours ago',
    unread: 0,
    isOnline: false,
  },
  {
    id: 4,
    user: {
      name: 'Sarah Thompson',
      role: 'mentee',
      title: 'Recent Graduate',
      avatar: null,
      rating: 4.6,
    },
    lastMessage: 'Your insights on networking were incredibly helpful!',
    timestamp: 'Yesterday',
    unread: 0,
    isOnline: false,
  },
  {
    id: 5,
    user: {
      name: 'James Wilson',
      role: 'mentor',
      title: 'Senior Data Scientist',
      avatar: null,
      rating: 5.0,
    },
    lastMessage: 'Looking forward to our first session!',
    timestamp: '2 days ago',
    unread: 0,
    isOnline: true,
  },
]

// Mock messages for selected conversation
const mockMessages = [
  {
    id: 1,
    senderId: 2,
    senderName: 'Michael Chen',
    content: 'Hi! Thanks for accepting my request to connect. I\'m really excited to learn from you.',
    timestamp: '10:30 AM',
    isRead: true,
  },
  {
    id: 2,
    senderId: 1,
    senderName: 'You',
    content: 'Welcome, Michael! I\'m happy to help you on your journey. What are your main goals right now?',
    timestamp: '10:35 AM',
    isRead: true,
  },
  {
    id: 3,
    senderId: 2,
    senderName: 'Michael Chen',
    content: 'I\'m transitioning into UX design and want to build a strong portfolio. I have some design projects but I\'m not sure how to present them effectively.',
    timestamp: '10:40 AM',
    isRead: true,
  },
  {
    id: 4,
    senderId: 1,
    senderName: 'You',
    content: 'That\'s a great focus! Portfolio presentation is crucial. I recommend starting with 3-5 of your best projects and creating detailed case studies for each. Show your process, not just the final designs.',
    timestamp: '10:45 AM',
    isRead: true,
  },
  {
    id: 5,
    senderId: 2,
    senderName: 'Michael Chen',
    content: 'Thank you so much for the advice on portfolio building! I\'ve started implementing your suggestions.',
    timestamp: '11:02 AM',
    isRead: true,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messageText, setMessageText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileConversationOpen, setIsMobileConversationOpen] = useState(false)
  const [showActionsMenu, setShowActionsMenu] = useState(false)

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Count total unread messages
  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0)

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In production, this would send the message to the backend
      console.log('Sending message:', messageText)
      setMessageText('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleReportProfile = () => {
    // In production, this would open a report modal/form
    if (confirm(`Are you sure you want to report ${selectedConversation?.user.name}? This will be reviewed by our team.`)) {
      console.log('Reporting user:', selectedConversation?.user.name)
      alert('Thank you for your report. Our team will review this profile.')
    }
    setShowActionsMenu(false)
  }

  const handleBlockUser = () => {
    // In production, this would block the user
    if (confirm(`Are you sure you want to block ${selectedConversation?.user.name}? You will no longer receive messages from them.`)) {
      console.log('Blocking user:', selectedConversation?.user.name)
      alert('User has been blocked successfully.')
    }
    setShowActionsMenu(false)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Page Header */}
      <section className="bg-primary-dark pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
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
                Messages
              </h1>
              <p className="mt-2 text-white/80 font-montserrat">
                Connect with your mentors and mentees
              </p>
            </div>
            {totalUnread > 0 && (
              <Badge variant="secondary" size="lg" className="bg-secondary-accent text-white">
                {totalUnread} unread
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Messages Interface */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Card className="shadow-2xl overflow-hidden border-2 border-neutral-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 h-[700px]">
              {/* Conversations Sidebar */}
              <div className={`lg:col-span-4 border-r border-neutral-200 flex flex-col ${
                isMobileConversationOpen ? 'hidden lg:flex' : 'flex'
              }`}>
                {/* Search Bar */}
                <div className="p-4 border-b border-neutral-200 bg-white">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border-2 border-neutral-200 rounded-xl font-montserrat text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent hover:border-neutral-300 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto bg-neutral-50">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => (
                      <button
                        key={conversation.id}
                        onClick={() => {
                          setSelectedConversation(conversation)
                          setIsMobileConversationOpen(true)
                        }}
                        className={`w-full p-4 border-b border-neutral-100 hover:bg-white transition-all text-left group ${
                          selectedConversation.id === conversation.id
                            ? 'bg-gradient-to-r from-primary-accent/10 to-secondary-accent/10 border-l-4 border-l-primary-accent shadow-sm'
                            : 'bg-white hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar
                              fallback={conversation.user.name}
                              size="md"
                              className="border-2 border-white"
                            />
                            {conversation.isOnline && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold font-montserrat text-primary-dark text-sm truncate">
                                {conversation.user.name}
                              </h3>
                              {conversation.unread > 0 && (
                                <Badge variant="secondary" size="sm" className="bg-secondary-accent text-white ml-2">
                                  {conversation.unread}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-neutral-500 font-montserrat mb-1">
                              {conversation.user.title}
                            </p>
                            <p className={`text-sm font-montserrat truncate ${
                              conversation.unread > 0 ? 'text-primary-dark font-semibold' : 'text-neutral-600'
                            }`}>
                              {conversation.lastMessage}
                            </p>
                            <p className="text-xs text-neutral-400 font-montserrat mt-1">
                              {conversation.timestamp}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-neutral-500 font-montserrat">No conversations found</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Conversation Thread */}
              <div className={`lg:col-span-8 flex flex-col ${
                isMobileConversationOpen ? 'flex' : 'hidden lg:flex'
              }`}>
                {selectedConversation ? (
                  <>
                    {/* Conversation Header */}
                    <div className="p-5 border-b-2 border-neutral-100 bg-gradient-to-r from-white to-neutral-50 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setIsMobileConversationOpen(false)}
                            className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                          >
                            <ArrowLeft className="h-5 w-5 text-neutral-600" />
                          </button>
                          <div className="relative">
                            <Avatar
                              fallback={selectedConversation.user.name}
                              size="md"
                              className="border-2 border-white"
                            />
                            {selectedConversation.isOnline && (
                              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-bold font-montserrat text-primary-dark">
                              {selectedConversation.user.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-neutral-500 font-montserrat">
                                {selectedConversation.user.title}
                              </p>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs text-neutral-600 font-montserrat">
                                  {selectedConversation.user.rating}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Info className="h-4 w-4" />
                          </Button>
                          <div className="relative">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setShowActionsMenu(!showActionsMenu)}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                            {showActionsMenu && (
                              <>
                                <div
                                  className="fixed inset-0 z-10"
                                  onClick={() => setShowActionsMenu(false)}
                                />
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-neutral-200 py-2 z-20">
                                  <button
                                    onClick={handleReportProfile}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm font-montserrat text-red-600 hover:bg-red-50 transition-colors"
                                  >
                                    <Flag className="h-4 w-4" />
                                    Report Profile
                                  </button>
                                  <button
                                    onClick={handleBlockUser}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm font-montserrat text-neutral-700 hover:bg-neutral-50 transition-colors"
                                  >
                                    <Ban className="h-4 w-4" />
                                    Block User
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-neutral-50 to-neutral-100/50">
                      {mockMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderName === 'You' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                        >
                          <div className={`max-w-[75%] ${
                            message.senderName === 'You' ? 'order-2' : 'order-1'
                          }`}>
                            <div className={`rounded-2xl px-5 py-3.5 shadow-sm ${
                              message.senderName === 'You'
                                ? 'bg-gradient-to-r from-primary-accent to-primary-accent/90 text-primary-dark'
                                : 'bg-white border-2 border-neutral-100 text-primary-dark'
                            }`}>
                              <p className="text-sm font-montserrat leading-relaxed">
                                {message.content}
                              </p>
                            </div>
                            <div className={`flex items-center gap-1.5 mt-1.5 px-2 ${
                              message.senderName === 'You' ? 'justify-end' : 'justify-start'
                            }`}>
                              <span className="text-xs text-neutral-500 font-montserrat font-medium">
                                {message.timestamp}
                              </span>
                              {message.senderName === 'You' && (
                                <CheckCheck className="h-3.5 w-3.5 text-primary-accent" />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-5 border-t-2 border-neutral-100 bg-white">
                      <div className="flex items-end gap-3">
                        <button className="mb-2 p-2.5 hover:bg-primary-accent/10 rounded-xl transition-all group">
                          <Paperclip className="h-5 w-5 text-neutral-500 group-hover:text-primary-accent transition-colors" />
                        </button>
                        <div className="flex-1">
                          <textarea
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your message..."
                            rows={1}
                            className="w-full px-5 py-3.5 border-2 border-neutral-200 rounded-2xl font-montserrat text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent hover:border-neutral-300 transition-all shadow-sm"
                            style={{ minHeight: '48px', maxHeight: '120px' }}
                          />
                        </div>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!messageText.trim()}
                          className="bg-gradient-to-r from-primary-accent to-secondary-accent hover:from-primary-accent/90 hover:to-secondary-accent/90 text-primary-dark disabled:opacity-50 disabled:cursor-not-allowed mb-2 shadow-lg hover:shadow-xl transition-all rounded-xl px-5 py-3"
                        >
                          <Send className="h-5 w-5" />
                        </Button>
                      </div>
                      <p className="text-xs text-neutral-500 font-montserrat mt-3 px-3 text-center">
                        Press <kbd className="px-2 py-0.5 bg-neutral-100 rounded font-semibold">Enter</kbd> to send • <kbd className="px-2 py-0.5 bg-neutral-100 rounded font-semibold">Shift + Enter</kbd> for new line
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="h-8 w-8 text-neutral-400" />
                      </div>
                      <h3 className="text-xl font-bold font-montserrat text-neutral-700 mb-2">
                        Select a conversation
                      </h3>
                      <p className="text-neutral-500 font-montserrat">
                        Choose a conversation from the list to start messaging
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}

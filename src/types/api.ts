// API request and response type definitions

// ===== Authentication Types =====
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  role: 'mentor' | 'mentee'
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken?: string
}

// ===== User Types =====
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'mentor' | 'mentee' | 'admin'
  avatar?: string
  bio?: string
  createdAt: string
  updatedAt: string
}

export interface MentorProfile extends User {
  role: 'mentor'
  title: string
  company: string
  industry: string[]
  expertise: string[]
  experience: string
  availability: string
  hourlyRate?: number
  languages: string[]
  timezone: string
  linkedIn?: string
  twitter?: string
  github?: string
  website?: string
  verified: boolean
  rating: number
  reviewCount: number
  sessionCount: number
}

export interface MenteeProfile extends User {
  role: 'mentee'
  goals: string[]
  interests: string[]
  currentRole?: string
  experience?: string
  lookingFor: string[]
  preferredIndustries: string[]
  availability: string
}

// ===== Message Types =====
export interface Message {
  id: string
  conversationId: string
  senderId: string
  receiverId: string
  content: string
  read: boolean
  createdAt: string
  updatedAt: string
}

export interface Conversation {
  id: string
  participants: User[]
  lastMessage?: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
}

export interface SendMessageRequest {
  receiverId: string
  content: string
}

// ===== Session Types =====
export interface Session {
  id: string
  mentorId: string
  menteeId: string
  mentor: MentorProfile
  mentee: MenteeProfile
  title: string
  description?: string
  scheduledAt: string
  duration: number // in minutes
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
  meetingLink?: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface CreateSessionRequest {
  mentorId: string
  menteeId: string
  title: string
  description?: string
  scheduledAt: string
  duration: number
}

export interface UpdateSessionRequest {
  title?: string
  description?: string
  scheduledAt?: string
  duration?: number
  status?: Session['status']
  notes?: string
}

// ===== Review Types =====
export interface Review {
  id: string
  sessionId: string
  reviewerId: string
  revieweeId: string
  reviewer: User
  reviewee: User
  rating: number // 1-5
  comment: string
  createdAt: string
  updatedAt: string
}

export interface CreateReviewRequest {
  sessionId: string
  revieweeId: string
  rating: number
  comment: string
}

// ===== Match Types =====
export interface Match {
  id: string
  mentorId: string
  menteeId: string
  mentor: MentorProfile
  mentee: MenteeProfile
  status: 'pending' | 'accepted' | 'rejected'
  matchScore: number
  createdAt: string
  updatedAt: string
}

// ===== Notification Types =====
export interface Notification {
  id: string
  userId: string
  type: 'message' | 'session' | 'match' | 'review' | 'system'
  title: string
  message: string
  read: boolean
  actionUrl?: string
  createdAt: string
}

export interface MarkNotificationReadRequest {
  notificationId: string
}

// ===== Search & Filter Types =====
export interface SearchMentorsRequest {
  query?: string
  industry?: string[]
  expertise?: string[]
  availability?: string
  minRating?: number
  maxRate?: number
  page?: number
  limit?: number
}

export interface SearchMentorsResponse {
  mentors: MentorProfile[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// ===== Analytics Types =====
export interface MentorAnalytics {
  totalSessions: number
  completedSessions: number
  cancelledSessions: number
  averageRating: number
  totalReviews: number
  totalMentees: number
  responseTime: number // in hours
  profileViews: number
  sessionsByMonth: {
    month: string
    count: number
  }[]
  ratingDistribution: {
    rating: number
    count: number
  }[]
}

export interface MenteeAnalytics {
  totalSessions: number
  completedSessions: number
  goalProgress: {
    goal: string
    progress: number
  }[]
  topMentors: {
    mentor: MentorProfile
    sessionCount: number
  }[]
  learningAreas: string[]
}

// ===== Goal Types =====
export interface Goal {
  id: string
  userId: string
  title: string
  description: string
  targetDate: string
  status: 'not-started' | 'in-progress' | 'completed'
  progress: number
  createdAt: string
  updatedAt: string
}

export interface CreateGoalRequest {
  title: string
  description: string
  targetDate: string
}

export interface UpdateGoalRequest {
  title?: string
  description?: string
  targetDate?: string
  status?: Goal['status']
  progress?: number
}

// ===== Availability Types =====
export interface AvailabilitySlot {
  id: string
  userId: string
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  isRecurring: boolean
}

export interface CreateAvailabilityRequest {
  dayOfWeek: number
  startTime: string
  endTime: string
  isRecurring: boolean
}

// ===== Admin Types =====
export interface AdminStats {
  totalUsers: number
  totalMentors: number
  totalMentees: number
  totalSessions: number
  totalMatches: number
  activeUsers: number
  newUsersThisMonth: number
  sessionsThisMonth: number
}

export interface AdminUser extends User {
  status: 'active' | 'suspended' | 'deleted'
  lastLogin: string
  reportCount: number
}

export interface ReportRequest {
  reportedUserId: string
  reason: string
  description: string
}

// ===== Generic API Response =====
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T = any> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// ===== API Error Types =====
export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
}

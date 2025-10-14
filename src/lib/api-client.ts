// API client for making HTTP requests to the backend

import { ApiResponse, ApiError } from '@/types/api'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export class ApiClient {
  private baseUrl: string
  private token: string | null = null

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl

    // Load token from localStorage on client-side
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken')
    }
  }

  // Set authentication token
  setToken(token: string | null) {
    this.token = token
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('authToken', token)
      } else {
        localStorage.removeItem('authToken')
      }
    }
  }

  // Get authentication token
  getToken(): string | null {
    return this.token
  }

  // Build headers for requests
  private getHeaders(customHeaders?: Record<string, string>): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    }

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    return headers
  }

  // Handle API response
  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type')
    const isJson = contentType?.includes('application/json')

    if (!response.ok) {
      let errorMessage = 'An error occurred'
      let errorDetails: any = undefined

      if (isJson) {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
        errorDetails = errorData.details
      } else {
        errorMessage = await response.text()
      }

      const error: ApiError = {
        code: response.status.toString(),
        message: errorMessage,
        details: errorDetails,
      }

      throw error
    }

    if (isJson) {
      const data = await response.json()
      return data as T
    }

    return {} as T
  }

  // GET request
  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`)

    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key].toString())
        }
      })
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    })

    return this.handleResponse<T>(response)
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    return this.handleResponse<T>(response)
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    return this.handleResponse<T>(response)
  }

  // PATCH request
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    })

    return this.handleResponse<T>(response)
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    })

    return this.handleResponse<T>(response)
  }

  // Upload file
  async upload<T>(endpoint: string, file: File, additionalData?: Record<string, any>): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    if (additionalData) {
      Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key])
      })
    }

    // Don't set Content-Type for FormData - browser will set it with boundary
    const headers: Record<string, string> = {}
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    })

    return this.handleResponse<T>(response)
  }
}

// Create a singleton instance
export const apiClient = new ApiClient()

// Convenience methods for common operations
export const api = {
  // Auth
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),

  register: (data: any) =>
    apiClient.post('/auth/register', data),

  logout: () =>
    apiClient.post('/auth/logout'),

  // Users
  getProfile: () =>
    apiClient.get('/users/profile'),

  updateProfile: (data: any) =>
    apiClient.put('/users/profile', data),

  uploadAvatar: (file: File) =>
    apiClient.upload('/users/avatar', file),

  // Mentors
  searchMentors: (params: any) =>
    apiClient.get('/mentors', params),

  getMentor: (id: string) =>
    apiClient.get(`/mentors/${id}`),

  // Messages
  getConversations: () =>
    apiClient.get('/messages/conversations'),

  getMessages: (conversationId: string) =>
    apiClient.get(`/messages/conversations/${conversationId}`),

  sendMessage: (data: any) =>
    apiClient.post('/messages', data),

  // Sessions
  getSessions: () =>
    apiClient.get('/sessions'),

  createSession: (data: any) =>
    apiClient.post('/sessions', data),

  updateSession: (id: string, data: any) =>
    apiClient.put(`/sessions/${id}`, data),

  cancelSession: (id: string) =>
    apiClient.delete(`/sessions/${id}`),

  // Reviews
  createReview: (data: any) =>
    apiClient.post('/reviews', data),

  getReviews: (userId: string) =>
    apiClient.get(`/reviews/user/${userId}`),

  // Notifications
  getNotifications: () =>
    apiClient.get('/notifications'),

  markNotificationRead: (id: string) =>
    apiClient.patch(`/notifications/${id}/read`, {}),

  // Analytics
  getMentorAnalytics: () =>
    apiClient.get('/analytics/mentor'),

  getMenteeAnalytics: () =>
    apiClient.get('/analytics/mentee'),

  // Goals
  getGoals: () =>
    apiClient.get('/goals'),

  createGoal: (data: any) =>
    apiClient.post('/goals', data),

  updateGoal: (id: string, data: any) =>
    apiClient.put(`/goals/${id}`, data),

  // Availability
  getAvailability: (userId: string) =>
    apiClient.get(`/availability/${userId}`),

  setAvailability: (data: any) =>
    apiClient.post('/availability', data),
}

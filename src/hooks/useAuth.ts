'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { apiClient } from '@/lib/api-client'
import { User } from '@/types/api'

interface UseAuthReturn {
  user: User | null
  loading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (data: any) => Promise<boolean>
  updateUser: (user: User) => void
}

/**
 * Custom hook for authentication
 * Manages user state, login, logout, and registration
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = apiClient.getToken()
        if (!token) {
          setLoading(false)
          return
        }

        // Fetch user profile
        const response: any = await apiClient.get('/auth/me')
        setUser(response.user)
      } catch (error) {
        console.error('Auth check failed:', error)
        apiClient.setToken(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      const response: any = await apiClient.post('/auth/login', { email, password })

      if (response.token) {
        apiClient.setToken(response.token)
        setUser(response.user)
        return true
      }

      return false
    } catch (error) {
      console.error('Login failed:', error)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (data: any): Promise<boolean> => {
    try {
      setLoading(true)
      const response: any = await apiClient.post('/auth/register', data)

      if (response.token) {
        apiClient.setToken(response.token)
        setUser(response.user)
        return true
      }

      return false
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    apiClient.setToken(null)
    setUser(null)
    router.push('/login')
  }, [router])

  const updateUser = useCallback((updatedUser: User) => {
    setUser(updatedUser)
  }, [])

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    updateUser,
  }
}

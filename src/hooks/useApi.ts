'use client'

import { useState, useCallback } from 'react'
import { ApiError } from '@/types/api'

interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T | null>
  reset: () => void
}

/**
 * Custom hook for API calls with loading and error states
 * @param apiFunction - The API function to call
 * @returns Object with data, loading, error states and execute function
 */
export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<ApiError | null>(null)

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      try {
        setLoading(true)
        setError(null)
        const result = await apiFunction(...args)
        setData(result)
        return result
      } catch (err: any) {
        const apiError: ApiError = {
          code: err.code || 'UNKNOWN_ERROR',
          message: err.message || 'An unexpected error occurred',
          details: err.details,
        }
        setError(apiError)
        return null
      } finally {
        setLoading(false)
      }
    },
    [apiFunction]
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return { data, loading, error, execute, reset }
}

/**
 * Hook for API calls that should execute immediately on mount
 */
export function useApiOnMount<T>(
  apiFunction: (...args: any[]) => Promise<T>,
  args: any[] = []
): UseApiState<T> & { refetch: () => Promise<void> } {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<ApiError | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiFunction(...args)
      setData(result)
    } catch (err: any) {
      const apiError: ApiError = {
        code: err.code || 'UNKNOWN_ERROR',
        message: err.message || 'An unexpected error occurred',
        details: err.details,
      }
      setError(apiError)
    } finally {
      setLoading(false)
    }
  }, [apiFunction, ...args])

  // Execute on mount
  useState(() => {
    fetchData()
  })

  return { data, loading, error, refetch: fetchData }
}

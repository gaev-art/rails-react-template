import { useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'

interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
  errors?: Record<string, string[]>
}

interface ApiOptions extends RequestInit {
  requireAuth?: boolean
}

export const useApi = () => {
  const { accessToken, refreshAccessToken } = useAuth()

  const apiCall = useCallback(
    async <T = unknown>(
      url: string,
      options: ApiOptions = {},
    ): Promise<ApiResponse<T>> => {
      const { requireAuth = true, ...fetchOptions } = options

      // Add authorization header if required and token is available
      if (requireAuth && accessToken) {
        fetchOptions.headers = {
          ...fetchOptions.headers,
          Authorization: `Bearer ${accessToken}`,
        }
      }

      try {
        const response = await fetch(url, fetchOptions)
        const data = await response.json()

        // If token is expired, try to refresh it
        if (response.status === 401 && requireAuth && accessToken) {
          await refreshAccessToken()
          // Retry the request with new token
          if (accessToken) {
            fetchOptions.headers = {
              ...fetchOptions.headers,
              Authorization: `Bearer ${accessToken}`,
            }
            const retryResponse = await fetch(url, fetchOptions)
            return await retryResponse.json()
          }
        }

        return data
      } catch (error) {
        console.error('API call failed:', error)
        return {
          success: false,
          message: 'Network error occurred',
        }
      }
    },
    [accessToken, refreshAccessToken],
  )

  const get = useCallback(
    <T = unknown>(url: string, options: Omit<ApiOptions, 'method'> = {}) =>
      apiCall<T>(url, { ...options, method: 'GET' }),
    [apiCall],
  )

  const post = useCallback(
    <T = unknown>(
      url: string,
      data?: unknown,
      options: Omit<ApiOptions, 'method' | 'body'> = {},
    ) =>
      apiCall<T>(url, {
        ...options,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
      }),
    [apiCall],
  )

  const put = useCallback(
    <T = unknown>(
      url: string,
      data?: unknown,
      options: Omit<ApiOptions, 'method' | 'body'> = {},
    ) =>
      apiCall<T>(url, {
        ...options,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
      }),
    [apiCall],
  )

  const del = useCallback(
    <T = unknown>(url: string, options: Omit<ApiOptions, 'method'> = {}) =>
      apiCall<T>(url, { ...options, method: 'DELETE' }),
    [apiCall],
  )

  return {
    apiCall,
    get,
    post,
    put,
    delete: del,
  }
}

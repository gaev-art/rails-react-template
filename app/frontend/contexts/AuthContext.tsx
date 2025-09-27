import type React from 'react'
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react'

interface User {
  id: number
  name: string
  email: string
  role: string | null
  verified: boolean
  created_at: string
  updated_at: string
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => Promise<void>
  logout: () => void
  refreshAccessToken: () => Promise<void>
  clearError: () => void
}

type AuthAction =
  | { type: 'AUTH_START' }
  | {
      type: 'AUTH_SUCCESS'
      payload: { user: User; accessToken: string; refreshToken: string }
    }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERROR' }
  | { type: 'REFRESH_TOKEN'; payload: string }

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        accessToken: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      }
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      }
    case 'REFRESH_TOKEN':
      return {
        ...state,
        accessToken: action.payload,
      }
    default:
      return state
  }
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth')
    if (storedAuth) {
      try {
        const { user, accessToken, refreshToken } = JSON.parse(storedAuth)
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user, accessToken, refreshToken },
        })
      } catch (error) {
        console.error('Failed to parse stored auth data:', error)
        localStorage.removeItem('auth')
      }
    }
  }, [])

  // Save auth state to localStorage when it changes
  useEffect(() => {
    if (
      state.isAuthenticated &&
      state.user &&
      state.accessToken &&
      state.refreshToken
    ) {
      localStorage.setItem(
        'auth',
        JSON.stringify({
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
        }),
      )
    } else if (!state.isAuthenticated) {
      localStorage.removeItem('auth')
    }
  }, [state.isAuthenticated, state.user, state.accessToken, state.refreshToken])

  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'AUTH_START' })

    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth: { email, password },
        }),
      })

      const data = await response.json()

      if (data.success) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: data.data.user,
            accessToken: data.data.tokens.access_token,
            refreshToken: data.data.tokens.refresh_token,
          },
        })
      } else {
        dispatch({
          type: 'AUTH_FAILURE',
          payload: data.message || 'Login failed',
        })
      }
    } catch (_error) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: 'Network error occurred',
      })
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ): Promise<void> => {
    dispatch({ type: 'AUTH_START' })

    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: passwordConfirmation,
        }),
      })

      const data = await response.json()

      if (data.success) {
        dispatch({
          type: 'AUTH_SUCCESS',
          payload: {
            user: data.data.user,
            accessToken: data.data.tokens.access_token,
            refreshToken: data.data.tokens.refresh_token,
          },
        })
      } else {
        dispatch({
          type: 'AUTH_FAILURE',
          payload: data.message || 'Registration failed',
        })
      }
    } catch (_error) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: 'Network error occurred',
      })
    }
  }

  const logout = (): void => {
    dispatch({ type: 'LOGOUT' })
  }

  const refreshAccessToken = async (): Promise<void> => {
    if (!state.refreshToken) {
      dispatch({ type: 'LOGOUT' })
      return
    }

    try {
      const response = await fetch('/api/v1/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: state.refreshToken,
        }),
      })

      const data = await response.json()

      if (data.success) {
        dispatch({
          type: 'REFRESH_TOKEN',
          payload: data.data.access_token,
        })
      } else {
        dispatch({ type: 'LOGOUT' })
      }
    } catch (_error) {
      dispatch({ type: 'LOGOUT' })
    }
  }

  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshAccessToken,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

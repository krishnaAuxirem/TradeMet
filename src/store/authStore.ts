import { create } from 'zustand'
import type { User, AuthState } from '@/types'
import { STORAGE_KEYS } from '@/constants'

interface AuthStore extends AuthState {
  login: (email: string, password: string, role: 'trader' | 'developer' | 'admin') => Promise<void>
  logout: () => void
  initAuth: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  login: async (email: string, password: string, role: 'trader' | 'developer' | 'admin') => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      role,
      createdAt: new Date().toISOString(),
    }

    const token = `mock_token_${Date.now()}`

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))

    set({ user, token, isAuthenticated: true })
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    set({ user: null, token: null, isAuthenticated: false })
  },

  initAuth: () => {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    const userStr = localStorage.getItem(STORAGE_KEYS.USER)

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr)
        set({ user, token, isAuthenticated: true })
      } catch (error) {
        console.error('Failed to parse user data:', error)
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)
      }
    }
  },
}))

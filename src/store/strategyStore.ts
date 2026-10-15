import { create } from 'zustand'
import type { Strategy } from '@/types'
import { STORAGE_KEYS } from '@/constants'
import { mockStrategies } from '@/mock/strategies'

interface StrategyStore {
  strategies: Strategy[]
  loadStrategies: () => void
  saveStrategy: (strategy: Omit<Strategy, 'id' | 'createdAt'>) => void
  deleteStrategy: (id: string) => void
  getStrategyById: (id: string) => Strategy | undefined
}

export const useStrategyStore = create<StrategyStore>((set, get) => ({
  strategies: [],

  loadStrategies: () => {
    const stored = localStorage.getItem(STORAGE_KEYS.STRATEGIES)
    if (stored) {
      try {
        const strategies = JSON.parse(stored)
        set({ strategies })
      } catch (error) {
        console.error('Failed to parse strategies:', error)
        set({ strategies: mockStrategies })
      }
    } else {
      // Initialize with mock data
      set({ strategies: mockStrategies })
      localStorage.setItem(STORAGE_KEYS.STRATEGIES, JSON.stringify(mockStrategies))
    }
  },

  saveStrategy: (strategyData) => {
    const newStrategy: Strategy = {
      ...strategyData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }

    const strategies = [...get().strategies, newStrategy]
    set({ strategies })
    localStorage.setItem(STORAGE_KEYS.STRATEGIES, JSON.stringify(strategies))
  },

  deleteStrategy: (id) => {
    const strategies = get().strategies.filter((s) => s.id !== id)
    set({ strategies })
    localStorage.setItem(STORAGE_KEYS.STRATEGIES, JSON.stringify(strategies))
  },

  getStrategyById: (id) => {
    return get().strategies.find((s) => s.id === id)
  },
}))

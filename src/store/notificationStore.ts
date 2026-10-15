import { create } from 'zustand'
import type { Notification } from '@/types'
import { STORAGE_KEYS } from '@/constants'
import { mockNotifications } from '@/mock/strategies'

interface NotificationStore {
  notifications: Notification[]
  unreadCount: number
  loadNotifications: () => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  deleteNotification: (id: string) => void
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  loadNotifications: () => {
    const stored = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)
    if (stored) {
      try {
        const notifications = JSON.parse(stored)
        const unreadCount = notifications.filter((n: Notification) => !n.read).length
        set({ notifications, unreadCount })
      } catch (error) {
        console.error('Failed to parse notifications:', error)
        set({ notifications: mockNotifications, unreadCount: mockNotifications.filter(n => !n.read).length })
      }
    } else {
      set({ notifications: mockNotifications, unreadCount: mockNotifications.filter(n => !n.read).length })
      localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(mockNotifications))
    }
  },

  markAsRead: (id) => {
    const notifications = get().notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    )
    const unreadCount = notifications.filter((n) => !n.read).length
    set({ notifications, unreadCount })
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications))
  },

  markAllAsRead: () => {
    const notifications = get().notifications.map((n) => ({ ...n, read: true }))
    set({ notifications, unreadCount: 0 })
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications))
  },

  addNotification: (notificationData) => {
    const newNotification: Notification = {
      ...notificationData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      read: false,
    }

    const notifications = [newNotification, ...get().notifications]
    const unreadCount = get().unreadCount + 1
    set({ notifications, unreadCount })
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications))
  },

  deleteNotification: (id) => {
    const notifications = get().notifications.filter((n) => n.id !== id)
    const unreadCount = notifications.filter((n) => !n.read).length
    set({ notifications, unreadCount })
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications))
  },
}))

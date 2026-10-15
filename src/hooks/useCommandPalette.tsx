import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  BarChart3,
  Cpu,
  ShoppingCart,
  Bell,
  Code,
  Shield,
  TrendingUp,
} from 'lucide-react'

interface CommandItem {
  id: string
  label: string
  description?: string
  href: string
  category: string
  icon?: React.ReactNode
}

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false)

  const commandItems: CommandItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      description: 'View your trading dashboard',
      href: '/dashboard',
      category: 'Pages',
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      id: 'analytics',
      label: 'Market Analytics',
      description: 'View market charts and analysis',
      href: '/analytics',
      category: 'Pages',
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      id: 'strategy-builder',
      label: 'Strategy Builder',
      description: 'Create algorithmic trading strategies',
      href: '/strategy-builder',
      category: 'Pages',
      icon: <Cpu className="h-4 w-4" />,
    },
    {
      id: 'marketplace',
      label: 'Marketplace',
      description: 'Browse and subscribe to strategies',
      href: '/marketplace',
      category: 'Pages',
      icon: <ShoppingCart className="h-4 w-4" />,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      description: 'View your notifications',
      href: '/notifications',
      category: 'Pages',
      icon: <Bell className="h-4 w-4" />,
    },
    {
      id: 'developer-dashboard',
      label: 'Developer Hub',
      description: 'Manage your strategies',
      href: '/developer-dashboard',
      category: 'Developer',
      icon: <Code className="h-4 w-4" />,
    },
    {
      id: 'admin',
      label: 'Admin Panel',
      description: 'Platform administration',
      href: '/admin',
      category: 'Admin',
      icon: <Shield className="h-4 w-4" />,
    },
    {
      id: 'home',
      label: 'Home',
      description: 'Go to homepage',
      href: '/',
      category: 'Navigation',
      icon: <TrendingUp className="h-4 w-4" />,
    },
  ]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return {
    isOpen,
    setIsOpen,
    commandItems,
  }
}

import { 
  LayoutDashboard, 
  BarChart3, 
  Cpu, 
  ShoppingCart, 
  Bell,
  Code,
  Shield,
  ChevronLeft,
  TrendingUp
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function Sidebar() {
  const location = useLocation()
  const { user } = useAuthStore()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navItems = [
    { 
      path: '/dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      roles: ['trader', 'developer', 'admin']
    },
    { 
      path: '/analytics', 
      label: 'Market Analytics', 
      icon: BarChart3,
      roles: ['trader', 'developer', 'admin']
    },
    { 
      path: '/strategy-builder', 
      label: 'Strategy Builder', 
      icon: Cpu,
      roles: ['trader', 'developer', 'admin']
    },
    { 
      path: '/marketplace', 
      label: 'Marketplace', 
      icon: ShoppingCart,
      roles: ['trader', 'developer', 'admin']
    },
    { 
      path: '/notifications', 
      label: 'Notifications', 
      icon: Bell,
      roles: ['trader', 'developer', 'admin']
    },
    { 
      path: '/developer-dashboard', 
      label: 'Developer Hub', 
      icon: Code,
      roles: ['developer']
    },
    { 
      path: '/admin', 
      label: 'Admin Panel', 
      icon: Shield,
      roles: ['admin']
    },
  ]

  // Filter navigation items based on user role
  const visibleNavItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  )

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-card transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          {!isCollapsed && (
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="TradeMet" className="h-10" />
            </Link>
          )}
          {isCollapsed && (
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="TradeMet" className="h-10" />
            </Link>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {visibleNavItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Collapse Toggle */}
        <div className="border-t border-border p-3">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronLeft 
              className={cn(
                "h-5 w-5 transition-transform",
                isCollapsed && "rotate-180"
              )} 
            />
          </button>
        </div>
      </div>
    </aside>
  )
}

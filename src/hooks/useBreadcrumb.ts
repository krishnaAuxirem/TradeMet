import { useLocation } from 'react-router-dom'
import { useMemo } from 'react'

interface BreadcrumbItem {
  label: string
  href?: string
}

const routeLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  analytics: 'Market Analytics',
  'strategy-builder': 'Strategy Builder',
  marketplace: 'Marketplace',
  notifications: 'Notifications',
  'developer-dashboard': 'Developer Hub',
  admin: 'Admin Panel',
  backtesting: 'Backtesting',
}

export function useBreadcrumb(): BreadcrumbItem[] {
  const location = useLocation()

  return useMemo(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    pathSegments.forEach((segment, index) => {
      const label = routeLabels[segment] || segment
      const href = index < pathSegments.length - 1 ? `/${pathSegments.slice(0, index + 1).join('/')}` : undefined

      breadcrumbs.push({ label, href })
    })

    return breadcrumbs
  }, [location.pathname])
}

import { useEffect } from 'react'
import { Bell, TrendingUp, AlertTriangle, Info } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNotificationStore } from '@/store/notificationStore'
import { cn } from '@/lib/utils'

const iconMap = {
  signal: TrendingUp,
  alert: Bell,
  risk: AlertTriangle,
  info: Info,
}

const variantMap = {
  signal: 'success',
  alert: 'default',
  risk: 'danger',
  info: 'outline',
} as const

export function Notifications() {
  const { notifications, loadNotifications, markAsRead, markAllAsRead } = useNotificationStore()

  useEffect(() => {
    loadNotifications()
  }, [loadNotifications])

  const formatTime = (timestamp: number) => {
    const minutes = Math.floor((Date.now() - timestamp) / 60000)
    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="mt-2 text-muted-foreground">
              Stay updated with trading signals and alerts
            </p>
          </div>
          {notifications.some((n) => !n.read) && (
            <Button variant="outline" onClick={markAllAsRead}>
              Mark All as Read
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
            <CardDescription>Recent activity and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => {
                const Icon = iconMap[notification.type]
                return (
                  <div
                    key={notification.id}
                    className={cn(
                      'flex gap-4 rounded-lg border border-border p-4 transition-colors',
                      !notification.read && 'bg-accent/50'
                    )}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="font-medium">{notification.title}</h4>
                        <Badge variant={variantMap[notification.type]}>
                          {notification.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {formatTime(notification.timestamp)}
                        </p>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}

              {notifications.length === 0 && (
                <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
                  <Bell className="h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    You're all caught up! New alerts will appear here.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

import { Bell, TrendingUp, AlertTriangle, Info, Settings, Check, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useNotificationStore } from '@/store/notificationStore'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export function NotificationDropdown() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } =
    useNotificationStore()

  const recentNotifications = notifications.slice(0, 5)

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'trade':
        return <TrendingUp className="h-4 w-4" />
      case 'alert':
        return <AlertTriangle className="h-4 w-4" />
      case 'system':
        return <Info className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'trade':
        return 'text-success'
      case 'alert':
        return 'text-warning'
      case 'system':
        return 'text-primary'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="danger"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      }
      className="w-96"
    >
      <div className="max-h-[28rem] overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="h-auto p-0 text-xs text-primary hover:bg-transparent"
            >
              Mark all as read
            </Button>
          )}
        </div>

        <DropdownMenuSeparator />

        {recentNotifications.length === 0 ? (
          <div className="px-4 py-8 text-center text-sm text-muted-foreground">
            No notifications yet
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  'group relative px-4 py-3 transition-colors hover:bg-accent',
                  !notification.read && 'bg-primary/5'
                )}
              >
                <div className="flex gap-3">
                  <div className={cn('mt-0.5', getNotificationColor(notification.type))}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium">{notification.title}</p>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-primary" />
                      )}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => markAsRead(notification.id)}
                        title="Mark as read"
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => deleteNotification(notification.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <DropdownMenuSeparator />

        <div className="p-2">
          <Link to="/notifications">
            <DropdownMenuItem>View all notifications</DropdownMenuItem>
          </Link>
          <DropdownMenuItem icon={<Settings className="h-4 w-4" />}>
            Notification preferences
          </DropdownMenuItem>
        </div>
      </div>
    </DropdownMenu>
  )
}

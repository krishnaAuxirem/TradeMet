import { User, Settings, CreditCard, HelpCircle, LogOut, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'

export function UserProfileDropdown() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" className="flex items-center gap-3 pl-4">
          <div className="text-right">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      }
      className="w-56"
    >
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuItem
        icon={<User className="h-4 w-4" />}
        onClick={() => navigate('/settings')}
      >
        Profile Settings
      </DropdownMenuItem>

      <DropdownMenuItem
        icon={<Settings className="h-4 w-4" />}
        onClick={() => navigate('/preferences')}
      >
        Account Preferences
      </DropdownMenuItem>

      <DropdownMenuItem
        icon={<CreditCard className="h-4 w-4" />}
        onClick={() => navigate('/billing')}
      >
        Billing Information
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        icon={<HelpCircle className="h-4 w-4" />}
        onClick={() => window.open('https://docs.trademet.com', '_blank')}
      >
        Help & Documentation
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        icon={<LogOut className="h-4 w-4" />}
        onClick={handleLogout}
        className="text-destructive"
      >
        Logout
      </DropdownMenuItem>
    </DropdownMenu>
  )
}

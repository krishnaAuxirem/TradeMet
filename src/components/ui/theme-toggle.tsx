import { useState } from 'react'
import { Sun, Moon, Monitor, Settings } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { Button } from './button'
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from './dropdown-menu'
import { ThemeSettings } from './theme-settings'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { mode, activeTheme, setMode } = useThemeStore()
  const [showSettings, setShowSettings] = useState(false)

  const getIcon = () => {
    if (mode === 'auto') {
      return <Monitor className="h-5 w-5" />
    }
    return mode === 'dark' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />
  }

  return (
    <>
      <DropdownMenu
        trigger={
          <Button
            variant="outline"
            size="icon"
            className="relative overflow-hidden"
            title="Theme settings"
          >
            {getIcon()}
          </Button>
        }
        className="w-48"
      >
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          icon={<Sun className="h-4 w-4" />}
          onClick={() => setMode('light')}
          className={cn(mode === 'light' && 'bg-accent')}
        >
          Light
        </DropdownMenuItem>
        
        <DropdownMenuItem
          icon={<Moon className="h-4 w-4" />}
          onClick={() => setMode('dark')}
          className={cn(mode === 'dark' && 'bg-accent')}
        >
          Dark
        </DropdownMenuItem>
        
        <DropdownMenuItem
          icon={<Monitor className="h-4 w-4" />}
          onClick={() => setMode('auto')}
          className={cn(mode === 'auto' && 'bg-accent')}
        >
          Auto
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem
          icon={<Settings className="h-4 w-4" />}
          onClick={() => setShowSettings(true)}
        >
          Advanced Settings
        </DropdownMenuItem>
      </DropdownMenu>

      <ThemeSettings isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  )
}

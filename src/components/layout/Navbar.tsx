import { BarChart2, Command } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { CommandPalette } from '@/components/ui/command-palette'
import { NotificationDropdown } from './NotificationDropdown'
import { UserProfileDropdown } from './UserProfileDropdown'
import { useBreadcrumb } from '@/hooks/useBreadcrumb'
import { useCommandPalette } from '@/hooks/useCommandPalette'

export function Navbar() {
  const breadcrumbs = useBreadcrumb()
  const { isOpen, setIsOpen, commandItems } = useCommandPalette()

  return (
    <>
      <nav className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between gap-4 px-8">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="TradeMet" className="h-10" />
            </Link>
            
            {breadcrumbs.length > 0 && (
              <div className="hidden md:block">
                <Breadcrumb items={breadcrumbs} />
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(true)}
              className="hidden gap-2 sm:flex"
            >
              <Command className="h-4 w-4" />
              <span className="text-muted-foreground">Search...</span>
              <kbd className="ml-auto rounded bg-muted px-2 py-0.5 text-xs">
                ⌘K
              </kbd>
            </Button>

            <ThemeToggle />
            
            <NotificationDropdown />

            <div className="border-l border-border pl-2">
              <UserProfileDropdown />
            </div>
          </div>
        </div>
      </nav>

      <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} items={commandItems} />
    </>
  )
}

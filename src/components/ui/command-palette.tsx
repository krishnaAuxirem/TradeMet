import * as React from 'react'
import { Search, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface CommandItem {
  id: string
  label: string
  description?: string
  href: string
  category: string
  icon?: React.ReactNode
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  items: CommandItem[]
}

export function CommandPalette({ isOpen, onClose, items }: CommandPaletteProps) {
  const [search, setSearch] = React.useState('')
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const navigate = useNavigate()
  const inputRef = React.useRef<HTMLInputElement>(null)

  const filteredItems = React.useMemo(() => {
    if (!search) return items
    const searchLower = search.toLowerCase()
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower)
    )
  }, [search, items])

  const groupedItems = React.useMemo(() => {
    const groups: Record<string, CommandItem[]> = {}
    filteredItems.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    })
    return groups
  }, [filteredItems])

  React.useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setSearch('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const selectedItem = filteredItems[selectedIndex]
        if (selectedItem) {
          navigate(selectedItem.href)
          onClose()
        }
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex, navigate, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[20vh]">
      <div className="w-full max-w-2xl rounded-lg border border-border bg-card shadow-2xl">
        <div className="flex items-center gap-3 border-b border-border px-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search pages, strategies, features..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent py-4 text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded bg-muted px-2 py-1 text-xs text-muted-foreground sm:inline-block">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="mb-4 last:mb-0">
              <div className="mb-2 px-3 text-xs font-semibold text-muted-foreground">
                {category}
              </div>
              <div className="space-y-1">
                {categoryItems.map((item, index) => {
                  const globalIndex = filteredItems.indexOf(item)
                  const isSelected = globalIndex === selectedIndex

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(item.href)
                        onClose()
                      }}
                      className={cn(
                        'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {item.icon && (
                          <span className={cn(isSelected ? 'text-primary-foreground' : 'text-muted-foreground')}>
                            {item.icon}
                          </span>
                        )}
                        <div>
                          <div className="text-sm font-medium">{item.label}</div>
                          {item.description && (
                            <div className={cn(
                              'text-xs',
                              isSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                            )}>
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                      <ArrowRight className={cn('h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')} />
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No results found for "{search}"
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <kbd className="rounded bg-muted px-2 py-1">↑↓</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="rounded bg-muted px-2 py-1">Enter</kbd>
              <span>Select</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

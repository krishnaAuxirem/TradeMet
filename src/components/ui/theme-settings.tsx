import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor, Palette, RotateCcw, Check, X, Download, Upload } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { Button } from './button'
import { Card } from './card'
import { Label } from './label'
import { cn } from '@/lib/utils'

interface ThemeSettingsProps {
  isOpen: boolean
  onClose: () => void
}

export function ThemeSettings({ isOpen, onClose }: ThemeSettingsProps) {
  const { 
    mode, 
    activeTheme, 
    customScheme, 
    presets, 
    setMode, 
    setCustomScheme, 
    applyCustomColors,
    previewTheme,
    resetToDefault 
  } = useThemeStore()

  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>(activeTheme)
  const [selectedPreset, setSelectedPreset] = useState<string>(customScheme?.name || 'Default Dark')
  const [customColors, setCustomColors] = useState({
    primary: customScheme?.colors.primary || '173 80% 40%',
    secondary: customScheme?.colors.secondary || '160 84% 39%',
    accent: customScheme?.colors.accent || '160 84% 39%',
    background: customScheme?.colors.background || '222 47% 11%',
    foreground: customScheme?.colors.foreground || '213 31% 91%',
    border: customScheme?.colors.border || '215 27.9% 16.9%',
    card: customScheme?.colors.card || '222 47% 11%',
    cardForeground: customScheme?.colors.cardForeground || '213 31% 91%',
    muted: customScheme?.colors.muted || '215 27.9% 16.9%',
    mutedForeground: customScheme?.colors.mutedForeground || '217.9 10.6% 64.9%',
  })

  useEffect(() => {
    if (isOpen) {
      setPreviewMode(activeTheme)
    }
  }, [isOpen, activeTheme])

  const handlePresetSelect = (preset: typeof presets[0]) => {
    setSelectedPreset(preset.name)
    setCustomColors(preset.colors)
    previewTheme(previewMode, preset)
  }

  const handleColorChange = (key: keyof typeof customColors, value: string) => {
    const newColors = { ...customColors, [key]: value }
    setCustomColors(newColors)
    previewTheme(previewMode, { name: 'Custom', colors: newColors })
  }

  const handleApply = () => {
    setMode(mode)
    if (selectedPreset !== 'Default Dark' && selectedPreset !== 'Default Light') {
      applyCustomColors(customColors)
    } else {
      setCustomScheme(null)
    }
    onClose()
  }

  const handleCancel = () => {
    // Revert to saved theme
    setMode(mode)
    onClose()
  }

  const handleReset = () => {
    resetToDefault()
    setSelectedPreset('Default Dark')
    const defaultPreset = presets.find(p => p.name === 'Default Dark')
    if (defaultPreset) {
      setCustomColors(defaultPreset.colors)
    }
  }

  const fileInputRef = useState<HTMLInputElement | null>(null)[0]
  const fileInputRefCallback = (ref: HTMLInputElement | null) => {
    if (ref) {
      // @ts-ignore
      fileInputRef = ref
    }
  }

  const handleExportTheme = () => {
    const themeData = {
      name: selectedPreset,
      mode,
      colors: customColors,
      version: '1.0',
      exported: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `trademet-theme-${selectedPreset.toLowerCase().replace(/\s+/g, '-')}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleImportClick = () => {
    fileInputRef?.click()
  }

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const themeData = JSON.parse(event.target?.result as string)

        // Validate theme structure
        if (!themeData.colors || !themeData.name) {
          alert('Invalid theme file format')
          return
        }

        // Validate required color properties
        const requiredColors = ['primary', 'secondary', 'accent', 'background', 'foreground']
        const hasAllColors = requiredColors.every(color => color in themeData.colors)

        if (!hasAllColors) {
          alert('Theme file is missing required color properties')
          return
        }

        // Preview the imported theme
        setSelectedPreset(themeData.name)
        setCustomColors(themeData.colors)
        previewTheme(previewMode, { name: themeData.name, colors: themeData.colors })

        alert(`Theme "${themeData.name}" imported successfully! Click Apply to save.`)
      } catch (error) {
        alert('Failed to parse theme file. Please ensure it\'s a valid JSON file.')
        console.error('Theme import error:', error)
      }
    }

    reader.readAsText(file)
    e.target.value = '' // Reset input
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="border-b border-border p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Theme Settings</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Customize your interface appearance
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Theme Mode Selection */}
          <div>
            <Label className="text-base font-semibold mb-4 block">Theme Mode</Label>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'light', icon: Sun, label: 'Light' },
                { value: 'dark', icon: Moon, label: 'Dark' },
                { value: 'auto', icon: Monitor, label: 'Auto' },
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => {
                    setMode(value as typeof mode)
                    if (value !== 'auto') {
                      setPreviewMode(value as 'light' | 'dark')
                      previewTheme(value as 'light' | 'dark')
                    }
                  }}
                  className={cn(
                    'flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all hover:border-primary/50',
                    mode === value
                      ? 'border-primary bg-primary/10'
                      : 'border-border'
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="font-medium">{label}</span>
                  {value === 'auto' && (
                    <span className="text-xs text-muted-foreground">
                      Follows system
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Color Scheme Presets */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-base font-semibold">Color Scheme</Label>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleExportTheme}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="ghost" size="sm" onClick={handleImportClick}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
                <input
                  ref={fileInputRefCallback}
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleFileImport}
                />
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetSelect(preset)}
                  className={cn(
                    'relative rounded-lg border-2 p-4 text-left transition-all hover:border-primary/50',
                    selectedPreset === preset.name
                      ? 'border-primary bg-primary/10'
                      : 'border-border'
                  )}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{preset.name}</span>
                    {selectedPreset === preset.name && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div
                      className="h-8 w-8 rounded border border-border"
                      style={{ background: `hsl(${preset.colors.primary})` }}
                    />
                    <div
                      className="h-8 w-8 rounded border border-border"
                      style={{ background: `hsl(${preset.colors.secondary})` }}
                    />
                    <div
                      className="h-8 w-8 rounded border border-border"
                      style={{ background: `hsl(${preset.colors.accent})` }}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Color Builder */}
          <div>
            <Label className="text-base font-semibold mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Custom Colors
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(customColors).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label className="text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <div className="flex gap-2">
                    <div
                      className="h-10 w-10 rounded border border-border"
                      style={{ background: `hsl(${value})` }}
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleColorChange(key as keyof typeof customColors, e.target.value)}
                      placeholder="e.g., 173 80% 40%"
                      className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    HSL format: hue saturation% lightness%
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <Label className="text-base font-semibold mb-4 block">Preview</Label>
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Sample Dashboard</h3>
                <div className="flex gap-2">
                  <Button size="sm" variant={previewMode === 'light' ? 'default' : 'outline'} onClick={() => {
                    setPreviewMode('light')
                    previewTheme('light')
                  }}>
                    <Sun className="h-4 w-4 mr-2" />
                    Light
                  </Button>
                  <Button size="sm" variant={previewMode === 'dark' ? 'default' : 'outline'} onClick={() => {
                    setPreviewMode('dark')
                    previewTheme('dark')
                  }}>
                    <Moon className="h-4 w-4 mr-2" />
                    Dark
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-primary">12,543</p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-secondary">$45,231</p>
                </Card>
                <Card className="p-4">
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-accent">8,432</p>
                </Card>
              </div>
              <div className="flex gap-3">
                <Button>Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-border p-6">
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleApply}>
              <Check className="h-4 w-4 mr-2" />
              Apply Changes
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

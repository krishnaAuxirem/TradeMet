import { create } from 'zustand'

type ThemeMode = 'light' | 'dark' | 'auto'

interface ColorScheme {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
    border: string
    card: string
    cardForeground: string
    muted: string
    mutedForeground: string
  }
}

interface ThemeStore {
  mode: ThemeMode
  activeTheme: 'light' | 'dark'
  customScheme: ColorScheme | null
  presets: ColorScheme[]
  setMode: (mode: ThemeMode) => void
  setCustomScheme: (scheme: ColorScheme | null) => void
  applyCustomColors: (colors: ColorScheme['colors']) => void
  previewTheme: (mode: 'light' | 'dark', scheme?: ColorScheme) => void
  initTheme: () => void
  resetToDefault: () => void
}

const THEME_STORAGE_KEY = 'trademet-theme-mode'
const CUSTOM_SCHEME_KEY = 'trademet-custom-scheme'

// Default color presets
const defaultPresets: ColorScheme[] = [
  {
    name: 'Default Dark',
    colors: {
      primary: '173 80% 40%',
      secondary: '160 84% 39%',
      accent: '160 84% 39%',
      background: '222 47% 11%',
      foreground: '213 31% 91%',
      border: '215 27.9% 16.9%',
      card: '222 47% 11%',
      cardForeground: '213 31% 91%',
      muted: '215 27.9% 16.9%',
      mutedForeground: '217.9 10.6% 64.9%',
    },
  },
  {
    name: 'Default Light',
    colors: {
      primary: '173 80% 40%',
      secondary: '160 84% 39%',
      accent: '160 84% 39%',
      background: '0 0% 100%',
      foreground: '222 47% 11%',
      border: '220 13% 91%',
      card: '0 0% 100%',
      cardForeground: '222 47% 11%',
      muted: '220 13% 91%',
      mutedForeground: '220 9% 46%',
    },
  },
  {
    name: 'Ocean Blue',
    colors: {
      primary: '200 100% 50%',
      secondary: '180 100% 40%',
      accent: '220 100% 60%',
      background: '220 40% 10%',
      foreground: '200 20% 95%',
      border: '220 30% 20%',
      card: '220 40% 12%',
      cardForeground: '200 20% 95%',
      muted: '220 30% 20%',
      mutedForeground: '200 10% 70%',
    },
  },
  {
    name: 'Purple Haze',
    colors: {
      primary: '270 70% 60%',
      secondary: '290 70% 55%',
      accent: '310 70% 60%',
      background: '260 40% 10%',
      foreground: '270 20% 95%',
      border: '260 30% 20%',
      card: '260 40% 12%',
      cardForeground: '270 20% 95%',
      muted: '260 30% 20%',
      mutedForeground: '270 10% 70%',
    },
  },
  {
    name: 'Forest Green',
    colors: {
      primary: '150 70% 40%',
      secondary: '130 60% 45%',
      accent: '170 65% 42%',
      background: '140 30% 10%',
      foreground: '150 20% 95%',
      border: '140 25% 20%',
      card: '140 30% 12%',
      cardForeground: '150 20% 95%',
      muted: '140 25% 20%',
      mutedForeground: '150 10% 70%',
    },
  },
]

export const useThemeStore = create<ThemeStore>((set, get) => ({
  mode: 'dark',
  activeTheme: 'dark',
  customScheme: null,
  presets: defaultPresets,

  setMode: (mode: ThemeMode) => {
    set({ mode })
    localStorage.setItem(THEME_STORAGE_KEY, mode)
    
    if (mode === 'auto') {
      // Listen to system preference changes
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const activeTheme = prefersDark ? 'dark' : 'light'
      set({ activeTheme })
      applyTheme(activeTheme, get().customScheme)
    } else {
      set({ activeTheme: mode })
      applyTheme(mode, get().customScheme)
    }
  },

  setCustomScheme: (scheme: ColorScheme | null) => {
    set({ customScheme: scheme })
    if (scheme) {
      localStorage.setItem(CUSTOM_SCHEME_KEY, JSON.stringify(scheme))
    } else {
      localStorage.removeItem(CUSTOM_SCHEME_KEY)
    }
    applyTheme(get().activeTheme, scheme)
  },

  applyCustomColors: (colors: ColorScheme['colors']) => {
    const customScheme: ColorScheme = {
      name: 'Custom',
      colors,
    }
    get().setCustomScheme(customScheme)
  },

  previewTheme: (mode: 'light' | 'dark', scheme?: ColorScheme) => {
    // Temporarily apply theme without saving
    applyTheme(mode, scheme || get().customScheme)
  },

  resetToDefault: () => {
    set({ customScheme: null })
    localStorage.removeItem(CUSTOM_SCHEME_KEY)
    applyTheme(get().activeTheme, null)
  },

  initTheme: () => {
    const savedMode = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null
    const savedScheme = localStorage.getItem(CUSTOM_SCHEME_KEY)
    
    let customScheme: ColorScheme | null = null
    if (savedScheme) {
      try {
        customScheme = JSON.parse(savedScheme)
      } catch (error) {
        console.error('Failed to parse custom scheme:', error)
      }
    }

    const mode = savedMode || 'dark'
    let activeTheme: 'light' | 'dark' = 'dark'

    if (mode === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      activeTheme = prefersDark ? 'dark' : 'light'
      
      // Listen for system preference changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (get().mode === 'auto') {
          const newTheme = e.matches ? 'dark' : 'light'
          set({ activeTheme: newTheme })
          applyTheme(newTheme, get().customScheme)
        }
      })
    } else {
      activeTheme = mode
    }

    set({ mode, activeTheme, customScheme })
    applyTheme(activeTheme, customScheme)
  },
}))

function applyTheme(theme: 'light' | 'dark', customScheme: ColorScheme | null) {
  const root = document.documentElement

  // Apply dark/light class
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }

  // Apply custom colors if available
  if (customScheme) {
    const { colors } = customScheme
    root.style.setProperty('--primary', colors.primary)
    root.style.setProperty('--secondary', colors.secondary)
    root.style.setProperty('--accent', colors.accent)
    root.style.setProperty('--background', colors.background)
    root.style.setProperty('--foreground', colors.foreground)
    root.style.setProperty('--border', colors.border)
    root.style.setProperty('--card', colors.card)
    root.style.setProperty('--card-foreground', colors.cardForeground)
    root.style.setProperty('--muted', colors.muted)
    root.style.setProperty('--muted-foreground', colors.mutedForeground)
  } else {
    // Remove custom properties to use default theme
    root.style.removeProperty('--primary')
    root.style.removeProperty('--secondary')
    root.style.removeProperty('--accent')
    root.style.removeProperty('--background')
    root.style.removeProperty('--foreground')
    root.style.removeProperty('--border')
    root.style.removeProperty('--card')
    root.style.removeProperty('--card-foreground')
    root.style.removeProperty('--muted')
    root.style.removeProperty('--muted-foreground')
  }
}

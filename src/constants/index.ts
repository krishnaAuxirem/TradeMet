export const TIMEFRAMES = ['1D', '1W', '1M', '3M', '1Y'] as const
export type Timeframe = typeof TIMEFRAMES[number]

export const INDICATOR_TYPES = [
  { id: 'ma', name: 'Moving Average' },
  { id: 'ema', name: 'Exponential Moving Average' },
  { id: 'rsi', name: 'Relative Strength Index' },
  { id: 'macd', name: 'MACD' },
  { id: 'bb', name: 'Bollinger Bands' },
] as const

export const CHART_COLORS = {
  primary: 'hsl(188, 94%, 45%)',
  success: 'hsl(142, 76%, 36%)',
  danger: 'hsl(0, 84%, 60%)',
  warning: 'hsl(43, 74%, 66%)',
  muted: 'hsl(215, 20%, 65%)',
} as const

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'trademet_auth_token',
  USER: 'trademet_user',
  STRATEGIES: 'trademet_strategies',
  NOTIFICATIONS: 'trademet_notifications',
} as const

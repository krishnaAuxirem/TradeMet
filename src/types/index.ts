export type UserRole = 'trader' | 'developer' | 'admin'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  createdAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export interface Position {
  id: string
  symbol: string
  type: 'long' | 'short'
  quantity: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
}

export interface MarketData {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface Indicator {
  id: string
  name: string
  type: 'ma' | 'rsi' | 'macd' | 'bb' | 'ema'
  params: Record<string, number>
}

export interface Strategy {
  id: string
  name: string
  description: string
  createdBy: string
  indicators: Indicator[]
  buyConditions: string[]
  sellConditions: string[]
  stopLoss: number
  takeProfit: number
  trailingStop: number
  winRate: number
  monthlyReturn: number
  maxDrawdown: number
  price?: number
  subscribers?: number
  isPublic?: boolean
  createdAt: string
}

export interface BacktestResult {
  strategyId: string
  totalTrades: number
  winningTrades: number
  losingTrades: number
  winRate: number
  profitFactor: number
  maxDrawdown: number
  totalReturn: number
  averageWin: number
  averageLoss: number
  equityCurve: { timestamp: number; equity: number }[]
  trades: Trade[]
}

export interface Trade {
  id: string
  timestamp: number
  symbol: string
  type: 'buy' | 'sell'
  quantity: number
  price: number
  pnl?: number
}

export interface Notification {
  id: string
  type: 'signal' | 'alert' | 'risk' | 'info'
  title: string
  message: string
  timestamp: number
  read: boolean
}

export interface DashboardStats {
  portfolioValue: number
  dailyPnL: number
  dailyPnLPercent: number
  marginUsed: number
  marginAvailable: number
  openPositions: number
}

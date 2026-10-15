import type { MarketData, Position, DashboardStats } from '@/types'

export function generateCandlestickData(days: number = 90): MarketData[] {
  const data: MarketData[] = []
  let basePrice = 45000
  const now = Date.now()
  
  for (let i = days; i >= 0; i--) {
    const timestamp = now - i * 24 * 60 * 60 * 1000
    const volatility = 0.02
    const change = (Math.random() - 0.48) * basePrice * volatility
    
    const open = basePrice
    const close = basePrice + change
    const high = Math.max(open, close) * (1 + Math.random() * 0.01)
    const low = Math.min(open, close) * (1 - Math.random() * 0.01)
    const volume = Math.floor(Math.random() * 1000000 + 500000)
    
    data.push({ timestamp, open, high, low, close, volume })
    basePrice = close
  }
  
  return data
}

export function generatePortfolioData(days: number = 30): { timestamp: number; value: number }[] {
  const data: { timestamp: number; value: number }[] = []
  let baseValue = 50000
  const now = Date.now()
  
  for (let i = days; i >= 0; i--) {
    const timestamp = now - i * 24 * 60 * 60 * 1000
    const change = (Math.random() - 0.45) * baseValue * 0.015
    baseValue += change
    data.push({ timestamp, value: baseValue })
  }
  
  return data
}

export function generatePnLData(days: number = 30): { timestamp: number; pnl: number }[] {
  const data: { timestamp: number; pnl: number }[] = []
  const now = Date.now()
  
  for (let i = days; i >= 0; i--) {
    const timestamp = now - i * 24 * 60 * 60 * 1000
    const pnl = (Math.random() - 0.4) * 2000
    data.push({ timestamp, pnl })
  }
  
  return data
}

export const mockPositions: Position[] = [
  {
    id: '1',
    symbol: 'BTC/USD',
    type: 'long',
    quantity: 0.5,
    entryPrice: 44500,
    currentPrice: 45200,
    pnl: 350,
    pnlPercent: 1.57,
  },
  {
    id: '2',
    symbol: 'ETH/USD',
    type: 'long',
    quantity: 5,
    entryPrice: 2340,
    currentPrice: 2380,
    pnl: 200,
    pnlPercent: 1.71,
  },
  {
    id: '3',
    symbol: 'AAPL',
    type: 'short',
    quantity: 100,
    entryPrice: 178.50,
    currentPrice: 180.20,
    pnl: -170,
    pnlPercent: -0.95,
  },
]

export const mockDashboardStats: DashboardStats = {
  portfolioValue: 52450.80,
  dailyPnL: 1245.60,
  dailyPnLPercent: 2.43,
  marginUsed: 28500,
  marginAvailable: 21500,
  openPositions: 3,
}

export const mockMarketIndices = [
  { name: 'S&P 500', value: 4783.45, change: 1.2 },
  { name: 'Nasdaq', value: 15043.12, change: 1.8 },
  { name: 'Dow Jones', value: 37305.16, change: 0.8 },
  { name: 'BTC', value: 45200, change: 3.2 },
  { name: 'ETH', value: 2380, change: 2.1 },
]

export const assetAllocation = [
  { name: 'Crypto', value: 23500, percentage: 44.8 },
  { name: 'Stocks', value: 18950, percentage: 36.1 },
  { name: 'Forex', value: 7000, percentage: 13.3 },
  { name: 'Cash', value: 3000, percentage: 5.8 },
]

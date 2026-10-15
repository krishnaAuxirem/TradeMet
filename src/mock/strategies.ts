import type { Strategy, BacktestResult, Notification } from '@/types'

export const mockStrategies: Strategy[] = [
  {
    id: '1',
    name: 'RSI Mean Reversion',
    description: 'Buy oversold conditions (RSI < 30), sell overbought (RSI > 70)',
    createdBy: 'John Trader',
    indicators: [
      { id: 'rsi1', name: 'RSI', type: 'rsi', params: { period: 14 } },
    ],
    buyConditions: ['RSI < 30'],
    sellConditions: ['RSI > 70'],
    stopLoss: 2,
    takeProfit: 5,
    trailingStop: 1.5,
    winRate: 68.5,
    monthlyReturn: 12.4,
    maxDrawdown: -8.2,
    price: 49.99,
    subscribers: 234,
    isPublic: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Golden Cross Strategy',
    description: 'Buy when 50-day MA crosses above 200-day MA',
    createdBy: 'Sarah Quant',
    indicators: [
      { id: 'ma1', name: 'MA 50', type: 'ma', params: { period: 50 } },
      { id: 'ma2', name: 'MA 200', type: 'ma', params: { period: 200 } },
    ],
    buyConditions: ['MA50 > MA200'],
    sellConditions: ['MA50 < MA200'],
    stopLoss: 3,
    takeProfit: 8,
    trailingStop: 2,
    winRate: 72.3,
    monthlyReturn: 15.8,
    maxDrawdown: -10.5,
    price: 79.99,
    subscribers: 456,
    isPublic: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'MACD Momentum',
    description: 'Trade MACD crossovers with trend confirmation',
    createdBy: 'Mike Algo',
    indicators: [
      { id: 'macd1', name: 'MACD', type: 'macd', params: { fast: 12, slow: 26, signal: 9 } },
    ],
    buyConditions: ['MACD > Signal'],
    sellConditions: ['MACD < Signal'],
    stopLoss: 2.5,
    takeProfit: 6,
    trailingStop: 1.8,
    winRate: 65.2,
    monthlyReturn: 10.5,
    maxDrawdown: -7.8,
    price: 39.99,
    subscribers: 189,
    isPublic: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Bollinger Breakout',
    description: 'Trade breakouts from Bollinger Bands',
    createdBy: 'Lisa Strategy',
    indicators: [
      { id: 'bb1', name: 'Bollinger Bands', type: 'bb', params: { period: 20, stdDev: 2 } },
    ],
    buyConditions: ['Price > Upper Band'],
    sellConditions: ['Price < Lower Band'],
    stopLoss: 1.5,
    takeProfit: 4,
    trailingStop: 1,
    winRate: 58.9,
    monthlyReturn: 8.2,
    maxDrawdown: -6.5,
    price: 29.99,
    subscribers: 145,
    isPublic: true,
    createdAt: new Date().toISOString(),
  },
]

export const mockBacktestResult: BacktestResult = {
  strategyId: '1',
  totalTrades: 150,
  winningTrades: 98,
  losingTrades: 52,
  winRate: 65.33,
  profitFactor: 2.14,
  maxDrawdown: -8.2,
  totalReturn: 42.5,
  averageWin: 2.8,
  averageLoss: -1.3,
  equityCurve: generateEquityCurve(150),
  trades: [],
}

function generateEquityCurve(trades: number): { timestamp: number; equity: number }[] {
  const data: { timestamp: number; equity: number }[] = []
  let equity = 10000
  const now = Date.now()
  const dayMs = 24 * 60 * 60 * 1000
  
  for (let i = 0; i < trades; i++) {
    const timestamp = now - (trades - i) * dayMs
    const change = (Math.random() - 0.35) * equity * 0.02
    equity += change
    data.push({ timestamp, equity })
  }
  
  return data
}

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'signal',
    title: 'Buy Signal',
    message: 'RSI Mean Reversion generated BUY signal for BTC/USD',
    timestamp: Date.now() - 300000,
    read: false,
  },
  {
    id: '2',
    type: 'alert',
    title: 'Strategy Alert',
    message: 'Golden Cross Strategy reached take profit on ETH/USD',
    timestamp: Date.now() - 900000,
    read: false,
  },
  {
    id: '3',
    type: 'risk',
    title: 'Risk Warning',
    message: 'Margin usage at 85% - consider reducing positions',
    timestamp: Date.now() - 1800000,
    read: true,
  },
  {
    id: '4',
    type: 'info',
    title: 'Market Update',
    message: 'High volatility detected in crypto markets',
    timestamp: Date.now() - 3600000,
    read: true,
  },
]

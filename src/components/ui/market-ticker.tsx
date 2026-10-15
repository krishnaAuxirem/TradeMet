import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TickerItem {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

interface MarketTickerProps {
  onSymbolClick?: (symbol: string) => void
  watchlist?: string[]
}

const defaultTickers: TickerItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 45234.50, change: 1234.50, changePercent: 2.81 },
  { symbol: 'ETH', name: 'Ethereum', price: 2456.78, change: -45.23, changePercent: -1.81 },
  { symbol: 'AAPL', name: 'Apple', price: 178.34, change: 2.45, changePercent: 1.39 },
  { symbol: 'TSLA', name: 'Tesla', price: 242.56, change: -5.67, changePercent: -2.28 },
  { symbol: 'SOL', name: 'Solana', price: 98.45, change: 4.32, changePercent: 4.59 },
  { symbol: 'NVDA', name: 'NVIDIA', price: 495.23, change: 8.90, changePercent: 1.83 },
  { symbol: 'BNB', name: 'Binance', price: 312.45, change: -2.34, changePercent: -0.74 },
  { symbol: 'MSFT', name: 'Microsoft', price: 378.90, change: 3.21, changePercent: 0.85 },
  { symbol: 'ADA', name: 'Cardano', price: 0.542, change: 0.012, changePercent: 2.26 },
  { symbol: 'GOOGL', name: 'Google', price: 142.56, change: -1.23, changePercent: -0.86 },
]

export function MarketTicker({ onSymbolClick, watchlist }: MarketTickerProps) {
  const [tickers, setTickers] = useState<TickerItem[]>(defaultTickers)
  const [isPaused, setIsPaused] = useState(false)

  // Simulate live price updates
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((ticker) => {
          const randomChange = (Math.random() - 0.5) * ticker.price * 0.001
          const newPrice = ticker.price + randomChange
          const change = newPrice - (ticker.price - ticker.change)
          const changePercent = (change / (ticker.price - ticker.change)) * 100

          return {
            ...ticker,
            price: newPrice,
            change,
            changePercent,
          }
        })
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [isPaused])

  const displayTickers = watchlist && watchlist.length > 0
    ? tickers.filter((t) => watchlist.includes(t.symbol))
    : tickers

  // Duplicate tickers for seamless loop
  const tickerItems = [...displayTickers, ...displayTickers, ...displayTickers]

  return (
    <div
      className="relative overflow-hidden border-b border-border bg-card/50 backdrop-blur-sm"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex animate-scroll-ticker">
        {tickerItems.map((ticker, index) => {
          const isPositive = ticker.change >= 0

          return (
            <button
              key={`${ticker.symbol}-${index}`}
              onClick={() => onSymbolClick?.(ticker.symbol)}
              className="flex items-center gap-3 border-r border-border px-6 py-3 transition-colors hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">{ticker.symbol}</span>
                <span className="text-xs text-muted-foreground">{ticker.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-sm">
                  ${ticker.price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>

                <div
                  className={cn(
                    'flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium',
                    isPositive
                      ? 'bg-success/10 text-success'
                      : 'bg-danger/10 text-danger'
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>
                    {isPositive ? '+' : ''}
                    {ticker.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Add CSS animation in global styles */}
      <style>{`
        @keyframes scroll-ticker {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll-ticker {
          animation: scroll-ticker 60s linear infinite;
          animation-play-state: ${isPaused ? 'paused' : 'running'};
        }

        .animate-scroll-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}

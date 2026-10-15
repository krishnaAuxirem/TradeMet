import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CandlestickChart } from '@/components/charts/CandlestickChart'
import { Badge } from '@/components/ui/badge'
import { generateCandlestickData } from '@/mock/marketData'
import { TIMEFRAMES, Timeframe, INDICATOR_TYPES } from '@/constants'
import { cn } from '@/lib/utils'

export function Analytics() {
  const [timeframe, setTimeframe] = useState<Timeframe>('1M')
  const [activeIndicators, setActiveIndicators] = useState<string[]>(['ma'])

  const getDays = (tf: Timeframe) => {
    const map: Record<Timeframe, number> = { '1D': 1, '1W': 7, '1M': 30, '3M': 90, '1Y': 365 }
    return map[tf]
  }

  const marketData = generateCandlestickData(getDays(timeframe))

  const toggleIndicator = (id: string) => {
    setActiveIndicators((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Market Analytics</h1>
          <p className="mt-2 text-muted-foreground">
            Advanced charting with technical indicators
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>BTC/USD Chart</CardTitle>
                <CardDescription>Live market data with technical analysis</CardDescription>
              </div>
              <div className="flex gap-2">
                {TIMEFRAMES.map((tf) => (
                  <Button
                    key={tf}
                    variant={timeframe === tf ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTimeframe(tf)}
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CandlestickChart data={marketData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technical Indicators</CardTitle>
            <CardDescription>Select indicators to display on chart</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {INDICATOR_TYPES.map((indicator) => (
                <button
                  key={indicator.id}
                  onClick={() => toggleIndicator(indicator.id)}
                  className={cn(
                    'rounded-lg border p-4 text-left transition-colors',
                    activeIndicators.includes(indicator.id)
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{indicator.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {indicator.id.toUpperCase()}
                      </p>
                    </div>
                    {activeIndicators.includes(indicator.id) && (
                      <Badge variant="default">Active</Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Indicator Analysis</CardTitle>
            <CardDescription>Current readings and signals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">RSI (14)</p>
                  <p className="text-sm text-muted-foreground">Relative Strength Index</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">45.2</p>
                  <Badge variant="success">Neutral</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">MACD</p>
                  <p className="text-sm text-muted-foreground">Moving Average Convergence Divergence</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-success">+125.4</p>
                  <Badge variant="success">Bullish</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">MA (50/200)</p>
                  <p className="text-sm text-muted-foreground">Moving Average Crossover</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">50-day: $44,850</p>
                  <p className="text-sm font-medium">200-day: $43,200</p>
                  <Badge variant="success">Golden Cross</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">Bollinger Bands</p>
                  <p className="text-sm text-muted-foreground">Volatility Indicator</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Upper: $46,200</p>
                  <p className="text-sm">Middle: $45,000</p>
                  <p className="text-sm">Lower: $43,800</p>
                  <Badge variant="default">Mid-range</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

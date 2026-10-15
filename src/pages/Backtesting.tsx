import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Play, ArrowLeft } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LineChart } from '@/components/charts/LineChart'
import { Badge } from '@/components/ui/badge'
import { useStrategyStore } from '@/store/strategyStore'
import { mockBacktestResult } from '@/mock/strategies'
import { formatCurrency, formatPercent } from '@/lib/utils'

export function Backtesting() {
  const { id } = useParams()
  const navigate = useNavigate()
  const strategy = useStrategyStore((state) => state.getStrategyById(id || ''))
  const [result, setResult] = useState<typeof mockBacktestResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)

  const runBacktest = async () => {
    setIsRunning(true)
    // Simulate backtest running
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setResult(mockBacktestResult)
    setIsRunning(false)
  }

  if (!strategy) {
    return (
      <DashboardLayout>
        <div className="text-center">
          <h2 className="text-2xl font-bold">Strategy not found</h2>
          <Button onClick={() => navigate('/marketplace')} className="mt-4">
            Back to Marketplace
          </Button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/marketplace')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Backtest Strategy</h1>
            <p className="mt-2 text-muted-foreground">{strategy.name}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Run Backtest</CardTitle>
                <CardDescription>Test strategy performance on historical data</CardDescription>
              </div>
              <Button onClick={runBacktest} disabled={isRunning}>
                <Play className="mr-2 h-4 w-4" />
                {isRunning ? 'Running...' : 'Run Backtest'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Test Period</p>
                <p className="mt-1 text-xl font-bold">90 Days</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Initial Capital</p>
                <p className="mt-1 text-xl font-bold">$10,000</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Commission</p>
                <p className="mt-1 text-xl font-bold">0.1%</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Slippage</p>
                <p className="mt-1 text-xl font-bold">0.05%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {result && (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground">Total Return</p>
                  <h3 className="mt-2 text-2xl font-bold text-success">
                    {formatPercent(result.totalReturn)}
                  </h3>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground">Win Rate</p>
                  <h3 className="mt-2 text-2xl font-bold">{formatPercent(result.winRate)}</h3>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground">Profit Factor</p>
                  <h3 className="mt-2 text-2xl font-bold">{result.profitFactor.toFixed(2)}</h3>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground">Max Drawdown</p>
                  <h3 className="mt-2 text-2xl font-bold text-destructive">
                    {formatPercent(result.maxDrawdown)}
                  </h3>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Equity Curve</CardTitle>
                <CardDescription>Portfolio value over time</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={result.equityCurve}
                  color="hsl(142, 76%, 36%)"
                  label="Equity"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trade Statistics</CardTitle>
                <CardDescription>Detailed performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Trades</p>
                    <p className="text-2xl font-bold">{result.totalTrades}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Winning Trades</p>
                    <p className="text-2xl font-bold text-success">{result.winningTrades}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Losing Trades</p>
                    <p className="text-2xl font-bold text-destructive">{result.losingTrades}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Average Win</p>
                    <p className="text-2xl font-bold text-success">
                      {formatPercent(result.averageWin)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Average Loss</p>
                    <p className="text-2xl font-bold text-destructive">
                      {formatPercent(result.averageLoss)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Risk/Reward Ratio</p>
                    <p className="text-2xl font-bold">
                      {(Math.abs(result.averageWin) / Math.abs(result.averageLoss)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trade Distribution</CardTitle>
                <CardDescription>Win/loss breakdown by percentage range</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm text-muted-foreground">0-2% Wins</div>
                    <div className="flex-1">
                      <div className="h-8 rounded-lg bg-success/20">
                        <div
                          className="h-full rounded-lg bg-success"
                          style={{ width: '35%' }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm font-medium">35</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm text-muted-foreground">2-5% Wins</div>
                    <div className="flex-1">
                      <div className="h-8 rounded-lg bg-success/20">
                        <div
                          className="h-full rounded-lg bg-success"
                          style={{ width: '45%' }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm font-medium">45</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm text-muted-foreground">5%+ Wins</div>
                    <div className="flex-1">
                      <div className="h-8 rounded-lg bg-success/20">
                        <div
                          className="h-full rounded-lg bg-success"
                          style={{ width: '18%' }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm font-medium">18</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm text-muted-foreground">0-2% Losses</div>
                    <div className="flex-1">
                      <div className="h-8 rounded-lg bg-destructive/20">
                        <div
                          className="h-full rounded-lg bg-destructive"
                          style={{ width: '28%' }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm font-medium">28</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 text-sm text-muted-foreground">2%+ Losses</div>
                    <div className="flex-1">
                      <div className="h-8 rounded-lg bg-destructive/20">
                        <div
                          className="h-full rounded-lg bg-destructive"
                          style={{ width: '24%' }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm font-medium">24</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}

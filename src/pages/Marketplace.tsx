import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Users, DollarSign, Play } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useStrategyStore } from '@/store/strategyStore'
import { formatCurrency, formatPercent } from '@/lib/utils'

export function Marketplace() {
  const navigate = useNavigate()
  const { strategies, loadStrategies } = useStrategyStore()

  useEffect(() => {
    loadStrategies()
  }, [loadStrategies])

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Strategy Marketplace</h1>
            <p className="mt-2 text-muted-foreground">
              Discover and deploy proven trading strategies
            </p>
          </div>
          <Button onClick={() => navigate('/strategy-builder')}>
            Create New Strategy
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {strategies.map((strategy) => (
            <Card key={strategy.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{strategy.name}</CardTitle>
                    <CardDescription className="mt-1 line-clamp-2">
                      {strategy.description}
                    </CardDescription>
                  </div>
                  {strategy.isPublic && <Badge variant="success">Public</Badge>}
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Created by</span>
                    <span className="font-medium">{strategy.createdBy}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Win Rate</span>
                    <Badge variant="success">{formatPercent(strategy.winRate)}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Monthly Return</span>
                    <Badge variant="success">{formatPercent(strategy.monthlyReturn)}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Max Drawdown</span>
                    <Badge variant="danger">{formatPercent(strategy.maxDrawdown)}</Badge>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{strategy.subscribers || 0}</span>
                      </div>
                      {strategy.price && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          <span>{formatCurrency(strategy.price)}/mo</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate(`/backtesting/${strategy.id}`)}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Backtest
                    </Button>
                    <Button className="flex-1">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Subscribe
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {strategies.length === 0 && (
          <Card>
            <CardContent className="flex min-h-[300px] flex-col items-center justify-center p-8">
              <TrendingUp className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No strategies yet</h3>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Create your first trading strategy to get started
              </p>
              <Button onClick={() => navigate('/strategy-builder')} className="mt-6">
                Create Strategy
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

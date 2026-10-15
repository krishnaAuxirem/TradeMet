import { DollarSign, TrendingUp, TrendingDown, PieChart as PieChartIcon, Activity } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StatCard } from '@/components/cards/StatCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'
import { PieChart } from '@/components/charts/PieChart'
import { Badge } from '@/components/ui/badge'
import {
  mockDashboardStats,
  mockPositions,
  mockMarketIndices,
  generatePortfolioData,
  generatePnLData,
  assetAllocation,
} from '@/mock/marketData'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { cn } from '@/lib/utils'

export function Dashboard() {
  const portfolioData = generatePortfolioData(30)
  const pnlData = generatePnLData(30)

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trading Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Monitor your portfolio performance and market positions
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Portfolio Value"
            value={formatCurrency(mockDashboardStats.portfolioValue)}
            icon={DollarSign}
          />
          <StatCard
            title="Daily P&L"
            value={formatCurrency(mockDashboardStats.dailyPnL)}
            change={formatPercent(mockDashboardStats.dailyPnLPercent)}
            changeType={mockDashboardStats.dailyPnL >= 0 ? 'positive' : 'negative'}
            icon={mockDashboardStats.dailyPnL >= 0 ? TrendingUp : TrendingDown}
          />
          <StatCard
            title="Margin Used"
            value={formatCurrency(mockDashboardStats.marginUsed)}
            change={`${formatCurrency(mockDashboardStats.marginAvailable)} available`}
            changeType="neutral"
            icon={Activity}
          />
          <StatCard
            title="Open Positions"
            value={mockDashboardStats.openPositions.toString()}
            icon={PieChartIcon}
          />
        </div>

        {/* Charts Row */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Growth</CardTitle>
              <CardDescription>Last 30 days performance</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart data={portfolioData} label="Portfolio Value" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Daily P&L</CardTitle>
              <CardDescription>Profit and loss trend</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart data={pnlData} />
            </CardContent>
          </Card>
        </div>

        {/* Market Indices and Asset Allocation */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Market Indices</CardTitle>
              <CardDescription>Real-time market overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMarketIndices.map((index) => (
                  <div key={index.name} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{index.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(index.value, 2)}
                      </p>
                    </div>
                    <Badge variant={index.change >= 0 ? 'success' : 'danger'}>
                      {formatPercent(index.change)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
              <CardDescription>Portfolio distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <PieChart data={assetAllocation} />
            </CardContent>
          </Card>
        </div>

        {/* Open Positions */}
        <Card>
          <CardHeader>
            <CardTitle>Open Positions</CardTitle>
            <CardDescription>Currently active trades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Symbol</th>
                    <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Quantity</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Entry</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Current</th>
                    <th className="pb-3 text-right text-sm font-medium text-muted-foreground">P&L</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPositions.map((position) => (
                    <tr key={position.id} className="border-b border-border">
                      <td className="py-3 font-medium">{position.symbol}</td>
                      <td className="py-3">
                        <Badge variant={position.type === 'long' ? 'success' : 'danger'}>
                          {position.type.toUpperCase()}
                        </Badge>
                      </td>
                      <td className="py-3 text-right">{position.quantity}</td>
                      <td className="py-3 text-right">{formatCurrency(position.entryPrice)}</td>
                      <td className="py-3 text-right">{formatCurrency(position.currentPrice)}</td>
                      <td className="py-3 text-right">
                        <span
                          className={cn(
                            'font-medium',
                            position.pnl >= 0 ? 'text-success' : 'text-destructive'
                          )}
                        >
                          {formatCurrency(position.pnl)} ({formatPercent(position.pnlPercent)})
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

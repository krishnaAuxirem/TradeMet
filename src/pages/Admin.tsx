import { Users, TrendingUp, DollarSign, BarChart3, Activity } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StatCard } from '@/components/cards/StatCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart } from '@/components/charts/LineChart'
import { Badge } from '@/components/ui/badge'
import { formatCurrency, formatCompactNumber } from '@/lib/utils'

const mockAdminStats = {
  totalUsers: 2847,
  totalStrategies: 156,
  platformRevenue: 48250,
  tradingVolume: 12500000,
}

const revenueData = Array.from({ length: 30 }, (_, i) => ({
  timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
  value: 40000 + Math.random() * 15000,
}))

const topStrategies = [
  { name: 'RSI Mean Reversion', subscribers: 234, revenue: 11696 },
  { name: 'Golden Cross Strategy', subscribers: 456, revenue: 36474 },
  { name: 'MACD Momentum', subscribers: 189, revenue: 7556 },
  { name: 'Bollinger Breakout', subscribers: 145, revenue: 4349 },
]

const recentUsers = [
  { name: 'John Doe', email: 'john@example.com', role: 'trader', joined: '2 hours ago' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'developer', joined: '5 hours ago' },
  { name: 'Mike Johnson', email: 'mike@example.com', role: 'trader', joined: '1 day ago' },
  { name: 'Sarah Wilson', email: 'sarah@example.com', role: 'trader', joined: '2 days ago' },
]

export function Admin() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Platform overview and analytics
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={formatCompactNumber(mockAdminStats.totalUsers)}
            change="+12.5% from last month"
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="Total Strategies"
            value={mockAdminStats.totalStrategies.toString()}
            change="+8 new this week"
            changeType="positive"
            icon={TrendingUp}
          />
          <StatCard
            title="Platform Revenue"
            value={formatCurrency(mockAdminStats.platformRevenue, 0)}
            change="+18.2% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <StatCard
            title="Trading Volume"
            value={formatCurrency(mockAdminStats.tradingVolume, 0)}
            change="+24.1% from last month"
            changeType="positive"
            icon={BarChart3}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>Platform revenue over last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart data={revenueData} label="Revenue" color="hsl(142, 76%, 36%)" />
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Strategies</CardTitle>
              <CardDescription>Most subscribed strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topStrategies.map((strategy, index) => (
                  <div
                    key={strategy.name}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{strategy.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {strategy.subscribers} subscribers
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(strategy.revenue, 0)}</p>
                      <p className="text-xs text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>Newly registered accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div
                    key={user.email}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        {user.role}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{user.joined}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

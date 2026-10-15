import { Code, TrendingUp, DollarSign, Users, Package } from 'lucide-react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { StatCard } from '@/components/cards/StatCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart } from '@/components/charts/LineChart'
import { BarChart } from '@/components/charts/BarChart'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { formatCurrency, formatPercent } from '@/lib/utils'

const mockDeveloperStats = {
  publishedStrategies: 12,
  totalSubscribers: 487,
  monthlyRevenue: 24350,
  averageRating: 4.7,
}

const revenueData = Array.from({ length: 30 }, (_, i) => ({
  timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
  value: 20000 + Math.random() * 10000,
}))

const subscribersData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  value: 400 + Math.floor(Math.random() * 100),
}))

const myStrategies = [
  {
    id: '1',
    name: 'RSI Mean Reversion Pro',
    subscribers: 156,
    revenue: 7800,
    winRate: 68.5,
    monthlyReturn: 12.4,
    status: 'active',
  },
  {
    id: '2',
    name: 'MACD Momentum Trader',
    subscribers: 234,
    revenue: 11700,
    winRate: 72.3,
    monthlyReturn: 15.8,
    status: 'active',
  },
  {
    id: '3',
    name: 'Bollinger Breakout',
    subscribers: 97,
    revenue: 4850,
    winRate: 65.2,
    monthlyReturn: 10.2,
    status: 'active',
  },
]

const recentActivity = [
  { type: 'subscription', user: 'John D.', strategy: 'RSI Mean Reversion Pro', time: '2 hours ago' },
  { type: 'subscription', user: 'Sarah M.', strategy: 'MACD Momentum Trader', time: '5 hours ago' },
  { type: 'review', user: 'Mike J.', strategy: 'Bollinger Breakout', rating: 5, time: '1 day ago' },
  { type: 'subscription', user: 'Emma W.', strategy: 'RSI Mean Reversion Pro', time: '2 days ago' },
]

export function DeveloperDashboard() {
  const navigate = useNavigate()

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Developer Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your strategies and track performance
            </p>
          </div>
          <Button onClick={() => navigate('/strategy-builder')}>
            <Code className="mr-2 h-4 w-4" />
            Create New Strategy
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Published Strategies"
            value={mockDeveloperStats.publishedStrategies.toString()}
            change="+2 this month"
            changeType="positive"
            icon={Package}
          />
          <StatCard
            title="Total Subscribers"
            value={mockDeveloperStats.totalSubscribers.toString()}
            change="+23 this week"
            changeType="positive"
            icon={Users}
          />
          <StatCard
            title="Monthly Revenue"
            value={formatCurrency(mockDeveloperStats.monthlyRevenue, 0)}
            change="+15.3% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <StatCard
            title="Average Rating"
            value={mockDeveloperStats.averageRating.toFixed(1)}
            change="⭐⭐⭐⭐⭐"
            changeType="neutral"
            icon={TrendingUp}
          />
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart data={revenueData} label="Revenue" color="hsl(142, 76%, 36%)" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscriber Growth</CardTitle>
              <CardDescription>Total subscribers over last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart data={subscribersData} />
            </CardContent>
          </Card>
        </div>

        {/* My Strategies */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Strategies</CardTitle>
                <CardDescription>Published strategies and performance</CardDescription>
              </div>
              <Button variant="outline" onClick={() => navigate('/marketplace')}>
                View in Marketplace
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myStrategies.map((strategy) => (
                <div
                  key={strategy.id}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{strategy.name}</h3>
                      <Badge variant="success">{strategy.status}</Badge>
                    </div>
                    <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Subscribers: </span>
                        <span className="font-medium">{strategy.subscribers}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Win Rate: </span>
                        <span className="font-medium text-success">{formatPercent(strategy.winRate)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Return: </span>
                        <span className="font-medium text-success">{formatPercent(strategy.monthlyReturn)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {formatCurrency(strategy.revenue, 0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Monthly Revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest subscriptions and reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border border-border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      {activity.type === 'subscription' ? (
                        <Users className="h-5 w-5 text-primary" />
                      ) : (
                        <TrendingUp className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>
                        {activity.type === 'subscription' ? ' subscribed to ' : ' reviewed '}
                        <span className="font-medium">{activity.strategy}</span>
                      </p>
                      {activity.type === 'review' && (
                        <div className="mt-1 text-xs text-muted-foreground">
                          Rating: {'⭐'.repeat(activity.rating || 0)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

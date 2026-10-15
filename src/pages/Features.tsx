import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  BarChart3,
  Cpu,
  TestTube2,
  ShoppingCart,
  LineChart,
  Shield,
  Zap,
  Bell,
  Database,
  Brain,
  Layers,
} from 'lucide-react'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { FeatureCard } from '@/components/cards/FeatureCard'
import { Button } from '@/components/ui/button'

export function Features() {
  const navigate = useNavigate()

  const coreFeatures = [
    {
      icon: TrendingUp,
      title: 'Trading Dashboard',
      description:
        'Real-time portfolio tracking with live P&L monitoring, margin usage analytics, open positions overview, and market indices at a glance.',
    },
    {
      icon: BarChart3,
      title: 'Market Analytics',
      description:
        'Advanced charting with candlestick patterns, timeframe switching, and technical indicators including Moving Averages, RSI, MACD, and Bollinger Bands.',
    },
    {
      icon: Cpu,
      title: 'Strategy Builder',
      description:
        'Visual strategy creation interface with indicator selection, custom buy/sell conditions, stop-loss, take-profit, and trailing stop configurations.',
    },
    {
      icon: TestTube2,
      title: 'Backtesting Engine',
      description:
        'Test strategies on historical data with detailed performance metrics including win rate, profit factor, max drawdown, and equity curve visualization.',
    },
    {
      icon: ShoppingCart,
      title: 'Strategy Marketplace',
      description:
        'Discover and deploy proven trading strategies created by expert developers. Subscribe to strategies with verified performance metrics.',
    },
    {
      icon: LineChart,
      title: 'Performance Analytics',
      description:
        'Comprehensive performance tracking with trade distribution analysis, rolling statistics, and comparative strategy metrics.',
    },
  ]

  const advancedFeatures = [
    {
      icon: Brain,
      title: 'AI-Powered Signals',
      description:
        'Machine learning algorithms analyze market patterns and generate high-probability trading signals with confidence scores.',
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description:
        'Advanced position sizing calculators, portfolio risk analytics, and automated risk controls to protect your capital.',
    },
    {
      icon: Zap,
      title: 'Real-Time Execution',
      description:
        'Lightning-fast order execution with support for market, limit, and stop orders across multiple asset classes.',
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description:
        'Customizable alerts for trade signals, strategy triggers, risk warnings, and market events delivered instantly.',
    },
    {
      icon: Database,
      title: 'Multi-Asset Support',
      description:
        'Trade cryptocurrencies, stocks, forex, and commodities—all from a single unified platform.',
    },
    {
      icon: Layers,
      title: 'API Integration',
      description:
        'Connect to major exchanges and brokers with our robust API infrastructure for seamless data flow.',
    },
  ]

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-background to-accent/5 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Powerful Features for Modern Traders
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Everything you need to build, test, and deploy winning trading strategies
            </p>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="border-b border-border bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Core Features</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Essential tools for professional algorithmic trading
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {coreFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
          
          {/* Feature Showcase Images */}
          <div className="mt-20 grid gap-8 md:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">
              <img
                src="/feature-terminal.jpg"
                alt="Professional Trading Terminal"
                className="h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-lg bg-background/90 p-3 backdrop-blur">
                  <div className="text-xs text-muted-foreground">Professional Setup</div>
                  <div className="text-sm font-semibold text-foreground">Multi-Monitor Trading</div>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">
              <img
                src="/feature-algorithm.jpg"
                alt="Algorithmic Strategy Visualization"
                className="h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-lg bg-background/90 p-3 backdrop-blur">
                  <div className="text-xs text-muted-foreground">AI-Powered</div>
                  <div className="text-sm font-semibold text-foreground">Strategy Algorithms</div>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">
              <img
                src="/feature-backtest.jpg"
                alt="Backtesting Analytics"
                className="h-64 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="rounded-lg bg-background/90 p-3 backdrop-blur">
                  <div className="text-xs text-muted-foreground">Historical Data</div>
                  <div className="text-sm font-semibold text-foreground">Backtesting Engine</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features */}
      <section className="border-b border-border bg-accent/5 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Advanced Capabilities</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Next-generation features powered by AI and automation
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {advancedFeatures.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/5 py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Start Trading Smarter Today
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Access all features with a free trial. No credit card required.
          </p>
          <div className="mt-8">
            <Button size="lg" onClick={() => navigate('/signup')}>
              Get Started Free
            </Button>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}

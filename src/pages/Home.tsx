import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  BarChart3,
  Cpu,
  TestTube2,
  ShoppingCart,
  LineChart,
  ArrowRight,
  CheckCircle2,
  Zap,
  Shield,
  Users,
} from 'lucide-react'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { FeatureCard } from '@/components/cards/FeatureCard'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'


export function Home() {
  const navigate = useNavigate()

  const features = [
    {
      icon: TrendingUp,
      title: 'Trading Dashboard',
      description: 'Real-time portfolio tracking with live P&L, margin usage, and open positions overview.',
    },
    {
      icon: BarChart3,
      title: 'Market Analytics',
      description: 'Advanced charting with technical indicators including MA, RSI, MACD, and Bollinger Bands.',
    },
    {
      icon: Cpu,
      title: 'Strategy Builder',
      description: 'Create algorithmic trading strategies with custom buy/sell conditions and risk management.',
    },
    {
      icon: TestTube2,
      title: 'Backtesting Engine',
      description: 'Test strategies on historical data with comprehensive performance metrics and equity curves.',
    },
    {
      icon: ShoppingCart,
      title: 'Strategy Marketplace',
      description: 'Discover, subscribe, and deploy proven trading strategies created by expert developers.',
    },
    {
      icon: LineChart,
      title: 'Performance Analytics',
      description: 'Track win rates, profit factors, drawdowns, and risk-reward ratios across all strategies.',
    },
  ]

  const benefits = [
    'AI-powered trading signals and alerts',
    'Real-time market data and analytics',
    'Professional-grade backtesting tools',
    'Strategy marketplace with verified developers',
    'Risk management and portfolio optimization',
    'Multi-asset support (Crypto, Stocks, Forex)',
  ]

  const highlights = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Execute strategies in milliseconds with our optimized infrastructure',
    },
    {
      icon: Shield,
      title: 'Bank-Grade Security',
      description: 'Your data and funds protected with enterprise-level encryption',
    },
    {
      icon: Users,
      title: 'Expert Community',
      description: 'Learn from thousands of successful traders and developers',
    },
  ]

  return (
    <MarketingLayout>
      {/* Hero Section with Images */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-background to-accent/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Zap className="h-4 w-4" />
                Trusted by 10,000+ traders worldwide
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                AI-Powered Trading
                <span className="block bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                  Analytics Platform
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Trade smarter using advanced analytics, algorithmic strategies, and backtesting tools.
                Built for retail traders, professionals, and strategy developers.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" className="h-12 px-8" onClick={() => navigate('/signup')}>
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8" onClick={() => navigate('/features')}>
                  Explore Features
                </Button>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
                <div>
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="mt-1 text-sm text-muted-foreground">Active Traders</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="mt-1 text-sm text-muted-foreground">Strategies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">$2M+</div>
                  <div className="mt-1 text-sm text-muted-foreground">Daily Volume</div>
                </div>
              </div>
            </div>

            {/* Right Image Grid */}
            <div className="grid gap-4 lg:grid-cols-2">
              {/* Main Hero Image - Spans 2 rows */}
              <div className="lg:col-span-2">
                <div className="group relative overflow-hidden rounded-2xl shadow-2xl transition-transform hover:scale-[1.02]">
                  <img
                    src="/hero-main.jpg"
                    alt="TradeMet Trading Dashboard"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="rounded-lg bg-background/90 p-4 backdrop-blur">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-muted-foreground">Live Dashboard</div>
                          <div className="text-lg font-bold text-foreground">Real-Time Analytics</div>
                        </div>
                        <TrendingUp className="h-6 w-6 text-success" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Images */}
              <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">
                <img
                  src="/hero-analytics.jpg"
                  alt="Market Analytics"
                  className="h-64 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="rounded-lg bg-background/90 p-3 backdrop-blur">
                    <div className="text-xs text-muted-foreground">Advanced Charts</div>
                    <div className="text-sm font-semibold text-foreground">Market Analytics</div>
                  </div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">
                <img
                  src="/hero-strategy.jpg"
                  alt="Strategy Builder"
                  className="h-64 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="rounded-lg bg-background/90 p-3 backdrop-blur">
                    <div className="text-xs text-muted-foreground">AI-Powered</div>
                    <div className="text-sm font-semibold text-foreground">Strategy Builder</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-96 w-96 animate-pulse rounded-full bg-emerald-500 blur-3xl" />
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-b border-border bg-accent/5 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <highlight.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{highlight.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{highlight.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Everything You Need to Trade Successfully
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Professional-grade tools designed for modern algorithmic trading
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="border-b border-border bg-accent/5 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src="/hero-growth.jpg"
                    alt="Portfolio Growth"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 rounded-xl bg-background p-6 shadow-xl">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-success">+247%</div>
                    <div className="mt-1 text-sm text-muted-foreground">Annual Return</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Professional Trading Dashboard
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Monitor your portfolio, analyze markets, and execute strategies—all in one place
              </p>
              <div className="mt-8 grid gap-4">
                <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Real-time Market Data</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Live price updates across all major exchanges
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Cpu className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Automated Strategies</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Deploy and monitor multiple strategies simultaneously
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Risk Management</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      Advanced stop-loss and position sizing tools
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-b border-border bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
                Why Choose TradeMet?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join thousands of traders who trust TradeMet for their algorithmic trading needs
              </p>
              <ul className="mt-8 space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-success" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button size="lg" onClick={() => navigate('/signup')}>
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Card className="w-full p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-primary">68.5%</div>
                    <div className="mt-2 text-muted-foreground">Average Win Rate</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">2.8x</div>
                      <div className="mt-1 text-sm text-muted-foreground">Profit Factor</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">15%</div>
                      <div className="mt-1 text-sm text-muted-foreground">Max Drawdown</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">$2M+</div>
                      <div className="mt-1 text-sm text-muted-foreground">Daily Volume</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">99.9%</div>
                      <div className="mt-1 text-sm text-muted-foreground">Uptime</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-emerald-500/10 to-primary/10 py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Ready to Transform Your Trading?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join TradeMet today and start building profitable algorithmic trading strategies
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" className="h-12 px-8" onClick={() => navigate('/signup')}>
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8" onClick={() => navigate('/pricing')}>
              View Pricing
            </Button>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </section>
    </MarketingLayout>
  )
}

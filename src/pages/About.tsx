import { TrendingUp, Target, Users, Zap } from 'lucide-react'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function About() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description:
        'To democratize algorithmic trading by providing professional-grade tools that empower traders of all levels to build, test, and deploy winning strategies.',
    },
    {
      icon: Users,
      title: 'Who We Serve',
      description:
        'Retail traders seeking automation, professional traders optimizing performance, and strategy developers monetizing expertise.',
    },
    {
      icon: Zap,
      title: 'Innovation First',
      description:
        'We leverage cutting-edge AI and machine learning to deliver insights and automation that give our users a competitive edge.',
    },
  ]

  const stats = [
    { value: '10,000+', label: 'Active Traders' },
    { value: '500+', label: 'Trading Strategies' },
    { value: '$2M+', label: 'Daily Trading Volume' },
    { value: '68.5%', label: 'Average Win Rate' },
  ]

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-background to-accent/5 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary">
              <TrendingUp className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              About TradeMet
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Building the future of algorithmic trading, one strategy at a time
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-border bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">TradeMet</span> was founded in 2024 by a
                team of quantitative traders, software engineers, and financial analysts who saw a gap in
                the market: powerful algorithmic trading tools were either too expensive or too complex
                for everyday traders.
              </p>
              <p>
                We built TradeMet to change that. Our platform combines institutional-grade analytics
                with an intuitive interface, making sophisticated trading strategies accessible to everyone—
                from beginners learning the ropes to professionals managing multi-million dollar portfolios.
              </p>
              <p>
                Today, TradeMet serves thousands of traders worldwide, processing millions in daily trading
                volume and hosting hundreds of verified trading strategies. Our community includes retail
                traders, strategy developers, and financial institutions who trust our platform for their
                algorithmic trading needs.
              </p>
              <p>
                We're committed to continuous innovation, leveraging the latest advances in AI and machine
                learning to give our users the edge they need in today's fast-paced markets.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/about-team.jpg"
                  alt="TradeMet Team Collaboration"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <img
                    src="/about-tech.jpg"
                    alt="Technology Infrastructure"
                    className="h-48 w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-center rounded-xl bg-primary/10 p-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">2024</div>
                    <div className="mt-2 text-sm text-muted-foreground">Founded</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border bg-accent/5 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Our Values</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {values.map((value, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">By the Numbers</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our impact on the trading community
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6 text-center">
                  <div className="text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}

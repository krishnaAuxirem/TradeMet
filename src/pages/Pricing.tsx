import { useNavigate } from 'react-router-dom'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { PricingCard } from '@/components/cards/PricingCard'

export function Pricing() {
  const navigate = useNavigate()

  const plans = [
    {
      name: 'Free',
      price: 'Free',
      description: 'Perfect for beginners exploring algorithmic trading',
      features: [
        'Basic trading dashboard',
        'Up to 3 strategies',
        'Limited backtesting (30 days history)',
        'Community support',
        'Basic market analytics',
        'Email notifications',
      ],
    },
    {
      name: 'Pro',
      price: '$49',
      description: 'For serious traders who need advanced tools',
      popular: true,
      features: [
        'Advanced trading dashboard',
        'Unlimited strategies',
        'Full backtesting (10 years history)',
        'Priority support',
        'Advanced market analytics with all indicators',
        'Real-time notifications',
        'Strategy marketplace access',
        'AI-powered trade signals',
        'Risk management tools',
        'Multi-asset support',
      ],
    },
    {
      name: 'Developer',
      price: '$99',
      description: 'For strategy developers and institutional traders',
      features: [
        'Everything in Pro',
        'API access for custom integrations',
        'White-label strategy marketplace',
        'Revenue sharing from published strategies',
        'Advanced performance analytics',
        'Dedicated account manager',
        'Custom indicator development',
        'Priority feature requests',
        'Team collaboration tools',
        'Institutional-grade security',
      ],
    },
  ]

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-background to-accent/5 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Choose the plan that fits your trading needs. Upgrade or downgrade anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => (
              <PricingCard
                key={index}
                {...plan}
                onCTAClick={() => navigate('/signup')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-accent/5 py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-12 space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Can I switch plans anytime?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately,
                and we'll prorate any charges accordingly.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Is there a free trial?
              </h3>
              <p className="mt-2 text-muted-foreground">
                The Free plan is available forever with no credit card required. Pro and Developer plans
                include a 14-day free trial so you can test all features.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                What payment methods do you accept?
              </h3>
              <p className="mt-2 text-muted-foreground">
                We accept all major credit cards, debit cards, and PayPal. Enterprise customers can
                also pay via bank transfer.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Can I cancel my subscription?
              </h3>
              <p className="mt-2 text-muted-foreground">
                Absolutely. You can cancel your subscription at any time from your account settings.
                You'll retain access until the end of your billing period.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  )
}

import { ReactNode } from 'react'
import { MarketingNavbar } from './MarketingNavbar'
import { Footer } from './Footer'
import { ScrollToTop } from '@/components/ui/scroll-to-top'

interface MarketingLayoutProps {
  children: ReactNode
}

export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

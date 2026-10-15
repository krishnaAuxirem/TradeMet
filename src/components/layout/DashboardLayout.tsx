import { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'
import { MarketTicker } from '@/components/ui/market-ticker'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { useNavigate } from 'react-router-dom'

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate()

  const handleSymbolClick = (symbol: string) => {
    // Navigate to analytics page with the selected symbol
    navigate(`/analytics?symbol=${symbol}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Navbar />
        <MarketTicker onSymbolClick={handleSymbolClick} />
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
      <ScrollToTop />
    </div>
  )
}

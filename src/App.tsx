import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Home } from '@/pages/Home'
import { Features } from '@/pages/Features'
import { Pricing } from '@/pages/Pricing'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'
import { Login } from '@/pages/Login'
import { Signup } from '@/pages/Signup'
import { Dashboard } from '@/pages/Dashboard'
import { Analytics } from '@/pages/Analytics'
import { StrategyBuilder } from '@/pages/StrategyBuilder'
import { Backtesting } from '@/pages/Backtesting'
import { Marketplace } from '@/pages/Marketplace'
import { Notifications } from '@/pages/Notifications'
import { Admin } from '@/pages/Admin'
import { DeveloperDashboard } from '@/pages/DeveloperDashboard'
import ProfileSettings from '@/pages/ProfileSettings'
import { NotFound } from '@/pages/NotFound'

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'developer') {
      return <Navigate to="/developer-dashboard" replace />
    } else if (user.role === 'admin') {
      return <Navigate to="/admin" replace />
    } else {
      return <Navigate to="/dashboard" replace />
    }
  }

  return <>{children}</>
}

function DashboardRedirect() {
  const { user } = useAuthStore()
  
  if (user?.role === 'developer') {
    return <Navigate to="/developer-dashboard" replace />
  } else if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />
  }
  
  return <Dashboard />
}

function App() {
  const initAuth = useAuthStore((state) => state.initAuth)

  useEffect(() => {
    initAuth()
  }, [initAuth])

  return (
    <BrowserRouter>
      <Routes>
        {/* Marketing Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Dashboard Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardRedirect />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/strategy-builder"
          element={
            <ProtectedRoute>
              <StrategyBuilder />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/backtesting/:id"
          element={
            <ProtectedRoute>
              <Backtesting />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/marketplace"
          element={
            <ProtectedRoute>
              <Marketplace />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/developer-dashboard"
          element={
            <ProtectedRoute allowedRoles={['developer']}>
              <DeveloperDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Admin />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <ProfileSettings />
            </ProtectedRoute>
          }
        />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

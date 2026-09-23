import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CustomCursor } from './CustomCursor'
import { Footer } from './Footer'
import { Header } from './Header'

export function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <CustomCursor />
      <Header />
      <main className="flex-1">
        <div key={location.pathname} className="page-enter">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}

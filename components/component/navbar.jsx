"use client"

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, LayoutDashboard, User, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ButtonLogin from './buttonLogin'
import { useSessionStore } from '@/hooks/useSessionStore'

export default function Sidebar() {
  const {isAuthenticated} = useSessionStore()
  const [isDashboardOpen, setIsDashboardOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true)
      }
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className='flex flex-row'>
      {isSmallScreen && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 z-50 lg:hidden text-white"
          onClick={toggleSidebar}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-primary" />}
        </Button>
      )}
      <aside
        className={`fixed left-0 top-0 z-[5] flex h-screen w-64 md:w-44 flex-col justify-between items-center gap-2 bg-gray-800 text-white p-2 transition-transform duration-300 ease-in-out ${
          isSmallScreen && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="w-full">
          {/* Logo */}
          <div className="my-2 w-full flex items-center justify-center">
            <img src="/icon.png" alt="Logo" className="h-20 w-16" />
          </div>

          {/* Dashboard Section */}
          {
            isAuthenticated && (
                <div className="w-full">
            <Button
              variant="ghost"
              className={`w-full justify-between ${isDashboardOpen ? 'bg-secondary text-primary' : ''}` }
              onClick={() => setIsDashboardOpen(!isDashboardOpen)}
              aria-expanded={isDashboardOpen}
              aria-controls="dashboard-submenu"
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard className="mr-2 h-4 w-max" />
                Dashboard
              </span>
              {isDashboardOpen ? (
                <ChevronUp className="ml-2 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4" />
              )}
            </Button>
            {isDashboardOpen && (
              <div id="dashboard-submenu" className="mt-2 ml-4">
                <Button variant="ghost" className="w-full justify-start">
                  Submenu Item
                </Button>
              </div>
            )}
          </div>
            )
          }
        </div>

        {/* Account Section */}
        <div className="w-full">
          <Button
            variant="ghost"
            className={`w-full justify-between ${isAccountOpen ? 'bg-secondary text-primary' : ''}` }
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            aria-expanded={isAccountOpen}
            aria-controls="account-submenu"
          >
            <span className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              Account
            </span>
            {isAccountOpen ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4" />
            )}
          </Button>
          {isAccountOpen && (
            <div id="account-submenu" className="mt-2">
              <ButtonLogin />
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}

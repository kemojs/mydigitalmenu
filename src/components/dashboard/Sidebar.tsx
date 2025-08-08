'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Camera,
  Home,
  Menu,
  QrCode,
  BarChart3,
  Settings,
  Palette,
  Users,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Crown,
  Zap
} from 'lucide-react'
import type { User } from '@/types'

interface SidebarProps {
  user: User
}

const Sidebar = ({ user }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navigation = [
    {
      name: 'Übersicht',
      href: '/dashboard',
      icon: Home,
      current: pathname === '/dashboard'
    },
    {
      name: 'Speisekarte',
      href: '/dashboard/menu',
      icon: Menu,
      current: pathname.startsWith('/dashboard/menu')
    },
    {
      name: 'QR-Codes',
      href: '/dashboard/qr-codes',
      icon: QrCode,
      current: pathname.startsWith('/dashboard/qr-codes')
    },
    {
      name: 'Analytics',
      href: '/dashboard/analytics',
      icon: BarChart3,
      current: pathname.startsWith('/dashboard/analytics')
    },
    {
      name: 'Templates',
      href: '/dashboard/templates',
      icon: Palette,
      current: pathname.startsWith('/dashboard/templates')
    },
    {
      name: 'Standorte',
      href: '/dashboard/locations',
      icon: Users,
      current: pathname.startsWith('/dashboard/locations'),
      badge: user.restaurant?.plan !== 'STARTER' ? null : 'Pro'
    }
  ]

  const secondaryNavigation = [
    {
      name: 'Einstellungen',
      href: '/dashboard/settings',
      icon: Settings
    },
    {
      name: 'Abrechnung',
      href: '/dashboard/billing',
      icon: CreditCard
    },
    {
      name: 'Hilfe',
      href: '/help',
      icon: HelpCircle
    }
  ]

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'ENTERPRISE':
        return <Crown className="w-4 h-4 text-yellow-500" />
      case 'PROFESSIONAL':
        return <Zap className="w-4 h-4 text-primary-500" />
      default:
        return <Sparkles className="w-4 h-4 text-blue-500" />
    }
  }

  return (
    <div className={`fixed inset-y-0 left-0 z-50 bg-white shadow-xl transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-display font-bold text-neutral-900">
                MyDigitalMenu
              </span>
            </Link>
          )}
          
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4 text-neutral-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-neutral-600" />
            )}
          </button>
        </div>

        {/* Restaurant Info */}
        {!collapsed && user.restaurant && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 border-b border-neutral-200 bg-gradient-to-r from-primary-50 to-secondary-50"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-neutral-900 truncate">
                  {user.restaurant.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {getPlanIcon(user.restaurant.plan)}
                  <span className="text-sm text-neutral-600">
                    {user.restaurant.plan}
                  </span>
                  {user.restaurant.betaExpiresAt && new Date(user.restaurant.betaExpiresAt) > new Date() && (
                    <span className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full">
                      Beta
                    </span>
                  )}
                </div>
              </div>
              <Link 
                href={`/menu/${user.restaurant.slug}`}
                target="_blank"
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                <QrCode className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.current
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <span className="bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Secondary Navigation */}
        <div className="border-t border-neutral-200 p-4 space-y-2">
          {secondaryNavigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors ${
                  collapsed ? 'justify-center' : ''
                }`}
                title={collapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </div>

        {/* User Info & Logout */}
        <div className="border-t border-neutral-200 p-4">
          {!collapsed && (
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-neutral-600 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors ${
              collapsed ? 'justify-center' : ''
            }`}
            title={collapsed ? 'Abmelden' : undefined}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Abmelden</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
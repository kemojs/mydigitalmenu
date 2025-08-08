'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  Search, 
  Menu as MenuIcon,
  Plus,
  Download,
  ExternalLink,
  Camera,
  Zap,
  Gift
} from 'lucide-react'
import Link from 'next/link'
import type { User } from '@/types'

interface HeaderProps {
  user: User
}

const Header = ({ user }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)

  const notifications = [
    {
      id: 1,
      title: 'Neue Speisekarte gescannt',
      message: 'Ihre Sommerkarte wurde erfolgreich digitalisiert',
      time: '2 Min.',
      type: 'success'
    },
    {
      id: 2,
      title: 'QR-Code Downloads',
      message: '127 neue Scans heute (+23%)',
      time: '1 Std.',
      type: 'info'
    },
    {
      id: 3,
      title: 'Beta läuft ab',
      message: 'Ihr kostenloser Beta-Zugang endet in 45 Tagen',
      time: '1 Tag',
      type: 'warning'
    }
  ]

  const quickActions = [
    {
      name: 'Neue Speisekarte scannen',
      href: '/dashboard/menu/scan',
      icon: Camera,
      description: 'Foto-zu-Digital-Scanner verwenden'
    },
    {
      name: 'QR-Code herunterladen',
      href: '/dashboard/qr-codes/download',
      icon: Download,
      description: 'Aktuelle QR-Codes als PDF'
    },
    {
      name: 'Speisekarte anzeigen',
      href: `/menu/${user.restaurant?.slug}`,
      icon: ExternalLink,
      description: 'Live-Ansicht für Gäste',
      external: true
    }
  ]

  const isBetaUser = user.restaurant?.betaExpiresAt && new Date(user.restaurant.betaExpiresAt) > new Date()
  const betaDaysLeft = isBetaUser 
    ? Math.ceil((new Date(user.restaurant!.betaExpiresAt!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-display font-bold text-neutral-900">
              Dashboard
            </h1>
            
            {/* Beta Badge */}
            {isBetaUser && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2 bg-gradient-to-r from-primary-100 to-secondary-100 border border-primary-200 px-3 py-1 rounded-full"
              >
                <Gift className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-800">
                  Beta: {betaDaysLeft} Tage verbleibend
                </span>
              </motion.div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="search"
                placeholder="Suchen..."
                className="block w-full rounded-lg border border-neutral-300 bg-white py-2 pl-10 pr-3 text-sm placeholder:text-neutral-500 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            {/* Quick Actions */}
            <div className="relative">
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Neu</span>
              </button>

              <AnimatePresence>
                {showQuickActions && (
                  <>
                    <div 
                      className="fixed inset-0 z-10"
                      onClick={() => setShowQuickActions(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-12 z-20 w-72 rounded-lg bg-white shadow-lg ring-1 ring-black/5"
                    >
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-neutral-900 mb-3">
                          Schnellaktionen
                        </h3>
                        <div className="space-y-2">
                          {quickActions.map((action) => (
                            <Link
                              key={action.name}
                              href={action.href}
                              target={action.external ? '_blank' : undefined}
                              onClick={() => setShowQuickActions(false)}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                            >
                              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                                <action.icon className="w-4 h-4 text-primary-600" />
                              </div>
                              <div>
                                <div className="font-medium text-neutral-900 text-sm">
                                  {action.name}
                                </div>
                                <div className="text-xs text-neutral-600">
                                  {action.description}
                                </div>
                              </div>
                              {action.external && (
                                <ExternalLink className="w-4 h-4 text-neutral-400" />
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary-500"></span>
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <>
                    <div 
                      className="fixed inset-0 z-10"
                      onClick={() => setShowNotifications(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-12 z-20 w-80 rounded-lg bg-white shadow-lg ring-1 ring-black/5"
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-sm font-medium text-neutral-900">
                            Benachrichtigungen
                          </h3>
                          <button className="text-xs text-primary-600 hover:text-primary-700">
                            Alle als gelesen markieren
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {notifications.map((notification) => (
                            <div 
                              key={notification.id}
                              className="flex gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                            >
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                notification.type === 'success' ? 'bg-green-500' :
                                notification.type === 'warning' ? 'bg-yellow-500' :
                                'bg-blue-500'
                              }`} />
                              <div className="flex-1">
                                <div className="font-medium text-neutral-900 text-sm">
                                  {notification.title}
                                </div>
                                <div className="text-sm text-neutral-600 mt-1">
                                  {notification.message}
                                </div>
                                <div className="text-xs text-neutral-500 mt-1">
                                  vor {notification.time}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 pt-3 border-t border-neutral-200">
                          <Link 
                            href="/dashboard/notifications"
                            className="text-sm text-primary-600 hover:text-primary-700"
                            onClick={() => setShowNotifications(false)}
                          >
                            Alle Benachrichtigungen anzeigen →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
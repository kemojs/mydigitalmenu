'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Camera,
  QrCode,
  Eye,
  TrendingUp,
  Users,
  Clock,
  Download,
  Edit,
  BarChart3,
  Smartphone,
  Globe,
  Star,
  ArrowUpRight,
  Calendar,
  MapPin
} from 'lucide-react'
import type { User } from '@/types'

interface DashboardOverviewProps {
  user: User
}

const DashboardOverview = ({ user }: DashboardOverviewProps) => {
  const [stats, setStats] = useState({
    todayScans: 47,
    totalScans: 1234,
    activeMenus: 3,
    avgRating: 4.8,
    monthlySavings: 247,
    popularItem: 'Schnitzel Wiener Art'
  })

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'scan',
      message: 'QR-Code gescannt',
      location: 'Tisch 7',
      time: '2 Min.',
      icon: QrCode
    },
    {
      id: 2,
      type: 'edit',
      message: 'Preise aktualisiert',
      location: 'Hauptgerichte',
      time: '1 Std.',
      icon: Edit
    },
    {
      id: 3,
      type: 'view',
      message: 'Menü angezeigt',
      location: 'Mobile App',
      time: '2 Std.',
      icon: Eye
    }
  ])

  const quickActions = [
    {
      name: 'Neue Speisekarte scannen',
      description: 'Foto-zu-Digital Scanner',
      href: '/dashboard/menu/scan',
      icon: Camera,
      color: 'from-primary-500 to-primary-600'
    },
    {
      name: 'QR-Code herunterladen',
      description: 'Aktuelle Version als PDF',
      href: '/dashboard/qr-codes',
      icon: Download,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Menü bearbeiten',
      description: 'Preise und Gerichte anpassen',
      href: '/dashboard/menu',
      icon: Edit,
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Analytics ansehen',
      description: 'Detaillierte Auswertungen',
      href: '/dashboard/analytics',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600'
    }
  ]

  const statCards = [
    {
      name: 'Scans heute',
      value: stats.todayScans,
      change: '+12%',
      icon: QrCode,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100'
    },
    {
      name: 'Gesamt Aufrufe',
      value: stats.totalScans.toLocaleString(),
      change: '+8.2%',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      name: 'Durchschn. Bewertung',
      value: stats.avgRating,
      change: '+0.3',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      name: 'Monatl. Ersparnis',
      value: `€${stats.monthlySavings}`,
      change: '+€47',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 p-8 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full" />
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-32 h-32 bg-white/5 rounded-full" />
          
          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-display font-bold mb-2">
                  Willkommen zurück, {user.name}!
                </h2>
                <p className="text-primary-100 text-lg mb-6">
                  Ihr Restaurant {user.restaurant?.name} läuft großartig. 
                  Hier ist eine Übersicht über die heutigen Aktivitäten.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/menu/${user.restaurant?.slug}`}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all"
                  >
                    <Smartphone className="w-4 h-4" />
                    Live-Menü ansehen
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  
                  <Link
                    href="/dashboard/qr-codes"
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all"
                  >
                    <QrCode className="w-4 h-4" />
                    QR-Code teilen
                  </Link>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Camera className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={card.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="card hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">
                  {card.name}
                </p>
                <p className="text-2xl font-bold text-neutral-900 mt-1">
                  {card.value}
                </p>
                <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {card.change}
                </p>
              </div>
              <div className={`w-12 h-12 ${card.bgColor} rounded-xl flex items-center justify-center`}>
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-2"
        >
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-semibold text-neutral-900">
                Schnellaktionen
              </h3>
              <Link 
                href="/dashboard/menu"
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Alle Funktionen →
              </Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.name}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={action.href}
                    className="block p-4 rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <action.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 mb-1">
                          {action.name}
                        </div>
                        <div className="text-sm text-neutral-600">
                          {action.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-display font-semibold text-neutral-900">
                Letzte Aktivitäten
              </h3>
              <Clock className="w-5 h-5 text-neutral-400" />
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                    <activity.icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-neutral-900 text-sm">
                      {activity.message}
                    </div>
                    <div className="text-xs text-neutral-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {activity.location} • vor {activity.time}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <Link 
                href="/dashboard/activity"
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                Alle Aktivitäten anzeigen
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Current Menu Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-display font-semibold text-neutral-900">
                Aktuelle Speisekarte
              </h3>
              <p className="text-neutral-600 mt-1">
                Zuletzt aktualisiert vor 2 Stunden
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/menu/${user.restaurant?.slug}`}
                target="_blank"
                className="btn-outline"
              >
                <Eye className="w-4 h-4 mr-2" />
                Vorschau
              </Link>
              <Link
                href="/dashboard/menu"
                className="btn-primary"
              >
                <Edit className="w-4 h-4 mr-2" />
                Bearbeiten
              </Link>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
              <h4 className="font-semibold text-neutral-900 mb-3">Statistiken</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Gerichte gesamt:</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Kategorien:</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Beliebtestes Gericht:</span>
                  <span className="font-medium">{stats.popularItem}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
              <h4 className="font-semibold text-neutral-900 mb-3">Performance</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Ladezeit:</span>
                  <span className="font-medium text-green-600">0.8s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Mobile Score:</span>
                  <span className="font-medium text-green-600">98/100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Verfügbarkeit:</span>
                  <span className="font-medium text-green-600">99.9%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
              <h4 className="font-semibold text-neutral-900 mb-3">QR-Code</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Scans heute:</span>
                  <span className="font-medium">{stats.todayScans}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Erfolgsrate:</span>
                  <span className="font-medium text-green-600">99.2%</span>
                </div>
                <div className="w-12 h-12 bg-neutral-900 rounded-lg mx-auto mt-3 flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DashboardOverview
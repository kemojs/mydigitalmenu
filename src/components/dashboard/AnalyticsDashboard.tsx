'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Star,
  Heart,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  MapPin,
  Award,
  Target,
  Zap
} from 'lucide-react'
import type { Restaurant } from '@/types'

interface AnalyticsDashboardProps {
  restaurant: Restaurant
}

const AnalyticsDashboard = ({ restaurant }: AnalyticsDashboardProps) => {
  const [timeRange, setTimeRange] = useState('7d')
  const [isLoading, setIsLoading] = useState(false)
  const [analyticsData, setAnalyticsData] = useState<any>(null)

  const timeRanges = [
    { value: '24h', label: 'Letzten 24h' },
    { value: '7d', label: 'Letzten 7 Tage' },
    { value: '30d', label: 'Letzten 30 Tage' },
    { value: '90d', label: 'Letzten 3 Monate' },
    { value: '1y', label: 'Letztes Jahr' }
  ]

  // Mock analytics data
  useEffect(() => {
    const mockData = {
      overview: {
        totalViews: 2847,
        uniqueVisitors: 1923,
        avgSessionDuration: '3:24',
        bounceRate: 24.5,
        topDevice: 'Mobile',
        deviceShare: 78.2
      },
      trends: {
        viewsTrend: +12.5,
        visitorsTrend: +8.3,
        durationTrend: +15.2,
        bounceTrend: -3.1
      },
      chartData: {
        daily: [
          { date: '2024-01-01', views: 142, visitors: 98, duration: 185 },
          { date: '2024-01-02', views: 238, visitors: 167, duration: 201 },
          { date: '2024-01-03', views: 189, visitors: 134, duration: 178 },
          { date: '2024-01-04', views: 321, visitors: 224, duration: 234 },
          { date: '2024-01-05', views: 298, visitors: 201, duration: 189 },
          { date: '2024-01-06', views: 367, visitors: 278, duration: 267 },
          { date: '2024-01-07', videos: 445, visitors: 321, duration: 298 }
        ],
        devices: [
          { name: 'Mobile', value: 78.2, color: '#FF6B35' },
          { name: 'Desktop', value: 16.8, color: '#2D5A27' },
          { name: 'Tablet', value: 5.0, color: '#F7931E' }
        ],
        popularItems: [
          { name: 'Spaghetti Carbonara', views: 234, orders: 89, revenue: 1504.10 },
          { name: 'Pizza Margherita', views: 198, orders: 67, revenue: 770.50 },
          { name: 'Risotto ai Funghi', views: 156, orders: 45, revenue: 850.50 },
          { name: 'Osso Buco', views: 134, orders: 23, revenue: 664.70 },
          { name: 'Tiramisù', views: 178, orders: 78, revenue: 616.20 }
        ],
        locations: [
          { country: 'Deutschland', visitors: 1456, percentage: 75.7 },
          { country: 'Österreich', visitors: 234, percentage: 12.1 },
          { country: 'Schweiz', visitors: 123, percentage: 6.4 },
          { country: 'Italien', visitors: 78, percentage: 4.1 },
          { country: 'Andere', visitors: 32, percentage: 1.7 }
        ],
        peakHours: [
          { hour: '6:00', views: 12 },
          { hour: '7:00', views: 28 },
          { hour: '8:00', views: 45 },
          { hour: '9:00', views: 67 },
          { hour: '10:00', views: 89 },
          { hour: '11:00', views: 134 },
          { hour: '12:00', views: 267 },
          { hour: '13:00', views: 298 },
          { hour: '14:00', views: 156 },
          { hour: '15:00', views: 123 },
          { hour: '16:00', views: 89 },
          { hour: '17:00', views: 98 },
          { hour: '18:00', views: 178 },
          { hour: '19:00', views: 234 },
          { hour: '20:00', views: 289 },
          { hour: '21:00', views: 198 },
          { hour: '22:00', views: 134 },
          { hour: '23:00', views: 67 }
        ]
      }
    }
    setAnalyticsData(mockData)
  }, [timeRange])

  const refreshData = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('de-DE').format(num)
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(num)
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          
          <button
            onClick={refreshData}
            disabled={isLoading}
            className="btn-outline disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Aktualisieren
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="btn-outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="btn-primary">
            <Calendar className="w-4 h-4 mr-2" />
            Bericht erstellen
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Gesamtaufrufe',
            value: analyticsData.overview.totalViews,
            trend: analyticsData.trends.viewsTrend,
            icon: Eye,
            color: 'from-blue-500 to-blue-600',
            format: 'number'
          },
          {
            title: 'Unique Besucher',
            value: analyticsData.overview.uniqueVisitors,
            trend: analyticsData.trends.visitorsTrend,
            icon: Users,
            color: 'from-green-500 to-green-600',
            format: 'number'
          },
          {
            title: 'Ø Verweildauer',
            value: analyticsData.overview.avgSessionDuration,
            trend: analyticsData.trends.durationTrend,
            icon: Clock,
            color: 'from-purple-500 to-purple-600',
            format: 'duration'
          },
          {
            title: 'Absprungrate',
            value: analyticsData.overview.bounceRate,
            trend: analyticsData.trends.bounceTrend,
            icon: TrendingDown,
            color: 'from-red-500 to-red-600',
            format: 'percentage',
            inverseTrend: true
          }
        ].map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600 mb-1">
                  {kpi.title}
                </p>
                <p className="text-2xl font-bold text-neutral-900">
                  {kpi.format === 'number' && formatNumber(kpi.value)}
                  {kpi.format === 'duration' && kpi.value}
                  {kpi.format === 'percentage' && `${kpi.value}%`}
                </p>
                <div className={`flex items-center gap-1 mt-2 text-sm ${
                  (kpi.inverseTrend ? kpi.trend < 0 : kpi.trend > 0) 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {(kpi.inverseTrend ? kpi.trend < 0 : kpi.trend > 0) ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {Math.abs(kpi.trend)}%
                </div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-br ${kpi.color} rounded-xl flex items-center justify-center`}>
                <kpi.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Views Chart */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display font-semibold text-neutral-900">
                Aufrufe über Zeit
              </h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary-500 rounded-full" />
                  <span className="text-neutral-600">Aufrufe</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary-600 rounded-full" />
                  <span className="text-neutral-600">Besucher</span>
                </div>
              </div>
            </div>
            
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData.chartData.daily}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString('de-DE')}
                    formatter={(value: any, name: string) => [
                      formatNumber(value),
                      name === 'views' ? 'Aufrufe' : 'Besucher'
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="views" 
                    stroke="#FF6B35" 
                    fill="#FF6B35" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="visitors" 
                    stroke="#2D5A27" 
                    fill="#2D5A27" 
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="card"
        >
          <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">
            Geräte-Verteilung
          </h3>
          
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analyticsData.chartData.devices}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {analyticsData.chartData.devices.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {analyticsData.chartData.devices.map((device: any) => {
              const Icon = device.name === 'Mobile' ? Smartphone : 
                          device.name === 'Desktop' ? Monitor : Tablet
              return (
                <div key={device.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-neutral-600" />
                    <span className="text-neutral-900">{device.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: device.color }}
                    />
                    <span className="font-medium text-neutral-900">
                      {device.value}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Popular Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display font-semibold text-neutral-900">
            Beliebte Gerichte
          </h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm">
            Alle anzeigen →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Gericht</th>
                <th className="text-right py-3 px-4 font-medium text-neutral-600">Aufrufe</th>
                <th className="text-right py-3 px-4 font-medium text-neutral-600">Interesse</th>
                <th className="text-right py-3 px-4 font-medium text-neutral-600">Umsatz</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.chartData.popularItems.map((item: any, index: number) => (
                <motion.tr
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                        <span className="text-primary-600 font-bold text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <span className="font-medium text-neutral-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-neutral-600">
                    {formatNumber(item.views)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 bg-neutral-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full"
                          style={{ width: `${(item.orders / item.views) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-neutral-600 min-w-12">
                        {Math.round((item.orders / item.views) * 100)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-neutral-900">
                    {formatCurrency(item.revenue)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Peak Hours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="card"
        >
          <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">
            Stoßzeiten
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.chartData.peakHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip 
                  formatter={(value: any) => [formatNumber(value), 'Aufrufe']}
                  labelFormatter={(label) => `${label} Uhr`}
                />
                <Bar dataKey="views" fill="#FF6B35" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Geographic Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="card"
        >
          <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">
            Besucher nach Standort
          </h3>

          <div className="space-y-4">
            {analyticsData.chartData.locations.map((location: any, index: number) => (
              <motion.div
                key={location.country}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-neutral-500" />
                  <span className="font-medium text-neutral-900">{location.country}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-neutral-200 rounded-full h-2">
                    <div
                      className="bg-secondary-600 h-2 rounded-full"
                      style={{ width: `${location.percentage}%` }}
                    />
                  </div>
                  <div className="text-right min-w-16">
                    <div className="font-medium text-neutral-900">
                      {formatNumber(location.visitors)}
                    </div>
                    <div className="text-xs text-neutral-500">
                      {location.percentage}%
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Insights & Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="card"
      >
        <h3 className="text-xl font-display font-semibold text-neutral-900 mb-6">
          KI-Empfehlungen
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: 'Stoßzeiten optimieren',
              description: 'Ihre Hauptgeschäftszeiten sind 12:00-14:00 und 19:00-21:00. Erwägen Sie spezielle Angebote für schwächere Zeiten.',
              type: 'success',
              action: 'Angebote erstellen'
            },
            {
              icon: Star,
              title: 'Top-Gerichte hervorheben',
              description: 'Spaghetti Carbonara ist Ihr Bestseller. Platzieren Sie es prominenter in der Speisekarte.',
              type: 'info',
              action: 'Menu anpassen'
            },
            {
              icon: Zap,
              title: 'Mobile Optimierung',
              description: '78% Ihrer Besucher nutzen Mobile. Stellen Sie sicher, dass Bilder schnell laden.',
              type: 'warning',
              action: 'Optimieren'
            }
          ].map((insight, index) => (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
              className={`p-6 rounded-xl border-2 ${
                insight.type === 'success' ? 'border-green-200 bg-green-50' :
                insight.type === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  insight.type === 'success' ? 'bg-green-200 text-green-700' :
                  insight.type === 'warning' ? 'bg-yellow-200 text-yellow-700' :
                  'bg-blue-200 text-blue-700'
                }`}>
                  <insight.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-neutral-900 mb-2">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
                    {insight.description}
                  </p>
                  <button className={`text-sm font-medium px-3 py-1 rounded-lg transition-colors ${
                    insight.type === 'success' ? 'bg-green-200 text-green-800 hover:bg-green-300' :
                    insight.type === 'warning' ? 'bg-yellow-200 text-yellow-800 hover:bg-yellow-300' :
                    'bg-blue-200 text-blue-800 hover:bg-blue-300'
                  }`}>
                    {insight.action}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default AnalyticsDashboard
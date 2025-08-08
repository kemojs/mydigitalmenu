'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Clock, 
  Gift, 
  X,
  Calendar,
  CheckCircle 
} from 'lucide-react'

interface BetaBannerProps {
  restaurant: {
    betaExpiresAt: Date | null
    isBetaUser: boolean
    createdAt: Date
  }
}

const BetaBanner = ({ restaurant }: BetaBannerProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [daysRemaining, setDaysRemaining] = useState(0)

  useEffect(() => {
    if (!restaurant.betaExpiresAt || !restaurant.isBetaUser) {
      setIsVisible(false)
      return
    }

    const calculateDaysRemaining = () => {
      const now = new Date()
      const expiry = new Date(restaurant.betaExpiresAt!)
      const diffTime = expiry.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      setDaysRemaining(Math.max(0, diffDays))
    }

    calculateDaysRemaining()
    
    // Update daily
    const interval = setInterval(calculateDaysRemaining, 24 * 60 * 60 * 1000)
    return () => clearInterval(interval)
  }, [restaurant.betaExpiresAt, restaurant.isBetaUser])

  const formatExpiryDate = () => {
    if (!restaurant.betaExpiresAt) return ''
    
    return new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(restaurant.betaExpiresAt))
  }

  const getBetaStatus = () => {
    if (daysRemaining > 30) {
      return {
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-green-50 border-green-200',
        textColor: 'text-green-800',
        iconColor: 'text-green-600',
        message: 'Beta-Phase läuft noch'
      }
    } else if (daysRemaining > 7) {
      return {
        color: 'from-yellow-500 to-yellow-600',
        bgColor: 'bg-yellow-50 border-yellow-200',
        textColor: 'text-yellow-800',
        iconColor: 'text-yellow-600',
        message: 'Beta endet bald'
      }
    } else {
      return {
        color: 'from-red-500 to-red-600',
        bgColor: 'bg-red-50 border-red-200',
        textColor: 'text-red-800',
        iconColor: 'text-red-600',
        message: 'Beta endet sehr bald'
      }
    }
  }

  if (!isVisible || !restaurant.isBetaUser || !restaurant.betaExpiresAt) {
    return null
  }

  const betaStatus = getBetaStatus()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`rounded-xl border-2 p-6 ${betaStatus.bgColor} relative overflow-hidden mb-6`}
      >
        {/* Background Decoration */}
        <div className="absolute inset-0 bg-gradient-to-r opacity-5" 
             style={{
               background: `linear-gradient(135deg, var(--tw-gradient-stops))`
             }}>
          <div className={`absolute inset-0 bg-gradient-to-r ${betaStatus.color}`} />
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className={`absolute top-4 right-4 p-1 rounded-full hover:bg-white/20 transition-colors ${betaStatus.iconColor}`}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative z-10">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={`w-12 h-12 bg-gradient-to-br ${betaStatus.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
              <Sparkles className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className={`text-xl font-display font-bold ${betaStatus.textColor}`}>
                  Beta-Phase: Kostenlos bis {formatExpiryDate()}
                </h3>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 ${betaStatus.textColor}`}>
                  {betaStatus.message}
                </div>
              </div>

              <p className={`${betaStatus.textColor} mb-4`}>
                Nutzen Sie alle Premium-Features während der Beta-Phase komplett kostenfrei. 
                {daysRemaining > 0 ? (
                  <strong> Noch {daysRemaining} Tage verbleibend!</strong>
                ) : (
                  <strong> Die Beta-Phase ist abgelaufen.</strong>
                )}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center`}>
                    <Calendar className={`w-5 h-5 ${betaStatus.iconColor}`} />
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${betaStatus.textColor}`}>
                      {daysRemaining}
                    </div>
                    <div className={`text-sm ${betaStatus.textColor} opacity-70`}>
                      Tage verbleibend
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center`}>
                    <Gift className={`w-5 h-5 ${betaStatus.iconColor}`} />
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${betaStatus.textColor}`}>
                      €0
                    </div>
                    <div className={`text-sm ${betaStatus.textColor} opacity-70`}>
                      Monatliche Kosten
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center`}>
                    <CheckCircle className={`w-5 h-5 ${betaStatus.iconColor}`} />
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${betaStatus.textColor}`}>
                      Alle
                    </div>
                    <div className={`text-sm ${betaStatus.textColor} opacity-70`}>
                      Features inklusive
                    </div>
                  </div>
                </div>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  'Unbegrenzte digitale Speisekarten',
                  'OCR Foto-zu-Digital Scanner',
                  'QR-Code Generator mit Templates',
                  'Analytics Dashboard',
                  'Multi-Sprachen Support',
                  'Custom Branding & Farben'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className={`w-4 h-4 ${betaStatus.iconColor}`} />
                    <span className={`text-sm ${betaStatus.textColor}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              {daysRemaining <= 30 && (
                <div className="mt-6 p-4 bg-white/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className={`font-semibold ${betaStatus.textColor} mb-1`}>
                        Bereiten Sie sich auf das Ende der Beta vor
                      </h4>
                      <p className={`text-sm ${betaStatus.textColor} opacity-70`}>
                        Wählen Sie bald einen passenden Plan für Ihr Restaurant
                      </p>
                    </div>
                    <button className={`btn-outline border-white/30 ${betaStatus.textColor} hover:bg-white/10`}>
                      Pläne ansehen
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default BetaBanner
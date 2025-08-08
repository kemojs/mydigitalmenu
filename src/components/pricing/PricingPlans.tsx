'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Check,
  Star,
  Zap,
  Crown,
  ArrowRight,
  Users,
  BarChart3,
  Smartphone,
  Palette,
  HeadphonesIcon,
  Shield,
  Globe,
  Clock,
  TrendingUp
} from 'lucide-react'

interface PricingPlansProps {
  currentPlan?: 'STARTER' | 'PROFESSIONAL' | 'ENTERPRISE'
  onPlanSelect?: (plan: string) => void
  showCurrentPlan?: boolean
}

const PricingPlans = ({ 
  currentPlan, 
  onPlanSelect, 
  showCurrentPlan = false 
}: PricingPlansProps) => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const plans = [
    {
      id: 'STARTER',
      name: 'Starter',
      tagline: 'Perfekt für kleine Restaurants',
      description: 'Alles was Sie brauchen um zu starten',
      monthlyPrice: 29,
      yearlyPrice: 290, // 2 Monate kostenlos
      yearlyDiscount: '2 Monate gratis',
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-200',
      features: [
        'Bis zu 100 Menü-Items',
        'Digitale Speisekarte mit QR-Code',
        'OCR Foto-zu-Digital Scanner',
        'Basis Analytics',
        'Mobile Optimierung',
        'Template Gallery (Basic)',
        'Email Support'
      ],
      limitations: [
        '1 Restaurant Standort',
        'Basis Anpassungen',
        'Standard Templates'
      ]
    },
    {
      id: 'PROFESSIONAL',
      name: 'Professional',
      tagline: 'Für wachsende Restaurants',
      description: 'Erweiterte Features für professionelle Nutzung',
      monthlyPrice: 49,
      yearlyPrice: 490, // 2 Monate kostenlos
      yearlyDiscount: '2 Monate gratis',
      icon: Star,
      color: 'from-primary-500 to-primary-600',
      borderColor: 'border-primary-300',
      isPopular: true,
      features: [
        'Unbegrenzte Menü-Items',
        'Multi-Location Support (bis 3)',
        'Erweiterte Analytics & Insights',
        'A/B Testing für Menüs',
        'Custom Branding & Farben',
        'Premium Template Gallery',
        'Mehrsprachige Menüs',
        'Priority Support',
        'API Zugang',
        'Export Funktionen'
      ],
      limitations: [
        'Bis zu 3 Standorte',
        'Standard API Limits'
      ]
    },
    {
      id: 'ENTERPRISE',
      name: 'Enterprise',
      tagline: 'Für Restaurant-Ketten',
      description: 'Maßgeschneiderte Lösungen für große Unternehmen',
      monthlyPrice: 89,
      yearlyPrice: 890, // 2 Monate kostenlos
      yearlyDiscount: '2 Monate gratis',
      icon: Crown,
      color: 'from-purple-500 to-purple-600',
      borderColor: 'border-purple-300',
      features: [
        'Unbegrenzte Restaurants',
        'White-Label Lösungen',
        'Advanced Analytics Suite',
        'KI-basierte Empfehlungen',
        'Custom Integrationen',
        'Dedicated Account Manager',
        '24/7 Phone Support',
        'Training & Onboarding',
        'SLA Garantie',
        'Custom API Limits',
        'Multi-Tenant Management',
        'Advanced Security Features'
      ],
      limitations: []
    }
  ]

  const handlePlanSelect = async (planId: string) => {
    if (isLoading) return
    
    setIsLoading(planId)
    try {
      if (onPlanSelect) {
        await onPlanSelect(planId)
      }
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500))
    } catch (error) {
      console.error('Error selecting plan:', error)
    } finally {
      setIsLoading(null)
    }
  }

  const getPrice = (plan: typeof plans[0]) => {
    return billingPeriod === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice
  }

  const getMonthlyPrice = (plan: typeof plans[0]) => {
    return billingPeriod === 'yearly' 
      ? Math.round(plan.yearlyPrice / 12) 
      : plan.monthlyPrice
  }

  return (
    <div className="space-y-8">
      {/* Billing Period Toggle */}
      <div className="flex items-center justify-center">
        <div className="bg-neutral-100 rounded-full p-1 flex items-center">
          <button
            onClick={() => setBillingPeriod('monthly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              billingPeriod === 'monthly'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Monatlich
          </button>
          <button
            onClick={() => setBillingPeriod('yearly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all relative ${
              billingPeriod === 'yearly'
                ? 'bg-white text-neutral-900 shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            Jährlich
            <div className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
              -17%
            </div>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const Icon = plan.icon
          const isCurrentPlan = currentPlan === plan.id
          
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${
                plan.isPopular ? 'border-primary-500 ring-2 ring-primary-100' : plan.borderColor
              } ${isCurrentPlan ? 'ring-2 ring-green-100 border-green-300' : ''}`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Beliebteste Wahl
                  </div>
                </div>
              )}

              {/* Current Plan Badge */}
              {isCurrentPlan && showCurrentPlan && (
                <div className="absolute -top-4 right-4">
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    Aktueller Plan
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-neutral-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-2">
                    {plan.tagline}
                  </p>
                  <p className="text-neutral-600 text-sm">
                    {plan.description}
                  </p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-neutral-900">
                      €{getMonthlyPrice(plan)}
                    </span>
                    <span className="text-neutral-500">/Monat</span>
                  </div>
                  
                  {billingPeriod === 'yearly' && (
                    <div className="space-y-1">
                      <p className="text-sm text-neutral-600">
                        Jährliche Abrechnung: €{plan.yearlyPrice}
                      </p>
                      <p className="text-xs text-primary-600 font-medium">
                        {plan.yearlyDiscount}
                      </p>
                    </div>
                  )}
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  <h4 className="font-semibold text-neutral-900 text-sm uppercase tracking-wide">
                    Enthalten:
                  </h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-neutral-200">
                      <h4 className="font-semibold text-neutral-600 text-sm uppercase tracking-wide mb-3">
                        Limits:
                      </h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-neutral-300 rounded-full flex-shrink-0" />
                            <span className="text-xs text-neutral-500">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  disabled={isLoading !== null || isCurrentPlan}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                    isCurrentPlan
                      ? 'bg-green-100 text-green-700 cursor-default'
                      : plan.isPopular
                        ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading === plan.id ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Wird aktiviert...
                    </>
                  ) : isCurrentPlan ? (
                    <>
                      <Check className="w-4 h-4" />
                      Aktueller Plan
                    </>
                  ) : (
                    <>
                      {plan.id === 'ENTERPRISE' ? 'Kontakt aufnehmen' : 'Plan auswählen'}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Feature Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-neutral-50 rounded-2xl p-8"
      >
        <h3 className="text-2xl font-display font-bold text-center mb-8">
          Was ist in jedem Plan enthalten?
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Smartphone,
              title: 'Mobile-First Design',
              description: 'Perfekt optimiert für alle Geräte'
            },
            {
              icon: BarChart3,
              title: 'Analytics & Insights',
              description: 'Verstehen Sie Ihre Gäste besser'
            },
            {
              icon: Palette,
              title: 'Custom Branding',
              description: 'Ihre Marke, Ihr Design'
            },
            {
              icon: Shield,
              title: 'DSGVO-konform',
              description: '100% deutsche Datenschutz-Standards'
            }
          ].map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-neutral-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-neutral-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Money Back Guarantee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center py-8"
      >
        <div className="bg-green-50 rounded-2xl p-6 max-w-md mx-auto">
          <Shield className="w-8 h-8 text-green-600 mx-auto mb-4" />
          <h4 className="font-semibold text-green-900 mb-2">
            30 Tage Geld-zurück-Garantie
          </h4>
          <p className="text-sm text-green-700">
            Nicht zufrieden? Erhalten Sie Ihr Geld innerhalb von 30 Tagen vollständig zurück.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default PricingPlans